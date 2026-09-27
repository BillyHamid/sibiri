<#
.SYNOPSIS
    Met le site en ligne sur Gandi Simple Hosting.

.DESCRIPTION
    Enchaîne les cinq étapes de la mise en ligne : construction, copie vers le
    dépôt de déploiement, commit, envoi, publication — puis vérifie que le site
    répond réellement.

    Le déploiement passe par un SECOND dépôt git, deploy-gandi/, distinct de
    celui du code source. Gandi ne reçoit que le site construit, jamais les
    sources. La racine web de Simple Hosting étant htdocs/, le build y est
    recopié sous ce nom.

    Le jeton Gandi sera demandé deux fois (envoi, puis publication). C'est
    normal : il n'est jamais stocké dans ce script.

.PARAMETER Message
    Message du commit de déploiement. Par défaut : la date du jour.

.PARAMETER SansVerification
    N'interroge pas le site en ligne à la fin.

.EXAMPLE
    .\deployer.ps1
    .\deployer.ps1 -Message "Nouvelle page Actualites"
#>

[CmdletBinding()]
param(
    [string] $Message = "Mise en ligne du $(Get-Date -Format 'dd/MM/yyyy à HH:mm')",
    [switch] $SansVerification
)

$ErrorActionPreference = "Stop"

# ── Réglages ────────────────────────────────────────────────────────────────
$Racine     = $PSScriptRoot
$Deploiement = Join-Path $Racine "deploy-gandi"
$Htdocs      = Join-Path $Deploiement "htdocs"
$Dist        = Join-Path $Racine "dist"
$Identifiant = "c38228b0-b821-11f1-b005-00163e94b645"
$ServeurGit  = "git.sd5.gpaas.net"
$DepotGandi  = "www.sibiri.group.git"
$SiteUrl     = "https://www.sibiri.group"

# Les routes contrôlées à la fin. /medical et /groupe y figurent parce qu'ils
# portent le même nom qu'un dossier de médias : c'est là que ça casse en premier
# si le .htaccess venait à être perdu.
$RoutesATester = @("/", "/groupe", "/medical", "/energy/services", "/robots.txt")

# ── Affichage ───────────────────────────────────────────────────────────────
function Ecrire-Etape ($numero, $texte) {
    Write-Host ""
    Write-Host "[$numero/5] $texte" -ForegroundColor Cyan
}
function Ecrire-Ok      ($texte) { Write-Host "      $texte" -ForegroundColor Green }
function Ecrire-Info    ($texte) { Write-Host "      $texte" -ForegroundColor DarkGray }
function Arreter ($texte) {
    Write-Host ""
    Write-Host "ECHEC : $texte" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "  Mise en ligne de SIBIRI Holding sur Gandi" -ForegroundColor White
Write-Host "  $SiteUrl" -ForegroundColor DarkGray

# ── Contrôles préalables ────────────────────────────────────────────────────
if (-not (Test-Path $Deploiement)) {
    Arreter "Le dossier deploy-gandi est introuvable. Il doit contenir le depot git relie a Gandi."
}
Push-Location $Deploiement
$remotes = (git remote) -join " "
Pop-Location
if ($remotes -notmatch "gandi") {
    Arreter "Le depot deploy-gandi n'a pas de remote 'gandi'. Lancez : git remote add gandi git+ssh://$Identifiant@$ServeurGit/$DepotGandi"
}

# ── 1. Construction ─────────────────────────────────────────────────────────
Ecrire-Etape 1 "Construction du site"
Push-Location $Racine
npm run build
$codeBuild = $LASTEXITCODE
Pop-Location
if ($codeBuild -ne 0) { Arreter "npm run build a echoue. Corrigez l'erreur avant de recommencer." }
if (-not (Test-Path (Join-Path $Dist "index.html"))) { Arreter "dist/index.html est absent apres la construction." }

$poids = "{0:N1} Mo" -f ((Get-ChildItem $Dist -Recurse -File | Measure-Object Length -Sum).Sum / 1MB)
Ecrire-Ok "Site construit — $poids"

# ── 2. Copie vers le dépôt de déploiement ───────────────────────────────────
Ecrire-Etape 2 "Copie vers deploy-gandi/htdocs"
if (Test-Path $Htdocs) { Remove-Item -Recurse -Force $Htdocs }
Copy-Item -Recurse $Dist $Htdocs
if (-not (Test-Path (Join-Path $Htdocs ".htaccess"))) {
    Arreter "Le .htaccess n'a pas suivi. Sans lui, toutes les URL profondes renverront une 404."
}
Ecrire-Ok "Fichiers copies, .htaccess present"

# ── 3. Commit ───────────────────────────────────────────────────────────────
Ecrire-Etape 3 "Enregistrement des changements"
Push-Location $Deploiement
git add -A
$aCommiter = git status --porcelain
if ([string]::IsNullOrWhiteSpace($aCommiter)) {
    Ecrire-Info "Rien de nouveau depuis la derniere mise en ligne."
    $rienDeNeuf = $true
} else {
    git commit -q -m $Message
    if ($LASTEXITCODE -ne 0) { Pop-Location; Arreter "Le commit a echoue." }
    Ecrire-Ok "Commit cree : $Message"
    $rienDeNeuf = $false
}

# ── 4. Envoi ────────────────────────────────────────────────────────────────
Ecrire-Etape 4 "Envoi vers Gandi"
Write-Host ""
Write-Host "      Identifiant : $Identifiant" -ForegroundColor Yellow
Write-Host "      Mot de passe : votre jeton Gandi (rien ne s'affiche en le collant)" -ForegroundColor Yellow
Write-Host ""
git push gandi master
$codePush = $LASTEXITCODE
Pop-Location
if ($codePush -ne 0) {
    Arreter "L'envoi a echoue. Si le message parle de 'Permission denied', le jeton est errone ou expire : recreez-en un dans Gandi."
}
Ecrire-Ok "Fichiers recus par Gandi"

# ── 5. Publication ──────────────────────────────────────────────────────────
# L'envoi ne publie rien : Gandi exige cette seconde commande.
Ecrire-Etape 5 "Publication"
Write-Host ""
Write-Host "      Le jeton va vous etre redemande." -ForegroundColor Yellow
Write-Host ""
ssh "$Identifiant@$ServeurGit" deploy $DepotGandi
if ($LASTEXITCODE -ne 0) { Arreter "La publication a echoue." }
Ecrire-Ok "Site publie"

# ── Vérification ────────────────────────────────────────────────────────────
if (-not $SansVerification) {
    Write-Host ""
    Write-Host "Verification du site en ligne" -ForegroundColor Cyan
    Write-Host ""
    $echecs = 0
    foreach ($route in $RoutesATester) {
        $code = 0
        try {
            $reponse = Invoke-WebRequest -Uri "$SiteUrl$route" -UseBasicParsing -TimeoutSec 30
            $code = $reponse.StatusCode
        } catch {
            if ($null -ne $_.Exception.Response) { $code = $_.Exception.Response.StatusCode.value__ }
        }
        $libelle = $route.PadRight(20)
        if ($code -eq 200) {
            Write-Host "      $libelle $code" -ForegroundColor Green
        } else {
            Write-Host "      $libelle $code" -ForegroundColor Red
            $echecs++
        }
    }
    Write-Host ""
    if ($echecs -gt 0) {
        Write-Host "  $echecs route(s) en erreur." -ForegroundColor Red
        Write-Host "  Un 301 en boucle vient du forcage HTTPS ; un 403 vient d'un dossier" -ForegroundColor DarkGray
        Write-Host "  de medias portant le meme nom qu'une route. Voir public/.htaccess." -ForegroundColor DarkGray
        exit 1
    }
}

Write-Host ""
Write-Host "  Termine. $SiteUrl est a jour." -ForegroundColor Green
if ($rienDeNeuf) {
    Write-Host "  (aucun changement n'avait ete detecte, la publication a ete relancee)" -ForegroundColor DarkGray
}
Write-Host ""

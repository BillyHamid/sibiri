import { useContentReader } from '../lib/content/useContent'

export function EmailDraftNotice({ draftHref, error, variant = 'holding' }) {
  const readContent = useContentReader()
  const titleKey = variant === 'energy' ? 'energy-contact.coordonnees.message-de-confirmation-titre' : 'contact.formulaire.confirmation-titre'
  const textKey = variant === 'energy' ? 'energy-contact.coordonnees.message-de-confirmation-texte' : 'contact.formulaire.confirmation-texte'
  return <>
    <p style={{ fontSize: 12, lineHeight: 1.6, color: '#60666c', margin: '12px 0' }}>Ce formulaire ouvre un e-mail prérempli. Vous devez ensuite l’envoyer depuis votre messagerie.</p>
    {error && <p role="alert" style={{ color: '#a43c33' }}>{error}</p>}
    {draftHref && <div role="status" style={{ padding: 18, borderRadius: 12, background: '#f5f7f5', border: '1px solid #d8e3d8', color: '#1d1d1b' }}>
      <h3 style={{ margin: '0 0 8px' }}>{readContent(titleKey, 'Votre e-mail est prêt')}</h3>
      <p>{readContent(textKey, 'Vérifiez le message dans votre messagerie, puis envoyez-le. Vous pouvez encore modifier le formulaire ci-dessous.')}</p>
      <p style={{ fontSize: 12 }}>Aucun message n’a été envoyé automatiquement par le site.</p>
      <a href={draftHref} style={{ color: '#68602f', textDecoration: 'underline' }}>Ouvrir l’e-mail si la messagerie ne s’est pas affichée</a>
    </div>}
  </>
}

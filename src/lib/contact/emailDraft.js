export function buildContactMailto(recipient, fields) {
  const address = String(recipient).trim()
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(address)) throw new Error('L’adresse de contact est indisponible. Veuillez utiliser les coordonnées affichées sur cette page.')
  const name = fields.name || [fields.prenom, fields.nom].filter(Boolean).join(' ')
  const subject = fields.subject || fields.sujet || 'Demande de contact'
  const body = [
    `Nom : ${name}`,
    `E-mail : ${fields.email || ''}`,
    fields.telephone && `Téléphone : ${fields.telephone}`,
    fields.filiale && `Filiale : ${fields.filiale}`,
    '', fields.message || '',
  ].filter(line => line !== false && line !== undefined).join('\n')
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

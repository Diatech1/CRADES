import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report' },
  'etude': { fr: 'Étude', en: 'Study' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication' },
}

export async function publicationDetailPage(db: D1Database, lang: string, slug: string): Promise<string> {
  const pub = await db.prepare('SELECT * FROM publications WHERE slug = ? AND is_published = 1').bind(slug).first() as any
  
  if (!pub) {
    return layout(`
      <section class="py-24 text-center">
        <h1 class="text-lg font-medium text-gray-600">${t('Publication non trouvée', 'Publication not found', lang)}</h1>
        <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-xs text-brand-gold hover:underline mt-3 inline-block">${t('Retour', 'Back', lang)}</a>
      </section>
    `, { title: '404', lang })
  }

  const related = await db.prepare(
    'SELECT * FROM publications WHERE is_published = 1 AND id != ? AND (sector = ? OR type = ?) ORDER BY year DESC LIMIT 3'
  ).bind(pub.id, pub.sector, pub.type).all()

  const typeInfo = typeLabels[pub.type] || typeLabels['rapport']

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Publications', 'Publications', lang)}</a>
    </nav>
    <div class="flex items-center gap-2 mb-3 text-xs text-gray-400">
      <span class="text-brand-gold font-medium uppercase tracking-wide">${lang === 'en' ? typeInfo.en : typeInfo.fr}</span>
      <span class="text-gray-600">&middot;</span>
      <span>${pub.year}</span>
      <span class="text-gray-600">&middot;</span>
      <span class="capitalize">${pub.sector}</span>
    </div>
    <h1 class="font-display text-xl lg:text-2xl text-white max-w-3xl">${lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr}</h1>
    <p class="text-xs text-gray-500 mt-3">${pub.author}</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2">
        <p class="text-sm text-gray-600 leading-relaxed">${lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr}</p>
        ${pub.content_fr || pub.content_en ? `
        <hr class="my-8 border-gray-100">
        <div class="text-sm text-gray-500 leading-relaxed">${lang === 'en' ? pub.content_en || pub.content_fr : pub.content_fr}</div>
        ` : ''}
        <div class="mt-8 flex gap-3">
          <button class="text-xs font-medium bg-brand-blue text-white px-4 py-2 rounded-md hover:bg-brand-navy transition-colors">
            <i class="fas fa-file-pdf mr-1.5"></i>${t('Télécharger PDF', 'Download PDF', lang)}
          </button>
        </div>
      </div>
      <div class="space-y-6">
        <div class="border border-gray-100 rounded-lg p-5 text-sm">
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">${t('Informations', 'Information', lang)}</h3>
          <dl class="space-y-2">
            <div class="flex justify-between text-xs"><dt class="text-gray-400">${t('Type', 'Type', lang)}</dt><dd class="text-gray-700">${lang === 'en' ? typeInfo.en : typeInfo.fr}</dd></div>
            <div class="flex justify-between text-xs"><dt class="text-gray-400">${t('Secteur', 'Sector', lang)}</dt><dd class="text-gray-700 capitalize">${pub.sector}</dd></div>
            <div class="flex justify-between text-xs"><dt class="text-gray-400">${t('Année', 'Year', lang)}</dt><dd class="text-gray-700">${pub.year}</dd></div>
            <div class="flex justify-between text-xs"><dt class="text-gray-400">${t('Auteur', 'Author', lang)}</dt><dd class="text-gray-700 text-right">${pub.author}</dd></div>
          </dl>
        </div>
        ${(related.results || []).length > 0 ? `
        <div>
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">${t('Voir aussi', 'See also', lang)}</h3>
          <div class="space-y-2">
            ${(related.results || []).map((r: any) => `
              <a href="/publications/${r.slug}${lang === 'en' ? '?lang=en' : ''}" class="block text-xs text-gray-500 hover:text-brand-blue py-1.5 transition-colors">${lang === 'en' ? r.title_en || r.title_fr : r.title_fr}</a>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr,
    description: lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr,
    lang,
    path: `/publications/${slug}`
  })
}

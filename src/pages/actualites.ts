import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function actualitesPage(db: D1Database, lang: string): Promise<string> {
  const actualites = await db.prepare('SELECT * FROM actualites WHERE is_published = 1 ORDER BY published_at DESC').all()

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${t('Actualités', 'News', lang)}</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('Actualités', 'News', lang)}</h1>
    <p class="text-gray-400 mt-2 text-sm">${t('Communiqués et événements du CRADES.', 'CRADES press releases and events.', lang)}</p>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${(actualites.results || []).length > 0 ? `
    <div class="divide-y divide-gray-100">
      ${(actualites.results || []).map((actu: any) => `
        <a href="/actualites/${actu.slug}${lang === 'en' ? '?lang=en' : ''}" class="flex items-start gap-4 py-5 group">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1 text-[11px]">
              <span class="text-brand-gold capitalize font-medium">${actu.category}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-800 group-hover:text-brand-blue transition-colors">${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}</h3>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1">${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}</p>
          </div>
          <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-brand-blue mt-2 transition-colors"></i>
        </a>
      `).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <p class="text-sm text-gray-400">${t('Aucune actualité.', 'No news.', lang)}</p>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: t('Actualités', 'News', lang),
    description: t('Actualités du CRADES', 'CRADES news', lang),
    lang,
    path: lang === 'en' ? '/news' : '/actualites'
  })
}

import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function dataPage(db: D1Database, lang: string): Promise<string> {
  const datasets = await db.prepare('SELECT * FROM datasets WHERE is_active = 1 ORDER BY year DESC, created_at DESC').all()

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${t('Données', 'Data', lang)}</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('Données & Statistiques', 'Data & Statistics', lang)}</h1>
    <p class="text-gray-400 mt-2 text-sm">${t('Jeux de données ouverts du CRADES.', 'CRADES open datasets.', lang)}</p>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="divide-y divide-gray-100">
      ${(datasets.results || []).map((ds: any) => `
        <div class="py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1 text-[11px]">
              <span class="font-medium text-brand-gold uppercase tracking-wide">${ds.format.toUpperCase()}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400 capitalize">${ds.sector}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400">${ds.year}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400">${ds.file_size}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-800">${lang === 'en' ? ds.title_en || ds.title_fr : ds.title_fr}</h3>
            <p class="text-xs text-gray-400 mt-0.5">${lang === 'en' ? ds.description_en || ds.description_fr : ds.description_fr}</p>
          </div>
          <button class="text-xs font-medium text-brand-blue border border-gray-200 px-3 py-1.5 rounded-md hover:border-gray-300 transition-colors flex-shrink-0">
            <i class="fas fa-download mr-1"></i>${t('Télécharger', 'Download', lang)}
          </button>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- API -->
<section class="bg-brand-frost border-t border-brand-ice/50 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-5">${t('API publique', 'Public API', lang)}</h2>
    <div class="space-y-2">
      ${[
        { method: 'GET', endpoint: '/api/indicators', desc: lang === 'en' ? 'Key indicators' : 'Indicateurs clés' },
        { method: 'GET', endpoint: '/api/publications', desc: lang === 'en' ? 'Publications' : 'Publications' },
        { method: 'GET', endpoint: '/api/datasets', desc: lang === 'en' ? 'Datasets' : 'Jeux de données' },
        { method: 'GET', endpoint: '/api/search?q=...', desc: lang === 'en' ? 'Search' : 'Recherche' },
      ].map(api => `
        <div class="flex items-center gap-3 bg-white border border-gray-100 rounded-md px-4 py-2.5 text-xs">
          <span class="text-emerald-600 font-mono font-semibold">${api.method}</span>
          <code class="text-brand-blue font-mono flex-1">${api.endpoint}</code>
          <span class="text-gray-400 hidden sm:block">${api.desc}</span>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`
  return layout(content, {
    title: t('Données & Statistiques', 'Data & Statistics', lang),
    description: t('Jeux de données ouverts du CRADES', 'CRADES open datasets', lang),
    lang,
    path: lang === 'en' ? '/data' : '/donnees'
  })
}

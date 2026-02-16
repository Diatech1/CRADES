import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const sectorLabels: Record<string, { fr: string; en: string }> = {
  'industrie': { fr: 'Industrie', en: 'Industry' },
  'commerce': { fr: 'Commerce', en: 'Trade' },
  'pme': { fr: 'PME', en: 'SMEs' },
  'general': { fr: 'Général', en: 'General' },
}

const formatIcons: Record<string, string> = {
  'csv': 'fa-file-csv text-green-600',
  'xlsx': 'fa-file-excel text-emerald-600',
  'json': 'fa-file-code text-blue-600',
  'pdf': 'fa-file-pdf text-red-600',
}

export async function dataPage(db: D1Database, lang: string): Promise<string> {
  const datasets = await db.prepare('SELECT * FROM datasets WHERE is_active = 1 ORDER BY year DESC, created_at DESC').all()

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">${t('Données & Statistiques', 'Data & Statistics', lang)}</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('Données & Statistiques', 'Data & Statistics', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl">${t(
      'Accédez aux jeux de données ouverts du CRADES. Téléchargez des données détaillées sur l\'industrie, le commerce et les PME du Sénégal.',
      'Access CRADES open datasets. Download detailed data on Senegal\'s industry, trade and SMEs.',
      lang
    )}</p>
  </div>
</section>

<!-- API Notice -->
<section class="bg-crades-gold/10 border-b border-crades-gold/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex items-center gap-3">
      <i class="fas fa-code text-crades-gold"></i>
      <p class="text-sm text-crades-gray-700">
        <strong>${t('API publique disponible', 'Public API available', lang)}</strong> — 
        ${t('Accédez aux données via notre API REST :', 'Access data through our REST API:', lang)}
        <code class="bg-white px-2 py-0.5 rounded text-xs font-mono">/api/datasets</code>,
        <code class="bg-white px-2 py-0.5 rounded text-xs font-mono">/api/indicators</code>,
        <code class="bg-white px-2 py-0.5 rounded text-xs font-mono">/api/publications</code>
      </p>
    </div>
  </div>
</section>

<!-- Datasets -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-crades-gray-800">${t('Jeux de données disponibles', 'Available Datasets', lang)}</h2>
      <span class="text-sm text-crades-gray-500">${(datasets.results || []).length} ${t('jeux de données', 'datasets', lang)}</span>
    </div>

    <div class="space-y-4">
      ${(datasets.results || []).map((ds: any) => {
        const sectorInfo = sectorLabels[ds.sector] || sectorLabels['general']
        return `
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded uppercase bg-crades-gray-100 text-crades-gray-600">
                  <i class="fas ${formatIcons[ds.format] || 'fa-file'} text-[10px]"></i>
                  ${ds.format}
                </span>
                <span class="text-xs text-crades-gray-400">${lang === 'en' ? sectorInfo.en : sectorInfo.fr} • ${ds.year}</span>
                <span class="text-xs text-crades-gray-400">${ds.file_size}</span>
              </div>
              <h3 class="font-semibold text-crades-gray-800 mb-1">${lang === 'en' ? ds.title_en || ds.title_fr : ds.title_fr}</h3>
              <p class="text-sm text-crades-gray-500">${lang === 'en' ? ds.description_en || ds.description_fr : ds.description_fr}</p>
              <div class="flex items-center gap-4 mt-2 text-xs text-crades-gray-400">
                <span><i class="fas fa-download mr-1"></i>${ds.download_count} ${t('téléchargements', 'downloads', lang)}</span>
                <span><i class="fas fa-balance-scale mr-1"></i>${ds.license === 'open-data' ? 'Open Data' : ds.license}</span>
              </div>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button class="inline-flex items-center gap-2 bg-crades-green text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-crades-green-dark transition-colors">
                <i class="fas fa-download"></i>
                ${t('Télécharger', 'Download', lang)}
              </button>
              <button class="inline-flex items-center gap-2 bg-crades-gray-50 text-crades-gray-700 border border-crades-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-crades-gray-100 transition-colors">
                <i class="fas fa-eye"></i>
                ${t('Aperçu', 'Preview', lang)}
              </button>
            </div>
          </div>
        </div>`
      }).join('')}
    </div>

    <!-- API Documentation -->
    <div class="mt-12 bg-crades-gray-800 rounded-xl p-6 lg:p-8 text-white">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-crades-gold/20 rounded-lg flex items-center justify-center">
          <i class="fas fa-code text-crades-gold"></i>
        </div>
        <div>
          <h3 class="font-bold text-lg">${t('API REST Publique', 'Public REST API', lang)}</h3>
          <p class="text-white/60 text-sm">${t('Intégrez les données du CRADES dans vos applications', 'Integrate CRADES data into your applications', lang)}</p>
        </div>
      </div>
      
      <div class="space-y-4">
        ${[
          { method: 'GET', endpoint: '/api/indicators', desc: lang === 'en' ? 'Get key economic indicators' : 'Indicateurs économiques clés' },
          { method: 'GET', endpoint: '/api/publications?type=rapport&sector=industrie', desc: lang === 'en' ? 'Publications with filters' : 'Publications avec filtres' },
          { method: 'GET', endpoint: '/api/datasets?sector=commerce&year=2025', desc: lang === 'en' ? 'Available datasets' : 'Jeux de données disponibles' },
          { method: 'GET', endpoint: '/api/search?q=industrie', desc: lang === 'en' ? 'Search across all content' : 'Recherche globale' },
        ].map(api => `
          <div class="bg-white/5 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <span class="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded w-fit">${api.method}</span>
            <code class="text-sm font-mono text-crades-gold flex-1">${api.endpoint}</code>
            <span class="text-xs text-white/50">${api.desc}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-6 p-4 bg-white/5 rounded-lg">
        <p class="text-xs text-white/50 font-mono">${t('Exemple d\'appel', 'Example call', lang)}:</p>
        <code class="text-sm text-crades-gold font-mono block mt-1">curl -H "Accept: application/json" https://crades.gouv.sn/api/indicators</code>
      </div>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: t('Données & Statistiques', 'Data & Statistics', lang),
    description: t('Jeux de données ouverts du CRADES sur l\'industrie et le commerce du Sénégal', 'CRADES open datasets on Senegal industry and trade', lang),
    lang,
    path: lang === 'en' ? '/data' : '/donnees'
  })
}

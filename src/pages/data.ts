import { layout } from '../components/layout'
import { getDatasets, stripHtml, WPPost } from '../utils/wp-api'

export async function dataPage(): Promise<string> {
  const datasets = await getDatasets(20)

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Données</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">Données & Statistiques</h1>
    <p class="text-gray-400 mt-2 text-sm">Jeux de données ouverts du CRADES.</p>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${datasets.length > 0 ? `
    <div class="divide-y divide-gray-100">
      ${datasets.map((ds: WPPost) => `
        <div class="py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1 text-[11px]">
              <span class="font-medium text-brand-gold uppercase tracking-wide">Dataset</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400">${new Date(ds.date).getFullYear()}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-800">${ds.title?.rendered || ''}</h3>
            <p class="text-xs text-gray-400 mt-0.5">${stripHtml(ds.excerpt?.rendered || '')}</p>
          </div>
          <button class="text-xs font-medium text-brand-blue border border-gray-200 px-3 py-1.5 rounded-md hover:border-gray-300 transition-colors flex-shrink-0">
            <i class="fas fa-download mr-1"></i>Télécharger
          </button>
        </div>
      `).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <i class="fas fa-database text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucun jeu de données disponible pour le moment.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des datasets depuis <a href="/admin" class="text-brand-blue underline">WordPress</a>.</p>
    </div>
    `}
  </div>
</section>

<!-- API -->
<section class="bg-brand-frost border-t border-brand-ice/50 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-5">API publique</h2>
    <div class="space-y-2">
      ${[
        { method: 'GET', endpoint: '/api/indicators', desc: 'Indicateurs clés' },
        { method: 'GET', endpoint: '/api/publications', desc: 'Publications' },
        { method: 'GET', endpoint: '/api/datasets', desc: 'Jeux de données' },
        { method: 'GET', endpoint: '/api/search?q=...', desc: 'Recherche' },
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
    title: 'Données & Statistiques',
    description: 'Jeux de données ouverts du CRADES',
    path: '/donnees'
  })
}

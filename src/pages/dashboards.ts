import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function dashboardsPage(db: D1Database, lang: string): Promise<string> {
  const dashboards = await db.prepare('SELECT * FROM dashboards WHERE is_active = 1 ORDER BY display_order ASC').all()
  const indicators = await db.prepare('SELECT * FROM indicators WHERE is_active = 1 ORDER BY display_order ASC').all()

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">${t('Tableaux de bord', 'Dashboards', lang)}</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('Tableaux de bord', 'Dashboards', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl">${t(
      'Visualisations interactives des indicateurs économiques clés du Sénégal.',
      'Interactive visualizations of Senegal\'s key economic indicators.',
      lang
    )}</p>
  </div>
</section>

<!-- Dashboard Grid -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-6 mb-12">
      ${(dashboards.results || []).map((db: any, i: number) => {
        const colors = ['border-l-crades-blue', 'border-l-blue-600', 'border-l-amber-500', 'border-l-purple-600']
        const bgColors = ['bg-crades-blue/5', 'bg-blue-50', 'bg-amber-50', 'bg-purple-50']
        return `
        <div id="${db.slug}" class="bg-white rounded-xl border border-crades-gray-200 border-l-4 ${colors[i % 4]} overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-crades-gray-800">${lang === 'en' ? db.title_en : db.title_fr}</h3>
              <span class="text-xs font-medium px-2 py-1 rounded ${bgColors[i % 4]} capitalize">${db.sector}</span>
            </div>
            <p class="text-sm text-crades-gray-500 mb-6">${lang === 'en' ? db.description_en : db.description_fr}</p>
            
            <!-- Simulated Dashboard Chart -->
            <div class="bg-crades-gray-50 rounded-lg p-4 mb-4">
              <canvas id="chart-${db.slug}" height="200"></canvas>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-crades-gray-400"><i class="far fa-clock mr-1"></i>${t('Mis à jour', 'Updated', lang)}: ${t('Novembre 2025', 'November 2025', lang)}</span>
              <button class="text-crades-blue font-medium hover:underline">
                <i class="fas fa-expand mr-1"></i>${t('Plein écran', 'Full screen', lang)}
              </button>
            </div>
          </div>
        </div>`
      }).join('')}
    </div>

    <!-- Indicators Table -->
    <div class="bg-white rounded-xl border border-crades-gray-200 overflow-hidden">
      <div class="p-6 border-b border-crades-gray-200">
        <h2 class="text-xl font-bold text-crades-gray-800">${t('Synthèse des Indicateurs', 'Indicators Summary', lang)}</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-crades-gray-50">
            <tr>
              <th class="text-left text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Indicateur', 'Indicator', lang)}</th>
              <th class="text-right text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Valeur', 'Value', lang)}</th>
              <th class="text-right text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Unité', 'Unit', lang)}</th>
              <th class="text-center text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Variation', 'Change', lang)}</th>
              <th class="text-left text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Période', 'Period', lang)}</th>
              <th class="text-left text-xs font-semibold text-crades-gray-500 uppercase tracking-wider px-6 py-3">${t('Secteur', 'Sector', lang)}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-crades-gray-100">
            ${(indicators.results || []).map((ind: any) => `
              <tr class="hover:bg-crades-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-crades-gray-800">${lang === 'en' ? ind.name_en : ind.name_fr}</td>
                <td class="px-6 py-4 text-sm text-right font-bold text-crades-gray-800">${ind.value}</td>
                <td class="px-6 py-4 text-sm text-right text-crades-gray-500">${ind.unit}</td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    ind.change_direction === 'up' ? 'bg-green-50 text-green-700' :
                    ind.change_direction === 'down' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
                  }">
                    <i class="fas fa-arrow-${ind.change_direction === 'up' ? 'up' : ind.change_direction === 'down' ? 'down' : 'right'} text-[10px]"></i>
                    ${Math.abs(ind.change_percent)}%
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-crades-gray-500">${ind.period}</td>
                <td class="px-6 py-4 text-sm text-crades-gray-500 capitalize">${ind.sector}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- Charts Script -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const chartConfigs = [
    { id: 'chart-dashboard-industriel', label: '${t("Production Industrielle", "Industrial Production", lang)}', data: [98, 102, 105, 108, 112, 115, 118, 121, 119, 123, 125, 127], color: '#1B5E3B' },
    { id: 'chart-dashboard-commerce-exterieur', label: '${t("Balance Commerciale (Mds FCFA)", "Trade Balance (Bn FCFA)", lang)}', data: [-85, -78, -92, -88, -95, -80, -75, -89, -82, -90, -88, -89], color: '#2563EB' },
    { id: 'chart-dashboard-pme', label: '${t("Créations PME", "SME Creations", lang)}', data: [320, 380, 410, 350, 420, 460, 480, 510, 490, 530, 550, 580], color: '#D97706' },
    { id: 'chart-dashboard-ipp', label: '${t("Indice des Prix", "Price Index", lang)}', data: [100, 101.2, 102.5, 103.1, 103.8, 104.2, 105.1, 105.8, 106.2, 106.9, 107.5, 108.1], color: '#7C3AED' },
  ];
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
  chartConfigs.forEach(cfg => {
    const el = document.getElementById(cfg.id);
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: cfg.label,
          data: cfg.data,
          borderColor: cfg.color,
          backgroundColor: cfg.color + '15',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top' } },
        scales: { y: { beginAtZero: false, grid: { color: '#f1f3f5' } }, x: { grid: { display: false } } },
        interaction: { intersect: false, mode: 'index' },
      }
    });
  });
});
</script>
`
  return layout(content, {
    title: t('Tableaux de bord', 'Dashboards', lang),
    description: t('Tableaux de bord interactifs du CRADES', 'Interactive CRADES dashboards', lang),
    lang,
    path: lang === 'en' ? '/dashboards' : '/tableaux-de-bord'
  })
}

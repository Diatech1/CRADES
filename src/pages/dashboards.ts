import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function dashboardsPage(db: D1Database, lang: string): Promise<string> {
  const dashboards = await db.prepare('SELECT * FROM dashboards WHERE is_active = 1 ORDER BY display_order ASC').all()
  const indicators = await db.prepare('SELECT * FROM indicators WHERE is_active = 1 ORDER BY display_order ASC').all()

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${t('Tableaux de bord', 'Dashboards', lang)}</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('Tableaux de bord', 'Dashboards', lang)}</h1>
    <p class="text-gray-400 mt-2 text-sm">${t('Visualisations interactives des indicateurs économiques.', 'Interactive economic indicator visualizations.', lang)}</p>
  </div>
</section>

<!-- Charts -->
<section class="py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-6">
      ${(dashboards.results || []).map((db: any) => `
        <div class="border border-gray-100 rounded-lg p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-800">${lang === 'en' ? db.title_en : db.title_fr}</h3>
            <span class="text-[11px] text-gray-400 capitalize">${db.sector}</span>
          </div>
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="chart-${db.slug}" height="160"></canvas>
          </div>
          <p class="text-xs text-gray-400 mt-3">${lang === 'en' ? db.description_en : db.description_fr}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Indicators table -->
<section class="bg-brand-frost border-t border-brand-ice/50 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-5">${t('Synthèse des indicateurs', 'Indicators summary', lang)}</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="border-b border-gray-200 text-gray-400 text-left">
            <th class="pb-2 font-medium">${t('Indicateur', 'Indicator', lang)}</th>
            <th class="pb-2 font-medium text-right">${t('Valeur', 'Value', lang)}</th>
            <th class="pb-2 font-medium text-right">${t('Unité', 'Unit', lang)}</th>
            <th class="pb-2 font-medium text-center">${t('Variation', 'Change', lang)}</th>
            <th class="pb-2 font-medium">${t('Période', 'Period', lang)}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          ${(indicators.results || []).map((ind: any) => `
            <tr class="text-gray-600">
              <td class="py-3 font-medium text-gray-800">${lang === 'en' ? ind.name_en : ind.name_fr}</td>
              <td class="py-3 text-right font-semibold text-gray-800">${ind.value}</td>
              <td class="py-3 text-right text-gray-400">${ind.unit}</td>
              <td class="py-3 text-center">
                <span class="${ind.change_direction === 'up' ? 'text-emerald-600' : ind.change_direction === 'down' ? 'text-red-500' : 'text-gray-400'}">
                  ${ind.change_direction === 'up' ? '↑' : ind.change_direction === 'down' ? '↓' : '→'} ${Math.abs(ind.change_percent)}%
                </span>
              </td>
              <td class="py-3 text-gray-400">${ind.period}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const cfgs = [
    { id: 'chart-dashboard-industriel', label: '${t("Production industrielle", "Industrial production", lang)}', data: [98,102,105,108,112,115,118,121,119,123,125,127], color: '#044bad' },
    { id: 'chart-dashboard-commerce-exterieur', label: '${t("Balance commerciale", "Trade balance", lang)}', data: [-85,-78,-92,-88,-95,-80,-75,-89,-82,-90,-88,-89], color: '#b8943e' },
    { id: 'chart-dashboard-pme', label: '${t("Créations PME", "SME creations", lang)}', data: [320,380,410,350,420,460,480,510,490,530,550,580], color: '#6BC1F0' },
    { id: 'chart-dashboard-ipp', label: '${t("Indice des prix", "Price index", lang)}', data: [100,101.2,102.5,103.1,103.8,104.2,105.1,105.8,106.2,106.9,107.5,108.1], color: '#0D2F3F' },
  ];
  cfgs.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: { labels: ['J','F','M','A','M','J','J','A','S','O','N','D'], datasets: [{ label: c.label, data: c.data, borderColor: c.color, backgroundColor: c.color + '10', fill: true, tension: .4, pointRadius: 2, borderWidth: 1.5 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
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

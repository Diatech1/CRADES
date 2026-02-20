import { layout } from '../components/layout'
import { getDashboards, WPPost } from '../utils/wp-api'

export async function dashboardsPage(): Promise<string> {
  const dashboards = await getDashboards(10)

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Tableaux de bord</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">Tableaux de bord</h1>
    <p class="text-gray-400 mt-2 text-sm">Indicateurs clés et graphiques de suivi économique.</p>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-6">
      ${dashboards.length > 0 ? dashboards.map((d: WPPost) => `
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">${d.title?.rendered || ''}</h3>
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="dash-chart-${d.slug}" height="200"></canvas>
          </div>
          ${d.content?.rendered ? `<div class="mt-4 text-xs text-gray-500">${d.content.rendered}</div>` : ''}
        </div>
      `).join('') : `
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">Production industrielle</h3>
          <div class="bg-gray-50 rounded-md p-3"><canvas id="dash-chart-industriel" height="200"></canvas></div>
        </div>
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">Balance commerciale</h3>
          <div class="bg-gray-50 rounded-md p-3"><canvas id="dash-chart-commerce" height="200"></canvas></div>
        </div>
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">Créations PME</h3>
          <div class="bg-gray-50 rounded-md p-3"><canvas id="dash-chart-pme" height="200"></canvas></div>
        </div>
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">Indice des prix</h3>
          <div class="bg-gray-50 rounded-md p-3"><canvas id="dash-chart-ipp" height="200"></canvas></div>
        </div>
      `}
    </div>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  const cfgs = [
    { id: 'dash-chart-industriel', label: 'Production industrielle', data: [98,102,105,108,112,115,118,121,119,123,125,127], color: '#044bad' },
    { id: 'dash-chart-commerce', label: 'Balance commerciale', data: [-85,-78,-92,-88,-95,-80,-75,-89,-82,-90,-88,-89], color: '#b8943e' },
    { id: 'dash-chart-pme', label: 'Créations PME', data: [320,380,410,350,420,460,480,510,490,530,550,580], color: '#3a7fd4' },
    { id: 'dash-chart-ipp', label: 'Indice des prix', data: [100,101.2,102.5,103.1,103.8,104.2,105.1,105.8,106.2,106.9,107.5,108.1], color: '#032d6b' },
  ];
  cfgs.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: { labels: months, datasets: [{ label: c.label, data: c.data, borderColor: c.color, backgroundColor: c.color + '15', fill: true, tension: .4, pointRadius: 3, borderWidth: 2 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } } }
    });
  });
});
</script>
`
  return layout(content, {
    title: 'Tableaux de bord',
    description: 'Tableaux de bord économiques du CRADES',
    path: '/tableaux-de-bord'
  })
}

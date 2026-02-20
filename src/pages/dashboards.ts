import { layout } from '../components/layout'
import { getDashboards, WPPost } from '../utils/wp-api'

export async function dashboardsPage(): Promise<string> {
  const dashboards = await getDashboards(10)

  // Parse chart data from WP meta for each dashboard
  const dashboardConfigs = dashboards.map((d: WPPost, i: number) => {
    let chartData = null
    try {
      const raw = d.meta?.dashboard_chart_data
      if (raw) chartData = typeof raw === 'string' ? JSON.parse(raw) : raw
    } catch (e) { /* invalid JSON — will use fallback */ }
    
    return {
      id: `dash-chart-${d.slug || d.id}`,
      title: d.title?.rendered || `Dashboard ${i + 1}`,
      content: d.content?.rendered || '',
      color: d.meta?.dashboard_chart_color || ['#044bad', '#b8943e', '#3a7fd4', '#032d6b'][i % 4],
      chartData,
    }
  })

  // Fallback data if no dashboards in WP
  const fallbackConfigs = [
    { id: 'dash-chart-industriel', title: 'Production industrielle', content: '', color: '#044bad', chartData: { type: 'line', labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], data: [98,102,105,108,112,115,118,121,119,123,125,127], label: 'Indice de production' } },
    { id: 'dash-chart-commerce', title: 'Balance commerciale', content: '', color: '#b8943e', chartData: { type: 'bar', labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], data: [-85,-78,-92,-88,-95,-80,-75,-89,-82,-90,-88,-89], label: 'Mds FCFA' } },
    { id: 'dash-chart-pme', title: 'Créations PME', content: '', color: '#3a7fd4', chartData: { type: 'line', labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], data: [320,380,410,350,420,460,480,510,490,530,550,580], label: 'Créations / mois' } },
    { id: 'dash-chart-ipp', title: 'Indice des prix', content: '', color: '#032d6b', chartData: { type: 'line', labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], data: [100,101.2,102.5,103.1,103.8,104.2,105.1,105.8,106.2,106.9,107.5,108.1], label: 'IPP (base 100)' } },
  ]

  const configs = dashboardConfigs.length > 0 ? dashboardConfigs : fallbackConfigs

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
      ${configs.map(d => `
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">${d.title}</h3>
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="${d.id}" height="200"></canvas>
          </div>
          ${d.content ? `<div class="mt-3 text-xs text-gray-500">${d.content}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const configs = ${JSON.stringify(configs.map(c => ({
    id: c.id,
    label: c.chartData?.label || c.title,
    data: c.chartData?.data || [],
    labels: c.chartData?.labels || [],
    type: c.chartData?.type || 'line',
    color: c.color,
  })))};

  configs.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el || !c.data.length) return;
    new Chart(el, {
      type: c.type || 'line',
      data: {
        labels: c.labels,
        datasets: [{
          label: c.label,
          data: c.data,
          borderColor: c.color,
          backgroundColor: c.color + '15',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
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

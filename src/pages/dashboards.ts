import { layout } from '../components/layout'
import { getDashboards, WPPost } from '../utils/wp-api'

export async function dashboardsPage(): Promise<string> {
  const dashboards = await getDashboards(10)

  // Parse chart data from WP meta — ONLY show dashboards with valid chart_data
  const defaultColors = ['#044bad', '#b8943e', '#3a7fd4', '#032d6b']
  const validDashboards = dashboards
    .map((d: WPPost, i: number) => {
      let chartData = null
      try {
        const raw = d.meta?.dashboard_chart_data
        if (raw) chartData = typeof raw === 'string' ? JSON.parse(raw) : raw
      } catch (e) { /* invalid JSON */ }

      return {
        id: `dash-chart-${d.slug || d.id}`,
        title: d.title?.rendered || `Dashboard ${i + 1}`,
        content: d.content?.rendered || '',
        color: d.meta?.dashboard_chart_color || defaultColors[i % 4],
        chartData,
        hasChart: chartData && chartData.data && chartData.data.length > 0,
      }
    })

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
    ${validDashboards.length > 0 ? `
    <div class="grid lg:grid-cols-2 gap-6">
      ${validDashboards.map(d => `
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4">${d.title}</h3>
          ${d.hasChart ? `
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="${d.id}" height="200"></canvas>
          </div>
          ` : `
          <div class="bg-gray-50 rounded-md p-6 text-center">
            <i class="fas fa-chart-area text-2xl text-gray-300 mb-2"></i>
            <p class="text-xs text-gray-400">Aucune donnée de graphique configurée.</p>
            <p class="text-[10px] text-gray-300 mt-1">Remplissez le champ <code>dashboard_chart_data</code> dans WordPress.</p>
          </div>
          `}
          ${d.content ? `<div class="mt-3 text-xs text-gray-500">${d.content}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <i class="fas fa-chart-area text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucun tableau de bord disponible.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des dashboards depuis <a href="/admin" class="text-brand-blue underline">l'administration</a>.</p>
    </div>
    `}
  </div>
</section>

${validDashboards.some(d => d.hasChart) ? `
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const configs = ${JSON.stringify(validDashboards.filter(d => d.hasChart).map(c => ({
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
` : ''}
`
  return layout(content, {
    title: 'Tableaux de bord',
    description: 'Tableaux de bord économiques du CRADES',
    path: '/tableaux-de-bord'
  })
}

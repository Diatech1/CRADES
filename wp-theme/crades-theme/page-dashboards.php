<?php
/**
 * Template: Tableaux de bord
 * Exact replica of Hono frontend /tableaux-de-bord
 */
get_template_part( 'template-parts/header' );

$dashboards = get_posts([
    'post_type'   => 'dashboard',
    'numberposts' => 20,
    'orderby'     => 'date',
    'order'       => 'ASC',
]);

$default_colors = [ '#044bad', '#b8943e', '#3a7fd4', '#032d6b' ];
$valid_dashboards = [];
foreach ( $dashboards as $i => $dash ) {
    $raw   = get_post_meta( $dash->ID, 'dashboard_chart_data', true );
    $color = get_post_meta( $dash->ID, 'dashboard_chart_color', true ) ?: $default_colors[ $i % 4 ];
    $slug  = sanitize_title( get_the_title( $dash ) );

    $has_chart = false;
    if ( $raw ) {
        $decoded = json_decode( $raw, true );
        if ( $decoded ) $has_chart = true;
    }

    $valid_dashboards[] = [
        'id'        => 'dash-chart-' . $slug,
        'title'     => get_the_title( $dash ),
        'content'   => apply_filters( 'the_content', $dash->post_content ),
        'color'     => $color,
        'raw'       => $raw,
        'has_chart' => $has_chart,
    ];
}
?>

<?php crades_page_header(
    'Tableaux de bord',
    'Indicateurs cles et graphiques de suivi economique.',
    [ [ 'label' => 'Tableaux de bord' ] ]
); ?>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <?php if ( ! empty( $valid_dashboards ) ) : ?>
    <div class="grid lg:grid-cols-2 gap-6">
      <?php foreach ( $valid_dashboards as $d ) : ?>
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-sm font-medium text-gray-800 mb-4"><?php echo esc_html( $d['title'] ); ?></h3>
          <?php if ( $d['has_chart'] ) : ?>
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="<?php echo esc_attr( $d['id'] ); ?>" height="200"></canvas>
          </div>
          <?php else : ?>
          <div class="bg-gray-50 rounded-md p-6 text-center">
            <i class="fas fa-chart-area text-2xl text-gray-300 mb-2"></i>
            <p class="text-xs text-gray-400">Aucune donnee de graphique configuree.</p>
            <p class="text-[10px] text-gray-300 mt-1">Remplissez le champ <code>dashboard_chart_data</code> dans WordPress.</p>
          </div>
          <?php endif; ?>
          <?php if ( $d['content'] ) : ?>
            <div class="mt-3 text-xs text-gray-500"><?php echo $d['content']; ?></div>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div class="text-center py-16">
      <i class="fas fa-chart-area text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucun tableau de bord disponible.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des dashboards depuis <a href="<?php echo esc_url( admin_url('edit.php?post_type=dashboard') ); ?>" class="text-brand-blue underline">l'administration</a>.</p>
    </div>
    <?php endif; ?>
  </div>
</section>

<?php
// Build chart configs for JS
$chart_js_configs = [];
foreach ( $valid_dashboards as $d ) {
    if ( $d['has_chart'] ) {
        $chart_js_configs[] = [
            'id'    => $d['id'],
            'title' => $d['title'],
            'data'  => $d['raw'],
            'color' => $d['color'],
        ];
    }
}

if ( ! empty( $chart_js_configs ) ) :
?>
<script>
document.addEventListener('DOMContentLoaded', function() {
  var configs = <?php echo json_encode( $chart_js_configs ); ?>;
  configs.forEach(function(cfg) {
    try {
      var chartData = JSON.parse(cfg.data);
      var color = cfg.color;

      // Support simplified format: { labels, data, type, label }
      if (chartData.labels && chartData.data && !chartData.datasets) {
        var type = chartData.type || 'line';
        chartData = {
          type: type,
          data: {
            labels: chartData.labels,
            datasets: [{
              label: chartData.label || cfg.title,
              data: chartData.data,
              borderColor: color,
              backgroundColor: color + '15',
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
        };
      } else {
        // Full Chart.js config format
        if (chartData.data && chartData.data.datasets) {
          chartData.data.datasets.forEach(function(ds, i) {
            var colors = [color, '#b8943e', '#3a7fd4', '#032d6b'];
            var c = colors[i % colors.length];
            if (!ds.borderColor) ds.borderColor = c;
            if (!ds.backgroundColor) ds.backgroundColor = c + '15';
            if (!ds.tension && ds.tension !== 0) ds.tension = 0.4;
            if (!ds.pointRadius && ds.pointRadius !== 0) ds.pointRadius = 3;
          });
        }
        if (!chartData.options) chartData.options = {};
        chartData.options.responsive = true;
        chartData.options.plugins = chartData.options.plugins || {};
        chartData.options.plugins.legend = { display: false };
      }

      new Chart(document.getElementById(cfg.id), chartData);
    } catch(e) { console.error('Chart error:', cfg.id, e); }
  });
});
</script>
<?php endif; ?>

<?php get_template_part( 'template-parts/footer' ); ?>

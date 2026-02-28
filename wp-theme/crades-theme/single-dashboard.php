<?php
/**
 * Single Dashboard
 * Chart.js powered dashboard detail page
 */
get_template_part( 'template-parts/header' );

$color    = get_post_meta( get_the_ID(), 'dashboard_chart_color', true ) ?: '#044bad';
$raw      = get_post_meta( get_the_ID(), 'dashboard_chart_data', true );
$source   = get_post_meta( get_the_ID(), 'dashboard_source', true );
$period   = get_post_meta( get_the_ID(), 'dashboard_period', true );
$has_chart = false;
if ( $raw ) {
    $decoded = json_decode( $raw, true );
    if ( $decoded ) $has_chart = true;
}
?>

<?php crades_page_header(
    get_the_title(),
    $source ? 'Source : ' . $source : '',
    [
        [ 'url' => home_url('/tableaux-de-bord/'), 'label' => 'Tableaux de bord' ],
        [ 'label' => wp_trim_words( get_the_title(), 5, '...' ) ],
    ]
); ?>

<section class="py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <?php if ( $has_chart ) : ?>
    <div class="border border-gray-100 rounded-lg p-6 mb-8">
      <div class="bg-gray-50 rounded-md p-4">
        <canvas id="single-dashboard-chart" height="300"></canvas>
      </div>
      <?php if ( $period ) : ?>
        <p class="text-[10px] text-gray-400 mt-3 text-right">Periode : <?php echo esc_html( $period ); ?></p>
      <?php endif; ?>
    </div>
    <?php endif; ?>

    <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
      <?php the_content(); ?>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-100">
      <a href="<?php echo esc_url( home_url('/tableaux-de-bord/') ); ?>" class="text-xs text-brand-blue hover:underline">
        <i class="fas fa-arrow-left mr-1"></i>Tous les tableaux de bord
      </a>
    </div>
  </div>
</section>

<?php if ( $has_chart ) : ?>
<script>
document.addEventListener('DOMContentLoaded', function() {
  try {
    var chartData = <?php echo $raw; ?>;
    var color = '<?php echo esc_js( $color ); ?>';

    if (chartData.labels && chartData.data && !chartData.datasets) {
      var type = chartData.type || 'line';
      chartData = {
        type: type,
        data: {
          labels: chartData.labels,
          datasets: [{
            label: chartData.label || '<?php echo esc_js( get_the_title() ); ?>',
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
      if (chartData.data && chartData.data.datasets) {
        chartData.data.datasets.forEach(function(ds) {
          if (!ds.borderColor) ds.borderColor = color;
          if (!ds.backgroundColor) ds.backgroundColor = color + '15';
        });
      }
      if (!chartData.options) chartData.options = {};
      chartData.options.responsive = true;
    }

    new Chart(document.getElementById('single-dashboard-chart'), chartData);
  } catch(e) { console.error('Chart error:', e); }
});
</script>
<?php endif; ?>

<?php get_template_part( 'template-parts/footer' ); ?>

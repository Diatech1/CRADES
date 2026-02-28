<?php
/**
 * Template: Donnees & Statistiques
 * Exact replica of Hono frontend /donnees
 */
get_template_part( 'template-parts/header' );

$datasets = get_posts([
    'post_type'   => 'dataset',
    'numberposts' => 50,
    'orderby'     => 'date',
    'order'       => 'DESC',
]);
?>

<?php crades_page_header(
    'Donnees & Statistiques',
    'Jeux de donnees ouverts du CRADES.',
    [ [ 'label' => 'Donnees' ] ]
); ?>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <?php if ( ! empty( $datasets ) ) : ?>
    <div class="divide-y divide-gray-100">
      <?php foreach ( $datasets as $ds ) :
          $format      = get_post_meta( $ds->ID, 'dataset_format', true );
          $download_url = get_post_meta( $ds->ID, 'dataset_download_url', true );
      ?>
        <div class="py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1 text-[11px]">
              <span class="font-medium text-brand-gold uppercase tracking-wide">Dataset</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-gray-400"><?php echo esc_html( get_the_date( 'Y', $ds ) ); ?></span>
              <?php if ( $format ) : ?>
                <span class="text-gray-300">&middot;</span>
                <span class="text-gray-400 uppercase"><?php echo esc_html( $format ); ?></span>
              <?php endif; ?>
            </div>
            <h3 class="text-sm font-medium text-gray-800"><?php echo esc_html( get_the_title( $ds ) ); ?></h3>
            <p class="text-xs text-gray-400 mt-0.5"><?php echo esc_html( wp_trim_words( $ds->post_excerpt ?: $ds->post_content, 20, '...' ) ); ?></p>
          </div>
          <?php if ( $download_url ) : ?>
          <a href="<?php echo esc_url( $download_url ); ?>" class="text-xs font-medium text-brand-blue border border-gray-200 px-3 py-1.5 rounded-md hover:border-gray-300 transition-colors flex-shrink-0" target="_blank">
            <i class="fas fa-download mr-1"></i>Telecharger
          </a>
          <?php else : ?>
          <button class="text-xs font-medium text-brand-blue border border-gray-200 px-3 py-1.5 rounded-md hover:border-gray-300 transition-colors flex-shrink-0">
            <i class="fas fa-download mr-1"></i>Telecharger
          </button>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div class="text-center py-16">
      <i class="fas fa-database text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucun jeu de donnees disponible pour le moment.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des datasets depuis <a href="<?php echo esc_url( admin_url('edit.php?post_type=dataset') ); ?>" class="text-brand-blue underline">WordPress</a>.</p>
    </div>
    <?php endif; ?>
  </div>
</section>

<!-- API -->
<section class="bg-brand-frost border-t border-brand-ice/50 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-5">API publique</h2>
    <div class="space-y-2">
      <?php
      $api_endpoints = [
          [ 'GET', rest_url('wp/v2/indicateur'), 'Indicateurs cles' ],
          [ 'GET', rest_url('wp/v2/publication'), 'Publications' ],
          [ 'GET', rest_url('wp/v2/dataset'), 'Jeux de donnees' ],
          [ 'GET', rest_url('wp/v2/search?search=...'), 'Recherche' ],
      ];
      foreach ( $api_endpoints as $api ) : ?>
        <div class="flex items-center gap-3 bg-white border border-gray-100 rounded-md px-4 py-2.5 text-xs">
          <span class="text-emerald-600 font-mono font-semibold"><?php echo esc_html( $api[0] ); ?></span>
          <code class="text-brand-blue font-mono flex-1"><?php echo esc_html( $api[1] ); ?></code>
          <span class="text-gray-400 hidden sm:block"><?php echo esc_html( $api[2] ); ?></span>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

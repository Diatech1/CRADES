<?php
/**
 * Template: Publications
 * Exact replica of Hono frontend /publications
 */
get_template_part( 'template-parts/header' );

$publications = get_posts([
    'post_type'   => 'publication',
    'numberposts' => 50,
    'orderby'     => 'date',
    'order'       => 'DESC',
]);
?>

<?php crades_page_header(
    'Publications',
    'Etudes, rapports et analyses du CRADES.',
    [ [ 'label' => 'Publications' ] ]
); ?>

<section class="border-b border-gray-100 bg-white sticky top-16 z-40">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3">
    <span class="text-[11px] text-gray-400"><?php echo count( $publications ); ?> resultat(s)</span>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <?php if ( ! empty( $publications ) ) : ?>
    <div class="divide-y divide-gray-100">
      <?php foreach ( $publications as $pub ) :
          $year = get_post_meta( $pub->ID, 'publication_year', true ) ?: get_the_date( 'Y', $pub );
          $sectors = get_the_terms( $pub->ID, 'sector' );
          $sector_name = ( $sectors && ! is_wp_error( $sectors ) ) ? $sectors[0]->name : '';
      ?>
        <a href="<?php echo get_permalink( $pub ); ?>" class="flex items-start gap-4 py-5 group">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] font-medium text-brand-gold uppercase tracking-wide">Publication</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-[11px] text-gray-400"><?php echo esc_html( $year ); ?></span>
            </div>
            <h3 class="text-sm font-medium text-gray-800 group-hover:text-brand-blue transition-colors"><?php echo esc_html( get_the_title( $pub ) ); ?></h3>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1"><?php echo esc_html( wp_trim_words( $pub->post_excerpt ?: $pub->post_content, 20, '...' ) ); ?></p>
          </div>
          <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-brand-blue mt-2 transition-colors"></i>
        </a>
      <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div class="text-center py-16">
      <i class="fas fa-book-open text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucune publication pour le moment.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des publications depuis <a href="<?php echo esc_url( admin_url('edit.php?post_type=publication') ); ?>" class="text-brand-blue underline">WordPress</a>.</p>
    </div>
    <?php endif; ?>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

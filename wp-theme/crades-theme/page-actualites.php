<?php
/**
 * Template: Actualites
 * Exact replica of Hono frontend /actualites
 */
get_template_part( 'template-parts/header' );

$posts = get_posts([
    'post_type'   => 'post',
    'numberposts' => 50,
    'orderby'     => 'date',
    'order'       => 'DESC',
]);
?>

<?php crades_page_header(
    'Actualites',
    'Les dernieres nouvelles du CRADES.',
    [ [ 'label' => 'Actualites' ] ]
); ?>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <?php if ( ! empty( $posts ) ) : ?>
    <div class="grid md:grid-cols-3 gap-6">
      <?php foreach ( $posts as $post_item ) : ?>
        <a href="<?php echo get_permalink( $post_item ); ?>" class="bg-white rounded-lg border border-brand-ice/60 p-5 hover:border-brand-sky/40 hover:shadow-sm transition-all group">
          <span class="text-[11px] text-gray-400"><?php echo get_the_date( 'j F Y', $post_item ); ?></span>
          <h3 class="text-sm font-medium text-gray-800 mt-2 group-hover:text-brand-blue transition-colors line-clamp-2"><?php echo esc_html( get_the_title( $post_item ) ); ?></h3>
          <p class="text-xs text-gray-400 mt-2 line-clamp-3"><?php echo esc_html( wp_trim_words( $post_item->post_excerpt ?: $post_item->post_content, 25, '...' ) ); ?></p>
        </a>
      <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div class="text-center py-16">
      <i class="fas fa-newspaper text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucune actualite pour le moment.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des articles depuis <a href="<?php echo esc_url( admin_url('edit.php') ); ?>" class="text-brand-blue underline">WordPress</a>.</p>
    </div>
    <?php endif; ?>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

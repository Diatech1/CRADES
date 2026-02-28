<?php
/**
 * Generic Archive Template
 * Used for category, tag, date, author archives
 */
get_template_part( 'template-parts/header' );

$title = '';
if ( is_category() ) {
    $title = single_cat_title( '', false );
} elseif ( is_tag() ) {
    $title = single_tag_title( '', false );
} elseif ( is_author() ) {
    $title = get_the_author();
} elseif ( is_date() ) {
    $title = 'Archives';
} else {
    $title = post_type_archive_title( '', false ) ?: 'Archives';
}
?>

<?php crades_page_header(
    $title,
    '',
    [ [ 'label' => $title ] ]
); ?>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <?php if ( have_posts() ) : ?>
    <div class="grid md:grid-cols-3 gap-6">
      <?php while ( have_posts() ) : the_post(); ?>
        <a href="<?php the_permalink(); ?>" class="bg-white rounded-lg border border-brand-ice/60 p-5 hover:border-brand-sky/40 hover:shadow-sm transition-all group">
          <span class="text-[11px] text-gray-400"><?php echo get_the_date( 'j F Y' ); ?></span>
          <h3 class="text-sm font-medium text-gray-800 mt-2 group-hover:text-brand-blue transition-colors line-clamp-2"><?php the_title(); ?></h3>
          <p class="text-xs text-gray-400 mt-2 line-clamp-3"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 25, '...' ) ); ?></p>
        </a>
      <?php endwhile; ?>
    </div>

    <!-- Pagination -->
    <div class="mt-10 flex items-center justify-center gap-2 text-sm">
      <?php
      echo paginate_links([
          'prev_text' => '<i class="fas fa-chevron-left text-xs"></i> Precedent',
          'next_text' => 'Suivant <i class="fas fa-chevron-right text-xs"></i>',
          'type'      => 'list',
          'class'     => 'text-xs text-gray-500',
      ]);
      ?>
    </div>
    <?php else : ?>
    <div class="text-center py-16">
      <i class="fas fa-folder-open text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucun contenu disponible.</p>
    </div>
    <?php endif; ?>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

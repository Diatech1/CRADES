<?php
/**
 * Single Post / Actualite
 * Exact replica of Hono single post template
 */
get_template_part( 'template-parts/header' );

$thumb = get_the_post_thumbnail_url( get_the_ID(), 'crades-hero' );
?>

<?php crades_page_header(
    get_the_title(),
    '',
    [
        [ 'url' => home_url('/actualites/'), 'label' => 'Actualites' ],
        [ 'label' => wp_trim_words( get_the_title(), 5, '...' ) ],
    ]
); ?>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="flex items-center gap-3 text-[11px] text-gray-400 mb-6">
      <span><?php echo get_the_date( 'j F Y' ); ?></span>
      <?php
      $categories = get_the_category();
      if ( $categories ) :
          foreach ( $categories as $cat ) :
      ?>
        <span class="text-gray-300">&middot;</span>
        <span class="text-brand-gold"><?php echo esc_html( $cat->name ); ?></span>
      <?php
          endforeach;
      endif;
      ?>
    </div>

    <?php if ( $thumb ) : ?>
    <div class="mb-8 rounded-lg overflow-hidden">
      <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-auto">
    </div>
    <?php endif; ?>

    <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
      <?php the_content(); ?>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
      <a href="<?php echo esc_url( home_url('/actualites/') ); ?>" class="text-xs text-brand-blue hover:underline">
        <i class="fas fa-arrow-left mr-1"></i>Toutes les actualites
      </a>
    </div>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

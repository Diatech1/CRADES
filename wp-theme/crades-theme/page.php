<?php
/**
 * Generic Page Template
 * For pages without a specific template
 */
get_template_part( 'template-parts/header' );
?>

<?php crades_page_header(
    get_the_title(),
    '',
    [ [ 'label' => get_the_title() ] ]
); ?>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
      <?php the_content(); ?>
    </div>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

<?php
/**
 * Single Publication
 * Exact replica of Hono single publication template
 */
get_template_part( 'template-parts/header' );

$year     = get_post_meta( get_the_ID(), 'publication_year', true ) ?: get_the_date( 'Y' );
$authors  = get_post_meta( get_the_ID(), 'publication_authors', true );
$pdf_url  = get_post_meta( get_the_ID(), 'publication_pdf_url', true );
$pages    = get_post_meta( get_the_ID(), 'publication_pages', true );
$isbn     = get_post_meta( get_the_ID(), 'publication_isbn', true );
$doi      = get_post_meta( get_the_ID(), 'publication_doi', true );
$pub_type = get_the_terms( get_the_ID(), 'publication_type' );
$sectors  = get_the_terms( get_the_ID(), 'sector' );
$thumb    = get_the_post_thumbnail_url( get_the_ID(), 'crades-hero' );
?>

<!-- Header -->
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="<?php echo esc_url( home_url('/') ); ?>" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="<?php echo esc_url( home_url('/publications/') ); ?>" class="hover:text-white">Publications</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300"><?php echo esc_html( wp_trim_words( get_the_title(), 6, '...' ) ); ?></span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white"><?php the_title(); ?></h1>
    <div class="flex items-center gap-3 mt-3 text-[12px]">
      <span class="text-brand-blue font-medium"><?php echo esc_html( $year ); ?></span>
      <?php if ( $pub_type && ! is_wp_error( $pub_type ) ) : ?>
        <span class="text-gray-500">&middot;</span>
        <span class="text-gray-400"><?php echo esc_html( $pub_type[0]->name ); ?></span>
      <?php endif; ?>
      <?php if ( $sectors && ! is_wp_error( $sectors ) ) : ?>
        <span class="text-gray-500">&middot;</span>
        <span class="text-brand-gold"><?php echo esc_html( $sectors[0]->name ); ?></span>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">

    <?php if ( $thumb ) : ?>
    <div class="mb-8 rounded-lg overflow-hidden">
      <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-auto">
    </div>
    <?php endif; ?>

    <!-- Meta info -->
    <?php if ( $authors || $pages || $isbn || $doi ) : ?>
    <div class="mb-8 border border-gray-100 rounded-lg p-5 space-y-2 text-xs text-gray-500">
      <?php if ( $authors ) : ?>
        <div class="flex gap-2"><span class="font-medium text-gray-700 w-20">Auteur(s)</span><span><?php echo esc_html( $authors ); ?></span></div>
      <?php endif; ?>
      <?php if ( $pages ) : ?>
        <div class="flex gap-2"><span class="font-medium text-gray-700 w-20">Pages</span><span><?php echo esc_html( $pages ); ?></span></div>
      <?php endif; ?>
      <?php if ( $isbn ) : ?>
        <div class="flex gap-2"><span class="font-medium text-gray-700 w-20">ISBN</span><span><?php echo esc_html( $isbn ); ?></span></div>
      <?php endif; ?>
      <?php if ( $doi ) : ?>
        <div class="flex gap-2"><span class="font-medium text-gray-700 w-20">DOI</span><span><?php echo esc_html( $doi ); ?></span></div>
      <?php endif; ?>
    </div>
    <?php endif; ?>

    <!-- Content -->
    <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
      <?php the_content(); ?>
    </div>

    <?php if ( $pdf_url ) : ?>
    <div class="mt-8 pt-6 border-t border-gray-100">
      <a href="<?php echo esc_url( $pdf_url ); ?>" target="_blank" class="inline-flex items-center gap-2 text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
        <i class="fas fa-file-pdf"></i>Telecharger le PDF
      </a>
    </div>
    <?php endif; ?>

    <div class="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
      <a href="<?php echo esc_url( home_url('/publications/') ); ?>" class="text-xs text-brand-blue hover:underline">
        <i class="fas fa-arrow-left mr-1"></i>Toutes les publications
      </a>
    </div>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

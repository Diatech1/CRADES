<?php
/**
 * 404 Error Page
 * Exact replica of Hono 404 design
 */
get_template_part( 'template-parts/header' );
?>

<section class="py-24 lg:py-32">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
    <div class="text-[120px] font-extrabold text-brand-ice leading-none mb-4">404</div>
    <h2 class="font-display text-2xl text-brand-navy mb-4">Page introuvable</h2>
    <p class="text-sm text-gray-400 max-w-md mx-auto mb-8">
      La page que vous recherchez n'existe pas ou a ete deplacee.
    </p>
    <a href="<?php echo esc_url( home_url('/') ); ?>" class="inline-flex items-center gap-2 text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
      <i class="fas fa-home text-xs"></i>Retour a l'accueil
    </a>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

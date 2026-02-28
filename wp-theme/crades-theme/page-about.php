<?php
/**
 * Template: A propos
 * Exact replica of Hono frontend /a-propos
 */
get_template_part( 'template-parts/header' );
?>

<?php crades_page_header(
    'A propos du CRADES',
    'Centre de Recherche, d\'Analyse des Echanges et Statistiques',
    [ [ 'label' => 'A propos' ] ]
); ?>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <?php
    // Try to use page content if available
    $page_content = get_the_content();
    if ( trim( $page_content ) ) :
    ?>
      <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <?php the_content(); ?>
      </div>
    <?php else : ?>
    <div class="space-y-8">
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Notre mission</h2>
        <p class="text-sm text-gray-600 leading-relaxed">Le CRADES est l'institution de reference pour la production, l'analyse et la diffusion de donnees economiques dans les domaines de l'industrie et du commerce au Senegal. Rattache au Ministere de l'Industrie et du Commerce, le CRADES a pour mission de fournir aux decideurs publics et aux acteurs economiques les informations statistiques necessaires a la prise de decision.</p>
      </div>
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Nos activites</h2>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start gap-3"><i class="fas fa-chart-bar text-brand-blue mt-0.5"></i>Production et diffusion de statistiques industrielles et commerciales</li>
          <li class="flex items-start gap-3"><i class="fas fa-search text-brand-blue mt-0.5"></i>Etudes et analyses sectorielles</li>
          <li class="flex items-start gap-3"><i class="fas fa-file-alt text-brand-blue mt-0.5"></i>Publication de notes de conjoncture et rapports</li>
          <li class="flex items-start gap-3"><i class="fas fa-database text-brand-blue mt-0.5"></i>Gestion de bases de donnees ouvertes</li>
          <li class="flex items-start gap-3"><i class="fas fa-handshake text-brand-blue mt-0.5"></i>Appui aux politiques publiques</li>
        </ul>
      </div>
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Contact</h2>
        <p class="text-sm text-gray-600"><i class="fas fa-map-marker-alt text-brand-blue mr-2"></i>Rue Aime Cesaire, Plateau, Dakar, Senegal</p>
        <p class="text-sm text-gray-600 mt-2"><i class="fas fa-phone text-brand-blue mr-2"></i>+221 33 889 12 34</p>
        <p class="text-sm text-gray-600 mt-2"><i class="fas fa-envelope text-brand-blue mr-2"></i>contact@crades.gouv.sn</p>
      </div>
    </div>
    <?php endif; ?>
  </div>
</section>

<?php get_template_part( 'template-parts/footer' ); ?>

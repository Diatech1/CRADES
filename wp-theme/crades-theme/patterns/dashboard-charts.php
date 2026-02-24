<?php
/**
 * Title: Tableaux de bord
 * Slug: crades/dashboard-charts
 * Categories: crades-sections
 * Keywords: dashboard, charts, graphiques, tableaux
 * Block Types: core/group
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|70"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--70)">

  <!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}}},"textColor":"navy"} -->
  <h2 class="has-text-align-center has-navy-color has-text-color" style="margin-bottom:var(--wp--preset--spacing--30)">Tableaux de bord</h2>
  <!-- /wp:heading -->

  <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px"},"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"textColor":"gray"} -->
  <p class="has-text-align-center has-gray-color has-text-color" style="font-size:14px;margin-bottom:var(--wp--preset--spacing--50)">Visualisations interactives des principaux indicateurs economiques.</p>
  <!-- /wp:paragraph -->

  <!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40"}}}} -->
  <div class="wp-block-columns">

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"crades-chart-wrap","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"12px","color":"#e5e7eb","width":"1px"}},"layout":{"type":"constrained"}} -->
      <div class="wp-block-group crades-chart-wrap" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding:var(--wp--preset--spacing--40)">
        <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}},"textColor":"navy"} -->
        <h3 class="has-navy-color has-text-color" style="font-size:1rem;font-weight:700">Production Industrielle</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"gray"} -->
        <p class="has-gray-color has-text-color" style="font-size:12px">Les tableaux de bord sont generes dynamiquement via le plugin CRADES Manager. Ajoutez des dashboards depuis l'administration WordPress.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"className":"crades-chart-wrap","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"12px","color":"#e5e7eb","width":"1px"}},"layout":{"type":"constrained"}} -->
      <div class="wp-block-group crades-chart-wrap" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding:var(--wp--preset--spacing--40)">
        <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}},"textColor":"navy"} -->
        <h3 class="has-navy-color has-text-color" style="font-size:1rem;font-weight:700">Balance Commerciale</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"gray"} -->
        <p class="has-gray-color has-text-color" style="font-size:12px">Les graphiques sont alimentes par les meta-donnees chart_data et chart_color des Custom Post Types.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->

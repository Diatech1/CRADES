<?php
/**
 * Title: Dernieres publications
 * Slug: crades/latest-publications
 * Categories: crades-sections
 * Keywords: publications, recentes, grille
 * Block Types: core/query
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">

  <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
  <div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--50)">
    <!-- wp:heading {"level":2,"textColor":"navy"} -->
    <h2 class="has-navy-color has-text-color">Publications recentes</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"style":{"typography":{"fontSize":"13px","fontWeight":"500"}}} -->
    <p style="font-size:13px;font-weight:500"><a href="/publications/">Voir toutes &rarr;</a></p>
    <!-- /wp:paragraph -->
  </div>
  <!-- /wp:group -->

  <!-- wp:query {"queryId":10,"query":{"perPage":4,"postType":"publication","order":"desc","orderBy":"date"},"layout":{"type":"constrained"}} -->
    <!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"grid","columnCount":4}} -->
      <!-- wp:group {"className":"crades-card","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"8px","color":"#e5e7eb","width":"1px"}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
      <div class="wp-block-group crades-card has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--40)">
        <!-- wp:post-date {"format":"Y","style":{"typography":{"fontSize":"11px","fontWeight":"600"}},"textColor":"primary"} /-->
        <!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"fontSize":"14px","fontWeight":"600","lineHeight":"1.4"}}} /-->
        <!-- wp:post-excerpt {"moreText":"","excerptLength":15,"style":{"typography":{"fontSize":"12px"}},"textColor":"gray"} /-->
        <!-- wp:post-terms {"term":"sector","style":{"typography":{"fontSize":"10px"}},"textColor":"gold"} /-->
      </div>
      <!-- /wp:group -->
    <!-- /wp:post-template -->
    <!-- wp:query-no-results -->
      <!-- wp:paragraph {"align":"center","textColor":"gray","style":{"typography":{"fontSize":"13px"}}} -->
      <p class="has-text-align-center has-gray-color has-text-color" style="font-size:13px">Aucune publication disponible pour le moment.</p>
      <!-- /wp:paragraph -->
    <!-- /wp:query-no-results -->
  <!-- /wp:query -->

</div>
<!-- /wp:group -->

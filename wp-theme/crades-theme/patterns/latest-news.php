<?php
/**
 * Title: Dernieres actualites
 * Slug: crades/latest-news
 * Categories: crades-sections
 * Keywords: actualites, news, recentes
 * Block Types: core/query
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|70"}}},"backgroundColor":"light-gray","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-light-gray-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--70)">

  <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
  <div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--50)">
    <!-- wp:heading {"level":2,"textColor":"navy"} -->
    <h2 class="has-navy-color has-text-color">Actualites</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"style":{"typography":{"fontSize":"13px","fontWeight":"500"}}} -->
    <p style="font-size:13px;font-weight:500"><a href="/actualites/">Toutes les actualites &rarr;</a></p>
    <!-- /wp:paragraph -->
  </div>
  <!-- /wp:group -->

  <!-- wp:query {"queryId":11,"query":{"perPage":3,"postType":"post","order":"desc","orderBy":"date"},"layout":{"type":"constrained"}} -->
    <!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"grid","columnCount":3}} -->
      <!-- wp:group {"className":"crades-card","style":{"spacing":{"padding":{"top":"0","bottom":"var:preset|spacing|40","left":"0","right":"0"}},"border":{"radius":"8px","color":"#e5e7eb","width":"1px"}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
      <div class="wp-block-group crades-card has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding-top:0;padding-bottom:var(--wp--preset--spacing--40);padding-left:0;padding-right:0">
        <!-- wp:post-featured-image {"style":{"border":{"radius":{"topLeft":"8px","topRight":"8px","bottomLeft":"0px","bottomRight":"0px"}}},"height":"180px"} /-->
        <!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"layout":{"type":"constrained"}} -->
        <div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40)">
          <!-- wp:post-date {"format":"j M Y","style":{"typography":{"fontSize":"11px"}},"textColor":"gray"} /-->
          <!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"fontSize":"14px","fontWeight":"600","lineHeight":"1.4"}}} /-->
          <!-- wp:post-excerpt {"moreText":"","excerptLength":18,"style":{"typography":{"fontSize":"12px"}},"textColor":"gray"} /-->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:group -->
    <!-- /wp:post-template -->
    <!-- wp:query-no-results -->
      <!-- wp:paragraph {"align":"center","textColor":"gray","style":{"typography":{"fontSize":"13px"}}} -->
      <p class="has-text-align-center has-gray-color has-text-color" style="font-size:13px">Aucune actualite disponible pour le moment.</p>
      <!-- /wp:paragraph -->
    <!-- /wp:query-no-results -->
  <!-- /wp:query -->

</div>
<!-- /wp:group -->

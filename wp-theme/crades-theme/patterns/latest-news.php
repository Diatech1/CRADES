<?php
/**
 * Title: Dernières actualités
 * Slug: crades/latest-news
 * Categories: crades, crades-sections
 * Description: Grille de 3 cartes affichant les dernières actualités
 * Keywords: actualites, news, cards, grid
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"frost","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-frost-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">

    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"20px","fontWeight":"700"}},"textColor":"navy"} -->
        <h2 class="wp-block-heading has-navy-color has-text-color" style="font-size:20px;font-weight:700">Actualités</h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"style":{"typography":{"fontSize":"13px"}},"textColor":"primary"} -->
        <p class="has-primary-color has-text-color" style="font-size:13px"><a href="/actualites/">Voir toutes →</a></p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:query {"queryId":21,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
    <div class="wp-block-query">
        <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
            <!-- wp:group {"style":{"border":{"radius":"8px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
            <div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--40)">
                <!-- wp:post-date {"style":{"typography":{"fontSize":"11px"}},"textColor":"gray"} /-->
                <!-- wp:post-title {"isLink":true,"level":3,"style":{"typography":{"fontSize":"15px","fontWeight":"600"}},"textColor":"navy"} /-->
                <!-- wp:post-excerpt {"moreText":"","excerptLength":20,"style":{"typography":{"fontSize":"12px"}},"textColor":"gray"} /-->
            </div>
            <!-- /wp:group -->
        <!-- /wp:post-template -->

        <!-- wp:query-no-results -->
            <!-- wp:paragraph {"align":"center","textColor":"gray","style":{"typography":{"fontSize":"13px"}}} -->
            <p class="has-text-align-center has-gray-color has-text-color" style="font-size:13px">Aucune actualité pour le moment.</p>
            <!-- /wp:paragraph -->
        <!-- /wp:query-no-results -->
    </div>
    <!-- /wp:query -->

</div>
<!-- /wp:group -->

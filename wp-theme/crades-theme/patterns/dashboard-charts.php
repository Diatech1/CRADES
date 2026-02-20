<?php
/**
 * Title: Tableaux de bord (Dashboard Charts)
 * Slug: crades/dashboard-charts
 * Categories: crades, crades-sections
 * Description: Section avec 4 graphiques Chart.js pour les principaux indicateurs économiques
 * Keywords: dashboard, charts, graphiques, indicateurs
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">

    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"20px","fontWeight":"700"}},"textColor":"navy"} -->
        <h2 class="wp-block-heading has-navy-color has-text-color" style="font-size:20px;font-weight:700">Tableaux de bord</h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"style":{"typography":{"fontSize":"13px"}},"textColor":"primary"} -->
        <p class="has-primary-color has-text-color" style="font-size:13px"><a href="/tableaux-de-bord/">Voir tout →</a></p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40"}}}} -->
    <div class="wp-block-columns">
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"border":{"radius":"8px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
            <div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--30)">
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","fontWeight":"600"}},"textColor":"navy"} -->
                <p class="has-navy-color has-text-color" style="font-size:12px;font-weight:600">Production industrielle</p>
                <!-- /wp:paragraph -->
                <!-- wp:html -->
                <canvas id="chart-production" height="160"></canvas>
                <!-- /wp:html -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"border":{"radius":"8px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
            <div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--30)">
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","fontWeight":"600"}},"textColor":"navy"} -->
                <p class="has-navy-color has-text-color" style="font-size:12px;font-weight:600">Balance commerciale</p>
                <!-- /wp:paragraph -->
                <!-- wp:html -->
                <canvas id="chart-commerce" height="160"></canvas>
                <!-- /wp:html -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"border":{"radius":"8px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
            <div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--30)">
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","fontWeight":"600"}},"textColor":"navy"} -->
                <p class="has-navy-color has-text-color" style="font-size:12px;font-weight:600">Créations PME</p>
                <!-- /wp:paragraph -->
                <!-- wp:html -->
                <canvas id="chart-pme" height="160"></canvas>
                <!-- /wp:html -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"border":{"radius":"8px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
            <div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--30)">
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","fontWeight":"600"}},"textColor":"navy"} -->
                <p class="has-navy-color has-text-color" style="font-size:12px;font-weight:600">Indice des prix</p>
                <!-- /wp:paragraph -->
                <!-- wp:html -->
                <canvas id="chart-prix" height="160"></canvas>
                <!-- /wp:html -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->

</div>
<!-- /wp:group -->

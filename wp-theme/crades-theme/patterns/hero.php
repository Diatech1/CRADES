<?php
/**
 * Title: Hero CRADES
 * Slug: crades/hero
 * Categories: crades, crades-sections
 * Description: Section hero avec titre du centre, description et boutons d'action
 * Keywords: hero, accueil, banner
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"frost","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-frost-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--80)">

    <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"constrained","contentSize":"720px"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontWeight":"700"}},"textColor":"navy"} -->
        <h1 class="wp-block-heading has-text-align-center has-navy-color has-text-color" style="font-weight:700">Centre de Recherche, d'Analyse et Statistiques</h1>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"15px"}},"textColor":"gray"} -->
        <p class="has-text-align-center has-gray-color has-text-color" style="font-size:15px">Institution de référence pour la production, l'analyse et la diffusion de données économiques dans les domaines de l'industrie et du commerce au Sénégal.</p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
        <div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">
            <!-- wp:button {"backgroundColor":"primary","style":{"border":{"radius":"8px"},"typography":{"fontSize":"14px"}}} -->
            <div class="wp-block-button has-custom-font-size" style="font-size:14px"><a class="wp-block-button__link has-primary-background-color has-background wp-element-button" href="/publications/" style="border-radius:8px">Publications</a></div>
            <!-- /wp:button -->
            <!-- wp:button {"backgroundColor":"navy","style":{"border":{"radius":"8px"},"typography":{"fontSize":"14px"}}} -->
            <div class="wp-block-button has-custom-font-size" style="font-size:14px"><a class="wp-block-button__link has-navy-background-color has-background wp-element-button" href="/donnees/" style="border-radius:8px">Données ouvertes</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->

</div>
<!-- /wp:group -->

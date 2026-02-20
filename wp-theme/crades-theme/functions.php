<?php
/**
 * CRADES Theme Functions
 * Compatible with Gutenberg FSE and Elementor
 *
 * @package CRADES
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_VERSION', '1.0.0' );
define( 'CRADES_DIR', get_template_directory() );
define( 'CRADES_URI', get_template_directory_uri() );

/**
 * Theme Setup
 */
function crades_setup() {
    // Add theme support
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'custom-logo', array(
        'height'      => 200,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

    // Elementor compatibility
    add_theme_support( 'elementor' );
    add_theme_support( 'header-footer-elementor' );

    // Editor styles
    add_editor_style( 'assets/css/editor-style.css' );

    // Image sizes for publications & news
    add_image_size( 'crades-card', 600, 400, true );
    add_image_size( 'crades-hero', 1920, 800, true );
    add_image_size( 'crades-thumbnail', 300, 200, true );
}
add_action( 'after_setup_theme', 'crades_setup' );

/**
 * Enqueue Styles & Scripts
 */
function crades_enqueue_assets() {
    // Main stylesheet
    wp_enqueue_style( 'crades-style', get_stylesheet_uri(), array(), CRADES_VERSION );

    // Custom CSS
    wp_enqueue_style( 'crades-custom', CRADES_URI . '/assets/css/custom.css', array(), CRADES_VERSION );

    // Font Awesome
    wp_enqueue_style( 'font-awesome', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css', array(), '6.5.0' );

    // Chart.js (for dashboard)
    wp_enqueue_script( 'chartjs', 'https://cdn.jsdelivr.net/npm/chart.js', array(), '4.4.0', true );

    // Custom JS
    wp_enqueue_script( 'crades-main', CRADES_URI . '/assets/js/main.js', array( 'chartjs' ), CRADES_VERSION, true );

    // Pass data to JS
    wp_localize_script( 'crades-main', 'cradesData', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'crades_nonce' ),
        'colors'  => array(
            'primary' => '#044bad',
            'navy'    => '#032d6b',
            'sky'     => '#3a7fd4',
            'gold'    => '#b8943e',
        ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'crades_enqueue_assets' );

/**
 * Enqueue Editor Assets
 */
function crades_enqueue_editor_assets() {
    wp_enqueue_style( 'crades-editor', CRADES_URI . '/assets/css/editor-style.css', array(), CRADES_VERSION );
}
add_action( 'enqueue_block_editor_assets', 'crades_enqueue_editor_assets' );

/**
 * =====================================================
 * CUSTOM POST TYPES
 * =====================================================
 */

/**
 * Register: Publications
 */
function crades_register_publications() {
    $labels = array(
        'name'               => 'Publications',
        'singular_name'      => 'Publication',
        'menu_name'          => 'Publications',
        'add_new'            => 'Ajouter',
        'add_new_item'       => 'Ajouter une publication',
        'edit_item'          => 'Modifier la publication',
        'new_item'           => 'Nouvelle publication',
        'view_item'          => 'Voir la publication',
        'search_items'       => 'Rechercher',
        'not_found'          => 'Aucune publication trouvée',
        'not_found_in_trash' => 'Aucune publication dans la corbeille',
    );
    register_post_type( 'publication', array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => array( 'slug' => 'publications' ),
        'menu_icon'           => 'dashicons-media-document',
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'elementor' ),
        'show_in_rest'        => true,
        'taxonomies'          => array( 'publication_type', 'sector' ),
        'template'            => array(),
        'show_in_graphql'     => true,
    ) );

    // Taxonomy: Type de publication
    register_taxonomy( 'publication_type', 'publication', array(
        'labels'            => array(
            'name'          => 'Types de publication',
            'singular_name' => 'Type',
            'menu_name'     => 'Types',
        ),
        'hierarchical'      => true,
        'show_in_rest'      => true,
        'rewrite'           => array( 'slug' => 'type-publication' ),
        'show_admin_column' => true,
    ) );

    // Taxonomy: Secteur
    register_taxonomy( 'sector', array( 'publication', 'indicateur' ), array(
        'labels'            => array(
            'name'          => 'Secteurs',
            'singular_name' => 'Secteur',
            'menu_name'     => 'Secteurs',
        ),
        'hierarchical'      => true,
        'show_in_rest'      => true,
        'rewrite'           => array( 'slug' => 'secteur' ),
        'show_admin_column' => true,
    ) );
}
add_action( 'init', 'crades_register_publications' );

/**
 * Register: Indicateurs
 */
function crades_register_indicateurs() {
    register_post_type( 'indicateur', array(
        'labels'          => array(
            'name'               => 'Indicateurs',
            'singular_name'      => 'Indicateur',
            'menu_name'          => 'Indicateurs',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un indicateur',
            'edit_item'          => 'Modifier',
            'view_item'          => 'Voir',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucun indicateur trouvé',
        ),
        'public'          => true,
        'has_archive'     => true,
        'rewrite'         => array( 'slug' => 'indicateurs' ),
        'menu_icon'       => 'dashicons-chart-line',
        'supports'        => array( 'title', 'editor', 'custom-fields', 'elementor' ),
        'show_in_rest'    => true,
    ) );
}
add_action( 'init', 'crades_register_indicateurs' );

/**
 * Register: Actualités (uses built-in posts with custom category)
 * We use the native "post" type for news/actualités
 */

/**
 * Register: Tableaux de bord
 */
function crades_register_dashboards() {
    register_post_type( 'dashboard', array(
        'labels'          => array(
            'name'               => 'Tableaux de bord',
            'singular_name'      => 'Tableau de bord',
            'menu_name'          => 'Tableaux de bord',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un tableau de bord',
            'edit_item'          => 'Modifier',
            'view_item'          => 'Voir',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucun tableau de bord trouvé',
        ),
        'public'          => true,
        'has_archive'     => true,
        'rewrite'         => array( 'slug' => 'tableaux-de-bord' ),
        'menu_icon'       => 'dashicons-chart-bar',
        'supports'        => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'elementor' ),
        'show_in_rest'    => true,
    ) );
}
add_action( 'init', 'crades_register_dashboards' );

/**
 * Register: Datasets (Jeux de données)
 */
function crades_register_datasets() {
    register_post_type( 'dataset', array(
        'labels'          => array(
            'name'               => 'Jeux de données',
            'singular_name'      => 'Jeu de données',
            'menu_name'          => 'Données',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un jeu de données',
            'edit_item'          => 'Modifier',
            'view_item'          => 'Voir',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucun jeu de données trouvé',
        ),
        'public'          => true,
        'has_archive'     => true,
        'rewrite'         => array( 'slug' => 'donnees' ),
        'menu_icon'       => 'dashicons-database',
        'supports'        => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'elementor' ),
        'show_in_rest'    => true,
    ) );
}
add_action( 'init', 'crades_register_datasets' );

/**
 * =====================================================
 * CUSTOM META BOXES (ACF-free approach)
 * =====================================================
 */

/**
 * Register custom fields for Indicateurs
 */
function crades_register_indicateur_meta() {
    $fields = array(
        'indicateur_value'            => 'string',
        'indicateur_unit'             => 'string',
        'indicateur_change_percent'   => 'number',
        'indicateur_change_direction' => 'string',
        'indicateur_period'           => 'string',
        'indicateur_display_order'    => 'integer',
    );
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'indicateur', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
        ) );
    }
}
add_action( 'init', 'crades_register_indicateur_meta' );

/**
 * Register custom fields for Publications
 */
function crades_register_publication_meta() {
    $fields = array(
        'publication_year'     => 'integer',
        'publication_pdf_url'  => 'string',
        'publication_author'   => 'string',
    );
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'publication', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
        ) );
    }
}
add_action( 'init', 'crades_register_publication_meta' );

/**
 * Register custom fields for Dashboards
 */
function crades_register_dashboard_meta() {
    $fields = array(
        'dashboard_chart_data'   => 'string',
        'dashboard_chart_color'  => 'string',
        'dashboard_display_order'=> 'integer',
    );
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'dashboard', $key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
        ) );
    }
}
add_action( 'init', 'crades_register_dashboard_meta' );

/**
 * =====================================================
 * BLOCK PATTERNS REGISTRATION
 * =====================================================
 */
function crades_register_pattern_categories() {
    register_block_pattern_category( 'crades', array(
        'label' => 'CRADES',
    ) );
    register_block_pattern_category( 'crades-sections', array(
        'label' => 'CRADES - Sections',
    ) );
}
add_action( 'init', 'crades_register_pattern_categories' );

/**
 * =====================================================
 * ADMIN CUSTOMIZATION
 * =====================================================
 */
function crades_admin_footer_text() {
    return '<span id="footer-thankyou">CRADES &mdash; Centre de Recherche, d\'Analyse des Echanges et Statistiques</span>';
}
add_filter( 'admin_footer_text', 'crades_admin_footer_text' );

/**
 * Custom dashboard widget
 */
function crades_dashboard_widgets() {
    wp_add_dashboard_widget(
        'crades_welcome',
        'Bienvenue - CRADES',
        function() {
            echo '<p>Bienvenue sur le tableau de bord du site CRADES.</p>';
            echo '<ul>';
            echo '<li><a href="' . admin_url( 'edit.php?post_type=publication' ) . '">Gérer les Publications</a></li>';
            echo '<li><a href="' . admin_url( 'edit.php?post_type=indicateur' ) . '">Gérer les Indicateurs</a></li>';
            echo '<li><a href="' . admin_url( 'edit.php?post_type=dashboard' ) . '">Gérer les Tableaux de bord</a></li>';
            echo '<li><a href="' . admin_url( 'edit.php' ) . '">Gérer les Actualités</a></li>';
            echo '<li><a href="' . admin_url( 'edit.php?post_type=dataset' ) . '">Gérer les Données</a></li>';
            echo '</ul>';
        }
    );
}
add_action( 'wp_dashboard_setup', 'crades_dashboard_widgets' );

/**
 * =====================================================
 * ELEMENTOR COMPATIBILITY
 * =====================================================
 */

/**
 * Register Elementor locations for header/footer override
 */
function crades_elementor_locations( $elementor_theme_manager ) {
    $elementor_theme_manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'crades_elementor_locations' );

/**
 * Add Elementor support to custom post types
 */
function crades_elementor_cpt_support() {
    if ( ! defined( 'ELEMENTOR_VERSION' ) ) return;
    $cpt_support = get_option( 'elementor_cpt_support', array( 'page', 'post' ) );
    $custom_types = array( 'publication', 'indicateur', 'dashboard', 'dataset' );
    foreach ( $custom_types as $type ) {
        if ( ! in_array( $type, $cpt_support ) ) {
            $cpt_support[] = $type;
        }
    }
    update_option( 'elementor_cpt_support', $cpt_support );
}
add_action( 'after_switch_theme', 'crades_elementor_cpt_support' );

/**
 * =====================================================
 * SHORTCODES (for easy Gutenberg/Elementor integration)
 * =====================================================
 */

/**
 * [crades_indicators count="4"] — Display key indicators
 */
function crades_indicators_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'count' => 4 ), $atts );
    $query = new WP_Query( array(
        'post_type'      => 'indicateur',
        'posts_per_page' => intval( $atts['count'] ),
        'meta_key'       => 'indicateur_display_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ) );
    if ( ! $query->have_posts() ) return '<p>Aucun indicateur disponible.</p>';

    $html = '<div class="crades-indicators-grid">';
    while ( $query->have_posts() ) {
        $query->the_post();
        $value     = get_post_meta( get_the_ID(), 'indicateur_value', true );
        $unit      = get_post_meta( get_the_ID(), 'indicateur_unit', true );
        $change    = get_post_meta( get_the_ID(), 'indicateur_change_percent', true );
        $direction = get_post_meta( get_the_ID(), 'indicateur_change_direction', true );
        $period    = get_post_meta( get_the_ID(), 'indicateur_period', true );

        $arrow_class = $direction === 'up' ? 'fa-arrow-up crades-up' : ( $direction === 'down' ? 'fa-arrow-down crades-down' : 'fa-arrow-right crades-stable' );

        $html .= '<div class="crades-indicator-card">';
        $html .= '<div class="crades-indicator-value">' . esc_html( $value ) . ' <span class="crades-indicator-unit">' . esc_html( $unit ) . '</span></div>';
        $html .= '<div class="crades-indicator-name">' . get_the_title() . '</div>';
        $html .= '<div class="crades-indicator-change"><i class="fas ' . $arrow_class . '"></i> ' . esc_html( abs( $change ) ) . '%</div>';
        $html .= '<div class="crades-indicator-period">' . esc_html( $period ) . '</div>';
        $html .= '</div>';
    }
    $html .= '</div>';
    wp_reset_postdata();
    return $html;
}
add_shortcode( 'crades_indicators', 'crades_indicators_shortcode' );

/**
 * [crades_publications count="4"] — Display latest publications cards
 */
function crades_publications_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'count' => 4 ), $atts );
    $query = new WP_Query( array(
        'post_type'      => 'publication',
        'posts_per_page' => intval( $atts['count'] ),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );
    if ( ! $query->have_posts() ) return '<p>Aucune publication disponible.</p>';

    $html = '<div class="crades-publications-grid">';
    while ( $query->have_posts() ) {
        $query->the_post();
        $year = get_post_meta( get_the_ID(), 'publication_year', true );
        $types = get_the_terms( get_the_ID(), 'publication_type' );
        $sectors = get_the_terms( get_the_ID(), 'sector' );
        $type_name = $types && ! is_wp_error( $types ) ? $types[0]->name : '';
        $sector_name = $sectors && ! is_wp_error( $sectors ) ? $sectors[0]->name : '';

        $html .= '<a href="' . get_permalink() . '" class="crades-publication-card">';
        $html .= '<div class="crades-pub-meta"><span class="crades-pub-type">' . esc_html( $type_name ) . '</span> <span class="crades-pub-year">' . esc_html( $year ) . '</span></div>';
        $html .= '<h3 class="crades-pub-title">' . get_the_title() . '</h3>';
        $html .= '<p class="crades-pub-excerpt">' . get_the_excerpt() . '</p>';
        $html .= '<div class="crades-pub-footer"><span class="crades-pub-sector">' . esc_html( $sector_name ) . '</span><span class="crades-pub-read">Lire <i class="fas fa-arrow-right"></i></span></div>';
        $html .= '</a>';
    }
    $html .= '</div>';
    wp_reset_postdata();
    return $html;
}
add_shortcode( 'crades_publications', 'crades_publications_shortcode' );

/**
 * [crades_news count="3"] — Display latest news
 */
function crades_news_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'count' => 3 ), $atts );
    $query = new WP_Query( array(
        'post_type'      => 'post',
        'posts_per_page' => intval( $atts['count'] ),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );
    if ( ! $query->have_posts() ) return '<p>Aucune actualité disponible.</p>';

    $html = '<div class="crades-news-grid">';
    while ( $query->have_posts() ) {
        $query->the_post();
        $html .= '<a href="' . get_permalink() . '" class="crades-news-card">';
        $html .= '<span class="crades-news-date">' . get_the_date( 'j M Y' ) . '</span>';
        $html .= '<h3 class="crades-news-title">' . get_the_title() . '</h3>';
        $html .= '<p class="crades-news-excerpt">' . get_the_excerpt() . '</p>';
        $html .= '</a>';
    }
    $html .= '</div>';
    wp_reset_postdata();
    return $html;
}
add_shortcode( 'crades_news', 'crades_news_shortcode' );

/**
 * =====================================================
 * TEMPLATE IMAGE PATH FIXER
 * Replaces static image paths in FSE templates with dynamic theme URI
 * =====================================================
 */
function crades_fix_template_image_paths( $block_content, $block ) {
    // Replace static path with dynamic theme URI for images
    $block_content = str_replace(
        '/wp-content/themes/crades-theme/assets/img/',
        CRADES_URI . '/assets/img/',
        $block_content
    );
    return $block_content;
}
add_filter( 'render_block', 'crades_fix_template_image_paths', 10, 2 );

/**
 * =====================================================
 * FRONT PAGE TEMPLATE ASSIGNMENT
 * Ensures the home.html template is used for the front page
 * =====================================================
 */
function crades_front_page_template( $template ) {
    if ( is_front_page() ) {
        $new_template = locate_template( array( 'templates/home.html' ) );
        if ( $new_template ) {
            return $new_template;
        }
    }
    return $template;
}

/**
 * =====================================================
 * ADMIN NOTICES FOR SETUP
 * =====================================================
 */
function crades_admin_notice_setup() {
    if ( get_option( 'crades_setup_done' ) ) return;
    ?>
    <div class="notice notice-info is-dismissible">
        <p><strong>CRADES :</strong> Pour activer la page d'accueil, allez dans
        <a href="<?php echo admin_url('options-reading.php'); ?>">Réglages → Lecture</a>
        et choisissez « Une page statique » comme page d'accueil.</p>
    </div>
    <?php
}
add_action( 'admin_notices', 'crades_admin_notice_setup' );

/**
 * =====================================================
 * REST API: Expose custom fields in REST for Gutenberg/Elementor
 * =====================================================
 */
function crades_register_rest_fields() {
    // Indicateurs: expose meta fields
    $indicateur_fields = array(
        'indicateur_value', 'indicateur_unit', 'indicateur_change_percent',
        'indicateur_change_direction', 'indicateur_period', 'indicateur_display_order'
    );
    foreach ( $indicateur_fields as $field ) {
        register_rest_field( 'indicateur', $field, array(
            'get_callback' => function( $post ) use ( $field ) {
                return get_post_meta( $post['id'], $field, true );
            },
            'schema' => null,
        ) );
    }

    // Publications: expose meta fields
    $pub_fields = array( 'publication_year', 'publication_pdf_url', 'publication_author' );
    foreach ( $pub_fields as $field ) {
        register_rest_field( 'publication', $field, array(
            'get_callback' => function( $post ) use ( $field ) {
                return get_post_meta( $post['id'], $field, true );
            },
            'schema' => null,
        ) );
    }

    // Dashboards: expose meta fields
    $dash_fields = array( 'dashboard_chart_data', 'dashboard_chart_color', 'dashboard_display_order' );
    foreach ( $dash_fields as $field ) {
        register_rest_field( 'dashboard', $field, array(
            'get_callback' => function( $post ) use ( $field ) {
                return get_post_meta( $post['id'], $field, true );
            },
            'schema' => null,
        ) );
    }
}
add_action( 'rest_api_init', 'crades_register_rest_fields' );

/**
 * =====================================================
 * ELEMENTOR WIDGETS CATEGORY (if Elementor is active)
 * =====================================================
 */
function crades_elementor_category( $elements_manager ) {
    $elements_manager->add_category( 'crades', array(
        'title' => 'CRADES',
        'icon'  => 'fa fa-chart-bar',
    ) );
}
add_action( 'elementor/elements/categories_registered', 'crades_elementor_category' );

/**
 * =====================================================
 * DISABLE COMMENTS by default on custom post types
 * =====================================================
 */
function crades_disable_comments_cpt() {
    $cpts = array( 'publication', 'indicateur', 'dashboard', 'dataset' );
    foreach ( $cpts as $cpt ) {
        if ( post_type_exists( $cpt ) ) {
            remove_post_type_support( $cpt, 'comments' );
            remove_post_type_support( $cpt, 'trackbacks' );
        }
    }
}
add_action( 'init', 'crades_disable_comments_cpt', 20 );

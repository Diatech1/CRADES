<?php
/**
 * CRADES Theme - Functions (v4.0)
 * Hybrid theme: FSE block editor + Classic PHP fallback
 * Supports the WordPress Site Editor (Appearance > Editor)
 * while keeping classic PHP templates for maximum compatibility
 *
 * @package CRADES
 * @version 4.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_VERSION', '4.0.0' );
define( 'CRADES_DIR', get_template_directory() );
define( 'CRADES_URI', get_template_directory_uri() );

/* ──────────────────────────────────────────────
   1. THEME SETUP — Block Editor + Classic support
   ────────────────────────────────────────────── */
function crades_setup() {
    /* ── Block Editor / FSE support ── */
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );

    /* Editor stylesheet — loads in Gutenberg */
    add_editor_style( 'assets/css/editor-style.css' );

    /* ── Classic supports (backward compat) ── */
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', [
        'search-form', 'comment-form', 'comment-list',
        'gallery', 'caption', 'style', 'script'
    ] );
    add_theme_support( 'custom-logo', [
        'height'      => 200,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ] );

    add_image_size( 'crades-card', 600, 400, true );
    add_image_size( 'crades-hero', 1920, 800, true );
    add_image_size( 'crades-thumb', 300, 200, true );

    register_nav_menus( [
        'primary' => 'Navigation principale',
        'footer'  => 'Navigation pied de page',
    ] );
}
add_action( 'after_setup_theme', 'crades_setup' );

/* ──────────────────────────────────────────────
   2. ENQUEUE ASSETS — Front-end
   Tailwind + FontAwesome + Montserrat + Chart.js
   ────────────────────────────────────────────── */
function crades_enqueue_assets() {
    /* Tailwind CDN */
    wp_enqueue_script( 'tailwindcss', 'https://cdn.tailwindcss.com', [], null, false );

    /* FontAwesome */
    wp_enqueue_style( 'font-awesome', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css', [], '6.5.0' );

    /* Montserrat */
    wp_enqueue_style( 'google-fonts-montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap', [], null );

    /* Chart.js */
    wp_enqueue_script( 'chartjs', 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', [], '4.4.0', true );

    /* Theme custom CSS */
    wp_enqueue_style( 'crades-style', get_stylesheet_uri(), [], CRADES_VERSION );
    wp_enqueue_style( 'crades-custom', CRADES_URI . '/assets/css/custom.css', [ 'crades-style' ], CRADES_VERSION );

    /* Theme JS */
    wp_enqueue_script( 'crades-main', CRADES_URI . '/assets/js/main.js', [], CRADES_VERSION, true );

    /* Tailwind config inline */
    wp_add_inline_script( 'tailwindcss', "
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            navy: '#032d6b',
                            blue: '#044bad',
                            sky: '#3a7fd4',
                            ice: '#c7ddf5',
                            frost: '#eef4fb',
                            gold: '#b8943e',
                            'gold-light': '#d4b262',
                        }
                    },
                    fontFamily: {
                        sans: ['Montserrat', 'system-ui', 'sans-serif'],
                        display: ['Montserrat', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    ", 'after' );
}
add_action( 'wp_enqueue_scripts', 'crades_enqueue_assets' );

/* ──────────────────────────────────────────────
   2b. ENQUEUE ASSETS — Block Editor (admin)
   Loads Tailwind + custom styles inside Gutenberg
   ────────────────────────────────────────────── */
function crades_enqueue_block_editor_assets() {
    /* Tailwind CDN inside the editor */
    wp_enqueue_script( 'tailwindcss-editor', 'https://cdn.tailwindcss.com', [], null, false );
    wp_add_inline_script( 'tailwindcss-editor', "
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            navy: '#032d6b',
                            blue: '#044bad',
                            sky: '#3a7fd4',
                            ice: '#c7ddf5',
                            frost: '#eef4fb',
                            gold: '#b8943e',
                            'gold-light': '#d4b262',
                        }
                    },
                    fontFamily: {
                        sans: ['Montserrat', 'system-ui', 'sans-serif'],
                        display: ['Montserrat', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    ", 'after' );

    /* FontAwesome inside editor */
    wp_enqueue_style( 'font-awesome-editor', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css', [], '6.5.0' );

    /* Montserrat inside editor */
    wp_enqueue_style( 'google-fonts-montserrat-editor', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap', [], null );
}
add_action( 'enqueue_block_editor_assets', 'crades_enqueue_block_editor_assets' );

/* ──────────────────────────────────────────────
   3. BLOCK PATTERNS — Register categories + patterns
   ────────────────────────────────────────────── */
function crades_register_block_patterns() {
    /* Pattern categories */
    register_block_pattern_category( 'crades', [
        'label' => 'CRADES'
    ] );
    register_block_pattern_category( 'crades-hero', [
        'label' => 'CRADES - Hero'
    ] );
    register_block_pattern_category( 'crades-sections', [
        'label' => 'CRADES - Sections'
    ] );

    /* ── Hero Pattern ── */
    register_block_pattern( 'crades/hero-banner', [
        'title'       => 'CRADES Hero Banner',
        'description' => 'Full-width hero section with title, description, and CTA buttons',
        'categories'  => [ 'crades', 'crades-hero' ],
        'content'     => '<!-- wp:group {"className":"relative overflow-hidden bg-brand-frost","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group relative overflow-hidden bg-brand-frost">
<!-- wp:group {"className":"py-16 lg:py-20 px-4 sm:px-6"} -->
<div class="wp-block-group py-16 lg:py-20 px-4 sm:px-6">
<!-- wp:group {"className":"max-w-xl"} -->
<div class="wp-block-group max-w-xl">
<!-- wp:heading {"level":1,"className":"font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight"} -->
<h1 class="wp-block-heading font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">Centre de Recherche, d\'Analyse et Statistiques</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-gray-600 mt-5 text-sm leading-relaxed"} -->
<p class="text-gray-600 mt-5 text-sm leading-relaxed">Le CRADES produit et diffuse les statistiques, etudes et analyses strategiques sur l\'industrie et le commerce du Senegal.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"className":"flex flex-wrap gap-4 mt-10"} -->
<div class="wp-block-buttons flex flex-wrap gap-4 mt-10">
<!-- wp:button {"className":"text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors shadow-sm"} -->
<div class="wp-block-button text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors shadow-sm"><a class="wp-block-button__link wp-element-button" href="/publications/">Publications</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"text-sm font-medium bg-white text-brand-navy px-5 py-2.5 rounded-lg border border-brand-ice shadow-sm"} -->
<div class="wp-block-button text-sm font-medium bg-white text-brand-navy px-5 py-2.5 rounded-lg border border-brand-ice shadow-sm"><a class="wp-block-button__link wp-element-button" href="/donnees/">Donnees ouvertes</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
    ] );

    /* ── Mission Section Pattern ── */
    register_block_pattern( 'crades/mission-section', [
        'title'       => 'CRADES Mission Section',
        'description' => 'Three-column mission section with icons',
        'categories'  => [ 'crades', 'crades-sections' ],
        'content'     => '<!-- wp:group {"className":"py-14 bg-brand-frost border-b border-brand-ice/50","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group py-14 bg-brand-frost border-b border-brand-ice/50">
<!-- wp:columns {"className":"gap-8 text-center"} -->
<div class="wp-block-columns gap-8 text-center">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center"} -->
<div class="wp-block-group w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
<!-- wp:html -->
<i class="fas fa-chart-line text-brand-blue text-lg"></i>
<!-- /wp:html -->
</div>
<!-- /wp:group -->
<!-- wp:heading {"level":3,"className":"font-semibold text-sm text-gray-800 mb-2"} -->
<h3 class="wp-block-heading font-semibold text-sm text-gray-800 mb-2">Produire des statistiques</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-xs text-gray-500 leading-relaxed"} -->
<p class="text-xs text-gray-500 leading-relaxed">Collecter, traiter et diffuser les donnees statistiques sur l\'industrie et le commerce du Senegal.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center"} -->
<div class="wp-block-group w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
<!-- wp:html -->
<i class="fas fa-microscope text-brand-blue text-lg"></i>
<!-- /wp:html -->
</div>
<!-- /wp:group -->
<!-- wp:heading {"level":3,"className":"font-semibold text-sm text-gray-800 mb-2"} -->
<h3 class="wp-block-heading font-semibold text-sm text-gray-800 mb-2">Analyser et rechercher</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-xs text-gray-500 leading-relaxed"} -->
<p class="text-xs text-gray-500 leading-relaxed">Mener des etudes et analyses strategiques pour eclairer les politiques publiques et les acteurs economiques.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center"} -->
<div class="wp-block-group w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
<!-- wp:html -->
<i class="fas fa-globe-africa text-brand-blue text-lg"></i>
<!-- /wp:html -->
</div>
<!-- /wp:group -->
<!-- wp:heading {"level":3,"className":"font-semibold text-sm text-gray-800 mb-2"} -->
<h3 class="wp-block-heading font-semibold text-sm text-gray-800 mb-2">Accompagner les echanges</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-xs text-gray-500 leading-relaxed"} -->
<p class="text-xs text-gray-500 leading-relaxed">Fournir aux operateurs economiques et aux institutions les outils necessaires au developpement des echanges commerciaux.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
    ] );

    /* ── Page Header Pattern ── */
    register_block_pattern( 'crades/page-header', [
        'title'       => 'CRADES Page Header',
        'description' => 'Navy background page header with breadcrumb, title and subtitle',
        'categories'  => [ 'crades', 'crades-sections' ],
        'content'     => '<!-- wp:group {"className":"bg-brand-navy py-16 lg:py-20","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group bg-brand-navy py-16 lg:py-20">
<!-- wp:group {"className":"px-4 sm:px-6"} -->
<div class="wp-block-group px-4 sm:px-6">
<!-- wp:paragraph {"className":"text-xs text-gray-400 mb-4"} -->
<p class="text-xs text-gray-400 mb-4"><a href="/" class="hover:text-white">Accueil</a> <span class="mx-2 text-gray-600">/</span> <span class="text-gray-300">Titre de la page</span></p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"className":"font-display text-2xl lg:text-3xl text-white"} -->
<h1 class="wp-block-heading font-display text-2xl lg:text-3xl text-white">Titre de la page</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-gray-400 mt-2 text-sm"} -->
<p class="text-gray-400 mt-2 text-sm">Description de la page.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
    ] );

    /* ── CTA Data Pattern ── */
    register_block_pattern( 'crades/cta-data', [
        'title'       => 'CRADES CTA Donnees ouvertes',
        'description' => 'Call-to-action for open data access',
        'categories'  => [ 'crades', 'crades-sections' ],
        'content'     => '<!-- wp:group {"className":"py-16","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group py-16">
<!-- wp:group {"className":"text-center px-4 sm:px-6"} -->
<div class="wp-block-group text-center px-4 sm:px-6">
<!-- wp:heading {"level":2,"className":"font-display text-xl text-gray-800"} -->
<h2 class="wp-block-heading font-display text-xl text-gray-800">Accedez aux donnees ouvertes</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-sm text-gray-400 mt-2 max-w-md mx-auto"} -->
<p class="text-sm text-gray-400 mt-2 max-w-md mx-auto">Telechargez les jeux de donnees du CRADES ou integrez nos indicateurs via l\'API publique.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"className":"mt-6 gap-3"} -->
<div class="wp-block-buttons mt-6 gap-3">
<!-- wp:button {"className":"text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors"} -->
<div class="wp-block-button text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors"><a class="wp-block-button__link wp-element-button" href="/donnees/">Explorer les donnees</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"text-sm font-medium text-gray-500 border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-300 transition-colors"} -->
<div class="wp-block-button text-sm font-medium text-gray-500 border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-300 transition-colors"><a class="wp-block-button__link wp-element-button" href="/wp-json/wp/v2/indicateur">API</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
    ] );
}
add_action( 'init', 'crades_register_block_patterns' );

/* ──────────────────────────────────────────────
   4. TEMPLATE ROUTING — Route pages by slug
   Classic PHP templates as fallback for non-FSE
   ────────────────────────────────────────────── */
function crades_template_routing( $template ) {
    if ( is_page() ) {
        $slug = get_post_field( 'post_name', get_queried_object_id() );
        $slug_map = [
            'publications'       => 'page-publications.php',
            'tableaux-de-bord'   => 'page-dashboards.php',
            'contact'            => 'page-contact.php',
            'commerce-exterieur' => 'page-commerce.php',
            'donnees'            => 'page-data.php',
            'actualites'         => 'page-actualites.php',
            'a-propos'           => 'page-about.php',
        ];

        if ( isset( $slug_map[ $slug ] ) ) {
            $new = locate_template( $slug_map[ $slug ] );
            if ( $new ) return $new;
        }
    }

    /* Archive routing for CPTs */
    if ( is_post_type_archive( 'publication' ) ) {
        $new = locate_template( 'page-publications.php' );
        if ( $new ) return $new;
    }
    if ( is_post_type_archive( 'dashboard' ) ) {
        $new = locate_template( 'page-dashboards.php' );
        if ( $new ) return $new;
    }
    if ( is_post_type_archive( 'dataset' ) ) {
        $new = locate_template( 'page-data.php' );
        if ( $new ) return $new;
    }

    return $template;
}
add_filter( 'template_include', 'crades_template_routing' );

/* ──────────────────────────────────────────────
   5. TEMPLATE HELPERS
   ────────────────────────────────────────────── */
function crades_img( $file ) {
    return CRADES_URI . '/assets/img/' . $file;
}

function crades_header() {
    get_template_part( 'template-parts/header' );
}

function crades_footer() {
    get_template_part( 'template-parts/footer' );
}

/**
 * Renders a page header banner (navy bg, breadcrumb, title, subtitle)
 */
function crades_page_header( $title, $subtitle = '', $breadcrumb = [] ) {
    ?>
    <section class="bg-brand-navy py-16 lg:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <?php if ( ! empty( $breadcrumb ) ) : ?>
        <nav class="text-xs text-gray-400 mb-4">
          <a href="<?php echo esc_url( home_url('/') ); ?>" class="hover:text-white">Accueil</a>
          <?php foreach ( $breadcrumb as $link ) : ?>
            <span class="mx-2 text-gray-600">/</span>
            <?php if ( ! empty( $link['url'] ) ) : ?>
              <a href="<?php echo esc_url( $link['url'] ); ?>" class="hover:text-white"><?php echo esc_html( $link['label'] ); ?></a>
            <?php else : ?>
              <span class="text-gray-300"><?php echo esc_html( $link['label'] ); ?></span>
            <?php endif; ?>
          <?php endforeach; ?>
        </nav>
        <?php endif; ?>
        <h1 class="font-display text-2xl lg:text-3xl text-white"><?php echo esc_html( $title ); ?></h1>
        <?php if ( $subtitle ) : ?>
          <p class="text-gray-400 mt-2 text-sm"><?php echo esc_html( $subtitle ); ?></p>
        <?php endif; ?>
      </div>
    </section>
    <?php
}

/* ──────────────────────────────────────────────
   6. ADMIN CUSTOMISATION
   ────────────────────────────────────────────── */
function crades_admin_footer() {
    return '<span>CRADES &mdash; Centre de Recherche, d\'Analyse des &Eacute;changes et Statistiques</span>';
}
add_filter( 'admin_footer_text', 'crades_admin_footer' );

function crades_login_logo() {
    $logo = crades_img( 'logo-crades.png' );
    echo '<style>#login h1 a { background-image:url(' . esc_url( $logo ) . ')!important; background-size:contain!important; width:200px!important; height:80px!important; }</style>';
}
add_action( 'login_enqueue_scripts', 'crades_login_logo' );

add_filter( 'login_headerurl', function() { return home_url(); } );

/* ──────────────────────────────────────────────
   7. DISABLE COMMENTS ON CPTs
   ────────────────────────────────────────────── */
function crades_disable_cpt_comments() {
    foreach ( [ 'publication', 'indicateur', 'dashboard', 'dataset' ] as $cpt ) {
        if ( post_type_exists( $cpt ) ) {
            remove_post_type_support( $cpt, 'comments' );
            remove_post_type_support( $cpt, 'trackbacks' );
        }
    }
}
add_action( 'init', 'crades_disable_cpt_comments', 20 );

/* ──────────────────────────────────────────────
   8. SECURITY
   ────────────────────────────────────────────── */
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'xmlrpc_enabled', '__return_false' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

/* ──────────────────────────────────────────────
   9. EXCERPT
   ────────────────────────────────────────────── */
add_filter( 'excerpt_length', function() { return 25; } );
add_filter( 'excerpt_more', function() { return '...'; } );

/* ──────────────────────────────────────────────
   10. DASHBOARD WIDGET
   ────────────────────────────────────────────── */
function crades_dashboard_widget() {
    wp_add_dashboard_widget( 'crades_info', 'CRADES - Gestion du contenu', 'crades_dashboard_widget_render' );
}
add_action( 'wp_dashboard_setup', 'crades_dashboard_widget' );

function crades_dashboard_widget_render() {
    $links = [
        [ 'edit.php?post_type=indicateur', 'fas fa-chart-bar', 'Indicateurs' ],
        [ 'edit.php?post_type=dashboard',  'fas fa-chart-pie', 'Tableaux de bord' ],
        [ 'edit.php?post_type=publication', 'fas fa-book',     'Publications' ],
        [ 'edit.php?post_type=dataset',    'fas fa-database',  'Datasets' ],
        [ 'edit.php',                      'fas fa-newspaper', 'Actualites' ],
    ];
    echo '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;">';
    foreach ( $links as $l ) {
        printf(
            '<a href="%s" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#eef4fb;border-radius:8px;text-decoration:none;color:#032d6b;font-size:13px;font-weight:500;"><i class="%s"></i>%s</a>',
            esc_url( admin_url( $l[0] ) ), esc_attr( $l[1] ), esc_html( $l[2] )
        );
    }
    echo '</div>';
}

/* ──────────────────────────────────────────────
   11. BODY CLASS
   ────────────────────────────────────────────── */
function crades_body_class( $classes ) {
    $classes[] = 'bg-white';
    $classes[] = 'font-sans';
    $classes[] = 'text-gray-700';
    $classes[] = 'antialiased';
    return $classes;
}
add_filter( 'body_class', 'crades_body_class' );

/* ──────────────────────────────────────────────
   12. CUSTOM TITLE TAG
   ────────────────────────────────────────────── */
function crades_document_title_parts( $title ) {
    $title['tagline'] = '';
    if ( isset( $title['site'] ) ) {
        $title['site'] = 'CRADES';
    }
    return $title;
}
add_filter( 'document_title_parts', 'crades_document_title_parts' );

add_filter( 'document_title_separator', function() { return '|'; } );

/* ──────────────────────────────────────────────
   13. AUTO-CREATE REQUIRED PAGES ON THEME SWITCH
   ────────────────────────────────────────────── */
function crades_create_pages() {
    $pages = [
        'publications'       => 'Publications',
        'tableaux-de-bord'   => 'Tableaux de bord',
        'contact'            => 'Contact',
        'commerce-exterieur' => 'Commerce exterieur',
        'donnees'            => 'Donnees',
        'actualites'         => 'Actualites',
        'a-propos'           => 'A propos',
    ];

    foreach ( $pages as $slug => $title ) {
        $existing = get_page_by_path( $slug );
        if ( ! $existing ) {
            wp_insert_post( [
                'post_title'   => $title,
                'post_name'    => $slug,
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_content' => '',
            ] );
        }
    }

    /* Set front page to static page */
    $front = get_page_by_path( 'accueil' );
    if ( ! $front ) {
        $front_id = wp_insert_post( [
            'post_title'   => 'Accueil',
            'post_name'    => 'accueil',
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_content' => '',
        ] );
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $front_id );
    }
}
add_action( 'after_switch_theme', 'crades_create_pages' );

/* ──────────────────────────────────────────────
   14. ALLOW TAILWIND CLASSES IN BLOCK EDITOR
   WordPress strips unknown CSS classes by default,
   this allows them to persist.
   ────────────────────────────────────────────── */
function crades_allow_block_custom_classnames( $allowed_html, $context ) {
    if ( 'post' === $context ) {
        // Allow custom class attribute on common elements
        $elements = [ 'div', 'section', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'ul', 'li', 'nav', 'img', 'figure', 'figcaption', 'button', 'form', 'input', 'select', 'textarea', 'label', 'i' ];
        foreach ( $elements as $el ) {
            if ( ! isset( $allowed_html[ $el ] ) ) {
                $allowed_html[ $el ] = [];
            }
            $allowed_html[ $el ]['class'] = true;
            $allowed_html[ $el ]['style'] = true;
        }
    }
    return $allowed_html;
}
add_filter( 'wp_kses_allowed_html', 'crades_allow_block_custom_classnames', 10, 2 );

<?php
/**
 * CRADES Theme — Functions (v2.0)
 *
 * This file contains ONLY theme-related functionality.
 * CPTs, meta boxes and content management are handled by the
 * companion plugins (crades-manager, crades-publications, etc.)
 *
 * @package CRADES
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_VERSION', '2.0.0' );
define( 'CRADES_DIR', get_template_directory() );
define( 'CRADES_URI', get_template_directory_uri() );

/* ──────────────────────────────────────────────
   1. THEME SETUP
   ────────────────────────────────────────────── */
function crades_setup() {
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'responsive-embeds' );
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

    /* Custom image sizes */
    add_image_size( 'crades-card', 600, 400, true );
    add_image_size( 'crades-hero', 1920, 800, true );
    add_image_size( 'crades-thumb', 300, 200, true );

    /* Editor styles */
    add_editor_style( 'assets/css/editor-style.css' );
}
add_action( 'after_setup_theme', 'crades_setup' );

/* ──────────────────────────────────────────────
   2. ENQUEUE STYLES & SCRIPTS
   ────────────────────────────────────────────── */
function crades_enqueue_assets() {
    /* Core stylesheet */
    wp_enqueue_style( 'crades-style', get_stylesheet_uri(), [], CRADES_VERSION );

    /* Custom CSS */
    wp_enqueue_style( 'crades-custom', CRADES_URI . '/assets/css/custom.css', [ 'crades-style' ], CRADES_VERSION );

    /* Font Awesome */
    wp_enqueue_style( 'font-awesome', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css', [], '6.5.0' );

    /* Chart.js — loaded on front-end for dashboards and indicators */
    wp_enqueue_script( 'chartjs', 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', [], '4.4.0', true );

    /* Theme main JS */
    wp_enqueue_script( 'crades-main', CRADES_URI . '/assets/js/main.js', [], CRADES_VERSION, true );
    wp_localize_script( 'crades-main', 'cradesTheme', [
        'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
        'restUrl'  => esc_url_raw( rest_url() ),
        'nonce'    => wp_create_nonce( 'crades_nonce' ),
        'themeUrl' => CRADES_URI,
    ] );
}
add_action( 'wp_enqueue_scripts', 'crades_enqueue_assets' );

/* Editor-only assets */
function crades_enqueue_editor_assets() {
    wp_enqueue_style( 'crades-editor', CRADES_URI . '/assets/css/editor-style.css', [], CRADES_VERSION );
}
add_action( 'enqueue_block_editor_assets', 'crades_enqueue_editor_assets' );

/* ──────────────────────────────────────────────
   3. BLOCK PATTERN CATEGORIES
   ────────────────────────────────────────────── */
function crades_register_pattern_categories() {
    register_block_pattern_category( 'crades', [
        'label' => __( 'CRADES', 'crades' ),
    ] );
    register_block_pattern_category( 'crades-hero', [
        'label' => __( 'CRADES — Hero', 'crades' ),
    ] );
    register_block_pattern_category( 'crades-sections', [
        'label' => __( 'CRADES — Sections', 'crades' ),
    ] );
}
add_action( 'init', 'crades_register_pattern_categories' );

/* ──────────────────────────────────────────────
   4. ADMIN CUSTOMISATION
   ────────────────────────────────────────────── */
/* Custom admin footer */
function crades_admin_footer() {
    return '<span>CRADES &mdash; Centre de Recherche, d\'Analyse des &Eacute;changes et Statistiques</span>';
}
add_filter( 'admin_footer_text', 'crades_admin_footer' );

/* Custom login logo */
function crades_login_logo() {
    $logo = CRADES_URI . '/assets/img/logo-crades.png';
    echo '<style type="text/css">
        #login h1 a {
            background-image: url(' . esc_url( $logo ) . ') !important;
            background-size: contain !important;
            width: 200px !important;
            height: 80px !important;
        }
    </style>';
}
add_action( 'login_enqueue_scripts', 'crades_login_logo' );

function crades_login_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'crades_login_url' );

/* ──────────────────────────────────────────────
   5. IMAGE PATH FIXER FOR FSE TEMPLATES
   ────────────────────────────────────────────── */
function crades_fix_template_image_paths( $content, $block ) {
    return str_replace(
        '/wp-content/themes/crades-theme/assets/img/',
        CRADES_URI . '/assets/img/',
        $content
    );
}
add_filter( 'render_block', 'crades_fix_template_image_paths', 10, 2 );

/* ──────────────────────────────────────────────
   6. DISABLE COMMENTS ON CUSTOM POST TYPES
   ────────────────────────────────────────────── */
function crades_disable_cpt_comments() {
    $cpts = [ 'publication', 'indicateur', 'dashboard', 'dataset' ];
    foreach ( $cpts as $cpt ) {
        if ( post_type_exists( $cpt ) ) {
            remove_post_type_support( $cpt, 'comments' );
            remove_post_type_support( $cpt, 'trackbacks' );
        }
    }
}
add_action( 'init', 'crades_disable_cpt_comments', 20 );

/* ──────────────────────────────────────────────
   7. SECURITY HARDENING
   ────────────────────────────────────────────── */
/* Remove WP version from head */
remove_action( 'wp_head', 'wp_generator' );

/* Disable XML-RPC */
add_filter( 'xmlrpc_enabled', '__return_false' );

/* Remove shortlink */
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

/* ──────────────────────────────────────────────
   8. EXCERPT CUSTOMISATION
   ────────────────────────────────────────────── */
function crades_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'crades_excerpt_length' );

function crades_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'crades_excerpt_more' );

/* ──────────────────────────────────────────────
   9. DASHBOARD WIDGET
   ────────────────────────────────────────────── */
function crades_dashboard_widget() {
    wp_add_dashboard_widget(
        'crades_dashboard_info',
        'CRADES — Gestion du contenu',
        'crades_dashboard_widget_render'
    );
}
add_action( 'wp_dashboard_setup', 'crades_dashboard_widget' );

function crades_dashboard_widget_render() {
    $links = [
        [ 'edit.php?post_type=indicateur', 'fas fa-chart-bar', 'Indicateurs' ],
        [ 'edit.php?post_type=dashboard',  'fas fa-chart-pie', 'Tableaux de bord' ],
        [ 'edit.php?post_type=publication', 'fas fa-book',     'Publications' ],
        [ 'edit.php?post_type=dataset',    'fas fa-database',  'Jeux de donnees' ],
        [ 'edit.php',                      'fas fa-newspaper', 'Actualites' ],
    ];
    echo '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;">';
    foreach ( $links as $l ) {
        printf(
            '<a href="%s" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#eef4fb;border-radius:8px;text-decoration:none;color:#032d6b;font-size:13px;font-weight:500;transition:background 0.2s;"><i class="%s"></i>%s</a>',
            esc_url( admin_url( $l[0] ) ),
            esc_attr( $l[1] ),
            esc_html( $l[2] )
        );
    }
    echo '</div>';
}

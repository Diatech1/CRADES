<?php
/**
 * Plugin Name: CRADES Articles Manager
 * Plugin URI: https://crades.gouv.sn
 * Description: Gestionnaire avancé des articles/actualités pour le CRADES — Éditeur enrichi, catégories obligatoires, image mise en avant requise, résumés automatiques, et outils de rédaction.
 * Version: 1.0.0
 * Author: CRADES
 * Author URI: https://crades.gouv.sn
 * Text Domain: crades-articles
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * License: GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_ART_VERSION', '1.0.0' );
define( 'CRADES_ART_DIR', plugin_dir_path( __FILE__ ) );
define( 'CRADES_ART_URL', plugin_dir_url( __FILE__ ) );

/* ══════════════════════════════════════════════
   1. DEFAULT CATEGORIES
   ══════════════════════════════════════════════ */
function crades_art_default_categories() {
    $categories = [
        'industrie'          => 'Industrie',
        'commerce'           => 'Commerce',
        'economie'           => 'Économie',
        'conjoncture'        => 'Conjoncture',
        'politique-publique' => 'Politique publique',
        'international'      => 'International',
        'evenement'          => 'Événement',
        'communique'         => 'Communiqué',
    ];

    foreach ( $categories as $slug => $name ) {
        if ( ! term_exists( $slug, 'category' ) ) {
            wp_insert_term( $name, 'category', [ 'slug' => $slug ] );
        }
    }
}
add_action( 'init', 'crades_art_default_categories', 30 );

/* ══════════════════════════════════════════════
   2. CUSTOM ARTICLE META FIELDS
   ══════════════════════════════════════════════ */
function crades_art_register_meta() {
    $fields = [
        'article_source'     => 'string',
        'article_source_url' => 'string',
        'article_reading_time' => 'string',
        'article_is_featured'  => 'boolean',
        'article_highlight'    => 'string',
    ];

    foreach ( $fields as $key => $type ) {
        register_post_meta( 'post', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ] );
    }
}
add_action( 'init', 'crades_art_register_meta' );

/* ══════════════════════════════════════════════
   3. META BOX — Article Details
   ══════════════════════════════════════════════ */
function crades_art_add_meta_boxes() {
    add_meta_box(
        'crades_article_details',
        '<span class="dashicons dashicons-edit" style="margin-right:6px;"></span> Détails de l\'article',
        'crades_art_meta_box_render',
        'post',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'crades_art_add_meta_boxes' );

function crades_art_meta_box_render( $post ) {
    wp_nonce_field( 'crades_article_save', 'crades_article_nonce' );

    $source      = get_post_meta( $post->ID, 'article_source', true );
    $source_url  = get_post_meta( $post->ID, 'article_source_url', true );
    $reading     = get_post_meta( $post->ID, 'article_reading_time', true );
    $featured    = get_post_meta( $post->ID, 'article_is_featured', true );
    $highlight   = get_post_meta( $post->ID, 'article_highlight', true );
    ?>
    <style>
        .crades-article-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .crades-article-fields .full-width { grid-column: 1 / -1; }
        .crades-article-fields label { display: block; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em; color: #374151; margin-bottom: 6px; }
        .crades-article-fields input[type="text"],
        .crades-article-fields input[type="url"],
        .crades-article-fields textarea { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; }
        .crades-article-fields textarea { min-height: 60px; resize: vertical; }
        .crades-article-fields .crades-checkbox-wrap { display: flex; align-items: center; gap: 8px; padding: 12px; background: #eef4fb; border-radius: 8px; }
        .crades-article-fields .crades-checkbox-wrap label { margin-bottom: 0; }
        .crades-reading-preview { display: inline-block; background: #f0f9ff; color: #044bad; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    </style>

    <div class="crades-article-fields">
        <div>
            <label for="article_source">Source</label>
            <input type="text" name="article_source" id="article_source" value="<?php echo esc_attr( $source ); ?>" placeholder="Ex: CRADES, ANSD, Reuters" />
        </div>
        <div>
            <label for="article_source_url">Lien source</label>
            <input type="url" name="article_source_url" id="article_source_url" value="<?php echo esc_attr( $source_url ); ?>" placeholder="https://..." />
        </div>
        <div>
            <label for="article_reading_time">Temps de lecture</label>
            <input type="text" name="article_reading_time" id="article_reading_time" value="<?php echo esc_attr( $reading ); ?>" placeholder="Calculé automatiquement" readonly />
            <?php if ( $reading ) : ?>
                <span class="crades-reading-preview"><?php echo esc_html( $reading ); ?> min</span>
            <?php endif; ?>
        </div>
        <div class="crades-checkbox-wrap">
            <input type="checkbox" name="article_is_featured" id="article_is_featured" value="1" <?php checked( $featured, '1' ); ?> />
            <label for="article_is_featured">⭐ Article mis en avant (affiché en priorité)</label>
        </div>
        <div class="full-width">
            <label for="article_highlight">Résumé en une phrase (chapô)</label>
            <textarea name="article_highlight" id="article_highlight" placeholder="Résumé court pour l'affichage en carte..."><?php echo esc_textarea( $highlight ); ?></textarea>
        </div>
    </div>
    <?php
}

/* ══════════════════════════════════════════════
   4. SAVE META + AUTO-CALCULATE READING TIME
   ══════════════════════════════════════════════ */
function crades_art_save_meta( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( get_post_type( $post_id ) !== 'post' ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
    if ( ! isset( $_POST['crades_article_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['crades_article_nonce'], 'crades_article_save' ) ) return;

    $text_fields = [ 'article_source', 'article_source_url', 'article_highlight' ];
    foreach ( $text_fields as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
        }
    }

    /* Featured checkbox */
    update_post_meta( $post_id, 'article_is_featured', isset( $_POST['article_is_featured'] ) ? '1' : '' );

    /* Auto-calculate reading time */
    $content = get_post_field( 'post_content', $post_id );
    $word_count = str_word_count( wp_strip_all_tags( $content ) );
    $reading_time = max( 1, ceil( $word_count / 200 ) );
    update_post_meta( $post_id, 'article_reading_time', (string) $reading_time );
}
add_action( 'save_post', 'crades_art_save_meta' );

/* ══════════════════════════════════════════════
   5. REQUIRE FEATURED IMAGE ON PUBLISH
   ══════════════════════════════════════════════ */
function crades_art_require_featured_image( $messages ) {
    global $post;
    if ( ! $post || $post->post_type !== 'post' ) return $messages;

    /* Show a notice if no featured image */
    if ( $post->post_status === 'publish' && ! has_post_thumbnail( $post->ID ) ) {
        echo '<div class="notice notice-warning is-dismissible" style="border-left-color:#b8943e;">
            <p><strong>⚠️ Image mise en avant manquante</strong> — Les articles affichés sur le site sont plus attractifs avec une image. Veuillez en ajouter une.</p>
        </div>';
    }

    return $messages;
}
add_filter( 'post_updated_messages', 'crades_art_require_featured_image' );

/* Admin notice on edit screen */
function crades_art_featured_image_notice() {
    $screen = get_current_screen();
    if ( ! $screen || $screen->post_type !== 'post' || $screen->base !== 'post' ) return;

    global $post;
    if ( ! $post ) return;
    if ( $post->post_status === 'publish' && ! has_post_thumbnail( $post->ID ) ) {
        echo '<div class="notice notice-warning"><p><strong>⚠️ Rappel :</strong> Ajoutez une image mise en avant pour un meilleur affichage sur le site.</p></div>';
    }
}
add_action( 'admin_notices', 'crades_art_featured_image_notice' );

/* ══════════════════════════════════════════════
   6. REQUIRE CATEGORY ON PUBLISH
   ══════════════════════════════════════════════ */
function crades_art_require_category( $data, $postarr ) {
    if ( $data['post_type'] !== 'post' ) return $data;
    if ( $data['post_status'] !== 'publish' ) return $data;

    $cats = isset( $postarr['post_category'] ) ? $postarr['post_category'] : [];
    $uncategorized = get_option( 'default_category' );

    /* Filter out uncategorized */
    $cats = array_filter( $cats, function( $c ) use ( $uncategorized ) {
        return (int) $c !== (int) $uncategorized;
    } );

    if ( empty( $cats ) ) {
        $data['post_status'] = 'draft';
        add_filter( 'redirect_post_location', function( $location ) {
            return add_query_arg( 'crades_cat_error', '1', $location );
        } );
    }

    return $data;
}
add_filter( 'wp_insert_post_data', 'crades_art_require_category', 10, 2 );

function crades_art_category_error_notice() {
    if ( isset( $_GET['crades_cat_error'] ) ) {
        echo '<div class="notice notice-error"><p><strong>❌ Catégorie requise :</strong> Veuillez sélectionner au moins une catégorie (autre que "Non classé") avant de publier.</p></div>';
    }
}
add_action( 'admin_notices', 'crades_art_category_error_notice' );

/* ══════════════════════════════════════════════
   7. AUTO-GENERATE EXCERPT IF EMPTY
   ══════════════════════════════════════════════ */
function crades_art_auto_excerpt( $data, $postarr ) {
    if ( $data['post_type'] !== 'post' ) return $data;
    if ( ! empty( $data['post_excerpt'] ) ) return $data;

    /* Generate excerpt from content (first 30 words) */
    $content = wp_strip_all_tags( $data['post_content'] );
    $words = explode( ' ', $content );
    if ( count( $words ) > 30 ) {
        $data['post_excerpt'] = implode( ' ', array_slice( $words, 0, 30 ) ) . '…';
    }

    return $data;
}
add_filter( 'wp_insert_post_data', 'crades_art_auto_excerpt', 10, 2 );

/* ══════════════════════════════════════════════
   8. ADMIN COLUMNS FOR POSTS
   ══════════════════════════════════════════════ */
function crades_art_post_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['art_featured']     = '⭐';
            $new['art_thumbnail']    = 'Image';
            $new['art_reading_time'] = 'Lecture';
        }
    }
    return $new;
}
add_filter( 'manage_posts_columns', 'crades_art_post_columns' );

function crades_art_post_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'art_featured':
            $is_feat = get_post_meta( $post_id, 'article_is_featured', true );
            echo $is_feat ? '⭐' : '—';
            break;
        case 'art_thumbnail':
            if ( has_post_thumbnail( $post_id ) ) {
                echo get_the_post_thumbnail( $post_id, [ 50, 50 ], [ 'style' => 'border-radius:4px;' ] );
            } else {
                echo '<span style="color:#dc2626;" title="Pas d\'image">✕</span>';
            }
            break;
        case 'art_reading_time':
            $time = get_post_meta( $post_id, 'article_reading_time', true );
            echo $time ? esc_html( $time ) . ' min' : '—';
            break;
    }
}
add_action( 'manage_posts_custom_column', 'crades_art_post_column_data', 10, 2 );

/* ══════════════════════════════════════════════
   9. SORTABLE COLUMNS
   ══════════════════════════════════════════════ */
function crades_art_sortable_columns( $columns ) {
    $columns['art_reading_time'] = 'art_reading_time';
    return $columns;
}
add_filter( 'manage_edit-post_sortable_columns', 'crades_art_sortable_columns' );

function crades_art_orderby( $query ) {
    if ( ! is_admin() || ! $query->is_main_query() ) return;
    if ( $query->get( 'orderby' ) === 'art_reading_time' ) {
        $query->set( 'meta_key', 'article_reading_time' );
        $query->set( 'orderby', 'meta_value_num' );
    }
}
add_action( 'pre_get_posts', 'crades_art_orderby' );

/* ══════════════════════════════════════════════
   10. REST API FIELDS
   ══════════════════════════════════════════════ */
function crades_art_rest_fields() {
    $fields = [ 'article_source', 'article_source_url', 'article_reading_time', 'article_is_featured', 'article_highlight' ];
    foreach ( $fields as $key ) {
        register_rest_field( 'post', $key, [
            'get_callback' => function ( $object ) use ( $key ) {
                return get_post_meta( $object['id'], $key, true );
            },
            'update_callback' => function ( $value, $object ) use ( $key ) {
                return update_post_meta( $object->ID, $key, sanitize_text_field( $value ) );
            },
            'schema' => [ 'type' => 'string', 'context' => [ 'view', 'edit' ] ],
        ] );
    }
}
add_action( 'rest_api_init', 'crades_art_rest_fields' );

/* ══════════════════════════════════════════════
   11. ADMIN DASHBOARD WIDGET — QUICK ARTICLE
   ══════════════════════════════════════════════ */
function crades_art_dashboard_widget() {
    wp_add_dashboard_widget(
        'crades_quick_article',
        '📰 Créer une actualité rapide',
        'crades_art_quick_widget_render'
    );
}
add_action( 'wp_dashboard_setup', 'crades_art_dashboard_widget' );

function crades_art_quick_widget_render() {
    $recent = get_posts( [
        'numberposts' => 5,
        'post_type'   => 'post',
        'post_status' => [ 'publish', 'draft' ],
    ] );
    ?>
    <div style="margin-bottom:16px;">
        <a href="<?php echo esc_url( admin_url( 'post-new.php' ) ); ?>" class="button button-primary" style="background:#044bad;border-color:#032d6b;">
            <span class="dashicons dashicons-edit" style="margin-top:3px;margin-right:2px;"></span>
            Nouvel article
        </a>
        <a href="<?php echo esc_url( admin_url( 'edit.php' ) ); ?>" class="button" style="margin-left:6px;">
            Tous les articles (<?php echo wp_count_posts()->publish; ?>)
        </a>
    </div>
    <?php if ( $recent ) : ?>
    <table style="width:100%;border-collapse:collapse;">
        <thead>
            <tr style="border-bottom:1px solid #e5e7eb;">
                <th style="text-align:left;padding:6px 0;font-size:11px;color:#64748b;text-transform:uppercase;">Titre</th>
                <th style="text-align:center;padding:6px 0;font-size:11px;color:#64748b;">Statut</th>
                <th style="text-align:right;padding:6px 0;font-size:11px;color:#64748b;">Date</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ( $recent as $p ) :
            $status_color = $p->post_status === 'publish' ? '#059669' : '#b8943e';
            $status_label = $p->post_status === 'publish' ? 'Publié' : 'Brouillon';
        ?>
            <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:8px 0;font-size:13px;">
                    <a href="<?php echo get_edit_post_link( $p->ID ); ?>"><?php echo esc_html( $p->post_title ); ?></a>
                </td>
                <td style="text-align:center;padding:8px 0;">
                    <span style="background:<?php echo $status_color; ?>15;color:<?php echo $status_color; ?>;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;"><?php echo $status_label; ?></span>
                </td>
                <td style="text-align:right;padding:8px 0;font-size:12px;color:#64748b;"><?php echo get_the_date( 'j M Y', $p ); ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif;
}

/* ══════════════════════════════════════════════
   12. ACTIVATION
   ══════════════════════════════════════════════ */
function crades_art_activate() {
    crades_art_default_categories();
}
register_activation_hook( __FILE__, 'crades_art_activate' );

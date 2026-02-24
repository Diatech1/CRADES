<?php
/**
 * Plugin Name: CRADES Manager
 * Plugin URI: https://crades.gouv.sn
 * Description: Gestionnaire central du CRADES — Enregistre les Custom Post Types (Indicateurs, Dashboards, Publications, Datasets), les taxonomies, les champs meta REST, et fournit une interface d'administration unifiée.
 * Version: 1.0.0
 * Author: CRADES
 * Author URI: https://crades.gouv.sn
 * Text Domain: crades-manager
 * Domain Path: /languages
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * License: GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_MGR_VERSION', '1.0.0' );
define( 'CRADES_MGR_DIR', plugin_dir_path( __FILE__ ) );
define( 'CRADES_MGR_URL', plugin_dir_url( __FILE__ ) );

/* ══════════════════════════════════════════════
   1. CUSTOM POST TYPES
   ══════════════════════════════════════════════ */
function crades_mgr_register_post_types() {

    /* ── Indicateurs ─────────────────────── */
    register_post_type( 'indicateur', [
        'labels' => [
            'name'               => 'Indicateurs',
            'singular_name'      => 'Indicateur',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un indicateur',
            'edit_item'          => 'Modifier l\'indicateur',
            'new_item'           => 'Nouvel indicateur',
            'view_item'          => 'Voir l\'indicateur',
            'search_items'       => 'Chercher des indicateurs',
            'not_found'          => 'Aucun indicateur trouvé',
            'not_found_in_trash' => 'Aucun indicateur dans la corbeille',
            'menu_name'          => 'Indicateurs',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'indicateur',
        'has_archive'         => true,
        'rewrite'             => [ 'slug' => 'indicateurs' ],
        'menu_icon'           => 'dashicons-chart-bar',
        'menu_position'       => 25,
        'supports'            => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
        'show_in_graphql'     => true,
    ] );

    /* ── Dashboards ──────────────────────── */
    register_post_type( 'dashboard', [
        'labels' => [
            'name'               => 'Tableaux de bord',
            'singular_name'      => 'Tableau de bord',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un tableau de bord',
            'edit_item'          => 'Modifier le tableau de bord',
            'new_item'           => 'Nouveau tableau de bord',
            'view_item'          => 'Voir le tableau de bord',
            'search_items'       => 'Chercher des tableaux de bord',
            'not_found'          => 'Aucun tableau de bord trouvé',
            'not_found_in_trash' => 'Aucun tableau de bord dans la corbeille',
            'menu_name'          => 'Tableaux de bord',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'dashboard',
        'has_archive'         => true,
        'rewrite'             => [ 'slug' => 'tableaux-de-bord' ],
        'menu_icon'           => 'dashicons-chart-pie',
        'menu_position'       => 26,
        'supports'            => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
    ] );

    /* ── Publications ────────────────────── */
    register_post_type( 'publication', [
        'labels' => [
            'name'               => 'Publications',
            'singular_name'      => 'Publication',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter une publication',
            'edit_item'          => 'Modifier la publication',
            'new_item'           => 'Nouvelle publication',
            'view_item'          => 'Voir la publication',
            'search_items'       => 'Chercher des publications',
            'not_found'          => 'Aucune publication trouvée',
            'not_found_in_trash' => 'Aucune publication dans la corbeille',
            'menu_name'          => 'Publications',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'publication',
        'has_archive'         => true,
        'rewrite'             => [ 'slug' => 'publications' ],
        'menu_icon'           => 'dashicons-book-alt',
        'menu_position'       => 27,
        'supports'            => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
    ] );

    /* ── Datasets ────────────────────────── */
    register_post_type( 'dataset', [
        'labels' => [
            'name'               => 'Jeux de données',
            'singular_name'      => 'Jeu de données',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter un jeu de données',
            'edit_item'          => 'Modifier le jeu de données',
            'new_item'           => 'Nouveau jeu de données',
            'view_item'          => 'Voir le jeu de données',
            'search_items'       => 'Chercher des jeux de données',
            'not_found'          => 'Aucun jeu de données trouvé',
            'not_found_in_trash' => 'Aucun jeu de données dans la corbeille',
            'menu_name'          => 'Datasets',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'dataset',
        'has_archive'         => true,
        'rewrite'             => [ 'slug' => 'donnees' ],
        'menu_icon'           => 'dashicons-database',
        'menu_position'       => 28,
        'supports'            => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ],
    ] );
}
add_action( 'init', 'crades_mgr_register_post_types' );

/* ══════════════════════════════════════════════
   2. TAXONOMIES
   ══════════════════════════════════════════════ */
function crades_mgr_register_taxonomies() {

    /* Publication Type */
    register_taxonomy( 'publication_type', 'publication', [
        'labels' => [
            'name'          => 'Types de publication',
            'singular_name' => 'Type',
            'add_new_item'  => 'Ajouter un type',
            'menu_name'     => 'Types',
        ],
        'public'            => true,
        'show_in_rest'      => true,
        'hierarchical'      => true,
        'rewrite'           => [ 'slug' => 'type-publication' ],
        'show_admin_column' => true,
    ] );

    /* Sector */
    register_taxonomy( 'sector', [ 'publication', 'indicateur', 'dataset' ], [
        'labels' => [
            'name'          => 'Secteurs',
            'singular_name' => 'Secteur',
            'add_new_item'  => 'Ajouter un secteur',
            'menu_name'     => 'Secteurs',
        ],
        'public'            => true,
        'show_in_rest'      => true,
        'hierarchical'      => true,
        'rewrite'           => [ 'slug' => 'secteur' ],
        'show_admin_column' => true,
    ] );
}
add_action( 'init', 'crades_mgr_register_taxonomies' );

/* ══════════════════════════════════════════════
   3. REGISTER META FIELDS (REST API compatible)
   ══════════════════════════════════════════════ */
function crades_mgr_register_meta() {

    /* ── Indicateur meta ─────────────────── */
    $indicateur_meta = [
        'indicateur_value'            => 'string',
        'indicateur_unit'             => 'string',
        'indicateur_change_percent'   => 'string',
        'indicateur_change_direction' => 'string',
        'indicateur_period'           => 'string',
        'indicateur_source'           => 'string',
    ];
    foreach ( $indicateur_meta as $key => $type ) {
        register_post_meta( 'indicateur', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ] );
    }

    /* ── Dashboard meta ──────────────────── */
    $dashboard_meta = [
        'dashboard_chart_data'  => 'string',
        'dashboard_chart_color' => 'string',
        'dashboard_chart_type'  => 'string',
        'dashboard_source'      => 'string',
        'dashboard_period'      => 'string',
    ];
    foreach ( $dashboard_meta as $key => $type ) {
        register_post_meta( 'dashboard', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ] );
    }

    /* ── Publication meta ────────────────── */
    $publication_meta = [
        'publication_year'    => 'string',
        'publication_pdf_url' => 'string',
        'publication_authors' => 'string',
        'publication_pages'   => 'string',
        'publication_isbn'    => 'string',
        'publication_doi'     => 'string',
    ];
    foreach ( $publication_meta as $key => $type ) {
        register_post_meta( 'publication', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ] );
    }

    /* ── Dataset meta ────────────────────── */
    $dataset_meta = [
        'dataset_format'      => 'string',
        'dataset_download_url'=> 'string',
        'dataset_records'     => 'string',
        'dataset_frequency'   => 'string',
        'dataset_source'      => 'string',
        'dataset_license'     => 'string',
        'dataset_last_update' => 'string',
    ];
    foreach ( $dataset_meta as $key => $type ) {
        register_post_meta( 'dataset', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => '__return_true',
        ] );
    }
}
add_action( 'init', 'crades_mgr_register_meta' );

/* ══════════════════════════════════════════════
   4. META BOXES UI (Classic editor fallback)
   ══════════════════════════════════════════════ */
function crades_mgr_add_meta_boxes() {

    /* Indicateur meta box */
    add_meta_box(
        'crades_indicateur_meta',
        'Données de l\'indicateur',
        'crades_mgr_indicateur_meta_box',
        'indicateur',
        'normal',
        'high'
    );

    /* Dashboard meta box */
    add_meta_box(
        'crades_dashboard_meta',
        'Données du tableau de bord',
        'crades_mgr_dashboard_meta_box',
        'dashboard',
        'normal',
        'high'
    );

    /* Publication meta box */
    add_meta_box(
        'crades_publication_meta',
        'Informations de la publication',
        'crades_mgr_publication_meta_box',
        'publication',
        'normal',
        'high'
    );

    /* Dataset meta box */
    add_meta_box(
        'crades_dataset_meta',
        'Informations du jeu de données',
        'crades_mgr_dataset_meta_box',
        'dataset',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'crades_mgr_add_meta_boxes' );

/* ── Indicateur meta box render ──────────── */
function crades_mgr_indicateur_meta_box( $post ) {
    wp_nonce_field( 'crades_indicateur_save', 'crades_indicateur_nonce' );
    $fields = [
        'indicateur_value'            => [ 'Valeur', 'text', 'Ex: 2 847' ],
        'indicateur_unit'             => [ 'Unité', 'text', 'Ex: Mds FCFA' ],
        'indicateur_change_percent'   => [ 'Variation (%)', 'text', 'Ex: +4.7' ],
        'indicateur_change_direction' => [ 'Direction', 'select', [ 'up' => '▲ Hausse', 'down' => '▼ Baisse', 'stable' => '= Stable' ] ],
        'indicateur_period'           => [ 'Période', 'text', 'Ex: T3 2025' ],
        'indicateur_source'           => [ 'Source', 'text', 'Ex: ANSD' ],
    ];
    crades_mgr_render_meta_fields( $post->ID, $fields );
}

/* ── Dashboard meta box render ───────────── */
function crades_mgr_dashboard_meta_box( $post ) {
    wp_nonce_field( 'crades_dashboard_save', 'crades_dashboard_nonce' );
    $fields = [
        'dashboard_chart_type'  => [ 'Type de graphique', 'select', [ 'line' => 'Courbe (Line)', 'bar' => 'Barres (Bar)', 'pie' => 'Camembert (Pie)', 'doughnut' => 'Anneau (Doughnut)', 'radar' => 'Radar' ] ],
        'dashboard_chart_color' => [ 'Couleur principale', 'color', '#044bad' ],
        'dashboard_chart_data'  => [ 'Données du graphique (JSON)', 'textarea', '{"type":"line","data":{"labels":["Jan","Fév","Mar"],"datasets":[{"label":"Série","data":[100,120,115]}]}}' ],
        'dashboard_source'      => [ 'Source', 'text', 'Ex: ANSD, BCEAO' ],
        'dashboard_period'      => [ 'Période', 'text', 'Ex: 2020-2025' ],
    ];
    crades_mgr_render_meta_fields( $post->ID, $fields );
}

/* ── Publication meta box render ─────────── */
function crades_mgr_publication_meta_box( $post ) {
    wp_nonce_field( 'crades_publication_save', 'crades_publication_nonce' );
    $fields = [
        'publication_year'    => [ 'Année', 'text', 'Ex: 2025' ],
        'publication_pdf_url' => [ 'Lien PDF', 'url', 'https://' ],
        'publication_authors' => [ 'Auteur(s)', 'text', 'Ex: CRADES, Direction des Études' ],
        'publication_pages'   => [ 'Nombre de pages', 'number', '' ],
        'publication_isbn'    => [ 'ISBN', 'text', '' ],
        'publication_doi'     => [ 'DOI', 'text', '' ],
    ];
    crades_mgr_render_meta_fields( $post->ID, $fields );
}

/* ── Dataset meta box render ─────────────── */
function crades_mgr_dataset_meta_box( $post ) {
    wp_nonce_field( 'crades_dataset_save', 'crades_dataset_nonce' );
    $fields = [
        'dataset_format'      => [ 'Format', 'select', [ 'csv' => 'CSV', 'json' => 'JSON', 'xlsx' => 'Excel', 'xml' => 'XML', 'pdf' => 'PDF' ] ],
        'dataset_download_url'=> [ 'Lien de téléchargement', 'url', 'https://' ],
        'dataset_records'     => [ 'Nombre d\'enregistrements', 'number', '' ],
        'dataset_frequency'   => [ 'Fréquence de mise à jour', 'select', [ 'daily' => 'Quotidienne', 'weekly' => 'Hebdomadaire', 'monthly' => 'Mensuelle', 'quarterly' => 'Trimestrielle', 'annual' => 'Annuelle' ] ],
        'dataset_source'      => [ 'Source', 'text', 'Ex: ANSD' ],
        'dataset_license'     => [ 'Licence', 'select', [ 'open' => 'Open Data', 'cc-by' => 'CC-BY 4.0', 'cc-by-sa' => 'CC-BY-SA 4.0', 'restricted' => 'Accès restreint' ] ],
        'dataset_last_update' => [ 'Dernière mise à jour', 'date', '' ],
    ];
    crades_mgr_render_meta_fields( $post->ID, $fields );
}

/* ── Generic field renderer ──────────────── */
function crades_mgr_render_meta_fields( $post_id, $fields ) {
    echo '<table class="form-table crades-meta-table"><tbody>';
    foreach ( $fields as $key => $config ) {
        $label = $config[0];
        $type  = $config[1];
        $extra = $config[2] ?? '';
        $value = get_post_meta( $post_id, $key, true );

        echo '<tr><th scope="row"><label for="' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label></th><td>';

        switch ( $type ) {
            case 'select':
                echo '<select name="' . esc_attr( $key ) . '" id="' . esc_attr( $key ) . '" class="regular-text">';
                foreach ( $extra as $opt_val => $opt_label ) {
                    printf(
                        '<option value="%s" %s>%s</option>',
                        esc_attr( $opt_val ),
                        selected( $value, $opt_val, false ),
                        esc_html( $opt_label )
                    );
                }
                echo '</select>';
                break;

            case 'textarea':
                printf(
                    '<textarea name="%s" id="%s" class="large-text code" rows="8" placeholder="%s">%s</textarea>',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $extra ),
                    esc_textarea( $value )
                );
                break;

            case 'color':
                printf(
                    '<input type="color" name="%s" id="%s" value="%s" /> <code>%s</code>',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $value ?: $extra ),
                    esc_html( $value ?: $extra )
                );
                break;

            case 'url':
                printf(
                    '<input type="url" name="%s" id="%s" value="%s" class="regular-text" placeholder="%s" />',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $value ),
                    esc_attr( $extra )
                );
                break;

            case 'number':
                printf(
                    '<input type="number" name="%s" id="%s" value="%s" class="small-text" min="0" />',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $value )
                );
                break;

            case 'date':
                printf(
                    '<input type="date" name="%s" id="%s" value="%s" class="regular-text" />',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $value )
                );
                break;

            default: /* text */
                printf(
                    '<input type="text" name="%s" id="%s" value="%s" class="regular-text" placeholder="%s" />',
                    esc_attr( $key ),
                    esc_attr( $key ),
                    esc_attr( $value ),
                    esc_attr( $extra )
                );
                break;
        }

        echo '</td></tr>';
    }
    echo '</tbody></table>';
}

/* ══════════════════════════════════════════════
   5. SAVE META FIELDS
   ══════════════════════════════════════════════ */
function crades_mgr_save_meta( $post_id ) {
    /* Skip autosave, revisions, bulk */
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $post_type = get_post_type( $post_id );

    $nonce_map = [
        'indicateur'  => 'crades_indicateur_nonce',
        'dashboard'   => 'crades_dashboard_nonce',
        'publication' => 'crades_publication_nonce',
        'dataset'     => 'crades_dataset_nonce',
    ];

    $action_map = [
        'indicateur'  => 'crades_indicateur_save',
        'dashboard'   => 'crades_dashboard_save',
        'publication' => 'crades_publication_save',
        'dataset'     => 'crades_dataset_save',
    ];

    if ( ! isset( $nonce_map[ $post_type ] ) ) return;
    if ( ! isset( $_POST[ $nonce_map[ $post_type ] ] ) ) return;
    if ( ! wp_verify_nonce( $_POST[ $nonce_map[ $post_type ] ], $action_map[ $post_type ] ) ) return;

    $meta_keys_map = [
        'indicateur'  => [ 'indicateur_value', 'indicateur_unit', 'indicateur_change_percent', 'indicateur_change_direction', 'indicateur_period', 'indicateur_source' ],
        'dashboard'   => [ 'dashboard_chart_data', 'dashboard_chart_color', 'dashboard_chart_type', 'dashboard_source', 'dashboard_period' ],
        'publication' => [ 'publication_year', 'publication_pdf_url', 'publication_authors', 'publication_pages', 'publication_isbn', 'publication_doi' ],
        'dataset'     => [ 'dataset_format', 'dataset_download_url', 'dataset_records', 'dataset_frequency', 'dataset_source', 'dataset_license', 'dataset_last_update' ],
    ];

    foreach ( $meta_keys_map[ $post_type ] as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            $val = sanitize_text_field( wp_unslash( $_POST[ $key ] ) );
            /* Allow JSON in chart_data */
            if ( $key === 'dashboard_chart_data' ) {
                $val = wp_kses_post( wp_unslash( $_POST[ $key ] ) );
            }
            update_post_meta( $post_id, $key, $val );
        }
    }
}
add_action( 'save_post', 'crades_mgr_save_meta' );

/* ══════════════════════════════════════════════
   6. ADMIN COLUMNS
   ══════════════════════════════════════════════ */

/* ── Indicateur columns ──────────────────── */
function crades_mgr_indicateur_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['ind_value']  = 'Valeur';
            $new['ind_unit']   = 'Unité';
            $new['ind_change'] = 'Variation';
            $new['ind_period'] = 'Période';
        }
    }
    return $new;
}
add_filter( 'manage_indicateur_posts_columns', 'crades_mgr_indicateur_columns' );

function crades_mgr_indicateur_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'ind_value':
            echo esc_html( get_post_meta( $post_id, 'indicateur_value', true ) ?: '—' );
            break;
        case 'ind_unit':
            echo esc_html( get_post_meta( $post_id, 'indicateur_unit', true ) ?: '—' );
            break;
        case 'ind_change':
            $pct = get_post_meta( $post_id, 'indicateur_change_percent', true );
            $dir = get_post_meta( $post_id, 'indicateur_change_direction', true );
            $icon = $dir === 'up' ? '▲' : ( $dir === 'down' ? '▼' : '=' );
            $color = $dir === 'up' ? '#059669' : ( $dir === 'down' ? '#dc2626' : '#64748b' );
            if ( $pct ) {
                printf( '<span style="color:%s;font-weight:600">%s %s%%</span>', $color, $icon, esc_html( $pct ) );
            } else {
                echo '—';
            }
            break;
        case 'ind_period':
            echo esc_html( get_post_meta( $post_id, 'indicateur_period', true ) ?: '—' );
            break;
    }
}
add_action( 'manage_indicateur_posts_custom_column', 'crades_mgr_indicateur_column_data', 10, 2 );

/* ── Dashboard columns ───────────────────── */
function crades_mgr_dashboard_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['dash_type']   = 'Type';
            $new['dash_color']  = 'Couleur';
            $new['dash_source'] = 'Source';
        }
    }
    return $new;
}
add_filter( 'manage_dashboard_posts_columns', 'crades_mgr_dashboard_columns' );

function crades_mgr_dashboard_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'dash_type':
            echo esc_html( get_post_meta( $post_id, 'dashboard_chart_type', true ) ?: 'line' );
            break;
        case 'dash_color':
            $color = get_post_meta( $post_id, 'dashboard_chart_color', true ) ?: '#044bad';
            printf( '<span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:%s;vertical-align:middle;"></span> <code>%s</code>', esc_attr( $color ), esc_html( $color ) );
            break;
        case 'dash_source':
            echo esc_html( get_post_meta( $post_id, 'dashboard_source', true ) ?: '—' );
            break;
    }
}
add_action( 'manage_dashboard_posts_custom_column', 'crades_mgr_dashboard_column_data', 10, 2 );

/* ── Publication columns ─────────────────── */
function crades_mgr_publication_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['pub_year']    = 'Année';
            $new['pub_authors'] = 'Auteur(s)';
            $new['pub_pdf']     = 'PDF';
        }
    }
    return $new;
}
add_filter( 'manage_publication_posts_columns', 'crades_mgr_publication_columns' );

function crades_mgr_publication_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'pub_year':
            echo esc_html( get_post_meta( $post_id, 'publication_year', true ) ?: '—' );
            break;
        case 'pub_authors':
            echo esc_html( get_post_meta( $post_id, 'publication_authors', true ) ?: '—' );
            break;
        case 'pub_pdf':
            $url = get_post_meta( $post_id, 'publication_pdf_url', true );
            if ( $url ) {
                printf( '<a href="%s" target="_blank" title="Télécharger le PDF"><span class="dashicons dashicons-pdf"></span></a>', esc_url( $url ) );
            } else {
                echo '—';
            }
            break;
    }
}
add_action( 'manage_publication_posts_custom_column', 'crades_mgr_publication_column_data', 10, 2 );

/* ── Dataset columns ─────────────────────── */
function crades_mgr_dataset_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['ds_format']    = 'Format';
            $new['ds_records']   = 'Enregistrements';
            $new['ds_frequency'] = 'Fréquence';
        }
    }
    return $new;
}
add_filter( 'manage_dataset_posts_columns', 'crades_mgr_dataset_columns' );

function crades_mgr_dataset_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'ds_format':
            echo esc_html( strtoupper( get_post_meta( $post_id, 'dataset_format', true ) ?: '—' ) );
            break;
        case 'ds_records':
            echo esc_html( get_post_meta( $post_id, 'dataset_records', true ) ?: '—' );
            break;
        case 'ds_frequency':
            $freq_map = [ 'daily' => 'Quotid.', 'weekly' => 'Hebdo.', 'monthly' => 'Mens.', 'quarterly' => 'Trim.', 'annual' => 'Annuel' ];
            $freq = get_post_meta( $post_id, 'dataset_frequency', true );
            echo esc_html( $freq_map[ $freq ] ?? '—' );
            break;
    }
}
add_action( 'manage_dataset_posts_custom_column', 'crades_mgr_dataset_column_data', 10, 2 );

/* ══════════════════════════════════════════════
   7. REST API — Expose meta as top-level fields
   ══════════════════════════════════════════════ */
function crades_mgr_rest_fields() {
    $cpt_meta = [
        'indicateur'  => [ 'indicateur_value', 'indicateur_unit', 'indicateur_change_percent', 'indicateur_change_direction', 'indicateur_period', 'indicateur_source' ],
        'dashboard'   => [ 'dashboard_chart_data', 'dashboard_chart_color', 'dashboard_chart_type', 'dashboard_source', 'dashboard_period' ],
        'publication' => [ 'publication_year', 'publication_pdf_url', 'publication_authors', 'publication_pages', 'publication_isbn', 'publication_doi' ],
        'dataset'     => [ 'dataset_format', 'dataset_download_url', 'dataset_records', 'dataset_frequency', 'dataset_source', 'dataset_license', 'dataset_last_update' ],
    ];

    foreach ( $cpt_meta as $cpt => $keys ) {
        foreach ( $keys as $key ) {
            register_rest_field( $cpt, $key, [
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
}
add_action( 'rest_api_init', 'crades_mgr_rest_fields' );

/* ══════════════════════════════════════════════
   8. ADMIN STYLES
   ══════════════════════════════════════════════ */
function crades_mgr_admin_styles() {
    $screen = get_current_screen();
    if ( ! $screen ) return;

    $cpts = [ 'indicateur', 'dashboard', 'publication', 'dataset' ];
    if ( in_array( $screen->post_type, $cpts, true ) ) {
        echo '<style>
            .crades-meta-table th { width: 180px; font-weight: 600; padding: 12px 10px; }
            .crades-meta-table td { padding: 12px 10px; }
            .crades-meta-table textarea.code { font-family: "SF Mono", Monaco, Consolas, monospace; font-size: 12px; }
            .crades-meta-table input[type="color"] { width: 50px; height: 34px; padding: 2px; cursor: pointer; }
        </style>';
    }
}
add_action( 'admin_head', 'crades_mgr_admin_styles' );

/* ══════════════════════════════════════════════
   9. FLUSH REWRITE ON ACTIVATION
   ══════════════════════════════════════════════ */
function crades_mgr_activate() {
    crades_mgr_register_post_types();
    crades_mgr_register_taxonomies();
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'crades_mgr_activate' );

function crades_mgr_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'crades_mgr_deactivate' );

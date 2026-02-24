<?php
/**
 * Plugin Name: CRADES Publications Manager
 * Plugin URI: https://crades.gouv.sn
 * Description: Gestionnaire avancé des publications du CRADES — Upload PDF via la médiathèque WP, méta-données (année, auteurs, ISBN, DOI, pages), aperçu PDF intégré, taxonomies type/secteur, et export REST API.
 * Version: 1.0.0
 * Author: CRADES
 * Author URI: https://crades.gouv.sn
 * Text Domain: crades-publications
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * License: GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_PUB_VERSION', '1.0.0' );
define( 'CRADES_PUB_DIR', plugin_dir_path( __FILE__ ) );
define( 'CRADES_PUB_URL', plugin_dir_url( __FILE__ ) );

/* ══════════════════════════════════════════════
   1. ENHANCED META BOX FOR PUBLICATIONS
   ══════════════════════════════════════════════
   Note: The 'publication' CPT and base meta are registered
   by the CRADES Manager plugin. This plugin adds advanced
   UI, PDF upload, and publishing workflow enhancements.
   ══════════════════════════════════════════════ */

function crades_pub_add_meta_boxes() {
    /* Main publication details — replaces the basic meta box from CRADES Manager */
    add_meta_box(
        'crades_publication_advanced',
        '<span class="dashicons dashicons-book-alt" style="margin-right:6px;"></span> Publication — Détails complets',
        'crades_pub_advanced_meta_box',
        'publication',
        'normal',
        'high'
    );

    /* PDF Preview side box */
    add_meta_box(
        'crades_publication_pdf_preview',
        '📄 Aperçu PDF',
        'crades_pub_pdf_preview_box',
        'publication',
        'side',
        'default'
    );

    /* Quick Stats side box */
    add_meta_box(
        'crades_publication_stats',
        '📊 Statistiques',
        'crades_pub_stats_box',
        'publication',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'crades_pub_add_meta_boxes', 20 );

/* Remove basic meta box from CRADES Manager if it exists */
function crades_pub_remove_basic_meta_box() {
    remove_meta_box( 'crades_publication_meta', 'publication', 'normal' );
}
add_action( 'add_meta_boxes', 'crades_pub_remove_basic_meta_box', 25 );

/* ── Advanced Publication Meta Box ───────── */
function crades_pub_advanced_meta_box( $post ) {
    wp_nonce_field( 'crades_pub_adv_save', 'crades_pub_adv_nonce' );

    $year     = get_post_meta( $post->ID, 'publication_year', true );
    $pdf_url  = get_post_meta( $post->ID, 'publication_pdf_url', true );
    $authors  = get_post_meta( $post->ID, 'publication_authors', true );
    $pages    = get_post_meta( $post->ID, 'publication_pages', true );
    $isbn     = get_post_meta( $post->ID, 'publication_isbn', true );
    $doi      = get_post_meta( $post->ID, 'publication_doi', true );

    /* Enqueue media uploader */
    wp_enqueue_media();
    ?>
    <style>
        .crades-pub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        .crades-pub-grid .full-width { grid-column: 1 / -1; }
        .crades-pub-grid label { display: block; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em; color: #374151; margin-bottom: 6px; }
        .crades-pub-grid input[type="text"],
        .crades-pub-grid input[type="url"],
        .crades-pub-grid input[type="number"] { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; box-sizing: border-box; }
        .crades-pub-grid input:focus { border-color: #044bad; box-shadow: 0 0 0 2px rgba(4,75,173,0.15); outline: none; }
        .crades-pdf-upload-area { border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer; }
        .crades-pdf-upload-area:hover { border-color: #044bad; background: #eef4fb; }
        .crades-pdf-upload-area.has-file { border-color: #059669; background: #f0fdf4; }
        .crades-pdf-url-display { margin-top: 10px; font-size: 12px; color: #64748b; word-break: break-all; }
        .crades-pdf-url-display a { color: #044bad; }
        .crades-section-divider { border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0; }
    </style>

    <h4 style="margin:0 0 12px;color:#032d6b;font-size:14px;">📌 Informations de base</h4>
    <div class="crades-pub-grid">
        <div>
            <label for="publication_year">Année de publication</label>
            <input type="text" name="publication_year" id="publication_year" value="<?php echo esc_attr( $year ); ?>" placeholder="Ex: 2025" />
        </div>
        <div>
            <label for="publication_authors">Auteur(s)</label>
            <input type="text" name="publication_authors" id="publication_authors" value="<?php echo esc_attr( $authors ); ?>" placeholder="Ex: CRADES, Direction des Études" />
        </div>
        <div>
            <label for="publication_pages">Nombre de pages</label>
            <input type="number" name="publication_pages" id="publication_pages" value="<?php echo esc_attr( $pages ); ?>" min="0" placeholder="Ex: 48" />
        </div>
        <div>
            <label for="publication_isbn">ISBN</label>
            <input type="text" name="publication_isbn" id="publication_isbn" value="<?php echo esc_attr( $isbn ); ?>" placeholder="Ex: 978-2-xxx-xxxxx-x" />
        </div>
        <div class="full-width">
            <label for="publication_doi">DOI</label>
            <input type="text" name="publication_doi" id="publication_doi" value="<?php echo esc_attr( $doi ); ?>" placeholder="Ex: 10.xxxxx/crades.2025.001" />
        </div>
    </div>

    <hr class="crades-section-divider" />

    <h4 style="margin:0 0 12px;color:#032d6b;font-size:14px;">📄 Fichier PDF</h4>
    <div class="crades-pdf-upload-area <?php echo $pdf_url ? 'has-file' : ''; ?>" id="crades-pdf-upload-area">
        <span class="dashicons dashicons-media-document" style="font-size:32px;color:#044bad;"></span>
        <p style="margin:8px 0 0;font-size:13px;color:#374151;" id="crades-pdf-upload-text">
            <?php echo $pdf_url ? '✅ PDF attaché — Cliquez pour modifier' : 'Cliquez pour uploader un PDF'; ?>
        </p>
        <input type="hidden" name="publication_pdf_url" id="publication_pdf_url" value="<?php echo esc_attr( $pdf_url ); ?>" />
    </div>
    <?php if ( $pdf_url ) : ?>
        <div class="crades-pdf-url-display">
            <a href="<?php echo esc_url( $pdf_url ); ?>" target="_blank"><?php echo esc_html( $pdf_url ); ?></a>
            <button type="button" class="button button-small" id="crades-pdf-remove" style="margin-left:8px;color:#dc2626;">✕ Supprimer</button>
        </div>
    <?php endif; ?>

    <script>
    jQuery(document).ready(function($) {
        var frame;
        $('#crades-pdf-upload-area').on('click', function(e) {
            e.preventDefault();
            if (frame) { frame.open(); return; }
            frame = wp.media({
                title: 'Sélectionner un PDF',
                button: { text: 'Utiliser ce fichier' },
                library: { type: 'application/pdf' },
                multiple: false
            });
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                $('#publication_pdf_url').val(attachment.url);
                $('#crades-pdf-upload-text').text('✅ PDF attaché — ' + attachment.filename);
                $('#crades-pdf-upload-area').addClass('has-file');
                /* Refresh the preview box */
                if ($('#crades-pdf-iframe').length) {
                    $('#crades-pdf-iframe').attr('src', attachment.url);
                }
            });
            frame.open();
        });
        $('#crades-pdf-remove').on('click', function(e) {
            e.preventDefault();
            $('#publication_pdf_url').val('');
            $('#crades-pdf-upload-text').text('Cliquez pour uploader un PDF');
            $('#crades-pdf-upload-area').removeClass('has-file');
            $(this).closest('.crades-pdf-url-display').remove();
        });
    });
    </script>
    <?php
}

/* ── PDF Preview Box ─────────────────────── */
function crades_pub_pdf_preview_box( $post ) {
    $pdf_url = get_post_meta( $post->ID, 'publication_pdf_url', true );
    if ( $pdf_url ) {
        printf(
            '<iframe id="crades-pdf-iframe" src="%s" style="width:100%%;height:300px;border:1px solid #e5e7eb;border-radius:6px;"></iframe>
            <p style="margin:8px 0 0;font-size:11px;text-align:center;">
                <a href="%s" target="_blank" class="button button-small">Ouvrir dans un nouvel onglet</a>
            </p>',
            esc_url( $pdf_url ),
            esc_url( $pdf_url )
        );
    } else {
        echo '<p style="color:#64748b;font-size:13px;text-align:center;padding:20px 0;">Aucun PDF attaché.<br>Uploadez un fichier dans les détails ci-dessous.</p>';
    }
}

/* ── Stats Box ───────────────────────────── */
function crades_pub_stats_box( $post ) {
    $word_count = str_word_count( wp_strip_all_tags( $post->post_content ) );
    $pages = get_post_meta( $post->ID, 'publication_pages', true );
    $year = get_post_meta( $post->ID, 'publication_year', true );
    $has_pdf = get_post_meta( $post->ID, 'publication_pdf_url', true ) ? true : false;
    $has_image = has_post_thumbnail( $post->ID );

    $items = [
        [ 'Mots (contenu WP)', number_format( $word_count ), '#044bad' ],
        [ 'Pages', $pages ?: '—', '#b8943e' ],
        [ 'Année', $year ?: '—', '#374151' ],
        [ 'PDF', $has_pdf ? '✅' : '❌', $has_pdf ? '#059669' : '#dc2626' ],
        [ 'Image', $has_image ? '✅' : '❌', $has_image ? '#059669' : '#dc2626' ],
    ];
    echo '<table style="width:100%;border-collapse:collapse;">';
    foreach ( $items as $item ) {
        printf(
            '<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;font-size:12px;color:#64748b;">%s</td><td style="padding:6px 0;font-size:13px;font-weight:600;text-align:right;color:%s;">%s</td></tr>',
            esc_html( $item[0] ),
            esc_attr( $item[2] ),
            esc_html( $item[1] )
        );
    }
    echo '</table>';
}

/* ══════════════════════════════════════════════
   2. SAVE META
   ══════════════════════════════════════════════ */
function crades_pub_save_meta( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( get_post_type( $post_id ) !== 'publication' ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
    if ( ! isset( $_POST['crades_pub_adv_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['crades_pub_adv_nonce'], 'crades_pub_adv_save' ) ) return;

    $fields = [
        'publication_year'    => 'sanitize_text_field',
        'publication_pdf_url' => 'esc_url_raw',
        'publication_authors' => 'sanitize_text_field',
        'publication_pages'   => 'absint',
        'publication_isbn'    => 'sanitize_text_field',
        'publication_doi'     => 'sanitize_text_field',
    ];

    foreach ( $fields as $key => $sanitizer ) {
        if ( isset( $_POST[ $key ] ) ) {
            $val = call_user_func( $sanitizer, wp_unslash( $_POST[ $key ] ) );
            update_post_meta( $post_id, $key, $val );
        }
    }
}
add_action( 'save_post', 'crades_pub_save_meta' );

/* ══════════════════════════════════════════════
   3. DEFAULT PUBLICATION TYPES
   ══════════════════════════════════════════════ */
function crades_pub_default_terms() {
    if ( ! taxonomy_exists( 'publication_type' ) ) return;

    $types = [
        'rapport-annuel'   => 'Rapport annuel',
        'note-conjoncture' => 'Note de conjoncture',
        'etude'            => 'Étude',
        'bulletin'         => 'Bulletin statistique',
        'document-travail' => 'Document de travail',
        'guide'            => 'Guide',
    ];
    foreach ( $types as $slug => $name ) {
        if ( ! term_exists( $slug, 'publication_type' ) ) {
            wp_insert_term( $name, 'publication_type', [ 'slug' => $slug ] );
        }
    }

    if ( ! taxonomy_exists( 'sector' ) ) return;

    $sectors = [
        'industrie'          => 'Industrie',
        'commerce'           => 'Commerce',
        'mines-energie'      => 'Mines & Énergie',
        'agro-industrie'     => 'Agro-industrie',
        'numerique'          => 'Numérique',
        'transport-logistique' => 'Transport & Logistique',
        'btp'                => 'BTP',
    ];
    foreach ( $sectors as $slug => $name ) {
        if ( ! term_exists( $slug, 'sector' ) ) {
            wp_insert_term( $name, 'sector', [ 'slug' => $slug ] );
        }
    }
}
add_action( 'init', 'crades_pub_default_terms', 30 );

/* ══════════════════════════════════════════════
   4. ADMIN COLUMNS — Enhanced
   ══════════════════════════════════════════════ */
function crades_pub_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        if ( $key === 'date' ) continue; /* Move date to end */
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['pub_year']    = 'Année';
            $new['pub_authors'] = 'Auteur(s)';
            $new['pub_pages']   = 'Pages';
            $new['pub_pdf']     = '📄 PDF';
            $new['pub_type']    = 'Type';
            $new['pub_sector']  = 'Secteur';
        }
    }
    $new['date'] = 'Date';
    return $new;
}
add_filter( 'manage_publication_posts_columns', 'crades_pub_columns', 20 );

function crades_pub_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'pub_year':
            $y = get_post_meta( $post_id, 'publication_year', true );
            echo $y ? '<strong>' . esc_html( $y ) . '</strong>' : '—';
            break;
        case 'pub_authors':
            echo esc_html( get_post_meta( $post_id, 'publication_authors', true ) ?: '—' );
            break;
        case 'pub_pages':
            $p = get_post_meta( $post_id, 'publication_pages', true );
            echo $p ? esc_html( $p ) . ' p.' : '—';
            break;
        case 'pub_pdf':
            $url = get_post_meta( $post_id, 'publication_pdf_url', true );
            if ( $url ) {
                printf( '<a href="%s" target="_blank" style="color:#059669;font-weight:600;" title="Télécharger">📄 PDF</a>', esc_url( $url ) );
            } else {
                echo '<span style="color:#dc2626;">✕</span>';
            }
            break;
        case 'pub_type':
            $terms = get_the_terms( $post_id, 'publication_type' );
            if ( $terms && ! is_wp_error( $terms ) ) {
                echo implode( ', ', wp_list_pluck( $terms, 'name' ) );
            } else {
                echo '—';
            }
            break;
        case 'pub_sector':
            $terms = get_the_terms( $post_id, 'sector' );
            if ( $terms && ! is_wp_error( $terms ) ) {
                echo '<span style="color:#b8943e;">' . implode( ', ', wp_list_pluck( $terms, 'name' ) ) . '</span>';
            } else {
                echo '—';
            }
            break;
    }
}
add_action( 'manage_publication_posts_custom_column', 'crades_pub_column_data', 20, 2 );

/* ══════════════════════════════════════════════
   5. SORTABLE / FILTERABLE
   ══════════════════════════════════════════════ */
function crades_pub_sortable_columns( $columns ) {
    $columns['pub_year']  = 'pub_year';
    $columns['pub_pages'] = 'pub_pages';
    return $columns;
}
add_filter( 'manage_edit-publication_sortable_columns', 'crades_pub_sortable_columns' );

function crades_pub_orderby( $query ) {
    if ( ! is_admin() || ! $query->is_main_query() ) return;
    $orderby = $query->get( 'orderby' );
    if ( $orderby === 'pub_year' ) {
        $query->set( 'meta_key', 'publication_year' );
        $query->set( 'orderby', 'meta_value' );
    } elseif ( $orderby === 'pub_pages' ) {
        $query->set( 'meta_key', 'publication_pages' );
        $query->set( 'orderby', 'meta_value_num' );
    }
}
add_action( 'pre_get_posts', 'crades_pub_orderby' );

/* Filter dropdown by type and sector */
function crades_pub_admin_filters() {
    global $typenow;
    if ( $typenow !== 'publication' ) return;

    /* Publication type dropdown */
    $terms = get_terms( [ 'taxonomy' => 'publication_type', 'hide_empty' => false ] );
    if ( $terms && ! is_wp_error( $terms ) ) {
        $selected = isset( $_GET['publication_type'] ) ? sanitize_text_field( $_GET['publication_type'] ) : '';
        echo '<select name="publication_type">';
        echo '<option value="">Tous les types</option>';
        foreach ( $terms as $term ) {
            printf( '<option value="%s" %s>%s (%d)</option>', esc_attr( $term->slug ), selected( $selected, $term->slug, false ), esc_html( $term->name ), $term->count );
        }
        echo '</select>';
    }

    /* Sector dropdown */
    $sectors = get_terms( [ 'taxonomy' => 'sector', 'hide_empty' => false ] );
    if ( $sectors && ! is_wp_error( $sectors ) ) {
        $selected = isset( $_GET['sector'] ) ? sanitize_text_field( $_GET['sector'] ) : '';
        echo '<select name="sector">';
        echo '<option value="">Tous les secteurs</option>';
        foreach ( $sectors as $term ) {
            printf( '<option value="%s" %s>%s (%d)</option>', esc_attr( $term->slug ), selected( $selected, $term->slug, false ), esc_html( $term->name ), $term->count );
        }
        echo '</select>';
    }

    /* Year filter */
    global $wpdb;
    $years = $wpdb->get_col( "SELECT DISTINCT meta_value FROM $wpdb->postmeta WHERE meta_key = 'publication_year' AND meta_value != '' ORDER BY meta_value DESC" );
    if ( $years ) {
        $selected = isset( $_GET['pub_year_filter'] ) ? sanitize_text_field( $_GET['pub_year_filter'] ) : '';
        echo '<select name="pub_year_filter">';
        echo '<option value="">Toutes les années</option>';
        foreach ( $years as $y ) {
            printf( '<option value="%s" %s>%s</option>', esc_attr( $y ), selected( $selected, $y, false ), esc_html( $y ) );
        }
        echo '</select>';
    }
}
add_action( 'restrict_manage_posts', 'crades_pub_admin_filters' );

function crades_pub_filter_query( $query ) {
    if ( ! is_admin() || ! $query->is_main_query() ) return;
    if ( $query->get( 'post_type' ) !== 'publication' ) return;

    if ( ! empty( $_GET['pub_year_filter'] ) ) {
        $query->set( 'meta_query', [
            [ 'key' => 'publication_year', 'value' => sanitize_text_field( $_GET['pub_year_filter'] ) ]
        ] );
    }
}
add_action( 'pre_get_posts', 'crades_pub_filter_query' );

/* ══════════════════════════════════════════════
   6. ALLOW PDF MIME TYPE
   ══════════════════════════════════════════════ */
function crades_pub_mime_types( $mimes ) {
    $mimes['pdf'] = 'application/pdf';
    return $mimes;
}
add_filter( 'upload_mimes', 'crades_pub_mime_types' );

/* ══════════════════════════════════════════════
   7. ACTIVATION
   ══════════════════════════════════════════════ */
function crades_pub_activate() {
    /* Flush after taxonomy registration */
    if ( function_exists( 'crades_mgr_register_post_types' ) ) {
        crades_mgr_register_post_types();
        crades_mgr_register_taxonomies();
    }
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'crades_pub_activate' );

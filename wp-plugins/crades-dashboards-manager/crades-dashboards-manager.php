<?php
/**
 * Plugin Name: CRADES Dashboards Manager
 * Plugin URI: https://crades.gouv.sn
 * Description: Gestionnaire avancé des tableaux de bord du CRADES — Éditeur JSON de données de graphiques avec prévisualisation Chart.js en temps réel, sélecteur de couleurs, types de graphiques, templates prédéfinis, et export REST API.
 * Version: 1.0.0
 * Author: CRADES
 * Author URI: https://crades.gouv.sn
 * Text Domain: crades-dashboards
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * License: GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CRADES_DASH_VERSION', '1.0.0' );
define( 'CRADES_DASH_DIR', plugin_dir_path( __FILE__ ) );
define( 'CRADES_DASH_URL', plugin_dir_url( __FILE__ ) );

/* ══════════════════════════════════════════════
   1. ENHANCED META BOXES
   ══════════════════════════════════════════════ */
function crades_dash_add_meta_boxes() {
    /* Remove basic meta box from CRADES Manager */
    remove_meta_box( 'crades_dashboard_meta', 'dashboard', 'normal' );

    /* Chart Data Editor (main) */
    add_meta_box(
        'crades_dash_chart_editor',
        '<span class="dashicons dashicons-chart-area" style="margin-right:6px;"></span> Éditeur de graphique',
        'crades_dash_chart_editor_box',
        'dashboard',
        'normal',
        'high'
    );

    /* Chart Preview (below) */
    add_meta_box(
        'crades_dash_chart_preview',
        '📊 Prévisualisation du graphique',
        'crades_dash_chart_preview_box',
        'dashboard',
        'normal',
        'default'
    );

    /* Settings sidebar */
    add_meta_box(
        'crades_dash_settings',
        '⚙️ Paramètres',
        'crades_dash_settings_box',
        'dashboard',
        'side',
        'default'
    );

    /* Templates sidebar */
    add_meta_box(
        'crades_dash_templates',
        '📋 Templates de données',
        'crades_dash_templates_box',
        'dashboard',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'crades_dash_add_meta_boxes', 20 );

/* ── Chart Editor Box ────────────────────── */
function crades_dash_chart_editor_box( $post ) {
    wp_nonce_field( 'crades_dash_save', 'crades_dash_nonce' );

    $chart_data  = get_post_meta( $post->ID, 'dashboard_chart_data', true );
    $chart_color = get_post_meta( $post->ID, 'dashboard_chart_color', true ) ?: '#044bad';
    $chart_type  = get_post_meta( $post->ID, 'dashboard_chart_type', true ) ?: 'line';

    /* Default JSON template */
    $default_json = json_encode( [
        'type' => 'line',
        'data' => [
            'labels'   => [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc' ],
            'datasets' => [
                [
                    'label' => 'Série 1',
                    'data'  => [ 100, 105, 110, 108, 115, 120, 118, 125, 130, 128, 135, 140 ],
                ]
            ],
        ],
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

    ?>
    <style>
        .crades-dash-editor { position: relative; }
        .crades-dash-toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; padding: 10px 14px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; flex-wrap: wrap; }
        .crades-dash-toolbar label { font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.03em; }
        .crades-dash-toolbar select,
        .crades-dash-toolbar input[type="color"] { border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 8px; font-size: 13px; }
        .crades-dash-toolbar input[type="color"] { width: 44px; height: 34px; padding: 2px; cursor: pointer; }
        #crades_chart_json_editor { width: 100%; min-height: 300px; font-family: "SF Mono", Monaco, Consolas, "Courier New", monospace; font-size: 12px; line-height: 1.5; padding: 14px; border: 1px solid #d1d5db; border-radius: 8px; background: #1e293b; color: #e2e8f0; resize: vertical; tab-size: 2; }
        #crades_chart_json_editor:focus { border-color: #044bad; outline: none; box-shadow: 0 0 0 3px rgba(4,75,173,0.15); }
        .crades-json-status { margin-top: 8px; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; display: inline-block; }
        .crades-json-status.valid { background: #f0fdf4; color: #059669; }
        .crades-json-status.invalid { background: #fef2f2; color: #dc2626; }
        .crades-dash-actions { margin-top: 12px; display: flex; gap: 8px; }
        .crades-dash-actions button { cursor: pointer; }
    </style>

    <div class="crades-dash-editor">
        <div class="crades-dash-toolbar">
            <div>
                <label for="dashboard_chart_type">Type</label><br>
                <select name="dashboard_chart_type" id="dashboard_chart_type">
                    <?php
                    $types = [ 'line' => '📈 Courbe', 'bar' => '📊 Barres', 'pie' => '🥧 Camembert', 'doughnut' => '🍩 Anneau', 'radar' => '🕸️ Radar', 'polarArea' => '🎯 Polaire' ];
                    foreach ( $types as $val => $label ) {
                        printf( '<option value="%s" %s>%s</option>', esc_attr( $val ), selected( $chart_type, $val, false ), esc_html( $label ) );
                    }
                    ?>
                </select>
            </div>
            <div>
                <label for="dashboard_chart_color">Couleur</label><br>
                <input type="color" name="dashboard_chart_color" id="dashboard_chart_color" value="<?php echo esc_attr( $chart_color ); ?>" />
            </div>
            <div style="flex:1;"></div>
            <div>
                <button type="button" class="button" id="crades-format-json" title="Formater le JSON">
                    <span class="dashicons dashicons-editor-code" style="margin-top:3px;"></span> Formater
                </button>
                <button type="button" class="button" id="crades-validate-json" title="Valider le JSON">
                    ✓ Valider
                </button>
                <button type="button" class="button button-primary" id="crades-refresh-preview" style="background:#044bad;border-color:#032d6b;">
                    <span class="dashicons dashicons-update" style="margin-top:3px;"></span> Prévisualiser
                </button>
            </div>
        </div>

        <textarea name="dashboard_chart_data" id="crades_chart_json_editor"><?php echo esc_textarea( $chart_data ?: $default_json ); ?></textarea>

        <div id="crades-json-status-wrap">
            <span class="crades-json-status valid" id="crades-json-status">✓ JSON valide</span>
        </div>
    </div>

    <script>
    jQuery(document).ready(function($) {
        var editor = $('#crades_chart_json_editor');
        var statusEl = $('#crades-json-status');

        function validateJson() {
            try {
                JSON.parse(editor.val());
                statusEl.text('✓ JSON valide').removeClass('invalid').addClass('valid');
                return true;
            } catch(e) {
                statusEl.text('✕ Erreur: ' + e.message).removeClass('valid').addClass('invalid');
                return false;
            }
        }

        function formatJson() {
            try {
                var obj = JSON.parse(editor.val());
                editor.val(JSON.stringify(obj, null, 2));
                validateJson();
            } catch(e) {
                validateJson();
            }
        }

        editor.on('input', function() { validateJson(); });
        $('#crades-format-json').on('click', formatJson);
        $('#crades-validate-json').on('click', validateJson);

        /* Update chart type in JSON when dropdown changes */
        $('#dashboard_chart_type').on('change', function() {
            try {
                var obj = JSON.parse(editor.val());
                obj.type = $(this).val();
                editor.val(JSON.stringify(obj, null, 2));
                validateJson();
            } catch(e) {}
        });

        /* Tab key inserts spaces */
        editor.on('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
        });

        validateJson();
    });
    </script>
    <?php
}

/* ── Chart Preview Box ───────────────────── */
function crades_dash_chart_preview_box( $post ) {
    $chart_data  = get_post_meta( $post->ID, 'dashboard_chart_data', true );
    $chart_color = get_post_meta( $post->ID, 'dashboard_chart_color', true ) ?: '#044bad';

    /* Enqueue Chart.js for admin preview */
    wp_enqueue_script( 'chartjs-admin', 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', [], '4.4.0', true );
    ?>
    <div style="position:relative;max-height:400px;padding:16px;background:#fff;border-radius:8px;">
        <canvas id="crades-dash-preview-canvas" style="max-height:360px;"></canvas>
    </div>
    <p style="text-align:center;margin-top:10px;">
        <button type="button" class="button button-primary" id="crades-render-preview" style="background:#044bad;border-color:#032d6b;">
            <span class="dashicons dashicons-visibility" style="margin-top:3px;margin-right:4px;"></span>
            Rafraîchir la prévisualisation
        </button>
    </p>

    <script>
    jQuery(document).ready(function($) {
        var chartInstance = null;

        function renderPreview() {
            var canvas = document.getElementById('crades-dash-preview-canvas');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');

            if (chartInstance) { chartInstance.destroy(); }

            try {
                var rawJson = $('#crades_chart_json_editor').val();
                var chartConfig = JSON.parse(rawJson);
                var color = $('#dashboard_chart_color').val() || '<?php echo esc_js( $chart_color ); ?>';

                /* Apply color to datasets */
                if (chartConfig.data && chartConfig.data.datasets) {
                    chartConfig.data.datasets.forEach(function(ds, i) {
                        if (!ds.borderColor) ds.borderColor = color;
                        if (!ds.backgroundColor) {
                            if (['pie','doughnut','polarArea'].indexOf(chartConfig.type) >= 0) {
                                ds.backgroundColor = chartConfig.data.labels.map(function(_, j) {
                                    var hue = (j * 360 / chartConfig.data.labels.length) % 360;
                                    return 'hsl(' + hue + ', 65%, 55%)';
                                });
                            } else {
                                ds.backgroundColor = color + '33';
                            }
                        }
                        if (chartConfig.type === 'line' && !ds.tension) {
                            ds.tension = 0.3;
                        }
                    });
                }

                if (!chartConfig.options) chartConfig.options = {};
                chartConfig.options.responsive = true;
                chartConfig.options.maintainAspectRatio = true;

                chartInstance = new Chart(ctx, chartConfig);
            } catch(e) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '14px Montserrat, sans-serif';
                ctx.fillStyle = '#dc2626';
                ctx.textAlign = 'center';
                ctx.fillText('Erreur JSON: ' + e.message, canvas.width / 2, canvas.height / 2);
            }
        }

        /* Wait for Chart.js to load */
        var waitForChart = setInterval(function() {
            if (typeof Chart !== 'undefined') {
                clearInterval(waitForChart);
                renderPreview();
            }
        }, 200);

        $('#crades-render-preview, #crades-refresh-preview').on('click', renderPreview);
        $('#dashboard_chart_type, #dashboard_chart_color').on('change', function() {
            setTimeout(renderPreview, 100);
        });
    });
    </script>
    <?php
}

/* ── Settings Side Box ───────────────────── */
function crades_dash_settings_box( $post ) {
    $source = get_post_meta( $post->ID, 'dashboard_source', true );
    $period = get_post_meta( $post->ID, 'dashboard_period', true );
    ?>
    <style>
        .crades-dash-side-field { margin-bottom: 14px; }
        .crades-dash-side-field label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; color: #374151; margin-bottom: 4px; }
        .crades-dash-side-field input { width: 100%; padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; }
    </style>
    <div class="crades-dash-side-field">
        <label for="dashboard_source">Source des données</label>
        <input type="text" name="dashboard_source" id="dashboard_source" value="<?php echo esc_attr( $source ); ?>" placeholder="Ex: ANSD, BCEAO" />
    </div>
    <div class="crades-dash-side-field">
        <label for="dashboard_period">Période couverte</label>
        <input type="text" name="dashboard_period" id="dashboard_period" value="<?php echo esc_attr( $period ); ?>" placeholder="Ex: 2020-2025" />
    </div>
    <?php
}

/* ── Templates Side Box ──────────────────── */
function crades_dash_templates_box( $post ) {
    ?>
    <style>
        .crades-template-btn { display: block; width: 100%; text-align: left; padding: 8px 12px; margin-bottom: 6px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 12px; transition: background 0.2s; }
        .crades-template-btn:hover { background: #eef4fb; border-color: #044bad; }
        .crades-template-btn .dashicons { color: #044bad; margin-right: 4px; }
    </style>
    <p style="font-size:11px;color:#64748b;margin-bottom:10px;">Cliquez pour insérer un template de données dans l'éditeur JSON.</p>

    <button type="button" class="crades-template-btn" data-template="line-monthly">
        <span class="dashicons dashicons-chart-line"></span> Courbe mensuelle (12 mois)
    </button>
    <button type="button" class="crades-template-btn" data-template="bar-quarterly">
        <span class="dashicons dashicons-chart-bar"></span> Barres trimestrielles
    </button>
    <button type="button" class="crades-template-btn" data-template="pie-sectors">
        <span class="dashicons dashicons-chart-pie"></span> Camembert (secteurs)
    </button>
    <button type="button" class="crades-template-btn" data-template="line-yearly">
        <span class="dashicons dashicons-chart-area"></span> Évolution annuelle (10 ans)
    </button>
    <button type="button" class="crades-template-btn" data-template="bar-comparison">
        <span class="dashicons dashicons-chart-bar"></span> Comparaison (2 séries)
    </button>

    <script>
    jQuery(document).ready(function($) {
        var templates = {
            'line-monthly': {
                type: 'line',
                data: {
                    labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
                    datasets: [{ label: 'Série mensuelle', data: [100,105,110,108,115,120,118,125,130,128,135,140] }]
                }
            },
            'bar-quarterly': {
                type: 'bar',
                data: {
                    labels: ['T1 2024','T2 2024','T3 2024','T4 2024','T1 2025','T2 2025'],
                    datasets: [{ label: 'Valeur trimestrielle', data: [250,280,310,295,320,345] }]
                }
            },
            'pie-sectors': {
                type: 'pie',
                data: {
                    labels: ['Industrie','Commerce','Mines','Agro-industrie','Numérique','Autres'],
                    datasets: [{ label: 'Répartition', data: [30,25,15,12,10,8] }]
                }
            },
            'line-yearly': {
                type: 'line',
                data: {
                    labels: ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
                    datasets: [{ label: 'Évolution annuelle', data: [100,108,115,120,95,110,125,135,142,150] }]
                }
            },
            'bar-comparison': {
                type: 'bar',
                data: {
                    labels: ['Jan','Fév','Mar','Avr','Mai','Jun'],
                    datasets: [
                        { label: 'Exportations', data: [120,135,128,142,138,150] },
                        { label: 'Importations', data: [180,175,190,185,195,200] }
                    ]
                }
            }
        };

        $('.crades-template-btn').on('click', function() {
            var key = $(this).data('template');
            if (templates[key]) {
                var json = JSON.stringify(templates[key], null, 2);
                $('#crades_chart_json_editor').val(json).trigger('input');
                $('#dashboard_chart_type').val(templates[key].type);
                /* Trigger preview refresh */
                setTimeout(function() {
                    $('#crades-render-preview').trigger('click');
                }, 200);
            }
        });
    });
    </script>
    <?php
}

/* ══════════════════════════════════════════════
   2. SAVE META
   ══════════════════════════════════════════════ */
function crades_dash_save_meta( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( get_post_type( $post_id ) !== 'dashboard' ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
    if ( ! isset( $_POST['crades_dash_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['crades_dash_nonce'], 'crades_dash_save' ) ) return;

    $text_fields = [ 'dashboard_chart_type', 'dashboard_chart_color', 'dashboard_source', 'dashboard_period' ];
    foreach ( $text_fields as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
        }
    }

    /* JSON data — validate before saving */
    if ( isset( $_POST['dashboard_chart_data'] ) ) {
        $raw = wp_unslash( $_POST['dashboard_chart_data'] );
        /* Validate JSON */
        $decoded = json_decode( $raw );
        if ( json_last_error() === JSON_ERROR_NONE ) {
            /* Re-encode to ensure clean JSON */
            update_post_meta( $post_id, 'dashboard_chart_data', wp_json_encode( $decoded ) );
        } else {
            /* Save raw but add admin notice */
            update_post_meta( $post_id, 'dashboard_chart_data', $raw );
            add_filter( 'redirect_post_location', function( $location ) {
                return add_query_arg( 'crades_json_error', '1', $location );
            } );
        }
    }
}
add_action( 'save_post', 'crades_dash_save_meta' );

/* JSON error notice */
function crades_dash_json_error_notice() {
    if ( isset( $_GET['crades_json_error'] ) ) {
        echo '<div class="notice notice-warning is-dismissible"><p><strong>⚠️ Attention :</strong> Le JSON des données du graphique contient des erreurs de syntaxe. Le graphique ne s\'affichera pas correctement sur le site.</p></div>';
    }
}
add_action( 'admin_notices', 'crades_dash_json_error_notice' );

/* ══════════════════════════════════════════════
   3. ADMIN COLUMNS — Enhanced
   ══════════════════════════════════════════════ */
function crades_dash_columns( $columns ) {
    $new = [];
    foreach ( $columns as $key => $val ) {
        if ( $key === 'date' ) continue;
        $new[ $key ] = $val;
        if ( $key === 'title' ) {
            $new['dash_type_adv']   = 'Type graphique';
            $new['dash_color_adv']  = 'Couleur';
            $new['dash_source_adv'] = 'Source';
            $new['dash_period_adv'] = 'Période';
            $new['dash_data_adv']   = 'Données';
        }
    }
    $new['date'] = 'Date';
    return $new;
}
add_filter( 'manage_dashboard_posts_columns', 'crades_dash_columns', 20 );

function crades_dash_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'dash_type_adv':
            $types_map = [ 'line' => '📈 Courbe', 'bar' => '📊 Barres', 'pie' => '🥧 Camembert', 'doughnut' => '🍩 Anneau', 'radar' => '🕸️ Radar', 'polarArea' => '🎯 Polaire' ];
            $type = get_post_meta( $post_id, 'dashboard_chart_type', true ) ?: 'line';
            echo esc_html( $types_map[ $type ] ?? $type );
            break;
        case 'dash_color_adv':
            $color = get_post_meta( $post_id, 'dashboard_chart_color', true ) ?: '#044bad';
            printf( '<span style="display:inline-block;width:24px;height:24px;border-radius:6px;background:%s;vertical-align:middle;border:1px solid #e5e7eb;"></span> <code style="font-size:11px;">%s</code>', esc_attr( $color ), esc_html( $color ) );
            break;
        case 'dash_source_adv':
            echo esc_html( get_post_meta( $post_id, 'dashboard_source', true ) ?: '—' );
            break;
        case 'dash_period_adv':
            echo esc_html( get_post_meta( $post_id, 'dashboard_period', true ) ?: '—' );
            break;
        case 'dash_data_adv':
            $data = get_post_meta( $post_id, 'dashboard_chart_data', true );
            if ( $data ) {
                $decoded = json_decode( $data );
                $valid = json_last_error() === JSON_ERROR_NONE;
                if ( $valid ) {
                    $datasets = isset( $decoded->data->datasets ) ? count( $decoded->data->datasets ) : 0;
                    $labels = isset( $decoded->data->labels ) ? count( $decoded->data->labels ) : 0;
                    printf( '<span style="color:#059669;font-weight:600;">✓</span> %d série(s), %d points', $datasets, $labels );
                } else {
                    echo '<span style="color:#dc2626;font-weight:600;">✕ JSON invalide</span>';
                }
            } else {
                echo '<span style="color:#64748b;">Aucune donnée</span>';
            }
            break;
    }
}
add_action( 'manage_dashboard_posts_custom_column', 'crades_dash_column_data', 20, 2 );

/* ══════════════════════════════════════════════
   4. DASHBOARD WIDGET — Dashboard Overview
   ══════════════════════════════════════════════ */
function crades_dash_overview_widget() {
    wp_add_dashboard_widget(
        'crades_dashboards_overview',
        '📊 Tableaux de bord — Vue d\'ensemble',
        'crades_dash_overview_render'
    );
}
add_action( 'wp_dashboard_setup', 'crades_dash_overview_widget' );

function crades_dash_overview_render() {
    $dashboards = get_posts( [
        'post_type'   => 'dashboard',
        'numberposts' => -1,
        'post_status' => 'publish',
    ] );

    $total = count( $dashboards );
    $with_data = 0;
    $types = [];

    foreach ( $dashboards as $d ) {
        $data = get_post_meta( $d->ID, 'dashboard_chart_data', true );
        if ( $data && json_decode( $data ) ) $with_data++;
        $type = get_post_meta( $d->ID, 'dashboard_chart_type', true ) ?: 'line';
        $types[ $type ] = ( $types[ $type ] ?? 0 ) + 1;
    }

    ?>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:#eef4fb;padding:14px;border-radius:8px;text-align:center;">
            <div style="font-size:24px;font-weight:800;color:#032d6b;"><?php echo $total; ?></div>
            <div style="font-size:11px;color:#64748b;">Tableaux de bord</div>
        </div>
        <div style="background:#f0fdf4;padding:14px;border-radius:8px;text-align:center;">
            <div style="font-size:24px;font-weight:800;color:#059669;"><?php echo $with_data; ?></div>
            <div style="font-size:11px;color:#64748b;">Avec données</div>
        </div>
    </div>
    <?php if ( ! empty( $types ) ) : ?>
    <table style="width:100%;border-collapse:collapse;">
        <?php foreach ( $types as $type => $count ) : ?>
        <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:6px 0;font-size:12px;"><?php echo esc_html( ucfirst( $type ) ); ?></td>
            <td style="padding:6px 0;font-size:13px;font-weight:600;text-align:right;color:#044bad;"><?php echo $count; ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <?php endif; ?>
    <p style="margin-top:12px;">
        <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=dashboard' ) ); ?>" class="button">Gérer les tableaux de bord</a>
        <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=dashboard' ) ); ?>" class="button button-primary" style="background:#044bad;border-color:#032d6b;">+ Nouveau</a>
    </p>
    <?php
}

/* ══════════════════════════════════════════════
   5. FRONT-END CHART RENDERING SHORTCODE
   ══════════════════════════════════════════════ */
function crades_dash_chart_shortcode( $atts ) {
    $atts = shortcode_atts( [ 'id' => 0, 'height' => '300px' ], $atts, 'crades_chart' );
    $post_id = absint( $atts['id'] );
    if ( ! $post_id ) return '';

    $data  = get_post_meta( $post_id, 'dashboard_chart_data', true );
    $color = get_post_meta( $post_id, 'dashboard_chart_color', true ) ?: '#044bad';
    $title = get_the_title( $post_id );

    if ( ! $data ) return '<p style="color:#64748b;text-align:center;">Aucune donnée de graphique disponible.</p>';

    $uid = 'crades-chart-' . $post_id . '-' . wp_rand( 1000, 9999 );

    ob_start();
    ?>
    <div class="crades-chart-wrap" style="margin:1rem 0;">
        <h3 class="crades-chart-title"><?php echo esc_html( $title ); ?></h3>
        <div style="position:relative;height:<?php echo esc_attr( $atts['height'] ); ?>;">
            <canvas id="<?php echo esc_attr( $uid ); ?>"></canvas>
        </div>
    </div>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var cfg = <?php echo $data; ?>;
        var color = '<?php echo esc_js( $color ); ?>';
        if (cfg.data && cfg.data.datasets) {
            cfg.data.datasets.forEach(function(ds) {
                if (!ds.borderColor) ds.borderColor = color;
                if (!ds.backgroundColor) ds.backgroundColor = color + '33';
                if (cfg.type === 'line' && !ds.tension) ds.tension = 0.3;
            });
        }
        if (!cfg.options) cfg.options = {};
        cfg.options.responsive = true;
        cfg.options.maintainAspectRatio = false;
        new Chart(document.getElementById('<?php echo esc_js( $uid ); ?>'), cfg);
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode( 'crades_chart', 'crades_dash_chart_shortcode' );

/* ══════════════════════════════════════════════
   6. ACTIVATION
   ══════════════════════════════════════════════ */
function crades_dash_activate() {
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'crades_dash_activate' );

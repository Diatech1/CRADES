/**
 * CRADES Theme - Main JavaScript
 * Chart.js dashboard initialization and utilities
 *
 * @package CRADES
 * @version 1.0.0
 */

(function () {
    'use strict';

    /* =====================================================
       CONFIGURATION
       ===================================================== */
    var colors = (window.cradesData && window.cradesData.colors) || {
        primary: '#044bad',
        navy: '#032d6b',
        sky: '#3a7fd4',
        gold: '#b8943e'
    };

    var months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

    /* =====================================================
       CHART DEFAULTS
       ===================================================== */
    function getChartDefaults(color) {
        return {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#032d6b',
                        titleFont: { family: 'Montserrat', size: 11 },
                        bodyFont: { family: 'Montserrat', size: 11 },
                        padding: 8,
                        cornerRadius: 6
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: 'Montserrat', size: 9 },
                            color: '#9ca3af'
                        }
                    },
                    y: {
                        grid: { color: '#f3f4f6' },
                        ticks: {
                            font: { family: 'Montserrat', size: 9 },
                            color: '#9ca3af'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };
    }

    function makeDataset(label, data, color) {
        return {
            label: label,
            data: data,
            borderColor: color,
            backgroundColor: color + '15',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: color,
            fill: true,
            tension: 0.35
        };
    }

    /* =====================================================
       CHART DATA (placeholder — replace with real WP REST data)
       ===================================================== */
    var charts = [
        {
            id: 'chart-production',
            label: 'Production industrielle',
            data: [98, 102, 105, 108, 112, 115, 118, 121, 119, 123, 125, 127],
            color: colors.primary
        },
        {
            id: 'chart-commerce',
            label: 'Balance commerciale',
            data: [-85, -78, -92, -88, -95, -80, -75, -89, -82, -90, -88, -89],
            color: colors.gold
        },
        {
            id: 'chart-pme',
            label: 'Créations PME',
            data: [320, 380, 410, 350, 420, 460, 480, 510, 490, 530, 550, 580],
            color: colors.sky
        },
        {
            id: 'chart-prix',
            label: 'Indice des prix',
            data: [100, 101.2, 102.5, 103.1, 103.8, 104.2, 105.1, 105.8, 106.2, 106.9, 107.5, 108.1],
            color: colors.navy
        }
    ];

    /* =====================================================
       INITIALIZE CHARTS
       ===================================================== */
    function initCharts() {
        if (typeof Chart === 'undefined') return;

        charts.forEach(function (cfg) {
            var canvas = document.getElementById(cfg.id);
            if (!canvas) return;

            var ctx = canvas.getContext('2d');
            var defaults = getChartDefaults(cfg.color);

            new Chart(ctx, {
                type: defaults.type,
                data: {
                    labels: months,
                    datasets: [makeDataset(cfg.label, cfg.data, cfg.color)]
                },
                options: defaults.options
            });
        });
    }

    /* =====================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ===================================================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /* =====================================================
       HEADER SHADOW ON SCROLL
       ===================================================== */
    function initHeaderShadow() {
        var header = document.querySelector('.wp-block-group[style*="sticky"]');
        if (!header) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    /* =====================================================
       DOM READY
       ===================================================== */
    function onReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    onReady(function () {
        initCharts();
        initSmoothScroll();
        initHeaderShadow();
    });

})();

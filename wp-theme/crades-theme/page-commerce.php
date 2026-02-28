<?php
/**
 * Template: Commerce exterieur
 * Exact replica of Hono frontend /commerce-exterieur
 */
get_template_part( 'template-parts/header' );
?>

<!-- Hero header -->
<section class="bg-brand-navy py-14 lg:py-18">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="<?php echo esc_url( home_url('/') ); ?>" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Commerce exterieur</span>
    </nav>
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl lg:text-3xl text-white">Commerce exterieur du Senegal</h1>
        <p class="text-gray-400 mt-2 text-sm max-w-xl">
          Donnees d'importation et d'exportation issues de la base WITS (Banque Mondiale).
          Dernieres donnees disponibles : <span class="text-brand-gold font-medium">2022</span>.
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="fas fa-database"></i>
        <span>Source : WITS / Banque Mondiale</span>
      </div>
    </div>
  </div>
</section>

<!-- Key figures strip -->
<section class="bg-white border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-brand-frost rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-brand-blue">5,8 Mds</div>
        <div class="text-[11px] text-gray-500 mt-1">Exportations (M USD)</div>
        <div class="text-[10px] text-gray-400">2022</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-brand-navy">12,3 Mds</div>
        <div class="text-[11px] text-gray-500 mt-1">Importations (M USD)</div>
        <div class="text-[10px] text-gray-400">2022</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-red-600">-6,5 Mds</div>
        <div class="text-[11px] text-gray-500 mt-1">Balance commerciale (M USD)</div>
        <div class="text-[10px] text-red-400">&darr; Deficitaire</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-brand-gold">18,1 Mds</div>
        <div class="text-[11px] text-gray-500 mt-1">Volume commercial (M USD)</div>
        <div class="text-[10px] text-gray-400">Export + Import</div>
      </div>
    </div>
  </div>
</section>

<!-- Charts section -->
<section class="py-10 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">

    <!-- Row 1: Time series + Balance -->
    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Evolution du commerce (M USD)</h3>
          <span class="text-[10px] text-gray-400">2015-2022</span>
        </div>
        <div class="bg-gray-50 rounded-md p-3">
          <canvas id="chart-trade-evolution" height="200"></canvas>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Balance commerciale (M USD)</h3>
          <span class="text-[10px] text-gray-400">2015-2022</span>
        </div>
        <div class="bg-gray-50 rounded-md p-3">
          <canvas id="chart-trade-balance" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Row 2: Top partners -->
    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Top destinations d'exportation</h3>
          <span class="text-[10px] text-gray-400">2022</span>
        </div>
        <div class="bg-gray-50 rounded-md p-3">
          <canvas id="chart-export-partners" height="250"></canvas>
        </div>
      </div>

      <div class="bg-white border border-gray-100 rounded-lg p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Top fournisseurs (importations)</h3>
          <span class="text-[10px] text-gray-400">2022</span>
        </div>
        <div class="bg-gray-50 rounded-md p-3">
          <canvas id="chart-import-partners" height="250"></canvas>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Source info -->
<section class="bg-brand-frost border-t border-brand-ice/50 py-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs text-gray-500"><i class="fas fa-info-circle mr-1"></i> Source : <a href="https://wits.worldbank.org" target="_blank" class="text-brand-blue hover:underline">WITS</a> &mdash; World Integrated Trade Solution (Banque Mondiale)</p>
        <p class="text-[10px] text-gray-400 mt-1">Les valeurs sont en milliers de dollars US (USD). Donnees mises a jour annuellement.</p>
      </div>
      <div class="flex items-center gap-3">
        <a href="<?php echo esc_url( rest_url('wp/v2/indicateur') ); ?>" target="_blank" class="text-[10px] bg-white border border-gray-200 px-3 py-1.5 rounded hover:border-gray-300 text-gray-500 transition-colors">
          <i class="fas fa-code mr-1"></i> API JSON
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Chart.js -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  var gridColor = '#f1f5f9';
  var blue = '#044bad';
  var navy = '#032d6b';
  var red = '#dc2626';
  var green = '#059669';

  var years = ['2015','2016','2017','2018','2019','2020','2021','2022'];
  var exports = [2900, 3100, 3400, 3700, 4000, 3800, 4800, 5800];
  var imports = [6200, 6500, 7100, 7800, 8200, 7600, 9500, 12300];
  var balance = exports.map(function(e, i) { return e - imports[i]; });

  // Trade Evolution
  new Chart(document.getElementById('chart-trade-evolution'), {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        { label: 'Exportations', data: exports, borderColor: blue, backgroundColor: blue + '15', fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
        { label: 'Importations', data: imports, borderColor: navy, backgroundColor: navy + '10', fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } } },
      scales: {
        y: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  // Trade Balance
  new Chart(document.getElementById('chart-trade-balance'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Balance commerciale',
        data: balance,
        backgroundColor: balance.map(function(v) { return v >= 0 ? green + '80' : red + '80'; }),
        borderColor: balance.map(function(v) { return v >= 0 ? green : red; }),
        borderWidth: 1,
        borderRadius: 3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: gridColor }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  // Export partners
  var expPartners = ['Mali','Suisse','Inde','Cote d\'Ivoire','Guinee','Gambie','Chine','Espagne','France','Italie'];
  var expValues = [1200, 980, 650, 520, 410, 380, 350, 310, 280, 240];
  new Chart(document.getElementById('chart-export-partners'), {
    type: 'bar',
    data: {
      labels: expPartners,
      datasets: [{ label: 'Exportations (M USD)', data: expValues, backgroundColor: blue + '80', borderColor: blue, borderWidth: 1, borderRadius: 3 }]
    },
    options: {
      indexAxis: 'y', responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { font: { size: 10 } } },
        y: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  // Import partners
  var impPartners = ['France','Chine','Nigeria','Inde','Turquie','Pays-Bas','Espagne','Russie','Belgique','Etats-Unis'];
  var impValues = [1800, 1600, 1200, 900, 750, 680, 620, 580, 520, 480];
  new Chart(document.getElementById('chart-import-partners'), {
    type: 'bar',
    data: {
      labels: impPartners,
      datasets: [{ label: 'Importations (M USD)', data: impValues, backgroundColor: navy + '80', borderColor: navy, borderWidth: 1, borderRadius: 3 }]
    },
    options: {
      indexAxis: 'y', responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { font: { size: 10 } } },
        y: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
});
</script>

<?php get_template_part( 'template-parts/footer' ); ?>

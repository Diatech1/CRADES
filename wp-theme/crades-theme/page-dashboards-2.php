<?php
/**
 * Template Name: Statistiques economiques
 * Dashboards 2 — Commerce Ext, Commerce Int, Industrie, PME
 * Exact replica of Hono /tableaux-de-bord-2
 */
get_template_part( 'template-parts/header' );
?>

<?php crades_page_header(
    'Statistiques économiques',
    'Tableaux de bord sectoriels : commerce extérieur, commerce intérieur, industrie et PME.',
    [
        [ 'label' => 'Tableaux de bord', 'url' => home_url( '/tableaux-de-bord/' ) ],
        [ 'label' => 'Statistiques économiques' ],
    ]
); ?>

<!-- Tabs navigation -->
<section class="bg-white border-b border-gray-100 sticky top-[80px] z-40">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex overflow-x-auto gap-0 -mb-px" style="-ms-overflow-style:none;scrollbar-width:none;-webkit-overflow-scrolling:touch">
      <button onclick="switchDashTab('ext')" id="tab-ext" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-[#044bad] text-[#044bad]">
        <i class="fas fa-ship mr-1 sm:mr-1.5"></i>Commerce ext.<span class="hidden sm:inline">érieur</span>
      </button>
      <button onclick="switchDashTab('int')" id="tab-int" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-transparent text-gray-400 hover:text-gray-600">
        <i class="fas fa-store mr-1 sm:mr-1.5"></i>Commerce int.<span class="hidden sm:inline">érieur</span>
      </button>
      <button onclick="switchDashTab('ind')" id="tab-ind" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-transparent text-gray-400 hover:text-gray-600">
        <i class="fas fa-industry mr-1 sm:mr-1.5"></i>Industrie
      </button>
      <button onclick="switchDashTab('pme')" id="tab-pme" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-transparent text-gray-400 hover:text-gray-600">
        <i class="fas fa-building mr-1 sm:mr-1.5"></i>PME
      </button>
    </div>
  </div>
</section>

<!-- Panel content is identical to the Hono version — loaded via JS charts -->
<!-- Commerce Extérieur Panel -->
<div id="panel-ext" class="dash-panel">
  <section class="bg-white border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Exportations 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">5 935,2 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+51,8% vs 2024</div></div>
        <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-navy"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Importations 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">7 279,1 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+1,6% vs 2024</div></div>
        <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-red-400"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Balance commerciale</div><div class="text-base sm:text-xl font-bold text-red-600">-1 343,9 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div><div class="text-[9px] sm:text-[10px] text-[#b8943e] mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Amélioration</div></div>
        <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-[#b8943e]"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Échanges totaux 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">13 214,3 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+19,36% vs 2024</div></div>
      </div>
    </div>
  </section>
  <section class="py-6 sm:py-10 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Évolution du commerce ext. (Mds FCFA)</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-evolution" height="200"></canvas></div></div>
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Balance commerciale (Mds FCFA)</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-balance" height="200"></canvas></div></div>
      </div>
      <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Top 5 destinations d'exportation</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-export-dest" height="200"></canvas></div></div>
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Top 5 fournisseurs</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-import-src" height="200"></canvas></div></div>
      </div>
      <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Structure des exportations</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="ext-export-struct" height="220" style="max-width:320px"></canvas></div></div>
        <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Principaux produits</h3>
          <table class="w-full text-xs"><thead><tr class="text-gray-500 text-left"><th class="px-3 py-2">Produit</th><th class="px-3 py-2 text-right">Export</th><th class="px-3 py-2 text-right">Import</th></tr></thead><tbody>
            <tr class="border-t border-gray-50"><td class="px-3 py-2">Or non monétaire</td><td class="px-3 py-2 text-right text-emerald-600">206,8</td><td class="px-3 py-2 text-right text-gray-400">—</td></tr>
            <tr class="border-t border-gray-50"><td class="px-3 py-2">Huiles brutes pétrole</td><td class="px-3 py-2 text-right text-emerald-600">106,3</td><td class="px-3 py-2 text-right text-red-500">89,2</td></tr>
            <tr class="border-t border-gray-50"><td class="px-3 py-2">Prod. pétroliers raffinés</td><td class="px-3 py-2 text-right text-emerald-600">90,4</td><td class="px-3 py-2 text-right text-red-500">65,1</td></tr>
            <tr class="border-t border-gray-50"><td class="px-3 py-2">Acide phosphorique</td><td class="px-3 py-2 text-right text-emerald-600">45,2</td><td class="px-3 py-2 text-right text-gray-400">—</td></tr>
          </tbody></table>
        </div>
      </div>
    </div>
  </section>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4"><p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Source : ANSD — BMSCE Décembre 2025.</p></div>
</div>

<!-- Commerce Intérieur Panel -->
<div id="panel-int" class="dash-panel hidden">
  <section class="bg-white border-b border-gray-100"><div class="max-w-6xl mx-auto px-4 sm:px-6 py-6"><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Ventes au détail</div><div class="text-base sm:text-xl font-bold text-brand-navy">+8,3%</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">T3 2025</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IPC Général</div><div class="text-base sm:text-xl font-bold text-brand-navy">+3,2%</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Déc 2025</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-[#b8943e]"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Prix riz brisé</div><div class="text-base sm:text-xl font-bold text-brand-navy">350 FCFA/kg</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Stable</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-[#3a7fd4]"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Marchés surveillés</div><div class="text-base sm:text-xl font-bold text-brand-navy">42</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Couverture nationale</div></div>
  </div></div></section>
  <section class="py-6 sm:py-10 bg-gray-50"><div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Évolution IPC</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-ipc" height="200"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Ventes au détail — variation (%)</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-retail" height="200"></canvas></div></div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Marchés par région</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-markets" height="200"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Structure consommation ménages</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="int-consumption" height="220" style="max-width:320px"></canvas></div></div>
    </div>
  </div></section>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4"><p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : DCI, ANSD — 2025.</p></div>
</div>

<!-- Industrie Panel -->
<div id="panel-ind" class="dash-panel hidden">
  <section class="bg-white border-b border-gray-100"><div class="max-w-6xl mx-auto px-4 sm:px-6 py-6"><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IHPI Déc 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">+27,5%</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">Production industrielle</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IHPI cumul 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">+24,9%</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">Croissance annuelle</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-[#b8943e]"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">ICAI T3 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">+16,5%</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">Chiffre d'affaires</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-gray-300"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IPPI Jan 2026</div><div class="text-base sm:text-xl font-bold text-brand-navy">+0,6%</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Prix production</div></div>
  </div></div></section>
  <section class="py-6 sm:py-10 bg-gray-50"><div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">IHPI — variation mensuelle 2025</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-ihpi" height="200"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">ICAI trimestriel par sous-secteur</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-icai" height="200"></canvas></div></div>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Structure production</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="ind-structure" height="220" style="max-width:280px"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">IPPI évolution 2025</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-ippi" height="220"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5 sm:col-span-2 lg:col-span-1"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Taux utilisation capacités</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-capacity" height="220"></canvas></div></div>
    </div>
  </div></section>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4"><p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : ANSD — IHPI, ICAI, IPPI.</p></div>
</div>

<!-- PME Panel -->
<div id="panel-pme" class="dash-panel hidden">
  <section class="bg-white border-b border-gray-100"><div class="max-w-6xl mx-auto px-4 sm:px-6 py-6"><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Climat des affaires</div><div class="text-base sm:text-xl font-bold text-brand-navy">+1,8 pts</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">Oct 2025</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">PME ADEPME</div><div class="text-base sm:text-xl font-bold text-brand-navy">2 847</div><div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1">+18% vs 2024</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-[#b8943e]"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">FONGIP 2025</div><div class="text-base sm:text-xl font-bold text-brand-navy">45,3 Mds</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Engagements</div></div>
    <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-navy"><div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">PIB PME</div><div class="text-base sm:text-xl font-bold text-brand-navy">~42%</div><div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Contribution</div></div>
  </div></div></section>
  <section class="py-6 sm:py-10 bg-gray-50"><div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Climat des affaires</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-ica" height="200"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">PME par secteur</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="pme-sectors" height="220" style="max-width:320px"></canvas></div></div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Financement PME (Mds FCFA)</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-financing" height="200"></canvas></div></div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"><h3 class="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">Répartition par taille</h3><div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-size" height="200"></canvas></div></div>
    </div>
  </div></section>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4"><p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : ADEPME, FONGIP, DPEE — 2025.</p></div>
</div>

<!-- Chart.js & Tab Switching (same logic as Hono version) -->
<style>
@media(max-width:639px){
  .dash-panel canvas{max-height:180px}
  .dash-panel table th,.dash-panel table td{padding-left:8px;padding-right:8px;white-space:nowrap}
}
</style>
<script>
function switchDashTab(id) {
  document.querySelectorAll('.dash-panel').forEach(function(p){ p.classList.add('hidden'); });
  document.querySelectorAll('.dash-tab').forEach(function(t){
    t.classList.remove('border-[#044bad]','text-[#044bad]');
    t.classList.add('border-transparent','text-gray-400');
  });
  document.getElementById('panel-'+id).classList.remove('hidden');
  var tab = document.getElementById('tab-'+id);
  tab.classList.add('border-[#044bad]','text-[#044bad]');
  tab.classList.remove('border-transparent','text-gray-400');
  if(!window['_charts_'+id]){window['_charts_'+id]=true;initCharts(id);}
}
var blue='#044bad',navy='#032d6b',gold='#b8943e',sky='#3a7fd4',red='#dc2626',green='#059669';
var gridColor='#f1f5f9';
var baseOpts={responsive:true,plugins:{legend:{display:false}},scales:{y:{grid:{color:gridColor},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}};
var doughnutOpts={responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:10},boxWidth:12,padding:8}}}};
function initCharts(t){if(t==='ext')initExtCharts();else if(t==='int')initIntCharts();else if(t==='ind')initIndCharts();else if(t==='pme')initPmeCharts();}
function initExtCharts(){
  new Chart(document.getElementById('ext-evolution'),{type:'line',data:{labels:['2020','2021','2022','2023','2024','2025'],datasets:[{label:'Exportations',data:[1800,1950,2600,3100,3909,5935],borderColor:blue,backgroundColor:blue+'15',fill:true,tension:.3,pointRadius:3,borderWidth:2},{label:'Importations',data:[4200,4600,5100,6200,7161,7279],borderColor:navy,backgroundColor:navy+'10',fill:true,tension:.3,pointRadius:3,borderWidth:2}]},options:{responsive:true,plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12}}},scales:{y:{grid:{color:gridColor},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
  new Chart(document.getElementById('ext-balance'),{type:'bar',data:{labels:['2020','2021','2022','2023','2024','2025'],datasets:[{data:[-2400,-2650,-2500,-3100,-3252,-1344],backgroundColor:[-2400,-2650,-2500,-3100,-3252,-1344].map(function(v){return v>=-1500?gold+'80':red+'80'}),borderRadius:3}]},options:baseOpts});
  new Chart(document.getElementById('ext-export-dest'),{type:'bar',data:{labels:['Suisse','Belgique','Mali','Espagne','Royaume-Uni'],datasets:[{data:[210,145,132,98,87],backgroundColor:blue+'80',borderRadius:3}]},options:Object.assign({},baseOpts,{indexAxis:'y'})});
  new Chart(document.getElementById('ext-import-src'),{type:'bar',data:{labels:['Chine','France','Russie','Inde','Pays-Bas'],datasets:[{data:[142,98,87,76,54],backgroundColor:navy+'80',borderRadius:3}]},options:Object.assign({},baseOpts,{indexAxis:'y'})});
  new Chart(document.getElementById('ext-export-struct'),{type:'doughnut',data:{labels:['Or non monétaire','Huiles brutes','Prod. raffinés','Acide phosph.','Autres'],datasets:[{data:[206.8,106.3,90.4,45.2,376.6],backgroundColor:[gold,blue,navy,sky,green],borderWidth:0}]},options:doughnutOpts});
}
function initIntCharts(){
  new Chart(document.getElementById('int-ipc'),{type:'line',data:{labels:['T1-21','T2-21','T3-21','T4-21','T1-22','T2-22','T3-22','T4-22','T1-23','T2-23','T3-23','T4-23','T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25','T4-25'],datasets:[{data:[100,101.2,102.1,103.5,104.8,106.2,107.1,108.3,109.5,110.8,112.1,113.2,114.5,115.3,116.2,117.1,117.8,118.5,119.2,119.9],borderColor:blue,backgroundColor:blue+'15',fill:true,tension:.3,pointRadius:2,borderWidth:2}]},options:baseOpts});
  new Chart(document.getElementById('int-retail'),{type:'bar',data:{labels:['T1-21','T2-21','T3-21','T4-21','T1-22','T2-22','T3-22','T4-22','T1-23','T2-23','T3-23','T4-23','T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25'],datasets:[{data:[5.2,31.2,18.4,12.1,8.3,7.2,6.1,5.8,5.2,4.8,5.1,5.5,5.8,6.2,7.1,7.8,8.1,8.5,8.3],backgroundColor:blue+'60',borderRadius:2}]},options:baseOpts});
  new Chart(document.getElementById('int-markets'),{type:'bar',data:{labels:['Dakar','Thiès','Diourbel','Saint-Louis','Ziguinchor'],datasets:[{data:[12,7,5,4,3],backgroundColor:blue+'80',borderRadius:3}]},options:Object.assign({},baseOpts,{indexAxis:'y'})});
  new Chart(document.getElementById('int-consumption'),{type:'doughnut',data:{labels:['Alimentation','Transport','Logement','Santé','Habillement','Autres'],datasets:[{data:[52,12,11,8,7,10],backgroundColor:[blue,navy,gold,sky,green,'#7c3aed'],borderWidth:0}]},options:doughnutOpts});
}
function initIndCharts(){
  new Chart(document.getElementById('ind-ihpi'),{type:'bar',data:{labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],datasets:[{type:'line',label:'Indice',data:[112,115,118,120,122,121,123,125,126,128,130,132],borderColor:navy,pointRadius:2,borderWidth:2,yAxisID:'y1',tension:.3},{label:'Variation %',data:[18.2,20.1,21.5,22.3,23.1,22.8,23.0,24.2,24.5,25.1,26.3,27.5],backgroundColor:blue+'60',borderRadius:2,yAxisID:'y'}]},options:{responsive:true,plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12}}},scales:{y:{position:'left',grid:{color:gridColor},ticks:{font:{size:10}}},y1:{position:'right',grid:{display:false},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
  new Chart(document.getElementById('ind-icai'),{type:'bar',data:{labels:['T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25'],datasets:[{label:'Extractives',data:[32.1,28.5,35.2,42.1,45.8,48.2,42.1],backgroundColor:blue+'80',borderRadius:2},{label:'Manufacturier',data:[5.2,4.8,5.1,5.5,5.8,6.1,6.2],backgroundColor:gold+'80',borderRadius:2},{label:'Énergie',data:[8.1,7.8,9.2,10.1,11.2,12.1,11.8],backgroundColor:navy+'80',borderRadius:2}]},options:{responsive:true,plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12}}},scales:{y:{grid:{color:gridColor},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
  new Chart(document.getElementById('ind-structure'),{type:'doughnut',data:{labels:['Extractives','Manufacturières','Énergie & eau','BTP'],datasets:[{data:[35,38,18,9],backgroundColor:[blue,gold,navy,sky],borderWidth:0}]},options:doughnutOpts});
  new Chart(document.getElementById('ind-ippi'),{type:'line',data:{labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],datasets:[{data:[0.2,0.3,0.4,0.5,0.4,0.3,0.4,0.5,0.5,0.6,0.5,0.6],borderColor:gold,backgroundColor:gold+'15',fill:true,tension:.3,pointRadius:2,borderWidth:2}]},options:baseOpts});
  new Chart(document.getElementById('ind-capacity'),{type:'bar',data:{labels:['T1','T2','T3','T4'],datasets:[{data:[85.2,87.1,89.1,91.3],backgroundColor:[blue+'60',blue+'70',blue+'80',blue+'90'],borderRadius:3}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:75,max:100,grid:{color:gridColor},ticks:{font:{size:10},callback:function(v){return v+'%'}}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
}
function initPmeCharts(){
  new Chart(document.getElementById('pme-ica'),{type:'line',data:{labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct'],datasets:[{data:[98.2,98.8,99.1,99.5,100.2,100.8,101.2,101.5,101.8,102.0],borderColor:blue,backgroundColor:blue+'15',fill:true,tension:.3,pointRadius:3,borderWidth:2}]},options:baseOpts});
  new Chart(document.getElementById('pme-sectors'),{type:'doughnut',data:{labels:['Commerce','Services','Industrie','Agriculture','BTP'],datasets:[{data:[38,25,18,12,7],backgroundColor:[blue,navy,gold,sky,green],borderWidth:0}]},options:doughnutOpts});
  new Chart(document.getElementById('pme-financing'),{type:'bar',data:{labels:['2021','2022','2023','2024','2025'],datasets:[{label:'FONGIP',data:[28.1,31.5,35.2,40.8,45.3],backgroundColor:blue+'80',borderRadius:2},{label:'DER/FJ',data:[8.2,9.5,11.2,14.5,18.7],backgroundColor:gold+'80',borderRadius:2},{label:'Banques (x10)',data:[18,21,24.5,28,32],backgroundColor:navy+'60',borderRadius:2}]},options:{responsive:true,plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12}}},scales:{y:{grid:{color:gridColor},ticks:{font:{size:10}}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
  new Chart(document.getElementById('pme-size'),{type:'bar',data:{labels:['Micro','Petites','Moyennes','Grandes'],datasets:[{data:[68,22,8,2],backgroundColor:[blue+'80',navy+'80',gold+'80',sky+'80'],borderRadius:3}]},options:Object.assign({},baseOpts,{indexAxis:'y'})});
}
document.addEventListener('DOMContentLoaded',function(){window._charts_ext=true;initExtCharts();});
</script>

<?php get_template_part( 'template-parts/footer' ); ?>

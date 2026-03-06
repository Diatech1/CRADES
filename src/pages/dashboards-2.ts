import { layout } from '../components/layout'

export function dashboards2Page(): string {
  const content = `
<!-- Hero header -->
<section class="bg-brand-navy py-14 lg:py-18">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="/tableaux-de-bord" class="hover:text-white">Tableaux de bord</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Statistiques économiques</span>
    </nav>
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl lg:text-3xl text-white">Statistiques économiques</h1>
        <p class="text-gray-400 mt-2 text-sm max-w-xl">
          Tableaux de bord sectoriels : commerce extérieur, commerce intérieur, industrie et PME.
          Données issues de l'ANSD, DCI, DPEE, ADEPME et FONGIP.
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="fas fa-clock"></i>
        <span>Mis à jour : Février 2026</span>
      </div>
    </div>
  </div>
</section>

<!-- Tabs navigation -->
<section class="bg-white border-b border-gray-100 sticky top-[80px] z-40">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex overflow-x-auto gap-0 -mb-px scrollbar-hide">
      <button onclick="switchDashTab('ext')" id="tab-ext" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-brand-blue text-brand-blue">
        <i class="fas fa-ship mr-1 sm:mr-1.5"></i>Commerce ext.
        <span class="hidden sm:inline">érieur</span>
      </button>
      <button onclick="switchDashTab('int')" id="tab-int" class="dash-tab flex-shrink-0 px-3 sm:px-5 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap border-transparent text-gray-400 hover:text-gray-600">
        <i class="fas fa-store mr-1 sm:mr-1.5"></i>Commerce int.
        <span class="hidden sm:inline">érieur</span>
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

<!-- =============================================================== -->
<!--  TAB 1 — COMMERCE EXTÉRIEUR                                     -->
<!-- =============================================================== -->
<div id="panel-ext" class="dash-panel">

<!-- KPIs -->
<section class="bg-white border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Exportations 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">5 935,2 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+51,8% vs 2024</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-navy">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Importations 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">7 279,1 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+1,6% vs 2024</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-red-400">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Balance commerciale</div>
        <div class="text-base sm:text-xl font-bold text-red-600">-1 343,9 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div>
        <div class="text-[9px] sm:text-[10px] text-brand-gold mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Amélioration significative</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-gold">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Échanges totaux 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">13 214,3 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+19,36% vs 2024</div>
      </div>
    </div>
  </div>
</section>

<!-- Charts -->
<section class="py-6 sm:py-10 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Évolution du commerce ext. (Mds FCFA)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2020–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-evolution" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Balance commerciale (Mds FCFA)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2020–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-balance" height="200"></canvas></div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Top 5 destinations d'exportation</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">Déc 2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-export-dest" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Top 5 fournisseurs à l'importation</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">Déc 2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ext-import-src" height="200"></canvas></div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Structure des exportations (Déc 2025)</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="ext-export-struct" height="220" style="max-width:320px"></canvas></div>
      </div>
      <!-- Table -->
      <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
        <div class="bg-brand-frost px-4 py-3 border-b border-brand-ice/50">
          <h3 class="text-sm font-semibold text-gray-800"><i class="fas fa-table text-brand-blue mr-1"></i> Principaux produits</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead><tr class="bg-gray-50 text-gray-500 text-left"><th class="px-4 py-2 font-medium">Produit</th><th class="px-4 py-2 font-medium text-right">Export (Mds)</th><th class="px-4 py-2 font-medium text-right">Import (Mds)</th></tr></thead>
            <tbody>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Or non monétaire</td><td class="px-4 py-2 text-right text-emerald-600">206,8</td><td class="px-4 py-2 text-right text-gray-400">—</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Huiles brutes de pétrole</td><td class="px-4 py-2 text-right text-emerald-600">106,3</td><td class="px-4 py-2 text-right text-red-500">89,2</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Produits pétroliers raffinés</td><td class="px-4 py-2 text-right text-emerald-600">90,4</td><td class="px-4 py-2 text-right text-red-500">65,1</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Acide phosphorique</td><td class="px-4 py-2 text-right text-emerald-600">45,2</td><td class="px-4 py-2 text-right text-gray-400">—</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Riz</td><td class="px-4 py-2 text-right text-gray-400">—</td><td class="px-4 py-2 text-right text-red-500">142,5</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Machines & véhicules</td><td class="px-4 py-2 text-right text-gray-400">—</td><td class="px-4 py-2 text-right text-red-500">118,7</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
  <p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Source : <a href="https://www.ansd.sn" target="_blank" class="text-brand-blue hover:underline">ANSD</a> — Bulletin Mensuel du Commerce Extérieur (BMSCE), Décembre 2025, publié le 18 février 2026.</p>
</div>
</div>

<!-- =============================================================== -->
<!--  TAB 2 — COMMERCE INTÉRIEUR                                     -->
<!-- =============================================================== -->
<div id="panel-int" class="dash-panel hidden">

<section class="bg-white border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Ventes au détail (var. ann.)</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+8,3% <span class="text-[10px] sm:text-xs font-normal">T3 2025</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Tendance haussière</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IPC Général</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+3,2% <span class="text-[10px] sm:text-xs font-normal">Déc 2025</span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Inflation maîtrisée</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-gold">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Prix riz brisé</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">350 <span class="text-[10px] sm:text-xs font-normal">FCFA/kg</span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1"><i class="fas fa-minus mr-0.5"></i>Stable (gel import jan 2025)</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-sky">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Marchés surveillés</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">42 <span class="text-[10px] sm:text-xs font-normal">marchés</span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Couverture nationale</div>
      </div>
    </div>
  </div>
</section>

<section class="py-6 sm:py-10 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Évolution IPC (base 100 = T1 2021)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2021–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-ipc" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Ventes au détail — var. annuelle (%)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2021–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-retail" height="200"></canvas></div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Marchés surveillés par région</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="int-markets" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Structure consommation des ménages</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="int-consumption" height="220" style="max-width:320px"></canvas></div>
      </div>
    </div>
    <!-- Table -->
    <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
      <div class="bg-brand-frost px-4 py-3 border-b border-brand-ice/50">
        <h3 class="text-sm font-semibold text-gray-800"><i class="fas fa-table text-brand-blue mr-1"></i> Suivi des prix — produits de première nécessité</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="bg-gray-50 text-gray-500 text-left"><th class="px-4 py-2 font-medium">Produit</th><th class="px-4 py-2 font-medium text-right">Prix (FCFA/kg)</th><th class="px-4 py-2 font-medium text-right">Var. mensuelle</th><th class="px-4 py-2 font-medium text-right">Var. annuelle</th></tr></thead>
          <tbody>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Riz brisé ordinaire</td><td class="px-4 py-2 text-right">350</td><td class="px-4 py-2 text-right text-gray-400">0,0%</td><td class="px-4 py-2 text-right text-gray-400">-2,8%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Huile d'arachide</td><td class="px-4 py-2 text-right">1 250</td><td class="px-4 py-2 text-right text-red-500">+1,2%</td><td class="px-4 py-2 text-right text-red-500">+4,5%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Sucre en poudre</td><td class="px-4 py-2 text-right">600</td><td class="px-4 py-2 text-right text-gray-400">0,0%</td><td class="px-4 py-2 text-right text-emerald-600">-1,5%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Pain (baguette 190g)</td><td class="px-4 py-2 text-right">150</td><td class="px-4 py-2 text-right text-gray-400">0,0%</td><td class="px-4 py-2 text-right text-gray-400">0,0%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Mil</td><td class="px-4 py-2 text-right">280</td><td class="px-4 py-2 text-right text-emerald-600">-0,7%</td><td class="px-4 py-2 text-right text-emerald-600">-3,2%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
  <p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : <a href="https://industriecommerce.gouv.sn" target="_blank" class="text-brand-blue hover:underline">DCI / Ministère du Commerce</a>, <a href="https://www.ansd.sn" target="_blank" class="text-brand-blue hover:underline">ANSD</a> — 2025.</p>
</div>
</div>

<!-- =============================================================== -->
<!--  TAB 3 — INDUSTRIE                                               -->
<!-- =============================================================== -->
<div id="panel-ind" class="dash-panel hidden">

<section class="bg-white border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IHPI Déc 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+27,5% <span class="text-[10px] sm:text-xs font-normal">vs déc 2024</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Production industrielle</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IHPI cumul 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+24,9% <span class="text-[10px] sm:text-xs font-normal">vs 2024</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Croissance annuelle</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-gold">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">ICAI T3 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+16,5% <span class="text-[10px] sm:text-xs font-normal">vs T3 2024</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>Chiffre d'affaires</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-gray-300">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">IPPI Jan 2026</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+0,6% <span class="text-[10px] sm:text-xs font-normal"></span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1"><i class="fas fa-minus mr-0.5"></i>Prix à la production</div>
      </div>
    </div>
  </div>
</section>

<section class="py-6 sm:py-10 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">IHPI — variation mensuelle 2025 (%)</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-ihpi" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">ICAI trimestriel par sous-secteur (%)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2024–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="ind-icai" height="200"></canvas></div>
      </div>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Structure production</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-3 flex justify-center"><canvas id="ind-structure" height="220" style="max-width:280px"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">IPPI — évolution mensuelle 2025 (%)</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-3"><canvas id="ind-ippi" height="220"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-800">Taux d'utilisation capacités</h3>
          <span class="text-[10px] text-gray-400">2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-3"><canvas id="ind-capacity" height="220"></canvas></div>
      </div>
    </div>
    <!-- Table -->
    <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
      <div class="bg-brand-frost px-4 py-3 border-b border-brand-ice/50">
        <h3 class="text-sm font-semibold text-gray-800"><i class="fas fa-table text-brand-blue mr-1"></i> Sous-secteurs industriels</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead><tr class="bg-gray-50 text-gray-500 text-left"><th class="px-4 py-2 font-medium">Sous-secteur</th><th class="px-4 py-2 font-medium text-right">IHPI var.</th><th class="px-4 py-2 font-medium text-right">ICAI var.</th><th class="px-4 py-2 font-medium text-right">Part PIB</th></tr></thead>
          <tbody>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Industries extractives</td><td class="px-4 py-2 text-right text-emerald-600">+42,1%</td><td class="px-4 py-2 text-right text-emerald-600">+38,5%</td><td class="px-4 py-2 text-right">8,2%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Industries manufacturières</td><td class="px-4 py-2 text-right text-emerald-600">+6,2%</td><td class="px-4 py-2 text-right text-emerald-600">+5,8%</td><td class="px-4 py-2 text-right">12,5%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">Énergie & eau</td><td class="px-4 py-2 text-right text-emerald-600">+11,8%</td><td class="px-4 py-2 text-right text-emerald-600">+9,2%</td><td class="px-4 py-2 text-right">3,1%</td></tr>
            <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">BTP</td><td class="px-4 py-2 text-right text-emerald-600">+4,5%</td><td class="px-4 py-2 text-right text-emerald-600">+3,8%</td><td class="px-4 py-2 text-right">5,8%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
  <p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : <a href="https://www.ansd.sn/Indicateur/indice-harmonise-de-la-production-industrielle-ihpi" target="_blank" class="text-brand-blue hover:underline">ANSD — IHPI</a>, <a href="https://www.ansd.sn/Indicateur/indices-du-chiffre-daffaires-dans-lindustrie-icai" target="_blank" class="text-brand-blue hover:underline">ICAI T3 2025</a>, <a href="https://www.ansd.sn/Indicateur/indice-des-prix-la-production-industrielle-ippi" target="_blank" class="text-brand-blue hover:underline">IPPI Jan 2026</a>.</p>
</div>
</div>

<!-- =============================================================== -->
<!--  TAB 4 — PME                                                     -->
<!-- =============================================================== -->
<div id="panel-pme" class="dash-panel hidden">

<section class="bg-white border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Climat des affaires</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">+1,8 <span class="text-[10px] sm:text-xs font-normal">pts (oct 2025)</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>En amélioration</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-blue">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">PME accompagnées ADEPME</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">2 847 <span class="text-[10px] sm:text-xs font-normal">PME</span></div>
        <div class="text-[9px] sm:text-[10px] text-emerald-600 mt-1"><i class="fas fa-arrow-up mr-0.5"></i>+18% vs 2024</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-gold">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">Garanties FONGIP 2025</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">45,3 <span class="text-[10px] sm:text-xs font-normal">Mds FCFA</span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Engagements actifs</div>
      </div>
      <div class="bg-brand-frost rounded-lg p-3 sm:p-4 border-l-4 border-brand-navy">
        <div class="text-[10px] sm:text-[11px] text-gray-500 mb-1">PIB PME / PIB Total</div>
        <div class="text-base sm:text-xl font-bold text-brand-navy">~42% <span class="text-[10px] sm:text-xs font-normal"></span></div>
        <div class="text-[9px] sm:text-[10px] text-gray-400 mt-1">Contribution économique</div>
      </div>
    </div>
  </div>
</section>

<section class="py-6 sm:py-10 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Indicateur climat des affaires</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">Jan–Oct 2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-ica" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Répartition PME par secteur</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3 flex justify-center"><canvas id="pme-sectors" height="220" style="max-width:320px"></canvas></div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Accès au financement PME (Mds FCFA)</h3>
          <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0">2021–2025</span>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-financing" height="200"></canvas></div>
      </div>
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">Répartition par taille d'entreprise</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-size" height="200"></canvas></div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white border border-gray-100 rounded-lg p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800">PME formalisées par région (%)</h3>
        </div>
        <div class="bg-gray-50 rounded-md p-2 sm:p-3"><canvas id="pme-regions" height="200"></canvas></div>
      </div>
      <!-- Table -->
      <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
        <div class="bg-brand-frost px-4 py-3 border-b border-brand-ice/50">
          <h3 class="text-sm font-semibold text-gray-800"><i class="fas fa-table text-brand-blue mr-1"></i> Programmes d'appui PME actifs</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead><tr class="bg-gray-50 text-gray-500 text-left"><th class="px-4 py-2 font-medium">Programme</th><th class="px-4 py-2 font-medium text-right">Montant (Mds)</th><th class="px-4 py-2 font-medium">Type</th></tr></thead>
            <tbody>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">ADEPME</td><td class="px-4 py-2 text-right">12,5</td><td class="px-4 py-2 text-gray-500">Accompagnement</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">FONGIP</td><td class="px-4 py-2 text-right">45,3</td><td class="px-4 py-2 text-gray-500">Garantie</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">DER/FJ</td><td class="px-4 py-2 text-right">18,7</td><td class="px-4 py-2 text-gray-500">Financement</td></tr>
              <tr class="border-t border-gray-50 hover:bg-gray-50/50"><td class="px-4 py-2 font-medium text-gray-800">BNDE</td><td class="px-4 py-2 text-right">85,0</td><td class="px-4 py-2 text-gray-500">Crédit</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
  <p class="text-[10px] text-gray-400"><i class="fas fa-info-circle mr-1"></i>Sources : <a href="https://adepme.sn" target="_blank" class="text-brand-blue hover:underline">ADEPME</a>, <a href="https://fongip.com" target="_blank" class="text-brand-blue hover:underline">FONGIP</a>, <a href="https://dpee.sn" target="_blank" class="text-brand-blue hover:underline">DPEE</a> — Tableau de bord Octobre 2025.</p>
</div>
</div>

<!-- =============================================================== -->
<!--  CHART.JS + TAB SWITCHING SCRIPT                                 -->
<!-- =============================================================== -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
// ─── Tab switching ───
function switchDashTab(id) {
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.dash-tab').forEach(t => {
    t.classList.remove('border-brand-blue','text-brand-blue');
    t.classList.add('border-transparent','text-gray-400');
  });
  document.getElementById('panel-' + id).classList.remove('hidden');
  const tab = document.getElementById('tab-' + id);
  tab.classList.add('border-brand-blue','text-brand-blue');
  tab.classList.remove('border-transparent','text-gray-400');
  // Init charts on first view
  if (!window['_charts_' + id]) { window['_charts_' + id] = true; initCharts(id); }
}

const blue = '#044bad', navy = '#032d6b', gold = '#b8943e', sky = '#3a7fd4', red = '#dc2626', green = '#059669';
const gridColor = '#f1f5f9';
const baseOpts = { responsive:true, plugins:{ legend:{ display:false }}, scales:{ y:{ grid:{ color:gridColor }, ticks:{ font:{ size:10 }}}, x:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}};
const doughnutOpts = { responsive:true, plugins:{ legend:{ position:'bottom', labels:{ font:{ size:10 }, boxWidth:12, padding:8 }}}};

function initCharts(tab) {
  if (tab === 'ext') initExtCharts();
  else if (tab === 'int') initIntCharts();
  else if (tab === 'ind') initIndCharts();
  else if (tab === 'pme') initPmeCharts();
}

// ─── COMMERCE EXTÉRIEUR ───
function initExtCharts() {
  new Chart(document.getElementById('ext-evolution'), {
    type:'line', data:{ labels:['2020','2021','2022','2023','2024','2025'],
    datasets:[
      { label:'Exportations', data:[1800,1950,2600,3100,3909,5935], borderColor:blue, backgroundColor:blue+'15', fill:true, tension:.3, pointRadius:3, borderWidth:2 },
      { label:'Importations', data:[4200,4600,5100,6200,7161,7279], borderColor:navy, backgroundColor:navy+'10', fill:true, tension:.3, pointRadius:3, borderWidth:2 }
    ]}, options:{...baseOpts, plugins:{ legend:{ display:true, position:'bottom', labels:{ font:{ size:10 }, boxWidth:12 }}}}
  });
  new Chart(document.getElementById('ext-balance'), {
    type:'bar', data:{ labels:['2020','2021','2022','2023','2024','2025'],
    datasets:[{ label:'Balance', data:[-2400,-2650,-2500,-3100,-3252,-1344],
      backgroundColor:[-2400,-2650,-2500,-3100,-3252,-1344].map(v => v >= -1500 ? gold+'80' : red+'80'),
      borderColor:[-2400,-2650,-2500,-3100,-3252,-1344].map(v => v >= -1500 ? gold : red), borderWidth:1, borderRadius:3 }]
    }, options: baseOpts
  });
  new Chart(document.getElementById('ext-export-dest'), {
    type:'bar', data:{ labels:['Suisse','Belgique','Mali','Espagne','Royaume-Uni'],
    datasets:[{ data:[210,145,132,98,87], backgroundColor:blue+'80', borderColor:blue, borderWidth:1, borderRadius:3 }]
    }, options:{...baseOpts, indexAxis:'y'}
  });
  new Chart(document.getElementById('ext-import-src'), {
    type:'bar', data:{ labels:['Chine','France','Russie','Inde','Pays-Bas'],
    datasets:[{ data:[142,98,87,76,54], backgroundColor:navy+'80', borderColor:navy, borderWidth:1, borderRadius:3 }]
    }, options:{...baseOpts, indexAxis:'y'}
  });
  new Chart(document.getElementById('ext-export-struct'), {
    type:'doughnut', data:{
      labels:['Or non monétaire','Huiles brutes pétrole','Prod. pétroliers raffinés','Acide phosphorique','Autres'],
      datasets:[{ data:[206.8,106.3,90.4,45.2,376.6], backgroundColor:[gold,blue,navy,sky,green], borderWidth:0 }]
    }, options: doughnutOpts
  });
}

// ─── COMMERCE INTÉRIEUR ───
function initIntCharts() {
  new Chart(document.getElementById('int-ipc'), {
    type:'line', data:{
      labels:['T1-21','T2-21','T3-21','T4-21','T1-22','T2-22','T3-22','T4-22','T1-23','T2-23','T3-23','T4-23','T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25','T4-25'],
      datasets:[{ label:'IPC', data:[100,101.2,102.1,103.5,104.8,106.2,107.1,108.3,109.5,110.8,112.1,113.2,114.5,115.3,116.2,117.1,117.8,118.5,119.2,119.9], borderColor:blue, backgroundColor:blue+'15', fill:true, tension:.3, pointRadius:2, borderWidth:2 }]
    }, options: baseOpts
  });
  new Chart(document.getElementById('int-retail'), {
    type:'bar', data:{
      labels:['T1-21','T2-21','T3-21','T4-21','T1-22','T2-22','T3-22','T4-22','T1-23','T2-23','T3-23','T4-23','T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25'],
      datasets:[{ label:'Variation %', data:[5.2,31.2,18.4,12.1,8.3,7.2,6.1,5.8,5.2,4.8,5.1,5.5,5.8,6.2,7.1,7.8,8.1,8.5,8.3],
        backgroundColor:[5.2,31.2,18.4,12.1,8.3,7.2,6.1,5.8,5.2,4.8,5.1,5.5,5.8,6.2,7.1,7.8,8.1,8.5,8.3].map(v => v > 10 ? green+'80' : blue+'60'), borderRadius:2 }]
    }, options: baseOpts
  });
  new Chart(document.getElementById('int-markets'), {
    type:'bar', data:{
      labels:['Dakar','Thiès','Diourbel','Saint-Louis','Ziguinchor'],
      datasets:[{ data:[12,7,5,4,3], backgroundColor:blue+'80', borderColor:blue, borderWidth:1, borderRadius:3 }]
    }, options:{...baseOpts, indexAxis:'y'}
  });
  new Chart(document.getElementById('int-consumption'), {
    type:'doughnut', data:{
      labels:['Alimentation','Transport','Logement','Santé','Habillement','Autres'],
      datasets:[{ data:[52,12,11,8,7,10], backgroundColor:[blue,navy,gold,sky,green,'#7c3aed'], borderWidth:0 }]
    }, options: doughnutOpts
  });
}

// ─── INDUSTRIE ───
function initIndCharts() {
  new Chart(document.getElementById('ind-ihpi'), {
    type:'bar', data:{
      labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
      datasets:[
        { type:'line', label:'Indice IHPI', data:[112,115,118,120,122,121,123,125,126,128,130,132], borderColor:navy, pointRadius:2, borderWidth:2, yAxisID:'y1', tension:.3 },
        { label:'Variation %', data:[18.2,20.1,21.5,22.3,23.1,22.8,23.0,24.2,24.5,25.1,26.3,27.5], backgroundColor:blue+'60', borderRadius:2, yAxisID:'y' }
      ]
    }, options:{ responsive:true, plugins:{ legend:{ display:true, position:'bottom', labels:{ font:{ size:10 }, boxWidth:12 }}},
      scales:{ y:{ position:'left', grid:{ color:gridColor }, ticks:{ font:{ size:10 }}}, y1:{ position:'right', grid:{ display:false }, ticks:{ font:{ size:10 }}}, x:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}}
  });
  new Chart(document.getElementById('ind-icai'), {
    type:'bar', data:{
      labels:['T1-24','T2-24','T3-24','T4-24','T1-25','T2-25','T3-25'],
      datasets:[
        { label:'Extractives', data:[32.1,28.5,35.2,42.1,45.8,48.2,42.1], backgroundColor:blue+'80', borderRadius:2 },
        { label:'Manufacturier', data:[5.2,4.8,5.1,5.5,5.8,6.1,6.2], backgroundColor:gold+'80', borderRadius:2 },
        { label:'Énergie', data:[8.1,7.8,9.2,10.1,11.2,12.1,11.8], backgroundColor:navy+'80', borderRadius:2 }
      ]
    }, options:{ responsive:true, plugins:{ legend:{ display:true, position:'bottom', labels:{ font:{ size:10 }, boxWidth:12 }}}, scales:{ y:{ grid:{ color:gridColor }, ticks:{ font:{ size:10 }}}, x:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}}
  });
  new Chart(document.getElementById('ind-structure'), {
    type:'doughnut', data:{
      labels:['Extractives','Manufacturières','Énergie & eau','BTP'],
      datasets:[{ data:[35,38,18,9], backgroundColor:[blue,gold,navy,sky], borderWidth:0 }]
    }, options: doughnutOpts
  });
  new Chart(document.getElementById('ind-ippi'), {
    type:'line', data:{
      labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
      datasets:[{ label:'IPPI %', data:[0.2,0.3,0.4,0.5,0.4,0.3,0.4,0.5,0.5,0.6,0.5,0.6], borderColor:gold, backgroundColor:gold+'15', fill:true, tension:.3, pointRadius:2, borderWidth:2 }]
    }, options: baseOpts
  });
  new Chart(document.getElementById('ind-capacity'), {
    type:'bar', data:{
      labels:['T1','T2','T3','T4'],
      datasets:[{ label:'Utilisation %', data:[85.2,87.1,89.1,91.3], backgroundColor:[blue+'60',blue+'70',blue+'80',blue+'90'], borderRadius:3 }]
    }, options:{...baseOpts, scales:{ y:{ min:75, max:100, grid:{ color:gridColor }, ticks:{ font:{ size:10 }, callback: v => v+'%' }}, x:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}}
  });
}

// ─── PME ───
function initPmeCharts() {
  new Chart(document.getElementById('pme-ica'), {
    type:'line', data:{
      labels:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct'],
      datasets:[{ label:'ICA', data:[98.2,98.8,99.1,99.5,100.2,100.8,101.2,101.5,101.8,102.0], borderColor:blue, backgroundColor:blue+'15', fill:true, tension:.3, pointRadius:3, borderWidth:2 }]
    }, options: baseOpts
  });
  new Chart(document.getElementById('pme-sectors'), {
    type:'doughnut', data:{
      labels:['Commerce','Services','Industrie/Artisanat','Agriculture/Agro','BTP'],
      datasets:[{ data:[38,25,18,12,7], backgroundColor:[blue,navy,gold,sky,green], borderWidth:0 }]
    }, options: doughnutOpts
  });
  new Chart(document.getElementById('pme-financing'), {
    type:'bar', data:{
      labels:['2021','2022','2023','2024','2025'],
      datasets:[
        { label:'FONGIP', data:[28.1,31.5,35.2,40.8,45.3], backgroundColor:blue+'80', borderRadius:2 },
        { label:'DER/FJ', data:[8.2,9.5,11.2,14.5,18.7], backgroundColor:gold+'80', borderRadius:2 },
        { label:'Banques (x10)', data:[18,21,24.5,28,32], backgroundColor:navy+'60', borderRadius:2 }
      ]
    }, options:{ responsive:true, plugins:{ legend:{ display:true, position:'bottom', labels:{ font:{ size:10 }, boxWidth:12 }}}, scales:{ y:{ grid:{ color:gridColor }, ticks:{ font:{ size:10 }}}, x:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}}
  });
  new Chart(document.getElementById('pme-size'), {
    type:'bar', data:{
      labels:['Micro (< 5 empl.)','Petites (5-19)','Moyennes (20-99)','Grandes (100+)'],
      datasets:[{ data:[68,22,8,2], backgroundColor:[blue+'80',navy+'80',gold+'80',sky+'80'], borderRadius:3 }]
    }, options:{...baseOpts, indexAxis:'y', scales:{ x:{ grid:{ color:gridColor }, ticks:{ font:{ size:10 }, callback: v => v+'%' }}, y:{ grid:{ display:false }, ticks:{ font:{ size:10 }}}}}
  });
  new Chart(document.getElementById('pme-regions'), {
    type:'bar', data:{
      labels:['Dakar','Thiès','Kaolack','Saint-Louis','Ziguinchor'],
      datasets:[{ data:[58,12,7,5,4], backgroundColor:[blue+'80',navy+'80',gold+'80',sky+'80',green+'80'], borderRadius:3 }]
    }, options: baseOpts
  });
}

// Init first tab charts
document.addEventListener('DOMContentLoaded', () => { window._charts_ext = true; initExtCharts(); });
</script>
<style>
.scrollbar-hide::-webkit-scrollbar{display:none}
.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
@media(max-width:639px){
  .dash-panel canvas{max-height:180px}
  .dash-panel table th,.dash-panel table td{padding-left:8px;padding-right:8px;white-space:nowrap}
}
</style>
`

  return layout(content, {
    title: 'Statistiques économiques',
    description: 'Tableaux de bord sectoriels CRADES : commerce extérieur, commerce intérieur, industrie et PME',
    path: '/tableaux-de-bord-2',
  })
}

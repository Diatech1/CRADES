import { getWpAdminUrl, getWpUrl } from '../utils/wp-api'

/** Admin page — instructions, quick links, and inline seeder */
export function adminRedirectPage(): string {
  const wpAdmin = getWpAdminUrl()
  const wpUrl = getWpUrl()

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRADES - Administration</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = { theme: { extend: { 
      colors: { brand: { navy: '#032d6b', blue: '#044bad', sky: '#3a7fd4', gold: '#b8943e', frost: '#eef4fb', ice: '#c7ddf5' } }, 
      fontFamily: { sans: ['Montserrat', 'system-ui', 'sans-serif'] } 
    } } }
  </script>
</head>
<body class="bg-gray-50 font-sans">

<!-- Header -->
<div class="bg-white border-b border-gray-100">
  <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2 text-brand-navy font-bold">
      <i class="fas fa-chart-bar text-brand-blue"></i> CRADES
    </a>
    <div class="flex items-center gap-3">
      <a href="/" class="text-xs text-gray-400 hover:text-gray-600"><i class="fas fa-arrow-left mr-1"></i>Retour au site</a>
      <a href="${wpAdmin}" target="_blank" class="text-xs font-medium bg-brand-blue text-white px-3 py-1.5 rounded-lg hover:bg-brand-navy transition-colors">
        <i class="fab fa-wordpress mr-1"></i>WordPress Admin
      </a>
    </div>
  </div>
</div>

<div class="max-w-5xl mx-auto px-4 py-8">

  <!-- Tabs -->
  <div class="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
    <button onclick="showTab('overview')" class="tab-btn active px-4 py-2 rounded-md text-sm font-medium transition-colors" data-tab="overview">Vue d'ensemble</button>
    <button onclick="showTab('add')" class="tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors" data-tab="add">Ajouter du contenu</button>
    <button onclick="showTab('guide')" class="tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors" data-tab="guide">Guide</button>
  </div>

  <!-- ============ TAB: OVERVIEW ============ -->
  <div id="tab-overview" class="tab-content">
    
    <!-- Stats -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-xl p-5 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-400">Indicateurs</span>
          <div class="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center"><i class="fas fa-chart-line text-blue-500 text-xs"></i></div>
        </div>
        <div id="stat-indicators" class="text-2xl font-bold text-gray-800">-</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-400">Dashboards</span>
          <div class="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center"><i class="fas fa-tachometer-alt text-amber-500 text-xs"></i></div>
        </div>
        <div id="stat-dashboards" class="text-2xl font-bold text-gray-800">-</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-400">Publications</span>
          <div class="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center"><i class="fas fa-book text-green-500 text-xs"></i></div>
        </div>
        <div id="stat-publications" class="text-2xl font-bold text-gray-800">-</div>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-400">Actualites</span>
          <div class="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center"><i class="fas fa-newspaper text-purple-500 text-xs"></i></div>
        </div>
        <div id="stat-actualites" class="text-2xl font-bold text-gray-800">-</div>
      </div>
    </div>

    <!-- Quick Links to WordPress -->
    <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Gestion du contenu dans WordPress</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      ${[
        { icon: 'fa-chart-line', label: 'Indicateurs', desc: 'PIB, exports, PME...', url: `${wpAdmin}edit.php?post_type=indicateur`, color: 'blue' },
        { icon: 'fa-tachometer-alt', label: 'Tableaux de bord', desc: 'Graphiques et données', url: `${wpAdmin}edit.php?post_type=dashboard`, color: 'amber' },
        { icon: 'fa-book', label: 'Publications', desc: 'Rapports, études, notes', url: `${wpAdmin}edit.php?post_type=publication`, color: 'green' },
        { icon: 'fa-newspaper', label: 'Actualites', desc: 'Articles et communiques', url: `${wpAdmin}edit.php`, color: 'purple' },
        { icon: 'fa-database', label: 'Jeux de donnees', desc: 'Datasets ouverts', url: `${wpAdmin}edit.php?post_type=dataset`, color: 'teal' },
        { icon: 'fa-image', label: 'Medias', desc: 'Images et fichiers', url: `${wpAdmin}upload.php`, color: 'pink' },
      ].map(link => `
        <a href="${link.url}" target="_blank" class="bg-white rounded-lg border border-gray-100 p-4 hover:border-brand-blue/30 hover:shadow-sm transition-all group">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-${link.color}-50 rounded-lg flex items-center justify-center">
              <i class="fas ${link.icon} text-${link.color}-500 text-sm"></i>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-700 group-hover:text-brand-blue">${link.label}</div>
              <div class="text-[11px] text-gray-400">${link.desc}</div>
            </div>
            <i class="fas fa-external-link-alt text-[10px] text-gray-300 ml-auto"></i>
          </div>
        </a>
      `).join('')}
    </div>

    <!-- Architecture Info -->
    <div class="bg-brand-frost rounded-xl p-6 border border-brand-ice/50">
      <h3 class="text-sm font-semibold text-brand-navy mb-3"><i class="fas fa-sitemap mr-1.5"></i>Architecture Headless</h3>
      <div class="grid md:grid-cols-3 gap-4 text-xs">
        <div class="bg-white/70 rounded-lg p-3">
          <div class="font-semibold text-brand-navy mb-1"><i class="fab fa-wordpress mr-1"></i>WordPress CMS</div>
          <div class="text-gray-500">Edition du contenu via Gutenberg ou Elementor. Tous les types de contenu (CPT) sont editables.</div>
          <a href="${wpAdmin}" target="_blank" class="text-brand-blue hover:underline mt-1 inline-block">Ouvrir WordPress &rarr;</a>
        </div>
        <div class="bg-white/70 rounded-lg p-3">
          <div class="font-semibold text-brand-navy mb-1"><i class="fas fa-bolt mr-1"></i>API REST</div>
          <div class="text-gray-500">Les donnees transitent via l'API REST de WordPress avec cache de 60 secondes cote edge.</div>
          <a href="${wpUrl}/wp-json/wp/v2/" target="_blank" class="text-brand-blue hover:underline mt-1 inline-block">Voir l'API &rarr;</a>
        </div>
        <div class="bg-white/70 rounded-lg p-3">
          <div class="font-semibold text-brand-navy mb-1"><i class="fas fa-globe mr-1"></i>Front-end Edge</div>
          <div class="text-gray-500">Hono + Cloudflare Pages. Rendu SSR, cache CDN global, temps de chargement ultra-rapide.</div>
          <a href="/" class="text-brand-blue hover:underline mt-1 inline-block">Voir le site &rarr;</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ============ TAB: ADD CONTENT ============ -->
  <div id="tab-add" class="tab-content hidden">
    
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm">
      <p class="text-amber-800"><i class="fas fa-info-circle mr-1.5"></i>
        <strong>Authentification requise.</strong> Entrez vos identifiants WordPress pour ajouter du contenu directement depuis cette page.
        Ou <a href="${wpAdmin}" target="_blank" class="text-brand-blue underline">ouvrez WordPress</a> pour utiliser l'editeur Gutenberg.
      </p>
    </div>

    <!-- Auth Form -->
    <div id="auth-form" class="bg-white rounded-xl border border-gray-100 p-6 mb-6">
      <h3 class="text-sm font-semibold text-gray-800 mb-4"><i class="fas fa-key mr-1.5"></i>Connexion WordPress</h3>
      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Nom d'utilisateur</label>
          <input id="wp-user" type="text" value="alfarukh" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="admin">
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Mot de passe d'application</label>
          <input id="wp-pass" type="password" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="xxxx xxxx xxxx xxxx">
          <p class="text-[10px] text-gray-400 mt-1">
            <a href="${wpAdmin}profile.php" target="_blank" class="text-brand-blue hover:underline">Creer un mot de passe d'application</a> dans votre profil WordPress
          </p>
        </div>
      </div>
      <button onclick="testAuth()" class="text-xs font-medium bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-navy transition-colors">
        <i class="fas fa-plug mr-1"></i>Tester la connexion
      </button>
      <span id="auth-status" class="text-xs ml-3"></span>
    </div>

    <!-- Seed All Button -->
    <div id="seed-section" class="hidden">
      <div class="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 class="text-sm font-semibold text-gray-800 mb-2"><i class="fas fa-magic mr-1.5"></i>Peupler le contenu de demonstration</h3>
        <p class="text-xs text-gray-500 mb-4">Ajoute automatiquement 8 indicateurs, 4 dashboards, 5 publications, 5 actualites et 4 datasets dans WordPress.</p>
        <button onclick="seedAll()" id="seed-btn" class="text-sm font-medium bg-brand-gold text-white px-5 py-2.5 rounded-lg hover:bg-brand-gold/80 transition-colors">
          <i class="fas fa-seedling mr-1.5"></i>Peupler tout le contenu
        </button>
        <div id="seed-log" class="mt-4 hidden bg-gray-50 rounded-lg p-4 text-xs font-mono max-h-60 overflow-y-auto"></div>
      </div>

      <!-- Add Individual Items -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Add Indicator -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-sm font-semibold text-gray-800 mb-4"><i class="fas fa-chart-line mr-1.5 text-blue-500"></i>Ajouter un indicateur</h3>
          <form id="indicator-form" class="space-y-3">
            <input name="title" required placeholder="Nom (ex: PIB Industriel)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <div class="grid grid-cols-2 gap-3">
              <input name="value" required placeholder="Valeur (ex: 2 847)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <input name="unit" placeholder="Unite (ex: Mds FCFA)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            </div>
            <div class="grid grid-cols-3 gap-3">
              <input name="change" type="number" step="0.1" placeholder="Variation %" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <select name="direction" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="up">↑ Hausse</option>
                <option value="down">↓ Baisse</option>
              </select>
              <input name="period" placeholder="Periode (ex: T3 2025)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            </div>
            <button type="submit" class="w-full text-xs font-medium bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-1"></i>Ajouter l'indicateur
            </button>
          </form>
          <div id="indicator-msg" class="mt-2 text-xs"></div>
        </div>

        <!-- Add Dashboard -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h3 class="text-sm font-semibold text-gray-800 mb-4"><i class="fas fa-tachometer-alt mr-1.5 text-amber-500"></i>Ajouter un dashboard</h3>
          <form id="dashboard-form" class="space-y-3">
            <input name="title" required placeholder="Titre (ex: Production Industrielle)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <textarea name="description" rows="2" placeholder="Description" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"></textarea>
            <div class="grid grid-cols-2 gap-3">
              <select name="chartType" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="line">Courbe (line)</option>
                <option value="bar">Barres (bar)</option>
              </select>
              <input name="color" type="color" value="#044bad" class="w-full h-10 border border-gray-200 rounded-lg">
            </div>
            <textarea name="data" rows="2" placeholder="Donnees separees par virgule (ex: 98,102,105,108,112)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"></textarea>
            <button type="submit" class="w-full text-xs font-medium bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
              <i class="fas fa-plus mr-1"></i>Ajouter le dashboard
            </button>
          </form>
          <div id="dashboard-msg" class="mt-2 text-xs"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============ TAB: GUIDE ============ -->
  <div id="tab-guide" class="tab-content hidden">
    <div class="max-w-3xl space-y-8">
      
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-brand-navy mb-4">Comment ajouter des indicateurs</h3>
        <ol class="space-y-4 text-sm text-gray-600">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-blue text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
            <div>
              <strong class="text-gray-800">Ouvrez WordPress Admin</strong><br>
              <a href="${wpAdmin}edit.php?post_type=indicateur" target="_blank" class="text-brand-blue hover:underline">Indicateurs &rarr;</a>
              puis cliquez "Ajouter".
            </div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-blue text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
            <div>
              <strong class="text-gray-800">Remplissez les champs</strong><br>
              <code class="text-xs bg-gray-100 px-1 rounded">Titre</code> = nom de l'indicateur,
              puis dans les <strong>champs personnalises</strong> en bas de page :
              <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_value</code> → valeur (ex: "2 847")</div>
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_unit</code> → unite (ex: "Mds FCFA")</div>
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_change_percent</code> → variation %</div>
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_change_direction</code> → "up" ou "down"</div>
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_period</code> → periode (ex: "T3 2025")</div>
                <div class="bg-gray-50 p-2 rounded"><code>indicateur_display_order</code> → ordre d'affichage</div>
              </div>
            </div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-blue text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
            <div>
              <strong class="text-gray-800">Publiez</strong><br>
              Cliquez "Publier". L'indicateur apparait sur le site dans les 60 secondes (cache).
            </div>
          </li>
        </ol>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-brand-navy mb-4">Comment ajouter des dashboards</h3>
        <ol class="space-y-4 text-sm text-gray-600">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-gold text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
            <div>
              <strong class="text-gray-800">Ouvrez WordPress Admin</strong><br>
              <a href="${wpAdmin}edit.php?post_type=dashboard" target="_blank" class="text-brand-blue hover:underline">Dashboards &rarr;</a>
              puis cliquez "Ajouter".
            </div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-gold text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
            <div>
              <strong class="text-gray-800">Remplissez les champs</strong><br>
              <code class="text-xs bg-gray-100 px-1 rounded">Titre</code> = nom du dashboard,
              <code class="text-xs bg-gray-100 px-1 rounded">Contenu</code> = description.
              <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div class="bg-gray-50 p-2 rounded"><code>dashboard_chart_data</code> → JSON des donnees du graphique</div>
                <div class="bg-gray-50 p-2 rounded"><code>dashboard_chart_color</code> → couleur hex (ex: "#044bad")</div>
                <div class="bg-gray-50 p-2 rounded"><code>dashboard_display_order</code> → ordre d'affichage</div>
              </div>
              <div class="mt-2 bg-gray-50 p-2 rounded text-xs">
                <strong>Format JSON pour chart_data :</strong>
                <pre class="mt-1 text-[11px]">{"type":"line","labels":["Jan","Fev","Mar"],"data":[98,102,105],"label":"Mon indicateur"}</pre>
              </div>
            </div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-brand-gold text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
            <div>
              <strong class="text-gray-800">Publiez</strong><br>
              Le dashboard avec son graphique apparaitra sur la page Tableaux de bord.
            </div>
          </li>
        </ol>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-brand-navy mb-4">Methode rapide : Script de peuplement</h3>
        <p class="text-sm text-gray-600 mb-3">Pour ajouter rapidement tout le contenu de demonstration, utilisez le script en ligne de commande :</p>
        <div class="bg-gray-900 text-green-400 rounded-lg p-4 text-sm font-mono">
          <div class="text-gray-500"># 1. Generer un mot de passe d'application dans WordPress</div>
          <div class="text-gray-500">#    ${wpAdmin}profile.php → "Application Passwords"</div>
          <div class="mt-2">node seed-wp.mjs alfarukh "xxxx xxxx xxxx xxxx"</div>
        </div>
        <p class="text-xs text-gray-400 mt-2">Ce script ajoute 8 indicateurs, 4 dashboards, 5 publications, 5 actualites et 4 datasets.</p>
      </div>
    </div>
  </div>

</div>

<script>
const WP_URL = '${wpUrl}';
const API = WP_URL + '/wp-json/wp/v2';
let AUTH = '';

// ---- Tabs ----
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById('tab-' + name).classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('bg-white', btn.dataset.tab === name);
    btn.classList.toggle('shadow-sm', btn.dataset.tab === name);
    btn.classList.toggle('text-gray-800', btn.dataset.tab === name);
    btn.classList.toggle('text-gray-500', btn.dataset.tab !== name);
  });
}

// ---- Stats ----
async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const d = await res.json();
    document.getElementById('stat-publications').textContent = d.publications || 0;
    document.getElementById('stat-actualites').textContent = d.actualites || 0;
    // Fetch indicator and dashboard counts
    const [indRes, dashRes, dsRes] = await Promise.all([
      fetch(API + '/indicateur?per_page=1'),
      fetch(API + '/dashboard?per_page=1'),
      fetch(API + '/dataset?per_page=1'),
    ]);
    document.getElementById('stat-indicators').textContent = indRes.headers.get('X-WP-Total') || 0;
    document.getElementById('stat-dashboards').textContent = dashRes.headers.get('X-WP-Total') || 0;
  } catch(e) { console.error(e); }
}
loadStats();

// ---- Auth ----
async function testAuth() {
  const user = document.getElementById('wp-user').value;
  const pass = document.getElementById('wp-pass').value;
  const status = document.getElementById('auth-status');
  
  if (!user || !pass) { status.innerHTML = '<span class="text-red-500">Remplissez les deux champs</span>'; return; }
  
  AUTH = 'Basic ' + btoa(user + ':' + pass);
  status.innerHTML = '<i class="fas fa-spinner fa-spin text-gray-400"></i>';
  
  try {
    const res = await fetch(API + '/users/me', { headers: { 'Authorization': AUTH } });
    if (res.ok) {
      const u = await res.json();
      status.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Connecte: ' + u.name + '</span>';
      document.getElementById('seed-section').classList.remove('hidden');
    } else {
      AUTH = '';
      status.innerHTML = '<span class="text-red-500"><i class="fas fa-times-circle mr-1"></i>Echec (' + res.status + ')</span>';
    }
  } catch(e) {
    AUTH = '';
    status.innerHTML = '<span class="text-red-500"><i class="fas fa-times-circle mr-1"></i>' + e.message + '</span>';
  }
}

// ---- Seed All ----
async function seedAll() {
  if (!AUTH) { alert('Connectez-vous d\\'abord'); return; }
  const btn = document.getElementById('seed-btn');
  const log = document.getElementById('seed-log');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>En cours...';
  log.classList.remove('hidden');
  log.innerHTML = '';
  
  function addLog(msg) { log.innerHTML += msg + '\\n'; log.scrollTop = log.scrollHeight; }
  
  const months = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
  
  // Indicateurs
  const indicators = [
    { t: 'PIB Industriel', v: '2 847', u: 'Mds FCFA', c: 4.7, d: 'up', p: 'T3 2025' },
    { t: 'Exportations', v: '1 523', u: 'Mds FCFA', c: 8.2, d: 'up', p: 'T3 2025' },
    { t: 'PME Enregistrees', v: '47 832', u: '', c: 12.3, d: 'up', p: '2025' },
    { t: 'Indice Production', v: '127.4', u: 'pts', c: 3.1, d: 'up', p: 'Oct 2025' },
    { t: 'Balance Commerciale', v: '-892', u: 'Mds FCFA', c: -2.1, d: 'down', p: 'T3 2025' },
    { t: 'Emplois Industrie', v: '234 500', u: '', c: 5.6, d: 'up', p: '2025' },
    { t: 'IDE Recus', v: '485', u: 'Mds FCFA', c: 15.2, d: 'up', p: '2025' },
    { t: 'Utilisation Capacite', v: '68.3', u: '%', c: 1.8, d: 'up', p: 'T3 2025' },
  ];
  
  addLog('📊 Ajout des indicateurs...');
  for (let i = 0; i < indicators.length; i++) {
    const ind = indicators[i];
    try {
      const res = await fetch(API + '/indicateur', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
        body: JSON.stringify({ title: ind.t, status: 'publish', meta: { indicateur_value: ind.v, indicateur_unit: ind.u, indicateur_change_percent: ind.c, indicateur_change_direction: ind.d, indicateur_period: ind.p, indicateur_display_order: i+1 } })
      });
      addLog(res.ok ? '  ✅ ' + ind.t : '  ❌ ' + ind.t + ' (' + res.status + ')');
    } catch(e) { addLog('  ❌ ' + ind.t + ': ' + e.message); }
  }
  
  // Dashboards
  const dashes = [
    { t: 'Production Industrielle', data: [98,102,105,108,112,115,118,121,119,123,125,127], color: '#044bad', type: 'line' },
    { t: 'Balance Commerciale', data: [-85,-78,-92,-88,-95,-80,-75,-89,-82,-90,-88,-89], color: '#b8943e', type: 'bar' },
    { t: 'Creations PME', data: [320,380,410,350,420,460,480,510,490,530,550,580], color: '#3a7fd4', type: 'line' },
    { t: 'Indice des Prix (IPP)', data: [100,101.2,102.5,103.1,103.8,104.2,105.1,105.8,106.2,106.9,107.5,108.1], color: '#032d6b', type: 'line' },
  ];
  
  addLog('\\n📈 Ajout des dashboards...');
  for (let i = 0; i < dashes.length; i++) {
    const d = dashes[i];
    try {
      const chartData = JSON.stringify({ type: d.type, labels: months, data: d.data, label: d.t });
      const res = await fetch(API + '/dashboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
        body: JSON.stringify({ title: d.t, status: 'publish', meta: { dashboard_chart_data: chartData, dashboard_chart_color: d.color, dashboard_display_order: i+1 } })
      });
      addLog(res.ok ? '  ✅ ' + d.t : '  ❌ ' + d.t + ' (' + res.status + ')');
    } catch(e) { addLog('  ❌ ' + d.t + ': ' + e.message); }
  }
  
  // Publications
  addLog('\\n📚 Ajout des publications...');
  const pubs = [
    { t: 'Rapport Annuel sur l\\'Industrie 2025', e: 'Analyse du tissu industriel senegalais.' },
    { t: 'Note de Conjoncture T3 2025', e: 'Synthese trimestrielle des indicateurs.' },
    { t: 'Etude PME et Commerce Digital', e: 'Cartographie du commerce digital au Senegal.' },
    { t: 'Statistiques Commerce Exterieur 2025', e: 'Importations et exportations detaillees.' },
    { t: 'Indice Production Industrielle Oct 2025', e: 'Publication mensuelle de l\\'IPI.' },
  ];
  for (const p of pubs) {
    try {
      const res = await fetch(API + '/publication', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
        body: JSON.stringify({ title: p.t, excerpt: p.e, content: '<p>' + p.e + '</p>', status: 'publish' })
      });
      addLog(res.ok ? '  ✅ ' + p.t : '  ❌ ' + p.t + ' (' + res.status + ')');
    } catch(e) { addLog('  ❌ ' + p.t + ': ' + e.message); }
  }
  
  // Actualites
  addLog('\\n📰 Ajout des actualites...');
  const news = [
    { t: 'Le CRADES lance son portail Open Data', e: 'Le Centre met a disposition des jeux de donnees ouverts.' },
    { t: 'Seminaire sur la transformation industrielle', e: 'Seminaire international organise par le CRADES.' },
    { t: 'Partenariat CRADES-Banque Mondiale', e: 'Accord de cooperation technique signe.' },
    { t: 'Publication du rapport annuel 2025', e: 'Le rapport annuel est desormais disponible.' },
  ];
  for (const n of news) {
    try {
      const res = await fetch(API + '/posts', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
        body: JSON.stringify({ title: n.t, excerpt: n.e, content: '<p>' + n.e + '</p>', status: 'publish' })
      });
      addLog(res.ok ? '  ✅ ' + n.t : '  ❌ ' + n.t + ' (' + res.status + ')');
    } catch(e) { addLog('  ❌ ' + n.t + ': ' + e.message); }
  }
  
  // Datasets
  addLog('\\n💾 Ajout des datasets...');
  const dsets = [
    { t: 'Production Industrielle Mensuelle 2025', e: 'Donnees mensuelles. CSV, 2.4 MB.' },
    { t: 'Commerce Exterieur par Produit 2025', e: 'Import/export par code SH6. CSV, 15.7 MB.' },
    { t: 'Repertoire Entreprises Industrielles 2024', e: 'Entreprises actives. XLSX, 8.3 MB.' },
    { t: 'Indices Prix Production 2020-2025', e: 'Series chronologiques. CSV, 1.1 MB.' },
  ];
  for (const ds of dsets) {
    try {
      const res = await fetch(API + '/dataset', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
        body: JSON.stringify({ title: ds.t, excerpt: ds.e, content: '<p>' + ds.e + '</p>', status: 'publish' })
      });
      addLog(res.ok ? '  ✅ ' + ds.t : '  ❌ ' + ds.t + ' (' + res.status + ')');
    } catch(e) { addLog('  ❌ ' + ds.t + ': ' + e.message); }
  }
  
  addLog('\\n✅ Peuplement termine !');
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-seedling mr-1.5"></i>Peupler tout le contenu';
  loadStats();
}

// ---- Add Individual Indicator ----
document.getElementById('indicator-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!AUTH) { alert('Connectez-vous d\\'abord'); return; }
  const f = new FormData(e.target);
  const msg = document.getElementById('indicator-msg');
  try {
    const res = await fetch(API + '/indicateur', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
      body: JSON.stringify({
        title: f.get('title'), status: 'publish',
        meta: {
          indicateur_value: f.get('value'), indicateur_unit: f.get('unit') || '',
          indicateur_change_percent: parseFloat(f.get('change')) || 0,
          indicateur_change_direction: f.get('direction'), indicateur_period: f.get('period') || '',
        }
      })
    });
    if (res.ok) {
      msg.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Indicateur ajoute !</span>';
      e.target.reset(); loadStats();
    } else {
      msg.innerHTML = '<span class="text-red-500">Erreur ' + res.status + '</span>';
    }
  } catch(err) { msg.innerHTML = '<span class="text-red-500">' + err.message + '</span>'; }
});

// ---- Add Individual Dashboard ----
document.getElementById('dashboard-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!AUTH) { alert('Connectez-vous d\\'abord'); return; }
  const f = new FormData(e.target);
  const msg = document.getElementById('dashboard-msg');
  const months = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
  const dataStr = f.get('data') || '';
  const dataArr = dataStr.split(',').map(Number).filter(n => !isNaN(n));
  const labels = months.slice(0, dataArr.length || 12);
  
  try {
    const chartData = JSON.stringify({ type: f.get('chartType'), labels, data: dataArr, label: f.get('title') });
    const res = await fetch(API + '/dashboard', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': AUTH },
      body: JSON.stringify({
        title: f.get('title'), status: 'publish',
        content: '<p>' + (f.get('description') || '') + '</p>',
        meta: { dashboard_chart_data: chartData, dashboard_chart_color: f.get('color') || '#044bad' }
      })
    });
    if (res.ok) {
      msg.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Dashboard ajoute !</span>';
      e.target.reset(); loadStats();
    } else {
      msg.innerHTML = '<span class="text-red-500">Erreur ' + res.status + '</span>';
    }
  } catch(err) { msg.innerHTML = '<span class="text-red-500">' + err.message + '</span>'; }
});
</script>
</body>
</html>`
}

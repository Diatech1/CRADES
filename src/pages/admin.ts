export async function adminPage(db: D1Database): Promise<string> {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRADES - Administration</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            crades: { blue: '#044bad', 'blue-dark': '#032d6b', 'blue-light': '#3a7fd4', green: '#1B5E3B', 'green-dark': '#0F3D26', gold: '#C5A54E' }
          },
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
        }
      }
    }
  </script>
</head>
<body class="bg-gray-50 font-sans">
  <div id="app">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-40 flex flex-col">
      <div class="p-4 border-b border-white/10">
        <a href="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <i class="fas fa-chart-bar text-crades-gold text-sm"></i>
          </div>
          <div>
            <div class="font-bold text-sm">CRADES</div>
            <div class="text-[10px] text-white/50">Administration</div>
          </div>
        </a>
      </div>
      <nav class="flex-1 p-3 space-y-1" id="sidebar-nav">
        <button onclick="showSection('dashboard')" class="sidebar-btn active w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          <i class="fas fa-tachometer-alt w-5 text-center"></i> Tableau de bord
        </button>
        <button onclick="showSection('publications')" class="sidebar-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          <i class="fas fa-book w-5 text-center"></i> Publications
        </button>
        <button onclick="showSection('actualites')" class="sidebar-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          <i class="fas fa-newspaper w-5 text-center"></i> Actualités
        </button>
        <button onclick="showSection('indicators')" class="sidebar-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          <i class="fas fa-chart-line w-5 text-center"></i> Indicateurs
        </button>
        <button onclick="showSection('messages')" class="sidebar-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          <i class="fas fa-envelope w-5 text-center"></i> Messages
        </button>
      </nav>
      <div class="p-3 border-t border-white/10">
        <a href="/" class="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors">
          <i class="fas fa-external-link-alt"></i> Voir le site
        </a>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 min-h-screen">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <h1 id="page-title" class="text-lg font-bold text-gray-800">Tableau de bord</h1>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Administrateur</span>
          <div class="w-8 h-8 bg-crades-blue rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
        </div>
      </header>

      <div class="p-6">
        <!-- Dashboard Section -->
        <div id="section-dashboard" class="section-content">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-xl p-5 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Publications</div>
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><i class="fas fa-book text-blue-500 text-sm"></i></div>
              </div>
              <div id="stat-publications" class="text-2xl font-bold text-gray-800 mt-2">-</div>
            </div>
            <div class="bg-white rounded-xl p-5 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Jeux de données</div>
                <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><i class="fas fa-database text-green-500 text-sm"></i></div>
              </div>
              <div id="stat-datasets" class="text-2xl font-bold text-gray-800 mt-2">-</div>
            </div>
            <div class="bg-white rounded-xl p-5 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Actualités</div>
                <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center"><i class="fas fa-newspaper text-purple-500 text-sm"></i></div>
              </div>
              <div id="stat-actualites" class="text-2xl font-bold text-gray-800 mt-2">-</div>
            </div>
            <div class="bg-white rounded-xl p-5 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Messages</div>
                <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center"><i class="fas fa-envelope text-amber-500 text-sm"></i></div>
              </div>
              <div id="stat-messages" class="text-2xl font-bold text-gray-800 mt-2">-</div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="font-semibold text-gray-800 mb-4">Actions rapides</h3>
            <div class="grid sm:grid-cols-3 gap-3">
              <button onclick="showSection('publications'); openAddForm('publications')" class="p-4 bg-gray-50 rounded-lg hover:bg-crades-blue/5 transition-colors text-left">
                <i class="fas fa-plus-circle text-crades-blue mb-2"></i>
                <div class="text-sm font-medium text-gray-700">Nouvelle publication</div>
              </button>
              <button onclick="showSection('actualites'); openAddForm('actualites')" class="p-4 bg-gray-50 rounded-lg hover:bg-crades-blue/5 transition-colors text-left">
                <i class="fas fa-plus-circle text-crades-blue mb-2"></i>
                <div class="text-sm font-medium text-gray-700">Nouvelle actualité</div>
              </button>
              <button onclick="showSection('indicators'); openAddForm('indicators')" class="p-4 bg-gray-50 rounded-lg hover:bg-crades-blue/5 transition-colors text-left">
                <i class="fas fa-plus-circle text-crades-blue mb-2"></i>
                <div class="text-sm font-medium text-gray-700">Nouvel indicateur</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Publications Section -->
        <div id="section-publications" class="section-content hidden">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-800">Gestion des Publications</h2>
            <button onclick="openAddForm('publications')" class="bg-crades-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crades-blue-dark transition-colors">
              <i class="fas fa-plus mr-1"></i> Ajouter
            </button>
          </div>
          <div id="publications-list" class="space-y-3">
            <div class="text-center py-8 text-gray-400"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>
          </div>
        </div>

        <!-- Actualites Section -->
        <div id="section-actualites" class="section-content hidden">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-800">Gestion des Actualités</h2>
            <button onclick="openAddForm('actualites')" class="bg-crades-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crades-blue-dark transition-colors">
              <i class="fas fa-plus mr-1"></i> Ajouter
            </button>
          </div>
          <div id="actualites-list" class="space-y-3">
            <div class="text-center py-8 text-gray-400"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>
          </div>
        </div>

        <!-- Indicators Section -->
        <div id="section-indicators" class="section-content hidden">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-800">Indicateurs Économiques</h2>
            <button onclick="openAddForm('indicators')" class="bg-crades-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crades-blue-dark transition-colors">
              <i class="fas fa-plus mr-1"></i> Ajouter
            </button>
          </div>
          <div id="indicators-list" class="space-y-3">
            <div class="text-center py-8 text-gray-400"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>
          </div>
        </div>

        <!-- Messages Section -->
        <div id="section-messages" class="section-content hidden">
          <h2 class="text-lg font-bold text-gray-800 mb-6">Messages Reçus</h2>
          <div id="messages-list" class="space-y-3">
            <div class="text-center py-8 text-gray-400"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Modal -->
  <div id="modal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 id="modal-title" class="font-bold text-gray-800"></h3>
        <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
      </div>
      <div id="modal-body" class="p-6"></div>
    </div>
  </div>

  <script>
    const titles = { dashboard: 'Tableau de bord', publications: 'Publications', actualites: 'Actualités', indicators: 'Indicateurs', messages: 'Messages' };

    function showSection(name) {
      document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
      document.getElementById('section-' + name).classList.remove('hidden');
      document.getElementById('page-title').textContent = titles[name] || name;
      document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active', 'bg-white/10'));
      document.querySelectorAll('.sidebar-btn')[Object.keys(titles).indexOf(name)]?.classList.add('active', 'bg-white/10');
      if (name === 'publications') loadPublications();
      if (name === 'actualites') loadActualites();
      if (name === 'indicators') loadIndicators();
      if (name === 'messages') loadMessages();
      if (name === 'dashboard') loadStats();
    }

    async function loadStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('stat-publications').textContent = data.publications;
        document.getElementById('stat-datasets').textContent = data.datasets;
        document.getElementById('stat-actualites').textContent = data.actualites;
        const msgs = await fetch('/api/admin/messages');
        const msgData = await msgs.json();
        document.getElementById('stat-messages').textContent = (msgData.messages || []).length;
      } catch(e) { console.error(e); }
    }

    async function loadPublications() {
      try {
        const res = await fetch('/api/publications');
        const data = await res.json();
        const list = document.getElementById('publications-list');
        if (data.publications.length === 0) {
          list.innerHTML = '<p class="text-center text-gray-400 py-8">Aucune publication</p>';
          return;
        }
        list.innerHTML = data.publications.map(p => 
          '<div class="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">' +
          '<div><div class="font-medium text-gray-800">' + p.title_fr + '</div>' +
          '<div class="text-sm text-gray-500">' + p.type + ' • ' + p.sector + ' • ' + p.year + '</div></div>' +
          '<div class="flex gap-2">' +
          '<button onclick="deleteItem(\\'publications\\', ' + p.id + ')" class="text-red-400 hover:text-red-600 text-sm px-2 py-1"><i class="fas fa-trash"></i></button>' +
          '</div></div>'
        ).join('');
      } catch(e) { console.error(e); }
    }

    async function loadActualites() {
      try {
        const res = await fetch('/api/actualites');
        const data = await res.json();
        const list = document.getElementById('actualites-list');
        if (data.actualites.length === 0) {
          list.innerHTML = '<p class="text-center text-gray-400 py-8">Aucune actualité</p>';
          return;
        }
        list.innerHTML = data.actualites.map(a => 
          '<div class="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">' +
          '<div><div class="font-medium text-gray-800">' + a.title_fr + '</div>' +
          '<div class="text-sm text-gray-500">' + a.category + ' • ' + new Date(a.published_at).toLocaleDateString('fr-FR') + '</div></div>' +
          '</div>'
        ).join('');
      } catch(e) { console.error(e); }
    }

    async function loadIndicators() {
      try {
        const res = await fetch('/api/indicators');
        const data = await res.json();
        const list = document.getElementById('indicators-list');
        list.innerHTML = data.indicators.map(i => 
          '<div class="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">' +
          '<div class="flex items-center gap-4">' +
          '<div class="text-2xl font-bold text-gray-800">' + i.value + '<span class="text-sm text-gray-500 ml-1">' + i.unit + '</span></div>' +
          '<div><div class="font-medium text-gray-700">' + i.name_fr + '</div>' +
          '<div class="text-sm text-gray-500">' + i.sector + ' • ' + i.period + '</div></div>' +
          '</div>' +
          '<span class="text-sm font-medium ' + (i.change_direction==='up'?'text-green-600':'text-red-600') + '">' +
          (i.change_direction==='up'?'↑':'↓') + Math.abs(i.change_percent) + '%</span></div>'
        ).join('');
      } catch(e) { console.error(e); }
    }

    async function loadMessages() {
      try {
        const res = await fetch('/api/admin/messages');
        const data = await res.json();
        const list = document.getElementById('messages-list');
        if (!data.messages || data.messages.length === 0) {
          list.innerHTML = '<p class="text-center text-gray-400 py-8">Aucun message</p>';
          return;
        }
        list.innerHTML = data.messages.map(m => 
          '<div class="bg-white rounded-lg border border-gray-200 p-4">' +
          '<div class="flex items-center justify-between mb-2">' +
          '<div class="font-medium text-gray-800">' + m.name + ' <span class="text-sm text-gray-500">(' + m.email + ')</span></div>' +
          '<span class="text-xs text-gray-400">' + new Date(m.created_at).toLocaleDateString('fr-FR') + '</span></div>' +
          (m.subject ? '<div class="text-sm font-medium text-gray-600 mb-1">' + m.subject + '</div>' : '') +
          '<div class="text-sm text-gray-500">' + m.message + '</div></div>'
        ).join('');
      } catch(e) { console.error(e); }
    }

    function openAddForm(type) {
      const modal = document.getElementById('modal');
      const title = document.getElementById('modal-title');
      const body = document.getElementById('modal-body');

      if (type === 'publications') {
        title.textContent = 'Nouvelle Publication';
        body.innerHTML = '<form onsubmit="submitForm(event, \\'/api/admin/publications\\')" class="space-y-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titre (FR) *</label><input name="title_fr" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titre (EN)</label><input name="title_en" class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div class="grid grid-cols-2 gap-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Type *</label><select name="type" required class="w-full px-3 py-2 border rounded-lg text-sm"><option value="rapport">Rapport</option><option value="etude">Étude</option><option value="note_conjoncture">Note de conjoncture</option><option value="publication_officielle">Publication officielle</option></select></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Secteur</label><select name="sector" class="w-full px-3 py-2 border rounded-lg text-sm"><option value="general">Général</option><option value="industrie">Industrie</option><option value="commerce">Commerce</option><option value="pme">PME</option><option value="artisanat">Artisanat</option><option value="mines">Mines</option><option value="energie">Énergie</option></select></div></div>' +
          '<div class="grid grid-cols-2 gap-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Année</label><input name="year" type="number" value="2025" class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Auteur</label><input name="author" class="w-full px-3 py-2 border rounded-lg text-sm"></div></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Résumé (FR)</label><textarea name="summary_fr" rows="3" class="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div>' +
          '<div class="flex items-center gap-3"><label class="flex items-center gap-2"><input type="checkbox" name="is_featured" class="rounded"> <span class="text-sm">À la une</span></label></div>' +
          '<button type="submit" class="w-full bg-crades-blue text-white py-2.5 rounded-lg font-medium hover:bg-crades-blue-dark transition-colors">Publier</button>' +
          '</form>';
      } else if (type === 'actualites') {
        title.textContent = 'Nouvelle Actualité';
        body.innerHTML = '<form onsubmit="submitForm(event, \\'/api/admin/actualites\\')" class="space-y-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titre (FR) *</label><input name="title_fr" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Titre (EN)</label><input name="title_en" class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label><select name="category" class="w-full px-3 py-2 border rounded-lg text-sm"><option value="communique">Communiqué</option><option value="evenement">Événement</option><option value="partenariat">Partenariat</option><option value="formation">Formation</option><option value="general">Général</option></select></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Extrait (FR)</label><textarea name="excerpt_fr" rows="2" class="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Contenu (FR)</label><textarea name="content_fr" rows="5" class="w-full px-3 py-2 border rounded-lg text-sm"></textarea></div>' +
          '<button type="submit" class="w-full bg-crades-blue text-white py-2.5 rounded-lg font-medium hover:bg-crades-blue-dark transition-colors">Publier</button>' +
          '</form>';
      } else if (type === 'indicators') {
        title.textContent = 'Nouvel Indicateur';
        body.innerHTML = '<form onsubmit="submitForm(event, \\'/api/admin/indicators\\')" class="space-y-4">' +
          '<div class="grid grid-cols-2 gap-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Nom (FR) *</label><input name="name_fr" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Nom (EN)</label><input name="name_en" class="w-full px-3 py-2 border rounded-lg text-sm"></div></div>' +
          '<div class="grid grid-cols-3 gap-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Valeur *</label><input name="value" required class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Unité</label><input name="unit" class="w-full px-3 py-2 border rounded-lg text-sm"></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Variation %</label><input name="change_percent" type="number" step="0.1" class="w-full px-3 py-2 border rounded-lg text-sm"></div></div>' +
          '<div class="grid grid-cols-2 gap-4">' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Secteur</label><select name="sector" class="w-full px-3 py-2 border rounded-lg text-sm"><option value="general">Général</option><option value="industrie">Industrie</option><option value="commerce">Commerce</option><option value="pme">PME</option></select></div>' +
          '<div><label class="block text-sm font-medium text-gray-700 mb-1">Période</label><input name="period" class="w-full px-3 py-2 border rounded-lg text-sm" placeholder="T3 2025"></div></div>' +
          '<button type="submit" class="w-full bg-crades-blue text-white py-2.5 rounded-lg font-medium hover:bg-crades-blue-dark transition-colors">Ajouter</button>' +
          '</form>';
      }
      modal.classList.remove('hidden');
    }

    function closeModal() { document.getElementById('modal').classList.add('hidden'); }

    async function submitForm(e, url) {
      e.preventDefault();
      const form = e.target;
      const data = {};
      new FormData(form).forEach((v, k) => { data[k] = v; });
      if (data.is_featured) data.is_featured = true;
      if (data.year) data.year = parseInt(data.year);
      if (data.change_percent) data.change_percent = parseFloat(data.change_percent);
      try {
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const result = await res.json();
        if (result.success) { closeModal(); showSection(url.includes('publications') ? 'publications' : url.includes('actualites') ? 'actualites' : 'indicators'); }
        else alert('Erreur: ' + (result.error || 'Inconnue'));
      } catch(e) { alert('Erreur: ' + e.message); }
    }

    async function deleteItem(type, id) {
      if (!confirm('Supprimer cet élément ?')) return;
      try {
        await fetch('/api/admin/' + type + '/' + id, { method: 'DELETE' });
        showSection(type);
      } catch(e) { alert('Erreur: ' + e.message); }
    }

    // Init
    loadStats();
  </script>
</body>
</html>`
}

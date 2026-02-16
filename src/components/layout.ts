// CRADES Layout Template
const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export function layout(content: string, options: { title?: string; description?: string; lang?: string; path?: string } = {}) {
  const lang = options.lang || 'fr'
  const title = options.title 
    ? `${options.title} | CRADES` 
    : 'CRADES - Centre de Recherche, d\'Analyse et des Statistiques'
  const description = options.description || 
    'Institution rattachée au Ministère de l\'Industrie et du Commerce du Sénégal. Recherche, analyse économique et statistiques industrielles.'
  const path = options.path || '/'

  return `<!DOCTYPE html>
<html lang="${lang}" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'fr_FR'}">
  <link rel="canonical" href="https://crades.gouv.sn${path}">
  <link rel="alternate" hreflang="fr" href="https://crades.gouv.sn${path}">
  <link rel="alternate" hreflang="en" href="https://crades.gouv.sn${path}?lang=en">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            crades: {
              green: '#1B5E3B',
              'green-dark': '#0F3D26',
              'green-light': '#2D8F5E',
              gold: '#C5A54E',
              'gold-light': '#D4B96A',
              gray: {
                50: '#F8F9FA',
                100: '#F1F3F5',
                200: '#E9ECEF',
                300: '#DEE2E6',
                400: '#ADB5BD',
                500: '#6C757D',
                600: '#495057',
                700: '#343A40',
                800: '#212529',
              }
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            serif: ['Source Serif 4', 'Georgia', 'serif'],
          }
        }
      }
    }
  </script>
  <style>
    .hero-gradient { background: linear-gradient(135deg, #0F3D26 0%, #1B5E3B 50%, #2D8F5E 100%); }
    .gold-accent { background: linear-gradient(90deg, #C5A54E, #D4B96A); }
    .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(27,94,59,0.15); }
    .nav-link { position: relative; }
    .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: #C5A54E; transition: width 0.3s; }
    .nav-link:hover::after { width: 100%; }
    .fade-in { animation: fadeIn 0.6s ease-in; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .pub-card { transition: all 0.3s ease; }
    .pub-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #F1F3F5; }
    ::-webkit-scrollbar-thumb { background: #1B5E3B; border-radius: 4px; }
    .mobile-menu { transform: translateX(-100%); transition: transform 0.3s ease; }
    .mobile-menu.open { transform: translateX(0); }
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "CRADES",
    "alternateName": "Centre de Recherche, d'Analyse et des Statistiques",
    "url": "https://crades.gouv.sn",
    "description": "Institution rattachée au Ministère de l'Industrie et du Commerce du Sénégal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue Aimé Césaire, Plateau",
      "addressLocality": "Dakar",
      "addressCountry": "SN"
    },
    "parentOrganization": {
      "@type": "GovernmentOrganization",
      "name": "Ministère de l'Industrie et du Commerce du Sénégal"
    }
  }
  </script>
</head>
<body class="bg-white font-sans text-crades-gray-700 antialiased">

<!-- Top Bar -->
<div class="bg-crades-green-dark text-white text-xs">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
    <div class="flex items-center gap-4">
      <span class="hidden sm:inline"><i class="fas fa-phone-alt mr-1"></i> +221 33 889 12 34</span>
      <span class="hidden md:inline"><i class="fas fa-envelope mr-1"></i> contact@crades.gouv.sn</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="opacity-70">${t('République du Sénégal', 'Republic of Senegal', lang)}</span>
      <span class="opacity-40">|</span>
      <a href="${path}${path.includes('?') ? '&' : '?'}lang=fr" class="hover:text-crades-gold ${lang === 'fr' ? 'text-crades-gold font-semibold' : ''}">FR</a>
      <a href="${path}${path.includes('?') ? '&' : '?'}lang=en" class="hover:text-crades-gold ${lang === 'en' ? 'text-crades-gold font-semibold' : ''}">EN</a>
    </div>
  </div>
</div>

<!-- Main Navigation -->
<header class="bg-white border-b border-crades-gray-200 sticky top-0 z-50 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Logo -->
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="flex items-center gap-3 flex-shrink-0">
        <div class="w-10 h-10 lg:w-12 lg:h-12 bg-crades-green rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 40 40" class="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="currentColor">
            <rect x="4" y="28" width="5" height="10" rx="1" opacity="0.7"/>
            <rect x="12" y="20" width="5" height="18" rx="1" opacity="0.85"/>
            <rect x="20" y="14" width="5" height="24" rx="1"/>
            <rect x="28" y="6" width="5" height="32" rx="1" opacity="0.9"/>
            <circle cx="6.5" cy="24" r="2" fill="#C5A54E"/>
            <circle cx="14.5" cy="16" r="2" fill="#C5A54E"/>
            <circle cx="22.5" cy="10" r="2" fill="#C5A54E"/>
            <circle cx="30.5" cy="3" r="2" fill="#C5A54E"/>
            <line x1="6.5" y1="24" x2="14.5" y2="16" stroke="#C5A54E" stroke-width="1.5"/>
            <line x1="14.5" y1="16" x2="22.5" y2="10" stroke="#C5A54E" stroke-width="1.5"/>
            <line x1="22.5" y1="10" x2="30.5" y2="3" stroke="#C5A54E" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="hidden sm:block">
          <div class="text-crades-green font-bold text-lg lg:text-xl leading-tight tracking-tight">CRADES</div>
          <div class="text-[10px] lg:text-xs text-crades-gray-500 leading-tight">${t('Centre de Recherche, d\'Analyse<br>et des Statistiques', 'Research, Analysis &<br>Statistics Center', lang)}</div>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <a href="/${lang === 'en' ? '?lang=en' : ''}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('Accueil', 'Home', lang)}</a>
        <a href="/${lang === 'en' ? 'about' : 'a-propos'}${lang === 'en' ? '' : ''}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('À propos', 'About', lang)}</a>
        <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('Publications', 'Publications', lang)}</a>
        <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('Tableaux de bord', 'Dashboards', lang)}</a>
        <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('Données', 'Data', lang)}</a>
        <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">${t('Actualités', 'News', lang)}</a>
        <a href="/contact${lang === 'en' ? '?lang=en' : ''}" class="nav-link px-3 py-2 text-sm font-medium text-crades-gray-600 hover:text-crades-green transition-colors">Contact</a>
      </nav>

      <!-- Search + Mobile Menu -->
      <div class="flex items-center gap-2">
        <button onclick="document.getElementById('searchModal').classList.toggle('hidden')" class="p-2 text-crades-gray-500 hover:text-crades-green transition-colors">
          <i class="fas fa-search text-lg"></i>
        </button>
        <button onclick="document.getElementById('mobileMenu').classList.toggle('open')" class="lg:hidden p-2 text-crades-gray-500 hover:text-crades-green">
          <i class="fas fa-bars text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Menu -->
<div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-white lg:hidden">
  <div class="flex items-center justify-between p-4 border-b">
    <span class="font-bold text-crades-green text-lg">CRADES</span>
    <button onclick="document.getElementById('mobileMenu').classList.remove('open')" class="p-2 text-crades-gray-500">
      <i class="fas fa-times text-xl"></i>
    </button>
  </div>
  <nav class="p-4 space-y-1">
    <a href="/${lang === 'en' ? '?lang=en' : ''}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('Accueil', 'Home', lang)}</a>
    <a href="/${lang === 'en' ? 'about' : 'a-propos'}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('À propos', 'About', lang)}</a>
    <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('Publications', 'Publications', lang)}</a>
    <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('Tableaux de bord', 'Dashboards', lang)}</a>
    <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('Données', 'Data', lang)}</a>
    <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">${t('Actualités', 'News', lang)}</a>
    <a href="/contact${lang === 'en' ? '?lang=en' : ''}" class="block px-4 py-3 rounded-lg text-crades-gray-700 hover:bg-crades-green hover:text-white transition-colors font-medium">Contact</a>
  </nav>
</div>

<!-- Search Modal -->
<div id="searchModal" class="hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6">
    <div class="flex items-center gap-3 mb-4">
      <i class="fas fa-search text-crades-green text-xl"></i>
      <input id="searchInput" type="text" placeholder="${t('Rechercher publications, données, rapports...', 'Search publications, data, reports...', lang)}" 
        class="flex-1 text-lg outline-none text-crades-gray-700 placeholder:text-crades-gray-400"
        onkeyup="handleSearch(this.value)">
      <button onclick="document.getElementById('searchModal').classList.add('hidden')" class="text-crades-gray-400 hover:text-crades-gray-700">
        <i class="fas fa-times text-xl"></i>
      </button>
    </div>
    <div id="searchResults" class="space-y-2 max-h-96 overflow-y-auto"></div>
  </div>
</div>
<script>
document.getElementById('searchModal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.add('hidden');
});
let searchTimeout;
function handleSearch(q) {
  clearTimeout(searchTimeout);
  if (q.length < 2) { document.getElementById('searchResults').innerHTML = ''; return; }
  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch('/api/search?q=' + encodeURIComponent(q));
      const data = await res.json();
      const results = document.getElementById('searchResults');
      if (data.results && data.results.length > 0) {
        results.innerHTML = data.results.map(r => 
          '<a href="' + r.url + '" class="block p-3 rounded-lg hover:bg-crades-gray-50 transition-colors">' +
          '<div class="font-medium text-crades-gray-700">' + r.title + '</div>' +
          '<div class="text-sm text-crades-gray-500">' + r.type + ' • ' + r.sector + '</div>' +
          '</a>'
        ).join('');
      } else {
        results.innerHTML = '<p class="text-center text-crades-gray-500 py-4">${t('Aucun résultat trouvé', 'No results found', lang)}</p>';
      }
    } catch(e) { console.error(e); }
  }, 300);
}
</script>

<!-- Main Content -->
<main class="min-h-screen fade-in">
${content}
</main>

<!-- Footer -->
<footer class="bg-crades-green-dark text-white">
  <!-- Newsletter -->
  <div class="border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-semibold">${t('Restez informé', 'Stay informed', lang)}</h3>
          <p class="text-white/70 text-sm mt-1">${t('Recevez nos dernières publications et analyses', 'Receive our latest publications and analyses', lang)}</p>
        </div>
        <div class="flex gap-2 w-full md:w-auto">
          <input type="email" placeholder="${t('Votre email', 'Your email', lang)}" class="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-crades-gold">
          <button class="px-6 py-2.5 bg-crades-gold text-crades-green-dark font-semibold rounded-lg hover:bg-crades-gold-light transition-colors">
            ${t('S\'abonner', 'Subscribe', lang)}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Col 1 -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 40 40" class="w-7 h-7 text-crades-gold" fill="currentColor">
              <rect x="4" y="28" width="5" height="10" rx="1" opacity="0.7"/>
              <rect x="12" y="20" width="5" height="18" rx="1" opacity="0.85"/>
              <rect x="20" y="14" width="5" height="24" rx="1"/>
              <rect x="28" y="6" width="5" height="32" rx="1" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <div class="font-bold text-lg">CRADES</div>
            <div class="text-xs text-white/60">${t('Ministère de l\'Industrie et du Commerce', 'Ministry of Industry and Trade', lang)}</div>
          </div>
        </div>
        <p class="text-white/70 text-sm leading-relaxed">
          ${t('Le Centre de Recherche, d\'Analyse et des Statistiques est l\'institution de référence en matière de données industrielles et commerciales du Sénégal.', 'The Research, Analysis and Statistics Center is the reference institution for industrial and commercial data in Senegal.', lang)}
        </p>
        <div class="flex gap-3 mt-4">
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-crades-gold hover:text-crades-green-dark transition-colors"><i class="fab fa-twitter text-sm"></i></a>
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-crades-gold hover:text-crades-green-dark transition-colors"><i class="fab fa-linkedin-in text-sm"></i></a>
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-crades-gold hover:text-crades-green-dark transition-colors"><i class="fab fa-youtube text-sm"></i></a>
        </div>
      </div>

      <!-- Col 2 -->
      <div>
        <h4 class="font-semibold mb-4 text-crades-gold">${t('Navigation', 'Navigation', lang)}</h4>
        <ul class="space-y-2 text-sm text-white/70">
          <li><a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white transition-colors">${t('Accueil', 'Home', lang)}</a></li>
          <li><a href="/${lang === 'en' ? 'about' : 'a-propos'}" class="hover:text-white transition-colors">${t('À propos', 'About', lang)}</a></li>
          <li><a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white transition-colors">${t('Publications', 'Publications', lang)}</a></li>
          <li><a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="hover:text-white transition-colors">${t('Tableaux de bord', 'Dashboards', lang)}</a></li>
          <li><a href="/${lang === 'en' ? 'data' : 'donnees'}" class="hover:text-white transition-colors">${t('Données', 'Data', lang)}</a></li>
          <li><a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="hover:text-white transition-colors">${t('Actualités', 'News', lang)}</a></li>
        </ul>
      </div>

      <!-- Col 3 -->
      <div>
        <h4 class="font-semibold mb-4 text-crades-gold">${t('Ressources', 'Resources', lang)}</h4>
        <ul class="space-y-2 text-sm text-white/70">
          <li><a href="/api/publications" class="hover:text-white transition-colors">API ${t('Publications', 'Publications', lang)}</a></li>
          <li><a href="/api/indicators" class="hover:text-white transition-colors">API ${t('Indicateurs', 'Indicators', lang)}</a></li>
          <li><a href="/api/datasets" class="hover:text-white transition-colors">API ${t('Données', 'Data', lang)}</a></li>
          <li><a href="/sitemap.xml" class="hover:text-white transition-colors">Plan du site</a></li>
        </ul>
      </div>

      <!-- Col 4 -->
      <div>
        <h4 class="font-semibold mb-4 text-crades-gold">Contact</h4>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-start gap-2">
            <i class="fas fa-map-marker-alt mt-1 text-crades-gold"></i>
            <span>Immeuble CRADES, Rue Aimé Césaire<br>Plateau, Dakar, Sénégal</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-phone-alt text-crades-gold"></i>
            <span>+221 33 889 12 34</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-envelope text-crades-gold"></i>
            <span>contact@crades.gouv.sn</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom -->
  <div class="border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50">
      <p>© ${new Date().getFullYear()} CRADES - ${t('Tous droits réservés', 'All rights reserved', lang)}</p>
      <p class="mt-2 sm:mt-0">${t('République du Sénégal', 'Republic of Senegal', lang)} • ${t('Ministère de l\'Industrie et du Commerce', 'Ministry of Industry and Trade', lang)}</p>
    </div>
  </div>
</footer>
</body>
</html>`
}

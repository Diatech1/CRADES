import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const iconMap: Record<string, string> = {
  'industry': 'fa-industry',
  'ship': 'fa-ship',
  'building': 'fa-building',
  'chart-line': 'fa-chart-line',
  'balance-scale': 'fa-balance-scale',
  'users': 'fa-users',
  'globe-africa': 'fa-globe-africa',
  'gauge-high': 'fa-gauge-high',
}

const typeLabels: Record<string, { fr: string; en: string; color: string; icon: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report', color: 'bg-blue-100 text-blue-800', icon: 'fa-file-alt' },
  'etude': { fr: 'Étude', en: 'Study', color: 'bg-emerald-100 text-emerald-800', icon: 'fa-search' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note', color: 'bg-amber-100 text-amber-800', icon: 'fa-chart-bar' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication', color: 'bg-purple-100 text-purple-800', icon: 'fa-stamp' },
  'tableau_bord': { fr: 'Tableau de bord', en: 'Dashboard', color: 'bg-cyan-100 text-cyan-800', icon: 'fa-tachometer-alt' },
}

export async function homePage(db: D1Database, lang: string): Promise<string> {
  // Fetch data
  const indicators = await db.prepare('SELECT * FROM indicators WHERE is_active = 1 ORDER BY display_order ASC').all()
  const publications = await db.prepare('SELECT * FROM publications WHERE is_published = 1 ORDER BY year DESC, created_at DESC LIMIT 6').all()
  const actualites = await db.prepare('SELECT * FROM actualites WHERE is_published = 1 ORDER BY published_at DESC LIMIT 3').all()
  const dashboards = await db.prepare('SELECT * FROM dashboards WHERE is_active = 1 ORDER BY display_order ASC LIMIT 4').all()

  const content = `
<!-- Hero Section -->
<section class="hero-gradient relative overflow-hidden">
  <div class="absolute inset-0 opacity-10">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  </div>
  <div class="absolute top-20 right-10 w-96 h-96 bg-crades-gold/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
  
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span class="w-2 h-2 bg-crades-gold rounded-full animate-pulse"></span>
          <span class="text-white/90 text-sm font-medium">${t('Ministère de l\'Industrie et du Commerce', 'Ministry of Industry and Trade', lang)}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          ${t('La référence nationale en', 'The national reference for', lang)}
          <span class="text-crades-gold"> ${t('données industrielles', 'industrial data', lang)}</span>
          ${t('et commerciales', 'and trade', lang)}
        </h1>
        <p class="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
          ${t(
            'Le CRADES produit et diffuse les statistiques, études et analyses stratégiques sur l\'industrie, le commerce et les PME du Sénégal au service des décideurs, chercheurs et investisseurs.',
            'CRADES produces and disseminates statistics, studies and strategic analyses on industry, trade and SMEs in Senegal for decision-makers, researchers and investors.',
            lang
          )}
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="inline-flex items-center gap-2 bg-crades-gold text-crades-green-dark px-6 py-3 rounded-lg font-semibold hover:bg-crades-gold-light transition-colors">
            <i class="fas fa-book-open"></i>
            ${t('Voir les publications', 'View Publications', lang)}
          </a>
          <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
            <i class="fas fa-database"></i>
            ${t('Accéder aux données', 'Access Data', lang)}
          </a>
        </div>
      </div>
      
      <!-- Hero stats preview -->
      <div class="hidden lg:grid grid-cols-2 gap-4">
        ${(indicators.results || []).slice(0, 4).map((ind: any) => `
          <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas ${iconMap[ind.icon] || 'fa-chart-line'} text-crades-gold"></i>
              <span class="text-white/70 text-xs font-medium">${ind.period}</span>
            </div>
            <div class="text-2xl font-bold text-white">${ind.value}</div>
            <div class="text-white/60 text-sm">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
            <div class="flex items-center gap-1 mt-2 text-xs ${ind.change_direction === 'up' ? 'text-green-300' : ind.change_direction === 'down' ? 'text-red-300' : 'text-white/50'}">
              <i class="fas fa-arrow-${ind.change_direction === 'up' ? 'up' : ind.change_direction === 'down' ? 'down' : 'right'}"></i>
              <span>${Math.abs(ind.change_percent)}%</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- Key Indicators -->
<section class="bg-crades-gray-50 py-12 lg:py-16 border-b border-crades-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-crades-gray-800">${t('Indicateurs clés', 'Key Indicators', lang)}</h2>
        <p class="text-crades-gray-500 mt-1">${t('Dernières données disponibles', 'Latest available data', lang)}</p>
      </div>
      <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="text-crades-green font-medium text-sm hover:underline">
        ${t('Tous les tableaux de bord', 'All dashboards', lang)} <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${(indicators.results || []).map((ind: any) => `
        <div class="stat-card bg-white rounded-xl p-5 border border-crades-gray-200 transition-all duration-300 cursor-default">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-lg bg-crades-green/10 flex items-center justify-center">
              <i class="fas ${iconMap[ind.icon] || 'fa-chart-line'} text-crades-green"></i>
            </div>
            <div class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              ind.change_direction === 'up' ? 'bg-green-50 text-green-700' : 
              ind.change_direction === 'down' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
            }">
              <i class="fas fa-arrow-${ind.change_direction === 'up' ? 'up' : ind.change_direction === 'down' ? 'down' : 'right'} text-[10px]"></i>
              ${Math.abs(ind.change_percent)}%
            </div>
          </div>
          <div class="text-2xl font-bold text-crades-gray-800">${ind.value}</div>
          <div class="text-xs text-crades-gray-500 mt-0.5">${ind.unit}</div>
          <div class="text-sm font-medium text-crades-gray-600 mt-2">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
          <div class="text-xs text-crades-gray-400 mt-1"><i class="far fa-clock mr-1"></i>${ind.period} • ${ind.source}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Latest Publications -->
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-crades-gray-800">${t('Dernières publications', 'Latest Publications', lang)}</h2>
        <p class="text-crades-gray-500 mt-1">${t('Études, rapports et analyses', 'Studies, reports and analyses', lang)}</p>
      </div>
      <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-crades-green font-medium text-sm hover:underline">
        ${t('Toutes les publications', 'All publications', lang)} <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${(publications.results || []).map((pub: any) => {
        const typeInfo = typeLabels[pub.type] || typeLabels['rapport']
        return `
        <a href="/publications/${pub.slug}${lang === 'en' ? '?lang=en' : ''}" class="pub-card bg-white rounded-xl border border-crades-gray-200 overflow-hidden group">
          <div class="h-2 gold-accent"></div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${typeInfo.color}">
                <i class="fas ${typeInfo.icon} text-[10px]"></i>
                ${lang === 'en' ? typeInfo.en : typeInfo.fr}
              </span>
              <span class="text-xs text-crades-gray-400">${pub.year}</span>
            </div>
            <h3 class="font-semibold text-crades-gray-800 group-hover:text-crades-green transition-colors line-clamp-2 mb-2">
              ${lang === 'en' ? pub.title_en : pub.title_fr}
            </h3>
            <p class="text-sm text-crades-gray-500 line-clamp-2 mb-4">
              ${lang === 'en' ? pub.summary_en : pub.summary_fr}
            </p>
            <div class="flex items-center justify-between text-xs text-crades-gray-400">
              <span class="capitalize"><i class="fas fa-folder mr-1"></i>${pub.sector}</span>
              <span class="text-crades-green font-medium group-hover:underline">${t('Lire', 'Read', lang)} <i class="fas fa-arrow-right ml-1"></i></span>
            </div>
          </div>
        </a>`
      }).join('')}
    </div>
  </div>
</section>

<!-- Dashboards Quick Access -->
<section class="bg-crades-gray-50 py-12 lg:py-16 border-y border-crades-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-crades-gray-800">${t('Tableaux de bord', 'Dashboards', lang)}</h2>
        <p class="text-crades-gray-500 mt-1">${t('Visualisations interactives des données', 'Interactive data visualizations', lang)}</p>
      </div>
      <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="text-crades-green font-medium text-sm hover:underline">
        ${t('Voir tous', 'View all', lang)} <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${(dashboards.results || []).map((db: any, i: number) => {
        const colors = ['from-crades-green to-emerald-600', 'from-blue-600 to-blue-800', 'from-amber-500 to-amber-700', 'from-purple-600 to-purple-800']
        const icons = ['fa-industry', 'fa-ship', 'fa-building', 'fa-chart-line']
        return `
        <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}#${db.slug}" class="group relative overflow-hidden rounded-xl bg-gradient-to-br ${colors[i % 4]} p-6 text-white hover:shadow-xl transition-all duration-300">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <i class="fas ${icons[i % 4]} text-3xl mb-4 text-white/80"></i>
          <h3 class="font-semibold text-lg mb-1">${lang === 'en' ? db.title_en : db.title_fr}</h3>
          <p class="text-white/70 text-sm line-clamp-2">${lang === 'en' ? db.description_en : db.description_fr}</p>
          <div class="mt-4 flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            ${t('Explorer', 'Explore', lang)} <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </a>`
      }).join('')}
    </div>
  </div>
</section>

<!-- News Section -->
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-crades-gray-800">${t('Actualités', 'News', lang)}</h2>
        <p class="text-crades-gray-500 mt-1">${t('Dernières informations du CRADES', 'Latest CRADES news', lang)}</p>
      </div>
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-crades-green font-medium text-sm hover:underline">
        ${t('Toutes les actualités', 'All news', lang)} <i class="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${(actualites.results || []).map((actu: any) => {
        const catIcons: Record<string, string> = { communique: 'fa-bullhorn', evenement: 'fa-calendar-alt', partenariat: 'fa-handshake', formation: 'fa-graduation-cap', general: 'fa-newspaper' }
        const catColors: Record<string, string> = { communique: 'text-blue-600 bg-blue-50', evenement: 'text-purple-600 bg-purple-50', partenariat: 'text-amber-600 bg-amber-50', formation: 'text-green-600 bg-green-50', general: 'text-gray-600 bg-gray-50' }
        return `
        <a href="/actualites/${actu.slug}${lang === 'en' ? '?lang=en' : ''}" class="pub-card bg-white rounded-xl border border-crades-gray-200 p-6 group">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${catColors[actu.category] || catColors.general}">
              <i class="fas ${catIcons[actu.category] || catIcons.general} text-[10px]"></i>
              ${actu.category}
            </span>
            <span class="text-xs text-crades-gray-400">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h3 class="font-semibold text-crades-gray-800 group-hover:text-crades-green transition-colors mb-2">
            ${lang === 'en' ? actu.title_en : actu.title_fr}
          </h3>
          <p class="text-sm text-crades-gray-500 line-clamp-2">
            ${lang === 'en' ? actu.excerpt_en : actu.excerpt_fr}
          </p>
        </a>`
      }).join('')}
    </div>
  </div>
</section>

<!-- Mission CTA -->
<section class="bg-crades-green-dark text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-bold mb-4">${t('Au service de la transparence statistique', 'Serving statistical transparency', lang)}</h2>
        <p class="text-white/80 leading-relaxed mb-6">
          ${t(
            'Le CRADES s\'engage à fournir des données fiables, accessibles et actualisées sur l\'industrie et le commerce du Sénégal. Notre mission : éclairer les décisions stratégiques et renforcer l\'attractivité économique du pays.',
            'CRADES is committed to providing reliable, accessible and up-to-date data on Senegal\'s industry and trade. Our mission: informing strategic decisions and strengthening the country\'s economic attractiveness.',
            lang
          )}
        </p>
        <div class="grid grid-cols-3 gap-6 mb-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-crades-gold">50+</div>
            <div class="text-sm text-white/60 mt-1">${t('Publications', 'Publications', lang)}</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-crades-gold">25+</div>
            <div class="text-sm text-white/60 mt-1">${t('Jeux de données', 'Datasets', lang)}</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-crades-gold">8</div>
            <div class="text-sm text-white/60 mt-1">${t('Secteurs couverts', 'Sectors covered', lang)}</div>
          </div>
        </div>
        <a href="/${lang === 'en' ? 'about' : 'a-propos'}" class="inline-flex items-center gap-2 bg-crades-gold text-crades-green-dark px-6 py-3 rounded-lg font-semibold hover:bg-crades-gold-light transition-colors">
          ${t('Découvrir le CRADES', 'Discover CRADES', lang)} <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/5 border border-white/10 rounded-xl p-6">
          <i class="fas fa-chart-pie text-crades-gold text-2xl mb-3"></i>
          <h3 class="font-semibold text-lg mb-2">${t('Analyse', 'Analysis', lang)}</h3>
          <p class="text-white/60 text-sm">${t('Études sectorielles approfondies', 'In-depth sectoral studies', lang)}</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-6">
          <i class="fas fa-database text-crades-gold text-2xl mb-3"></i>
          <h3 class="font-semibold text-lg mb-2">${t('Données', 'Data', lang)}</h3>
          <p class="text-white/60 text-sm">${t('Open Data en accès libre', 'Free and open access data', lang)}</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-6">
          <i class="fas fa-eye text-crades-gold text-2xl mb-3"></i>
          <h3 class="font-semibold text-lg mb-2">${t('Veille', 'Monitoring', lang)}</h3>
          <p class="text-white/60 text-sm">${t('Suivi conjoncturel permanent', 'Continuous economic monitoring', lang)}</p>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-6">
          <i class="fas fa-handshake text-crades-gold text-2xl mb-3"></i>
          <h3 class="font-semibold text-lg mb-2">${t('Conseil', 'Advisory', lang)}</h3>
          <p class="text-white/60 text-sm">${t('Appui aux politiques publiques', 'Support for public policies', lang)}</p>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return layout(content, { 
    title: t('Accueil', 'Home', lang),
    description: t('CRADES - Institution de référence en données industrielles et commerciales du Sénégal', 'CRADES - Reference institution for industrial and commercial data in Senegal', lang),
    lang, 
    path: '/' 
  })
}

import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report' },
  'etude': { fr: 'Étude', en: 'Study' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication' },
  'tableau_bord': { fr: 'Tableau de bord', en: 'Dashboard' },
}

export async function homePage(db: D1Database, lang: string): Promise<string> {
  const indicators = await db.prepare('SELECT * FROM indicators WHERE is_active = 1 ORDER BY display_order ASC').all()
  const publications = await db.prepare('SELECT * FROM publications WHERE is_published = 1 ORDER BY year DESC, created_at DESC LIMIT 4').all()
  const actualites = await db.prepare('SELECT * FROM actualites WHERE is_published = 1 ORDER BY published_at DESC LIMIT 3').all()

  const content = `
<!-- Hero — Light blue image with statistics -->
<section class="relative overflow-hidden min-h-[520px] lg:min-h-[560px]">
  <!-- Background image -->
  <img src="/static/img/hero-stats.png" alt="" class="absolute inset-0 w-full h-full object-cover" loading="eager">
  <!-- Subtle overlay for text readability on left -->
  <div class="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>
  
  <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex items-center min-h-[520px] lg:min-h-[560px]">
    <div class="pt-16 pb-28 lg:pt-20 lg:pb-32 max-w-xl">
      <img src="/static/img/logo-mincom.png" alt="MINCOM" class="h-16 sm:h-20 w-auto mb-5">
      <p class="text-brand-blue text-xs font-semibold uppercase tracking-widest mb-4">CRADES</p>
      <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
        ${t('Centre de Recherche, d\'Analyse et Statistiques', 'Research, Analysis and Statistics Centre', lang)}
      </h1>
      <p class="text-gray-600 mt-5 text-sm leading-relaxed">
        ${t(
          'Le CRADES produit et diffuse les statistiques, etudes et analyses strategiques sur l\'industrie et le commerce du Senegal.',
          'CRADES produces and disseminates statistics, studies and strategic analyses on Senegal\'s industry and trade.',
          lang
        )}
      </p>
      <div class="flex flex-wrap gap-4 mt-10">
        <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors shadow-sm">
          ${t('Publications', 'Publications', lang)}
        </a>
        <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="text-sm font-medium bg-white text-brand-navy px-5 py-2.5 rounded-lg hover:bg-brand-frost transition-colors border border-brand-ice shadow-sm">
          ${t('Donnees ouvertes', 'Open data', lang)}
        </a>
      </div>
    </div>
  </div>

  <!-- Key stats strip at bottom -->
  <div class="absolute bottom-0 inset-x-0 z-10 bg-brand-navy/90 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        ${(indicators.results || []).slice(0, 4).map((ind: any) => `
          <div>
            <div class="text-lg sm:text-xl font-bold text-white">${ind.value}<span class="text-xs font-normal text-brand-sky ml-1">${ind.unit}</span></div>
            <div class="text-[11px] text-brand-sky/70 mt-0.5">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- All indicators — Expanded grid with trends -->
<section class="bg-brand-frost border-b border-brand-ice/50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider">${t('Indicateurs economiques', 'Economic indicators', lang)}</h2>
      <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="text-xs text-brand-gold hover:underline">${t('Tableaux de bord', 'Dashboards', lang)} &rarr;</a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
      ${(indicators.results || []).map((ind: any) => `
        <div class="bg-white border border-brand-ice/60 rounded-lg p-4 hover:border-brand-sky/40 hover:shadow-sm transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-gray-400 capitalize">${ind.sector}</span>
            <span class="inline-flex items-center gap-0.5 text-[11px] font-medium ${ind.change_direction === 'up' ? 'text-emerald-600' : ind.change_direction === 'down' ? 'text-red-500' : 'text-gray-400'}">
              <i class="fas fa-arrow-${ind.change_direction === 'up' ? 'up' : ind.change_direction === 'down' ? 'down' : 'right'} text-[8px]"></i>
              ${Math.abs(ind.change_percent)}%
            </span>
          </div>
          <div class="text-xl font-bold text-gray-800">${ind.value}<span class="text-xs font-normal text-gray-400 ml-1">${ind.unit}</span></div>
          <div class="text-xs text-gray-500 mt-1">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
          <div class="text-[10px] text-gray-300 mt-1">${ind.period}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Latest publications — Simple list -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display text-xl text-gray-800">${t('Dernières publications', 'Latest publications', lang)}</h2>
      <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-xs text-brand-gold hover:underline">${t('Toutes les publications', 'All publications', lang)} &rarr;</a>
    </div>
    <div class="divide-y divide-gray-100">
      ${(publications.results || []).map((pub: any) => {
        const typeInfo = typeLabels[pub.type] || typeLabels['rapport']
        return `
        <a href="/publications/${pub.slug}${lang === 'en' ? '?lang=en' : ''}" class="flex items-start gap-4 py-5 group">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-[11px] font-medium text-brand-gold uppercase tracking-wide">${lang === 'en' ? typeInfo.en : typeInfo.fr}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-[11px] text-gray-400">${pub.year}</span>
              <span class="text-gray-300">&middot;</span>
              <span class="text-[11px] text-gray-400 capitalize">${pub.sector}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-800 group-hover:text-brand-blue transition-colors">${lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr}</h3>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1">${lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr}</p>
          </div>
          <i class="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-brand-blue mt-2 transition-colors"></i>
        </a>`
      }).join('')}
    </div>
  </div>
</section>

<!-- Actualités — Minimal cards -->
<section class="bg-brand-frost border-y border-brand-ice/50 py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display text-xl text-gray-800">${t('Actualités', 'News', lang)}</h2>
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-xs text-brand-gold hover:underline">${t('Toutes les actualités', 'All news', lang)} &rarr;</a>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${(actualites.results || []).map((actu: any) => `
        <a href="/actualites/${actu.slug}${lang === 'en' ? '?lang=en' : ''}" class="bg-white rounded-lg border border-brand-ice/60 p-5 hover:border-brand-sky/40 hover:shadow-sm transition-all group">
          <span class="text-[11px] text-gray-400">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <h3 class="text-sm font-medium text-gray-800 mt-2 group-hover:text-brand-blue transition-colors line-clamp-2">${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}</h3>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2">${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}</p>
        </a>
      `).join('')}
    </div>
  </div>
</section>

<!-- CTA — Simple, understated -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
    <h2 class="font-display text-xl text-gray-800">${t('Accédez aux données ouvertes', 'Access open data', lang)}</h2>
    <p class="text-sm text-gray-400 mt-2 max-w-md mx-auto">${t('Téléchargez les jeux de données du CRADES ou intégrez nos indicateurs via l\'API publique.', 'Download CRADES datasets or integrate our indicators via the public API.', lang)}</p>
    <div class="flex items-center justify-center gap-3 mt-6">
      <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
        ${t('Explorer les données', 'Explore data', lang)}
      </a>
      <a href="/api/indicators" class="text-sm font-medium text-gray-500 border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-300 transition-colors">
        API
      </a>
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

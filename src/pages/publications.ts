import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string; color: string; icon: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report', color: 'bg-blue-100 text-blue-800', icon: 'fa-file-alt' },
  'etude': { fr: 'Étude', en: 'Study', color: 'bg-emerald-100 text-emerald-800', icon: 'fa-search' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note', color: 'bg-amber-100 text-amber-800', icon: 'fa-chart-bar' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication', color: 'bg-purple-100 text-purple-800', icon: 'fa-stamp' },
  'tableau_bord': { fr: 'Tableau de bord', en: 'Dashboard', color: 'bg-cyan-100 text-cyan-800', icon: 'fa-tachometer-alt' },
}

const sectorLabels: Record<string, { fr: string; en: string }> = {
  'industrie': { fr: 'Industrie', en: 'Industry' },
  'commerce': { fr: 'Commerce', en: 'Trade' },
  'pme': { fr: 'PME', en: 'SMEs' },
  'artisanat': { fr: 'Artisanat', en: 'Crafts' },
  'mines': { fr: 'Mines', en: 'Mining' },
  'energie': { fr: 'Énergie', en: 'Energy' },
  'numerique': { fr: 'Numérique', en: 'Digital' },
  'agriculture': { fr: 'Agriculture', en: 'Agriculture' },
  'general': { fr: 'Général', en: 'General' },
}

export async function publicationsPage(db: D1Database, lang: string, query: Record<string, string>): Promise<string> {
  const type = query.type || ''
  const sector = query.sector || ''
  const year = query.year || ''
  
  let sql = 'SELECT * FROM publications WHERE is_published = 1'
  const params: any[] = []
  if (type) { sql += ' AND type = ?'; params.push(type) }
  if (sector) { sql += ' AND sector = ?'; params.push(sector) }
  if (year) { sql += ' AND year = ?'; params.push(parseInt(year)) }
  sql += ' ORDER BY year DESC, created_at DESC'
  
  const results = await db.prepare(sql).bind(...params).all()
  const publications = results.results || []

  // Get years for filter
  const yearsRes = await db.prepare('SELECT DISTINCT year FROM publications WHERE is_published = 1 ORDER BY year DESC').all()
  const years = (yearsRes.results || []).map((r: any) => r.year)

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">${t('Publications', 'Publications', lang)}</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('Publications', 'Publications', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl">${t(
      'Études, rapports, notes de conjoncture et publications officielles du CRADES.',
      'Studies, reports, economic outlook notes and official CRADES publications.',
      lang
    )}</p>
  </div>
</section>

<!-- Filters -->
<section class="bg-white border-b border-crades-gray-200 sticky top-16 lg:top-20 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <form method="GET" action="/publications" class="flex flex-wrap items-center gap-3">
      ${lang === 'en' ? '<input type="hidden" name="lang" value="en">' : ''}
      
      <!-- Type Filter -->
      <select name="type" onchange="this.form.submit()" class="px-3 py-2 bg-crades-gray-50 border border-crades-gray-200 rounded-lg text-sm text-crades-gray-700 focus:outline-none focus:border-crades-blue">
        <option value="">${t('Tous les types', 'All types', lang)}</option>
        ${Object.entries(typeLabels).map(([key, val]) => 
          `<option value="${key}" ${type === key ? 'selected' : ''}>${lang === 'en' ? val.en : val.fr}</option>`
        ).join('')}
      </select>
      
      <!-- Sector Filter -->
      <select name="sector" onchange="this.form.submit()" class="px-3 py-2 bg-crades-gray-50 border border-crades-gray-200 rounded-lg text-sm text-crades-gray-700 focus:outline-none focus:border-crades-blue">
        <option value="">${t('Tous les secteurs', 'All sectors', lang)}</option>
        ${Object.entries(sectorLabels).map(([key, val]) => 
          `<option value="${key}" ${sector === key ? 'selected' : ''}>${lang === 'en' ? val.en : val.fr}</option>`
        ).join('')}
      </select>
      
      <!-- Year Filter -->
      <select name="year" onchange="this.form.submit()" class="px-3 py-2 bg-crades-gray-50 border border-crades-gray-200 rounded-lg text-sm text-crades-gray-700 focus:outline-none focus:border-crades-blue">
        <option value="">${t('Toutes les années', 'All years', lang)}</option>
        ${years.map((y: number) => `<option value="${y}" ${year === String(y) ? 'selected' : ''}>${y}</option>`).join('')}
      </select>
      
      ${(type || sector || year) ? `
        <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-sm text-crades-blue hover:underline">
          <i class="fas fa-times mr-1"></i>${t('Réinitialiser', 'Reset', lang)}
        </a>
      ` : ''}
      
      <span class="text-sm text-crades-gray-400 ml-auto">${publications.length} ${t('résultat(s)', 'result(s)', lang)}</span>
    </form>
  </div>
</section>

<!-- Publications Grid -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${publications.length > 0 ? `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${publications.map((pub: any) => {
        const typeInfo = typeLabels[pub.type] || typeLabels['rapport']
        const sectorInfo = sectorLabels[pub.sector] || sectorLabels['general']
        return `
        <a href="/publications/${pub.slug}${lang === 'en' ? '?lang=en' : ''}" class="pub-card bg-white rounded-xl border border-crades-gray-200 overflow-hidden group">
          <div class="h-1.5 gold-accent"></div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3 flex-wrap">
              <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${typeInfo.color}">
                <i class="fas ${typeInfo.icon} text-[10px]"></i>
                ${lang === 'en' ? typeInfo.en : typeInfo.fr}
              </span>
              <span class="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-crades-gray-100 text-crades-gray-600">
                ${lang === 'en' ? sectorInfo.en : sectorInfo.fr}
              </span>
              <span class="text-xs text-crades-gray-400">${pub.year}</span>
            </div>
            <h3 class="font-semibold text-crades-gray-800 group-hover:text-crades-blue transition-colors line-clamp-2 mb-2">
              ${lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr}
            </h3>
            <p class="text-sm text-crades-gray-500 line-clamp-3 mb-4">
              ${lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-crades-gray-400"><i class="fas fa-user mr-1"></i>${pub.author}</span>
              <span class="text-sm text-crades-blue font-medium group-hover:underline">
                ${t('Lire', 'Read', lang)} <i class="fas fa-arrow-right ml-1"></i>
              </span>
            </div>
          </div>
        </a>`
      }).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <i class="fas fa-folder-open text-4xl text-crades-gray-300 mb-4"></i>
      <h3 class="text-lg font-semibold text-crades-gray-600">${t('Aucune publication trouvée', 'No publications found', lang)}</h3>
      <p class="text-crades-gray-500 mt-2">${t('Essayez de modifier vos filtres', 'Try adjusting your filters', lang)}</p>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: t('Publications', 'Publications', lang),
    description: t('Découvrez les publications du CRADES : études, rapports et analyses', 'Discover CRADES publications: studies, reports and analyses', lang),
    lang,
    path: '/publications'
  })
}

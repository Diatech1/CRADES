import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report' },
  'etude': { fr: 'Étude', en: 'Study' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication' },
  'tableau_bord': { fr: 'Tableau de bord', en: 'Dashboard' },
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

  const yearsRes = await db.prepare('SELECT DISTINCT year FROM publications WHERE is_published = 1 ORDER BY year DESC').all()
  const years = (yearsRes.results || []).map((r: any) => r.year)

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${t('Publications', 'Publications', lang)}</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('Publications', 'Publications', lang)}</h1>
    <p class="text-gray-400 mt-2 text-sm">${t('Études, rapports et analyses du CRADES.', 'CRADES studies, reports and analyses.', lang)}</p>
  </div>
</section>

<!-- Filters -->
<section class="border-b border-gray-100 bg-white sticky top-16 z-40">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3">
    <form method="GET" action="/publications" class="flex flex-wrap items-center gap-2">
      ${lang === 'en' ? '<input type="hidden" name="lang" value="en">' : ''}
      <select name="type" onchange="this.form.submit()" class="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-600">
        <option value="">${t('Type', 'Type', lang)}</option>
        ${Object.entries(typeLabels).map(([key, val]) => 
          `<option value="${key}" ${type === key ? 'selected' : ''}>${lang === 'en' ? val.en : val.fr}</option>`
        ).join('')}
      </select>
      <select name="sector" onchange="this.form.submit()" class="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-600">
        <option value="">${t('Secteur', 'Sector', lang)}</option>
        ${Object.entries(sectorLabels).map(([key, val]) => 
          `<option value="${key}" ${sector === key ? 'selected' : ''}>${lang === 'en' ? val.en : val.fr}</option>`
        ).join('')}
      </select>
      <select name="year" onchange="this.form.submit()" class="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-600">
        <option value="">${t('Année', 'Year', lang)}</option>
        ${years.map((y: number) => `<option value="${y}" ${year === String(y) ? 'selected' : ''}>${y}</option>`).join('')}
      </select>
      ${(type || sector || year) ? `<a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-xs text-gray-400 hover:text-gray-600 ml-1">&times; ${t('Réinitialiser', 'Reset', lang)}</a>` : ''}
      <span class="text-[11px] text-gray-400 ml-auto">${publications.length} ${t('résultat(s)', 'result(s)', lang)}</span>
    </form>
  </div>
</section>

<!-- List -->
<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${publications.length > 0 ? `
    <div class="divide-y divide-gray-100">
      ${publications.map((pub: any) => {
        const typeInfo = typeLabels[pub.type] || typeLabels['rapport']
        return `
        <a href="/publications/${pub.slug}${lang === 'en' ? '?lang=en' : ''}" class="flex items-start gap-4 py-5 group">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
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
    ` : `
    <div class="text-center py-16">
      <p class="text-sm text-gray-400">${t('Aucune publication trouvée.', 'No publications found.', lang)}</p>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: t('Publications', 'Publications', lang),
    description: t('Publications du CRADES', 'CRADES publications', lang),
    lang,
    path: '/publications'
  })
}

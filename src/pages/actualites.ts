import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const catIcons: Record<string, string> = { communique: 'fa-bullhorn', evenement: 'fa-calendar-alt', partenariat: 'fa-handshake', formation: 'fa-graduation-cap', general: 'fa-newspaper' }
const catColors: Record<string, string> = { communique: 'text-blue-600 bg-blue-50', evenement: 'text-purple-600 bg-purple-50', partenariat: 'text-amber-600 bg-amber-50', formation: 'text-green-600 bg-green-50', general: 'text-gray-600 bg-gray-50' }
const catLabels: Record<string, { fr: string; en: string }> = {
  communique: { fr: 'Communiqué', en: 'Press Release' },
  evenement: { fr: 'Événement', en: 'Event' },
  partenariat: { fr: 'Partenariat', en: 'Partnership' },
  formation: { fr: 'Formation', en: 'Training' },
  general: { fr: 'Général', en: 'General' },
}

export async function actualitesPage(db: D1Database, lang: string): Promise<string> {
  const actualites = await db.prepare('SELECT * FROM actualites WHERE is_published = 1 ORDER BY published_at DESC').all()

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">${t('Actualités', 'News', lang)}</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('Actualités', 'News', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl">${t(
      'Communiqués, événements et actualités du CRADES.',
      'Press releases, events and CRADES news.',
      lang
    )}</p>
  </div>
</section>

<!-- News List -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${(actualites.results || []).length > 0 ? `
    
    <!-- Featured (first article) -->
    ${((actualites.results || [])[0] as any) ? (() => {
      const featured = (actualites.results || [])[0] as any
      const catInfo = catLabels[featured.category] || catLabels.general
      return `
      <a href="/actualites/${featured.slug}${lang === 'en' ? '?lang=en' : ''}" class="block bg-white rounded-2xl border border-crades-gray-200 overflow-hidden hover:shadow-lg transition-shadow mb-8">
        <div class="p-8 lg:p-10">
          <div class="flex items-center gap-3 mb-4">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${catColors[featured.category] || catColors.general}">
              <i class="fas ${catIcons[featured.category] || catIcons.general}"></i>
              ${lang === 'en' ? catInfo.en : catInfo.fr}
            </span>
            <span class="text-sm text-crades-gray-400">${new Date(featured.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span class="text-xs font-medium text-crades-gold bg-crades-gold/10 px-2 py-0.5 rounded">${t('À la une', 'Featured', lang)}</span>
          </div>
          <h2 class="text-2xl font-bold text-crades-gray-800 mb-3 hover:text-crades-blue transition-colors">
            ${lang === 'en' ? featured.title_en || featured.title_fr : featured.title_fr}
          </h2>
          <p class="text-crades-gray-500 leading-relaxed max-w-3xl">
            ${lang === 'en' ? featured.excerpt_en || featured.excerpt_fr : featured.excerpt_fr}
          </p>
          <span class="inline-flex items-center gap-1 text-crades-blue font-medium mt-4 text-sm">
            ${t('Lire la suite', 'Read more', lang)} <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </a>`
    })() : ''}

    <!-- Other articles -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${(actualites.results || []).slice(1).map((actu: any) => {
        const catInfo = catLabels[actu.category] || catLabels.general
        return `
        <a href="/actualites/${actu.slug}${lang === 'en' ? '?lang=en' : ''}" class="pub-card bg-white rounded-xl border border-crades-gray-200 p-6 group">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${catColors[actu.category] || catColors.general}">
              <i class="fas ${catIcons[actu.category] || catIcons.general} text-[10px]"></i>
              ${lang === 'en' ? catInfo.en : catInfo.fr}
            </span>
            <span class="text-xs text-crades-gray-400">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h3 class="font-semibold text-crades-gray-800 group-hover:text-crades-blue transition-colors mb-2 line-clamp-2">
            ${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}
          </h3>
          <p class="text-sm text-crades-gray-500 line-clamp-3">
            ${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}
          </p>
        </a>`
      }).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <i class="fas fa-newspaper text-4xl text-crades-gray-300 mb-4"></i>
      <h3 class="text-lg font-semibold text-crades-gray-600">${t('Aucune actualité', 'No news', lang)}</h3>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: t('Actualités', 'News', lang),
    description: t('Actualités et communiqués du CRADES', 'CRADES news and press releases', lang),
    lang,
    path: lang === 'en' ? '/news' : '/actualites'
  })
}

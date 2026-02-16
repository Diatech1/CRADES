import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string; color: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report', color: 'bg-blue-100 text-blue-800' },
  'etude': { fr: 'Étude', en: 'Study', color: 'bg-emerald-100 text-emerald-800' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note', color: 'bg-amber-100 text-amber-800' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication', color: 'bg-purple-100 text-purple-800' },
}

export async function publicationDetailPage(db: D1Database, lang: string, slug: string): Promise<string> {
  const pub = await db.prepare('SELECT * FROM publications WHERE slug = ? AND is_published = 1').bind(slug).first() as any
  
  if (!pub) {
    return layout(`
      <section class="py-20 text-center">
        <i class="fas fa-file-excel text-5xl text-crades-gray-300 mb-4"></i>
        <h1 class="text-2xl font-bold text-crades-gray-700">${t('Publication non trouvée', 'Publication not found', lang)}</h1>
        <a href="/publications" class="text-crades-green hover:underline mt-4 inline-block">${t('Retour aux publications', 'Back to publications', lang)}</a>
      </section>
    `, { title: '404', lang })
  }

  // Get related publications
  const related = await db.prepare(
    'SELECT * FROM publications WHERE is_published = 1 AND id != ? AND (sector = ? OR type = ?) ORDER BY year DESC LIMIT 3'
  ).bind(pub.id, pub.sector, pub.type).all()

  const typeInfo = typeLabels[pub.type] || typeLabels['rapport']

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2">/</span>
      <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Publications', 'Publications', lang)}</a>
      <span class="mx-2">/</span>
      <span class="text-white">${lang === 'en' ? typeInfo.en : typeInfo.fr}</span>
    </nav>
    <div class="flex items-center gap-3 mb-4">
      <span class="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white">${lang === 'en' ? typeInfo.en : typeInfo.fr}</span>
      <span class="text-white/60 text-sm">${pub.year}</span>
      <span class="text-white/40">•</span>
      <span class="text-white/60 text-sm capitalize">${pub.sector}</span>
    </div>
    <h1 class="text-2xl lg:text-3xl font-bold text-white max-w-4xl">${lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr}</h1>
    <p class="text-white/70 mt-3 text-sm"><i class="fas fa-user mr-1"></i>${pub.author}</p>
  </div>
</section>

<!-- Content -->
<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6 lg:p-8">
          <h2 class="text-xl font-bold text-crades-gray-800 mb-4">${t('Résumé', 'Summary', lang)}</h2>
          <p class="text-crades-gray-600 leading-relaxed text-lg mb-6">
            ${lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr}
          </p>
          
          ${pub.content_fr || pub.content_en ? `
          <hr class="my-6 border-crades-gray-200">
          <div class="prose prose-gray max-w-none text-crades-gray-600 leading-relaxed">
            ${lang === 'en' ? pub.content_en || pub.content_fr : pub.content_fr}
          </div>
          ` : ''}

          <!-- Download Actions -->
          <div class="mt-8 p-6 bg-crades-gray-50 rounded-xl border border-crades-gray-200">
            <h3 class="font-semibold text-crades-gray-800 mb-3">${t('Télécharger', 'Download', lang)}</h3>
            <div class="flex flex-wrap gap-3">
              <button class="inline-flex items-center gap-2 bg-crades-green text-white px-5 py-2.5 rounded-lg font-medium hover:bg-crades-green-dark transition-colors">
                <i class="fas fa-file-pdf"></i>
                ${t('Télécharger PDF', 'Download PDF', lang)}
              </button>
              ${pub.csv_url ? `
              <button class="inline-flex items-center gap-2 bg-white text-crades-gray-700 border border-crades-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-crades-gray-50 transition-colors">
                <i class="fas fa-file-csv"></i>
                ${t('Télécharger CSV', 'Download CSV', lang)}
              </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Metadata -->
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6">
          <h3 class="font-semibold text-crades-gray-800 mb-4">${t('Informations', 'Information', lang)}</h3>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-crades-gray-500">${t('Type', 'Type', lang)}</dt>
              <dd class="font-medium text-crades-gray-700">${lang === 'en' ? typeInfo.en : typeInfo.fr}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-crades-gray-500">${t('Secteur', 'Sector', lang)}</dt>
              <dd class="font-medium text-crades-gray-700 capitalize">${pub.sector}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-crades-gray-500">${t('Année', 'Year', lang)}</dt>
              <dd class="font-medium text-crades-gray-700">${pub.year}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-crades-gray-500">${t('Auteur', 'Author', lang)}</dt>
              <dd class="font-medium text-crades-gray-700 text-right">${pub.author}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-crades-gray-500">${t('Publié le', 'Published', lang)}</dt>
              <dd class="font-medium text-crades-gray-700">${new Date(pub.created_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR')}</dd>
            </div>
          </dl>
        </div>

        <!-- Share -->
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6">
          <h3 class="font-semibold text-crades-gray-800 mb-3">${t('Partager', 'Share', lang)}</h3>
          <div class="flex gap-2">
            <button onclick="navigator.clipboard.writeText(window.location.href)" class="flex-1 py-2 bg-crades-gray-50 rounded-lg text-sm text-crades-gray-600 hover:bg-crades-gray-100 transition-colors">
              <i class="fas fa-link mr-1"></i> ${t('Copier le lien', 'Copy link', lang)}
            </button>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent('https://crades.gouv.sn/publications/' + pub.slug)}" target="_blank" class="w-10 h-10 bg-crades-gray-50 rounded-lg flex items-center justify-center text-crades-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://crades.gouv.sn/publications/' + pub.slug)}" target="_blank" class="w-10 h-10 bg-crades-gray-50 rounded-lg flex items-center justify-center text-crades-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Related -->
        ${(related.results || []).length > 0 ? `
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6">
          <h3 class="font-semibold text-crades-gray-800 mb-4">${t('Publications liées', 'Related Publications', lang)}</h3>
          <div class="space-y-3">
            ${(related.results || []).map((r: any) => `
              <a href="/publications/${r.slug}${lang === 'en' ? '?lang=en' : ''}" class="block p-3 bg-crades-gray-50 rounded-lg hover:bg-crades-gray-100 transition-colors">
                <div class="text-sm font-medium text-crades-gray-700 line-clamp-2">${lang === 'en' ? r.title_en || r.title_fr : r.title_fr}</div>
                <div class="text-xs text-crades-gray-400 mt-1">${r.year} • ${r.sector}</div>
              </a>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr,
    description: lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr,
    lang,
    path: `/publications/${slug}`
  })
}

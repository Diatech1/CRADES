import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function actualiteDetailPage(db: D1Database, lang: string, slug: string): Promise<string> {
  const actu = await db.prepare('SELECT * FROM actualites WHERE slug = ? AND is_published = 1').bind(slug).first() as any

  if (!actu) {
    return layout(`
      <section class="py-20 text-center">
        <i class="fas fa-newspaper text-5xl text-crades-gray-300 mb-4"></i>
        <h1 class="text-2xl font-bold text-crades-gray-700">${t('Article non trouvé', 'Article not found', lang)}</h1>
        <a href="/actualites" class="text-crades-green hover:underline mt-4 inline-block">${t('Retour aux actualités', 'Back to news', lang)}</a>
      </section>
    `, { title: '404', lang })
  }

  const content = `
<section class="hero-gradient py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2">/</span>
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="hover:text-white">${t('Actualités', 'News', lang)}</a>
      <span class="mx-2">/</span>
      <span class="text-white">${actu.category}</span>
    </nav>
    <div class="flex items-center gap-3 mb-4">
      <span class="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white capitalize">${actu.category}</span>
      <span class="text-white/60 text-sm">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
    </div>
    <h1 class="text-2xl lg:text-3xl font-bold text-white max-w-4xl">${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}</h1>
  </div>
</section>

<section class="py-8 lg:py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl border border-crades-gray-200 p-6 lg:p-10">
      <p class="text-lg text-crades-gray-600 leading-relaxed mb-6 font-medium">
        ${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}
      </p>
      <hr class="my-6 border-crades-gray-200">
      <div class="prose prose-gray max-w-none text-crades-gray-600 leading-relaxed">
        ${lang === 'en' ? actu.content_en || actu.content_fr : actu.content_fr}
      </div>
      
      <div class="mt-8 pt-6 border-t border-crades-gray-200 flex items-center justify-between">
        <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-crades-green font-medium hover:underline">
          <i class="fas fa-arrow-left mr-1"></i> ${t('Retour aux actualités', 'Back to news', lang)}
        </a>
        <div class="flex gap-2">
          <button onclick="navigator.clipboard.writeText(window.location.href)" class="px-3 py-1.5 bg-crades-gray-50 rounded text-sm text-crades-gray-600 hover:bg-crades-gray-100">
            <i class="fas fa-link mr-1"></i> ${t('Copier', 'Copy', lang)}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr,
    description: lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr,
    lang,
    path: `/actualites/${slug}`
  })
}

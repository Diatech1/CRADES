import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function actualiteDetailPage(db: D1Database, lang: string, slug: string): Promise<string> {
  const actu = await db.prepare('SELECT * FROM actualites WHERE slug = ? AND is_published = 1').bind(slug).first() as any

  if (!actu) {
    return layout(`
      <section class="py-24 text-center">
        <h1 class="text-lg font-medium text-gray-600">${t('Article non trouve', 'Article not found', lang)}</h1>
        <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-xs text-brand-gold hover:underline mt-3 inline-block">${t('Retour aux actualites', 'Back to news', lang)}</a>
      </section>
    `, { title: '404', lang })
  }

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="hover:text-white">${t('Actualites', 'News', lang)}</a>
    </nav>
    <div class="flex items-center gap-2 mb-3 text-xs text-gray-400">
      <span class="text-brand-gold capitalize font-medium">${actu.category}</span>
      <span class="text-gray-600">&middot;</span>
      <span>${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
    </div>
    <h1 class="font-display text-xl lg:text-2xl text-white max-w-3xl">${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}</h1>
  </div>
</section>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <p class="text-sm text-gray-600 leading-relaxed font-medium">
      ${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}
    </p>
    <hr class="my-8 border-gray-100">
    <div class="text-sm text-gray-500 leading-relaxed space-y-4">
      ${lang === 'en' ? actu.content_en || actu.content_fr : actu.content_fr}
    </div>
    
    <div class="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-xs text-brand-gold hover:underline">
        <i class="fas fa-arrow-left mr-1"></i> ${t('Retour aux actualites', 'Back to news', lang)}
      </a>
      <button onclick="navigator.clipboard.writeText(window.location.href)" class="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md transition-colors">
        <i class="fas fa-link mr-1"></i> ${t('Copier le lien', 'Copy link', lang)}
      </button>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr,
    description: lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr,
    lang,
    path: '/actualites/' + slug
  })
}

import { layout } from '../components/layout'
import { getPublicationBySlug, stripHtml, WPPost } from '../utils/wp-api'

export async function publicationDetailPage(slug: string): Promise<string> {
  const pub = await getPublicationBySlug(slug)

  if (!pub) {
    return layout(`
      <section class="py-20 text-center">
        <h1 class="font-display text-2xl text-gray-800">Publication non trouvée</h1>
        <p class="text-sm text-gray-400 mt-4">Cette publication n'existe pas ou a été supprimée.</p>
        <a href="/publications" class="text-sm text-brand-blue mt-6 inline-block hover:underline">&larr; Retour aux publications</a>
      </section>
    `, { title: 'Non trouvé', description: '', path: '/publications' })
  }

  const content = `
<section class="bg-brand-navy py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="/publications" class="hover:text-white">Publications</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${pub.title?.rendered || ''}</span>
    </nav>
  </div>
</section>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="mb-4 flex items-center gap-2">
      <span class="text-[10px] font-semibold text-white bg-brand-blue px-2 py-0.5 rounded">Publication</span>
      <span class="text-[11px] text-gray-400">${new Date(pub.date).getFullYear()}</span>
    </div>
    <h1 class="font-display text-2xl lg:text-3xl text-brand-navy font-bold leading-tight">${pub.title?.rendered || ''}</h1>

    <div class="mt-10 prose prose-sm max-w-none text-gray-700 leading-relaxed">
      ${pub.content?.rendered || '<p class="text-gray-400">Contenu non disponible.</p>'}
    </div>

    <div class="mt-12 pt-6 border-t border-gray-100">
      <a href="/publications" class="text-sm text-brand-blue hover:underline">&larr; Retour aux publications</a>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: pub.title?.rendered || 'Publication',
    description: stripHtml(pub.excerpt?.rendered || ''),
    path: `/publications/${slug}`
  })
}

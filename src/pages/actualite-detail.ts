import { layout } from '../components/layout'
import { getPostBySlug, stripHtml, formatDate, WPPost } from '../utils/wp-api'

export async function actualiteDetailPage(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)

  if (!post) {
    return layout(`
      <section class="py-20 text-center">
        <h1 class="font-display text-2xl text-gray-800">Article non trouvé</h1>
        <p class="text-sm text-gray-400 mt-4">Cette actualité n'existe pas ou a été supprimée.</p>
        <a href="/actualites" class="text-sm text-brand-blue mt-6 inline-block hover:underline">&larr; Retour aux actualités</a>
      </section>
    `, { title: 'Non trouvé', description: '', path: '/actualites' })
  }

  const content = `
<section class="bg-brand-navy py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <a href="/actualites" class="hover:text-white">Actualités</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${post.title?.rendered || ''}</span>
    </nav>
  </div>
</section>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <span class="text-xs text-gray-400">${formatDate(post.date)}</span>
    <h1 class="font-display text-2xl lg:text-3xl text-brand-navy font-bold leading-tight mt-2">${post.title?.rendered || ''}</h1>

    <div class="mt-10 prose prose-sm max-w-none text-gray-700 leading-relaxed">
      ${post.content?.rendered || '<p class="text-gray-400">Contenu non disponible.</p>'}
    </div>

    <div class="mt-12 pt-6 border-t border-gray-100">
      <a href="/actualites" class="text-sm text-brand-blue hover:underline">&larr; Retour aux actualités</a>
    </div>
  </div>
</section>
`
  return layout(content, {
    title: post.title?.rendered || 'Actualité',
    description: stripHtml(post.excerpt?.rendered || ''),
    path: `/actualites/${slug}`
  })
}

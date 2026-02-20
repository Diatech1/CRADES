import { layout } from '../components/layout'
import { getPosts, stripHtml, formatDate, WPPost } from '../utils/wp-api'

export async function actualitesPage(): Promise<string> {
  const posts = await getPosts(20)

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Actualités</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">Actualités</h1>
    <p class="text-gray-400 mt-2 text-sm">Les dernières nouvelles du CRADES.</p>
  </div>
</section>

<section class="py-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    ${posts.length > 0 ? `
    <div class="grid md:grid-cols-3 gap-6">
      ${posts.map((post: WPPost) => `
        <a href="/actualites/${post.slug}" class="bg-white rounded-lg border border-brand-ice/60 p-5 hover:border-brand-sky/40 hover:shadow-sm transition-all group">
          <span class="text-[11px] text-gray-400">${formatDate(post.date)}</span>
          <h3 class="text-sm font-medium text-gray-800 mt-2 group-hover:text-brand-blue transition-colors line-clamp-2">${post.title?.rendered || ''}</h3>
          <p class="text-xs text-gray-400 mt-2 line-clamp-3">${stripHtml(post.excerpt?.rendered || '')}</p>
        </a>
      `).join('')}
    </div>
    ` : `
    <div class="text-center py-16">
      <i class="fas fa-newspaper text-3xl mb-4 text-brand-ice"></i>
      <p class="text-sm text-gray-400">Aucune actualité pour le moment.</p>
      <p class="text-xs text-gray-300 mt-2">Ajoutez des articles depuis <a href="/admin" class="text-brand-blue underline">WordPress</a>.</p>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: 'Actualités',
    description: 'Les dernières nouvelles du CRADES',
    path: '/actualites'
  })
}

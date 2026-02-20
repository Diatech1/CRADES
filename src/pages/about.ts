import { layout } from '../components/layout'
import { getPageBySlug, WPPage } from '../utils/wp-api'

export async function aboutPage(): Promise<string> {
  // Try to fetch "our-story" or "a-propos" page from WordPress
  let page = await getPageBySlug('our-story')
  if (!page) page = await getPageBySlug('a-propos')

  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/" class="hover:text-white">Accueil</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">À propos</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">À propos du CRADES</h1>
    <p class="text-gray-400 mt-2 text-sm">Centre de Recherche, d'Analyse des Échanges et Statistiques</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    ${page ? `
      <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        ${page.content?.rendered || ''}
      </div>
    ` : `
    <div class="space-y-8">
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Notre mission</h2>
        <p class="text-sm text-gray-600 leading-relaxed">Le CRADES est l'institution de référence pour la production, l'analyse et la diffusion de données économiques dans les domaines de l'industrie et du commerce au Sénégal. Rattaché au Ministère de l'Industrie et du Commerce, le CRADES a pour mission de fournir aux décideurs publics et aux acteurs économiques les informations statistiques nécessaires à la prise de décision.</p>
      </div>
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Nos activités</h2>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start gap-3"><i class="fas fa-chart-bar text-brand-blue mt-0.5"></i>Production et diffusion de statistiques industrielles et commerciales</li>
          <li class="flex items-start gap-3"><i class="fas fa-search text-brand-blue mt-0.5"></i>Études et analyses sectorielles</li>
          <li class="flex items-start gap-3"><i class="fas fa-file-alt text-brand-blue mt-0.5"></i>Publication de notes de conjoncture et rapports</li>
          <li class="flex items-start gap-3"><i class="fas fa-database text-brand-blue mt-0.5"></i>Gestion de bases de données ouvertes</li>
          <li class="flex items-start gap-3"><i class="fas fa-handshake text-brand-blue mt-0.5"></i>Appui aux politiques publiques</li>
        </ul>
      </div>
      <div>
        <h2 class="font-display text-xl text-brand-navy mb-4">Contact</h2>
        <p class="text-sm text-gray-600"><i class="fas fa-map-marker-alt text-brand-blue mr-2"></i>Rue Aimé Césaire, Plateau, Dakar, Sénégal</p>
        <p class="text-sm text-gray-600 mt-2"><i class="fas fa-phone text-brand-blue mr-2"></i>+221 33 889 12 34</p>
        <p class="text-sm text-gray-600 mt-2"><i class="fas fa-envelope text-brand-blue mr-2"></i>contact@crades.gouv.sn</p>
      </div>
    </div>
    `}
  </div>
</section>
`
  return layout(content, {
    title: 'À propos',
    description: 'À propos du CRADES - Centre de Recherche, d\'Analyse des Échanges et Statistiques',
    path: '/a-propos'
  })
}

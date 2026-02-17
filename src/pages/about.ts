import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function aboutPage(db: D1Database, lang: string): Promise<string> {
  const team = await db.prepare('SELECT * FROM team WHERE is_active = 1 ORDER BY display_order ASC').all()

  const content = `
<!-- Header -->
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">${t('À propos', 'About', lang)}</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('À propos du CRADES', 'About CRADES', lang)}</h1>
    <p class="text-gray-400 mt-2 max-w-xl text-sm">${t('Centre de Recherche, d\'Analyse des Echanges et Statistiques', 'Research, Analysis of Trade and Statistics Center', lang)}</p>
  </div>
</section>

<!-- Mission -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="max-w-2xl">
      <span class="text-xs font-semibold text-brand-gold uppercase tracking-widest">${t('Notre mission', 'Our mission', lang)}</span>
      <h2 class="font-display text-xl text-gray-800 mt-3">${t('Éclairer les décisions par la donnée', 'Informing decisions through data', lang)}</h2>
      <div class="mt-5 space-y-4 text-sm text-gray-500 leading-relaxed">
        <p>${t(
          'Le Centre de Recherche, d\'Analyse des Echanges et Statistiques (CRADES) est une institution publique rattachée au Ministère de l\'Industrie et du Commerce du Sénégal. Créé pour renforcer la capacité analytique de l\'État en matière de politique industrielle et commerciale, le CRADES constitue le pilier statistique du développement économique national.',
          'The Research, Analysis of Trade and Statistics Center (CRADES) is a public institution affiliated with the Ministry of Industry and Trade of Senegal.',
          lang
        )}</p>
        <p>${t(
          'Sa mission principale est de produire, analyser et diffuser des données fiables et actualisées sur les secteurs industriel, commercial et artisanal du Sénégal.',
          'Its main mission is to produce, analyze and disseminate reliable and up-to-date data on Senegal\'s industrial, commercial and artisanal sectors.',
          lang
        )}</p>
      </div>
    </div>
  </div>
</section>

<!-- Values -->
<section class="bg-gray-50/60 border-y border-gray-100 py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${[
        { icon: 'fa-shield-alt', titleFr: 'Rigueur', titleEn: 'Rigor', descFr: 'Méthodologies conformes aux standards internationaux', descEn: 'Methodologies aligned with international standards' },
        { icon: 'fa-unlock-alt', titleFr: 'Transparence', titleEn: 'Transparency', descFr: 'Données ouvertes et accessibles à tous', descEn: 'Open data accessible to all' },
        { icon: 'fa-lightbulb', titleFr: 'Innovation', titleEn: 'Innovation', descFr: 'Outils modernes d\'analyse et de visualisation', descEn: 'Modern analysis and visualization tools' },
        { icon: 'fa-users', titleFr: 'Service public', titleEn: 'Public service', descFr: 'Au service des citoyens et institutions', descEn: 'Serving citizens and institutions' },
      ].map(v => `
        <div>
          <i class="fas ${v.icon} text-brand-gold text-sm mb-3"></i>
          <h3 class="text-sm font-semibold text-gray-800">${lang === 'en' ? v.titleEn : v.titleFr}</h3>
          <p class="text-xs text-gray-400 mt-1 leading-relaxed">${lang === 'en' ? v.descEn : v.descFr}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Organisation -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="font-display text-xl text-gray-800 mb-8">${t('Organisation', 'Organization', lang)}</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${(team.results || []).map((member: any) => `
        <div class="border border-gray-100 rounded-lg p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-9 h-9 bg-brand-navy/5 rounded-full flex items-center justify-center text-xs font-semibold text-brand-blue">
              ${member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div class="text-sm font-medium text-gray-800">${member.name}</div>
              <div class="text-xs text-brand-gold">${lang === 'en' ? member.title_en : member.title_fr}</div>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">${lang === 'en' ? member.department_en : member.department_fr}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`
  return layout(content, {
    title: t('À propos', 'About', lang),
    description: t('Découvrez le CRADES, sa mission et son organisation', 'Discover CRADES, its mission and organization', lang),
    lang,
    path: lang === 'en' ? '/about' : '/a-propos'
  })
}

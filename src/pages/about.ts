import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function aboutPage(db: D1Database, lang: string): Promise<string> {
  const team = await db.prepare('SELECT * FROM team WHERE is_active = 1 ORDER BY display_order ASC').all()

  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">${t('À propos', 'About', lang)}</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('À propos du CRADES', 'About CRADES', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl text-lg">${t(
      'Centre de Recherche, d\'Analyse et des Statistiques - Institution rattachée au Ministère de l\'Industrie et du Commerce',
      'Research, Analysis and Statistics Center - Institution affiliated with the Ministry of Industry and Trade',
      lang
    )}</p>
  </div>
</section>

<!-- Mission Section -->
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12">
      <div>
        <div class="inline-flex items-center gap-2 bg-crades-green/10 text-crades-green px-3 py-1 rounded-full text-sm font-medium mb-4">
          <i class="fas fa-bullseye"></i> ${t('Notre Mission', 'Our Mission', lang)}
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-crades-gray-800 mb-6">${t(
          'Éclairer les décisions par la donnée',
          'Informing decisions through data',
          lang
        )}</h2>
        <div class="prose prose-gray max-w-none">
          <p class="text-crades-gray-600 leading-relaxed mb-4">${t(
            'Le Centre de Recherche, d\'Analyse et des Statistiques (CRADES) est une institution publique rattachée au Ministère de l\'Industrie et du Commerce du Sénégal. Créé pour renforcer la capacité analytique de l\'État en matière de politique industrielle et commerciale, le CRADES constitue le pilier statistique du développement économique national.',
            'The Research, Analysis and Statistics Center (CRADES) is a public institution affiliated with the Ministry of Industry and Trade of Senegal. Created to strengthen the State\'s analytical capacity in industrial and trade policy, CRADES is the statistical pillar of national economic development.',
            lang
          )}</p>
          <p class="text-crades-gray-600 leading-relaxed">${t(
            'Sa mission principale est de produire, analyser et diffuser des données fiables et actualisées sur les secteurs industriel, commercial et artisanal du Sénégal, au service des décideurs publics, du secteur privé, des chercheurs et des partenaires au développement.',
            'Its main mission is to produce, analyze and disseminate reliable and up-to-date data on Senegal\'s industrial, commercial and artisanal sectors, serving public decision-makers, the private sector, researchers and development partners.',
            lang
          )}</p>
        </div>
      </div>
      <div class="space-y-4">
        <div class="bg-crades-gray-50 rounded-xl p-6 border border-crades-gray-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-crades-green/10 rounded-lg flex items-center justify-center">
              <i class="fas fa-chart-bar text-crades-green"></i>
            </div>
            <h3 class="font-semibold text-crades-gray-800">${t('Production statistique', 'Statistical Production', lang)}</h3>
          </div>
          <p class="text-sm text-crades-gray-600">${t(
            'Collecte, traitement et publication d\'indicateurs clés sur l\'industrie, le commerce extérieur et les PME.',
            'Collection, processing and publication of key indicators on industry, foreign trade and SMEs.',
            lang
          )}</p>
        </div>
        <div class="bg-crades-gray-50 rounded-xl p-6 border border-crades-gray-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-crades-green/10 rounded-lg flex items-center justify-center">
              <i class="fas fa-search text-crades-green"></i>
            </div>
            <h3 class="font-semibold text-crades-gray-800">${t('Recherche & Analyse', 'Research & Analysis', lang)}</h3>
          </div>
          <p class="text-sm text-crades-gray-600">${t(
            'Études sectorielles, notes de conjoncture et analyses stratégiques pour orienter les politiques publiques.',
            'Sectoral studies, economic outlook notes and strategic analyses to guide public policies.',
            lang
          )}</p>
        </div>
        <div class="bg-crades-gray-50 rounded-xl p-6 border border-crades-gray-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-crades-green/10 rounded-lg flex items-center justify-center">
              <i class="fas fa-globe text-crades-green"></i>
            </div>
            <h3 class="font-semibold text-crades-gray-800">${t('Diffusion & Open Data', 'Dissemination & Open Data', lang)}</h3>
          </div>
          <p class="text-sm text-crades-gray-600">${t(
            'Mise à disposition publique des données via un portail web moderne et une API accessible.',
            'Public availability of data through a modern web portal and accessible API.',
            lang
          )}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Vision & Values -->
<section class="bg-crades-gray-50 py-12 lg:py-16 border-y border-crades-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-2xl lg:text-3xl font-bold text-crades-gray-800">${t('Vision & Valeurs', 'Vision & Values', lang)}</h2>
    </div>
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div class="bg-white rounded-xl p-8 border border-crades-gray-200">
        <div class="w-12 h-12 bg-crades-gold/20 rounded-xl flex items-center justify-center mb-4">
          <i class="fas fa-eye text-crades-gold text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-crades-gray-800 mb-3">${t('Notre Vision', 'Our Vision', lang)}</h3>
        <p class="text-crades-gray-600 leading-relaxed">${t(
          'Devenir le centre d\'excellence de référence en Afrique de l\'Ouest pour la production et l\'analyse de données économiques industrielles, au service d\'un Sénégal émergent et compétitif.',
          'Become the reference center of excellence in West Africa for the production and analysis of industrial economic data, serving an emerging and competitive Senegal.',
          lang
        )}</p>
      </div>
      <div class="bg-white rounded-xl p-8 border border-crades-gray-200">
        <div class="w-12 h-12 bg-crades-green/10 rounded-xl flex items-center justify-center mb-4">
          <i class="fas fa-scroll text-crades-green text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-crades-gray-800 mb-3">${t('Mandat Institutionnel', 'Institutional Mandate', lang)}</h3>
        <p class="text-crades-gray-600 leading-relaxed">${t(
          'Le CRADES est mandaté pour assurer le suivi statistique des secteurs productifs du Sénégal, formuler des recommandations de politique industrielle et contribuer à la planification économique nationale.',
          'CRADES is mandated to ensure statistical monitoring of Senegal\'s productive sectors, formulate industrial policy recommendations and contribute to national economic planning.',
          lang
        )}</p>
      </div>
    </div>
    
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${[
        { icon: 'fa-shield-alt', titleFr: 'Rigueur', titleEn: 'Rigor', descFr: 'Méthodologies conformes aux standards internationaux', descEn: 'Methodologies aligned with international standards' },
        { icon: 'fa-unlock-alt', titleFr: 'Transparence', titleEn: 'Transparency', descFr: 'Données ouvertes et accessibles à tous', descEn: 'Open data accessible to all' },
        { icon: 'fa-lightbulb', titleFr: 'Innovation', titleEn: 'Innovation', descFr: 'Outils modernes d\'analyse et de visualisation', descEn: 'Modern analysis and visualization tools' },
        { icon: 'fa-users', titleFr: 'Service public', titleEn: 'Public Service', descFr: 'Au service des citoyens et institutions', descEn: 'Serving citizens and institutions' },
      ].map(v => `
        <div class="text-center">
          <div class="w-14 h-14 bg-crades-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i class="fas ${v.icon} text-crades-green text-xl"></i>
          </div>
          <h4 class="font-semibold text-crades-gray-800 mb-1">${lang === 'en' ? v.titleEn : v.titleFr}</h4>
          <p class="text-sm text-crades-gray-500">${lang === 'en' ? v.descEn : v.descFr}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Organization Chart -->
<section class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-2xl lg:text-3xl font-bold text-crades-gray-800">${t('Organisation', 'Organization', lang)}</h2>
      <p class="text-crades-gray-500 mt-2">${t('L\'équipe de direction du CRADES', 'CRADES leadership team', lang)}</p>
    </div>
    
    <!-- Org Structure -->
    <div class="bg-crades-gray-50 rounded-2xl p-8 border border-crades-gray-200 mb-12">
      <div class="text-center mb-8">
        <div class="inline-block bg-crades-green text-white px-6 py-3 rounded-xl font-semibold">
          ${t('Ministère de l\'Industrie et du Commerce', 'Ministry of Industry and Trade', lang)}
        </div>
        <div class="w-0.5 h-8 bg-crades-gray-300 mx-auto"></div>
        <div class="inline-block bg-crades-gold text-crades-green-dark px-6 py-3 rounded-xl font-bold text-lg">
          CRADES
        </div>
        <div class="w-0.5 h-8 bg-crades-gray-300 mx-auto"></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${[
          { fr: 'Direction des Études et de la Recherche', en: 'Directorate of Studies and Research', icon: 'fa-microscope' },
          { fr: 'Division Statistiques et Collecte', en: 'Statistics and Collection Division', icon: 'fa-chart-pie' },
          { fr: 'Division Conjoncture et Prévision', en: 'Outlook and Forecasting Division', icon: 'fa-chart-line' },
          { fr: 'Division Données et Systèmes', en: 'Data and Systems Division', icon: 'fa-server' },
        ].map(d => `
          <div class="bg-white rounded-lg p-4 border border-crades-gray-200 text-center">
            <i class="fas ${d.icon} text-crades-green text-lg mb-2"></i>
            <div class="text-sm font-medium text-crades-gray-700">${lang === 'en' ? d.en : d.fr}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Team Members -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${(team.results || []).map((member: any) => `
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 bg-crades-green/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-crades-green font-bold text-lg">${member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</span>
            </div>
            <div>
              <h3 class="font-semibold text-crades-gray-800">${member.name}</h3>
              <p class="text-sm text-crades-green font-medium">${lang === 'en' ? member.title_en : member.title_fr}</p>
            </div>
          </div>
          <p class="text-sm text-crades-gray-500 mb-2">
            <i class="fas fa-building mr-1 text-crades-gray-400"></i>
            ${lang === 'en' ? member.department_en : member.department_fr}
          </p>
          <p class="text-sm text-crades-gray-600">${lang === 'en' ? member.bio_en || member.bio_fr : member.bio_fr}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Partners -->
<section class="bg-crades-gray-50 py-12 border-t border-crades-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-lg font-semibold text-crades-gray-600 mb-6">${t('Partenaires institutionnels', 'Institutional Partners', lang)}</h2>
    <div class="flex flex-wrap items-center justify-center gap-8 opacity-60">
      ${['ANSD', 'APIX', 'ONUDI', 'Banque Mondiale', 'CEDEAO', 'BAD'].map(p => `
        <div class="px-6 py-3 bg-white rounded-lg border border-crades-gray-200 text-sm font-semibold text-crades-gray-600">${p}</div>
      `).join('')}
    </div>
  </div>
</section>
`
  return layout(content, {
    title: t('À propos', 'About', lang),
    description: t('Découvrez le CRADES, sa mission, sa vision et son organisation', 'Discover CRADES, its mission, vision and organization', lang),
    lang,
    path: lang === 'en' ? '/about' : '/a-propos'
  })
}

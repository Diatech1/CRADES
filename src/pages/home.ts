import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

const typeLabels: Record<string, { fr: string; en: string }> = {
  'rapport': { fr: 'Rapport', en: 'Report' },
  'etude': { fr: 'Étude', en: 'Study' },
  'note_conjoncture': { fr: 'Note de conjoncture', en: 'Economic Note' },
  'publication_officielle': { fr: 'Publication officielle', en: 'Official Publication' },
  'tableau_bord': { fr: 'Tableau de bord', en: 'Dashboard' },
}

export async function homePage(db: D1Database, lang: string): Promise<string> {
  const indicators = await db.prepare('SELECT * FROM indicators WHERE is_active = 1 ORDER BY display_order ASC').all()
  const dashboards = await db.prepare('SELECT * FROM dashboards WHERE is_active = 1 ORDER BY display_order ASC').all()
  const publications = await db.prepare('SELECT * FROM publications WHERE is_published = 1 ORDER BY year DESC, created_at DESC LIMIT 4').all()
  const actualites = await db.prepare('SELECT * FROM actualites WHERE is_published = 1 ORDER BY published_at DESC LIMIT 3').all()

  const content = `
<!-- Hero -->
<section class="relative overflow-hidden bg-brand-frost">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 pb-28 lg:pb-32">
    <div class="max-w-xl">
      <h1 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
        ${t('Centre de Recherche, d\'Analyse et Statistiques', 'Research, Analysis and Statistics Centre', lang)}
      </h1>
      <p class="text-gray-600 mt-5 text-sm leading-relaxed">
        ${t(
          'Le CRADES produit et diffuse les statistiques, etudes et analyses strategiques sur l\'industrie et le commerce du Senegal.',
          'CRADES produces and disseminates statistics, studies and strategic analyses on Senegal\'s industry and trade.',
          lang
        )}
      </p>
      <div class="flex flex-wrap gap-4 mt-10">
        <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors shadow-sm">
          ${t('Publications', 'Publications', lang)}
        </a>
        <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="text-sm font-medium bg-white text-brand-navy px-5 py-2.5 rounded-lg hover:bg-white/80 transition-colors border border-brand-ice shadow-sm">
          ${t('Donnees ouvertes', 'Open data', lang)}
        </a>
      </div>
    </div>
  </div>

  <!-- Key stats strip at bottom -->
  <div class="absolute bottom-0 inset-x-0 bg-brand-navy/90">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        ${(indicators.results || []).slice(0, 4).map((ind: any) => `
          <div>
            <div class="text-lg sm:text-xl font-bold text-white">${ind.value}<span class="text-xs font-normal text-white/70 ml-1">${ind.unit}</span></div>
            <div class="text-[11px] text-white/50 mt-0.5">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- Dashboard charts -->
<section class="py-12 border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display text-xl text-gray-800">${t('Tableaux de bord', 'Dashboards', lang)}</h2>
      <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="text-xs text-brand-gold hover:underline">${t('Voir tout', 'View all', lang)} &rarr;</a>
    </div>
    <div class="grid lg:grid-cols-2 gap-6">
      ${(dashboards.results || []).map((d: any) => `
        <div class="border border-gray-100 rounded-lg p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-800">${lang === 'en' ? d.title_en : d.title_fr}</h3>
            <span class="text-[11px] text-gray-400 capitalize">${d.sector}</span>
          </div>
          <div class="bg-gray-50 rounded-md p-3">
            <canvas id="home-chart-${d.slug}" height="160"></canvas>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Mission -->
<section class="py-14 bg-brand-frost border-b border-brand-ice/50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid md:grid-cols-3 gap-8 text-center">
      <div>
        <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
          <i class="fas fa-chart-line text-brand-blue text-lg"></i>
        </div>
        <h3 class="font-semibold text-sm text-gray-800 mb-2">${t('Produire des statistiques', 'Produce statistics', lang)}</h3>
        <p class="text-xs text-gray-500 leading-relaxed">${t('Collecter, traiter et diffuser les donnees statistiques sur l\'industrie et le commerce du Senegal.', 'Collect, process and disseminate statistical data on Senegal\'s industry and trade.', lang)}</p>
      </div>
      <div>
        <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
          <i class="fas fa-microscope text-brand-blue text-lg"></i>
        </div>
        <h3 class="font-semibold text-sm text-gray-800 mb-2">${t('Analyser et rechercher', 'Analyze and research', lang)}</h3>
        <p class="text-xs text-gray-500 leading-relaxed">${t('Mener des etudes et analyses strategiques pour eclairer les politiques publiques et les acteurs economiques.', 'Conduct strategic studies and analyses to inform public policies and economic stakeholders.', lang)}</p>
      </div>
      <div>
        <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
          <i class="fas fa-globe-africa text-brand-blue text-lg"></i>
        </div>
        <h3 class="font-semibold text-sm text-gray-800 mb-2">${t('Accompagner les echanges', 'Support trade', lang)}</h3>
        <p class="text-xs text-gray-500 leading-relaxed">${t('Fournir aux operateurs economiques et aux institutions les outils necessaires au developpement des echanges commerciaux.', 'Provide economic operators and institutions with the tools needed to develop trade.', lang)}</p>
      </div>
    </div>
  </div>
</section>

<!-- Latest publications — Cards -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display text-xl text-gray-800">${t('Dernières publications', 'Latest publications', lang)}</h2>
      <a href="/publications${lang === 'en' ? '?lang=en' : ''}" class="text-xs text-brand-gold hover:underline">${t('Toutes les publications', 'All publications', lang)} &rarr;</a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${(publications.results || []).map((pub: any) => {
        const typeInfo = typeLabels[pub.type] || typeLabels['rapport']
        return `
        <a href="/publications/${pub.slug}${lang === 'en' ? '?lang=en' : ''}" class="bg-white border border-brand-ice/60 rounded-lg p-5 hover:border-brand-sky/40 hover:shadow-md transition-all group flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-semibold text-white bg-brand-blue px-2 py-0.5 rounded">${lang === 'en' ? typeInfo.en : typeInfo.fr}</span>
            <span class="text-[11px] text-gray-400">${pub.year}</span>
          </div>
          <h3 class="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors line-clamp-2 mb-2">${lang === 'en' ? pub.title_en || pub.title_fr : pub.title_fr}</h3>
          <p class="text-xs text-gray-400 line-clamp-2 mb-3 flex-1">${lang === 'en' ? pub.summary_en || pub.summary_fr : pub.summary_fr}</p>
          <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span class="text-[11px] text-gray-400 capitalize">${pub.sector}</span>
            <span class="text-xs text-brand-blue font-medium group-hover:translate-x-0.5 transition-transform">${t('Lire', 'Read', lang)} <i class="fas fa-arrow-right text-[9px] ml-0.5"></i></span>
          </div>
        </a>`
      }).join('')}
    </div>
  </div>
</section>

<!-- All indicators — Expanded grid with trends -->
<section class="bg-brand-frost border-b border-brand-ice/50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xs font-semibold text-gray-800 uppercase tracking-wider">${t('Indicateurs economiques', 'Economic indicators', lang)}</h2>
      <a href="/${lang === 'en' ? 'dashboards' : 'tableaux-de-bord'}" class="text-xs text-brand-gold hover:underline">${t('Tableaux de bord', 'Dashboards', lang)} &rarr;</a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
      ${(indicators.results || []).map((ind: any) => `
        <div class="bg-white border border-brand-ice/60 rounded-lg p-4 hover:border-brand-sky/40 hover:shadow-sm transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-gray-400 capitalize">${ind.sector}</span>
            <span class="inline-flex items-center gap-0.5 text-[11px] font-medium ${ind.change_direction === 'up' ? 'text-emerald-600' : ind.change_direction === 'down' ? 'text-red-500' : 'text-gray-400'}">
              <i class="fas fa-arrow-${ind.change_direction === 'up' ? 'up' : ind.change_direction === 'down' ? 'down' : 'right'} text-[8px]"></i>
              ${Math.abs(ind.change_percent)}%
            </span>
          </div>
          <div class="text-xl font-bold text-gray-800">${ind.value}<span class="text-xs font-normal text-gray-400 ml-1">${ind.unit}</span></div>
          <div class="text-xs text-gray-500 mt-1">${lang === 'en' ? ind.name_en : ind.name_fr}</div>
          <div class="text-[10px] text-gray-300 mt-1">${ind.period}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- Actualités — Minimal cards -->
<section class="bg-brand-frost border-y border-brand-ice/50 py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display text-xl text-gray-800">${t('Actualités', 'News', lang)}</h2>
      <a href="/${lang === 'en' ? 'news?lang=en' : 'actualites'}" class="text-xs text-brand-gold hover:underline">${t('Toutes les actualités', 'All news', lang)} &rarr;</a>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${(actualites.results || []).map((actu: any) => `
        <a href="/actualites/${actu.slug}${lang === 'en' ? '?lang=en' : ''}" class="bg-white rounded-lg border border-brand-ice/60 p-5 hover:border-brand-sky/40 hover:shadow-sm transition-all group">
          <span class="text-[11px] text-gray-400">${new Date(actu.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <h3 class="text-sm font-medium text-gray-800 mt-2 group-hover:text-brand-blue transition-colors line-clamp-2">${lang === 'en' ? actu.title_en || actu.title_fr : actu.title_fr}</h3>
          <p class="text-xs text-gray-400 mt-2 line-clamp-2">${lang === 'en' ? actu.excerpt_en || actu.excerpt_fr : actu.excerpt_fr}</p>
        </a>
      `).join('')}
    </div>
  </div>
</section>

<!-- CTA — Simple, understated -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
    <h2 class="font-display text-xl text-gray-800">${t('Accédez aux données ouvertes', 'Access open data', lang)}</h2>
    <p class="text-sm text-gray-400 mt-2 max-w-md mx-auto">${t('Téléchargez les jeux de données du CRADES ou intégrez nos indicateurs via l\'API publique.', 'Download CRADES datasets or integrate our indicators via the public API.', lang)}</p>
    <div class="flex items-center justify-center gap-3 mt-6">
      <a href="/${lang === 'en' ? 'data' : 'donnees'}" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
        ${t('Explorer les données', 'Explore data', lang)}
      </a>
      <a href="/api/indicators" class="text-sm font-medium text-gray-500 border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-300 transition-colors">
        API
      </a>
    </div>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const cfgs = [
    { id: 'home-chart-dashboard-industriel', label: '${t("Production industrielle", "Industrial production", lang)}', data: [98,102,105,108,112,115,118,121,119,123,125,127], color: '#044bad' },
    { id: 'home-chart-dashboard-commerce-exterieur', label: '${t("Balance commerciale", "Trade balance", lang)}', data: [-85,-78,-92,-88,-95,-80,-75,-89,-82,-90,-88,-89], color: '#b8943e' },
    { id: 'home-chart-dashboard-pme', label: '${t("Creations PME", "SME creations", lang)}', data: [320,380,410,350,420,460,480,510,490,530,550,580], color: '#3a7fd4' },
    { id: 'home-chart-dashboard-ipp', label: '${t("Indice des prix", "Price index", lang)}', data: [100,101.2,102.5,103.1,103.8,104.2,105.1,105.8,106.2,106.9,107.5,108.1], color: '#032d6b' },
  ];
  cfgs.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: { labels: ['J','F','M','A','M','J','J','A','S','O','N','D'], datasets: [{ label: c.label, data: c.data, borderColor: c.color, backgroundColor: c.color + '10', fill: true, tension: .4, pointRadius: 2, borderWidth: 1.5 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
    });
  });
});
</script>
`
  return layout(content, { 
    title: t('Accueil', 'Home', lang),
    description: t('CRADES - Institution de référence en données industrielles et commerciales du Sénégal', 'CRADES - Reference institution for industrial and commercial data in Senegal', lang),
    lang, 
    path: '/' 
  })
}

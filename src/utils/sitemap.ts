export async function sitemapXml(db: D1Database): Promise<string> {
  const baseUrl = 'https://crades.gouv.sn'
  
  // Get publications
  const pubs = await db.prepare('SELECT slug, updated_at FROM publications WHERE is_published = 1').all()
  const news = await db.prepare('SELECT slug, updated_at FROM actualites WHERE is_published = 1').all()

  const staticPages = [
    { url: '/', priority: '1.0', freq: 'daily' },
    { url: '/a-propos', priority: '0.8', freq: 'monthly' },
    { url: '/publications', priority: '0.9', freq: 'weekly' },
    { url: '/tableaux-de-bord', priority: '0.8', freq: 'weekly' },
    { url: '/donnees', priority: '0.9', freq: 'weekly' },
    { url: '/actualites', priority: '0.8', freq: 'daily' },
    { url: '/contact', priority: '0.6', freq: 'yearly' },
    // English versions
    { url: '/?lang=en', priority: '0.9', freq: 'daily' },
    { url: '/about', priority: '0.7', freq: 'monthly' },
    { url: '/dashboards', priority: '0.7', freq: 'weekly' },
    { url: '/data', priority: '0.8', freq: 'weekly' },
    { url: '/news', priority: '0.7', freq: 'daily' },
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  }

  for (const pub of (pubs.results || []) as any[]) {
    xml += `
  <url>
    <loc>${baseUrl}/publications/${pub.slug}</loc>
    <lastmod>${pub.updated_at ? new Date(pub.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/publications/${pub.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/publications/${pub.slug}?lang=en"/>
  </url>`
  }

  for (const actu of (news.results || []) as any[]) {
    xml += `
  <url>
    <loc>${baseUrl}/actualites/${actu.slug}</loc>
    <lastmod>${actu.updated_at ? new Date(actu.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  }

  xml += '\n</urlset>'
  return xml
}

export function schemaOrg() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "CRADES",
    "alternateName": "Centre de Recherche, d'Analyse des Echanges et Statistiques",
    "url": "https://crades.gouv.sn",
    "logo": "https://crades.gouv.sn/static/logo.png",
    "description": "Institution rattachée au Ministère de l'Industrie et du Commerce du Sénégal, spécialisée dans la recherche, l'analyse économique et les statistiques industrielles.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue Aimé Césaire, Plateau",
      "addressLocality": "Dakar",
      "addressRegion": "Dakar",
      "postalCode": "BP 123",
      "addressCountry": "SN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+221-33-889-1234",
      "contactType": "customer service",
      "email": "contact@crades.gouv.sn",
      "availableLanguage": ["French", "English"]
    },
    "parentOrganization": {
      "@type": "GovernmentOrganization",
      "name": "Ministère de l'Industrie et du Commerce du Sénégal"
    },
    "sameAs": [
      "https://twitter.com/CRADES_SN",
      "https://linkedin.com/company/crades-senegal"
    ],
    "knowsAbout": [
      "Industrial Statistics",
      "Trade Data",
      "Economic Analysis",
      "SME Research",
      "Senegal Economy"
    ]
  }
}

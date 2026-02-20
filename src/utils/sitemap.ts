import { getPosts, getPublications, WPPost } from './wp-api'

export async function sitemapXml(): Promise<string> {
  const baseUrl = 'https://crades.gouv.sn'
  
  // Get content from WordPress
  let pubs: WPPost[] = []
  let news: WPPost[] = []
  try {
    ;[pubs, news] = await Promise.all([
      getPublications(50),
      getPosts(50),
    ])
  } catch (e) {
    console.error('Sitemap: Error fetching WP data', e)
  }

  const staticPages = [
    { url: '/', priority: '1.0', freq: 'daily' },
    { url: '/a-propos', priority: '0.8', freq: 'monthly' },
    { url: '/publications', priority: '0.9', freq: 'weekly' },
    { url: '/tableaux-de-bord', priority: '0.8', freq: 'weekly' },
    { url: '/donnees', priority: '0.9', freq: 'weekly' },
    { url: '/actualites', priority: '0.8', freq: 'daily' },
    { url: '/contact', priority: '0.6', freq: 'yearly' },
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  }

  for (const pub of pubs) {
    const lastmod = pub.date ? new Date(pub.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    xml += `
  <url>
    <loc>${baseUrl}/publications/${pub.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  }

  for (const actu of news) {
    const lastmod = actu.date ? new Date(actu.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    xml += `
  <url>
    <loc>${baseUrl}/actualites/${actu.slug}</loc>
    <lastmod>${lastmod}</lastmod>
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
    "logo": "https://crades.gouv.sn/static/img/logo-crades.png",
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

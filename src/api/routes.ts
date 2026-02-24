import { Hono } from 'hono'
import {
  getPosts, getPostBySlug, getPublications, getPublicationBySlug,
  getIndicateurs, getDashboards, getDatasets,
  getPublicationTypes, getSectors, getCategories,
  stripHtml, formatDate, getFeaturedImage, getTerms, getWpUrl,
  WPPost
} from '../utils/wp-api'
import {
  getTradeOverview, getTradeTimeSeries, getTradeBySector,
  getTopPartners, getLatestAvailableYear, getTradeDashboardData
} from '../utils/wits-api'

const api = new Hono()

// ===============================
// PUBLIC API ENDPOINTS (WP PROXY)
// ===============================

/** GET /api/indicators — proxy to WP indicateur CPT */
api.get('/indicators', async (c) => {
  try {
    const indicators = await getIndicateurs(20)
    const mapped = indicators.map((ind: WPPost) => ({
      id: ind.id,
      name: ind.title?.rendered || '',
      value: ind.meta?.indicateur_value || '',
      unit: ind.meta?.indicateur_unit || '',
      change_percent: ind.meta?.indicateur_change_percent || 0,
      change_direction: ind.meta?.indicateur_change_direction || 'up',
      period: ind.meta?.indicateur_period || '',
    }))
    return c.json({ indicators: mapped, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ indicators: [], error: e.message }, 500)
  }
})

/** GET /api/publications — proxy to WP publication CPT */
api.get('/publications', async (c) => {
  try {
    const count = parseInt(c.req.query('limit') || '20')
    const publications = await getPublications(count)
    const mapped = publications.map((pub: WPPost) => ({
      id: pub.id,
      title: pub.title?.rendered || '',
      slug: pub.slug,
      date: pub.date,
      year: new Date(pub.date).getFullYear(),
      excerpt: stripHtml(pub.excerpt?.rendered || ''),
      image: getFeaturedImage(pub),
      terms: getTerms(pub),
    }))
    return c.json({ publications: mapped, total: mapped.length, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ publications: [], total: 0, error: e.message }, 500)
  }
})

/** GET /api/publications/:slug */
api.get('/publications/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const pub = await getPublicationBySlug(slug)
    if (!pub) return c.json({ error: 'Not found' }, 404)
    return c.json({
      publication: {
        id: pub.id,
        title: pub.title?.rendered || '',
        slug: pub.slug,
        date: pub.date,
        content: pub.content?.rendered || '',
        excerpt: stripHtml(pub.excerpt?.rendered || ''),
        image: getFeaturedImage(pub),
        meta: pub.meta,
      }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/actualites — proxy to WP posts */
api.get('/actualites', async (c) => {
  try {
    const count = parseInt(c.req.query('limit') || '20')
    const posts = await getPosts(count)
    const mapped = posts.map((post: WPPost) => ({
      id: post.id,
      title: post.title?.rendered || '',
      slug: post.slug,
      date: post.date,
      date_formatted: formatDate(post.date),
      excerpt: stripHtml(post.excerpt?.rendered || ''),
      image: getFeaturedImage(post),
      categories: getTerms(post, 0),
    }))
    return c.json({ actualites: mapped, total: mapped.length, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ actualites: [], total: 0, error: e.message }, 500)
  }
})

/** GET /api/actualites/:slug */
api.get('/actualites/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const post = await getPostBySlug(slug)
    if (!post) return c.json({ error: 'Not found' }, 404)
    return c.json({
      actualite: {
        id: post.id,
        title: post.title?.rendered || '',
        slug: post.slug,
        date: post.date,
        date_formatted: formatDate(post.date),
        content: post.content?.rendered || '',
        excerpt: stripHtml(post.excerpt?.rendered || ''),
        image: getFeaturedImage(post),
      }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/dashboards — proxy to WP dashboard CPT */
api.get('/dashboards', async (c) => {
  try {
    const dashboards = await getDashboards(10)
    const mapped = dashboards.map((d: WPPost) => ({
      id: d.id,
      title: d.title?.rendered || '',
      slug: d.slug,
      content: d.content?.rendered || '',
      meta: d.meta,
    }))
    return c.json({ dashboards: mapped, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ dashboards: [], error: e.message }, 500)
  }
})

/** GET /api/datasets — proxy to WP dataset CPT */
api.get('/datasets', async (c) => {
  try {
    const datasets = await getDatasets(20)
    const mapped = datasets.map((ds: WPPost) => ({
      id: ds.id,
      title: ds.title?.rendered || '',
      slug: ds.slug,
      date: ds.date,
      year: new Date(ds.date).getFullYear(),
      excerpt: stripHtml(ds.excerpt?.rendered || ''),
      meta: ds.meta,
    }))
    return c.json({ datasets: mapped, total: mapped.length, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ datasets: [], total: 0, error: e.message }, 500)
  }
})

/** GET /api/taxonomies — publication types and sectors */
api.get('/taxonomies', async (c) => {
  try {
    const [types, sectors, categories] = await Promise.all([
      getPublicationTypes(),
      getSectors(),
      getCategories(),
    ])
    return c.json({ publication_types: types, sectors, categories, source: 'wordpress' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/search — search across WP content */
api.get('/search', async (c) => {
  const q = c.req.query('q') || ''
  if (q.length < 2) return c.json({ results: [] })

  try {
    const wpUrl = getWpUrl()
    // Use WP REST API search endpoint
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/search?search=${encodeURIComponent(q)}&per_page=10`, {
      headers: { 'Accept': 'application/json' },
    })
    
    if (!res.ok) {
      return c.json({ results: [] })
    }

    const items = await res.json() as Array<{ id: number; title: string; url: string; type: string; subtype: string }>
    
    const results = items.map(item => {
      let url = '/'
      if (item.subtype === 'post') url = `/actualites/${item.url.split('/').filter(Boolean).pop()}`
      else if (item.subtype === 'publication') url = `/publications/${item.url.split('/').filter(Boolean).pop()}`
      else if (item.subtype === 'page') url = `/${item.url.split('/').filter(Boolean).pop()}`
      else url = item.url

      return {
        title: item.title,
        url,
        type: item.subtype === 'post' ? 'Actualité' 
            : item.subtype === 'publication' ? 'Publication'
            : item.subtype === 'page' ? 'Page'
            : item.subtype || item.type,
      }
    })

    return c.json({ results })
  } catch (e: any) {
    return c.json({ results: [], error: e.message })
  }
})

/** GET /api/stats — summary counts */
api.get('/stats', async (c) => {
  try {
    const wpUrl = getWpUrl()
    // Fetch counts from WP by requesting 1 item and reading X-WP-Total header
    const [pubRes, postRes, datasetRes] = await Promise.all([
      fetch(`${wpUrl}/wp-json/wp/v2/publication?per_page=1`),
      fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=1`),
      fetch(`${wpUrl}/wp-json/wp/v2/dataset?per_page=1`),
    ])

    return c.json({
      publications: parseInt(pubRes.headers.get('X-WP-Total') || '0'),
      actualites: parseInt(postRes.headers.get('X-WP-Total') || '0'),
      datasets: parseInt(datasetRes.headers.get('X-WP-Total') || '0'),
      source: 'wordpress',
    })
  } catch (e: any) {
    return c.json({ publications: 0, actualites: 0, datasets: 0, error: e.message })
  }
})

/** POST /api/contact — receive contact form (stores in WP or sends email) */
api.post('/contact', async (c) => {
  try {
    const { name, email, organization, subject, message } = await c.req.json()
    if (!name || !email || !message) {
      return c.json({ error: 'Nom, email et message sont obligatoires' }, 400)
    }
    
    // For now, log the contact and return success
    // In production, integrate with WP Contact Form 7 REST API or email service
    console.log(`[CONTACT] ${name} <${email}> — ${subject || 'N/A'}: ${message.substring(0, 100)}`)
    
    return c.json({ success: true, message: 'Message reçu avec succès' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/wp-info — WordPress connection info */
api.get('/wp-info', (c) => {
  return c.json({
    wordpress_url: getWpUrl(),
    architecture: 'headless',
    frontend: 'Hono + Cloudflare Pages',
    cms: 'WordPress REST API',
    cache_ttl: '60s',
  })
})

// ===============================
// TRADE DATA API (WITS / WORLD BANK)
// ===============================

/** GET /api/trade/overview — current year trade overview */
api.get('/trade/overview', async (c) => {
  try {
    const year = parseInt(c.req.query('year') || '') || await getLatestAvailableYear()
    const overview = await getTradeOverview(year)
    if (!overview) return c.json({ error: 'No data available' }, 404)
    return c.json({
      ...overview,
      totalExports_millions: Math.round(overview.totalExports / 1000),
      totalImports_millions: Math.round(overview.totalImports / 1000),
      tradeBalance_millions: Math.round(overview.tradeBalance / 1000),
      unit: 'US$ thousands (raw) / US$ millions (formatted)',
      source: 'WITS - World Bank',
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/trade/timeseries — trade evolution over years */
api.get('/trade/timeseries', async (c) => {
  try {
    const start = parseInt(c.req.query('start') || '2013')
    const end = parseInt(c.req.query('end') || '') || await getLatestAvailableYear()
    const ts = await getTradeTimeSeries(start, end)
    return c.json({ ...ts, unit: 'US$ millions', source: 'WITS - World Bank' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/trade/sectors — trade by product sector */
api.get('/trade/sectors', async (c) => {
  try {
    const year = parseInt(c.req.query('year') || '') || await getLatestAvailableYear()
    const sectors = await getTradeBySector(year)
    return c.json({ year, sectors, unit: 'US$ millions', source: 'WITS - World Bank' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/trade/partners/exports — top export destinations */
api.get('/trade/partners/exports', async (c) => {
  try {
    const year = parseInt(c.req.query('year') || '') || await getLatestAvailableYear()
    const limit = parseInt(c.req.query('limit') || '10')
    const partners = await getTopPartners(year, 'XPRT-TRD-VL', limit)
    return c.json({ year, partners, unit: 'US$ millions', source: 'WITS - World Bank' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/trade/partners/imports — top import origins */
api.get('/trade/partners/imports', async (c) => {
  try {
    const year = parseInt(c.req.query('year') || '') || await getLatestAvailableYear()
    const limit = parseInt(c.req.query('limit') || '10')
    const partners = await getTopPartners(year, 'MPRT-TRD-VL', limit)
    return c.json({ year, partners, unit: 'US$ millions', source: 'WITS - World Bank' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

/** GET /api/trade/dashboard — complete dashboard data */
api.get('/trade/dashboard', async (c) => {
  try {
    const data = await getTradeDashboardData()
    return c.json(data)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export { api as apiRoutes }

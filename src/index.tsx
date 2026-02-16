import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { apiRoutes } from './api/routes'
import { homePage } from './pages/home'
import { aboutPage } from './pages/about'
import { publicationsPage } from './pages/publications'
import { publicationDetailPage } from './pages/publication-detail'
import { dashboardsPage } from './pages/dashboards'
import { dataPage } from './pages/data'
import { actualitesPage } from './pages/actualites'
import { actualiteDetailPage } from './pages/actualite-detail'
import { contactPage } from './pages/contact'
import { adminPage } from './pages/admin'
import { sitemapXml } from './utils/sitemap'
import { schemaOrg } from './utils/seo'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS for API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Rate limiting simple
const requestCounts = new Map<string, { count: number; resetAt: number }>()
app.use('/api/*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || 'unknown'
  const now = Date.now()
  const record = requestCounts.get(ip)
  if (record && record.resetAt > now) {
    if (record.count > 100) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }
    record.count++
  } else {
    requestCounts.set(ip, { count: 1, resetAt: now + 60000 })
  }
  await next()
})

// API routes
app.route('/api', apiRoutes)

// Sitemap
app.get('/sitemap.xml', async (c) => {
  const xml = await sitemapXml(c.env.DB)
  return c.text(xml, 200, { 'Content-Type': 'application/xml' })
})

// Schema.org JSON-LD
app.get('/schema.json', (c) => {
  return c.json(schemaOrg())
})

// Page routes
app.get('/', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await homePage(c.env.DB, lang))
})

app.get('/a-propos', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await aboutPage(c.env.DB, lang))
})

app.get('/about', async (c) => {
  return c.html(await aboutPage(c.env.DB, 'en'))
})

app.get('/publications', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await publicationsPage(c.env.DB, lang, c.req.query()))
})

app.get('/publications/:slug', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await publicationDetailPage(c.env.DB, lang, c.req.param('slug')))
})

app.get('/tableaux-de-bord', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await dashboardsPage(c.env.DB, lang))
})

app.get('/dashboards', async (c) => {
  return c.html(await dashboardsPage(c.env.DB, 'en'))
})

app.get('/donnees', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await dataPage(c.env.DB, lang))
})

app.get('/data', async (c) => {
  return c.html(await dataPage(c.env.DB, 'en'))
})

app.get('/actualites', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await actualitesPage(c.env.DB, lang))
})

app.get('/actualites/:slug', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await actualiteDetailPage(c.env.DB, lang, c.req.param('slug')))
})

app.get('/news', async (c) => {
  return c.html(await actualitesPage(c.env.DB, 'en'))
})

app.get('/contact', async (c) => {
  const lang = c.req.query('lang') || 'fr'
  return c.html(await contactPage(c.env.DB, lang))
})

// Admin panel
app.get('/admin', async (c) => {
  return c.html(await adminPage(c.env.DB))
})
app.get('/admin/*', async (c) => {
  return c.html(await adminPage(c.env.DB))
})

export default app

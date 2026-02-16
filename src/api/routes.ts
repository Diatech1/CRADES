import { Hono } from 'hono'

type Bindings = { DB: D1Database }
const api = new Hono<{ Bindings: Bindings }>()

// Initialize database tables
api.get('/init', async (c) => {
  const db = c.env.DB
  try {
    const stmts = [
      db.prepare(`CREATE TABLE IF NOT EXISTS publications (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title_fr TEXT NOT NULL, title_en TEXT DEFAULT '', slug TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL, summary_fr TEXT DEFAULT '', summary_en TEXT DEFAULT '', content_fr TEXT DEFAULT '', content_en TEXT DEFAULT '',
        sector TEXT DEFAULT 'general', year INTEGER DEFAULT 2024, author TEXT DEFAULT '', pdf_url TEXT DEFAULT '', csv_url TEXT DEFAULT '',
        thumbnail TEXT DEFAULT '', is_featured INTEGER DEFAULT 0, is_published INTEGER DEFAULT 1, download_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS indicators (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name_fr TEXT NOT NULL, name_en TEXT DEFAULT '', value TEXT NOT NULL, unit TEXT DEFAULT '',
        change_percent REAL DEFAULT 0, change_direction TEXT DEFAULT 'up', sector TEXT DEFAULT 'general', period TEXT DEFAULT '',
        source TEXT DEFAULT 'CRADES', icon TEXT DEFAULT 'chart-line', display_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS actualites (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title_fr TEXT NOT NULL, title_en TEXT DEFAULT '', slug TEXT UNIQUE NOT NULL,
        excerpt_fr TEXT DEFAULT '', excerpt_en TEXT DEFAULT '', content_fr TEXT DEFAULT '', content_en TEXT DEFAULT '',
        category TEXT DEFAULT 'general', image TEXT DEFAULT '', is_featured INTEGER DEFAULT 0, is_published INTEGER DEFAULT 1,
        published_at DATETIME DEFAULT CURRENT_TIMESTAMP, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS dashboards (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title_fr TEXT NOT NULL, title_en TEXT DEFAULT '', slug TEXT UNIQUE NOT NULL,
        description_fr TEXT DEFAULT '', description_en TEXT DEFAULT '', embed_url TEXT DEFAULT '', embed_type TEXT DEFAULT 'iframe',
        sector TEXT DEFAULT 'general', thumbnail TEXT DEFAULT '', display_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS datasets (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title_fr TEXT NOT NULL, title_en TEXT DEFAULT '', slug TEXT UNIQUE NOT NULL,
        description_fr TEXT DEFAULT '', description_en TEXT DEFAULT '', sector TEXT DEFAULT 'general', year INTEGER DEFAULT 2024,
        format TEXT DEFAULT 'csv', file_url TEXT DEFAULT '', file_size TEXT DEFAULT '', download_count INTEGER DEFAULT 0,
        license TEXT DEFAULT 'open-data', is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS team (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, title_fr TEXT DEFAULT '', title_en TEXT DEFAULT '',
        department_fr TEXT DEFAULT '', department_en TEXT DEFAULT '', photo TEXT DEFAULT '', bio_fr TEXT DEFAULT '', bio_en TEXT DEFAULT '',
        email TEXT DEFAULT '', display_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, organization TEXT DEFAULT '',
        subject TEXT DEFAULT '', message TEXT NOT NULL, is_read INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, full_name TEXT DEFAULT '',
        role TEXT DEFAULT 'editor', is_active INTEGER DEFAULT 1, last_login DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
      db.prepare(`CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE NOT NULL, value TEXT DEFAULT '', updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`),
    ]
    await db.batch(stmts)
    return c.json({ success: true, message: 'Database initialized' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Seed database
api.get('/seed', async (c) => {
  const db = c.env.DB
  try {
    // Indicators - use batch with individual inserts
    const indicatorStmts = [
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (1, 'PIB Industriel', 'Industrial GDP', '2 847', 'Mds FCFA', 4.7, 'up', 'industrie', 'T3 2025', 'industry', 1)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (2, 'Exportations', 'Exports', '1 523', 'Mds FCFA', 8.2, 'up', 'commerce', 'T3 2025', 'ship', 2)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (3, 'PME Enregistrées', 'Registered SMEs', '47 832', '', 12.3, 'up', 'pme', '2025', 'building', 3)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (4, 'Indice Production', 'Production Index', '127.4', 'pts', 3.1, 'up', 'industrie', 'Oct 2025', 'chart-line', 4)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (5, 'Balance Commerciale', 'Trade Balance', '-892', 'Mds FCFA', -2.1, 'down', 'commerce', 'T3 2025', 'balance-scale', 5)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (6, 'Emplois Industrie', 'Industrial Jobs', '234 500', '', 5.6, 'up', 'industrie', '2025', 'users', 6)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (7, 'IDE Reçus', 'FDI Received', '485', 'Mds FCFA', 15.2, 'up', 'general', '2025', 'globe-africa', 7)`),
      db.prepare(`INSERT OR REPLACE INTO indicators (id, name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (8, 'Taux Utilisation Capacité', 'Capacity Util. Rate', '68.3', '%', 1.8, 'up', 'industrie', 'T3 2025', 'gauge-high', 8)`),
    ]
    await db.batch(indicatorStmts)

    // Publications - use parameterized queries to handle single quotes
    const pubStmt = db.prepare('INSERT OR REPLACE INTO publications (id, title_fr, title_en, slug, type, summary_fr, summary_en, sector, year, author, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const pubData = [
      [1, 'Rapport Annuel sur l\'Industrie Sénégalaise 2025', 'Annual Report on Senegalese Industry 2025', 'rapport-annuel-industrie-2025', 'rapport', 'Analyse complète du tissu industriel sénégalais : performances, défis et perspectives.', 'Complete analysis of the Senegalese industrial fabric.', 'industrie', 2025, 'Direction des Études - CRADES', 1],
      [2, 'Note de Conjoncture Économique - T3 2025', 'Economic Outlook Note - Q3 2025', 'note-conjoncture-t3-2025', 'note_conjoncture', 'Synthèse trimestrielle des indicateurs macroéconomiques du commerce et de l\'industrie.', 'Quarterly synthesis of macroeconomic indicators.', 'general', 2025, 'Service Conjoncture - CRADES', 1],
      [3, 'Étude sur les PME et le Commerce Digital', 'Study on SMEs and Digital Commerce', 'etude-pme-commerce-digital', 'etude', 'Cartographie du commerce digital au Sénégal : adoption, freins et opportunités pour les PME.', 'Mapping of digital commerce in Senegal.', 'pme', 2025, 'Division Recherche - CRADES', 1],
      [4, 'Statistiques du Commerce Extérieur - 2025', 'Foreign Trade Statistics - 2025', 'stats-commerce-exterieur-2025', 'publication_officielle', 'Données complètes sur les importations et exportations du Sénégal.', 'Complete data on Senegal imports and exports.', 'commerce', 2025, 'CRADES / ANSD', 0],
      [5, 'Indice de la Production Industrielle - Oct 2025', 'Industrial Production Index - Oct 2025', 'ipi-octobre-2025', 'rapport', 'Publication mensuelle de l\'indice de production industrielle.', 'Monthly publication of the industrial production index.', 'industrie', 2025, 'Service Statistiques - CRADES', 0],
      [6, 'Rapport sur l\'Artisanat et les Métiers', 'Report on Crafts and Trades', 'rapport-artisanat-metiers-2024', 'rapport', 'État des lieux du secteur artisanal : formation, financement, marchés.', 'Overview of the artisanal sector.', 'artisanat', 2024, 'Division Artisanat - CRADES', 0],
      [7, 'Étude sur la Transformation Minière', 'Study on Mining Transformation', 'etude-transformation-miniere-2024', 'etude', 'Potentiel de transformation locale des ressources minières.', 'Potential for local transformation of mining resources.', 'mines', 2024, 'Division Recherche - CRADES', 0],
      [8, 'Note sur la Compétitivité Industrielle', 'Note on Industrial Competitiveness', 'note-competitivite-industrielle-2024', 'note_conjoncture', 'Analyse comparative de la compétitivité industrielle du Sénégal.', 'Comparative analysis of industrial competitiveness.', 'industrie', 2024, 'Direction Analyse - CRADES', 0],
      [9, 'Cartographie des Zones Industrielles', 'Mapping of Industrial Zones', 'cartographie-zones-industrielles-2024', 'publication_officielle', 'Inventaire et analyse des zones industrielles du Sénégal.', 'Inventory and analysis of industrial zones.', 'industrie', 2024, 'CRADES / APIX', 0],
      [10, 'Étude sur l\'Énergie et l\'Industrie', 'Study on Energy and Industry', 'etude-energie-industrie-2024', 'etude', 'Impact des coûts énergétiques sur la compétitivité industrielle.', 'Impact of energy costs on industrial competitiveness.', 'energie', 2024, 'Direction des Études - CRADES', 0],
      [11, 'Annuaire Statistique de l\'Industrie 2023', 'Industrial Statistical Yearbook 2023', 'annuaire-statistique-industrie-2023', 'publication_officielle', 'Recueil exhaustif des données statistiques sur le secteur industriel.', 'Comprehensive collection of industrial statistical data.', 'industrie', 2023, 'CRADES', 0],
      [12, 'Rapport Commerce Intra-Africain (ZLECAf)', 'Report on Intra-African Trade (AfCFTA)', 'rapport-commerce-intra-africain-2023', 'rapport', 'Opportunités et défis pour le Sénégal dans la ZLECAf.', 'Opportunities and challenges for Senegal in AfCFTA.', 'commerce', 2023, 'Division Recherche - CRADES', 0],
    ]
    await db.batch(pubData.map(p => pubStmt.bind(...p)))

    // Dashboards
    const dashStmt = db.prepare('INSERT OR REPLACE INTO dashboards (id, title_fr, title_en, slug, description_fr, description_en, embed_type, sector, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    await db.batch([
      dashStmt.bind(1, 'Tableau de Bord Industriel', 'Industrial Dashboard', 'dashboard-industriel', 'Suivi en temps réel des indicateurs clés de l\'industrie sénégalaise.', 'Real-time monitoring of key industry indicators.', 'custom', 'industrie', 1),
      dashStmt.bind(2, 'Commerce Extérieur', 'Foreign Trade', 'dashboard-commerce-exterieur', 'Visualisation interactive des flux commerciaux du Sénégal.', 'Interactive visualization of trade flows.', 'custom', 'commerce', 2),
      dashStmt.bind(3, 'Dynamique des PME', 'SME Dynamics', 'dashboard-pme', 'Indicateurs de suivi du tissu PME.', 'SME monitoring indicators.', 'custom', 'pme', 3),
      dashStmt.bind(4, 'Indice des Prix à la Production', 'Producer Price Index', 'dashboard-ipp', 'Suivi mensuel de l\'indice des prix à la production.', 'Monthly monitoring of the producer price index.', 'custom', 'industrie', 4),
    ])

    // Datasets
    const dsStmt = db.prepare('INSERT OR REPLACE INTO datasets (id, title_fr, title_en, slug, description_fr, description_en, sector, year, format, file_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    await db.batch([
      dsStmt.bind(1, 'Production Industrielle Mensuelle 2025', 'Monthly Industrial Production 2025', 'production-industrielle-mensuelle-2025', 'Données mensuelles de production industrielle.', 'Monthly industrial production data.', 'industrie', 2025, 'csv', '2.4 MB'),
      dsStmt.bind(2, 'Commerce Extérieur par Produit 2025', 'Foreign Trade by Product 2025', 'commerce-exterieur-produit-2025', 'Importations et exportations détaillées par code SH6.', 'Detailed imports and exports by HS6 code.', 'commerce', 2025, 'csv', '15.7 MB'),
      dsStmt.bind(3, 'Répertoire des Entreprises Industrielles 2024', 'Directory of Industrial Enterprises 2024', 'repertoire-entreprises-2024', 'Liste des entreprises industrielles actives.', 'List of active industrial enterprises.', 'industrie', 2024, 'xlsx', '8.3 MB'),
      dsStmt.bind(4, 'Indices des Prix à la Production 2020-2025', 'Producer Price Indices 2020-2025', 'indices-prix-production-2020-2025', 'Séries chronologiques des indices de prix.', 'Time series of producer price indices.', 'industrie', 2025, 'csv', '1.1 MB'),
      dsStmt.bind(5, 'Données PME par Région 2024', 'SME Data by Region 2024', 'donnees-pme-region-2024', 'Répartition géographique des PME.', 'Geographic distribution of SMEs.', 'pme', 2024, 'csv', '3.6 MB'),
      dsStmt.bind(6, 'Balance Commerciale Trimestrielle 2015-2025', 'Quarterly Trade Balance 2015-2025', 'balance-commerciale-trimestrielle', 'Historique de la balance commerciale.', 'History of the trade balance.', 'commerce', 2025, 'csv', '4.2 MB'),
    ])

    // Actualites
    const newsStmt = db.prepare('INSERT OR REPLACE INTO actualites (id, title_fr, title_en, slug, excerpt_fr, excerpt_en, content_fr, category, is_featured, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    await db.batch([
      newsStmt.bind(1, 'Le CRADES lance son portail Open Data', 'CRADES launches Open Data portal', 'crades-lance-portail-open-data', 'Le Centre met à disposition du public un ensemble de jeux de données.', 'The Center makes available a set of datasets.', 'Dans le cadre de sa mission de transparence statistique, le CRADES lance son portail de données ouvertes. Ce portail permet aux chercheurs, investisseurs et décideurs d\'accéder librement aux données collectées et analysées par le Centre.', 'communique', 1, '2025-11-15'),
      newsStmt.bind(2, 'Séminaire sur la transformation industrielle', 'Seminar on industrial transformation', 'seminaire-transformation-industrielle', 'Le CRADES organise un séminaire international les 25-26 décembre 2025.', 'CRADES organizes an international seminar.', 'Le CRADES, en partenariat avec l\'ONUDI et la CEDEAO, organise un séminaire international de deux jours sur le thème Transformation industrielle et chaînes de valeur en Afrique de l\'Ouest.', 'evenement', 1, '2025-11-10'),
      newsStmt.bind(3, 'Partenariat CRADES-Banque Mondiale', 'CRADES-World Bank Partnership', 'partenariat-crades-banque-mondiale', 'Un accord de coopération technique signé.', 'A technical cooperation agreement signed.', 'Le CRADES et la Banque Mondiale ont signé un accord de coopération technique visant à renforcer les capacités statistiques du Centre.', 'partenariat', 0, '2025-10-28'),
      newsStmt.bind(4, 'Publication du rapport annuel 2025', 'Publication of 2025 annual report', 'publication-rapport-annuel-2025', 'Le rapport annuel 2025 est désormais disponible.', 'The 2025 annual report is now available.', 'Le CRADES publie son rapport annuel sur l\'industrie sénégalaise. Ce document de référence analyse les performances du secteur.', 'communique', 0, '2025-10-15'),
      newsStmt.bind(5, 'Formation analyse des données industrielles', 'Industrial data analysis training', 'formation-analyse-donnees', 'Le CRADES organise une session de formation.', 'CRADES organizes a training session.', 'Une session de formation de cinq jours sur les méthodes d\'analyse des données industrielles est organisée par le CRADES.', 'formation', 0, '2025-09-20'),
    ])

    // Team
    const teamStmt = db.prepare('INSERT OR REPLACE INTO team (id, name, title_fr, title_en, department_fr, department_en, bio_fr, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    await db.batch([
      teamStmt.bind(1, 'Dr. Amadou Ba', 'Directeur Général', 'Director General', 'Direction Générale', 'General Directorate', 'Économiste statisticien avec plus de 20 ans d\'expérience.', 1),
      teamStmt.bind(2, 'Dr. Fatou Diallo', 'Directrice des Études', 'Director of Studies', 'Direction des Études', 'Studies Directorate', 'Docteure en économie industrielle.', 2),
      teamStmt.bind(3, 'Ibrahima Ndiaye', 'Chef Division Statistiques', 'Head of Statistics', 'Division Statistiques', 'Statistics Division', 'Ingénieur statisticien expert en méthodologies d\'enquêtes.', 3),
      teamStmt.bind(4, 'Aïssatou Sow', 'Cheffe Division Conjoncture', 'Head of Outlook', 'Division Conjoncture', 'Outlook Division', 'Économiste macroéconomiste spécialisée.', 4),
      teamStmt.bind(5, 'Moussa Diop', 'Chef Division Données', 'Head of Data', 'Division Données', 'Data Division', 'Ingénieur informaticien en data science.', 5),
    ])

    // Settings
    const setStmt = db.prepare('INSERT OR REPLACE INTO site_settings (id, key, value) VALUES (?, ?, ?)')
    await db.batch([
      setStmt.bind(1, 'site_name_fr', 'CRADES - Centre de Recherche, d\'Analyse et des Statistiques'),
      setStmt.bind(2, 'site_name_en', 'CRADES - Research, Analysis and Statistics Center'),
      setStmt.bind(3, 'address', 'Immeuble CRADES, Rue Aimé Césaire, Plateau, Dakar, Sénégal'),
      setStmt.bind(4, 'phone', '+221 33 889 12 34'),
      setStmt.bind(5, 'email', 'contact@crades.gouv.sn'),
    ])

    return c.json({ success: true, message: 'Database seeded successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ===============================
// PUBLIC API ENDPOINTS
// ===============================

// GET /api/indicators
api.get('/indicators', async (c) => {
  const db = c.env.DB
  const sector = c.req.query('sector')
  let query = 'SELECT * FROM indicators WHERE is_active = 1'
  const params: string[] = []
  if (sector) { query += ' AND sector = ?'; params.push(sector) }
  query += ' ORDER BY display_order ASC'
  const { results } = await db.prepare(query).bind(...params).all()
  return c.json({ indicators: results })
})

// GET /api/publications
api.get('/publications', async (c) => {
  const db = c.env.DB
  const { type, sector, year, featured, limit, offset, search } = c.req.query() as any
  let query = 'SELECT * FROM publications WHERE is_published = 1'
  const params: any[] = []
  if (type) { query += ' AND type = ?'; params.push(type) }
  if (sector) { query += ' AND sector = ?'; params.push(sector) }
  if (year) { query += ' AND year = ?'; params.push(parseInt(year)) }
  if (featured) { query += ' AND is_featured = 1' }
  if (search) { query += ' AND (title_fr LIKE ? OR title_en LIKE ? OR summary_fr LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`) }
  query += ' ORDER BY year DESC, created_at DESC'
  if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)) }
  if (offset) { query += ' OFFSET ?'; params.push(parseInt(offset)) }
  const { results } = await db.prepare(query).bind(...params).all()
  // Count total
  let countQuery = 'SELECT COUNT(*) as total FROM publications WHERE is_published = 1'
  const countParams: any[] = []
  if (type) { countQuery += ' AND type = ?'; countParams.push(type) }
  if (sector) { countQuery += ' AND sector = ?'; countParams.push(sector) }
  if (year) { countQuery += ' AND year = ?'; countParams.push(parseInt(year)) }
  const countResult = await db.prepare(countQuery).bind(...countParams).first()
  return c.json({ publications: results, total: (countResult as any)?.total || 0 })
})

// GET /api/publications/:slug
api.get('/publications/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  const result = await db.prepare('SELECT * FROM publications WHERE slug = ? AND is_published = 1').bind(slug).first()
  if (!result) return c.json({ error: 'Not found' }, 404)
  return c.json({ publication: result })
})

// GET /api/actualites
api.get('/actualites', async (c) => {
  const db = c.env.DB
  const { category, limit, offset } = c.req.query() as any
  let query = 'SELECT * FROM actualites WHERE is_published = 1'
  const params: any[] = []
  if (category) { query += ' AND category = ?'; params.push(category) }
  query += ' ORDER BY published_at DESC'
  if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)) }
  if (offset) { query += ' OFFSET ?'; params.push(parseInt(offset)) }
  const { results } = await db.prepare(query).bind(...params).all()
  return c.json({ actualites: results })
})

// GET /api/actualites/:slug
api.get('/actualites/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  const result = await db.prepare('SELECT * FROM actualites WHERE slug = ? AND is_published = 1').bind(slug).first()
  if (!result) return c.json({ error: 'Not found' }, 404)
  return c.json({ actualite: result })
})

// GET /api/dashboards
api.get('/dashboards', async (c) => {
  const db = c.env.DB
  const { results } = await db.prepare('SELECT * FROM dashboards WHERE is_active = 1 ORDER BY display_order ASC').all()
  return c.json({ dashboards: results })
})

// GET /api/datasets
api.get('/datasets', async (c) => {
  const db = c.env.DB
  const { sector, year, format } = c.req.query() as any
  let query = 'SELECT * FROM datasets WHERE is_active = 1'
  const params: any[] = []
  if (sector) { query += ' AND sector = ?'; params.push(sector) }
  if (year) { query += ' AND year = ?'; params.push(parseInt(year)) }
  if (format) { query += ' AND format = ?'; params.push(format) }
  query += ' ORDER BY year DESC, created_at DESC'
  const { results } = await db.prepare(query).bind(...params).all()
  return c.json({ datasets: results })
})

// GET /api/team
api.get('/team', async (c) => {
  const db = c.env.DB
  const { results } = await db.prepare('SELECT * FROM team WHERE is_active = 1 ORDER BY display_order ASC').all()
  return c.json({ team: results })
})

// POST /api/contact
api.post('/contact', async (c) => {
  const db = c.env.DB
  try {
    const { name, email, organization, subject, message } = await c.req.json()
    if (!name || !email || !message) {
      return c.json({ error: 'Name, email and message are required' }, 400)
    }
    await db.prepare('INSERT INTO contact_messages (name, email, organization, subject, message) VALUES (?, ?, ?, ?, ?)')
      .bind(name, email, organization || '', subject || '', message).run()
    return c.json({ success: true, message: 'Message sent successfully' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// GET /api/search
api.get('/search', async (c) => {
  const db = c.env.DB
  const q = c.req.query('q') || ''
  if (q.length < 2) return c.json({ results: [] })
  const searchTerm = `%${q}%`
  
  const pubs = await db.prepare(
    'SELECT slug, title_fr as title, type, sector FROM publications WHERE is_published = 1 AND (title_fr LIKE ? OR title_en LIKE ? OR summary_fr LIKE ?) LIMIT 5'
  ).bind(searchTerm, searchTerm, searchTerm).all()
  
  const news = await db.prepare(
    'SELECT slug, title_fr as title, category as type FROM actualites WHERE is_published = 1 AND (title_fr LIKE ? OR title_en LIKE ?) LIMIT 3'
  ).bind(searchTerm, searchTerm).all()
  
  const datasets = await db.prepare(
    'SELECT slug, title_fr as title, sector, format as type FROM datasets WHERE is_active = 1 AND (title_fr LIKE ? OR title_en LIKE ?) LIMIT 3'
  ).bind(searchTerm, searchTerm).all()

  const results = [
    ...(pubs.results || []).map((r: any) => ({ ...r, url: `/publications/${r.slug}`, sector: r.sector || '' })),
    ...(news.results || []).map((r: any) => ({ ...r, url: `/actualites/${r.slug}`, type: 'actualité', sector: '' })),
    ...(datasets.results || []).map((r: any) => ({ ...r, url: `/donnees`, sector: r.sector || '' })),
  ]
  return c.json({ results })
})

// GET /api/stats (summary statistics)
api.get('/stats', async (c) => {
  const db = c.env.DB
  const pubCount = await db.prepare('SELECT COUNT(*) as c FROM publications WHERE is_published = 1').first()
  const dataCount = await db.prepare('SELECT COUNT(*) as c FROM datasets WHERE is_active = 1').first()
  const newsCount = await db.prepare('SELECT COUNT(*) as c FROM actualites WHERE is_published = 1').first()
  return c.json({
    publications: (pubCount as any)?.c || 0,
    datasets: (dataCount as any)?.c || 0,
    actualites: (newsCount as any)?.c || 0,
  })
})

// ===============================
// ADMIN API ENDPOINTS
// ===============================

// POST /api/admin/publications
api.post('/admin/publications', async (c) => {
  const db = c.env.DB
  try {
    const data = await c.req.json()
    const slug = data.slug || data.title_fr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    await db.prepare(
      'INSERT INTO publications (title_fr, title_en, slug, type, summary_fr, summary_en, content_fr, content_en, sector, year, author, pdf_url, is_featured, is_published) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    ).bind(
      data.title_fr, data.title_en || '', slug, data.type, data.summary_fr || '', data.summary_en || '',
      data.content_fr || '', data.content_en || '', data.sector || 'general', data.year || 2025,
      data.author || '', data.pdf_url || '', data.is_featured ? 1 : 0, data.is_published !== false ? 1 : 0
    ).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// PUT /api/admin/publications/:id
api.put('/admin/publications/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  try {
    const data = await c.req.json()
    await db.prepare(
      'UPDATE publications SET title_fr=?, title_en=?, type=?, summary_fr=?, summary_en=?, content_fr=?, content_en=?, sector=?, year=?, author=?, pdf_url=?, is_featured=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
    ).bind(
      data.title_fr, data.title_en || '', data.type, data.summary_fr || '', data.summary_en || '',
      data.content_fr || '', data.content_en || '', data.sector || 'general', data.year || 2025,
      data.author || '', data.pdf_url || '', data.is_featured ? 1 : 0, data.is_published !== false ? 1 : 0, id
    ).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// DELETE /api/admin/publications/:id
api.delete('/admin/publications/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  await db.prepare('DELETE FROM publications WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// POST /api/admin/actualites
api.post('/admin/actualites', async (c) => {
  const db = c.env.DB
  try {
    const data = await c.req.json()
    const slug = data.slug || data.title_fr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    await db.prepare(
      'INSERT INTO actualites (title_fr, title_en, slug, excerpt_fr, excerpt_en, content_fr, content_en, category, is_featured, is_published) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(
      data.title_fr, data.title_en || '', slug, data.excerpt_fr || '', data.excerpt_en || '',
      data.content_fr || '', data.content_en || '', data.category || 'general',
      data.is_featured ? 1 : 0, data.is_published !== false ? 1 : 0
    ).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// POST /api/admin/indicators
api.post('/admin/indicators', async (c) => {
  const db = c.env.DB
  try {
    const data = await c.req.json()
    await db.prepare(
      'INSERT INTO indicators (name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(
      data.name_fr, data.name_en || '', data.value, data.unit || '', data.change_percent || 0,
      data.change_direction || 'up', data.sector || 'general', data.period || '', data.icon || 'chart-line',
      data.display_order || 0
    ).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// GET /api/admin/messages
api.get('/admin/messages', async (c) => {
  const db = c.env.DB
  const { results } = await db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all()
  return c.json({ messages: results })
})

export { api as apiRoutes }

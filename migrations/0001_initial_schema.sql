-- CRADES Database Schema
-- Centre de Recherche, d'Analyse et des Statistiques

-- =====================================================
-- PUBLICATIONS (études, rapports, notes, publications)
-- =====================================================
CREATE TABLE IF NOT EXISTS publications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_fr TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('etude','rapport','note_conjoncture','publication_officielle','tableau_bord')),
  summary_fr TEXT DEFAULT '',
  summary_en TEXT DEFAULT '',
  content_fr TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  sector TEXT DEFAULT 'general' CHECK(sector IN ('industrie','commerce','pme','artisanat','mines','energie','numerique','agriculture','general')),
  year INTEGER DEFAULT 2024,
  author TEXT DEFAULT '',
  pdf_url TEXT DEFAULT '',
  csv_url TEXT DEFAULT '',
  thumbnail TEXT DEFAULT '',
  is_featured INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  download_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDICATORS (statistiques dynamiques pour le dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS indicators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_fr TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  value TEXT NOT NULL,
  unit TEXT DEFAULT '',
  change_percent REAL DEFAULT 0,
  change_direction TEXT DEFAULT 'up' CHECK(change_direction IN ('up','down','stable')),
  sector TEXT DEFAULT 'general',
  period TEXT DEFAULT '',
  source TEXT DEFAULT 'CRADES',
  icon TEXT DEFAULT 'chart-line',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ACTUALITES (news/articles)
-- =====================================================
CREATE TABLE IF NOT EXISTS actualites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_fr TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  excerpt_fr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  content_fr TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  category TEXT DEFAULT 'general' CHECK(category IN ('communique','evenement','partenariat','formation','general')),
  image TEXT DEFAULT '',
  is_featured INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DASHBOARDS (tableaux de bord intégrés)
-- =====================================================
CREATE TABLE IF NOT EXISTS dashboards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_fr TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  description_fr TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  embed_url TEXT DEFAULT '',
  embed_type TEXT DEFAULT 'iframe' CHECK(embed_type IN ('iframe','powerbi','looker','custom')),
  sector TEXT DEFAULT 'general',
  thumbnail TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DATASETS (jeux de données téléchargeables)
-- =====================================================
CREATE TABLE IF NOT EXISTS datasets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_fr TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  description_fr TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  sector TEXT DEFAULT 'general',
  year INTEGER DEFAULT 2024,
  format TEXT DEFAULT 'csv' CHECK(format IN ('csv','xlsx','json','pdf')),
  file_url TEXT DEFAULT '',
  file_size TEXT DEFAULT '',
  download_count INTEGER DEFAULT 0,
  license TEXT DEFAULT 'open-data',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TEAM (équipe / organisation)
-- =====================================================
CREATE TABLE IF NOT EXISTS team (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title_fr TEXT DEFAULT '',
  title_en TEXT DEFAULT '',
  department_fr TEXT DEFAULT '',
  department_en TEXT DEFAULT '',
  photo TEXT DEFAULT '',
  bio_fr TEXT DEFAULT '',
  bio_en TEXT DEFAULT '',
  email TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CONTACT MESSAGES
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ADMIN USERS (JWT authentication)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  role TEXT DEFAULT 'editor' CHECK(role IN ('admin','editor','viewer')),
  is_active INTEGER DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SITE SETTINGS
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT DEFAULT '',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_publications_type ON publications(type);
CREATE INDEX IF NOT EXISTS idx_publications_sector ON publications(sector);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_publications_slug ON publications(slug);
CREATE INDEX IF NOT EXISTS idx_publications_featured ON publications(is_featured);
CREATE INDEX IF NOT EXISTS idx_actualites_slug ON actualites(slug);
CREATE INDEX IF NOT EXISTS idx_actualites_category ON actualites(category);
CREATE INDEX IF NOT EXISTS idx_datasets_sector ON datasets(sector);
CREATE INDEX IF NOT EXISTS idx_datasets_year ON datasets(year);
CREATE INDEX IF NOT EXISTS idx_indicators_sector ON indicators(sector);
CREATE INDEX IF NOT EXISTS idx_indicators_active ON indicators(is_active);

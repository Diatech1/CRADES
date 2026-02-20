#!/usr/bin/env node
/**
 * CRADES — WordPress Content Seeder
 * 
 * Populates Indicateurs and Dashboards via WP REST API
 * 
 * Usage:
 *   node seed-wp.mjs <username> <application-password>
 * 
 * Generate an Application Password in WordPress:
 *   WP Admin → Users → Profile → Application Passwords
 *   Enter a name (e.g. "CRADES Seeder") → click "Add New Application Password"
 *   Copy the password (spaces are normal, keep them or remove them)
 */

const WP_URL = 'https://flowlevel.s5-tastewp.com'
const API = `${WP_URL}/wp-json/wp/v2`

const args = process.argv.slice(2)
if (args.length < 2) {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║  CRADES — WordPress Content Seeder                      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Usage:                                                  ║
║    node seed-wp.mjs <username> <app-password>            ║
║                                                          ║
║  Example:                                                ║
║    node seed-wp.mjs alfarukh "xxxx xxxx xxxx xxxx"       ║
║                                                          ║
║  How to get an Application Password:                     ║
║  1. Go to: ${WP_URL}/wp-admin/profile.php
║  2. Scroll to "Application Passwords"                    ║
║  3. Enter name: "CRADES Seeder"                          ║
║  4. Click "Add New Application Password"                 ║
║  5. Copy the generated password                          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`)
  process.exit(1)
}

const USERNAME = args[0]
const APP_PASSWORD = args[1].replace(/\s+/g, ' ')
const AUTH = 'Basic ' + Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64')

async function wpPost(endpoint, data) {
  const res = await fetch(`${API}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`${res.status} ${endpoint}: ${err}`)
  }
  return res.json()
}

async function wpDelete(endpoint) {
  const res = await fetch(`${API}/${endpoint}?force=true`, {
    method: 'DELETE',
    headers: { 'Authorization': AUTH },
  })
  return res.ok
}

// ==========================================
// INDICATEURS DATA
// ==========================================
const indicateurs = [
  {
    title: 'PIB Industriel',
    meta: {
      indicateur_value: '2 847',
      indicateur_unit: 'Mds FCFA',
      indicateur_change_percent: 4.7,
      indicateur_change_direction: 'up',
      indicateur_period: 'T3 2025',
      indicateur_display_order: 1,
    },
    sector: 'industrie',
  },
  {
    title: 'Exportations',
    meta: {
      indicateur_value: '1 523',
      indicateur_unit: 'Mds FCFA',
      indicateur_change_percent: 8.2,
      indicateur_change_direction: 'up',
      indicateur_period: 'T3 2025',
      indicateur_display_order: 2,
    },
    sector: 'commerce',
  },
  {
    title: 'PME Enregistrées',
    meta: {
      indicateur_value: '47 832',
      indicateur_unit: '',
      indicateur_change_percent: 12.3,
      indicateur_change_direction: 'up',
      indicateur_period: '2025',
      indicateur_display_order: 3,
    },
    sector: 'pme',
  },
  {
    title: 'Indice Production',
    meta: {
      indicateur_value: '127.4',
      indicateur_unit: 'pts',
      indicateur_change_percent: 3.1,
      indicateur_change_direction: 'up',
      indicateur_period: 'Oct 2025',
      indicateur_display_order: 4,
    },
    sector: 'industrie',
  },
  {
    title: 'Balance Commerciale',
    meta: {
      indicateur_value: '-892',
      indicateur_unit: 'Mds FCFA',
      indicateur_change_percent: -2.1,
      indicateur_change_direction: 'down',
      indicateur_period: 'T3 2025',
      indicateur_display_order: 5,
    },
    sector: 'commerce',
  },
  {
    title: 'Emplois Industrie',
    meta: {
      indicateur_value: '234 500',
      indicateur_unit: '',
      indicateur_change_percent: 5.6,
      indicateur_change_direction: 'up',
      indicateur_period: '2025',
      indicateur_display_order: 6,
    },
    sector: 'industrie',
  },
  {
    title: 'IDE Reçus',
    meta: {
      indicateur_value: '485',
      indicateur_unit: 'Mds FCFA',
      indicateur_change_percent: 15.2,
      indicateur_change_direction: 'up',
      indicateur_period: '2025',
      indicateur_display_order: 7,
    },
    sector: 'general',
  },
  {
    title: 'Taux Utilisation Capacité',
    meta: {
      indicateur_value: '68.3',
      indicateur_unit: '%',
      indicateur_change_percent: 1.8,
      indicateur_change_direction: 'up',
      indicateur_period: 'T3 2025',
      indicateur_display_order: 8,
    },
    sector: 'industrie',
  },
]

// ==========================================
// DASHBOARDS DATA
// ==========================================
const dashboards = [
  {
    title: 'Production Industrielle',
    content: '<p>Suivi en temps réel des indicateurs clés de l\'industrie sénégalaise. Indice base 100 = janvier 2024.</p>',
    meta: {
      dashboard_chart_data: JSON.stringify({
        type: 'line',
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        data: [98, 102, 105, 108, 112, 115, 118, 121, 119, 123, 125, 127],
        label: 'Indice de production industrielle',
      }),
      dashboard_chart_color: '#044bad',
      dashboard_display_order: 1,
    },
    sector: 'industrie',
  },
  {
    title: 'Balance Commerciale',
    content: '<p>Visualisation interactive des flux commerciaux du Sénégal. En milliards de FCFA.</p>',
    meta: {
      dashboard_chart_data: JSON.stringify({
        type: 'bar',
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        data: [-85, -78, -92, -88, -95, -80, -75, -89, -82, -90, -88, -89],
        label: 'Balance commerciale (Mds FCFA)',
      }),
      dashboard_chart_color: '#b8943e',
      dashboard_display_order: 2,
    },
    sector: 'commerce',
  },
  {
    title: 'Créations PME',
    content: '<p>Indicateurs de suivi du tissu PME sénégalais. Nombre de créations par mois.</p>',
    meta: {
      dashboard_chart_data: JSON.stringify({
        type: 'line',
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        data: [320, 380, 410, 350, 420, 460, 480, 510, 490, 530, 550, 580],
        label: 'Créations PME / mois',
      }),
      dashboard_chart_color: '#3a7fd4',
      dashboard_display_order: 3,
    },
    sector: 'pme',
  },
  {
    title: 'Indice des Prix à la Production',
    content: '<p>Suivi mensuel de l\'indice des prix à la production. Base 100 = janvier 2024.</p>',
    meta: {
      dashboard_chart_data: JSON.stringify({
        type: 'line',
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        data: [100, 101.2, 102.5, 103.1, 103.8, 104.2, 105.1, 105.8, 106.2, 106.9, 107.5, 108.1],
        label: 'IPP (base 100)',
      }),
      dashboard_chart_color: '#032d6b',
      dashboard_display_order: 4,
    },
    sector: 'industrie',
  },
]

// ==========================================
// PUBLICATIONS DATA
// ==========================================
const publications = [
  {
    title: 'Rapport Annuel sur l\'Industrie Sénégalaise 2025',
    content: '<p>Analyse complète du tissu industriel sénégalais : performances, défis et perspectives pour l\'année 2025.</p><p>Ce rapport examine les principaux secteurs industriels, les investissements directs étrangers, la création d\'emplois et les politiques publiques de soutien à l\'industrialisation.</p>',
    excerpt: 'Analyse complète du tissu industriel sénégalais : performances, défis et perspectives.',
    meta: { publication_year: '2025', publication_author: 'Direction des Études - CRADES' },
  },
  {
    title: 'Note de Conjoncture Économique - T3 2025',
    content: '<p>Synthèse trimestrielle des indicateurs macroéconomiques du commerce et de l\'industrie au Sénégal.</p><p>Cette note analyse l\'évolution des principaux indicateurs économiques au cours du troisième trimestre 2025.</p>',
    excerpt: 'Synthèse trimestrielle des indicateurs macroéconomiques du commerce et de l\'industrie.',
    meta: { publication_year: '2025', publication_author: 'Service Conjoncture - CRADES' },
  },
  {
    title: 'Étude sur les PME et le Commerce Digital',
    content: '<p>Cartographie du commerce digital au Sénégal : adoption, freins et opportunités pour les PME.</p><p>Cette étude dresse un état des lieux complet de la transformation numérique des petites et moyennes entreprises sénégalaises.</p>',
    excerpt: 'Cartographie du commerce digital au Sénégal : adoption, freins et opportunités pour les PME.',
    meta: { publication_year: '2025', publication_author: 'Division Recherche - CRADES' },
  },
  {
    title: 'Statistiques du Commerce Extérieur - 2025',
    content: '<p>Données complètes sur les importations et exportations du Sénégal, ventilées par produit, partenaire et région.</p>',
    excerpt: 'Données complètes sur les importations et exportations du Sénégal.',
    meta: { publication_year: '2025', publication_author: 'CRADES / ANSD' },
  },
  {
    title: 'Indice de la Production Industrielle - Oct 2025',
    content: '<p>Publication mensuelle de l\'indice de production industrielle. Méthodologie conforme aux standards internationaux.</p>',
    excerpt: 'Publication mensuelle de l\'indice de production industrielle.',
    meta: { publication_year: '2025', publication_author: 'Service Statistiques - CRADES' },
  },
]

// ==========================================
// ACTUALITES (NEWS) DATA
// ==========================================
const actualites = [
  {
    title: 'Le CRADES lance son portail Open Data',
    content: '<p>Dans le cadre de sa mission de transparence statistique, le CRADES lance son portail de données ouvertes.</p><p>Ce portail permet aux chercheurs, investisseurs et décideurs d\'accéder librement aux données collectées et analysées par le Centre.</p><p>Les jeux de données couvrent l\'industrie, le commerce extérieur, les PME et les indicateurs macroéconomiques.</p>',
    excerpt: 'Le Centre met à disposition du public un ensemble de jeux de données ouvertes.',
  },
  {
    title: 'Séminaire sur la transformation industrielle',
    content: '<p>Le CRADES, en partenariat avec l\'ONUDI et la CEDEAO, organise un séminaire international de deux jours sur le thème « Transformation industrielle et chaînes de valeur en Afrique de l\'Ouest ».</p><p>Ce séminaire réunira des experts, des décideurs et des acteurs du secteur privé pour discuter des stratégies de développement industriel.</p>',
    excerpt: 'Le CRADES organise un séminaire international les 25-26 décembre 2025.',
  },
  {
    title: 'Partenariat CRADES-Banque Mondiale',
    content: '<p>Le CRADES et la Banque Mondiale ont signé un accord de coopération technique visant à renforcer les capacités statistiques du Centre.</p><p>Ce partenariat permettra la mise en place de nouveaux outils de collecte et d\'analyse de données économiques.</p>',
    excerpt: 'Un accord de coopération technique signé pour renforcer les capacités statistiques.',
  },
  {
    title: 'Publication du rapport annuel 2025',
    content: '<p>Le CRADES publie son rapport annuel sur l\'industrie sénégalaise. Ce document de référence analyse les performances du secteur industriel, les tendances du commerce et les perspectives économiques.</p>',
    excerpt: 'Le rapport annuel 2025 sur l\'industrie sénégalaise est désormais disponible.',
  },
  {
    title: 'Formation analyse des données industrielles',
    content: '<p>Une session de formation de cinq jours sur les méthodes d\'analyse des données industrielles est organisée par le CRADES.</p><p>Cette formation s\'adresse aux cadres des ministères et des agences publiques impliqués dans la collecte et l\'analyse de données économiques.</p>',
    excerpt: 'Le CRADES organise une session de formation sur les méthodes d\'analyse des données.',
  },
]

// ==========================================
// DATASETS DATA
// ==========================================
const datasets = [
  {
    title: 'Production Industrielle Mensuelle 2025',
    content: '<p>Données mensuelles de production industrielle par branche d\'activité.</p>',
    excerpt: 'Données mensuelles de production industrielle. Format CSV, 2.4 MB.',
  },
  {
    title: 'Commerce Extérieur par Produit 2025',
    content: '<p>Importations et exportations détaillées par code SH6.</p>',
    excerpt: 'Importations et exportations détaillées par code SH6. Format CSV, 15.7 MB.',
  },
  {
    title: 'Répertoire des Entreprises Industrielles 2024',
    content: '<p>Liste des entreprises industrielles actives au Sénégal.</p>',
    excerpt: 'Liste des entreprises industrielles actives. Format XLSX, 8.3 MB.',
  },
  {
    title: 'Indices des Prix à la Production 2020-2025',
    content: '<p>Séries chronologiques des indices de prix à la production par secteur.</p>',
    excerpt: 'Séries chronologiques des indices de prix. Format CSV, 1.1 MB.',
  },
]

// ==========================================
// SEED EXECUTION
// ==========================================

async function cleanExisting() {
  console.log('\n🧹 Nettoyage des données existantes...')
  
  for (const endpoint of ['indicateur', 'dashboard', 'publication', 'dataset']) {
    try {
      const res = await fetch(`${API}/${endpoint}?per_page=100`, {
        headers: { 'Authorization': AUTH },
      })
      if (res.ok) {
        const items = await res.json()
        for (const item of items) {
          await wpDelete(`${endpoint}/${item.id}`)
          process.stdout.write('.')
        }
      }
    } catch (e) { /* ignore */ }
  }
  
  // Clean posts (actualites) — only posts we created (not "Hello world!")
  try {
    const res = await fetch(`${API}/posts?per_page=100`, {
      headers: { 'Authorization': AUTH },
    })
    if (res.ok) {
      const items = await res.json()
      for (const item of items) {
        if (item.title.rendered !== 'Hello world!') {
          await wpDelete(`posts/${item.id}`)
          process.stdout.write('.')
        }
      }
    }
  } catch (e) { /* ignore */ }
  
  console.log(' Done!')
}

async function seedIndicateurs() {
  console.log('\n📊 Ajout des indicateurs...')
  for (const ind of indicateurs) {
    try {
      const result = await wpPost('indicateur', {
        title: ind.title,
        status: 'publish',
        meta: ind.meta,
      })
      console.log(`  ✅ ${ind.title} (ID: ${result.id})`)
    } catch (e) {
      console.log(`  ❌ ${ind.title}: ${e.message}`)
    }
  }
}

async function seedDashboards() {
  console.log('\n📈 Ajout des tableaux de bord...')
  for (const dash of dashboards) {
    try {
      const result = await wpPost('dashboard', {
        title: dash.title,
        content: dash.content,
        status: 'publish',
        meta: dash.meta,
      })
      console.log(`  ✅ ${dash.title} (ID: ${result.id})`)
    } catch (e) {
      console.log(`  ❌ ${dash.title}: ${e.message}`)
    }
  }
}

async function seedPublications() {
  console.log('\n📚 Ajout des publications...')
  for (const pub of publications) {
    try {
      const result = await wpPost('publication', {
        title: pub.title,
        content: pub.content,
        excerpt: pub.excerpt,
        status: 'publish',
        meta: pub.meta,
      })
      console.log(`  ✅ ${pub.title} (ID: ${result.id})`)
    } catch (e) {
      console.log(`  ❌ ${pub.title}: ${e.message}`)
    }
  }
}

async function seedActualites() {
  console.log('\n📰 Ajout des actualités...')
  for (const actu of actualites) {
    try {
      const result = await wpPost('posts', {
        title: actu.title,
        content: actu.content,
        excerpt: actu.excerpt,
        status: 'publish',
      })
      console.log(`  ✅ ${actu.title} (ID: ${result.id})`)
    } catch (e) {
      console.log(`  ❌ ${actu.title}: ${e.message}`)
    }
  }
}

async function seedDatasets() {
  console.log('\n💾 Ajout des jeux de données...')
  for (const ds of datasets) {
    try {
      const result = await wpPost('dataset', {
        title: ds.title,
        content: ds.content,
        excerpt: ds.excerpt,
        status: 'publish',
      })
      console.log(`  ✅ ${ds.title} (ID: ${result.id})`)
    } catch (e) {
      console.log(`  ❌ ${ds.title}: ${e.message}`)
    }
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  CRADES — WordPress Content Seeder                      ║')
  console.log('╠══════════════════════════════════════════════════════════╣')
  console.log(`║  WordPress: ${WP_URL}`)
  console.log(`║  User: ${USERNAME}`)
  console.log('╚══════════════════════════════════════════════════════════╝')

  // Test authentication first
  console.log('\n🔑 Test d\'authentification...')
  try {
    const res = await fetch(`${API}/users/me`, {
      headers: { 'Authorization': AUTH },
    })
    if (!res.ok) {
      console.error('❌ Authentification échouée! Vérifiez le nom d\'utilisateur et le mot de passe d\'application.')
      console.error(`   Status: ${res.status}`)
      const body = await res.text()
      console.error(`   Response: ${body.substring(0, 200)}`)
      process.exit(1)
    }
    const user = await res.json()
    console.log(`✅ Connecté en tant que: ${user.name} (${user.slug})`)
  } catch (e) {
    console.error('❌ Erreur de connexion:', e.message)
    process.exit(1)
  }

  await cleanExisting()
  await seedIndicateurs()
  await seedDashboards()
  await seedPublications()
  await seedActualites()
  await seedDatasets()

  console.log('\n' + '═'.repeat(58))
  console.log('✅ Contenu peuplé avec succès!')
  console.log(`   Indicateurs: ${indicateurs.length}`)
  console.log(`   Dashboards:  ${dashboards.length}`)
  console.log(`   Publications: ${publications.length}`)
  console.log(`   Actualités:  ${actualites.length}`)
  console.log(`   Datasets:    ${datasets.length}`)
  console.log('')
  console.log(`   Voir le site: http://localhost:3000`)
  console.log(`   WordPress:    ${WP_URL}/wp-admin/`)
  console.log('═'.repeat(58))
}

main().catch(e => {
  console.error('❌ Erreur fatale:', e.message)
  process.exit(1)
})

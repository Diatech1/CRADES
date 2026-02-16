# CRADES - Centre de Recherche, d'Analyse et des Statistiques

**Site institutionnel du CRADES** — Institution rattachée au Ministère de l'Industrie et du Commerce du Sénégal.

## Vue d'ensemble

Le CRADES est le centre de référence national en matière de données industrielles et commerciales du Sénégal. Ce site web moderne offre un accès transparent aux publications, données statistiques, tableaux de bord et analyses économiques.

## URLs

- **Site local** : http://localhost:3000
- **Admin** : http://localhost:3000/admin
- **API** : http://localhost:3000/api/

## Architecture Technique

| Composant | Technologie |
|-----------|-------------|
| **Backend** | Hono (Edge Framework) |
| **Base de données** | Cloudflare D1 (SQLite distribué) |
| **Frontend** | HTML/CSS/JS avec Tailwind CSS (CDN) |
| **Graphiques** | Chart.js |
| **Icônes** | Font Awesome 6 |
| **Polices** | Inter + Source Serif 4 |
| **Déploiement** | Cloudflare Pages |
| **Gestion** | Panel Admin intégré |

## Fonctionnalités Réalisées

### Pages publiques
- **Accueil** — Hero section, indicateurs clés dynamiques, dernières publications, tableaux de bord, actualités
- **À propos** — Mission, vision, mandat institutionnel, organisation, équipe dirigeante, partenaires
- **Publications** — Filtres dynamiques (type, secteur, année), 12 publications pré-chargées avec détail individuel
- **Tableaux de bord** — 4 dashboards interactifs avec Chart.js, tableau synthétique des indicateurs
- **Données & Statistiques** — 6 jeux de données téléchargeables, documentation API REST intégrée
- **Actualités** — 5 articles avec catégorisation (communiqué, événement, partenariat, formation)
- **Contact** — Formulaire fonctionnel, coordonnées, carte OpenStreetMap, horaires

### API REST Publique
| Endpoint | Description |
|----------|-------------|
| `GET /api/indicators` | Indicateurs économiques clés |
| `GET /api/publications?type=&sector=&year=` | Publications avec filtres |
| `GET /api/publications/:slug` | Détail d'une publication |
| `GET /api/actualites` | Liste des actualités |
| `GET /api/actualites/:slug` | Détail d'une actualité |
| `GET /api/dashboards` | Tableaux de bord |
| `GET /api/datasets?sector=&year=` | Jeux de données |
| `GET /api/search?q=` | Recherche globale |
| `GET /api/stats` | Statistiques résumées |
| `GET /api/team` | Équipe CRADES |
| `POST /api/contact` | Envoi de message |

### API Administration
| Endpoint | Description |
|----------|-------------|
| `POST /api/admin/publications` | Créer une publication |
| `PUT /api/admin/publications/:id` | Modifier une publication |
| `DELETE /api/admin/publications/:id` | Supprimer une publication |
| `POST /api/admin/actualites` | Créer une actualité |
| `POST /api/admin/indicators` | Ajouter un indicateur |
| `GET /api/admin/messages` | Lire les messages reçus |

### Fonctionnalités transversales
- **Multilingue** (FR/EN) — Switch de langue sur chaque page
- **SEO** — Schema.org JSON-LD, meta tags OG, sitemap XML, canonical URLs, hreflang
- **Recherche avancée** — Modale de recherche avec résultats en temps réel
- **Rate Limiting** — Protection API (100 req/min par IP)
- **Responsive** — Design mobile-first avec menu hamburger
- **Panel Admin** — Dashboard statistiques, CRUD publications/actualités/indicateurs, messagerie

## Modèles de Données

### Publications (Custom Post Types)
- **Études** — Recherches approfondies sectorielles
- **Rapports** — Rapports annuels et périodiques
- **Notes de conjoncture** — Analyses trimestrielles
- **Publications officielles** — Documents institutionnels

### Taxonomies
- **Secteur** : Industrie, Commerce, PME, Artisanat, Mines, Énergie, Numérique, Agriculture, Général
- **Année** : 2023, 2024, 2025
- **Type de document** : Étude, Rapport, Note de conjoncture, Publication officielle

### Indicateurs économiques
8 indicateurs dynamiques avec valeur, unité, variation (%), direction, période et source.

## Identité Visuelle

| Élément | Valeur |
|---------|--------|
| Vert institutionnel | `#1B5E3B` |
| Vert foncé | `#0F3D26` |
| Vert clair | `#2D8F5E` |
| Or (accent) | `#C5A54E` |
| Gris-800 | `#212529` |
| Typographie | Inter (corps) + Source Serif 4 (titres) |

## Guide d'utilisation

### Initialisation de la base
```bash
# Initialiser les tables
curl http://localhost:3000/api/init

# Charger les données de démonstration
curl http://localhost:3000/api/seed
```

### Développement local
```bash
npm run build
npm run dev:sandbox
```

### Déploiement Cloudflare
```bash
npm run deploy:prod
```

## Déploiement

- **Plateforme** : Cloudflare Pages + D1
- **Status** : En développement local
- **Tech Stack** : Hono + TypeScript + Tailwind CSS + Chart.js + D1
- **Date** : 16 février 2026

## Prochaines étapes recommandées

1. **Authentification JWT** pour le panel admin (actuellement ouvert)
2. **Upload de fichiers PDF/CSV** via Cloudflare R2
3. **Intégration Power BI / Looker Studio** pour les dashboards
4. **Notifications email** pour les nouveaux messages (via SendGrid/Resend)
5. **Pagination** sur les listes de publications et actualités
6. **Cache** avec Cloudflare KV pour les pages très visitées
7. **Tests automatisés** (vitest)
8. **Audit Lighthouse** et optimisation performance

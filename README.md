# CRADES — Headless WordPress + Cloudflare Pages

## Architecture

```
┌─────────────────────┐      REST API       ┌──────────────────────────────┐
│  WordPress CMS      │ ◄──────────────────► │  Cloudflare Pages (Hono)     │
│  (Content editing)  │   /wp-json/wp/v2/*   │  (SSR front-end + API proxy) │
│                     │                      │                              │
│  • Gutenberg editor │                      │  • Server-side HTML          │
│  • Custom Post Types│                      │  • Tailwind CSS + Chart.js   │
│  • Media library    │                      │  • API proxy endpoints       │
│  • Elementor        │                      │  • Edge caching (60s TTL)    │
└─────────────────────┘                      └──────────────────────────────┘
  flowlevel.s5-tastewp.com                     crades-senegal.pages.dev
```

## URLs

| Environment | URL |
|------------|-----|
| **Front-end (sandbox)** | https://3000-isyvi0cnllfzf5ni7ajwp-c07dda5e.sandbox.novita.ai |
| **WordPress CMS** | https://flowlevel.s5-tastewp.com/wp-admin/ |
| **WP REST API** | https://flowlevel.s5-tastewp.com/wp-json/wp/v2/ |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil — hero, indicateurs, dashboards, publications, actualités |
| `/a-propos` | À propos du CRADES |
| `/publications` | Liste des publications (WP CPT `publication`) |
| `/publications/:slug` | Détail d'une publication |
| `/tableaux-de-bord` | Tableaux de bord (WP CPT `dashboard`) |
| `/donnees` | Jeux de données (WP CPT `dataset`) |
| `/actualites` | Actualités (WP `post`) |
| `/actualites/:slug` | Détail d'une actualité |
| `/contact` | Formulaire de contact |
| `/admin` | Redirection vers WordPress admin |
| `/sitemap.xml` | Sitemap XML dynamique |
| `/schema.json` | Schema.org JSON-LD |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/indicators` | Indicateurs clés (CPT `indicateur`) |
| GET | `/api/publications` | Publications (CPT `publication`) |
| GET | `/api/publications/:slug` | Détail publication |
| GET | `/api/actualites` | Actualités (WP posts) |
| GET | `/api/actualites/:slug` | Détail actualité |
| GET | `/api/dashboards` | Tableaux de bord (CPT `dashboard`) |
| GET | `/api/datasets` | Jeux de données (CPT `dataset`) |
| GET | `/api/taxonomies` | Types de publication + secteurs |
| GET | `/api/search?q=...` | Recherche globale |
| GET | `/api/stats` | Compteurs (publications, actualités, datasets) |
| POST | `/api/contact` | Envoi formulaire de contact |
| GET | `/api/wp-info` | Info connexion WordPress |

## WordPress Custom Post Types

Registered by the CRADES theme (`functions.php`):

| CPT | REST endpoint | Description |
|-----|---------------|-------------|
| `publication` | `/wp-json/wp/v2/publication` | Rapports, études, notes |
| `indicateur` | `/wp-json/wp/v2/indicateur` | Indicateurs économiques |
| `dashboard` | `/wp-json/wp/v2/dashboard` | Tableaux de bord |
| `dataset` | `/wp-json/wp/v2/dataset` | Jeux de données ouverts |

## Tech Stack

- **Front-end**: Hono (TypeScript) + Tailwind CSS CDN + Chart.js + Font Awesome
- **CMS**: WordPress (Gutenberg + Elementor compatible)
- **Hosting**: Cloudflare Pages (edge SSR)
- **Data flow**: WP REST API → Hono fetch → SSR HTML → CDN cache

## How to Edit Content

1. Go to **WordPress admin**: https://flowlevel.s5-tastewp.com/wp-admin/
2. Create/edit Posts, Publications, Indicateurs, Dashboards, Datasets
3. The front-end fetches fresh data from WP REST API (60s cache)
4. No rebuild needed — content changes appear automatically

## How to Share/Edit with Lovable or Bolt

Since this is a **standard Hono + TypeScript** project:

1. **Lovable/Bolt**: Import the GitHub repo → edit `src/pages/*.ts` for layout changes
2. **WordPress**: Use Gutenberg/Elementor for content — no code needed
3. **Designers**: Edit `src/components/layout.ts` for header/footer, pages for sections
4. **API consumers**: Use `/api/*` endpoints for any custom front-end

## Development

```bash
# Build
npm run build

# Local dev (sandbox)
pm2 start ecosystem.config.cjs

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## Next Steps After Design Approval

1. **Deployment**: `npm run deploy:prod` to Cloudflare Pages
2. **Domain**: Point `crades.gouv.sn` DNS to Cloudflare Pages
3. **WordPress hosting**: Move from TasteWP to production (Kinsta/WP Engine/OVH)
4. **Version control**: Push to GitHub, set up CI/CD
5. **Content population**: Add real publications, indicators, dashboards in WP admin
6. **Contact form**: Integrate with email service (SendGrid/Resend) or WP Contact Form 7

## Project Status

- **Platform**: Cloudflare Pages (headless WordPress)
- **Status**: ✅ Active — all pages and API routes working
- **Tech Stack**: Hono + TypeScript + Tailwind CSS + WordPress REST API
- **Last Updated**: 2026-02-20

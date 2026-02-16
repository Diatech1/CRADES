-- CRADES Seed Data - Données réalistes pour le Sénégal

-- =====================================================
-- ADMIN USER (password: crades2024)
-- =====================================================
INSERT OR IGNORE INTO admin_users (username, password_hash, full_name, role) VALUES
  ('admin', 'crades2024_hashed', 'Administrateur CRADES', 'admin'),
  ('editeur', 'editeur2024_hashed', 'Éditeur Principal', 'editor');

-- =====================================================
-- INDICATORS
-- =====================================================
INSERT OR IGNORE INTO indicators (name_fr, name_en, value, unit, change_percent, change_direction, sector, period, icon, display_order) VALUES
  ('PIB Industriel', 'Industrial GDP', '2 847', 'Mds FCFA', 4.7, 'up', 'industrie', 'T3 2025', 'industry', 1),
  ('Exportations', 'Exports', '1 523', 'Mds FCFA', 8.2, 'up', 'commerce', 'T3 2025', 'ship', 2),
  ('PME Enregistrées', 'Registered SMEs', '47 832', '', 12.3, 'up', 'pme', '2025', 'building', 3),
  ('Indice Production', 'Production Index', '127.4', 'pts', 3.1, 'up', 'industrie', 'Oct 2025', 'chart-line', 4),
  ('Balance Commerciale', 'Trade Balance', '-892', 'Mds FCFA', -2.1, 'down', 'commerce', 'T3 2025', 'balance-scale', 5),
  ('Emplois Industrie', 'Industrial Jobs', '234 500', '', 5.6, 'up', 'industrie', '2025', 'users', 6),
  ('IDE Reçus', 'FDI Received', '485', 'Mds FCFA', 15.2, 'up', 'general', '2025', 'globe-africa', 7),
  ('Taux Utilisation Capacité', 'Capacity Utilization Rate', '68.3', '%', 1.8, 'up', 'industrie', 'T3 2025', 'gauge-high', 8);

-- =====================================================
-- PUBLICATIONS
-- =====================================================
INSERT OR IGNORE INTO publications (title_fr, title_en, slug, type, summary_fr, summary_en, sector, year, author, is_featured) VALUES
  ('Rapport Annuel sur l''Industrie Sénégalaise 2025', 'Annual Report on Senegalese Industry 2025', 'rapport-annuel-industrie-2025', 'rapport', 'Analyse complète du tissu industriel sénégalais : performances, défis et perspectives. Ce rapport présente les tendances majeures du secteur industriel.', 'Complete analysis of the Senegalese industrial fabric: performances, challenges and perspectives.', 'industrie', 2025, 'Direction des Études - CRADES', 1),
  
  ('Note de Conjoncture Économique - T3 2025', 'Economic Outlook Note - Q3 2025', 'note-conjoncture-t3-2025', 'note_conjoncture', 'Synthèse trimestrielle des indicateurs macroéconomiques du commerce et de l''industrie au Sénégal.', 'Quarterly synthesis of macroeconomic indicators for trade and industry in Senegal.', 'general', 2025, 'Service Conjoncture - CRADES', 1),
  
  ('Étude sur les PME et le Commerce Digital au Sénégal', 'Study on SMEs and Digital Commerce in Senegal', 'etude-pme-commerce-digital', 'etude', 'Cartographie du commerce digital au Sénégal : adoption, freins et opportunités pour les PME. Enquête menée auprès de 2 500 entreprises.', 'Mapping of digital commerce in Senegal: adoption, barriers and opportunities for SMEs.', 'pme', 2025, 'Division Recherche - CRADES', 1),
  
  ('Statistiques du Commerce Extérieur - 2025', 'Foreign Trade Statistics - 2025', 'stats-commerce-exterieur-2025', 'publication_officielle', 'Données complètes sur les importations et exportations du Sénégal par produit, pays partenaire et zone économique.', 'Complete data on Senegal imports and exports by product, partner country and economic zone.', 'commerce', 2025, 'CRADES / ANSD', 0),
  
  ('Indice de la Production Industrielle - Octobre 2025', 'Industrial Production Index - October 2025', 'ipi-octobre-2025', 'rapport', 'Publication mensuelle de l''indice de production industrielle avec ventilation par branche d''activité.', 'Monthly publication of the industrial production index broken down by branch of activity.', 'industrie', 2025, 'Service Statistiques - CRADES', 0),
  
  ('Rapport sur l''Artisanat et les Métiers au Sénégal', 'Report on Crafts and Trades in Senegal', 'rapport-artisanat-metiers-2024', 'rapport', 'État des lieux du secteur artisanal : formation, financement, marchés et intégration dans les chaînes de valeur.', 'Overview of the artisanal sector: training, financing, markets and integration in value chains.', 'artisanat', 2024, 'Division Artisanat - CRADES', 0),
  
  ('Étude sur la Transformation Minière au Sénégal', 'Study on Mining Transformation in Senegal', 'etude-transformation-miniere-2024', 'etude', 'Potentiel de transformation locale des ressources minières : or, phosphates, zircon et fer. Recommandations stratégiques.', 'Potential for local transformation of mining resources: gold, phosphates, zircon and iron.', 'mines', 2024, 'Division Recherche - CRADES', 0),
  
  ('Note sur la Compétitivité Industrielle du Sénégal', 'Note on Industrial Competitiveness of Senegal', 'note-competitivite-industrielle-2024', 'note_conjoncture', 'Analyse comparative de la compétitivité industrielle du Sénégal dans l''espace CEDEAO et perspectives d''amélioration.', 'Comparative analysis of Senegal industrial competitiveness in the ECOWAS area.', 'industrie', 2024, 'Direction Analyse - CRADES', 0),
  
  ('Cartographie des Zones Industrielles du Sénégal', 'Mapping of Industrial Zones of Senegal', 'cartographie-zones-industrielles-2024', 'publication_officielle', 'Inventaire et analyse des zones industrielles : taux d''occupation, infrastructures, connectivité et potentiel de développement.', 'Inventory and analysis of industrial zones: occupancy rates, infrastructure, connectivity.', 'industrie', 2024, 'CRADES / APIX', 0),
  
  ('Étude sur l''Énergie et l''Industrie', 'Study on Energy and Industry', 'etude-energie-industrie-2024', 'etude', 'Impact des coûts énergétiques sur la compétitivité industrielle et évaluation du potentiel des énergies renouvelables.', 'Impact of energy costs on industrial competitiveness and evaluation of renewable energy potential.', 'energie', 2024, 'Direction des Études - CRADES', 0),

  ('Annuaire Statistique de l''Industrie 2023', 'Industrial Statistical Yearbook 2023', 'annuaire-statistique-industrie-2023', 'publication_officielle', 'Recueil exhaustif des données statistiques sur le secteur industriel sénégalais pour l''année 2023.', 'Comprehensive collection of statistical data on the Senegalese industrial sector for 2023.', 'industrie', 2023, 'CRADES', 0),
  
  ('Rapport sur le Commerce Intra-Africain (ZLECAf)', 'Report on Intra-African Trade (AfCFTA)', 'rapport-commerce-intra-africain-2023', 'rapport', 'Opportunités et défis pour le Sénégal dans le cadre de la Zone de Libre-Échange Continentale Africaine.', 'Opportunities and challenges for Senegal within the African Continental Free Trade Area.', 'commerce', 2023, 'Division Recherche - CRADES', 0);

-- =====================================================
-- DASHBOARDS
-- =====================================================
INSERT OR IGNORE INTO dashboards (title_fr, title_en, slug, description_fr, description_en, embed_type, sector, display_order) VALUES
  ('Tableau de Bord Industriel', 'Industrial Dashboard', 'dashboard-industriel', 'Suivi en temps réel des indicateurs clés de l''industrie sénégalaise : production, emploi, investissements.', 'Real-time monitoring of key indicators of Senegalese industry.', 'custom', 'industrie', 1),
  ('Commerce Extérieur', 'Foreign Trade', 'dashboard-commerce-exterieur', 'Visualisation interactive des flux commerciaux du Sénégal : exports, imports, balance commerciale par partenaire.', 'Interactive visualization of Senegal trade flows.', 'custom', 'commerce', 2),
  ('Dynamique des PME', 'SME Dynamics', 'dashboard-pme', 'Indicateurs de suivi du tissu PME : créations, faillites, secteurs porteurs et répartition géographique.', 'SME monitoring indicators: creations, bankruptcies, key sectors and geographic distribution.', 'custom', 'pme', 3),
  ('Indice des Prix à la Production', 'Producer Price Index', 'dashboard-ipp', 'Suivi mensuel de l''indice des prix à la production industrielle par branche d''activité.', 'Monthly monitoring of the industrial producer price index by branch.', 'custom', 'industrie', 4);

-- =====================================================
-- DATASETS
-- =====================================================
INSERT OR IGNORE INTO datasets (title_fr, title_en, slug, description_fr, description_en, sector, year, format, file_size) VALUES
  ('Production Industrielle Mensuelle 2025', 'Monthly Industrial Production 2025', 'production-industrielle-mensuelle-2025', 'Données mensuelles de production industrielle ventilées par branche d''activité (ISIC Rev.4).', 'Monthly industrial production data broken down by branch of activity.', 'industrie', 2025, 'csv', '2.4 MB'),
  ('Commerce Extérieur par Produit 2025', 'Foreign Trade by Product 2025', 'commerce-exterieur-produit-2025', 'Importations et exportations détaillées par code SH6, valeur et volume.', 'Detailed imports and exports by HS6 code, value and volume.', 'commerce', 2025, 'csv', '15.7 MB'),
  ('Répertoire des Entreprises Industrielles 2024', 'Directory of Industrial Enterprises 2024', 'repertoire-entreprises-2024', 'Liste des entreprises industrielles actives avec secteur, localisation et taille.', 'List of active industrial enterprises with sector, location and size.', 'industrie', 2024, 'xlsx', '8.3 MB'),
  ('Indices des Prix à la Production 2020-2025', 'Producer Price Indices 2020-2025', 'indices-prix-production-2020-2025', 'Séries chronologiques des indices de prix à la production par branche.', 'Time series of producer price indices by branch.', 'industrie', 2025, 'csv', '1.1 MB'),
  ('Données PME par Région 2024', 'SME Data by Region 2024', 'donnees-pme-region-2024', 'Répartition géographique des PME avec indicateurs clés par région administrative.', 'Geographic distribution of SMEs with key indicators by administrative region.', 'pme', 2024, 'csv', '3.6 MB'),
  ('Balance Commerciale Trimestrielle 2015-2025', 'Quarterly Trade Balance 2015-2025', 'balance-commerciale-trimestrielle', 'Historique de la balance commerciale par trimestre et par zone géographique.', 'History of the trade balance by quarter and geographic zone.', 'commerce', 2025, 'csv', '4.2 MB');

-- =====================================================
-- ACTUALITES
-- =====================================================
INSERT OR IGNORE INTO actualites (title_fr, title_en, slug, excerpt_fr, excerpt_en, content_fr, category, is_featured, published_at) VALUES
  ('Le CRADES lance son portail Open Data', 'CRADES launches its Open Data portal', 'crades-lance-portail-open-data', 'Le Centre met à disposition du public un ensemble de jeux de données sur l''industrie et le commerce sénégalais.', 'The Center makes available a set of datasets on Senegalese industry and trade.', 'Dans le cadre de sa mission de transparence statistique, le CRADES lance son portail de données ouvertes. Ce portail permet aux chercheurs, investisseurs et décideurs d''accéder librement aux données collectées et analysées par le Centre. Plus de 50 jeux de données sont déjà disponibles en téléchargement dans différents formats (CSV, XLSX, JSON).', 'communique', 1, '2025-11-15'),
  
  ('Séminaire sur la transformation industrielle en Afrique de l''Ouest', 'Seminar on industrial transformation in West Africa', 'seminaire-transformation-industrielle-afrique-ouest', 'Le CRADES organise un séminaire international sur les enjeux de l''industrialisation en Afrique de l''Ouest les 25-26 décembre 2025.', 'CRADES organizes an international seminar on industrialization challenges in West Africa.', 'Le CRADES, en partenariat avec l''ONUDI et la CEDEAO, organise un séminaire international de deux jours sur le thème « Transformation industrielle et chaînes de valeur en Afrique de l''Ouest ». L''événement réunira des experts, chercheurs et décideurs de la sous-région.', 'evenement', 1, '2025-11-10'),
  
  ('Partenariat CRADES-Banque Mondiale pour le renforcement statistique', 'CRADES-World Bank Partnership for statistical strengthening', 'partenariat-crades-banque-mondiale', 'Un accord de coopération technique signé pour moderniser le système d''information statistique industrielle du Sénégal.', 'A technical cooperation agreement signed to modernize Senegal industrial statistical information system.', 'Le CRADES et la Banque Mondiale ont signé un accord de coopération technique visant à renforcer les capacités statistiques du Centre. Ce partenariat prévoit la modernisation des systèmes de collecte de données, la formation du personnel et le développement de nouveaux indicateurs conformes aux standards internationaux.', 'partenariat', 0, '2025-10-28'),
  
  ('Publication du rapport annuel 2025 sur l''industrie', 'Publication of the 2025 annual report on industry', 'publication-rapport-annuel-2025', 'Le rapport annuel 2025 sur l''état de l''industrie sénégalaise est désormais disponible en téléchargement.', 'The 2025 annual report on the state of Senegalese industry is now available for download.', 'Le CRADES publie son rapport annuel sur l''industrie sénégalaise. Ce document de référence analyse les performances du secteur, identifie les tendances émergentes et formule des recommandations stratégiques à l''attention des pouvoirs publics et du secteur privé.', 'communique', 0, '2025-10-15'),
  
  ('Formation sur l''analyse des données industrielles', 'Training on industrial data analysis', 'formation-analyse-donnees-industrielles', 'Le CRADES organise une session de formation à destination des cadres du Ministère et des institutions partenaires.', 'CRADES organizes a training session for Ministry executives and partner institutions.', 'Une session de formation de cinq jours sur les méthodes d''analyse des données industrielles est organisée par le CRADES. Cette formation couvre les techniques statistiques avancées, la visualisation de données et l''interprétation des indicateurs conjoncturels.', 'formation', 0, '2025-09-20');

-- =====================================================
-- TEAM
-- =====================================================
INSERT OR IGNORE INTO team (name, title_fr, title_en, department_fr, department_en, bio_fr, display_order) VALUES
  ('Dr. Amadou Ba', 'Directeur Général', 'Director General', 'Direction Générale', 'General Directorate', 'Économiste statisticien, diplômé de l''ENSAE Paris et de l''Université Cheikh Anta Diop. Plus de 20 ans d''expérience dans l''analyse économique et les politiques industrielles.', 1),
  ('Dr. Fatou Diallo', 'Directrice des Études et de la Recherche', 'Director of Studies and Research', 'Direction des Études', 'Studies Directorate', 'Docteure en économie industrielle, spécialiste des chaînes de valeur et de la compétitivité des entreprises en Afrique subsaharienne.', 2),
  ('Ibrahima Ndiaye', 'Chef de la Division Statistiques', 'Head of Statistics Division', 'Division Statistiques', 'Statistics Division', 'Ingénieur statisticien, expert en méthodologies d''enquêtes et en systèmes d''information statistique. Ancien cadre de l''ANSD.', 3),
  ('Aïssatou Sow', 'Cheffe de la Division Conjoncture', 'Head of Economic Outlook Division', 'Division Conjoncture', 'Economic Outlook Division', 'Économiste macroéconomiste spécialisée dans l''analyse conjoncturelle et la prévision économique. Diplômée de HEC Paris.', 4),
  ('Moussa Diop', 'Chef de la Division Données et Systèmes', 'Head of Data and Systems Division', 'Division Données', 'Data Division', 'Ingénieur informaticien spécialisé en data science et systèmes d''information. Expert en open data et visualisation de données.', 5);

-- =====================================================
-- SITE SETTINGS
-- =====================================================
INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('site_name_fr', 'CRADES - Centre de Recherche, d''Analyse des Echanges et Statistiques'),
  ('site_name_en', 'CRADES - Research, Analysis of Trade and Statistics Center'),
  ('site_description_fr', 'Institution rattachée au Ministère de l''Industrie et du Commerce du Sénégal'),
  ('site_description_en', 'Institution affiliated to the Ministry of Industry and Trade of Senegal'),
  ('address', 'Immeuble CRADES, Rue Aimé Césaire, Plateau, Dakar, Sénégal'),
  ('phone', '+221 33 889 12 34'),
  ('email', 'contact@crades.gouv.sn'),
  ('twitter', 'https://twitter.com/CRADES_SN'),
  ('linkedin', 'https://linkedin.com/company/crades-senegal'),
  ('api_enabled', 'true');

import { getWpAdminUrl } from '../utils/wp-api'

/** Admin page — redirects to WordPress admin panel */
export function adminRedirectPage(): string {
  const wpAdmin = getWpAdminUrl()
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRADES - Administration</title>
  <meta http-equiv="refresh" content="3;url=${wpAdmin}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = { theme: { extend: { colors: { brand: { navy: '#032d6b', blue: '#044bad' } }, fontFamily: { sans: ['Montserrat', 'system-ui', 'sans-serif'] } } } }
  </script>
</head>
<body class="bg-gray-50 font-sans min-h-screen flex items-center justify-center">
  <div class="text-center max-w-md mx-auto px-6">
    <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-blue/10 flex items-center justify-center">
      <i class="fas fa-external-link-alt text-brand-blue text-xl"></i>
    </div>
    <h1 class="text-2xl font-bold text-brand-navy mb-3">Espace d'administration</h1>
    <p class="text-sm text-gray-500 mb-6">
      Le contenu du site CRADES est géré depuis WordPress.<br>
      Vous allez être redirigé vers le panneau d'administration.
    </p>
    <a href="${wpAdmin}" class="inline-flex items-center gap-2 text-sm font-medium bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-navy transition-colors shadow-sm">
      <i class="fab fa-wordpress text-lg"></i>
      Accéder à WordPress
    </a>
    <p class="text-xs text-gray-400 mt-4">Redirection automatique dans 3 secondes...</p>
    
    <div class="mt-10 border-t border-gray-200 pt-6">
      <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Raccourcis WordPress</h3>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <a href="${wpAdmin}edit.php?post_type=publication" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-book w-4"></i> Publications
        </a>
        <a href="${wpAdmin}edit.php" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-newspaper w-4"></i> Actualités
        </a>
        <a href="${wpAdmin}edit.php?post_type=indicateur" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-chart-line w-4"></i> Indicateurs
        </a>
        <a href="${wpAdmin}edit.php?post_type=dashboard" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-tachometer-alt w-4"></i> Dashboards
        </a>
        <a href="${wpAdmin}edit.php?post_type=dataset" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-database w-4"></i> Datasets
        </a>
        <a href="${wpAdmin}upload.php" class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:border-brand-blue/30 transition-colors text-gray-600 hover:text-brand-blue">
          <i class="fas fa-image w-4"></i> Médias
        </a>
      </div>
    </div>

    <div class="mt-6">
      <a href="/" class="text-xs text-gray-400 hover:text-gray-600">
        <i class="fas fa-arrow-left mr-1"></i> Retour au site
      </a>
    </div>
  </div>
</body>
</html>`
}

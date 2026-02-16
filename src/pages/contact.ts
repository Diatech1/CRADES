import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function contactPage(db: D1Database, lang: string): Promise<string> {
  const content = `
<!-- Page Header -->
<section class="hero-gradient py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-white/60 mb-4">
      <a href="/" class="hover:text-white">${t('Accueil', 'Home', lang)}</a> <span class="mx-2">/</span>
      <span class="text-white">Contact</span>
    </nav>
    <h1 class="text-3xl lg:text-4xl font-bold text-white">${t('Contactez-nous', 'Contact Us', lang)}</h1>
    <p class="text-white/80 mt-3 max-w-2xl">${t(
      'Pour toute question, demande de données ou partenariat, n\'hésitez pas à nous contacter.',
      'For any questions, data requests or partnerships, please contact us.',
      lang
    )}</p>
  </div>
</section>

<section class="py-8 lg:py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6 lg:p-8">
          <h2 class="text-xl font-bold text-crades-gray-800 mb-6">${t('Envoyez-nous un message', 'Send us a message', lang)}</h2>
          
          <form id="contactForm" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-crades-gray-700 mb-1.5">${t('Nom complet', 'Full name', lang)} *</label>
                <input type="text" name="name" required class="w-full px-4 py-2.5 border border-crades-gray-200 rounded-lg focus:outline-none focus:border-crades-green focus:ring-1 focus:ring-crades-green text-sm" placeholder="${t('Votre nom', 'Your name', lang)}">
              </div>
              <div>
                <label class="block text-sm font-medium text-crades-gray-700 mb-1.5">Email *</label>
                <input type="email" name="email" required class="w-full px-4 py-2.5 border border-crades-gray-200 rounded-lg focus:outline-none focus:border-crades-green focus:ring-1 focus:ring-crades-green text-sm" placeholder="${t('votre@email.com', 'your@email.com', lang)}">
              </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-crades-gray-700 mb-1.5">${t('Organisation', 'Organization', lang)}</label>
                <input type="text" name="organization" class="w-full px-4 py-2.5 border border-crades-gray-200 rounded-lg focus:outline-none focus:border-crades-green focus:ring-1 focus:ring-crades-green text-sm" placeholder="${t('Nom de votre organisation', 'Your organization', lang)}">
              </div>
              <div>
                <label class="block text-sm font-medium text-crades-gray-700 mb-1.5">${t('Sujet', 'Subject', lang)}</label>
                <select name="subject" class="w-full px-4 py-2.5 border border-crades-gray-200 rounded-lg focus:outline-none focus:border-crades-green focus:ring-1 focus:ring-crades-green text-sm bg-white">
                  <option value="">${t('Sélectionnez un sujet', 'Select a subject', lang)}</option>
                  <option value="data">${t('Demande de données', 'Data request', lang)}</option>
                  <option value="partnership">${t('Partenariat', 'Partnership', lang)}</option>
                  <option value="press">${t('Presse / Médias', 'Press / Media', lang)}</option>
                  <option value="api">${t('API / Accès technique', 'API / Technical access', lang)}</option>
                  <option value="other">${t('Autre', 'Other', lang)}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-crades-gray-700 mb-1.5">${t('Message', 'Message', lang)} *</label>
              <textarea name="message" rows="5" required class="w-full px-4 py-2.5 border border-crades-gray-200 rounded-lg focus:outline-none focus:border-crades-green focus:ring-1 focus:ring-crades-green text-sm resize-none" placeholder="${t('Votre message...', 'Your message...', lang)}"></textarea>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-xs text-crades-gray-400">${t('* Champs obligatoires', '* Required fields', lang)}</p>
              <button type="submit" class="inline-flex items-center gap-2 bg-crades-green text-white px-6 py-2.5 rounded-lg font-medium hover:bg-crades-green-dark transition-colors">
                <i class="fas fa-paper-plane"></i>
                ${t('Envoyer', 'Send', lang)}
              </button>
            </div>
          </form>
          <div id="formMessage" class="hidden mt-4 p-4 rounded-lg"></div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl border border-crades-gray-200 p-6">
          <h3 class="font-semibold text-crades-gray-800 mb-4">${t('Coordonnées', 'Contact Information', lang)}</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-crades-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fas fa-map-marker-alt text-crades-green text-sm"></i>
              </div>
              <div>
                <div class="text-sm font-medium text-crades-gray-700">${t('Adresse', 'Address', lang)}</div>
                <div class="text-sm text-crades-gray-500">Immeuble CRADES<br>Rue Aimé Césaire, Plateau<br>Dakar, Sénégal</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-crades-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fas fa-phone-alt text-crades-green text-sm"></i>
              </div>
              <div>
                <div class="text-sm font-medium text-crades-gray-700">${t('Téléphone', 'Phone', lang)}</div>
                <div class="text-sm text-crades-gray-500">+221 33 889 12 34</div>
                <div class="text-sm text-crades-gray-500">+221 33 889 12 35</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-crades-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fas fa-envelope text-crades-green text-sm"></i>
              </div>
              <div>
                <div class="text-sm font-medium text-crades-gray-700">Email</div>
                <div class="text-sm text-crades-gray-500">contact@crades.gouv.sn</div>
                <div class="text-sm text-crades-gray-500">info@crades.gouv.sn</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-crades-gray-200 p-6">
          <h3 class="font-semibold text-crades-gray-800 mb-3">${t('Horaires d\'ouverture', 'Opening Hours', lang)}</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-crades-gray-500">${t('Lundi - Vendredi', 'Monday - Friday', lang)}</span>
              <span class="font-medium text-crades-gray-700">8h00 - 17h00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-crades-gray-500">${t('Samedi', 'Saturday', lang)}</span>
              <span class="font-medium text-crades-gray-700">9h00 - 13h00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-crades-gray-500">${t('Dimanche', 'Sunday', lang)}</span>
              <span class="font-medium text-red-500">${t('Fermé', 'Closed', lang)}</span>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="bg-white rounded-xl border border-crades-gray-200 overflow-hidden">
          <div class="bg-crades-gray-100 h-48 flex items-center justify-center relative">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-17.4520%2C14.6910%2C-17.4420%2C14.6970&layer=mapnik&marker=14.6940%2C-17.4470" 
              class="absolute inset-0 w-full h-full border-0"
              loading="lazy">
            </iframe>
          </div>
          <div class="p-3 text-center">
            <a href="https://www.openstreetmap.org/?mlat=14.6940&mlon=-17.4470#map=17/14.6940/-17.4470" target="_blank" class="text-xs text-crades-green hover:underline">
              <i class="fas fa-external-link-alt mr-1"></i>${t('Voir sur la carte', 'View on map', lang)}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  const msgEl = document.getElementById('formMessage');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) {
      msgEl.className = 'mt-4 p-4 rounded-lg bg-green-50 text-green-800';
      msgEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>${t("Message envoyé avec succès !", "Message sent successfully!", lang)}';
      form.reset();
    } else {
      msgEl.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-800';
      msgEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>' + (result.error || '${t("Erreur lors de l\'envoi", "Error sending message", lang)}');
    }
  } catch(err) {
    msgEl.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-800';
    msgEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>${t("Erreur de connexion", "Connection error", lang)}';
  }
});
</script>
`
  return layout(content, {
    title: 'Contact',
    description: t('Contactez le CRADES', 'Contact CRADES', lang),
    lang,
    path: '/contact'
  })
}

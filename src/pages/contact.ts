import { layout } from '../components/layout'

const t = (fr: string, en: string, lang: string) => lang === 'en' ? en : fr

export async function contactPage(db: D1Database, lang: string): Promise<string> {
  const content = `
<section class="bg-brand-navy py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <nav class="text-xs text-gray-400 mb-4">
      <a href="/${lang === 'en' ? '?lang=en' : ''}" class="hover:text-white">${t('Accueil', 'Home', lang)}</a>
      <span class="mx-2 text-gray-600">/</span>
      <span class="text-gray-300">Contact</span>
    </nav>
    <h1 class="font-display text-2xl lg:text-3xl text-white">${t('Contactez-nous', 'Contact Us', lang)}</h1>
    <p class="text-gray-400 mt-2 max-w-xl text-sm">${t(
      'Pour toute question, demande de donnees ou partenariat.',
      'For any questions, data requests or partnerships.',
      lang
    )}</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-3 gap-10">
      <!-- Form -->
      <div class="lg:col-span-2">
        <form id="contactForm" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">${t('Nom complet', 'Full name', lang)} *</label>
              <input type="text" name="name" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="${t('Votre nom', 'Your name', lang)}">
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
              <input type="email" name="email" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="${t('votre@email.com', 'your@email.com', lang)}">
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">${t('Organisation', 'Organization', lang)}</label>
              <input type="text" name="organization" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="${t('Nom de votre organisation', 'Your organization', lang)}">
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">${t('Sujet', 'Subject', lang)}</label>
              <select name="subject" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20">
                <option value="">${t('Selectionner', 'Select', lang)}</option>
                <option value="data">${t('Demande de donnees', 'Data request', lang)}</option>
                <option value="partnership">${t('Partenariat', 'Partnership', lang)}</option>
                <option value="press">${t('Presse / Medias', 'Press / Media', lang)}</option>
                <option value="api">${t('API / Acces technique', 'API / Technical access', lang)}</option>
                <option value="other">${t('Autre', 'Other', lang)}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1.5">${t('Message', 'Message', lang)} *</label>
            <textarea name="message" rows="5" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 resize-none focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="${t('Votre message...', 'Your message...', lang)}"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-gray-400">${t('* Champs obligatoires', '* Required fields', lang)}</span>
            <button type="submit" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
              <i class="fas fa-paper-plane mr-1.5 text-xs"></i>${t('Envoyer', 'Send', lang)}
            </button>
          </div>
        </form>
        <div id="formMessage" class="hidden mt-4 p-4 rounded-lg text-sm"></div>
      </div>

      <!-- Info sidebar -->
      <div class="space-y-6">
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-4">${t('Coordonnees', 'Contact Information', lang)}</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt text-brand-gold text-xs mt-1"></i>
              <div class="text-xs text-gray-500 leading-relaxed">Immeuble CRADES<br>Rue Aime Cesaire, Plateau<br>Dakar, Senegal</div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-phone-alt text-brand-gold text-xs mt-1"></i>
              <div class="text-xs text-gray-500">+221 33 889 12 34<br>+221 33 889 12 35</div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-envelope text-brand-gold text-xs mt-1"></i>
              <div class="text-xs text-gray-500">contact@crades.gouv.sn<br>info@crades.gouv.sn</div>
            </div>
          </div>
        </div>

        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">${t('Horaires', 'Hours', lang)}</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-gray-400">${t('Lundi - Vendredi', 'Monday - Friday', lang)}</span><span class="text-gray-700 font-medium">8h00 - 17h00</span></div>
            <div class="flex justify-between"><span class="text-gray-400">${t('Samedi', 'Saturday', lang)}</span><span class="text-gray-700 font-medium">9h00 - 13h00</span></div>
            <div class="flex justify-between"><span class="text-gray-400">${t('Dimanche', 'Sunday', lang)}</span><span class="text-red-500 font-medium">${t('Ferme', 'Closed', lang)}</span></div>
          </div>
        </div>

        <div class="border border-gray-100 rounded-lg overflow-hidden">
          <div class="h-44 relative">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-17.4520%2C14.6910%2C-17.4420%2C14.6970&layer=mapnik&marker=14.6940%2C-17.4470" 
              class="absolute inset-0 w-full h-full border-0"
              loading="lazy"></iframe>
          </div>
          <div class="p-2.5 text-center">
            <a href="https://www.openstreetmap.org/?mlat=14.6940&mlon=-17.4470#map=17/14.6940/-17.4470" target="_blank" class="text-[11px] text-brand-gold hover:underline">
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
      msgEl.className = 'mt-4 p-4 rounded-lg bg-emerald-50 text-emerald-700 text-sm';
      msgEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>${t("Message envoye avec succes !", "Message sent successfully!", lang)}';
      form.reset();
    } else {
      msgEl.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm';
      msgEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>' + (result.error || '${t("Erreur lors de l envoi", "Error sending message", lang)}');
    }
  } catch(err) {
    msgEl.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm';
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

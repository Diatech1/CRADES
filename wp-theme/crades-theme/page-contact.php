<?php
/**
 * Template: Contact
 * Exact replica of Hono frontend /contact
 */
get_template_part( 'template-parts/header' );
?>

<?php crades_page_header(
    'Contactez-nous',
    'Pour toute question, demande de donnees ou partenariat.',
    [ [ 'label' => 'Contact' ] ]
); ?>

<section class="py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-3 gap-10">
      <!-- Form -->
      <div class="lg:col-span-2">
        <form id="contactForm" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Nom complet *</label>
              <input type="text" name="name" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="Votre nom">
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
              <input type="email" name="email" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="votre@email.com">
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Organisation</label>
              <input type="text" name="organization" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="Nom de votre organisation">
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1.5">Sujet</label>
              <select name="subject" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20">
                <option value="">Selectionner</option>
                <option value="data">Demande de donnees</option>
                <option value="partnership">Partenariat</option>
                <option value="press">Presse / Medias</option>
                <option value="api">API / Acces technique</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
            <textarea name="message" rows="5" required class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 resize-none focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20" placeholder="Votre message..."></textarea>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-gray-400">* Champs obligatoires</span>
            <button type="submit" class="text-sm font-medium bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-navy transition-colors">
              <i class="fas fa-paper-plane mr-1.5 text-xs"></i>Envoyer
            </button>
          </div>
        </form>
        <div id="formMessage" class="hidden mt-4 p-4 rounded-lg text-sm"></div>
      </div>

      <!-- Info sidebar -->
      <div class="space-y-6">
        <div class="border border-gray-100 rounded-lg p-5">
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-4">Coordonnees</h3>
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
          <h3 class="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">Horaires</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-gray-400">Lundi - Vendredi</span><span class="text-gray-700 font-medium">8h00 - 17h00</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Samedi</span><span class="text-gray-700 font-medium">9h00 - 13h00</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Dimanche</span><span class="text-red-500 font-medium">Ferme</span></div>
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
              <i class="fas fa-external-link-alt mr-1"></i>Voir sur la carte
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = e.target;
  var msgEl = document.getElementById('formMessage');
  // Simple front-end feedback
  msgEl.className = 'mt-4 p-4 rounded-lg bg-emerald-50 text-emerald-700 text-sm';
  msgEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message envoye avec succes ! Nous vous repondrons rapidement.';
  msgEl.classList.remove('hidden');
  form.reset();
});
</script>

<?php get_template_part( 'template-parts/footer' ); ?>

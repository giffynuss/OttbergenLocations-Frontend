<template>
  <footer class="bg-luxury-dark border-t-2 border-luxury-gold mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Über uns Sektion -->
        <div>
          <h3 class="text-luxury-gold font-luxury text-lg font-bold mb-4 tracking-luxury">
            BOOK A PLACE
          </h3>
          <p class="text-luxury-cream text-sm font-light leading-relaxed">
            Ihre Plattform für exklusive Veranstaltungsorte und unvergessliche Events.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-luxury-gold font-luxury text-lg font-bold mb-4 tracking-luxury">
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/search" class="text-luxury-cream text-sm hover:text-luxury-gold transition-colors duration-300">
                Orte finden
              </router-link>
            </li>
            <li>
              <router-link to="/manage-places" class="text-luxury-cream text-sm hover:text-luxury-gold transition-colors duration-300">
                Orte einstellen
              </router-link>
            </li>
            <li>
              <router-link to="/agb" class="text-luxury-cream text-sm hover:text-luxury-gold transition-colors duration-300">
                AGB
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Kontakt -->
        <div>
          <h3 class="text-luxury-gold font-luxury text-lg font-bold mb-4 tracking-luxury">
            Kontakt
          </h3>
          <ul class="space-y-2 text-luxury-cream text-sm font-light">
            <li>E-Mail: info@bookaplace.de</li>
            <li>Tel: +49 123 456789</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-6 border-t border-luxury-medium text-center">
        <p class="text-luxury-cream text-sm font-light">
          &copy; {{ currentYear }} BOOK A PLACE. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  font-family: var(--font-luxury);
}
</style>

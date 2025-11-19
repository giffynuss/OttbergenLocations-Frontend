<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-luxury-dark shadow-luxury-lg border-b-2 border-luxury-gold">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-luxury font-bold text-luxury-ivory tracking-luxury-wide hover:text-luxury-gold transition-colors duration-300">
              BOOK A PLACE
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">
          <!-- Immer sichtbare Buttons -->
          <router-link
            to="/search"
            class="px-6 py-2.5 text-sm font-medium text-luxury-ivory bg-luxury-brown hover:bg-luxury-medium border border-luxury-gold transition-all duration-300 tracking-luxury"
          >
            Orte finden
          </router-link>

          <router-link
            to="/manage-places"
            class="px-6 py-2.5 text-sm font-medium text-luxury-ivory bg-luxury-brown hover:bg-luxury-medium border border-luxury-gold transition-all duration-300 tracking-luxury"
          >
            Orte einstellen
          </router-link>

          <!-- Nicht angemeldet -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="px-6 py-2.5 text-sm font-medium text-luxury-dark bg-luxury-cream hover:bg-luxury-gold border border-luxury-gold transition-all duration-300 tracking-luxury"
            >
              Einloggen
            </router-link>

            <router-link
              to="/register"
              class="px-6 py-2.5 text-sm font-medium text-luxury-ivory bg-luxury-accent hover:bg-luxury-brown border border-luxury-gold transition-all duration-300 tracking-luxury"
            >
              Registrieren
            </router-link>
          </template>

          <!-- Angemeldet -->
          <template v-else>
            <div class="flex items-center space-x-3 ml-4 pl-4 border-l-2 border-luxury-gold">
              <!-- E-Mail -->
              <span class="text-luxury-cream text-sm font-medium tracking-luxury">
                {{ currentUser?.email }}
              </span>

              <!-- Profilbild-Icon - spitze Ecken statt rund -->
              <div class="w-10 h-10 bg-luxury-cream flex items-center justify-center hover:bg-luxury-gold transition-colors duration-300 cursor-pointer border border-luxury-gold">
                <svg class="w-6 h-6 text-luxury-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <!-- Abmelden Button -->
              <button
                @click="handleLogout"
                class="px-6 py-2.5 text-sm font-medium text-luxury-dark bg-luxury-cream hover:bg-luxury-gold border border-luxury-gold transition-all duration-300 tracking-luxury"
              >
                Abmelden
              </button>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 text-luxury-ivory hover:text-luxury-gold hover:bg-luxury-brown focus:outline-none transition-colors duration-300 border border-luxury-gold"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="square"
                stroke-linejoin="miter"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="square"
                stroke-linejoin="miter"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-luxury-brown border-t-2 border-luxury-gold">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/search"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 text-base font-medium text-luxury-ivory hover:bg-luxury-dark transition-colors duration-300 border-b border-luxury-medium"
        >
          Orte finden
        </router-link>

        <router-link
          to="/manage-places"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 text-base font-medium text-luxury-ivory hover:bg-luxury-dark transition-colors duration-300 border-b border-luxury-medium"
        >
          Orte einstellen
        </router-link>

        <template v-if="!isAuthenticated">
          <router-link
            to="/login"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-base font-medium text-luxury-ivory hover:bg-luxury-dark transition-colors duration-300 border-b border-luxury-medium"
          >
            Einloggen
          </router-link>

          <router-link
            to="/register"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 text-base font-medium text-luxury-ivory hover:bg-luxury-dark transition-colors duration-300 border-b border-luxury-medium"
          >
            Registrieren
          </router-link>
        </template>

        <template v-else>
          <div class="px-3 py-2">
            <div class="flex items-center space-x-3 mb-3 p-3 bg-luxury-dark border border-luxury-gold">
              <div class="w-10 h-10 bg-luxury-cream flex items-center justify-center border border-luxury-gold">
                <svg class="w-6 h-6 text-luxury-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span class="text-luxury-cream text-sm font-medium">
                {{ currentUser?.email }}
              </span>
            </div>

            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 text-base font-medium text-luxury-ivory hover:bg-luxury-dark transition-colors duration-300 border border-luxury-gold"
            >
              Abmelden
            </button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { isAuthenticated, currentUser, logout, fetchUser } = useAuth()
const mobileMenuOpen = ref(false)

// Beim Start der Komponente Auth-Status prüfen
onMounted(() => {
  fetchUser()
})

const handleLogout = () => {
  logout()
  mobileMenuOpen.value = false
  // Zur Startseite navigieren nach Logout
  window.location.href = '/'
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
a, button {
  transition: all 0.3s ease;
}
</style>

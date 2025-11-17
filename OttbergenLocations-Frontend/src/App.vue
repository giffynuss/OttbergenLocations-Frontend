<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuth } from './composables/useAuth'

const { isAuthenticated, currentUser, logout, checkAuth } = useAuth()

// Beim Start der App prüfen ob User bereits eingeloggt ist
onMounted(() => {
  checkAuth()
})

const handleLogout = () => {
  logout()
  // Zur Startseite navigieren nach Logout
  window.location.href = '/'
}
</script>

<template>
  <div class="min-h-screen bg-booking-very-light">
    <nav class="bg-booking-dark-brown shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-white hover:text-booking-light-beige transition-colors">
              Buchungsplattform
            </router-link>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Immer sichtbare Navigation -->
            <router-link
              to="/"
              class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </router-link>
            <router-link
              to="/search"
              class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Suchen
            </router-link>

            <!-- Navigation für eingeloggte Nutzer -->
            <template v-if="isAuthenticated">
              <router-link
                to="/my-bookings"
                class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Meine Buchungen
              </router-link>
              <router-link
                to="/settings"
                class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Einstellungen
              </router-link>

              <div class="flex items-center space-x-3 ml-4 pl-4 border-l border-booking-medium-brown">
                <span class="text-booking-very-light text-sm">
                  {{ currentUser?.name }}
                </span>
                <button
                  @click="handleLogout"
                  class="bg-booking-medium-brown text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-booking-light-beige hover:text-booking-dark-brown transition-colors"
                >
                  Abmelden
                </button>
              </div>
            </template>

            <!-- Navigation für nicht eingeloggte Nutzer -->
            <template v-else>
              <router-link
                to="/login"
                class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Anmelden
              </router-link>
              <router-link
                to="/register"
                class="bg-booking-medium-brown text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-booking-light-beige hover:text-booking-dark-brown transition-colors"
              >
                Registrieren
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
/* Navigation active state */
a.router-link-active {
  @apply text-white bg-booking-medium-brown;
}
</style>

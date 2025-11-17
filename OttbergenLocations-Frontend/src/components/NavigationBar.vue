<template>
  <nav class="bg-booking-dark-brown shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold text-white tracking-wide hover:text-booking-light-beige transition-colors duration-300">
              BOOK A PLACE!
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Immer sichtbare Buttons -->
          <router-link
            to="/search"
            class="px-4 py-2 rounded-md text-sm font-medium text-white bg-booking-medium-brown hover:bg-booking-light-beige hover:text-booking-dark-brown transition-colors duration-300"
          >
            Orte finden
          </router-link>

          <router-link
            to="/manage-places"
            class="px-4 py-2 rounded-md text-sm font-medium text-white bg-booking-medium-brown hover:bg-booking-light-beige hover:text-booking-dark-brown transition-colors duration-300"
          >
            Orte einstellen
          </router-link>

          <!-- Nicht angemeldet -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="px-4 py-2 rounded-md text-sm font-medium text-booking-dark-brown bg-booking-beige hover:bg-booking-light-beige transition-colors duration-300"
            >
              Einloggen
            </router-link>

            <router-link
              to="/register"
              class="px-4 py-2 rounded-md text-sm font-medium text-white bg-booking-gray-brown hover:bg-booking-dark-brown transition-colors duration-300"
            >
              Registrieren
            </router-link>
          </template>

          <!-- Angemeldet -->
          <template v-else>
            <div class="flex items-center space-x-3 ml-4 pl-4 border-l border-booking-medium-brown">
              <!-- E-Mail -->
              <span class="text-booking-very-light text-sm font-medium">
                {{ currentUser?.email }}
              </span>

              <!-- Profilbild-Icon -->
              <div class="w-10 h-10 rounded-full bg-booking-beige flex items-center justify-center hover:bg-booking-light-beige transition-colors duration-300 cursor-pointer">
                <svg class="w-6 h-6 text-booking-dark-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <!-- Abmelden Button -->
              <button
                @click="handleLogout"
                class="px-4 py-2 rounded-md text-sm font-medium text-booking-dark-brown bg-booking-beige hover:bg-booking-light-beige transition-colors duration-300"
              >
                abmelden
              </button>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-booking-light-beige hover:bg-booking-medium-brown focus:outline-none transition-colors duration-300"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-booking-medium-brown">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/search"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-booking-dark-brown transition-colors duration-300"
        >
          Orte finden
        </router-link>

        <router-link
          to="/manage-places"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-booking-dark-brown transition-colors duration-300"
        >
          Orte einstellen
        </router-link>

        <template v-if="!isAuthenticated">
          <router-link
            to="/login"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-booking-dark-brown transition-colors duration-300"
          >
            Einloggen
          </router-link>

          <router-link
            to="/register"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-booking-dark-brown transition-colors duration-300"
          >
            Registrieren
          </router-link>
        </template>

        <template v-else>
          <div class="px-3 py-2">
            <div class="flex items-center space-x-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-booking-beige flex items-center justify-center">
                <svg class="w-6 h-6 text-booking-dark-brown" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span class="text-booking-very-light text-sm font-medium">
                {{ currentUser?.email }}
              </span>
            </div>

            <button
              @click="handleLogout"
              class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-booking-dark-brown transition-colors duration-300"
            >
              abmelden
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

const { isAuthenticated, currentUser, logout, checkAuth } = useAuth()
const mobileMenuOpen = ref(false)

// Beim Start der Komponente Auth-Status prüfen
onMounted(() => {
  checkAuth()
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

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-booking-dark-brown to-booking-medium-brown text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">
            Willkommen zur Buchungsplattform
          </h1>
          <p class="text-xl text-booking-very-light mb-8 max-w-2xl mx-auto">
            Entdecken Sie einzigartige Unterkünfte und buchen Sie Ihren nächsten Aufenthalt mit nur wenigen Klicks.
          </p>
          <div class="flex justify-center space-x-4">
            <router-link
              to="/search"
              class="bg-white text-booking-dark-brown px-8 py-3 rounded-lg font-semibold hover:bg-booking-very-light transition-colors duration-300"
            >
              Jetzt suchen
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/register"
              class="bg-booking-medium-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-booking-dark-brown border-2 border-white transition-colors duration-300"
            >
              Registrieren
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-booking-dark-brown text-center mb-12">
        Warum unsere Plattform?
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-booking-dark-brown mb-3">
            Einfache Suche
          </h3>
          <p class="text-booking-gray-brown">
            Finden Sie schnell und einfach die perfekte Unterkunft für Ihre Bedürfnisse.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-booking-dark-brown mb-3">
            Sichere Buchung
          </h3>
          <p class="text-booking-gray-brown">
            Ihre Daten sind bei uns sicher. Buchen Sie mit Vertrauen und Sicherheit.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-booking-dark-brown mb-3">
            Beste Preise
          </h3>
          <p class="text-booking-gray-brown">
            Profitieren Sie von attraktiven Preisen und exklusiven Angeboten.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-booking-beige py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-booking-dark-brown mb-4">
          Bereit für Ihr nächstes Abenteuer?
        </h2>
        <p class="text-booking-gray-brown mb-8 text-lg">
          Starten Sie jetzt Ihre Suche und finden Sie die perfekte Unterkunft.
        </p>
        <router-link
          to="/search"
          class="inline-block bg-booking-dark-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Unterkunft finden
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { isAuthenticated } = useAuth()
</script>

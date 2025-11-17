<template>
  <div class="min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-booking-dark-brown mb-6">
          Über uns
        </h1>
        <p class="text-xl text-booking-gray-brown max-w-3xl mx-auto">
          IOSS IT GmbH & Kulturgemeinschaft Ottbergen e.V.
        </p>
      </div>

      <!-- Content Sections -->
      <div class="space-y-12">
        <!-- Section 1: About -->
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 class="text-3xl font-bold text-booking-dark-brown mb-6">
            Willkommen bei Book a Place
          </h2>
          <p class="text-booking-gray-brown text-lg leading-relaxed mb-4">
            Book a Place ist eine innovative Plattform zur Buchung von Veranstaltungsorten in Ottbergen und Umgebung.
            Wir verbinden moderne Technologie mit kultureller Gemeinschaft, um Ihnen die perfekte Location für Ihre Veranstaltung zu bieten.
          </p>
          <p class="text-booking-gray-brown text-lg leading-relaxed">
            Ob Firmenveranstaltung, private Feier oder kulturelle Events – bei uns finden Sie den passenden Raum
            für jeden Anlass.
          </p>
        </div>

        <!-- Section 2: Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-booking-dark-brown mb-3">
              Vielfältige Locations
            </h3>
            <p class="text-booking-gray-brown">
              Von kleinen Besprechungsräumen bis zu großen Veranstaltungssälen – wir haben die passende Location für jede Gruppengröße.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-booking-dark-brown mb-3">
              Einfache Buchung
            </h3>
            <p class="text-booking-gray-brown">
              Buchen Sie Ihren Wunschtermin in wenigen Klicks. Unsere Plattform macht die Reservierung einfach und transparent.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-booking-dark-brown mb-3">
              Kulturgemeinschaft
            </h3>
            <p class="text-booking-gray-brown">
              Als Teil der Kulturgemeinschaft Ottbergen e.V. fördern wir lokale Kultur und Gemeinschaft.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="w-16 h-16 bg-booking-medium-brown rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-booking-dark-brown mb-3">
              Professioneller Service
            </h3>
            <p class="text-booking-gray-brown">
              Unser Team unterstützt Sie bei der Planung und Durchführung Ihrer Veranstaltung.
            </p>
          </div>
        </div>

        <!-- Section 3: Contact CTA -->
        <div class="bg-gradient-to-r from-booking-dark-brown to-booking-medium-brown rounded-lg shadow-xl p-12 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">
            Bereit, Ihre Veranstaltung zu planen?
          </h2>
          <p class="text-xl mb-8 opacity-90">
            Starten Sie jetzt und finden Sie den perfekten Veranstaltungsort.
          </p>
          <router-link
            to="/search"
            class="inline-block bg-white text-booking-dark-brown px-8 py-4 rounded-lg font-semibold hover:bg-booking-very-light transition-colors duration-300 transform hover:scale-105"
          >
            Zur Suche
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About View Component
</script>

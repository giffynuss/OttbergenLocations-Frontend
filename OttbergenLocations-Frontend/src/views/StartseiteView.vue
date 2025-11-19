<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <!-- Luxuriöser Gradient mit neuen Farben -->
      <div class="absolute inset-0 bg-gradient-to-br from-luxury-dark via-luxury-brown to-luxury-medium opacity-95"></div>

      <!-- Alternative: Use an actual background image -->
      <!--
      <img
        src="/path/to/your/venue-image.jpg"
        alt="Veranstaltungsraum"
        class="w-full h-full object-cover"
      />
      -->

      <!-- Overlay für bessere Lesbarkeit -->
      <div class="absolute inset-0 bg-luxury-dark opacity-30"></div>

      <!-- Dekoratives geometrisches Muster -->
      <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 60px 60px; color: var(--color-luxury-gold);"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Dekorative Linie oben -->
      <div class="flex items-center justify-center mb-8">
        <div class="h-px w-16 bg-luxury-gold"></div>
        <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
        <div class="h-px w-16 bg-luxury-gold"></div>
      </div>

      <!-- Subtitle / Organization Name -->
      <p class="text-luxury-cream text-xs sm:text-sm md:text-base font-light tracking-luxury-wide mb-8 uppercase">
        OISS IT GMBH — KULTURGEMEINSCHAFT OTTBERGEN E.V.
      </p>

      <!-- Main Heading -->
      <h1 class="font-luxury text-luxury-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-luxury">
        Buche deinen<br class="hidden sm:block" />
        Veranstaltungsort
      </h1>

      <!-- Untertitel -->
      <p class="text-luxury-light text-lg sm:text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto tracking-luxury">
        Exklusive Locations für unvergessliche Momente
      </p>

      <!-- Call-to-Action Buttons mit spitzen Ecken -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <router-link
          to="/search"
          class="w-full sm:w-auto px-10 py-4 text-luxury-dark bg-luxury-gold text-lg font-semibold border-2 border-luxury-gold hover:bg-transparent hover:text-luxury-gold transition-all duration-300 transform hover:scale-105 tracking-luxury shadow-luxury-lg"
        >
          STARTE SUCHE
        </router-link>

        <router-link
          to="/about"
          class="w-full sm:w-auto px-10 py-4 text-luxury-ivory text-lg font-semibold border-2 border-luxury-ivory hover:bg-luxury-ivory hover:text-luxury-dark transition-all duration-300 transform hover:scale-105 tracking-luxury"
        >
          ERFAHRE MEHR
        </router-link>
      </div>

      <!-- Dekorative Linie unten -->
      <div class="flex items-center justify-center mt-16">
        <div class="h-px w-16 bg-luxury-gold"></div>
        <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
        <div class="h-px w-16 bg-luxury-gold"></div>
      </div>

      <!-- Optional: Scroll Down Indicator mit spitzen Ecken -->
      <a href="#about" class="mt-12 animate-bounce block">
        <svg
          class="w-6 h-6 mx-auto text-luxury-gold cursor-pointer hover:text-luxury-ivory transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </div>
  </div>

  <!-- About Section - direkt unter Hero -->
  <div id="about" class="min-h-screen py-20 bg-luxury-ivory scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-20">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-20 bg-luxury-gold"></div>
          <div class="h-1.5 w-1.5 mx-3 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-20 bg-luxury-gold"></div>
        </div>

        <h2 class="font-luxury text-5xl md:text-6xl font-bold text-luxury-dark mb-8 tracking-luxury">
          Über uns
        </h2>
        <p class="text-xl text-luxury-brown max-w-3xl mx-auto tracking-luxury font-light">
          OISS IT GmbH & Kulturgemeinschaft Ottbergen e.V.
        </p>
      </div>

      <!-- Content Sections -->
      <div class="space-y-12">
        <!-- Section 1: About -->
        <div class="card-luxury p-10 md:p-16">
          <h3 class="font-luxury text-4xl font-bold text-luxury-dark mb-8 tracking-luxury">
            Willkommen bei Book a Place
          </h3>
          <p class="text-luxury-brown text-lg leading-relaxed mb-6 font-light">
            Book a Place ist eine innovative Plattform zur Buchung von Veranstaltungsorten in Ottbergen und Umgebung.
            Wir verbinden moderne Technologie mit kultureller Gemeinschaft, um Ihnen die perfekte Location für Ihre Veranstaltung zu bieten.
          </p>
          <p class="text-luxury-brown text-lg leading-relaxed font-light">
            Ob Firmenveranstaltung, private Feier oder kulturelle Events – bei uns finden Sie den passenden Raum
            für jeden Anlass.
          </p>
        </div>

        <!-- Section 2: Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="card-luxury p-10">
            <div class="w-16 h-16 bg-luxury-gold flex items-center justify-center mb-6 border-2 border-luxury-dark">
              <svg class="w-8 h-8 text-luxury-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h4 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
              Vielfältige Locations
            </h4>
            <p class="text-luxury-brown font-light leading-relaxed">
              Von kleinen Besprechungsräumen bis zu großen Veranstaltungssälen – wir haben die passende Location für jede Gruppengröße.
            </p>
          </div>

          <div class="card-luxury p-10">
            <div class="w-16 h-16 bg-luxury-gold flex items-center justify-center mb-6 border-2 border-luxury-dark">
              <svg class="w-8 h-8 text-luxury-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
              Einfache Buchung
            </h4>
            <p class="text-luxury-brown font-light leading-relaxed">
              Buchen Sie Ihren Wunschtermin in wenigen Klicks. Unsere Plattform macht die Reservierung einfach und transparent.
            </p>
          </div>

          <div class="card-luxury p-10">
            <div class="w-16 h-16 bg-luxury-gold flex items-center justify-center mb-6 border-2 border-luxury-dark">
              <svg class="w-8 h-8 text-luxury-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
              Kulturgemeinschaft
            </h4>
            <p class="text-luxury-brown font-light leading-relaxed">
              Als Teil der Kulturgemeinschaft Ottbergen e.V. fördern wir lokale Kultur und Gemeinschaft.
            </p>
          </div>

          <div class="card-luxury p-10">
            <div class="w-16 h-16 bg-luxury-gold flex items-center justify-center mb-6 border-2 border-luxury-dark">
              <svg class="w-8 h-8 text-luxury-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
              Professioneller Service
            </h4>
            <p class="text-luxury-brown font-light leading-relaxed">
              Unser Team unterstützt Sie bei der Planung und Durchführung Ihrer Veranstaltung.
            </p>
          </div>
        </div>

        <!-- Section 3: Contact CTA -->
        <div class="relative bg-gradient-to-r from-luxury-dark to-luxury-brown shadow-luxury-xl p-12 md:p-16 text-center border-2 border-luxury-gold overflow-hidden">
          <!-- Dekoratives Muster im Hintergrund -->
          <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 40px 40px; color: var(--color-luxury-gold);"></div>

          <div class="relative z-10">
            <h3 class="font-luxury text-4xl font-bold mb-6 text-luxury-ivory tracking-luxury">
              Bereit, Ihre Veranstaltung zu planen?
            </h3>
            <p class="text-xl mb-10 text-luxury-light font-light tracking-luxury">
              Starten Sie jetzt und finden Sie den perfekten Veranstaltungsort.
            </p>
            <router-link
              to="/search"
              class="inline-block bg-luxury-gold text-luxury-dark px-12 py-4 font-semibold tracking-luxury border-2 border-luxury-gold hover:bg-transparent hover:text-luxury-gold transition-all duration-300 transform hover:scale-105 shadow-luxury-lg"
            >
              ZUR SUCHE
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Startseite View Component
// This is the landing page with hero section and about section
</script>

<style scoped>
/* Additional custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1, p, .flex {
  animation: fadeIn 1s ease-out;
}

/* Ensure full viewport height */
.min-h-screen {
  min-height: 100vh;
}

/* Button hover effect enhancement */
button:hover,
a:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>

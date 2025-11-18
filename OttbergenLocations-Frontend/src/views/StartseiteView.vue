<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <!-- Placeholder Background - You can replace this with an actual image -->
      <div class="absolute inset-0 bg-gradient-to-br from-booking-dark-brown via-booking-medium-brown to-booking-gray-brown opacity-90"></div>

      <!-- Alternative: Use an actual background image -->
      <!--
      <img
        src="/path/to/your/venue-image.jpg"
        alt="Veranstaltungsraum"
        class="w-full h-full object-cover"
      />
      -->

      <!-- Dark Overlay for better text readability -->
      <div class="absolute inset-0 bg-black opacity-40"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Subtitle / Organization Name -->
      <p class="text-white text-sm sm:text-base md:text-lg font-medium tracking-widest mb-6 uppercase opacity-90">
        IOSS IT GMBH — BOOK A PLACE KULTURGEMEINSCHAFT OTTBERGEN E.V.
      </p>

      <!-- Main Heading -->
      <h1 class="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight">
        Buche deinen<br class="hidden sm:block" />
        Veranstaltungsort!
      </h1>

      <!-- Call-to-Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <router-link
          to="/search"
          class="w-full sm:w-auto px-8 py-4 text-white text-lg font-semibold border-2 border-white rounded-md hover:bg-white hover:text-booking-dark-brown transition-all duration-300 transform hover:scale-105"
        >
          STARTE SUCHE
        </router-link>

        <router-link
          to="/about"
          class="w-full sm:w-auto px-8 py-4 text-white text-lg font-semibold border-2 border-white rounded-md hover:bg-white hover:text-booking-dark-brown transition-all duration-300 transform hover:scale-105"
        >
          ERFAHRE MEHR
        </router-link>
      </div>

      <!-- Optional: Scroll Down Indicator -->
      <div class="mt-16 animate-bounce">
        <svg
          class="w-6 h-6 mx-auto text-white opacity-75"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Startseite View Component
// This is the landing page with hero section
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

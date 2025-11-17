<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-booking-dark-brown mb-8">
        Meine Buchungen
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-booking-medium-brown hover:shadow-xl transition-shadow duration-300"
        >
          <h3 class="text-xl font-semibold text-booking-dark-brown mb-2">
            Buchung #{{ i }}
          </h3>
          <p class="text-booking-gray-brown mb-4">
            Beispiel-Buchungsinformationen
          </p>
          <router-link
            :to="`/booking/${i}`"
            class="text-booking-medium-brown hover:text-booking-dark-brown font-medium"
          >
            Details anzeigen →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Bookings View Component
</script>

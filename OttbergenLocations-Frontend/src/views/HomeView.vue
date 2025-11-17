<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-booking-dark-brown mb-8">
        Willkommen zur Buchungsplattform
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-8 border-t-4 border-booking-medium-brown">
        <p class="text-lg text-booking-gray-brown mb-6">
          Hier können Sie Ihre Buchungen verwalten und neue Reservierungen vornehmen.
        </p>

        <router-link
          to="/bookings"
          class="inline-block bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Zu den Buchungen
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home View Component
</script>

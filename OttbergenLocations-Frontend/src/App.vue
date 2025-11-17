<script setup lang="ts">
import { RouterView } from 'vue-router'
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
            <router-link
              to="/"
              class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </router-link>
            <router-link
              to="/bookings"
              class="text-booking-very-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Buchungen
            </router-link>
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

<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link
        to="/bookings"
        class="inline-flex items-center text-booking-medium-brown hover:text-booking-dark-brown mb-6"
      >
        ← Zurück zu den Buchungen
      </router-link>

      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-booking-dark-brown mb-6">
          Buchungsdetails #{{ $route.params.id }}
        </h1>

        <div class="space-y-4">
          <div class="border-b border-booking-light-beige pb-4">
            <h2 class="text-lg font-semibold text-booking-dark-brown mb-2">
              Buchungsinformationen
            </h2>
            <p class="text-booking-gray-brown">
              Hier werden die detaillierten Buchungsinformationen angezeigt.
            </p>
          </div>

          <div class="border-b border-booking-light-beige pb-4">
            <h2 class="text-lg font-semibold text-booking-dark-brown mb-2">
              Zeitraum
            </h2>
            <p class="text-booking-gray-brown">
              Datum und Zeitinformationen
            </p>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-booking-dark-brown mb-2">
              Status
            </h2>
            <span class="inline-block bg-booking-beige text-booking-dark-brown px-3 py-1 rounded-full text-sm">
              Bestätigt
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>

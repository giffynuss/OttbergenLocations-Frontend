<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-booking-dark-brown">
          Orte einstellen
        </h1>
        <button
          @click="showAddModal = true"
          class="bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300 font-medium"
        >
          + Neuen Ort hinzufügen
        </button>
      </div>

      <!-- Info Text -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <p class="text-booking-gray-brown">
          Verwalten Sie hier Ihre Orte und Unterkünfte. Sie können neue Orte hinzufügen, bestehende bearbeiten oder löschen.
        </p>
      </div>

      <!-- Places List -->
      <div v-if="places.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="place in places"
          :key="place.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Image Placeholder -->
          <div class="h-48 bg-gradient-to-r from-booking-beige to-booking-light-beige flex items-center justify-center">
            <svg class="w-16 h-16 text-booking-gray-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-semibold text-booking-dark-brown">
                {{ place.title }}
              </h3>
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                :class="place.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ place.active ? 'Aktiv' : 'Inaktiv' }}
              </span>
            </div>

            <p class="text-booking-gray-brown mb-2">
              <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ place.location }}
            </p>

            <p class="text-booking-gray-brown mb-4">
              <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {{ place.capacity }} Personen
            </p>

            <div class="flex justify-between items-center pt-4 border-t border-booking-light-beige">
              <span class="text-2xl font-bold text-booking-dark-brown">
                {{ place.price }}€ / Nacht
              </span>
              <div class="space-x-2">
                <button
                  @click="editPlace(place)"
                  class="text-booking-medium-brown hover:text-booking-dark-brown font-medium"
                >
                  Bearbeiten
                </button>
                <button
                  @click="deletePlace(place.id)"
                  class="text-red-600 hover:text-red-800 font-medium"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 bg-booking-beige rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-booking-gray-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <p class="text-booking-gray-brown text-lg mb-4">
          Sie haben noch keine Orte eingestellt.
        </p>
        <button
          @click="showAddModal = true"
          class="inline-block bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Ersten Ort hinzufügen
        </button>
      </div>
    </div>

    <!-- Simple Add Modal Placeholder -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold text-booking-dark-brown mb-4">
          Neuen Ort hinzufügen
        </h2>
        <p class="text-booking-gray-brown mb-6">
          Funktion wird in Kürze verfügbar sein.
        </p>
        <button
          @click="showAddModal = false"
          class="w-full bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Schließen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Place {
  id: number
  title: string
  location: string
  capacity: number
  price: number
  active: boolean
}

const places = ref<Place[]>([
  {
    id: 1,
    title: 'Gemütliche Ferienwohnung',
    location: 'Berlin Mitte',
    capacity: 4,
    price: 89,
    active: true
  },
  {
    id: 2,
    title: 'Modernes Apartment',
    location: 'München Schwabing',
    capacity: 2,
    price: 120,
    active: true
  },
  {
    id: 3,
    title: 'Strandhaus an der Ostsee',
    location: 'Rügen',
    capacity: 6,
    price: 180,
    active: false
  }
])

const showAddModal = ref(false)

const editPlace = (place: Place) => {
  alert(`Bearbeiten: ${place.title}`)
}

const deletePlace = (id: number) => {
  if (confirm('Möchten Sie diesen Ort wirklich löschen?')) {
    places.value = places.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-booking-dark-brown mb-8">
        Buchung suchen
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <form @submit.prevent="handleSearch" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Standort
              </label>
              <input
                id="location"
                v-model="searchForm.location"
                type="text"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
                placeholder="z.B. Berlin, München..."
              />
            </div>

            <div>
              <label for="category" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Kategorie
              </label>
              <select
                id="category"
                v-model="searchForm.category"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              >
                <option value="">Alle Kategorien</option>
                <option value="hotel">Hotel</option>
                <option value="apartment">Apartment</option>
                <option value="house">Haus</option>
                <option value="room">Zimmer</option>
              </select>
            </div>

            <div>
              <label for="checkIn" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Check-in
              </label>
              <input
                id="checkIn"
                v-model="searchForm.checkIn"
                type="date"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="checkOut" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Check-out
              </label>
              <input
                id="checkOut"
                v-model="searchForm.checkOut"
                type="date"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="guests" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Gäste
              </label>
              <input
                id="guests"
                v-model.number="searchForm.guests"
                type="number"
                min="1"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300 font-medium"
          >
            Suchen
          </button>
        </form>
      </div>

      <div v-if="searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="h-48 bg-booking-beige"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-booking-dark-brown mb-2">
              {{ result.title }}
            </h3>
            <p class="text-booking-gray-brown mb-4">
              {{ result.location }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-booking-dark-brown">
                {{ result.price }}€
              </span>
              <button class="bg-booking-medium-brown text-white px-4 py-2 rounded hover:bg-booking-dark-brown transition-colors">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="hasSearched" class="text-center py-12">
        <p class="text-booking-gray-brown text-lg">
          Keine Ergebnisse gefunden. Versuchen Sie es mit anderen Suchkriterien.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const searchForm = reactive({
  location: '',
  category: '',
  checkIn: '',
  checkOut: '',
  guests: 1
})

const searchResults = ref<Array<{ id: number; title: string; location: string; price: number }>>([])
const hasSearched = ref(false)

const handleSearch = () => {
  hasSearched.value = true
  // Simulierte Suchergebnisse
  searchResults.value = [
    { id: 1, title: 'Gemütliches Apartment', location: searchForm.location || 'Berlin', price: 89 },
    { id: 2, title: 'Modernes Stadthaus', location: searchForm.location || 'Berlin', price: 149 },
    { id: 3, title: 'Luxus Suite', location: searchForm.location || 'Berlin', price: 199 }
  ]
}
</script>

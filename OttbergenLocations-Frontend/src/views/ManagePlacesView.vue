<template>
  <div class="min-h-screen bg-luxury-ivory py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Überschrift mit Untertext -->
      <div class="text-center mb-12">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-16 bg-luxury-gold"></div>
          <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-16 bg-luxury-gold"></div>
        </div>

        <h1 class="font-luxury text-5xl font-bold text-luxury-dark tracking-luxury mb-4">
          Orte einstellen
        </h1>

        <!-- Untertext direkt unter Überschrift -->
        <p class="text-luxury-brown font-light text-lg max-w-3xl mx-auto">
          Verwalten Sie hier Ihre Orte und Veranstaltungsräume. Sie können neue Orte hinzufügen, bestehende bearbeiten oder löschen.
        </p>
      </div>

      <!-- Neuen Ort hinzufügen Button -->
      <div class="flex justify-center mb-12">
        <button
          @click="showAddModal = true"
          class="btn-luxury-primary px-8 py-4 text-base"
        >
          + NEUEN ORT HINZUFÜGEN
        </button>
      </div>

      <!-- Places Grid -->
      <div v-if="places.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="place in places"
          :key="place.id"
          class="card-luxury overflow-hidden hover:shadow-luxury-xl transition-all duration-300 flex flex-col"
        >
          <!-- Bild-Bereich mit Gradient-Overlay und Text -->
          <div class="h-64 bg-gradient-to-br from-luxury-medium via-luxury-tan to-luxury-cream relative overflow-hidden">
            <!-- Dekoratives Muster im Hintergrund -->
            <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 30px 30px; color: var(--color-luxury-dark);"></div>

            <!-- Hintergrund Icon -->
            <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-luxury-dark opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/70 to-transparent opacity-85"></div>

            <!-- Text über dem Bild -->
            <div class="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-luxury text-2xl font-bold text-luxury-ivory tracking-luxury drop-shadow-lg">
                  {{ place.title }}
                </h3>
                <span
                  class="px-3 py-1 text-xs font-medium border"
                  :class="place.active
                    ? 'bg-luxury-ivory/90 text-green-700 border-green-500'
                    : 'bg-luxury-ivory/90 text-red-700 border-red-500'"
                >
                  {{ place.active ? 'Aktiv' : 'Inaktiv' }}
                </span>
              </div>

              <!-- Details -->
              <div class="flex flex-wrap items-center gap-3 text-sm">
                <div class="flex items-center gap-2 bg-luxury-ivory/90 backdrop-blur-sm px-3 py-1.5 border border-luxury-gold">
                  <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="font-medium text-luxury-dark">{{ place.location }}</span>
                </div>
                <div class="flex items-center gap-2 bg-luxury-ivory/90 backdrop-blur-sm px-3 py-1.5 border border-luxury-gold">
                  <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span class="font-medium text-luxury-dark">{{ place.capacity }} Personen</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Preis-Bereich (statisch wie in SearchView) -->
          <div class="bg-luxury-light border-t-2 border-luxury-medium p-5">
            <div class="text-center mb-4">
              <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Preis pro Tag</p>
              <p class="font-luxury text-3xl font-bold text-luxury-dark tracking-luxury">{{ place.price }}€</p>
            </div>

            <!-- Aktionsbuttons -->
            <div class="flex gap-3">
              <button
                @click="editPlace(place)"
                class="flex-1 px-4 py-2.5 bg-luxury-dark text-luxury-ivory font-medium tracking-luxury hover:bg-luxury-brown transition-all duration-300 border border-luxury-dark text-sm"
              >
                BEARBEITEN
              </button>
              <button
                @click="deletePlace(place.id)"
                class="flex-1 px-4 py-2.5 bg-white text-red-700 font-medium tracking-luxury hover:bg-red-50 transition-all duration-300 border-2 border-red-600 text-sm"
              >
                LÖSCHEN
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-32 h-32 bg-gradient-to-br from-luxury-light via-luxury-cream to-luxury-tan mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
          <!-- Dekoratives Muster -->
          <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 20px 20px; color: var(--color-luxury-dark);"></div>

          <svg class="w-20 h-20 text-luxury-brown opacity-50 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>

        <p class="font-luxury text-2xl text-luxury-dark font-bold mb-2 tracking-luxury">
          Keine Orte vorhanden
        </p>
        <p class="text-luxury-brown text-base font-light mb-8">
          Sie haben noch keine Orte eingestellt.
        </p>

        <button
          @click="showAddModal = true"
          class="btn-luxury-primary px-8 py-3"
        >
          ERSTEN ORT HINZUFÜGEN
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-luxury-dark bg-opacity-75 flex items-center justify-center z-50 px-4"
      @click.self="showAddModal = false"
    >
      <div class="card-luxury p-8 max-w-md w-full mx-4 relative">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-12 bg-luxury-gold"></div>
          <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-12 bg-luxury-gold"></div>
        </div>

        <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-4 text-center tracking-luxury">
          Neuen Ort hinzufügen
        </h2>

        <p class="text-luxury-brown font-light mb-8 text-center">
          Diese Funktion wird in Kürze verfügbar sein.
        </p>

        <button
          @click="showAddModal = false"
          class="btn-luxury-primary w-full"
        >
          SCHLIESSEN
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
    title: 'Kulturraum Ottbergen',
    location: 'Ottbergen',
    capacity: 100,
    price: 250,
    active: true
  },
  {
    id: 2,
    title: 'Gemeindesaal St. Marien',
    location: 'Ottbergen Nord',
    capacity: 60,
    price: 150,
    active: true
  },
  {
    id: 3,
    title: 'Dorfgemeinschaftshaus',
    location: 'Ottbergen Süd',
    capacity: 40,
    price: 120,
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

<style scoped>
/* Smooth transitions for cards */
.card-luxury {
  transition: all 0.3s ease;
}
</style>

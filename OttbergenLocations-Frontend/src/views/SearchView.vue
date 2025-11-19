<template>
  <div class="min-h-screen bg-luxury-ivory">
    <!-- Suchleiste oben - unter der fixierten Navigation -->
    <div class="bg-white shadow-luxury-md sticky top-0 z-40 border-b-2 border-luxury-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Suchfeld -->
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Suche einen Ort..."
                class="input-luxury pl-12"
                @keyup.enter="performSearch"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Datumswähler -->
          <div class="flex gap-4">
            <div>
              <input
                v-model="checkInDate"
                type="date"
                class="input-luxury"
                @change="calculateTotalPrice"
              />
            </div>
            <div>
              <input
                v-model="checkOutDate"
                type="date"
                class="input-luxury"
                @change="calculateTotalPrice"
              />
            </div>
          </div>

          <!-- Such-Button -->
          <button
            @click="performSearch"
            class="btn-luxury-primary"
          >
            Suchen
          </button>
        </div>
      </div>
    </div>

    <!-- Split-Screen Layout -->
    <div class="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
      <!-- Linke Seite: Suchergebnisse -->
      <div class="lg:w-1/2 overflow-y-auto p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-8 tracking-luxury">
            {{ searchResults.length }} Ergebnisse gefunden
          </h2>

          <div v-if="searchResults.length > 0" class="space-y-6">
            <!-- Längliche Karten mit Bild links, Content Mitte, Preis rechts -->
            <div
              v-for="place in searchResults"
              :key="place.id"
              class="card-luxury overflow-hidden hover:shadow-luxury-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
              @click="selectedPlace = place"
              :class="{ 'ring-2 ring-luxury-gold': selectedPlace?.id === place.id }"
            >
              <!-- Bild Placeholder - Links, schmaler -->
              <div class="md:w-64 h-48 md:h-auto bg-gradient-to-br from-luxury-medium via-luxury-tan to-luxury-cream flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <!-- Dekoratives Muster im Hintergrund -->
                <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 30px 30px; color: var(--color-luxury-dark);"></div>

                <svg class="w-24 h-24 text-luxury-dark opacity-40 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>

              <!-- Content - Mitte, flexible Breite -->
              <div class="flex-1 p-6">
                <!-- Ortsname -->
                <h3 class="font-luxury text-2xl font-bold text-luxury-dark mb-3 tracking-luxury">
                  {{ place.name }}
                </h3>

                <!-- Beschreibung (2 Zeilen) -->
                <p class="text-luxury-brown text-base mb-4 line-clamp-2 leading-relaxed font-light">
                  {{ place.description }}
                </p>

                <!-- Details/Tags -->
                <div class="flex flex-wrap items-center gap-3 text-sm text-luxury-dark">
                  <div class="flex items-center gap-2 bg-luxury-light px-3 py-1.5 border border-luxury-medium">
                    <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span class="font-medium">{{ place.capacity }} Personen</span>
                  </div>
                  <div class="flex items-center gap-2 bg-luxury-light px-3 py-1.5 border border-luxury-medium">
                    <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="font-medium">{{ place.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Preis - Rechts, fixierte Breite -->
              <div class="md:w-56 flex flex-col justify-between p-6 bg-luxury-light border-t md:border-t-0 md:border-l-2 border-luxury-medium">
                <!-- Preis pro Tag -->
                <div class="text-right">
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Preis pro Tag</p>
                  <p class="font-luxury text-3xl font-bold text-luxury-dark tracking-luxury">{{ place.pricePerDay }}€</p>
                </div>

                <!-- Gesamtpreis falls Datum ausgewählt -->
                <div v-if="numberOfDays > 0" class="text-right mt-4 pt-4 border-t border-luxury-medium">
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Gesamtpreis ({{ numberOfDays }} Tage)</p>
                  <p class="font-luxury text-2xl font-bold text-luxury-gold tracking-luxury">{{ calculatePlaceTotal(place.pricePerDay) }}€</p>
                </div>

                <!-- Buchen Button -->
                <button
                  @click.stop="bookPlace(place)"
                  class="mt-4 w-full px-4 py-2.5 bg-luxury-dark text-luxury-ivory font-medium tracking-luxury hover:bg-luxury-brown transition-all duration-300 border border-luxury-dark text-sm"
                >
                  BUCHEN
                </button>
              </div>
            </div>
          </div>

          <!-- Keine Ergebnisse -->
          <div v-else class="text-center py-16">
            <svg class="w-32 h-32 mx-auto text-luxury-tan opacity-40 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="font-luxury text-2xl text-luxury-brown mb-2">
              Keine Orte gefunden
            </p>
            <p class="text-luxury-tan text-base font-light">
              Versuchen Sie es mit anderen Suchbegriffen
            </p>
          </div>
        </div>
      </div>

      <!-- Rechte Seite: Karte -->
      <div class="lg:w-1/2 bg-luxury-light relative">
        <div class="sticky top-24 h-[calc(100vh-180px)]">
          <!-- Karten-Placeholder -->
          <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-luxury-light via-luxury-cream to-luxury-tan relative overflow-hidden">
            <!-- Dekoratives Muster im Hintergrund -->
            <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 60px 60px; color: var(--color-luxury-dark);"></div>

            <!-- Map Icon -->
            <svg class="w-40 h-40 text-luxury-brown opacity-30 mb-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            <p class="font-luxury text-2xl text-luxury-dark font-bold mb-2 relative z-10 tracking-luxury">Interaktive Karte</p>
            <p class="text-luxury-brown text-base font-light relative z-10">OpenStreetMap Integration</p>

            <!-- Markierte Orte auf der Karte -->
            <div v-if="selectedPlace" class="absolute bottom-8 left-8 right-8 bg-white shadow-luxury-xl p-6 border-2 border-luxury-gold z-20">
              <h4 class="font-luxury text-xl font-bold text-luxury-dark mb-2 tracking-luxury">{{ selectedPlace.name }}</h4>
              <div class="flex items-center gap-2 text-sm text-luxury-brown mb-3">
                <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="font-medium">{{ selectedPlace.location }}</span>
              </div>
              <p class="font-luxury text-2xl text-luxury-gold font-bold tracking-luxury">{{ selectedPlace.pricePerDay }}€ <span class="text-sm font-normal text-luxury-brown">/ Tag</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Place {
  id: number
  name: string
  description: string
  location: string
  capacity: number
  pricePerDay: number
  latitude?: number
  longitude?: number
}

// Suchformular
const searchQuery = ref('')
const checkInDate = ref('')
const checkOutDate = ref('')

// Mock-Daten für 4 Beispiel-Orte
const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Kulturraum Ottbergen',
    description: 'Ein wunderschöner Veranstaltungsraum im Herzen von Ottbergen. Perfekt für Hochzeiten, Firmenfeiern und kulturelle Events. Mit moderner Ausstattung und historischem Charme.',
    location: 'Ottbergen',
    capacity: 100,
    pricePerDay: 250
  },
  {
    id: 2,
    name: 'Gemeindesaal St. Marien',
    description: 'Heller und freundlicher Saal mit Bühne und Nebenräumen. Ideal für Familienfeiern, Konzerte und Workshops. Küche und Sanitäranlagen vorhanden.',
    location: 'Ottbergen Nord',
    capacity: 60,
    pricePerDay: 150
  },
  {
    id: 3,
    name: 'Dorfgemeinschaftshaus',
    description: 'Traditionelles Gemeinschaftshaus mit rustikalem Charme. Bietet Platz für kleinere Veranstaltungen und Treffen. Voll ausgestattete Küche inklusive.',
    location: 'Ottbergen Süd',
    capacity: 40,
    pricePerDay: 120
  },
  {
    id: 4,
    name: 'Scheune am Waldrand',
    description: 'Umgebaute historische Scheune mit besonderem Ambiente. Perfekt für rustikale Hochzeiten und Gartenpartys. Große Außenfläche mit Gartenmöbeln verfügbar.',
    location: 'Ottbergen West',
    capacity: 80,
    pricePerDay: 300
  }
]

const searchResults = ref<Place[]>([...mockPlaces])
const selectedPlace = ref<Place | null>(null)

// Berechnung der Anzahl der Tage
const numberOfDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0

  const checkIn = new Date(checkInDate.value)
  const checkOut = new Date(checkOutDate.value)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
})

// Gesamtpreis für einen Ort berechnen
const calculatePlaceTotal = (pricePerDay: number) => {
  return pricePerDay * numberOfDays.value
}

// Gesamtpreis berechnen (wenn Daten sich ändern)
const calculateTotalPrice = () => {
  // Logik für Preisberechnung wird hier ausgeführt
  console.log('Tage:', numberOfDays.value)
}

// Suche durchführen
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [...mockPlaces]
    return
  }

  searchResults.value = mockPlaces.filter(place =>
    place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    place.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  console.log('=== SUCHE DURCHGEFÜHRT ===')
  console.log('Suchbegriff:', searchQuery.value)
  console.log('Check-in:', checkInDate.value)
  console.log('Check-out:', checkOutDate.value)
  console.log('Anzahl Ergebnisse:', searchResults.value.length)
  console.log('=========================')
}

// Ort buchen
const bookPlace = (place: Place) => {
  if (!checkInDate.value || !checkOutDate.value) {
    alert('Bitte wählen Sie Check-in und Check-out Datum')
    return
  }

  console.log('=== BUCHUNG ===')
  console.log('Ort:', place.name)
  console.log('Check-in:', checkInDate.value)
  console.log('Check-out:', checkOutDate.value)
  console.log('Tage:', numberOfDays.value)
  console.log('Gesamtpreis:', calculatePlaceTotal(place.pricePerDay), '€')
  console.log('===============')

  alert(`Buchungsanfrage für "${place.name}" wurde gesendet!\n\nGesamtpreis: ${calculatePlaceTotal(place.pricePerDay)}€ für ${numberOfDays.value} Tage`)
}
</script>

<style scoped>
/* Line clamp für Beschreibung - 2 Zeilen für bessere Lesbarkeit */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Luxury Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--color-luxury-gold) var(--color-luxury-light);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 10px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--color-luxury-light);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--color-luxury-gold);
  border: 2px solid var(--color-luxury-light);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-luxury-medium);
}
</style>

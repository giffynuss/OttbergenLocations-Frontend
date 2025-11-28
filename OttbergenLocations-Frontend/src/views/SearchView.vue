<template>
  <div class="min-h-screen bg-luxury-ivory">
    <!-- Suchleiste oben - unter der fixierten Navigation -->
    <div class="bg-white shadow-luxury-md sticky top-0 z-40 border-b-2 border-luxury-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Suchfeld -->
          <div class="flex-1">
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Suche einen Ort..." class="input-luxury pl-12"
                @keyup.enter="performSearch" />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-tan" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Datumswähler -->
          <div class="flex gap-4">
            <div>
              <input v-model="checkInDate" type="date" class="input-luxury" @change="calculateTotalPrice" />
            </div>
            <div>
              <input v-model="checkOutDate" type="date" class="input-luxury" @change="calculateTotalPrice" />
            </div>
          </div>

          <!-- Such-Button -->
          <button @click="performSearch" class="btn-luxury-primary">
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
            {{ loading ? 'Lädt...' : `${searchResults.length} Ergebnisse gefunden` }}
          </h2>

          <!-- Fehleranzeige -->
          <div v-if="error" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700">
            <p class="font-medium">{{ error }}</p>
          </div>

          <!-- Ladeanzeige -->
          <div v-if="loading" class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-gold"></div>
          </div>

          <div v-else-if="searchResults.length > 0" class="space-y-6">
            <!-- Längliche Karten mit Bild links (mit Overlay), Preis rechts -->
            <div v-for="place in searchResults" :key="place.id"
              class="card-luxury overflow-hidden hover:shadow-luxury-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
              @click="selectedPlace = place" :class="{ 'ring-2 ring-luxury-gold': selectedPlace?.id === place.id }">
              <!-- Bild mit Text Overlay - Links, flexible Breite -->
              <div
                class="flex-1 h-64 md:h-auto bg-gradient-to-br from-luxury-medium via-luxury-tan to-luxury-cream flex-shrink-0 relative overflow-hidden">
                <!-- Bild oder dekoratives Muster im Hintergrund -->
                <div class="absolute inset-0 bg-cover bg-center" :style="place?.images && place.images.length > 0
                  ? `background-image: url('${place.images[0]}'); opacity: 0.35;`
                  : `background-image:
                  linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%),
                  linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%);
                  background-size: 40px 40px;
                  opacity: 0.20;
                  color: var(--color-luxury-dark);`
                  "></div>

                <!-- Gradient Overlay für bessere Lesbarkeit -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/50 to-transparent opacity-40">
                </div>

                <!-- Text Content über dem Bild -->
                <div class="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <!-- Ortsname -->
                  <h3 class="font-luxury text-2xl font-bold text-luxury-ivory mb-3 tracking-luxury drop-shadow-lg">
                    {{ place.name }}
                  </h3>

                  <!-- Beschreibung (2 Zeilen) -->
                  <p class="text-luxury-light text-base mb-4 line-clamp-2 leading-relaxed font-light drop-shadow">
                    {{ place.description }}
                  </p>

                  <!-- Details/Tags -->
                  <div class="flex flex-wrap items-center gap-3 text-sm">
                    <div
                      class="flex items-center gap-2 bg-luxury-ivory/90 backdrop-blur-sm px-3 py-1.5 border border-luxury-gold">
                      <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                      </svg>
                      <span class="font-medium text-luxury-dark">{{ place.capacity }} Personen</span>
                    </div>
                    <div
                      class="flex items-center gap-2 bg-luxury-ivory/90 backdrop-blur-sm px-3 py-1.5 border border-luxury-gold">
                      <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span class="font-medium text-luxury-dark">{{ place.location }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preis - Rechts, schmalere fixierte Breite -->
              <div
                class="md:w-40 flex flex-col justify-between p-5 bg-luxury-light border-t md:border-t-0 md:border-l-2 border-luxury-medium">
                <!-- Preis pro Tag -->
                <div class="text-center">
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Pro Tag</p>
                  <p class="font-luxury text-2xl font-bold text-luxury-dark tracking-luxury">{{ place.pricePerDay }}€
                  </p>
                </div>

                <!-- Gesamtpreis falls Datum ausgewählt -->
                <div v-if="numberOfDays > 0" class="text-center mt-3 pt-3 border-t border-luxury-medium">
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">{{ numberOfDays }} Tage</p>
                  <p class="font-luxury text-xl font-bold text-luxury-gold tracking-luxury">{{
                    calculatePlaceTotal(place.pricePerDay) }}€</p>
                </div>

                <!-- Buchen Button -->
                <button @click.stop="bookPlace(place)"
                  class="mt-4 w-full px-3 py-2.5 bg-luxury-dark text-luxury-ivory font-medium tracking-luxury hover:bg-luxury-brown transition-all duration-300 border border-luxury-dark text-xs">
                  BUCHEN
                </button>
              </div>
            </div>
          </div>

          <!-- Keine Ergebnisse -->
          <div v-else-if="!loading" class="text-center py-16">
            <svg class="w-32 h-32 mx-auto text-luxury-tan opacity-40 mb-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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

      <!-- Rechte Seite: Bildergalerie -->
      <div class="lg:w-1/2 bg-luxury-light relative">
        <div class="sticky top-24 h-[calc(100vh-180px)]">
          <!-- Placeholder wenn kein Ort ausgewählt -->
          <div v-if="!selectedPlace"
            class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-luxury-light via-luxury-cream to-luxury-tan relative overflow-hidden">
            <!-- Dekoratives Muster im Hintergrund -->
            <div class="absolute inset-0 opacity-10"
              style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 60px 60px; color: var(--color-luxury-dark);">
            </div>

            <!-- Image Icon -->
            <svg class="w-40 h-40 text-luxury-brown opacity-30 mb-6 relative z-10" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
            <p class="font-luxury text-2xl text-luxury-dark font-bold mb-2 relative z-10 tracking-luxury">Bildergalerie
            </p>
            <p class="text-luxury-brown text-base font-light relative z-10">Wählen Sie einen Ort aus</p>
          </div>

          <!-- Bildergalerie wenn Ort ausgewählt -->
          <div v-else class="w-full h-full flex flex-col bg-white overflow-hidden">
            <!-- Header mit Ort-Informationen -->
            <div class="p-6 border-b-2 border-luxury-gold bg-luxury-ivory">
              <h3 class="font-luxury text-2xl font-bold text-luxury-dark mb-3 tracking-luxury">{{ selectedPlace.name }}
              </h3>
              <div class="flex items-center gap-4 text-sm text-luxury-brown mb-3">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="font-medium">{{ selectedPlace.location }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-luxury-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>
                  <span class="font-medium">{{ selectedPlace.capacity }} Personen</span>
                </div>
              </div>
              <div class="flex items-baseline gap-2">
                <span class="font-luxury text-3xl font-bold text-luxury-gold tracking-luxury">{{
                  selectedPlace.pricePerDay }}€</span>
                <span class="text-sm text-luxury-brown">/ Tag</span>
              </div>
            </div>

            <!-- Bildergalerie - Einzelbild/Carousel -->
            <div class="flex-1 min-h-0">
              <div v-if="selectedPlace.images && selectedPlace.images.length > 0" class="w-full h-full relative flex items-center justify-center">
                <!-- Bildbereich: flexibel, füllt den verfügbaren Platz (kein zusätzlicher Innenabstand) -->
                <div
                  class="w-full h-full relative flex items-center justify-center overflow-hidden"
                  tabindex="0"
                  role="region"
                  aria-label="Bildergalerie"
                  @click="onImageClick"
                  @keydown.left.prevent="prevImage"
                  @keydown.right.prevent="nextImage"
                  @touchstart.passive="handleTouchStart"
                  @touchend.passive="handleTouchEnd">

                  <img :src="selectedPlace.images[currentImageIndex]"
                    :alt="`${selectedPlace.name} - Bild ${currentImageIndex + 1}`"
                    class="w-full h-full object-cover transition-transform duration-300"
                    @error="handleImageError" />

                  <!-- Linke und rechte Klickflächen (transparent) -->
                  <button class="absolute inset-y-0 left-0 w-1/2 bg-transparent z-20" @click.stop.prevent="prevImage"
                    aria-label="Vorheriges Bild"></button>
                  <button class="absolute inset-y-0 right-0 w-1/2 bg-transparent z-20" @click.stop.prevent="nextImage"
                    aria-label="Nächstes Bild"></button>

                  <!-- Zähler / Overlay -->
                  <div
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-luxury-dark/60 text-luxury-ivory text-sm px-3 py-1 rounded-md z-30">
                    Bild {{ currentImageIndex + 1 }} / {{ selectedPlace.images.length }}
                  </div>
                </div>
              </div>

              <!-- Fallback wenn keine Bilder -->
              <div v-else class="flex flex-col items-center justify-center h-full">
                <svg class="w-24 h-24 text-luxury-tan opacity-40 mb-4" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
                <p class="text-luxury-brown">Keine Bilder verfügbar</p>
              </div>
            </div>

            <!-- Features falls vorhanden -->
            <div v-if="selectedPlace.features && selectedPlace.features.length > 0"
              class="border-t border-luxury-light p-6 bg-luxury-ivory">
              <h4 class="font-luxury text-lg font-bold text-luxury-dark mb-3 tracking-luxury">Ausstattung</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="feature in selectedPlace.features.slice(0, 6)" :key="feature.id || feature.name"
                  class="px-3 py-1.5 bg-luxury-light border border-luxury-tan text-luxury-dark text-xs font-medium">
                  {{ feature.name }}
                </span>
                <span v-if="selectedPlace.features.length > 6"
                  class="px-3 py-1.5 bg-luxury-gold/20 border border-luxury-gold text-luxury-dark text-xs font-medium">
                  +{{ selectedPlace.features.length - 6 }} weitere
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaces } from '@/composables/usePlaces'
import type { Place } from '@/types/place'

const router = useRouter()
const { loading, error, fetchPlaces } = usePlaces()

// Suchformular
const searchQuery = ref('')
const checkInDate = ref('')
const checkOutDate = ref('')

const searchResults = ref<Place[]>([])
const selectedPlace = ref<Place | null>(null)

// Carousel state
const currentImageIndex = ref(0)
const touchStartX = ref<number | null>(null)

// Reset index when selecting a new place
watch(selectedPlace, (newVal) => {
  currentImageIndex.value = 0
})

// Orte beim Laden der Komponente abrufen
onMounted(async () => {
  await performSearch()
})

// Automatisch suchen wenn sich Datum ändert
watch([checkInDate, checkOutDate], () => {
  performSearch()
})

// Automatisch suchen mit Verzögerung bei Sucheingabe
let searchTimeout: number | null = null
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = window.setTimeout(() => {
    performSearch()
  }, 500) // 500ms Verzögerung
})

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
const performSearch = async () => {
  const filters: any = {}

  if (searchQuery.value.trim()) {
    filters.search = searchQuery.value.trim()
  }

  if (checkInDate.value) {
    filters.checkIn = checkInDate.value
  }

  if (checkOutDate.value) {
    filters.checkOut = checkOutDate.value
  }

  const result = await fetchPlaces(filters)

  if (result.success) {
    searchResults.value = result.places || []
    console.log('=== SUCHE DURCHGEFÜHRT ===')
    console.log('Suchbegriff:', searchQuery.value)
    console.log('Check-in:', checkInDate.value)
    console.log('Check-out:', checkOutDate.value)
    console.log('Filter-Objekt:', filters)
    console.log('Anzahl Ergebnisse:', searchResults.value.length)
    console.log('Ergebnis-Orte:', searchResults.value.map(p => ({ id: p.id, name: p.name })))
    console.log('=========================')
  } else {
    console.error('Fehler bei der Suche:', result.message)
    searchResults.value = []
  }
}

// Ort buchen
const bookPlace = (place: Place) => {
  // Navigation zur Detail-Seite - Zeitraum optional
  // Validierung erfolgt in der Detailansicht
  router.push({
    name: 'location-detail',
    params: { id: place.id.toString() },
    query: {
      checkIn: checkInDate.value || undefined,
      checkOut: checkOutDate.value || undefined
    }
  })
}

// Bild-Fehlerbehandlung
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  // Fallback zu einem Platzhalter-Bild
  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f3f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23a8998e"%3EBild nicht verfügbar%3C/text%3E%3C/svg%3E'
}

// Carousel controls
const prevImage = () => {
  if (!selectedPlace.value || !selectedPlace.value.images) return
  const len = selectedPlace.value.images.length
  currentImageIndex.value = (currentImageIndex.value - 1 + len) % len
}

const nextImage = () => {
  if (!selectedPlace.value || !selectedPlace.value.images) return
  const len = selectedPlace.value.images.length
  currentImageIndex.value = (currentImageIndex.value + 1) % len
}

const onImageClick = (event: MouseEvent) => {
  // Wechseln abhängig davon, ob links oder rechts auf das Bild geklickt wurde
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  if (clickX < rect.width / 2) {
    prevImage()
  } else {
    nextImage()
  }
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0]?.clientX ?? null
}

const handleTouchEnd = (event: TouchEvent) => {
  if (touchStartX.value === null) return
  const endX = event.changedTouches[0]?.clientX ?? null
  if (endX === null) return
  const diff = endX - touchStartX.value
  // Threshold
  if (Math.abs(diff) > 30) {
    if (diff > 0) prevImage()
    else nextImage()
  }
  touchStartX.value = null
}
</script>

<style scoped>
/* Line clamp für Beschreibung - 2 Zeilen für bessere Lesbarkeit */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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

<template>
  <div class="min-h-screen bg-luxury-ivory pb-20">
    <!-- Hero Bild Section -->
    <div class="relative h-96 bg-gradient-to-br from-luxury-medium via-luxury-tan to-luxury-cream overflow-hidden">
      <!-- Dekoratives Muster im Hintergrund -->
      <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 40px 40px; color: var(--color-luxury-dark);"></div>

      <!-- Hintergrund Icon -->
      <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-luxury-dark opacity-15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 via-luxury-dark/40 to-transparent"></div>

      <!-- Zurück Button -->
      <button
        @click="goBack"
        class="absolute top-6 left-6 z-10 px-4 py-2 bg-luxury-ivory/90 backdrop-blur-sm text-luxury-dark font-medium tracking-luxury hover:bg-luxury-ivory transition-all duration-300 border border-luxury-gold flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Zurück
      </button>

      <!-- Titel über dem Bild -->
      <div class="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div class="max-w-7xl mx-auto">
          <h1 class="font-luxury text-5xl font-bold text-luxury-ivory mb-4 tracking-luxury drop-shadow-lg">
            {{ place?.name }}
          </h1>
          <div class="flex items-center gap-4 text-luxury-light">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-lg font-medium">{{ place?.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="text-lg font-medium">Bis zu {{ place?.capacity }} Personen</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-center items-center py-32">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-gold"></div>
      </div>
    </div>

    <!-- Fehleranzeige -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="p-6 bg-red-100 border border-red-400 text-red-700">
        <p class="font-medium">{{ error }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Linke Spalte: Hauptinformationen -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Beschreibung -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Beschreibung
            </h2>
            <p class="text-luxury-brown text-lg leading-relaxed font-light">
              {{ place?.description }}
            </p>

            <!-- Zusätzliche Features (vom Backend) -->
            <div v-if="place?.features && place.features.length > 0" class="mt-8 pt-8 border-t border-luxury-light">
              <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-4 tracking-luxury">Ausstattung & Features</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="feature in place.features" :key="feature.id" class="flex items-center gap-3 text-luxury-brown">
                  <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ feature.name }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Verfügbarkeitskalender -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Verfügbarkeit
            </h2>

            <!-- Datumswähler -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Check-in</label>
                <input
                  v-model="checkInDate"
                  type="date"
                  :min="today"
                  class="input-luxury"
                  @change="calculateTotal"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Check-out</label>
                <input
                  v-model="checkOutDate"
                  type="date"
                  :min="checkInDate || today"
                  class="input-luxury"
                  @change="calculateTotal"
                />
              </div>
            </div>

            <!-- Kalender Platzhalter -->
            <div class="bg-luxury-light p-6 border border-luxury-tan flex flex-col items-center justify-center min-h-[200px]">
              <svg class="w-20 h-20 text-luxury-tan opacity-40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="font-luxury text-xl text-luxury-brown font-bold mb-2 tracking-luxury">Interaktiver Kalender</p>
              <p class="text-luxury-tan text-sm font-light">Verfügbare und gebuchte Tage werden hier angezeigt</p>
            </div>

            <!-- Anzahl Tage und Preis -->
            <div v-if="numberOfDays > 0" class="mt-6 p-4 bg-luxury-gold/10 border border-luxury-gold">
              <div class="flex justify-between items-center">
                <span class="text-luxury-brown font-medium">Ausgewählte Tage:</span>
                <span class="font-luxury text-xl font-bold text-luxury-dark">{{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}</span>
              </div>
            </div>
          </section>

          <!-- Anbieter Kontaktinformationen -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Anbieter
            </h2>

            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-16 h-16 bg-luxury-medium flex items-center justify-center text-luxury-ivory font-luxury text-2xl font-bold">
                  {{ getProviderInitial() }}
                </div>
                <div class="flex-1">
                  <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-3">{{ place?.provider?.name || 'Anbieter' }}</h3>

                  <div class="space-y-2">
                    <div v-if="place?.provider?.email" class="flex items-center gap-3 text-luxury-brown">
                      <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>{{ place.provider.email }}</span>
                    </div>
                    <div v-if="place?.provider?.phone" class="flex items-center gap-3 text-luxury-brown">
                      <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span>{{ place.provider.phone }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button class="w-full btn-luxury-secondary mt-4">
                Anbieter kontaktieren
              </button>
            </div>
          </section>

          <!-- Anfahrtskarte -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Anreise & Standort
            </h2>

            <!-- Karte Platzhalter -->
            <div class="bg-gradient-to-br from-luxury-light via-luxury-cream to-luxury-tan h-96 flex flex-col items-center justify-center relative overflow-hidden border border-luxury-tan">
              <!-- Dekoratives Muster -->
              <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%); background-size: 60px 60px; color: var(--color-luxury-dark);"></div>

              <svg class="w-32 h-32 text-luxury-brown opacity-30 mb-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p class="font-luxury text-2xl text-luxury-dark font-bold mb-2 relative z-10 tracking-luxury">OpenStreetMap Karte</p>
              <p class="text-luxury-brown text-base font-light relative z-10">Genaue Position wird hier angezeigt</p>
            </div>

            <!-- Adresse -->
            <div class="mt-6 p-4 bg-luxury-light border border-luxury-tan">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p class="font-medium text-luxury-dark mb-1">{{ place?.name }}</p>
                  <p class="text-luxury-brown text-sm">Beispielstraße 123</p>
                  <p class="text-luxury-brown text-sm">12345 {{ place?.location }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Rechte Spalte: Buchungsübersicht (Sticky) -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <div class="card-luxury p-8">
              <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury">Buchungsübersicht</h2>

              <!-- Preis pro Tag -->
              <div class="mb-6 pb-6 border-b border-luxury-light">
                <div class="flex justify-between items-baseline mb-2">
                  <span class="text-luxury-brown">Preis pro Tag</span>
                  <span class="font-luxury text-3xl font-bold text-luxury-dark tracking-luxury">{{ place?.pricePerDay }}€</span>
                </div>
              </div>

              <!-- Ausgewählte Daten -->
              <div v-if="checkInDate && checkOutDate" class="space-y-4 mb-6 pb-6 border-b border-luxury-light">
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-in</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(checkInDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-out</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(checkOutDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Dauer</p>
                  <p class="font-medium text-luxury-dark">{{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}</p>
                </div>
              </div>

              <!-- Vereinfachte Preisberechnung -->
              <div v-if="numberOfDays > 0" class="mb-6 p-4 bg-luxury-gold/10 border border-luxury-gold">
                <div class="flex justify-between items-center text-luxury-brown mb-3">
                  <span class="text-sm">{{ place?.pricePerDay }}€ × {{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}</span>
                  <span class="font-luxury text-2xl font-bold text-luxury-dark">{{ totalPrice }}€</span>
                </div>
                <p class="text-xs text-luxury-tan">Gesamtpreis inkl. aller Gebühren</p>
              </div>

              <!-- Hinweis wenn keine Daten ausgewählt -->
              <div v-else class="mb-6 p-4 bg-luxury-light border border-luxury-tan text-center">
                <p class="text-sm text-luxury-brown">Wählen Sie Check-in und Check-out Datum, um den Gesamtpreis zu sehen</p>
              </div>

              <!-- Buchen Button -->
              <button
                @click="handleBooking"
                :disabled="!checkInDate || !checkOutDate"
                class="w-full btn-luxury-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ checkInDate && checkOutDate ? 'Jetzt buchen' : 'Datum wählen' }}
              </button>

              <!-- Zusätzliche Infos -->
              <div class="mt-6 space-y-3 text-sm text-luxury-brown">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Kostenlose Stornierung bis 48h vor Anreise</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Sie erhalten eine Buchungsbestätigung per E-Mail</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Sichere Bezahlung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePlaces } from '@/composables/usePlaces'
import type { Place } from '@/types/place'

const router = useRouter()
const route = useRoute()
const { currentPlace, loading, error, fetchPlaceById } = usePlaces()

const place = ref<Place | null>(null)
const checkInDate = ref('')
const checkOutDate = ref('')

// Heutiges Datum für min-Attribut
const today = new Date().toISOString().split('T')[0]

// Ort laden
onMounted(async () => {
  const id = parseInt(route.params.id as string)

  // Wenn Daten von der vorherigen Seite übergeben wurden
  if (route.query.checkIn) {
    checkInDate.value = route.query.checkIn as string
  }
  if (route.query.checkOut) {
    checkOutDate.value = route.query.checkOut as string
  }

  // Ort von der API laden
  const result = await fetchPlaceById(id)

  if (result.success && result.place) {
    place.value = result.place
  } else {
    console.error('Ort nicht gefunden:', result.message)
    // Wenn Ort nicht gefunden, zurück zur Suche
    router.push('/search')
  }
})

// Anzahl der Tage berechnen
const numberOfDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0

  const checkIn = new Date(checkInDate.value)
  const checkOut = new Date(checkOutDate.value)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
})

// Vereinfachte Kostenberechnung (Backend-Vereinfachung)
// Nur noch: Tage × Tagespreis = Gesamtpreis
const totalPrice = computed(() => {
  if (!place.value) return 0
  return place.value.pricePerDay * numberOfDays.value
})

// Funktionen
const calculateTotal = () => {
  // Wird automatisch durch computed properties berechnet
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.push('/search')
}

const getProviderInitial = () => {
  if (!place.value?.provider?.name) return 'A'
  return place.value.provider.name.charAt(0).toUpperCase()
}

const handleBooking = () => {
  if (!place.value || !checkInDate.value || !checkOutDate.value) {
    return
  }

  console.log('=== BUCHUNG DETAILS ===')
  console.log('Ort ID:', place.value.id)
  console.log('Ort:', place.value.name)
  console.log('Check-in:', checkInDate.value)
  console.log('Check-out:', checkOutDate.value)
  console.log('Tage:', numberOfDays.value)
  console.log('Gesamtpreis:', totalPrice.value, '€')
  console.log('=====================')

  alert(`Buchungsanfrage wird verarbeitet!\n\n${place.value.name}\n${formatDate(checkInDate.value)} - ${formatDate(checkOutDate.value)}\n\nGesamtpreis: ${totalPrice.value}€\n\nSie werden zur Zahlungsseite weitergeleitet...`)

  // Hier würde die Navigation zur Zahlungsseite erfolgen
  // router.push({ name: 'checkout', params: { placeId: place.value.id } })
}
</script>

<style scoped>
/* Zusätzliche Styles falls nötig */
</style>

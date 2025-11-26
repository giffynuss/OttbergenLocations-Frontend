<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link
        to="/my-bookings"
        class="inline-flex items-center text-booking-medium-brown hover:text-booking-dark-brown mb-6"
      >
        ← Zurück zu meinen Buchungen
      </router-link>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow-lg p-8">
        <p class="text-center text-booking-gray-brown">Lädt...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-800">✓ {{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-800">✗ {{ errorMessage }}</p>
      </div>

      <!-- Booking Details -->
      <div v-else-if="currentBooking" class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-booking-dark-brown">
              {{ currentBooking.placeName }}
            </h1>
            <p class="text-booking-gray-brown mt-1">
              Buchung #{{ currentBooking.bookingReference || currentBooking.id }}
            </p>
          </div>
          <BookingStatusBadge :status="currentBooking.status" />
        </div>

        <!-- Status-spezifische Info-Boxen -->
        <div v-if="currentBooking.status === 'pending'" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm text-yellow-800">
            ⏳ Ihre Buchungsanfrage wartet auf Bestätigung durch den Anbieter.
            Sie wurden bereits per E-Mail benachrichtigt.
          </p>
        </div>

        <div v-if="currentBooking.status === 'rejected'" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-800 font-medium mb-2">Diese Buchung wurde abgelehnt</p>
          <p class="text-sm text-red-700">
            <strong>Grund:</strong> {{ currentBooking.cancellationReason || 'Keine Angabe' }}
          </p>
        </div>

        <div v-if="currentBooking.status === 'confirmed'" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-800">
            ✓ Ihre Buchung wurde bestätigt! Sie haben eine Bestätigungs-E-Mail mit allen Details erhalten.
          </p>
        </div>

        <!-- Buchungsinformationen -->
        <div class="space-y-6">
          <div class="border-b border-booking-light-beige pb-4">
            <h2 class="text-lg font-semibold text-booking-dark-brown mb-3">
              Buchungsinformationen
            </h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt class="text-sm text-booking-gray-brown">Ort</dt>
                <dd class="text-booking-dark-brown font-medium">
                  {{ currentBooking.placeName }}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-booking-gray-brown">Standort</dt>
                <dd class="text-booking-dark-brown">{{ currentBooking.placeLocation }}</dd>
              </div>
              <div>
                <dt class="text-sm text-booking-gray-brown">Anzahl Gäste</dt>
                <dd class="text-booking-dark-brown">{{ currentBooking.guests }} Personen</dd>
              </div>
              <div>
                <dt class="text-sm text-booking-gray-brown">Gesamtpreis</dt>
                <dd class="text-booking-dark-brown font-bold text-lg">
                  {{ currentBooking.totalPrice.toFixed(2) }} €
                </dd>
              </div>
            </dl>
          </div>

          <div class="border-b border-booking-light-beige pb-4">
            <h2 class="text-lg font-semibold text-booking-dark-brown mb-3">
              Zeitraum
            </h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt class="text-sm text-booking-gray-brown">Check-in</dt>
                <dd class="text-booking-dark-brown font-medium">
                  {{ formatDateGerman(currentBooking.checkIn) }}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-booking-gray-brown">Check-out</dt>
                <dd class="text-booking-dark-brown font-medium">
                  {{ formatDateGerman(currentBooking.checkOut) }}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-booking-gray-brown">Dauer</dt>
                <dd class="text-booking-dark-brown">
                  {{ calculateNumberOfDays(currentBooking.checkIn, currentBooking.checkOut) }} Nächte
                </dd>
              </div>
              <div v-if="currentBooking.paymentMethod">
                <dt class="text-sm text-booking-gray-brown">Zahlungsmethode</dt>
                <dd class="text-booking-dark-brown">
                  {{ paymentMethodLabel(currentBooking.paymentMethod) }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Stornierung Button (nur für stornierbare Buchungen) -->
          <div v-if="canBeCancelled" class="border-t border-luxury-light pt-6">
            <button
              @click="showCancellationDialog = true"
              class="btn-luxury-secondary"
            >
              Buchung stornieren
            </button>
          </div>

          <!-- Stornierungsinformationen -->
          <div v-if="currentBooking.status === 'cancelled'" class="p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-800 mb-2">Storniert</h3>
            <p v-if="currentBooking.cancelledAt" class="text-sm text-gray-600">
              Am: {{ formatDateGerman(currentBooking.cancelledAt) }}
            </p>
            <p v-if="currentBooking.cancellationReason" class="text-sm text-gray-600 mt-1">
              Grund: {{ currentBooking.cancellationReason }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stornierungsdialog -->
      <div
        v-if="showCancellationDialog"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="showCancellationDialog = false"
      >
        <div class="bg-luxury-ivory max-w-lg w-full shadow-luxury-xl">
          <div class="bg-luxury-dark text-luxury-ivory p-6">
            <h2 class="font-luxury text-2xl tracking-luxury">Buchung stornieren</h2>
          </div>

          <div class="p-6">
            <p class="text-luxury-brown mb-4">
              Möchten Sie diese Buchung wirklich stornieren?
            </p>

            <div class="bg-luxury-light p-4 mb-6 border-l-4 border-luxury-gold">
              <p class="text-sm text-luxury-brown">
                <strong>Buchung:</strong> {{ currentBooking?.placeName }}<br>
                <strong>Zeitraum:</strong> {{ formatDateGerman(currentBooking?.checkIn || '') }} - {{ formatDateGerman(currentBooking?.checkOut || '') }}
              </p>
            </div>

            <div class="mb-6">
              <label for="cancellationReason" class="block text-sm font-medium text-luxury-dark mb-2">
                Grund der Stornierung (optional)
              </label>
              <textarea
                id="cancellationReason"
                v-model="cancellationReason"
                rows="3"
                class="input-luxury w-full"
                placeholder="Bitte geben Sie einen Grund an..."
              ></textarea>
            </div>

            <div class="flex gap-3 justify-end">
              <button
                @click="showCancellationDialog = false"
                class="px-6 py-2 bg-luxury-light text-luxury-dark hover:bg-luxury-cream transition"
              >
                Abbrechen
              </button>
              <button
                @click="confirmCancellation"
                :disabled="isCancelling"
                class="btn-luxury-secondary"
              >
                <span v-if="isCancelling">Storniere...</span>
                <span v-else>Ja, stornieren</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookings } from '@/composables/useBookings'
import { formatDateGerman, calculateNumberOfDays } from '@/types/place'
import BookingStatusBadge from '@/components/BookingStatusBadge.vue'

const route = useRoute()
const router = useRouter()
const { currentBooking, loading, error, fetchBookingById, cancelBooking } = useBookings()

const bookingId = Number(route.params.id)
const showCancellationDialog = ref(false)
const cancellationReason = ref('')
const isCancelling = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Buchung kann storniert werden wenn Status: pending, confirmed oder upcoming
const canBeCancelled = computed(() => {
  if (!currentBooking.value) return false
  return ['pending', 'confirmed', 'upcoming'].includes(currentBooking.value.status)
})

onMounted(async () => {
  await fetchBookingById(bookingId)
})

const paymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    cash: 'Barzahlung',
    paypal: 'PayPal',
    transfer: 'Überweisung',
    wero: 'Wero'
  }
  return labels[method] || method
}

const confirmCancellation = async () => {
  isCancelling.value = true
  errorMessage.value = ''

  try {
    const result = await cancelBooking(bookingId, cancellationReason.value || undefined)

    if (result.success) {
      successMessage.value = 'Buchung erfolgreich storniert. Sie erhalten eine Bestätigungs-E-Mail.'
      showCancellationDialog.value = false

      // Aktualisiere Buchungsdetails
      await fetchBookingById(bookingId)

      // Zeige Erfolgsbenachrichtigung
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      errorMessage.value = result.message || 'Fehler beim Stornieren der Buchung'
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Ein Fehler ist aufgetreten'
  } finally {
    isCancelling.value = false
  }
}
</script>

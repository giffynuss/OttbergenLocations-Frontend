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

          <!-- Stornierung Button (nur für bestätigte/pending Buchungen) -->
          <div v-if="currentBooking.status === 'confirmed' || currentBooking.status === 'pending'">
            <button
              @click="handleCancelBooking"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookings } from '@/composables/useBookings'
import { formatDateGerman, calculateNumberOfDays } from '@/types/place'
import BookingStatusBadge from '@/components/BookingStatusBadge.vue'

const route = useRoute()
const { currentBooking, loading, error, fetchBookingById, cancelBooking } = useBookings()

const bookingId = Number(route.params.id)

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

const handleCancelBooking = async () => {
  if (!confirm('Möchten Sie diese Buchung wirklich stornieren?')) return

  const reason = prompt('Bitte geben Sie einen Grund für die Stornierung an (optional):')
  const result = await cancelBooking(bookingId, reason || undefined)

  if (result.success) {
    alert('Buchung erfolgreich storniert')
    await fetchBookingById(bookingId)
  } else {
    alert('Fehler beim Stornieren: ' + result.message)
  }
}
</script>

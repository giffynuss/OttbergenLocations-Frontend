<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-booking-dark-brown">
          Meine Buchungen
        </h1>
        <router-link
          to="/search"
          class="bg-booking-dark-brown text-white px-6 py-2 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Neue Buchung
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-booking-gray-brown text-lg">Lädt Buchungen...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Bookings List -->
      <div v-else-if="bookings.length > 0" class="space-y-6">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow-md p-6 border-l-4 transition-shadow duration-300"
          :class="getStatusBorderColor(booking.status)"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-2xl font-semibold text-booking-dark-brown mb-2">
                {{ booking.placeName }}
              </h3>
              <p class="text-booking-gray-brown">
                {{ booking.placeLocation }}
              </p>
            </div>
            <BookingStatusBadge :status="booking.status" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-sm text-booking-gray-brown">Check-in</p>
              <p class="font-medium text-booking-dark-brown">{{ formatDateGerman(booking.checkIn) }}</p>
            </div>
            <div>
              <p class="text-sm text-booking-gray-brown">Check-out</p>
              <p class="font-medium text-booking-dark-brown">{{ formatDateGerman(booking.checkOut) }}</p>
            </div>
            <div>
              <p class="text-sm text-booking-gray-brown">Gäste</p>
              <p class="font-medium text-booking-dark-brown">{{ booking.guests }}</p>
            </div>
          </div>

          <!-- Info-Box für pending Status -->
          <div v-if="booking.status === 'pending'" class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">
              ⏳ Ihre Buchungsanfrage wurde an den Anbieter gesendet.
              Sie erhalten eine E-Mail, sobald der Anbieter die Buchung bestätigt.
            </p>
          </div>

          <!-- Info-Box für rejected Status -->
          <div v-if="booking.status === 'rejected'" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800 font-medium">Grund der Ablehnung:</p>
            <p class="text-sm text-red-700 mt-1">{{ booking.cancellationReason || 'Keine Angabe' }}</p>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-booking-light-beige">
            <span class="text-2xl font-bold text-booking-dark-brown">
              {{ booking.totalPrice.toFixed(2) }}€
            </span>
            <div class="space-x-2">
              <router-link
                :to="`/bookings/${booking.id}`"
                class="text-booking-medium-brown hover:text-booking-dark-brown font-medium"
              >
                Details
              </router-link>
              <button
                v-if="canBeCancelled(booking.status)"
                @click="openCancellationDialog(booking.id, booking.placeName)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Stornieren
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-booking-gray-brown text-lg mb-4">
          Sie haben noch keine Buchungen.
        </p>
        <router-link
          to="/search"
          class="inline-block bg-booking-dark-brown text-white px-6 py-3 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
        >
          Jetzt buchen
        </router-link>
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
                <strong>Buchung:</strong> {{ selectedBookingName }}
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
import { ref, onMounted } from 'vue'
import { useBookings } from '@/composables/useBookings'
import { formatDateGerman } from '@/types/place'
import BookingStatusBadge from '@/components/BookingStatusBadge.vue'

const { bookings, loading, error, fetchMyBookings, cancelBooking } = useBookings()

const showCancellationDialog = ref(false)
const selectedBookingId = ref<number | null>(null)
const selectedBookingName = ref('')
const cancellationReason = ref('')
const isCancelling = ref(false)

onMounted(async () => {
  await fetchMyBookings()
})

const getStatusBorderColor = (status: string) => {
  const borderMap: Record<string, string> = {
    pending: 'border-yellow-500',
    confirmed: 'border-green-500',
    rejected: 'border-red-500',
    upcoming: 'border-blue-500',
    completed: 'border-booking-medium-brown',
    cancelled: 'border-gray-500'
  }
  return borderMap[status] || 'border-booking-medium-brown'
}

const canBeCancelled = (status: string) => {
  return ['pending', 'confirmed', 'upcoming'].includes(status)
}

const openCancellationDialog = (bookingId: number, placeName: string) => {
  selectedBookingId.value = bookingId
  selectedBookingName.value = placeName
  cancellationReason.value = ''
  showCancellationDialog.value = true
}

const confirmCancellation = async () => {
  if (selectedBookingId.value === null) return

  isCancelling.value = true

  try {
    const result = await cancelBooking(
      selectedBookingId.value,
      cancellationReason.value || undefined
    )

    if (result.success) {
      showCancellationDialog.value = false
      await fetchMyBookings() // Liste aktualisieren
      alert('Buchung erfolgreich storniert. Sie erhalten eine Bestätigungs-E-Mail.')
    } else {
      alert('Fehler beim Stornieren: ' + result.message)
    }
  } catch (err: any) {
    alert('Ein Fehler ist aufgetreten: ' + err.message)
  } finally {
    isCancelling.value = false
  }
}
</script>

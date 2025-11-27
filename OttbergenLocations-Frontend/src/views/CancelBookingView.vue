<template>
  <div class="min-h-screen bg-luxury-ivory py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-dark mb-6"></div>
        <h2 class="font-luxury text-3xl text-luxury-dark mb-2">Buchung wird storniert...</h2>
        <p class="text-luxury-brown">Bitte warten Sie einen Moment.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="card-luxury text-center py-12 px-8">
        <div class="mb-6">
          <svg class="w-24 h-24 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 class="font-luxury text-4xl text-luxury-dark mb-4 tracking-luxury">
          Buchung erfolgreich storniert
        </h1>

        <p class="text-luxury-brown text-lg mb-8">
          Sie erhalten in Kürze eine Bestätigungs-E-Mail an <strong>{{ bookingData?.guestEmail }}</strong>
        </p>

        <div v-if="bookingData" class="bg-luxury-light p-6 mb-8 text-left border-l-4 border-luxury-gold">
          <h3 class="font-luxury text-xl text-luxury-dark mb-4 tracking-luxury">Stornierte Buchung</h3>
          <div class="space-y-2 text-luxury-brown">
            <div class="flex justify-between">
              <span class="font-semibold">Buchungsreferenz:</span>
              <span>{{ bookingData.bookingReference }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Status:</span>
              <span class="text-red-600 font-semibold">Storniert</span>
            </div>
            <div v-if="bookingData.cancelledAt" class="flex justify-between">
              <span class="font-semibold">Storniert am:</span>
              <span>{{ formatDate(bookingData.cancelledAt) }}</span>
            </div>
          </div>
        </div>

        <button
          @click="goToHome"
          class="btn-luxury-primary text-lg px-8 py-3"
        >
          Zurück zur Startseite
        </button>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card-luxury text-center py-12 px-8">
        <div class="mb-6">
          <svg class="w-24 h-24 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 class="font-luxury text-4xl text-luxury-dark mb-4 tracking-luxury">
          Stornierung fehlgeschlagen
        </h1>

        <p class="text-luxury-brown text-lg mb-8">
          {{ errorMessage }}
        </p>

        <div class="space-x-4">
          <button
            @click="goToHome"
            class="btn-luxury-secondary text-lg px-8 py-3"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookings } from '@/composables/useBookings'

const route = useRoute()
const router = useRouter()
const { cancelBookingByToken } = useBookings()

const loading = ref(true)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('')
const bookingData = ref<any>(null)

onMounted(async () => {
  const token = route.params.token as string

  if (!token) {
    error.value = true
    errorMessage.value = 'Kein Stornierungstoken gefunden.'
    loading.value = false
    return
  }

  try {
    const result = await cancelBookingByToken(token)

    if (result.success) {
      bookingData.value = result.data
      success.value = true
    } else {
      throw new Error(result.message || 'Stornierung fehlgeschlagen')
    }
  } catch (err: any) {
    error.value = true

    // Spezifische Fehlermeldungen
    if (err.message.includes('ungültig') || err.message.includes('abgelaufen')) {
      errorMessage.value = 'Der Stornierungslink ist ungültig oder abgelaufen. Bitte versuchen Sie es über Ihr Dashboard.'
    } else if (err.message.includes('kann nicht')) {
      errorMessage.value = 'Diese Buchung kann nicht mehr storniert werden. Bitte kontaktieren Sie uns bei Fragen.'
    } else {
      errorMessage.value = err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    }
  } finally {
    loading.value = false
  }
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function goToHome() {
  router.push('/')
}
</script>

<style scoped>
.card-luxury {
  background-color: #f5f0e8;
  box-shadow: 0 4px 6px rgba(61, 40, 23, 0.15);
  padding: 2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

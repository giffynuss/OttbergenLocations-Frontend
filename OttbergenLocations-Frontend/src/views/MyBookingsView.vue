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

      <div v-if="bookings.length > 0" class="space-y-6">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow-md p-6 border-l-4 transition-shadow duration-300"
          :class="getStatusBorderColor(booking.status)"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-2xl font-semibold text-booking-dark-brown mb-2">
                {{ booking.title }}
              </h3>
              <p class="text-booking-gray-brown">
                {{ booking.location }}
              </p>
            </div>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="getStatusClass(booking.status)"
            >
              {{ getStatusText(booking.status) }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-sm text-booking-gray-brown">Check-in</p>
              <p class="font-medium text-booking-dark-brown">{{ booking.checkIn }}</p>
            </div>
            <div>
              <p class="text-sm text-booking-gray-brown">Check-out</p>
              <p class="font-medium text-booking-dark-brown">{{ booking.checkOut }}</p>
            </div>
            <div>
              <p class="text-sm text-booking-gray-brown">Gäste</p>
              <p class="font-medium text-booking-dark-brown">{{ booking.guests }}</p>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-booking-light-beige">
            <span class="text-2xl font-bold text-booking-dark-brown">
              {{ booking.price }}€
            </span>
            <div class="space-x-2">
              <button class="text-booking-medium-brown hover:text-booking-dark-brown font-medium">
                Details
              </button>
              <button
                v-if="booking.status === 'upcoming'"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Stornieren
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Booking {
  id: number
  title: string
  location: string
  checkIn: string
  checkOut: string
  guests: number
  price: number
  status: 'upcoming' | 'completed' | 'cancelled'
}

const bookings = ref<Booking[]>([
  {
    id: 1,
    title: 'Gemütliches Apartment',
    location: 'Berlin Mitte',
    checkIn: '15.12.2025',
    checkOut: '20.12.2025',
    guests: 2,
    price: 445,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Strandhaus',
    location: 'Ostsee',
    checkIn: '01.08.2025',
    checkOut: '15.08.2025',
    guests: 4,
    price: 1890,
    status: 'completed'
  }
])

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    upcoming: 'Bevorstehend',
    completed: 'Abgeschlossen',
    cancelled: 'Storniert'
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    upcoming: 'bg-green-100 text-green-800',
    completed: 'bg-booking-beige text-booking-dark-brown',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classMap[status] || ''
}

const getStatusBorderColor = (status: string) => {
  const borderMap: Record<string, string> = {
    upcoming: 'border-green-500',
    completed: 'border-booking-medium-brown',
    cancelled: 'border-red-500'
  }
  return borderMap[status] || 'border-booking-medium-brown'
}
</script>

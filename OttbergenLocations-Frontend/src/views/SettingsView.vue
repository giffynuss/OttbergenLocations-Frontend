<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-booking-dark-brown mb-8">
        Einstellungen
      </h1>

      <div class="space-y-6">
        <!-- Persönliche Informationen -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-booking-dark-brown mb-6">
            Persönliche Informationen
          </h2>

          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Name
              </label>
              <input
                id="name"
                v-model="profile.name"
                type="text"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-booking-dark-brown mb-2">
                E-Mail
              </label>
              <input
                id="email"
                v-model="profile.email"
                type="email"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Telefon
              </label>
              <input
                id="phone"
                v-model="profile.phone"
                type="tel"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <button
              type="submit"
              class="bg-booking-dark-brown text-white px-6 py-2 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
            >
              Speichern
            </button>
          </form>
        </div>

        <!-- Passwort ändern -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-booking-dark-brown mb-6">
            Passwort ändern
          </h2>

          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Aktuelles Passwort
              </label>
              <input
                id="currentPassword"
                v-model="passwordForm.current"
                type="password"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Neues Passwort
              </label>
              <input
                id="newPassword"
                v-model="passwordForm.new"
                type="password"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Neues Passwort bestätigen
              </label>
              <input
                id="confirmPassword"
                v-model="passwordForm.confirm"
                type="password"
                class="w-full px-4 py-2 border border-booking-beige rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown"
              />
            </div>

            <button
              type="submit"
              class="bg-booking-dark-brown text-white px-6 py-2 rounded-lg hover:bg-booking-medium-brown transition-colors duration-300"
            >
              Passwort ändern
            </button>
          </form>
        </div>

        <!-- Benachrichtigungen -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-booking-dark-brown mb-6">
            Benachrichtigungen
          </h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-booking-dark-brown">E-Mail-Benachrichtigungen</p>
                <p class="text-sm text-booking-gray-brown">Erhalten Sie Updates zu Ihren Buchungen</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="notifications.email" type="checkbox" class="sr-only peer" />
                <div class="w-11 h-6 bg-booking-beige rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-booking-medium-brown after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-booking-dark-brown">Angebote und Aktionen</p>
                <p class="text-sm text-booking-gray-brown">Informationen über spezielle Angebote</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="notifications.offers" type="checkbox" class="sr-only peer" />
                <div class="w-11 h-6 bg-booking-beige rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-booking-medium-brown after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'

const { currentUser } = useAuth()

const profile = reactive({
  name: currentUser.value?.name || '',
  email: currentUser.value?.email || '',
  phone: ''
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const notifications = reactive({
  email: true,
  offers: false
})

const saveProfile = () => {
  // Profil speichern Logik
  alert('Profil wurde gespeichert')
}

const changePassword = () => {
  if (passwordForm.new !== passwordForm.confirm) {
    alert('Die Passwörter stimmen nicht überein')
    return
  }
  // Passwort ändern Logik
  alert('Passwort wurde geändert')
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
}
</script>

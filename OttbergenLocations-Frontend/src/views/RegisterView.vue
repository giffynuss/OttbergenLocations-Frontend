<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-booking-dark-brown">
          Konto erstellen
        </h2>
        <p class="mt-2 text-center text-sm text-booking-gray-brown">
          Oder
          <router-link to="/login" class="font-medium text-booking-medium-brown hover:text-booking-dark-brown">
            melden Sie sich an
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-booking-dark-brown mb-1">
              Name
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-booking-beige placeholder-booking-gray-brown text-booking-black rounded-md focus:outline-none focus:ring-booking-medium-brown focus:border-booking-medium-brown focus:z-10 sm:text-sm"
              placeholder="Max Mustermann"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-booking-dark-brown mb-1">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-booking-beige placeholder-booking-gray-brown text-booking-black rounded-md focus:outline-none focus:ring-booking-medium-brown focus:border-booking-medium-brown focus:z-10 sm:text-sm"
              placeholder="ihre@email.de"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-booking-dark-brown mb-1">
              Passwort
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-booking-beige placeholder-booking-gray-brown text-booking-black rounded-md focus:outline-none focus:ring-booking-medium-brown focus:border-booking-medium-brown focus:z-10 sm:text-sm"
              placeholder="Passwort"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-booking-dark-brown mb-1">
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-booking-beige placeholder-booking-gray-brown text-booking-black rounded-md focus:outline-none focus:ring-booking-medium-brown focus:border-booking-medium-brown focus:z-10 sm:text-sm"
              placeholder="Passwort bestätigen"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-booking-dark-brown hover:bg-booking-medium-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-booking-medium-brown transition-colors duration-300"
          >
            Registrieren
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleRegister = () => {
  error.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Die Passwörter stimmen nicht überein.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Das Passwort muss mindestens 6 Zeichen lang sein.'
    return
  }

  if (register(name.value, email.value, password.value)) {
    router.push('/')
  } else {
    error.value = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.'
  }
}
</script>

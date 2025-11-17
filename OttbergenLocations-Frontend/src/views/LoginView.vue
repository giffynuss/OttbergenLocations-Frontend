<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-booking-light-beige">
    <div class="max-w-md w-full">
      <!-- Überschrift -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-booking-dark-brown">
          Anmeldung
        </h1>
      </div>

      <!-- Login Formular -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <!-- E-Mail Feld -->
        <div>
          <label for="email" class="block text-sm font-medium text-booking-dark-brown mb-2">
            E-Mail
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown focus:border-booking-medium-brown text-black"
            placeholder="ihre@email.de"
            @blur="validateEmail"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Passwort Feld -->
        <div>
          <label for="password" class="block text-sm font-medium text-booking-dark-brown mb-2">
            Passwort
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown focus:border-booking-medium-brown text-black"
            placeholder="Ihr Passwort"
            @blur="validatePassword"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">
            {{ errors.password }}
          </p>
        </div>

        <!-- Passwort vergessen Link -->
        <div class="text-left">
          <router-link
            to="/forgot-password"
            class="text-sm text-booking-medium-brown hover:text-booking-dark-brown underline"
          >
            Passwort vergessen?
          </router-link>
        </div>

        <!-- reCAPTCHA Placeholder -->
        <div class="bg-white border border-black rounded-md p-4 flex items-center justify-center">
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              id="recaptcha"
              v-model="formData.recaptcha"
              class="w-6 h-6 border-2 border-black rounded"
              required
            />
            <label for="recaptcha" class="text-sm text-booking-gray-brown">
              Ich bin kein Roboter
            </label>
            <div class="flex flex-col items-center">
              <svg class="w-8 h-8 text-booking-gray-brown" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span class="text-xs text-booking-gray-brown mt-1">reCAPTCHA</span>
            </div>
          </div>
        </div>

        <!-- Fehler Nachricht -->
        <div v-if="generalError" class="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-3">
          {{ generalError }}
        </div>

        <!-- Anmelden Button -->
        <div>
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full py-3 px-4 text-white bg-booking-dark-brown hover:bg-booking-medium-brown disabled:bg-booking-gray-brown disabled:cursor-not-allowed rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-booking-medium-brown"
          >
            Anmelden
          </button>
        </div>

        <!-- Registrieren Link -->
        <div class="text-center text-sm">
          <span class="text-booking-gray-brown">Noch kein Konto? </span>
          <router-link
            to="/register"
            class="text-booking-medium-brown hover:text-booking-dark-brown font-medium"
          >
            Jetzt registrieren
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// Form Data
const formData = reactive({
  email: '',
  password: '',
  recaptcha: false
})

// Validation Errors
const errors = reactive({
  email: '',
  password: ''
})

const generalError = ref('')

// Email Validation
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = 'E-Mail ist erforderlich'
    return false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    return false
  } else {
    errors.email = ''
    return true
  }
}

// Password Validation
const validatePassword = () => {
  if (!formData.password) {
    errors.password = 'Passwort ist erforderlich'
    return false
  } else if (formData.password.length < 6) {
    errors.password = 'Passwort muss mindestens 6 Zeichen lang sein'
    return false
  } else {
    errors.password = ''
    return true
  }
}

// Form Valid Computed
const isFormValid = computed(() => {
  return formData.email &&
         formData.password &&
         formData.recaptcha &&
         !errors.email &&
         !errors.password
})

// Handle Login
const handleLogin = () => {
  generalError.value = ''

  // Validate all fields
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    generalError.value = 'Bitte korrigieren Sie die Fehler im Formular'
    return
  }

  if (!formData.recaptcha) {
    generalError.value = 'Bitte bestätigen Sie, dass Sie kein Roboter sind'
    return
  }

  // Console log for backend placeholder
  console.log('=== LOGIN FORMULAR DATEN ===')
  console.log('E-Mail:', formData.email)
  console.log('Passwort:', formData.password)
  console.log('reCAPTCHA:', formData.recaptcha)
  console.log('Timestamp:', new Date().toISOString())
  console.log('=========================')

  // Attempt login
  if (userStore.login(formData.email, formData.password)) {
    // Weiterleitung zur ursprünglich angeforderten Seite oder Startseite
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } else {
    generalError.value = 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.'
  }
}
</script>

<style scoped>
/* Custom checkbox styling */
input[type="checkbox"] {
  accent-color: var(--color-medium-brown);
}
</style>

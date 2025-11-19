<template>
  <div class="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-luxury-light">
    <div class="max-w-md w-full">
      <!-- Überschrift -->
      <div class="text-center mb-10">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-16 bg-luxury-gold"></div>
          <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-16 bg-luxury-gold"></div>
        </div>

        <h1 class="font-luxury text-5xl font-bold text-luxury-dark tracking-luxury">
          Anmeldung
        </h1>
      </div>

      <!-- Login Formular -->
      <form class="card-luxury p-8 space-y-6" @submit.prevent="handleLogin">
        <!-- E-Mail Feld -->
        <div>
          <label for="email" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
            E-Mail
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="input-luxury"
            placeholder="ihre@email.de"
            @blur="validateEmail"
          />
          <p v-if="errors.email" class="mt-2 text-sm text-red-600 font-light">
            {{ errors.email }}
          </p>
        </div>

        <!-- Passwort Feld -->
        <div>
          <label for="password" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
            Passwort
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="input-luxury"
            placeholder="Ihr Passwort"
            @blur="validatePassword"
          />
          <p v-if="errors.password" class="mt-2 text-sm text-red-600 font-light">
            {{ errors.password }}
          </p>
        </div>

        <!-- Passwort vergessen Link -->
        <div class="text-left">
          <router-link
            to="/forgot-password"
            class="text-sm text-luxury-accent hover:text-luxury-dark transition-colors duration-300 tracking-luxury"
          >
            Passwort vergessen?
          </router-link>
        </div>

        <!-- reCAPTCHA Placeholder -->
        <div class="bg-white border-2 border-luxury-medium p-4 flex items-center justify-center">
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              id="recaptcha"
              v-model="formData.recaptcha"
              class="w-6 h-6 border-2 border-luxury-dark accent-luxury-gold"
              required
            />
            <label for="recaptcha" class="text-sm text-luxury-brown tracking-luxury">
              Ich bin kein Roboter
            </label>
            <div class="flex flex-col items-center">
              <svg class="w-8 h-8 text-luxury-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span class="text-xs text-luxury-brown mt-1">reCAPTCHA</span>
            </div>
          </div>
        </div>

        <!-- Fehler Nachricht -->
        <div v-if="generalError" class="text-red-700 text-sm text-center bg-red-50 border-2 border-red-300 p-3 font-light">
          {{ generalError }}
        </div>

        <!-- Anmelden Button -->
        <div>
          <button
            type="submit"
            :disabled="!isFormValid"
            class="btn-luxury-primary w-full disabled:bg-luxury-tan disabled:cursor-not-allowed disabled:border-luxury-tan"
          >
            ANMELDEN
          </button>
        </div>

        <!-- Registrieren Link -->
        <div class="text-center text-sm pt-4 border-t border-luxury-light">
          <span class="text-luxury-brown font-light">Noch kein Konto? </span>
          <router-link
            to="/register"
            class="text-luxury-accent hover:text-luxury-dark font-medium transition-colors duration-300 tracking-luxury"
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
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

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
  if (login(formData.email, formData.password)) {
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

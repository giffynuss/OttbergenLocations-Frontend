<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-booking-light-beige">
    <div class="max-w-3xl w-full">
      <!-- Überschrift -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-booking-dark-brown">
          Registrierung
        </h1>
      </div>

      <!-- Registrierungs Formular -->
      <form class="space-y-8" @submit.prevent="handleRegister">

        <!-- Stammdaten Sektion -->
        <div class="bg-white rounded-lg p-6 border border-black">
          <h2 class="text-xl font-semibold text-booking-dark-brown mb-6">
            Stammdaten
          </h2>

          <div class="space-y-4">
            <!-- Vorname und Nachname (nebeneinander) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Vorname
                </label>
                <input id="firstName" v-model="formData.firstName" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Max" @blur="validateField('firstName')" />
                <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Nachname
                </label>
                <input id="lastName" v-model="formData.lastName" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Mustermann" @blur="validateField('lastName')" />
                <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Anrede (Radio-Buttons) -->
            <div>
              <label class="block text-sm font-medium text-booking-dark-brown mb-2">
                Anrede
              </label>
              <div class="flex space-x-6">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="formData.gender" value="herr" required
                    class="w-5 h-5 text-booking-medium-brown border-black focus:ring-booking-medium-brown" />
                  <span class="ml-2 text-booking-dark-brown">Herr</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="formData.gender" value="frau" required
                    class="w-5 h-5 text-booking-medium-brown border-black focus:ring-booking-medium-brown" />
                  <span class="ml-2 text-booking-dark-brown">Frau</span>
                </label>
              </div>
            </div>

            <!-- E-Mail und Telefon (nebeneinander) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  E-Mail
                </label>
                <input id="email" v-model="formData.email" type="email" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="ihre@email.de" @blur="validateField('email')" />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Telefonnummer
                </label>
                <input id="phone" v-model="formData.phone" type="tel" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="+49 123 456789" @blur="validateField('phone')" />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- Passwort und Passwort bestätigen -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="password" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Passwort
                </label>
                <input id="password" v-model="formData.password" type="password" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Mindestens 6 Zeichen" @blur="validateField('password')" />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                  {{ errors.password }}
                </p>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Passwort bestätigen
                </label>
                <input id="confirmPassword" v-model="formData.confirmPassword" type="password" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Passwort wiederholen" @blur="validateField('confirmPassword')" />
                <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Adresse Sektion -->
        <div class="bg-white rounded-lg p-6 border border-black">
          <h2 class="text-xl font-semibold text-booking-dark-brown mb-6">
            Adresse
          </h2>

          <div class="space-y-4">
            <!-- Straße und Hausnummer -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <label for="street" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Straße
                </label>
                <input id="street" v-model="formData.street" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Musterstraße" @blur="validateField('street')" />
                <p v-if="errors.street" class="mt-1 text-sm text-red-600">
                  {{ errors.street }}
                </p>
              </div>

              <div>
                <label for="houseNumber" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Hausnummer
                </label>
                <input id="houseNumber" v-model="formData.houseNumber" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="42" @blur="validateField('houseNumber')" />
                <p v-if="errors.houseNumber" class="mt-1 text-sm text-red-600">
                  {{ errors.houseNumber }}
                </p>
              </div>
            </div>

            <!-- PLZ und Ort -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="zipCode" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  PLZ
                </label>
                <input id="zipCode" v-model="formData.zipCode" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="12345" @blur="validateField('zipCode')" />
                <p v-if="errors.zipCode" class="mt-1 text-sm text-red-600">
                  {{ errors.zipCode }}
                </p>
              </div>

              <div class="md:col-span-2">
                <label for="city" class="block text-sm font-medium text-booking-dark-brown mb-2">
                  Ort
                </label>
                <input id="city" v-model="formData.city" type="text" required
                  class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                  placeholder="Musterstadt" @blur="validateField('city')" />
                <p v-if="errors.city" class="mt-1 text-sm text-red-600">
                  {{ errors.city }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- reCAPTCHA Placeholder -->
        <div class="bg-white border border-black rounded-md p-4 flex items-center justify-center">
          <div class="flex items-center space-x-3">
            <input type="checkbox" id="recaptcha" v-model="formData.recaptcha"
              class="w-6 h-6 border-2 border-black rounded" required />
            <label for="recaptcha" class="text-sm text-booking-gray-brown">
              Ich bin kein Roboter
            </label>
            <div class="flex flex-col items-center">
              <svg class="w-8 h-8 text-booking-gray-brown" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span class="text-xs text-booking-gray-brown mt-1">reCAPTCHA</span>
            </div>
          </div>
        </div>

        <!-- AGB Checkbox -->
        <div class="flex items-start">
          <input type="checkbox" id="agb" v-model="formData.agbAccepted" required
            class="w-5 h-5 mt-1 border-2 border-black rounded" />
          <label for="agb" class="ml-3 text-sm text-booking-dark-brown">
            Ich habe die
            <router-link to="/agb"
              class="text-booking-medium-brown hover:text-booking-dark-brown underline font-medium">
              AGB hier lesen
            </router-link>
            gelesen und akzeptiert
          </label>
        </div>

        <!-- Fehler Nachricht -->
        <div v-if="generalError"
          class="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-3">
          {{ generalError }}
        </div>

        <!-- Registrieren Button -->
        <div>
          <button type="submit" :disabled="!isFormValid"
            class="w-full py-3 px-4 text-white bg-booking-dark-brown hover:bg-booking-medium-brown disabled:bg-booking-gray-brown disabled:cursor-not-allowed rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-booking-medium-brown">
            Account registrieren
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center text-sm">
          <span class="text-booking-gray-brown">Bereits ein Konto? </span>
          <router-link to="/login" class="text-booking-medium-brown hover:text-booking-dark-brown font-medium">
            Jetzt anmelden
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// Form Data
const formData = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  recaptcha: false,
  agbAccepted: false
})

// Validation Errors
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: ''
})

const generalError = ref('')

// Validation Functions
const validateField = (fieldName: string) => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      if (!formData[fieldName]) {
        errors[fieldName] = 'Dieses Feld ist erforderlich'
      } else if (formData[fieldName].length < 2) {
        errors[fieldName] = 'Mindestens 2 Zeichen erforderlich'
      } else {
        errors[fieldName] = ''
      }
      break

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        errors.email = 'E-Mail ist erforderlich'
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      } else {
        errors.email = ''
      }
      break

    case 'phone':
      const phoneRegex = /^[\d\s+()-]+$/
      if (!formData.phone) {
        errors.phone = 'Telefonnummer ist erforderlich'
      } else if (!phoneRegex.test(formData.phone) || formData.phone.length < 6) {
        errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein'
      } else {
        errors.phone = ''
      }
      break

    case 'password':
      if (!formData.password) {
        errors.password = 'Passwort ist erforderlich'
      } else if (formData.password.length < 6) {
        errors.password = 'Passwort muss mindestens 6 Zeichen lang sein'
      } else {
        errors.password = ''
      }
      break

    case 'confirmPassword':
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Bitte bestätigen Sie Ihr Passwort'
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwörter stimmen nicht überein'
      } else {
        errors.confirmPassword = ''
      }
      break

    case 'street':
    case 'city':
      if (!formData[fieldName]) {
        errors[fieldName] = 'Dieses Feld ist erforderlich'
      } else {
        errors[fieldName] = ''
      }
      break

    case 'houseNumber':
      if (!formData.houseNumber) {
        errors.houseNumber = 'Hausnummer ist erforderlich'
      } else {
        errors.houseNumber = ''
      }
      break

    case 'zipCode':
      const zipRegex = /^\d{5}$/
      if (!formData.zipCode) {
        errors.zipCode = 'PLZ ist erforderlich'
      } else if (!zipRegex.test(formData.zipCode)) {
        errors.zipCode = 'PLZ muss 5 Ziffern haben'
      } else {
        errors.zipCode = ''
      }
      break
  }
}

// Form Valid Computed
const isFormValid = computed(() => {
  return formData.firstName &&
    formData.lastName &&
    formData.gender &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    formData.street &&
    formData.houseNumber &&
    formData.zipCode &&
    formData.city &&
    formData.recaptcha &&
    formData.agbAccepted &&
    !Object.values(errors).some(error => error !== '')
})

// Handle Register
const handleRegister = async () => {
  generalError.value = ''

  Object.keys(errors).forEach(field => validateField(field))

  if (Object.values(errors).some(error => error !== '')) {
    generalError.value = 'Bitte korrigieren Sie die Fehler im Formular'
    return
  }

  try {
    const response = await fetch("http://localhost/OttbergenLocations-Backend/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        houseNumber: formData.houseNumber,
        zipCode: formData.zipCode,
        city: formData.city,
        password: formData.password
      })
    });

    const data = await response.json();
    console.log("Backend Antwort:", data);

    if (data.success) {
      router.push("/login");
    } else {
      generalError.value = data.message;
    }

<<<<<<< HEAD
  } catch (err) {
    generalError.value = "Serverfehler: " + err;
=======
  // Attempt registration
  if (userStore.register({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    gender: formData.gender as 'herr' | 'frau',
    street: formData.street,
    houseNumber: formData.houseNumber,
    zipCode: formData.zipCode,
    city: formData.city
  })) {
    router.push('/')
  } else {
    generalError.value = 'Registrierung fehlgeschlagen. E-Mail bereits vorhanden.'
>>>>>>> 0c1f5e51d9d494bb11bfe055b979baea1a7f2983
  }
};
</script>

<style scoped>
/* Custom checkbox and radio styling */
input[type="checkbox"],
input[type="radio"] {
  accent-color: var(--color-medium-brown);
}
</style>

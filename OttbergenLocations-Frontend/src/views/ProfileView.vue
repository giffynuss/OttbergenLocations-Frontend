<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-booking-light-beige">
    <div class="max-w-3xl w-full">
      <!-- Überschrift -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-booking-dark-brown">
          Einstellungen
        </h1>
      </div>

      <!-- Einstellungs Formular -->
      <form class="space-y-8" @submit.prevent="handleSave">

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

        <!-- Passwort Sektion -->
        <div class="bg-white rounded-lg p-6 border border-black">
          <h2 class="text-xl font-semibold text-booking-dark-brown mb-6">
            Passwort
          </h2>

          <div v-if="!showPasswordChange" class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-booking-dark-brown mb-2">
                Aktuelles Passwort
              </label>
              <input type="password" value="XXXXXXXXXXXXXX" readonly
                class="w-full px-4 py-3 bg-booking-very-light border border-black rounded-md text-black cursor-not-allowed" />
            </div>
            <button type="button" @click="showPasswordChange = true"
              class="ml-4 mt-7 px-6 py-3 bg-luxury-medium text-white rounded-lg hover:bg-luxury-dark transition-colors duration-300 font-medium">
              Ändern
            </button>
          </div>

          <div v-else class="space-y-4">
            <!-- Aktuelles Passwort -->
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Aktuelles Passwort
              </label>
              <input id="currentPassword" v-model="passwordData.current" type="password"
                class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"
                placeholder="Aktuelles Passwort eingeben" />
            </div>

            <!-- Neues Passwort -->
            <div>
              <label for="newPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Neues Passwort
              </label>
              <input id="newPassword" v-model="passwordData.new" type="password"
                class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"            </div>

            <!-- Neues Passwort bestätigen -->
            <div>
              <label for="confirmNewPassword" class="block text-sm font-medium text-booking-dark-brown mb-2">
                Neues Passwort bestätigen
              </label>
              <input id="confirmNewPassword" v-model="passwordData.confirm" type="password"
                class="w-full px-4 py-3 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-booking-medium-brown text-black"            </div>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button type="button" @click="cancelPasswordChange"
                class="flex-1 px-6 py-3 bg-luxury-cream text-luxury-dark rounded-lg hover:bg-luxury-light transition-colors duration-300 font-medium">
                Abbrechen
              </button>
              <button type="button" @click="savePasswordChange"
                class="flex-1 px-6 py-3 bg-luxury-dark text-white rounded-lg hover:bg-luxury-medium transition-colors duration-300 font-medium">
                Passwort speichern
              </button>
            </div>
          </div>
        </div>

        <!-- Fehler Nachricht -->
        <div v-if="generalError"
          class="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-3">
          {{ generalError }}
        </div>

        <!-- Erfolg Nachricht -->
        <div v-if="successMessage"
          class="text-green-600 text-sm text-center bg-green-50 border border-green-200 rounded-md p-3">
          {{ successMessage }}
        </div>

        <!-- Speichern Button -->
        <div>
          <button type="submit" :disabled="!isFormValid"
            class="w-full py-3 px-4 text-white bg-luxury-dark hover:bg-luxury-medium disabled:bg-luxury-brown disabled:cursor-not-allowed rounded-md font-semibold transition-colors duration-300">
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const { currentUser, fetchUser } = useAuth()

// Beim Seitenaufruf User laden
fetchUser();

// Formulardaten
const formData = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  phone: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: ''
})

// Passwort-Daten
const passwordData = reactive({
  current: '',
  new: '',
  confirm: ''
})

// Validation Errors
const errors = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  phone: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: ''
})

const generalError = ref('')
const successMessage = ref('')
const showPasswordChange = ref(false)

// Wenn User geladen ist: Formular füllen
watch(currentUser, (user) => {
  if (!user) return
  formData.firstName = user.first_name
  formData.lastName = user.last_name
  formData.gender = user.gender
  formData.email = user.email
  formData.phone = user.phone
  formData.street = user.street
  formData.houseNumber = user.house_number
  formData.zipCode = user.zip_code
  formData.city = user.city
}, { immediate: true })

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
    formData.street &&
    formData.houseNumber &&
    formData.zipCode &&
    formData.city &&
    !Object.values(errors).some(error => error !== '')
})

// Cancel Password Change
const cancelPasswordChange = () => {
  showPasswordChange.value = false
  passwordData.current = ''
  passwordData.new = ''
  passwordData.confirm = ''
}

// Save Password Change
const savePasswordChange = async () => {
  generalError.value = "";
  successMessage.value = "";

  const res = await fetch("http://localhost/OttbergenLocations-Backend/api/user/change_password.php", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentPassword: passwordData.current,
      newPassword: passwordData.new,
      confirmPassword: passwordData.confirm,
    }),
  });

  const data = await res.json();

  if (!data.success) {
    generalError.value = data.message;
    return;
  }

  successMessage.value = data.message;
  showPasswordChange.value = false;
}

// Handle Save
const handleSave = async () => {
  generalError.value = ''
  successMessage.value = ''

  // Feldvalidierung
  Object.keys(errors).forEach(field => validateField(field))

  if (Object.values(errors).some(error => error !== '')) {
    generalError.value = 'Bitte korrigieren Sie die Fehler im Formular'
    return
  }

  const res = await fetch("http://localhost/OttbergenLocations-Backend/api/user/update.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData)
  })

  const data = await res.json();

  if (!data.success) {
    generalError.value = data.message
    return
  }

  successMessage.value = "Daten erfolgreich gespeichert"

  // User-Daten aktualisieren
  await fetchUser()

  setTimeout(() => successMessage.value = '', 3000)
} 
</script>
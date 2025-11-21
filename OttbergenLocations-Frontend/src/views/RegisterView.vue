<template>
  <div class="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-luxury-light">
    <div class="max-w-3xl w-full">
      <!-- Überschrift -->
      <div class="text-center mb-10">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-16 bg-luxury-gold"></div>
          <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-16 bg-luxury-gold"></div>
        </div>

        <h1 class="font-luxury text-5xl font-bold text-luxury-dark tracking-luxury">
          Registrierung
        </h1>
      </div>

      <!-- Registrierungs Formular -->
      <form class="space-y-8" @submit.prevent="handleRegister">
        <!-- Stammdaten Sektion -->
        <div class="card-luxury p-8">
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury">
            Stammdaten
          </h2>

          <div class="space-y-5">
            <!-- Vorname und Nachname (nebeneinander) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Vorname
                </label>
                <input id="firstName" v-model="formData.firstName" type="text" required class="input-luxury"
                  placeholder="Max" @blur="validateField('firstName')" />
                <p v-if="errors.firstName" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Nachname
                </label>
                <input id="lastName" v-model="formData.lastName" type="text" required class="input-luxury"
                  placeholder="Mustermann" @blur="validateField('lastName')" />
                <p v-if="errors.lastName" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Anrede (Radio-Buttons) -->
            <div>
              <label class="block text-sm font-medium text-luxury-dark mb-3 tracking-luxury">
                Anrede
              </label>
              <div class="flex space-x-8">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="formData.gender" value="herr" required
                    class="w-5 h-5 border-2 border-luxury-dark accent-luxury-gold" />
                  <span class="ml-3 text-luxury-dark font-light tracking-luxury">Herr</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="formData.gender" value="frau" required
                    class="w-5 h-5 border-2 border-luxury-dark accent-luxury-gold" />
                  <span class="ml-3 text-luxury-dark font-light tracking-luxury">Frau</span>
                </label>
              </div>
            </div>

            <!-- E-Mail und Telefon (nebeneinander) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  E-Mail
                </label>
                <input id="email" v-model="formData.email" type="email" required class="input-luxury"
                  placeholder="ihre@email.de" @blur="validateField('email')" />
                <p v-if="errors.email" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Telefonnummer
                </label>
                <input id="phone" v-model="formData.phone" type="tel" required class="input-luxury"
                  placeholder="+49 123 456789" @blur="validateField('phone')" />
                <p v-if="errors.phone" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- Passwort und Passwort bestätigen -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="password" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Passwort
                </label>
                <input id="password" v-model="formData.password" type="password" required class="input-luxury"
                  placeholder="Mindestens 6 Zeichen" @blur="validateField('password')" />
                <p v-if="errors.password" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.password }}
                </p>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Passwort bestätigen
                </label>
                <input id="confirmPassword" v-model="formData.confirmPassword" type="password" required
                  class="input-luxury" placeholder="Passwort wiederholen" @blur="validateField('confirmPassword')" />
                <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Adresse Sektion -->
        <div class="card-luxury p-8">
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury">
            Adresse
          </h2>

          <div class="space-y-5">
            <!-- Straße und Hausnummer -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <label for="street" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Straße
                </label>
                <input id="street" v-model="formData.street" type="text" required class="input-luxury"
                  placeholder="Musterstraße" @blur="validateField('street')" />
                <p v-if="errors.street" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.street }}
                </p>
              </div>

              <div>
                <label for="houseNumber" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Hausnummer
                </label>
                <input id="houseNumber" v-model="formData.houseNumber" type="text" required class="input-luxury"
                  placeholder="42" @blur="validateField('houseNumber')" />
                <p v-if="errors.houseNumber" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.houseNumber }}
                </p>
              </div>
            </div>

            <!-- PLZ und Ort -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="zipCode" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  PLZ
                </label>
                <input id="zipCode" v-model="formData.zipCode" type="text" required class="input-luxury"
                  placeholder="12345" @blur="validateField('zipCode')" />
                <p v-if="errors.zipCode" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.zipCode }}
                </p>
              </div>

              <div class="md:col-span-2">
                <label for="city" class="block text-sm font-medium text-luxury-dark mb-2 tracking-luxury">
                  Ort
                </label>
                <input id="city" v-model="formData.city" type="text" required class="input-luxury"
                  placeholder="Musterstadt" @blur="validateField('city')" />
                <p v-if="errors.city" class="mt-2 text-sm text-red-600 font-light">
                  {{ errors.city }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- reCAPTCHA Placeholder -->
        <div class="bg-white border-2 border-luxury-medium p-4 flex items-center justify-center">
          <div class="flex items-center space-x-3">
            <input type="checkbox" id="recaptcha" v-model="formData.recaptcha"
              class="w-6 h-6 border-2 border-luxury-dark accent-luxury-gold" required />
            <label for="recaptcha" class="text-sm text-luxury-brown tracking-luxury">
              Ich bin kein Roboter
            </label>
            <div class="flex flex-col items-center">
              <svg class="w-8 h-8 text-luxury-accent" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span class="text-xs text-luxury-brown mt-1">reCAPTCHA</span>
            </div>
          </div>
        </div>

        <!-- AGB Checkbox -->
        <div class="flex items-start card-luxury p-4">
          <input type="checkbox" id="agb" v-model="formData.agbAccepted" required
            class="w-5 h-5 mt-1 border-2 border-luxury-dark accent-luxury-gold" />
          <label for="agb" class="ml-3 text-sm text-luxury-dark font-light tracking-luxury">
            Ich habe die
            <router-link to="/agb"
              class="text-luxury-accent hover:text-luxury-dark transition-colors duration-300 font-medium">
              AGB hier lesen
            </router-link>
            gelesen und akzeptiert
          </label>
        </div>

        <!-- Fehler Nachricht -->
        <div v-if="generalError"
          class="text-red-700 text-sm text-center bg-red-50 border-2 border-red-300 p-3 font-light">
          {{ generalError }}
        </div>

        <!-- Registrieren Button -->
        <div>
          <button type="submit" :disabled="!isFormValid"
            class="btn-luxury-primary w-full disabled:bg-luxury-tan disabled:cursor-not-allowed disabled:border-luxury-tan">
            ACCOUNT REGISTRIEREN
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center text-sm pt-4 border-t border-luxury-light">
          <span class="text-luxury-brown font-light">Bereits ein Konto? </span>
          <router-link to="/login"
            class="text-luxury-accent hover:text-luxury-dark font-medium transition-colors duration-300 tracking-luxury">
            Jetzt anmelden
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { register } = useAuth();

// Formulardaten
const formData = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  street: "",
  houseNumber: "",
  zipCode: "",
  city: "",
  recaptcha: false,
  agbAccepted: false,
});

// Fehlertexte
const errors = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  street: "",
  houseNumber: "",
  zipCode: "",
  city: "",
});

const generalError = ref("");

// Validierungsfunktion
const validateField = (fieldName: string) => {
  switch (fieldName) {
    case "firstName":
    case "lastName":
      if (!formData[fieldName]) {
        errors[fieldName] = "Dieses Feld ist erforderlich";
      } else if (formData[fieldName].length < 2) {
        errors[fieldName] = "Mindestens 2 Zeichen erforderlich";
      } else {
        errors[fieldName] = "";
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        errors.email = "E-Mail ist erforderlich";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
      } else {
        errors.email = "";
      }
      break;

    case "gender":
      if (!formData.gender) {
        errors.gender = "Bitte wählen Sie eine Anrede aus";
      } else {
        errors.gender = "";
      }
      break;

    case "phone":
      const phoneRegex = /^[\d\s+()-]+$/;
      if (!formData.phone) {
        errors.phone = "Telefonnummer ist erforderlich";
      } else if (!phoneRegex.test(formData.phone) || formData.phone.length < 6) {
        errors.phone = "Bitte geben Sie eine gültige Telefonnummer ein";
      } else {
        errors.phone = "";
      }
      break;

    case "password":
      if (!formData.password) {
        errors.password = "Passwort ist erforderlich";
      } else if (formData.password.length < 6) {
        errors.password = "Passwort muss mindestens 6 Zeichen lang sein";
      } else {
        errors.password = "";
      }
      break;

    case "confirmPassword":
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Bitte bestätigen Sie Ihr Passwort";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwörter stimmen nicht überein";
      } else {
        errors.confirmPassword = "";
      }
      break;

    case "street":
    case "city":
      if (!formData[fieldName]) {
        errors[fieldName] = "Dieses Feld ist erforderlich";
      } else {
        errors[fieldName] = "";
      }
      break;

    case "houseNumber":
      if (!formData.houseNumber) {
        errors.houseNumber = "Hausnummer ist erforderlich";
      } else {
        errors.houseNumber = "";
      }
      break;

    case "zipCode":
      const zipRegex = /^\d{5}$/;
      if (!formData.zipCode) {
        errors.zipCode = "PLZ ist erforderlich";
      } else if (!zipRegex.test(formData.zipCode)) {
        errors.zipCode = "PLZ muss 5 Ziffern haben";
      } else {
        errors.zipCode = "";
      }
      break;
  }
};

// Formularvalidierung prüfen
const isFormValid = computed(() => {
  return (
    formData.firstName &&
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
    !Object.values(errors).some((error) => error !== "")
  );
});

// Registrierung absenden
const handleRegister = async () => {
  generalError.value = "";

  Object.keys(errors).forEach((field) => validateField(field));

  if (Object.values(errors).some((e) => e !== "")) {
    generalError.value = "Bitte korrigieren Sie die Fehler im Formular.";
    return;
  }

  const result = await register({
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    email: formData.email,
    phone: formData.phone,
    street: formData.street,
    houseNumber: formData.houseNumber,
    zipCode: formData.zipCode,
    city: formData.city,
    password: formData.password,
  });

  if (result.success) {
    router.push("/login");
  } else {
    generalError.value = result.message;
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

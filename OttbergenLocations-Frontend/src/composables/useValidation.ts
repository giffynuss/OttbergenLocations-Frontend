import { reactive, computed } from 'vue'

export interface FormData {
  firstName?: string
  lastName?: string
  gender?: string
  email?: string
  phone?: string
  street?: string
  houseNumber?: string
  postalCode?: string
  zipCode?: string
  city?: string
  password?: string
  confirmPassword?: string
}

export const useValidation = (formData: FormData) => {
  // Fehlerobjekt
  const errors = reactive<Record<string, string>>({})
  
  // Nachverfolgung welche Felder "touched" wurden
  const touchedFields = reactive<Record<string, boolean>>({})

  // Validierungsregeln
  const validateField = (fieldName: string) => {
    // Markiere Feld als "touched"
    touchedFields[fieldName] = true

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

      case 'gender':
        if (!formData.gender) {
          errors.gender = 'Bitte wählen Sie eine Anrede aus'
        } else {
          errors.gender = ''
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

      case 'postalCode':
      case 'zipCode':
        const zipRegex = /^\d{5}$/
        const fieldKey = fieldName === 'zipCode' ? 'zipCode' : 'postalCode'
        if (!formData[fieldKey]) {
          errors[fieldKey] = 'PLZ ist erforderlich'
        } else if (!zipRegex.test(formData[fieldKey])) {
          errors[fieldKey] = 'PLZ muss 5 Ziffern haben'
        } else {
          errors[fieldKey] = ''
        }
        break

      case 'password':
        if (!formData.password) {
          errors.password = 'Passwort ist erforderlich'
        } else if (formData.password.length < 10) {
          errors.password = 'Passwort muss mindestens 10 Zeichen lang sein'
        } else if (!/[a-z]/.test(formData.password)) {
          errors.password = 'Mindestens 1 Kleinbuchstabe muss enthalten sein'
        } else if (!/[A-Z]/.test(formData.password)) {
          errors.password = 'Mindestens 1 Großbuchstabe muss enthalten sein'
        } else if (!/\d/.test(formData.password)) {
          errors.password = 'Mindestens 1 Zahl muss enthalten sein'
        } else if (!/[!@#$%^&*+(),.?":{}|<>_\-]/.test(formData.password)) {
          errors.password = 'Mindestens 1 Sonderzeichen muss enthalten sein'
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
    }
  }

  // Alle Felder validieren
  const validateAllFields = () => {
    Object.keys(formData).forEach(field => validateField(field))
  }

  // Erzwinge Validierung aller Felder (unabhängig von touched)
  const validateAllFieldsForced = () => {
    Object.keys(formData).forEach(field => {
      touchedFields[field] = true
      validateField(field)
    })
  }

  // Felder-Array validieren
  const validateFields = (fieldNames: string[]) => {
    fieldNames.forEach(field => validateField(field))
  }

  // Prüfe ob es Fehler gibt
  const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== '')
  })

  // Fehlerobjekt zurücksetzen
  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
  }

  // Einzelnen Fehler zurücksetzen
  const clearError = (fieldName: string) => {
    errors[fieldName] = ''
  }

  // Alle touched-Felder zurücksetzen
  const clearTouched = () => {
    Object.keys(touchedFields).forEach(key => {
      touchedFields[key] = false
    })
  }

  return {
    errors,
    validateField,
    validateAllFields,
    validateAllFieldsForced,
    validateFields,
    hasErrors,
    clearErrors,
    clearError,
    clearTouched
  }
}
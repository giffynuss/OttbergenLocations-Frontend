import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: 'herr' | 'frau'
  address: {
    street: string
    houseNumber: string
    zipCode: string
    city: string
  }
}

// Mock Nutzerdaten für Tests
const mockUsers: Record<string, { password: string; user: User }> = {
  'max.mustermann@example.com': {
    password: 'password123',
    user: {
      id: '1',
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: '+49 151 12345678',
      gender: 'herr',
      address: {
        street: 'Hauptstraße',
        houseNumber: '42',
        zipCode: '37691',
        city: 'Ottbergen'
      }
    }
  },
  'anna.schmidt@example.com': {
    password: 'test123',
    user: {
      id: '2',
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      phone: '+49 170 9876543',
      gender: 'frau',
      address: {
        street: 'Bergstraße',
        houseNumber: '15',
        zipCode: '37691',
        city: 'Ottbergen'
      }
    }
  }
}

export const useUserStore = defineStore('user', () => {
  // State
  const currentUser = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Getters
  const fullName = computed(() => {
    if (!currentUser.value) return ''
    return `${currentUser.value.firstName} ${currentUser.value.lastName}`
  })

  const userInitials = computed(() => {
    if (!currentUser.value) return ''
    return `${currentUser.value.firstName[0]}${currentUser.value.lastName[0]}`
  })

  // Actions
  function login(email: string, password: string): boolean {
    const mockUser = mockUsers[email]

    if (mockUser && mockUser.password === password) {
      currentUser.value = mockUser.user
      isAuthenticated.value = true

      // Persist to localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify(mockUser.user))

      console.log('✅ Login erfolgreich:', email)
      return true
    }

    console.log('❌ Login fehlgeschlagen:', email)
    return false
  }

  function register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    gender: 'herr' | 'frau'
    street: string
    houseNumber: string
    zipCode: string
    city: string
  }): boolean {
    // Check if user already exists
    if (mockUsers[userData.email]) {
      console.log('❌ Registrierung fehlgeschlagen: E-Mail bereits vorhanden')
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      address: {
        street: userData.street,
        houseNumber: userData.houseNumber,
        zipCode: userData.zipCode,
        city: userData.city
      }
    }

    // Add to mock users (in real app, this would be API call)
    mockUsers[userData.email] = {
      password: userData.password,
      user: newUser
    }

    // Auto-login after registration
    currentUser.value = newUser
    isAuthenticated.value = true

    // Persist to localStorage
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(newUser))

    console.log('✅ Registrierung erfolgreich:', userData.email)
    return true
  }

  function logout() {
    currentUser.value = null
    isAuthenticated.value = false

    // Clear localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')

    console.log('✅ Logout erfolgreich')
  }

  function updateProfile(updates: Partial<User>) {
    if (!currentUser.value) return false

    currentUser.value = {
      ...currentUser.value,
      ...updates
    }

    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))

    console.log('✅ Profil aktualisiert')
    return true
  }

  function changePassword(currentPassword: string, newPassword: string): boolean {
    if (!currentUser.value) return false

    const mockUser = mockUsers[currentUser.value.email]
    if (!mockUser) return false

    if (mockUser.password !== currentPassword) {
      console.log('❌ Aktuelles Passwort ist falsch')
      return false
    }

    mockUser.password = newPassword
    console.log('✅ Passwort geändert')
    return true
  }

  function checkAuth() {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('currentUser')

    if (storedAuth === 'true' && storedUser) {
      try {
        const user = JSON.parse(storedUser)
        currentUser.value = user
        isAuthenticated.value = true
        console.log('✅ Auth-Status wiederhergestellt:', user.email)
      } catch (error) {
        console.error('❌ Fehler beim Wiederherstellen der Session:', error)
        logout()
      }
    }
  }

  return {
    // State
    currentUser,
    isAuthenticated,

    // Getters
    fullName,
    userInitials,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuth
  }
})

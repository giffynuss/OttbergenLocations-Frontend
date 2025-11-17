import { ref, computed } from 'vue'

// Simpler Authentication State Management
// In einer echten Anwendung würde dies mit einem Backend verbunden sein
const isAuthenticated = ref<boolean>(false)
const currentUser = ref<{ id: string; name: string; email: string } | null>(null)

export function useAuth() {
  const login = (email: string, password: string) => {
    // Simulierte Login-Logik
    // In einer echten App würde hier eine API-Anfrage stattfinden
    if (email && password) {
      isAuthenticated.value = true
      currentUser.value = {
        id: '1',
        name: 'Max Mustermann',
        email: email
      }
      // Speichern im localStorage für Persistenz
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
      return true
    }
    return false
  }

  const register = (name: string, email: string, password: string) => {
    // Simulierte Registrierungs-Logik
    if (name && email && password) {
      isAuthenticated.value = true
      currentUser.value = {
        id: '1',
        name: name,
        email: email
      }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  const checkAuth = () => {
    // Prüfen ob User bereits eingeloggt ist (z.B. nach Seiten-Reload)
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('currentUser')

    if (storedAuth === 'true' && storedUser) {
      isAuthenticated.value = true
      currentUser.value = JSON.parse(storedUser)
    }
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    currentUser: computed(() => currentUser.value),
    login,
    register,
    logout,
    checkAuth
  }
}

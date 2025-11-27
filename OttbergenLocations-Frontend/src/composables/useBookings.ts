import { ref } from 'vue'
import type { Booking, BookingRequest, PaymentMethod, BankAccount } from '@/types/place'

const API_BASE_URL = 'http://localhost/OttbergenLocations-Backend/api/bookings'

interface BookingResponse {
  success: boolean
  booking: Booking & {
    guestInfo?: {
      gender: string
      firstName: string
      lastName: string
      email: string
      phone: string
      street?: string
      postalCode?: string
      city?: string
    }
  }
  paymentDetails?: BankAccount
  message?: string
  errors?: Record<string, string>
}

interface BookingListResponse {
  success: boolean
  bookings: Booking[]
  message?: string
}

export function useBookings() {
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Erstellt eine neue Buchung
   */
  const createBooking = async (bookingRequest: BookingRequest): Promise<{ success: boolean; booking?: Booking; paymentDetails?: BankAccount; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Session-basierte Auth
        body: JSON.stringify(bookingRequest)
      })

      const data: BookingResponse = await response.json()

      if (data.success && data.booking) {
        currentBooking.value = data.booking
        return {
          success: true,
          booking: data.booking,
          paymentDetails: data.paymentDetails,
          message: data.message
        }
      } else {
        error.value = data.message || 'Fehler beim Erstellen der Buchung'
        return {
          success: false,
          message: error.value
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Netzwerkfehler'
      error.value = errorMessage
      console.error('Buchungsfehler:', err)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Lädt alle Buchungen des eingeloggten Benutzers
   */
  const fetchMyBookings = async (): Promise<{ success: boolean; bookings?: Booking[]; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/index.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Session-basierte Auth
      })

      const data: BookingListResponse = await response.json()

      if (data.success && data.bookings) {
        bookings.value = data.bookings
        return {
          success: true,
          bookings: data.bookings
        }
      } else {
        error.value = data.message || 'Fehler beim Laden der Buchungen'
        return {
          success: false,
          message: error.value
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Netzwerkfehler'
      error.value = errorMessage
      console.error('Fehler beim Laden der Buchungen:', err)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Lädt eine einzelne Buchung anhand der ID
   */
  const fetchBookingById = async (bookingId: number): Promise<{ success: boolean; booking?: Booking; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/get.php?id=${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Session-basierte Auth
      })

      const data: BookingResponse = await response.json()

      if (data.success && data.booking) {
        currentBooking.value = data.booking
        return {
          success: true,
          booking: data.booking
        }
      } else {
        error.value = data.message || 'Fehler beim Laden der Buchung'
        return {
          success: false,
          message: error.value
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Netzwerkfehler'
      error.value = errorMessage
      console.error('Fehler beim Laden der Buchung:', err)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Storniert eine Buchung (authentifiziert)
   */
  const cancelBooking = async (bookingId: number, reason?: string): Promise<{ success: boolean; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/cancel.php?id=${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Session-basierte Auth
        body: JSON.stringify({ reason })
      })

      const data = await response.json()

      if (data.success) {
        // Aktualisiere lokalen Status
        if (currentBooking.value?.id === bookingId) {
          currentBooking.value.status = 'cancelled'
        }
        const bookingIndex = bookings.value.findIndex(b => b.id === bookingId)
        if (bookingIndex !== -1 && bookings.value[bookingIndex]) {
          bookings.value[bookingIndex].status = 'cancelled'
        }

        return {
          success: true,
          message: data.message || 'Buchung erfolgreich storniert'
        }
      } else {
        const errorMsg = data.error?.message || data.message || 'Fehler beim Stornieren der Buchung'
        error.value = errorMsg
        return {
          success: false,
          message: errorMsg
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Netzwerkfehler'
      error.value = errorMessage
      console.error('Fehler beim Stornieren der Buchung:', err)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Storniert eine Buchung per Token (ohne Authentifizierung)
   */
  const cancelBookingByToken = async (token: string, reason?: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const url = `${API_BASE_URL}/cancel-token.php?token=${token}`
      const options: RequestInit = {
        method: reason ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      if (reason) {
        options.body = JSON.stringify({ reason })
      }

      const response = await fetch(url, options)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || data.message || 'Stornierung fehlgeschlagen')
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Netzwerkfehler'
      error.value = errorMessage
      console.error('Fehler beim Stornieren per Token:', err)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    bookings,
    currentBooking,
    loading,
    error,

    // Actions
    createBooking,
    fetchMyBookings,
    fetchBookingById,
    cancelBooking,
    cancelBookingByToken
  }
}

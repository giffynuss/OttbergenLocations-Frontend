import { ref } from 'vue'
import type { Place } from '@/types/place'

const API_BASE_URL = 'http://localhost/OttbergenLocations-Backend/api/places'

interface PlacesListResponse {
  success: boolean
  places: Place[]
  error?: {
    code: string
    message: string
  }
}

interface PlaceDetailResponse {
  success: boolean
  place: Place
  error?: {
    code: string
    message: string
  }
}

export function usePlaces() {
  const places = ref<Place[]>([])
  const currentPlace = ref<Place | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Lädt alle Orte mit optionalen Filtern
   */
  const fetchPlaces = async (filters?: {
    search?: string
    location?: string
    minCapacity?: number
    maxPrice?: number
    checkIn?: string
    checkOut?: string
  }) => {
    loading.value = true
    error.value = null

    try {
      // Query-Parameter erstellen
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.location) params.append('location', filters.location)
      if (filters?.minCapacity) params.append('minCapacity', filters.minCapacity.toString())
      if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters?.checkIn) params.append('checkIn', filters.checkIn)
      if (filters?.checkOut) params.append('checkOut', filters.checkOut)

      const queryString = params.toString()
      const url = `${API_BASE_URL}/list.php${queryString ? `?${queryString}` : ''}`

      console.log('📡 API Request URL:', url)
      console.log('📡 Query Parameters:', Object.fromEntries(params))

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data: PlacesListResponse = await response.json()

      console.log('📡 API Response:', data)
      console.log('📡 Anzahl Orte erhalten:', data.places?.length || 0)

      if (data.success) {
        places.value = data.places
        return { success: true, places: data.places }
      } else {
        error.value = data.error?.message || 'Fehler beim Laden der Orte'
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = 'Netzwerkfehler beim Laden der Orte'
      console.error('Error fetching places:', err)
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Lädt einen einzelnen Ort mit allen Details
   */
  const fetchPlaceById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/get.php?id=${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data: PlaceDetailResponse = await response.json()

      if (data.success) {
        currentPlace.value = data.place
        return { success: true, place: data.place }
      } else {
        error.value = data.error?.message || 'Fehler beim Laden des Ortes'
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = 'Netzwerkfehler beim Laden des Ortes'
      console.error('Error fetching place:', err)
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Prüft die Verfügbarkeit eines Ortes für einen Zeitraum
   */
  const checkAvailability = async (placeId: number, checkIn: string, checkOut: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        `${API_BASE_URL.replace('/places', '')}/places/${placeId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()

      if (data.success) {
        return {
          success: true,
          available: data.available,
          blockedDates: data.blockedDates || [],
          message: data.message
        }
      } else {
        error.value = data.error?.message || 'Fehler bei der Verfügbarkeitsprüfung'
        return { success: false, available: false, message: error.value }
      }
    } catch (err) {
      error.value = 'Netzwerkfehler bei der Verfügbarkeitsprüfung'
      console.error('Error checking availability:', err)
      return { success: false, available: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  /**
   * Lädt den Buchungskalender für einen Ort
   */
  const fetchCalendar = async (placeId: number, months: number = 12) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        `${API_BASE_URL.replace('/places', '')}/places/${placeId}/calendar?months=${months}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()

      if (data.success) {
        return {
          success: true,
          bookedDates: data.data.bookedDates
        }
      } else {
        error.value = data.error?.message || 'Fehler beim Laden des Kalenders'
        return { success: false, message: error.value }
      }
    } catch (err) {
      error.value = 'Netzwerkfehler beim Laden des Kalenders'
      console.error('Error fetching calendar:', err)
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    places,
    currentPlace,
    loading,
    error,
    fetchPlaces,
    fetchPlaceById,
    checkAvailability,
    fetchCalendar
  }
}

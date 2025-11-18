import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Place {
  id: number
  name: string
  description: string
  location: string
  capacity: number
  pricePerDay: number
  latitude?: number
  longitude?: number
  imageUrl?: string
}

export interface Booking {
  id: string
  placeId: number
  placeName: string
  userId: string
  checkInDate: string
  checkOutDate: string
  numberOfDays: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

// Mock-Daten für Orte
export const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Kulturraum Ottbergen',
    description: 'Ein wunderschöner Veranstaltungsraum im Herzen von Ottbergen. Perfekt für Hochzeiten, Firmenfeiern und kulturelle Events. Mit moderner Ausstattung und historischem Charme.',
    location: 'Ottbergen',
    capacity: 100,
    pricePerDay: 250,
    latitude: 51.7892,
    longitude: 9.4217
  },
  {
    id: 2,
    name: 'Gemeindesaal St. Marien',
    description: 'Heller und freundlicher Saal mit Bühne und Nebenräumen. Ideal für Familienfeiern, Konzerte und Workshops. Küche und Sanitäranlagen vorhanden.',
    location: 'Ottbergen Nord',
    capacity: 60,
    pricePerDay: 150,
    latitude: 51.7915,
    longitude: 9.4230
  },
  {
    id: 3,
    name: 'Dorfgemeinschaftshaus',
    description: 'Traditionelles Gemeinschaftshaus mit rustikalem Charme. Bietet Platz für kleinere Veranstaltungen und Treffen. Voll ausgestattete Küche inklusive.',
    location: 'Ottbergen Süd',
    capacity: 40,
    pricePerDay: 120,
    latitude: 51.7870,
    longitude: 9.4200
  },
  {
    id: 4,
    name: 'Scheune am Waldrand',
    description: 'Umgebaute historische Scheune mit besonderem Ambiente. Perfekt für rustikale Hochzeiten und Gartenpartys. Große Außenfläche mit Gartenmöbeln verfügbar.',
    location: 'Ottbergen West',
    capacity: 80,
    pricePerDay: 300,
    latitude: 51.7885,
    longitude: 9.4150
  }
]

export const useBookingStore = defineStore('booking', () => {
  // State
  const places = ref<Place[]>([...mockPlaces])
  const searchResults = ref<Place[]>([...mockPlaces])
  const selectedPlace = ref<Place | null>(null)
  const bookings = ref<Booking[]>([])

  // Search filters
  const searchQuery = ref('')
  const checkInDate = ref('')
  const checkOutDate = ref('')

  // Getters
  const numberOfDays = computed(() => {
    if (!checkInDate.value || !checkOutDate.value) return 0

    const checkIn = new Date(checkInDate.value)
    const checkOut = new Date(checkOutDate.value)
    const diffTime = checkOut.getTime() - checkIn.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  })

  const userBookings = computed(() => (userId: string) => {
    return bookings.value.filter(booking => booking.userId === userId)
  })

  const activeBookings = computed(() => (userId: string) => {
    return bookings.value.filter(
      booking => booking.userId === userId && booking.status !== 'cancelled'
    )
  })

  // Actions
  function performSearch() {
    if (!searchQuery.value.trim()) {
      searchResults.value = [...places.value]
      return
    }

    searchResults.value = places.value.filter(place =>
      place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )

    console.log('=== SUCHE DURCHGEFÜHRT ===')
    console.log('Suchbegriff:', searchQuery.value)
    console.log('Check-in:', checkInDate.value)
    console.log('Check-out:', checkOutDate.value)
    console.log('Anzahl Ergebnisse:', searchResults.value.length)
    console.log('=========================')
  }

  function calculatePlaceTotal(pricePerDay: number): number {
    return pricePerDay * numberOfDays.value
  }

  function createBooking(userId: string, place: Place): Booking | null {
    if (!checkInDate.value || !checkOutDate.value) {
      console.log('❌ Buchung fehlgeschlagen: Daten fehlen')
      return null
    }

    const booking: Booking = {
      id: Date.now().toString(),
      placeId: place.id,
      placeName: place.name,
      userId,
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
      numberOfDays: numberOfDays.value,
      totalPrice: calculatePlaceTotal(place.pricePerDay),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    bookings.value.push(booking)

    // Persist to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings.value))

    console.log('=== BUCHUNG ERSTELLT ===')
    console.log('Buchungs-ID:', booking.id)
    console.log('Ort:', place.name)
    console.log('Check-in:', checkInDate.value)
    console.log('Check-out:', checkOutDate.value)
    console.log('Tage:', numberOfDays.value)
    console.log('Gesamtpreis:', booking.totalPrice, '€')
    console.log('========================')

    return booking
  }

  function cancelBooking(bookingId: string): boolean {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (!booking) return false

    booking.status = 'cancelled'

    // Persist to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings.value))

    console.log('✅ Buchung storniert:', bookingId)
    return true
  }

  function confirmBooking(bookingId: string): boolean {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (!booking) return false

    booking.status = 'confirmed'

    // Persist to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings.value))

    console.log('✅ Buchung bestätigt:', bookingId)
    return true
  }

  function loadBookings() {
    const storedBookings = localStorage.getItem('bookings')
    if (storedBookings) {
      try {
        bookings.value = JSON.parse(storedBookings)
        console.log('✅ Buchungen geladen:', bookings.value.length)
      } catch (error) {
        console.error('❌ Fehler beim Laden der Buchungen:', error)
      }
    }
  }

  function resetSearch() {
    searchQuery.value = ''
    checkInDate.value = ''
    checkOutDate.value = ''
    searchResults.value = [...places.value]
    selectedPlace.value = null
  }

  return {
    // State
    places,
    searchResults,
    selectedPlace,
    bookings,
    searchQuery,
    checkInDate,
    checkOutDate,

    // Getters
    numberOfDays,
    userBookings,
    activeBookings,

    // Actions
    performSearch,
    calculatePlaceTotal,
    createBooking,
    cancelBooking,
    confirmBooking,
    loadBookings,
    resetSearch
  }
})

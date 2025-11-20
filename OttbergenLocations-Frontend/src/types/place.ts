// Einheitliche Typen für Orte/Locations im gesamten Frontend

export interface Place {
  id: number
  name: string
  description: string
  location: string
  capacity: number
  pricePerDay: number

  // Optionale Felder (für erweiterte Informationen)
  images?: string[]
  latitude?: number
  longitude?: number
  address?: string
  postalCode?: string
  features?: PlaceFeature[]
  availableDates?: DateRange[]

  // Anbieter-Informationen
  provider?: Provider

  // Status
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PlaceFeature {
  id: number
  name: string
  icon?: string
  available: boolean
}

export interface Provider {
  id: number
  name: string
  email: string
  phone?: string
  memberSince?: string
  avatar?: string
}

export interface DateRange {
  start: string // ISO date string
  end: string   // ISO date string
}

export interface Booking {
  id: number
  placeId: number
  placeName: string
  placeLocation: string
  userId: number
  checkIn: string      // Format: "DD.MM.YYYY" oder ISO
  checkOut: string     // Format: "DD.MM.YYYY" oder ISO
  guests: number
  totalPrice: number
  subtotal?: number
  serviceFee?: number
  tax?: number
  status: 'pending' | 'confirmed' | 'upcoming' | 'completed' | 'cancelled'
  createdAt?: string
  updatedAt?: string
}

// Hilfsfunktionen für Datumsberechnung
export const calculateNumberOfDays = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const diffTime = checkOutDate.getTime() - checkInDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}

export const formatDateGerman = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

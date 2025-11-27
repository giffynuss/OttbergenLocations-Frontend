// Einheitliche Typen für Orte/Locations im gesamten Frontend

export interface Place {
  id: number
  name: string
  description: string
  location: string
  capacity: number
  pricePerDay: number

  // Optionale Felder (für erweiterte Informationen)
  images?: string[] // Array von URL-Strings (vereinfacht)
  latitude?: number
  longitude?: number
  address?: string
  postalCode?: string
  features?: PlaceFeature[]
  availableDates?: DateRange[]

  // Anbieter-Informationen (vereinfacht)
  provider?: Provider

  // Status
  active?: boolean
  // ENTFERNT: createdAt, updatedAt (nicht mehr vom Backend geliefert)
}

export interface PlaceFeature {
  id: number
  name: string
  category?: string // z.B. "basic", "parking", "kitchen"
  // ENTFERNT: icon, available (Backend sendet nur vorhandene Features)
}

export interface Provider {
  id: number
  name: string
  email?: string // Nur in Detail-Ansichten verfügbar
  phone?: string // Nur in Detail-Ansichten verfügbar
  bankAccount?: BankAccount // Bankverbindung für Überweisungen
  // ENTFERNT: memberSince, avatar, verified (Backend-Vereinfachung)
}

export interface BankAccount {
  accountHolder: string
  iban: string
  bic: string
  bankName: string
}

export interface DateRange {
  start: string // ISO date string
  end: string   // ISO date string
}

export type PaymentMethod = 'cash' | 'paypal' | 'transfer' | 'wero'

export interface Booking {
  id: number
  placeId: number
  placeName: string
  placeLocation: string
  userId?: number
  checkIn: string      // Format: "YYYY-MM-DD" (ISO vom Backend)
  checkOut: string     // Format: "YYYY-MM-DD" (ISO vom Backend)
  guests: number
  totalPrice: number   // Nur noch Gesamtpreis (Tage × Tagespreis)
  paymentMethod?: PaymentMethod // Gewählte Zahlungsmethode
  bookingReference?: string // Buchungsnummer
  // ENTFERNT: subtotal, serviceFee, tax (Backend-Vereinfachung)
  status: 'pending' | 'confirmed' | 'rejected' | 'upcoming' | 'completed' | 'cancelled'
  cancelledAt?: string | null
  cancellationReason?: string | null // Wird auch für rejected-Grund verwendet
  // Backend nutzt cancellationReason für Ablehnungen
  // ENTFERNT: createdAt, updatedAt, providerNotifiedAt, userConfirmedAt (nicht in DB vorhanden)
}

export interface BookingRequest {
  placeId: number
  checkIn: string
  checkOut: string
  guests: number
  paymentMethod: PaymentMethod
  userInfo: {
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

// Status-Labels für UI
export const BookingStatusLabels: Record<string, string> = {
  pending: 'Ausstehend',
  confirmed: 'Bestätigt',
  rejected: 'Abgelehnt',
  upcoming: 'Bevorstehend',
  completed: 'Abgeschlossen',
  cancelled: 'Storniert'
}

// Status-Farben für Tailwind CSS
export const BookingStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  upcoming: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-gray-100 text-gray-600'
}

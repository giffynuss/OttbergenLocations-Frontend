<template>
  <div class="min-h-screen bg-luxury-ivory pb-20">
    <!-- Hero Bild Section -->
    <div class="relative h-96 bg-gradient-to-br from-luxury-medium via-luxury-tan to-luxury-cream overflow-hidden">
      <!-- Bild oder dekoratives Muster im Hintergrund -->
      <div class="absolute inset-0 bg-cover bg-center" :style="place?.images && place.images.length > 0
        ? `background-image: url('${place.images[0]}'); opacity: 0.35;`
        : `background-image:
          linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%),
          linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%);
          background-size: 40px 40px;
          opacity: 0.20;
          color: var(--color-luxury-dark);`
        "></div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-luxury-dark/50 via-luxury-dark/40 to-transparent"></div>

      <!-- Zurück Button -->
      <button @click="goBack"
        class="absolute top-6 left-6 z-10 px-4 py-2 bg-luxury-ivory/90 backdrop-blur-sm text-luxury-dark font-medium tracking-luxury hover:bg-luxury-ivory transition-all duration-300 border border-luxury-gold flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Zurück
      </button>

      <!-- Titel über dem Bild -->
      <div class="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div class="max-w-7xl mx-auto">
          <h1 class="font-luxury text-5xl font-bold text-luxury-ivory mb-4 tracking-luxury drop-shadow-lg">
            {{ place?.name }}
          </h1>
          <div class="flex items-center gap-4 text-luxury-light">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-lg font-medium">{{ place?.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              <span class="text-lg font-medium">Bis zu {{ place?.capacity }} Personen</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-center items-center py-32">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-gold"></div>
      </div>
    </div>

    <!-- Fehleranzeige -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="p-6 bg-red-100 border border-red-400 text-red-700">
        <p class="font-medium">{{ error }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Linke Spalte: Hauptinformationen -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Beschreibung -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Beschreibung
            </h2>
            <p class="text-luxury-brown text-lg leading-relaxed font-light">
              {{ place?.description }}
            </p>

            <!-- Zusätzliche Features (vom Backend) -->
            <div v-if="place?.features && place.features.length > 0" class="mt-8 pt-8 border-t border-luxury-light">
              <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-4 tracking-luxury">Ausstattung & Features
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="feature in place.features" :key="feature.id"
                  class="flex items-center gap-3 text-luxury-brown">
                  <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ feature.name }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Bilder-Galerie -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 4h16v16H4z"></path>
              </svg>
              Bildergalerie
            </h2>

            <!-- Gitter -->
            <div v-if="place?.images && place.images.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(img, index) in place.images" :key="index" @click="openLightbox(index)"
                class="aspect-video overflow-hidden border border-luxury-tan bg-luxury-light shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <img :src="img"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            <p v-else class="text-luxury-brown text-center pt-4 font-light">Keine Bilder verfügbar</p>
          </section>

          <!-- Lightbox Overlay -->
          <div v-if="lightboxOpen" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <!-- Close Button -->
            <button @click="closeLightbox" class="absolute top-6 right-6 text-white text-3xl font-bold">
              &times;
            </button>

            <!-- Navigation Left -->
            <button @click="previousImage" class="absolute left-6 text-white text-4xl font-bold select-none">
              ‹
            </button>

            <!-- Bild -->
            <img 
              :src="place?.images?.[currentImage] ?? ''" 
              class="w-full h-full object-contain max-h-screen max-w-screen m-0 p-0" 
            />

            <!-- Navigation Right -->
            <button @click="nextImage" class="absolute right-6 text-white text-4xl font-bold select-none">
              ›
            </button>
          </div>

          <!-- Verfügbarkeitskalender -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Verfügbarkeit
            </h2>

            <!-- Datumswähler -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="input-luxury bg-luxury-light text-luxury-dark opacity-80 cursor-not-allowed select-none">
                {{ checkInDate ? formatDate(checkInDate) : 'Datum auswählen' }}
              </div>

              <div class="input-luxury bg-luxury-light text-luxury-dark opacity-80 cursor-not-allowed select-none">
                {{ checkOutDate ? formatDate(checkOutDate) : 'Datum auswählen' }}
              </div>
            </div>

            <!-- V-Calendar -->
            <div class="mt-6 overflow-x-auto">
              <v-calendar :panels="3" :rows="1" :columns="3" is-expanded title-position="center" :color="selectedColor"
                :attributes="allCalendarAttributes" @dayclick="onDayClick" />
            </div>

            <!-- Warnung bei Buchungskonflikt -->
            <div v-if="hasBookingConflict && conflictingBooking" class="mt-6 p-4 bg-red-50 border-2 border-red-500">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div class="flex-1">
                  <h4 class="font-bold text-red-700 mb-1">Buchung nicht möglich</h4>
                  <p class="text-sm text-red-600">
                    Der gewählte Zeitraum überschneidet sich mit einer bestehenden Buchung
                    ({{ formatDate(conflictingBooking.checkIn) }} - {{ formatDate(conflictingBooking.checkOut) }}).
                    Bitte wählen Sie einen anderen Zeitraum.
                  </p>
                </div>
              </div>
            </div>

            <!-- Anzahl Tage und Preis -->
            <div v-if="numberOfDays > 0 && !hasBookingConflict" class="mt-6 p-4 bg-luxury-gold/10 border border-luxury-gold">
              <div class="flex justify-between items-center">
                <span class="text-luxury-brown font-medium">Ausgewählte Tage:</span>
                <span class="font-luxury text-xl font-bold text-luxury-dark">{{ numberOfDays }} {{ numberOfDays === 1 ?
                  'Tag' : 'Tage' }}</span>
              </div>
            </div>
          </section>

          <!-- Anbieter Kontaktinformationen -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Anbieter
            </h2>

            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="w-16 h-16 bg-luxury-medium flex items-center justify-center text-luxury-ivory font-luxury text-2xl font-bold">
                  {{ getProviderInitial() }}
                </div>
                <div class="flex-1">
                  <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-3">{{ place?.provider?.name || 'Anbieter'
                  }}</h3>

                  <div class="space-y-2">
                    <div v-if="place?.provider?.email" class="flex items-center gap-3 text-luxury-brown">
                      <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                      </svg>
                      <span>{{ place.provider.email }}</span>
                    </div>
                    <div v-if="place?.provider?.phone" class="flex items-center gap-3 text-luxury-brown">
                      <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                      </svg>
                      <span>{{ place.provider.phone }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                v-if="place?.provider?.email"
                :href="`mailto:${place.provider.email}`"
                class="w-full btn-luxury-secondary mt-4 text-center py-2 px-4 bg-luxury-ivory text-luxury-dark font-medium tracking-luxury border border-luxury-dark transition-all duration-300 hover:bg-luxury-dark hover:text-luxury-ivory flex items-center justify-center"
                style="margin-top: 1rem; align-self: flex-start;"
              >
                Anbieter kontaktieren
              </a>
            </div>
          </section>

          <!-- Anfahrtskarte -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7">
                </path>
              </svg>
              Anreise & Standort
            </h2>

            <div id="map" class="h-96 w-full border border-luxury-tan" style="height: 400px;"></div>

            <!-- Adresse -->
            <div class="mt-6 p-4 bg-luxury-light border border-luxury-tan">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p class="font-medium text-luxury-dark mb-1">{{ place?.name }}</p>
                  <p class="text-luxury-brown text-sm">Beispielstraße 123</p>
                  <p class="text-luxury-brown text-sm">12345 {{ place?.location }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Rechte Spalte: Buchungsübersicht (Sticky) -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <div class="card-luxury p-8">
              <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury">Buchungsübersicht</h2>

              <!-- Preis pro Tag -->
              <div class="mb-6 pb-6 border-b border-luxury-light">
                <div class="flex justify-between items-baseline mb-2">
                  <span class="text-luxury-brown">Preis pro Tag</span>
                  <span class="font-luxury text-3xl font-bold text-luxury-dark tracking-luxury">{{ place?.pricePerDay
                  }}€</span>
                </div>
              </div>

              <!-- Ausgewählte Daten -->
              <div v-if="checkInDate && checkOutDate" class="space-y-4 mb-6 pb-6 border-b border-luxury-light">
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-in</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(checkInDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-out</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(checkOutDate) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Dauer</p>
                  <p class="font-medium text-luxury-dark">{{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}
                  </p>
                </div>
              </div>

              <!-- Warnung bei Buchungskonflikt in der Sidebar -->
              <div v-if="hasBookingConflict && numberOfDays > 0" class="mb-6 p-4 bg-red-50 border-2 border-red-500">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p class="font-bold text-red-700 text-sm mb-1">Zeitraum nicht verfügbar</p>
                    <p class="text-xs text-red-600">Dieser Zeitraum überschneidet sich mit einer bestehenden Buchung.</p>
                  </div>
                </div>
              </div>

              <!-- Vereinfachte Preisberechnung -->
              <div v-else-if="numberOfDays > 0" class="mb-6 p-4 bg-luxury-gold/10 border border-luxury-gold">
                <div class="flex justify-between items-center text-luxury-brown mb-3">
                  <span class="text-sm">{{ place?.pricePerDay }}€ × {{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' :
                    'Tage' }}</span>
                  <span class="font-luxury text-2xl font-bold text-luxury-dark">{{ totalPrice }}€</span>
                </div>
                <p class="text-xs text-luxury-tan">Gesamtpreis inkl. aller Gebühren</p>
              </div>

              <!-- Hinweis wenn keine Daten ausgewählt -->
              <div v-else class="mb-6 p-4 bg-luxury-light border border-luxury-tan text-center">
                <p class="text-sm text-luxury-brown">Wählen Sie Check-in und Check-out Datum, um den Gesamtpreis zu
                  sehen</p>
              </div>

              <!-- Buchen Button -->
              <button @click="handleBooking" :disabled="!checkInDate || !checkOutDate || hasBookingConflict"
                class="w-full btn-luxury-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {{ hasBookingConflict ? 'Zeitraum nicht verfügbar' : (checkInDate && checkOutDate ? 'Jetzt buchen' : 'Datum wählen') }}
              </button>

              <!-- Zusätzliche Infos -->
              <div class="mt-6 space-y-3 text-sm text-luxury-brown">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Kostenlose Stornierung bis 48h vor Anreise</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Sie erhalten eine Buchungsbestätigung per E-Mail</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Sichere Bezahlung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePlaces } from '@/composables/usePlaces'
import type { Place } from '@/types/place'

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl
});

interface CalendarHighlightSegment {
  fillMode?: string;
  color?: string;
}

interface CalendarAttribute {
  key: string | number;
  highlight?: {
    start?: CalendarHighlightSegment;
    base?: CalendarHighlightSegment;
    end?: CalendarHighlightSegment;
  };
  dates: {
    start: Date;
    end: Date;
  };
  disabled?: boolean;
  popover?: {
    label: string;
  };
}

interface Booking {
  bookingId: number;
  checkIn: string;
  checkOut: string;
  status: string;
}

const router = useRouter()
const route = useRoute()
const { currentPlace, loading, error, fetchPlaceById } = usePlaces()

const place = ref<Place | null>(null)
const checkInDate = ref('')
const checkOutDate = ref('')

const bookings = ref<Booking[]>([]);
const calendarAttributes = ref<CalendarAttribute[]>([]);
const selectedColor = ref('orange'); // Warme Farbe passend zum Luxury-Theme

// Heutiges Datum für min-Attribut
const today = new Date().toISOString().split('T')[0]

const loadBookings = async () => {
  if (!place.value) return;

  const res = await fetch(
    `http://localhost/OttbergenLocations-Backend/api/bookings/get_room_bookings.php?place_id=${place.value.id}`
  );
  const data = await res.json();

  if (data.success) {
    bookings.value = data.bookings.map((b: any) => ({
      bookingId: b.booking_id,
      checkIn: b.check_in,
      checkOut: b.check_out,
      status: b.status
    }));
    markUnavailableDays();
  }
};

const markUnavailableDays = () => {
  calendarAttributes.value = bookings.value.map(b => ({
    key: `booking-${b.bookingId}`,

    // Diese Tage dürfen NICHT ausgewählt werden
    disabled: true,

    // Tooltip beim Hover
    popover: {
      label: "Ausgebucht"
    },

    // Luxury-Tan Farbe mit Braun-Akzent für gebuchte Tage
    highlight: {
      start: {
        fillMode: 'solid',
        color: 'brown'
      },
      base: {
        fillMode: 'solid',
        color: 'brown'
      },
      end: {
        fillMode: 'solid',
        color: 'brown'
      }
    },

    // Der Zeitraum der Buchung
    dates: {
      start: new Date(b.checkIn),
      end: new Date(b.checkOut)
    }
  }));
  console.log('Kalender-Attribute:', calendarAttributes.value);  // Logge die calendarAttributes
};

// Computed Property für alle Kalender-Attribute (gebuchte + ausgewählte Tage)
const allCalendarAttributes = computed(() => {
  const attributes = [...calendarAttributes.value];

  // Füge den ausgewählten Zeitraum hinzu, wenn beide Daten gesetzt sind
  if (checkInDate.value && checkOutDate.value) {
    attributes.push({
      key: 'selected-range',
      highlight: {
        start: {
          fillMode: 'solid',
          color: 'yellow'
        },
        base: {
          fillMode: 'light',
          color: 'yellow'
        },
        end: {
          fillMode: 'solid',
          color: 'yellow'
        }
      },
      dates: {
        start: new Date(checkInDate.value),
        end: new Date(checkOutDate.value)
      }
    });
  }

  return attributes;
});

const initMap = () => {
  if (!place.value) return;

  const lat = place.value.latitude ?? 51.71124;
  const lng = place.value.longitude ?? 9.30602;

  const map = L.map("map").setView([lat, lng], 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(place.value.name)
    .openPopup();
};

// Ort laden
onMounted(async () => {
  const id = parseInt(route.params.id as string)

  // Wenn Daten von der vorherigen Seite übergeben wurden
  if (route.query.checkIn) {
    checkInDate.value = route.query.checkIn as string
  }
  if (route.query.checkOut) {
    checkOutDate.value = route.query.checkOut as string
  }

  // Ort von der API laden
  const result = await fetchPlaceById(id)

  if (result.success && result.place) {
    place.value = result.place
    initMap();
    await loadBookings();
  } else {
    console.error('Ort nicht gefunden:', result.message)
    // Wenn Ort nicht gefunden, zurück zur Suche
    router.push('/search')
  }
})

// Anzahl der Tage berechnen
const numberOfDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0

  const checkIn = new Date(checkInDate.value)
  const checkOut = new Date(checkOutDate.value)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
})

// Vereinfachte Kostenberechnung (Backend-Vereinfachung)
// Nur noch: Tage × Tagespreis = Gesamtpreis
const totalPrice = computed(() => {
  if (!place.value) return 0
  return place.value.pricePerDay * numberOfDays.value
})

// Prüfe, ob der ausgewählte Zeitraum mit bestehenden Buchungen kollidiert
const hasBookingConflict = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return false;

  const selectedStart = new Date(checkInDate.value);
  const selectedEnd = new Date(checkOutDate.value);
  selectedStart.setHours(0, 0, 0, 0);
  selectedEnd.setHours(0, 0, 0, 0);

  return bookings.value.some(booking => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);
    bookingStart.setHours(0, 0, 0, 0);
    bookingEnd.setHours(0, 0, 0, 0);

    // Prüfe auf Überschneidungen: Zeiträume überschneiden sich, wenn:
    // selectedStart < bookingEnd UND selectedEnd > bookingStart
    return selectedStart < bookingEnd && selectedEnd > bookingStart;
  });
})

// Finde die konkrete Buchung, die mit dem ausgewählten Zeitraum kollidiert
const conflictingBooking = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return null;

  const selectedStart = new Date(checkInDate.value);
  const selectedEnd = new Date(checkOutDate.value);
  selectedStart.setHours(0, 0, 0, 0);
  selectedEnd.setHours(0, 0, 0, 0);

  return bookings.value.find(booking => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);
    bookingStart.setHours(0, 0, 0, 0);
    bookingEnd.setHours(0, 0, 0, 0);

    return selectedStart < bookingEnd && selectedEnd > bookingStart;
  });
})

const onDayClick = (day: any) => {
  const clickedDate = day.date;

  // Verwende lokale Datums-Formatierung statt UTC, um Timezone-Probleme zu vermeiden
  const year = clickedDate.getFullYear();
  const month = String(clickedDate.getMonth() + 1).padStart(2, '0');
  const dayNum = String(clickedDate.getDate()).padStart(2, '0');
  const iso = `${year}-${month}-${dayNum}`;

  // Prüfe, ob der Tag bereits gebucht ist
  const isBooked = bookings.value.some(booking => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);
    bookingStart.setHours(0, 0, 0, 0);
    bookingEnd.setHours(0, 0, 0, 0);
    clickedDate.setHours(0, 0, 0, 0);

    return clickedDate >= bookingStart && clickedDate < bookingEnd;
  });

  // Wenn der Tag gebucht ist, ignoriere den Klick
  if (isBooked) {
    return;
  }

  // Wenn kein Check-In gewählt → setze Check-In
  if (!checkInDate.value) {
    checkInDate.value = iso;
    return;
  }

  // Wenn Check-In vorhanden, aber kein Check-Out → setze Check-Out
  if (!checkOutDate.value) {
    // Check-Out muss nach Check-In liegen
    if (clickedDate <= new Date(checkInDate.value)) {
      return; // falsch, nichts setzen
    }

    checkOutDate.value = iso;
    return;
  }

  // Wenn beides gesetzt ist → neue Auswahl beginnen
  checkInDate.value = iso;
  checkOutDate.value = "";
};

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.push('/search')
}

const getProviderInitial = () => {
  if (!place.value?.provider?.name) return 'A'
  return place.value.provider.name.charAt(0).toUpperCase()
}

const handleBooking = () => {
  if (!place.value) {
    return
  }

  // Validierung: Check-in und Check-out müssen ausgewählt sein
  if (!checkInDate.value || !checkOutDate.value) {
    alert('Bitte wählen Sie Check-in und Check-out Datum aus.')
    return
  }

  // Validierung: Check-out muss nach Check-in liegen
  const checkIn = new Date(checkInDate.value)
  const checkOut = new Date(checkOutDate.value)

  if (checkOut <= checkIn) {
    alert('Das Check-out Datum muss nach dem Check-in Datum liegen.')
    return
  }

  // Validierung: Check-in darf nicht in der Vergangenheit liegen
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (checkIn < today) {
    alert('Das Check-in Datum darf nicht in der Vergangenheit liegen.')
    return
  }

  // Buchungsdaten für die Checkout-Seite vorbereiten
  const bookingData = {
    placeId: place.value.id,
    placeName: place.value.name,
    placeLocation: place.value.location,
    placeAddress: place.value.address,
    placeCapacity: place.value.capacity,
    checkIn: checkInDate.value,
    checkOut: checkOutDate.value,
    pricePerDay: place.value.pricePerDay,
    providerId: place.value.provider?.id,
    // Bankdaten des Anbieters falls vorhanden (für Überweisungen)
    providerBankAccount: place.value.provider?.bankAccount
  }

  // Navigation zur Checkout-Seite mit Buchungsdaten
  router.push({
    name: 'checkout',
    state: { bookingData }
  })
}

const lightboxOpen = ref(false)
const currentImage = ref(0)

const openLightbox = (index: number) => {
  currentImage.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextImage = () => {
  if (!place.value?.images) return
  currentImage.value = (currentImage.value + 1) % place.value.images.length
}

const previousImage = () => {
  if (!place.value?.images) return
  currentImage.value =
    (currentImage.value - 1 + place.value.images.length) % place.value.images.length
}
</script>

<style>
/* Custom V-Calendar Farben für das Luxury-Theme */
/* Sehr hohe Spezifität um Standard-Styles zu überschreiben */

/* Gebuchte Tage - Luxury Tan mit Braun-Akzent */
:deep(.vc-day-box-center-center) :deep(.vc-day-content.vc-focusable.vc-focus.vc-attr.vc-highlight-content-solid.vc-brown),
:deep(.vc-highlight-content-solid.vc-brown) {
  background-color: #a68a64 !important; /* luxury-tan */
}

/* Ausgewählter Zeitraum - Luxury Cream */
:deep(.vc-day-box-center-center) :deep(.vc-day-content.vc-focusable.vc-focus.vc-attr.vc-highlight-content-light.vc-yellow),
:deep(.vc-day-box-center-center) :deep(.vc-day-content.vc-focusable.vc-focus.vc-attr.vc-highlight-content-solid.vc-yellow),
:deep(.vc-highlight-content-light.vc-yellow),
:deep(.vc-highlight-content-solid.vc-yellow) {
  background-color: #d4c4b0 !important; /* luxury-cream */
}

/* Überschreibe ALLE orange Farben direkt aus dem index CSS */
:deep(.vc-light.vc-attr),
:deep(.vc-attr.vc-highlight-content-solid),
:deep(.vc-highlight-content-solid) {
  --vc-accent-600: #d4c4b0 !important;
}

/* Setze die Farben für Brown explizit */
:deep(.vc-brown),
:deep(.vc-brown.vc-attr) {
  --vc-accent-600: #a68a64 !important;
}

/* Setze die Farben für Yellow explizit */
:deep(.vc-yellow),
:deep(.vc-yellow.vc-attr) {
  --vc-accent-200: #d4c4b0 !important;
  --vc-accent-600: #8b6f47 !important;
}

#map {
  position: relative;
  /* Sicherstellen, dass die Karte relativ zu ihrem Container bleibt */
  z-index: 0;
  /* Niedriger Z-Index, damit sie nicht über andere Elemente schwebt */
  overflow: hidden;
  /* Verhindert, dass Inhalte außerhalb des Containers sichtbar sind */
}
</style>

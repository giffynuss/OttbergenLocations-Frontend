<template>
  <div class="min-h-screen bg-luxury-ivory pb-20">
    <!-- Header -->
    <div class="bg-luxury-dark text-luxury-ivory py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          @click="goBack"
          class="mb-4 px-4 py-2 bg-luxury-ivory/10 backdrop-blur-sm text-luxury-ivory font-medium tracking-luxury hover:bg-luxury-ivory/20 transition-all duration-300 border border-luxury-gold flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Zurück
        </button>
        <h1 class="font-luxury text-4xl font-bold tracking-luxury">Buchung abschließen</h1>
        <p class="text-luxury-light mt-2">Bitte überprüfen Sie Ihre Buchungsdetails und wählen Sie eine Zahlungsart</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Linke Spalte: Formulare -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Zahlungsart wählen -->
          <section class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              Zahlungsart wählen
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- In Bar vor Ort -->
              <button
                @click="paymentMethod = 'cash'"
                :class="[
                  'p-6 border-2 transition-all duration-300 text-left',
                  paymentMethod === 'cash'
                    ? 'border-luxury-gold bg-luxury-gold/10'
                    : 'border-luxury-tan hover:border-luxury-medium'
                ]"
              >
                <div class="flex items-start justify-between mb-3">
                  <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <div v-if="paymentMethod === 'cash'" class="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-luxury-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-2">Bar vor Ort</h3>
                <p class="text-sm text-luxury-brown">Bezahlung direkt beim Anbieter</p>
              </button>

              <!-- PayPal (Temporär deaktiviert) -->
              <button
                disabled
                :class="[
                  'p-6 border-2 transition-all duration-300 text-left opacity-50 cursor-not-allowed relative'
                ]"
              >
                <div class="flex items-start justify-between mb-3">
                  <svg class="w-8 h-8 text-luxury-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="px-2 py-1 bg-luxury-tan text-luxury-ivory text-xs font-bold tracking-luxury">
                    DEMNÄCHST
                  </span>
                </div>
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-2">PayPal</h3>
                <p class="text-sm text-luxury-brown">In Kürze verfügbar</p>
              </button>

              <!-- Überweisung -->
              <button
                @click="paymentMethod = 'transfer'"
                :class="[
                  'p-6 border-2 transition-all duration-300 text-left',
                  paymentMethod === 'transfer'
                    ? 'border-luxury-gold bg-luxury-gold/10'
                    : 'border-luxury-tan hover:border-luxury-medium'
                ]"
              >
                <div class="flex items-start justify-between mb-3">
                  <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                  <div v-if="paymentMethod === 'transfer'" class="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-luxury-ivory" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-2">Überweisung</h3>
                <p class="text-sm text-luxury-brown">Klassische Banküberweisung</p>
              </button>

              <!-- Wero (Temporär deaktiviert) -->
              <button
                disabled
                :class="[
                  'p-6 border-2 transition-all duration-300 text-left opacity-50 cursor-not-allowed relative'
                ]"
              >
                <div class="flex items-start justify-between mb-3">
                  <svg class="w-8 h-8 text-luxury-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span class="px-2 py-1 bg-luxury-tan text-luxury-ivory text-xs font-bold tracking-luxury">
                    DEMNÄCHST
                  </span>
                </div>
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-2">Wero</h3>
                <p class="text-sm text-luxury-brown">In Kürze verfügbar</p>
              </button>
            </div>
          </section>

          <!-- Benutzerinformationen -->
          <section v-if="paymentMethod" class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Ihre Kontaktdaten
            </h2>

            <div class="space-y-6">
              <!-- Gästeanzahl -->
              <div>
                <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Anzahl Gäste *</label>
                <input
                  v-model.number="guests"
                  type="number"
                  min="1"
                  :max="bookingData.placeCapacity || 100"
                  required
                  class="input-luxury w-full md:w-1/3"
                  placeholder="1"
                />
                <p class="text-xs text-luxury-brown mt-1">Maximal {{ bookingData.placeCapacity || 100 }} Gäste möglich</p>
              </div>

              <!-- Anrede -->
              <div>
                <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Anrede *</label>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="genderOption in genderOptions"
                    :key="genderOption.value"
                    @click="userInfo.gender = genderOption.value"
                    :class="[
                      'py-3 px-4 border-2 transition-all duration-300',
                      userInfo.gender === genderOption.value
                        ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-dark font-bold'
                        : 'border-luxury-tan text-luxury-brown hover:border-luxury-medium'
                    ]"
                  >
                    {{ genderOption.label }}
                  </button>
                </div>
              </div>

              <!-- Vorname und Nachname -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Vorname *</label>
                  <input
                    v-model="userInfo.firstName"
                    type="text"
                    required
                    class="input-luxury"
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Nachname *</label>
                  <input
                    v-model="userInfo.lastName"
                    type="text"
                    required
                    class="input-luxury"
                    placeholder="Mustermann"
                  />
                </div>
              </div>

              <!-- E-Mail und Telefon -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">E-Mail *</label>
                  <input
                    v-model="userInfo.email"
                    type="email"
                    required
                    class="input-luxury"
                    placeholder="max.mustermann@example.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Telefon *</label>
                  <input
                    v-model="userInfo.phone"
                    type="tel"
                    required
                    class="input-luxury"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <!-- Zusätzliche Felder für Überweisung -->
              <div v-if="paymentMethod === 'transfer'" class="pt-6 border-t border-luxury-light space-y-6">
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-4">Rechnungsadresse</h3>

                <div>
                  <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Straße und Hausnummer *</label>
                  <input
                    v-model="userInfo.street"
                    type="text"
                    required
                    class="input-luxury"
                    placeholder="Musterstraße 123"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">PLZ *</label>
                    <input
                      v-model="userInfo.postalCode"
                      type="text"
                      required
                      class="input-luxury"
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-luxury-brown mb-2 tracking-luxury uppercase">Stadt *</label>
                    <input
                      v-model="userInfo.city"
                      type="text"
                      required
                      class="input-luxury"
                      placeholder="Musterstadt"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Überweisungsdaten (nur bei Überweisung) -->
          <section v-if="paymentMethod === 'transfer'" class="card-luxury p-8 bg-luxury-light">
            <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury flex items-center gap-3">
              <svg class="w-7 h-7 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Überweisungsdaten
            </h2>

            <div class="space-y-4 bg-luxury-ivory p-6 border-2 border-luxury-gold">
              <p class="text-sm text-luxury-brown mb-4">Bitte überweisen Sie den Betrag auf folgendes Konto:</p>

              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-luxury-tan">
                  <span class="text-sm text-luxury-brown font-medium">Empfänger:</span>
                  <span class="font-luxury text-luxury-dark font-bold">{{ bankDetails.accountHolder }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-luxury-tan">
                  <span class="text-sm text-luxury-brown font-medium">IBAN:</span>
                  <span class="font-mono text-luxury-dark font-bold">{{ bankDetails.iban }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-luxury-tan">
                  <span class="text-sm text-luxury-brown font-medium">BIC:</span>
                  <span class="font-mono text-luxury-dark font-bold">{{ bankDetails.bic }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-luxury-tan">
                  <span class="text-sm text-luxury-brown font-medium">Bank:</span>
                  <span class="text-luxury-dark font-bold">{{ bankDetails.bankName }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-sm text-luxury-brown font-medium">Verwendungszweck:</span>
                  <span class="text-luxury-dark font-bold">{{ bookingReference }}</span>
                </div>
              </div>

              <div class="mt-6 p-4 bg-luxury-gold/20 border border-luxury-gold">
                <p class="text-sm text-luxury-dark">
                  <strong>Wichtig:</strong> Bitte geben Sie unbedingt die Buchungsnummer als Verwendungszweck an, damit Ihre Zahlung zugeordnet werden kann.
                </p>
              </div>
            </div>
          </section>

          <!-- Rechtliche Hinweise -->
          <section v-if="paymentMethod" class="card-luxury p-8">
            <h2 class="font-luxury text-3xl font-bold text-luxury-dark mb-6 tracking-luxury">Rechtliche Hinweise</h2>

            <div class="space-y-4">
              <!-- AGB -->
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  v-model="agreements.agb"
                  type="checkbox"
                  class="mt-1 w-5 h-5 text-luxury-gold border-luxury-tan focus:ring-luxury-gold"
                />
                <span class="text-luxury-brown group-hover:text-luxury-dark transition-colors">
                  Ich akzeptiere die <router-link to="/agb" class="text-luxury-gold hover:underline font-medium">Allgemeinen Geschäftsbedingungen</router-link> *
                </span>
              </label>

              <!-- Datenschutz -->
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  v-model="agreements.privacy"
                  type="checkbox"
                  class="mt-1 w-5 h-5 text-luxury-gold border-luxury-tan focus:ring-luxury-gold"
                />
                <span class="text-luxury-brown group-hover:text-luxury-dark transition-colors">
                  Ich habe die <router-link to="/datenschutz" class="text-luxury-gold hover:underline font-medium">Datenschutzerklärung</router-link> zur Kenntnis genommen *
                </span>
              </label>

              <!-- Stornierungsbedingungen -->
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  v-model="agreements.cancellation"
                  type="checkbox"
                  class="mt-1 w-5 h-5 text-luxury-gold border-luxury-tan focus:ring-luxury-gold"
                />
                <span class="text-luxury-brown group-hover:text-luxury-dark transition-colors">
                  Ich habe die Stornierungsbedingungen verstanden (kostenlose Stornierung bis 48h vor Anreise) *
                </span>
              </label>
            </div>

            <div class="mt-6 p-4 bg-luxury-light border border-luxury-tan">
              <p class="text-sm text-luxury-brown">
                <strong>Hinweis:</strong> Nach Abschluss der Buchung wird eine Bestätigungsmail an den Anbieter gesendet. Der Anbieter wird Ihre Buchungsanfrage prüfen und Ihnen eine Bestätigung oder Ablehnung per E-Mail zusenden.
              </p>
            </div>
          </section>
        </div>

        <!-- Rechte Spalte: Buchungsübersicht (Sticky) -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <div class="card-luxury p-8">
              <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-6 tracking-luxury">Buchungsübersicht</h2>

              <!-- Ortsinformationen -->
              <div class="mb-6 pb-6 border-b border-luxury-light">
                <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-2">{{ bookingData.placeName }}</h3>
                <div class="flex items-center gap-2 text-luxury-brown text-sm">
                  <svg class="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{{ bookingData.placeLocation }}</span>
                </div>
              </div>

              <!-- Buchungsdaten -->
              <div class="space-y-4 mb-6 pb-6 border-b border-luxury-light">
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-in</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(bookingData.checkIn) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Check-out</p>
                  <p class="font-medium text-luxury-dark">{{ formatDate(bookingData.checkOut) }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Dauer</p>
                  <p class="font-medium text-luxury-dark">{{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}</p>
                </div>
                <div>
                  <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Buchungsnummer</p>
                  <p class="font-mono text-sm font-bold text-luxury-gold">{{ bookingReference }}</p>
                </div>
              </div>

              <!-- Preisaufschlüsselung -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between items-center text-luxury-brown">
                  <span class="text-sm">{{ bookingData.pricePerDay }}€ × {{ numberOfDays }} {{ numberOfDays === 1 ? 'Tag' : 'Tage' }}</span>
                  <span class="font-medium">{{ bookingData.pricePerDay * numberOfDays }}€</span>
                </div>
              </div>

              <!-- Gesamtpreis -->
              <div class="p-4 bg-luxury-gold/10 border border-luxury-gold">
                <div class="flex justify-between items-center">
                  <span class="font-luxury text-lg font-bold text-luxury-dark">Gesamtpreis</span>
                  <span class="font-luxury text-3xl font-bold text-luxury-dark tracking-luxury">{{ totalPrice }}€</span>
                </div>
              </div>

              <!-- Zahlungsart Anzeige -->
              <div v-if="paymentMethod" class="mt-6 p-4 bg-luxury-light border border-luxury-tan">
                <p class="text-xs text-luxury-brown mb-1 tracking-luxury uppercase">Gewählte Zahlungsart</p>
                <p class="font-luxury text-lg font-bold text-luxury-dark">
                  {{ paymentMethodLabel }}
                </p>
              </div>

              <!-- Buchen Button -->
              <button
                @click="handleCheckout"
                :disabled="!canCheckout"
                class="w-full btn-luxury-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ checkoutButtonText }}
              </button>

              <!-- Hinweise -->
              <div class="mt-6 space-y-3 text-sm text-luxury-brown">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Buchungsbestätigung per E-Mail</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Sichere Datenübertragung</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Anbieter wird benachrichtigt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PayPal Simulation Modal -->
    <div v-if="showPayPalModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-luxury-ivory max-w-md w-full p-8 border-2 border-luxury-gold">
        <h3 class="font-luxury text-2xl font-bold text-luxury-dark mb-4">PayPal Zahlung</h3>
        <p class="text-luxury-brown mb-6">Dies ist eine Simulation. In der echten Anwendung würden Sie jetzt zur PayPal-Website weitergeleitet.</p>

        <div class="space-y-4 mb-6 p-4 bg-luxury-light border border-luxury-tan">
          <p class="text-sm text-luxury-brown">
            <strong>Zahlbetrag:</strong> {{ totalPrice }}€
          </p>
          <p class="text-sm text-luxury-brown">
            <strong>Empfänger:</strong> {{ bookingData.placeName }}
          </p>
        </div>

        <div class="flex gap-3">
          <button @click="confirmPayPal" class="flex-1 btn-luxury-primary">
            Zahlung simulieren
          </button>
          <button @click="showPayPalModal = false" class="flex-1 btn-luxury-secondary">
            Abbrechen
          </button>
        </div>
      </div>
    </div>

    <!-- Wero Simulation Modal -->
    <div v-if="showWeroModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-luxury-ivory max-w-md w-full p-8 border-2 border-luxury-gold">
        <h3 class="font-luxury text-2xl font-bold text-luxury-dark mb-4">Wero Echtzeitüberweisung</h3>
        <p class="text-luxury-brown mb-6">Dies ist eine Simulation. In der echten Anwendung würden Sie jetzt zur Wero-App weitergeleitet.</p>

        <div class="space-y-4 mb-6 p-4 bg-luxury-light border border-luxury-tan">
          <p class="text-sm text-luxury-brown">
            <strong>Zahlbetrag:</strong> {{ totalPrice }}€
          </p>
          <p class="text-sm text-luxury-brown">
            <strong>Empfänger:</strong> {{ bookingData.placeName }}
          </p>
          <p class="text-sm text-luxury-brown">
            <strong>Verwendungszweck:</strong> {{ bookingReference }}
          </p>
        </div>

        <div class="flex gap-3">
          <button @click="confirmWero" class="flex-1 btn-luxury-primary">
            Zahlung simulieren
          </button>
          <button @click="showWeroModal = false" class="flex-1 btn-luxury-secondary">
            Abbrechen
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-luxury-ivory max-w-lg w-full p-8 border-2 border-luxury-gold">
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-luxury text-3xl font-bold text-luxury-dark mb-2">Buchung erfolgreich!</h3>
          <p class="text-luxury-brown">Ihre Buchungsanfrage wurde gesendet</p>
        </div>

        <div class="space-y-4 mb-6 p-6 bg-luxury-light border border-luxury-tan">
          <p class="text-sm text-luxury-brown">
            <strong>Buchungsnummer:</strong> <span class="font-mono text-luxury-gold font-bold">{{ bookingReference }}</span>
          </p>
          <p class="text-sm text-luxury-brown">
            Eine Bestätigungsmail wurde an <strong>{{ userInfo.email }}</strong> gesendet.
          </p>
          <p class="text-sm text-luxury-brown">
            Der Anbieter wurde über Ihre Buchungsanfrage informiert und wird sich in Kürze bei Ihnen melden.
          </p>
        </div>

        <div v-if="paymentMethod === 'transfer'" class="mb-6 p-4 bg-luxury-gold/20 border border-luxury-gold">
          <p class="text-sm text-luxury-dark">
            <strong>Nächster Schritt:</strong> Bitte überweisen Sie den Betrag von <strong>{{ totalPrice }}€</strong> mit der Buchungsnummer als Verwendungszweck.
          </p>
        </div>

        <button @click="goToMyBookings" class="w-full btn-luxury-primary">
          Zu meinen Buchungen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { formatDateGerman, calculateNumberOfDays, type PaymentMethod, type BankAccount } from '@/types/place'
import { useBookings } from '@/composables/useBookings'

const router = useRouter()
const route = useRoute()
const { createBooking, loading: bookingLoading, error: bookingError } = useBookings()

// Buchungsdaten aus der Navigation
interface BookingData {
  placeId: number
  placeName: string
  placeLocation: string
  placeAddress?: string
  checkIn: string
  checkOut: string
  pricePerDay: number
  placeCapacity?: number
  providerId?: number
  providerBankAccount?: BankAccount
}

const bookingData = ref<BookingData>({
  placeId: 0,
  placeName: '',
  placeLocation: '',
  checkIn: '',
  checkOut: '',
  pricePerDay: 0
})

// Zahlungsmethode
const paymentMethod = ref<PaymentMethod | null>(null)

// Gästeanzahl
const guests = ref(1)

// Gender Optionen (lowercase für Backend)
// Hinweis: Backend unterstützt aktuell nur 'herr' und 'frau'
const genderOptions = [
  { label: 'Herr', value: 'herr' },
  { label: 'Frau', value: 'frau' }
]

// Benutzerinformationen
const userInfo = ref({
  gender: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  postalCode: '',
  city: ''
})

// Zustimmungen
const agreements = ref({
  agb: false,
  privacy: false,
  cancellation: false
})

// Modals
const showPayPalModal = ref(false)
const showWeroModal = ref(false)
const showSuccessModal = ref(false)

// Buchungsreferenz wird vom Backend generiert
const bookingReference = ref('')

// Bankdaten (Anbieter oder Fallback zu Mock-Daten)
const bankDetails = computed(() => {
  if (bookingData.value.providerBankAccount) {
    return bookingData.value.providerBankAccount
  }
  // Fallback Mock-Daten des Unternehmens
  return {
    accountHolder: 'Ottbergen Locations GmbH',
    iban: 'DE89 3704 0044 0532 0130 00',
    bic: 'COBADEFFXXX',
    bankName: 'Commerzbank'
  }
})

// Berechnungen
const numberOfDays = computed(() => {
  return calculateNumberOfDays(bookingData.value.checkIn, bookingData.value.checkOut)
})

const totalPrice = computed(() => {
  return bookingData.value.pricePerDay * numberOfDays.value
})

const paymentMethodLabel = computed(() => {
  const labels = {
    cash: 'Bar vor Ort',
    paypal: 'PayPal',
    transfer: 'Überweisung',
    wero: 'Wero'
  }
  return paymentMethod.value ? labels[paymentMethod.value] : ''
})

const canCheckout = computed(() => {
  if (!paymentMethod.value) return false

  // Basis-Validierung
  const basicValid =
    userInfo.value.gender &&
    userInfo.value.firstName &&
    userInfo.value.lastName &&
    userInfo.value.email &&
    userInfo.value.phone &&
    agreements.value.agb &&
    agreements.value.privacy &&
    agreements.value.cancellation

  // Zusätzliche Validierung für Überweisung
  if (paymentMethod.value === 'transfer') {
    return basicValid &&
      userInfo.value.street &&
      userInfo.value.postalCode &&
      userInfo.value.city
  }

  return basicValid
})

const checkoutButtonText = computed(() => {
  if (!paymentMethod.value) return 'Zahlungsart wählen'
  if (!canCheckout.value) return 'Bitte alle Felder ausfüllen'

  const texts = {
    cash: 'Verbindlich buchen',
    paypal: 'Mit PayPal bezahlen',
    transfer: 'Verbindlich buchen',
    wero: 'Mit Wero bezahlen'
  }
  return texts[paymentMethod.value]
})

// Funktionen
const formatDate = (dateString: string) => {
  return formatDateGerman(dateString)
}

const goBack = () => {
  router.back()
}

const handleCheckout = () => {
  if (!canCheckout.value) return

  if (paymentMethod.value === 'paypal') {
    showPayPalModal.value = true
  } else if (paymentMethod.value === 'wero') {
    showWeroModal.value = true
  } else if (paymentMethod.value === 'cash' || paymentMethod.value === 'transfer') {
    processBooking()
  }
}

const confirmPayPal = () => {
  showPayPalModal.value = false
  // Simuliere kurze Verarbeitungszeit
  setTimeout(() => {
    processBooking()
  }, 500)
}

const confirmWero = () => {
  showWeroModal.value = false
  // Simuliere kurze Verarbeitungszeit
  setTimeout(() => {
    processBooking()
  }, 500)
}

const processBooking = async () => {
  if (!paymentMethod.value) return

  // Buchungsanfrage erstellen
  const bookingRequest = {
    placeId: bookingData.value.placeId,
    checkIn: bookingData.value.checkIn,
    checkOut: bookingData.value.checkOut,
    guests: guests.value,
    paymentMethod: paymentMethod.value,
    userInfo: {
      gender: userInfo.value.gender,
      firstName: userInfo.value.firstName,
      lastName: userInfo.value.lastName,
      email: userInfo.value.email,
      phone: userInfo.value.phone,
      street: userInfo.value.street || undefined,
      postalCode: userInfo.value.postalCode || undefined,
      city: userInfo.value.city || undefined
    }
  }

  console.log('=== BUCHUNG WIRD VERARBEITET ===')
  console.log('Buchungsanfrage:', bookingRequest)
  console.log('================================')

  // API-Call zum Backend
  const result = await createBooking(bookingRequest)

  if (result.success && result.booking) {
    // Setze Buchungsreferenz vom Backend
    bookingReference.value = result.booking.bookingReference || ''

    // Bei Überweisung: Bankdaten vom Backend übernehmen
    if (result.paymentDetails && paymentMethod.value === 'transfer') {
      bookingData.value.providerBankAccount = result.paymentDetails
    }

    // Zeige Erfolgs-Modal
    showSuccessModal.value = true
  } else {
    // Fehlerbehandlung
    alert(`Buchung fehlgeschlagen:\n\n${result.message || 'Unbekannter Fehler'}`)
  }
}

const goToMyBookings = () => {
  showSuccessModal.value = false
  router.push('/my-bookings')
}

// Daten aus Navigation laden
onMounted(() => {
  // Prüfe ob Buchungsdaten übergeben wurden
  const state = history.state as { bookingData?: BookingData }

  if (state?.bookingData) {
    bookingData.value = state.bookingData
  } else {
    // Fallback: Versuche Daten aus Query-Parametern zu laden
    const placeId = route.query.placeId
    const placeName = route.query.placeName
    const placeLocation = route.query.placeLocation
    const checkIn = route.query.checkIn
    const checkOut = route.query.checkOut
    const pricePerDay = route.query.pricePerDay

    if (placeId && placeName && checkIn && checkOut && pricePerDay) {
      bookingData.value = {
        placeId: Number(placeId),
        placeName: String(placeName),
        placeLocation: String(placeLocation || ''),
        checkIn: String(checkIn),
        checkOut: String(checkOut),
        pricePerDay: Number(pricePerDay)
      }
    } else {
      // Keine Buchungsdaten vorhanden - zurück zur Suche
      console.error('Keine Buchungsdaten vorhanden')
      router.push('/search')
    }
  }
})
</script>

<style scoped>
/* Modal Animationen */
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

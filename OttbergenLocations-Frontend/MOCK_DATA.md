# Mock-Daten für Tests

## Test-Benutzer

Für Tests stehen folgende Mock-Benutzer zur Verfügung:

### Benutzer 1
- **E-Mail:** `max.mustermann@example.com`
- **Passwort:** `password123`
- **Name:** Max Mustermann
- **Anrede:** Herr
- **Telefon:** +49 151 12345678
- **Adresse:** Hauptstraße 42, 37691 Ottbergen

### Benutzer 2
- **E-Mail:** `anna.schmidt@example.com`
- **Passwort:** `test123`
- **Name:** Anna Schmidt
- **Anrede:** Frau
- **Telefon:** +49 170 9876543
- **Adresse:** Bergstraße 15, 37691 Ottbergen

## Verfügbare Orte

Die Anwendung enthält 4 Mock-Veranstaltungsorte:

1. **Kulturraum Ottbergen**
   - Kapazität: 100 Personen
   - Preis: 250€ pro Tag
   - Standort: Ottbergen

2. **Gemeindesaal St. Marien**
   - Kapazität: 60 Personen
   - Preis: 150€ pro Tag
   - Standort: Ottbergen Nord

3. **Dorfgemeinschaftshaus**
   - Kapazität: 40 Personen
   - Preis: 120€ pro Tag
   - Standort: Ottbergen Süd

4. **Scheune am Waldrand**
   - Kapazität: 80 Personen
   - Preis: 300€ pro Tag
   - Standort: Ottbergen West

## Funktionen

### User Store (Pinia)
- ✅ Login/Logout
- ✅ Registrierung
- ✅ Profil aktualisieren
- ✅ Passwort ändern
- ✅ LocalStorage Persistenz

### Booking Store (Pinia)
- ✅ Orte suchen
- ✅ Suchergebnisse filtern
- ✅ Buchungen erstellen
- ✅ Buchungen verwalten (bestätigen/stornieren)
- ✅ LocalStorage Persistenz

## State Management

Die Anwendung verwendet **Pinia** für zentrales State Management:

### User Store (`src/stores/userStore.ts`)
```typescript
const userStore = useUserStore()

// State
userStore.currentUser      // Aktueller Benutzer
userStore.isAuthenticated  // Login-Status

// Actions
userStore.login(email, password)
userStore.register(userData)
userStore.logout()
userStore.updateProfile(updates)
userStore.changePassword(current, new)
userStore.checkAuth()
```

### Booking Store (`src/stores/bookingStore.ts`)
```typescript
const bookingStore = useBookingStore()

// State
bookingStore.searchResults  // Suchergebnisse
bookingStore.selectedPlace  // Ausgewählter Ort
bookingStore.bookings       // Alle Buchungen
bookingStore.searchQuery    // Suchbegriff
bookingStore.checkInDate    // Check-in Datum
bookingStore.checkOutDate   // Check-out Datum

// Actions
bookingStore.performSearch()
bookingStore.createBooking(userId, place)
bookingStore.cancelBooking(bookingId)
bookingStore.confirmBooking(bookingId)
bookingStore.loadBookings()
```

## Console Output

Die Anwendung loggt wichtige Aktionen in die Browser-Konsole:

- ✅ Login/Logout Events
- ✅ Registrierung
- ✅ Profil-Updates
- ✅ Passwort-Änderungen
- ✅ Suchanfragen
- ✅ Buchungs-Erstellung
- ✅ Auth-Status Wiederherstellung

## Hinweise

1. **Neue Benutzer registrieren:** Die Registrierung erstellt automatisch einen neuen Mock-Benutzer und loggt diesen ein.

2. **Passwort ändern:** In den Einstellungen kann das Passwort geändert werden. Das aktuelle Passwort muss korrekt eingegeben werden.

3. **Buchungen:** Buchungen erfordern Login und werden im LocalStorage gespeichert.

4. **LocalStorage:** Alle Daten werden im Browser LocalStorage gespeichert und überleben Page-Reloads.

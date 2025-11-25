# OttbergenLocations Frontend

Vue 3 + TypeScript + Vite Frontend für das OttbergenLocations Buchungssystem.

## 🚀 Features

- **Vue 3 Composition API** mit TypeScript
- **Tailwind CSS** für luxuriöses Styling mit Custom-Farbschema
- **Vue Router** für Navigation
- **Leaflet** für interaktive Karten
- **V-Calendar** für Datumauswahl und Kalenderansichten
- **Booking System** mit E-Mail-Benachrichtigungen
- **Status-Management** für Buchungen (pending, confirmed, rejected, etc.)
- **Responsive Design** für alle Geräte
- **Gast-Buchungen** ohne Login möglich

## 📋 Voraussetzungen

- Node.js (^20.19.0 || >=22.12.0)
- npm (wird mit Node.js installiert)
- Backend-Server läuft auf `http://localhost/OttbergenLocations-Backend`

## 🛠️ Installation

### 1. Dependencies installieren

```sh
npm install
```

### 2. Entwicklungsserver starten

```sh
npm run dev
```

Die Anwendung ist dann erreichbar unter: `http://localhost:5173`

### 3. Production Build erstellen

```sh
npm run build
```

## 📁 Projektstruktur

```
src/
├── assets/          # Statische Assets (Bilder, Fonts, etc.)
├── components/      # Wiederverwendbare Vue-Komponenten
│   └── BookingStatusBadge.vue  # Status-Badge für Buchungen
├── composables/     # Vue Composables (Business Logic)
│   ├── useAuth.ts
│   ├── useBookings.ts
│   └── usePlaces.ts
├── router/          # Vue Router Konfiguration
├── types/           # TypeScript Type Definitionen
│   └── place.ts     # Booking & Place Types
├── views/           # Seiten-Komponenten
│   ├── CheckoutView.vue
│   ├── MyBookingsView.vue
│   ├── BookingDetailView.vue
│   └── ...
└── main.ts          # App Entry Point

```

## 🎯 Wichtige Features

### Buchungssystem mit E-Mail-Workflow

1. **User erstellt Buchung** → Status: `pending`
2. **Anbieter erhält E-Mail** mit Bestätigen/Ablehnen-Links
3. **Bei Bestätigung:**
   - Status → `confirmed`
   - User erhält Bestätigungs-E-Mail
4. **Bei Ablehnung:**
   - Status → `rejected`
   - User erhält E-Mail mit Grund

### Buchungs-Status

- **pending** (Ausstehend) - Wartet auf Anbieter-Bestätigung
- **confirmed** (Bestätigt) - Vom Anbieter bestätigt
- **rejected** (Abgelehnt) - Vom Anbieter abgelehnt
- **upcoming** (Bevorstehend) - Bestätigte Buchung in der Zukunft
- **completed** (Abgeschlossen) - Vergangene Buchung
- **cancelled** (Storniert) - Vom User storniert

## 🔗 API-Anbindung

Das Frontend kommuniziert mit dem Backend über:

```typescript
const API_BASE_URL = 'http://localhost/OttbergenLocations-Backend/api'

// Endpunkte:
// - /places/list.php          - Alle Orte
// - /places/get.php           - Einzelner Ort
// - /bookings/create.php      - Buchung erstellen
// - /bookings/my-bookings.php - Meine Buchungen
// - /bookings/get.php         - Einzelne Buchung
// - /bookings/cancel.php      - Buchung stornieren
```

## 📚 Dokumentation

- [API_OVERVIEW.md](API_OVERVIEW.md) - Vollständige API-Dokumentation aller Backend-Endpoints
- [TEST_ANLEITUNG.md](TEST_ANLEITUNG.md) - Umfassende Test-Anleitung mit Szenarien und Troubleshooting
- [DESIGN_CHANGELOG.md](DESIGN_CHANGELOG.md) - Detaillierte Design-Dokumentation und Änderungshistorie

## 🎨 Styling & Design

Das Projekt verwendet ein luxuriöses Design mit Tailwind CSS:

### Farbschema
- **Luxury-Palette**: Elegante Braun- und Creme-Töne
- **Spitze Ecken**: Alle UI-Elemente ohne Rundungen für modernes, klares Design
- **Typografie**: Playfair Display (Überschriften) + Lato (Fließtext)
- **Dekorative Elemente**: Goldene Trennlinien und geometrische Muster

Details siehe [DESIGN_CHANGELOG.md](DESIGN_CHANGELOG.md)

## 🧪 Development

### Type-Checking

```sh
npm run type-check
```

### Format Code

```sh
npm run format
```

### Build für Production

```sh
npm run build
```

Dies führt Type-Checking und Build parallel aus.

## 🌐 Empfohlenes IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 🔧 Browser DevTools

### Chrome/Edge/Brave
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Custom Object Formatter aktivieren](http://bit.ly/object-formatters)

### Firefox
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Custom Object Formatter aktivieren](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 Konfiguration

Siehe [Vite Configuration Reference](https://vite.dev/config/) für weitere Anpassungen.

## 🤝 Zusammenarbeit mit Backend

Das Frontend ist vollständig kompatibel mit dem Backend:
- Nutzt Session-basierte Authentifizierung
- Unterstützt E-Mail-basierten Bestätigungsworkflow
- Zeigt alle Buchungs-Stati korrekt an
- Verwendet `cancellationReason` für Ablehnungsgründe

## 📄 Lizenz

Dieses Projekt ist privat und nicht für die öffentliche Nutzung bestimmt.

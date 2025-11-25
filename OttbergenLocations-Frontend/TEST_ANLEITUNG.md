# Test-Anleitung: Checkout-Integration

## ✅ Voraussetzungen

### Backend:
- ✅ XAMPP läuft (Apache + MySQL)
- ✅ Backend erreichbar unter: `http://localhost/OttbergenLocations-Backend/api/`
- ✅ Datenbank mit Seed-Daten geladen

### Frontend:
- ✅ Alle Anpassungen implementiert
- ✅ `credentials: 'include'` in allen fetch-Calls
- ✅ Gender auf "herr"/"frau" reduziert
- ✅ PayPal/Wero deaktiviert

## 🚀 Frontend starten

```bash
cd "c:\Users\patry\OneDrive\Dokumente\Code OneDrive\OttbergenLocations\OttbergenLocations-Frontend\OttbergenLocations-Frontend"
npm run dev
```

Frontend läuft auf: **http://localhost:5173**

## 🧪 Test-Szenarien

### Szenario 1: Cash-Zahlung (Gast) ✅

**Testdaten (vom Backend):**
- **Place:** Kulturraum Ottbergen (ID: 1)
- **Datum:** 2025-12-21 bis 2025-12-23 (verfügbar!)
- **Gäste:** 50
- **Zahlungsart:** Bar vor Ort

**Schritte:**
1. Zu `/search` navigieren
2. "Kulturraum Ottbergen" auswählen
3. Check-in: `2025-12-21`, Check-out: `2025-12-23`
4. "Jetzt buchen" klicken
5. Checkout-Seite lädt
6. Zahlungsart "Bar vor Ort" wählen
7. Gästeanzahl: `50` eingeben
8. Gender: "Herr" wählen
9. Formular ausfüllen:
   - Vorname: `Max`
   - Nachname: `Testmann`
   - Email: `max.test@example.com`
   - Telefon: `+49 123 456789`
10. Alle 3 Checkboxen (AGB, Datenschutz, Stornierung) abhaken
11. "Verbindlich buchen" klicken

**Erwartetes Ergebnis:**
- ✅ API-Call an `POST /api/bookings/create.php`
- ✅ Status: 201 Created
- ✅ Response enthält `bookingReference` (z.B. "BK20251124-1234")
- ✅ Erfolgs-Modal wird angezeigt
- ✅ Buchungsreferenz im Modal sichtbar
- ✅ Email-Adresse im Modal korrekt

**DevTools prüfen:**
- Network Tab → Request Body sollte korrekt sein
- Console → Keine Errors
- Response → `success: true`

---

### Szenario 2: Transfer-Zahlung mit Adresse ✅

**Testdaten:**
- **Place:** Gemeindesaal St. Marien (ID: 2)
- **Datum:** 2026-01-05 bis 2026-01-07 (verfügbar!)
- **Gäste:** 30
- **Zahlungsart:** Überweisung

**Schritte:**
1-5. Wie Szenario 1, aber Place 2 und andere Daten wählen
6. Zahlungsart "Überweisung" wählen
7. Gästeanzahl: `30`
8. Gender: "Frau" wählen
9. Basisformular ausfüllen
10. **Zusätzlich:** Rechnungsadresse ausfüllen:
    - Straße: `Teststraße 123`
    - PLZ: `12345`
    - Stadt: `Teststadt`
11. Checkboxen abhaken
12. "Verbindlich buchen" klicken

**Erwartetes Ergebnis:**
- ✅ API-Call mit vollständiger Adresse
- ✅ Response enthält `paymentDetails`:
  ```json
  {
    "accountHolder": "Ottbergen Locations GmbH",
    "iban": "DE89 3704 0044 0532 0130 00",
    "bic": "COBADEFFXXX",
    "bankName": "Commerzbank"
  }
  ```
- ✅ Erfolgs-Modal zeigt Bankdaten
- ✅ Hinweis auf Überweisung mit Verwendungszweck

**Zusätzlich prüfen:**
- Überweisungsdaten-Sektion auf Checkout-Seite sollte Bankdaten anzeigen
- Verwendungszweck = Buchungsreferenz

---

### Szenario 3: Fehler - Ort nicht verfügbar ❌

**Testdaten:**
- **Place:** Kulturraum Ottbergen (ID: 1)
- **Datum:** 2025-12-15 bis 2025-12-20 (BELEGT!)

**Schritte:**
1-9. Wie Szenario 1, aber belegt

en Zeitraum wählen
10. Formular ausfüllen und absenden

**Erwartetes Ergebnis:**
- ✅ Status: 409 Conflict
- ✅ Alert mit Message: "Ort ist für diesen Zeitraum nicht verfügbar"
- ✅ Fehler wird abgefangen, kein Crash

---

### Szenario 4: Fehler - Zu viele Gäste ❌

**Testdaten:**
- **Place:** Dorfgemeinschaftshaus (ID: 3, Kapazität: 40)
- **Gäste:** 50

**Erwartetes Ergebnis:**
- ✅ Status: 400 Bad Request
- ✅ Error Message: "Kapazität überschritten"

---

### Szenario 5: Fehler - Fehlende Adresse bei Transfer ❌

**Schritte:**
1. Transfer als Zahlungsart wählen
2. Adressfelder NICHT ausfüllen
3. Versuchen zu buchen

**Erwartetes Ergebnis:**
- ✅ Status: 400 Bad Request
- ✅ Error Message: "Bei Überweisung sind Adressdaten erforderlich"

---

### Szenario 6: UI-Validierung ✅

**Prüfen:**
- [ ] Gender-Auswahl zeigt nur 2 Optionen (Herr, Frau)
- [ ] PayPal Button ist deaktiviert, Badge "DEMNÄCHST"
- [ ] Wero Button ist deaktiviert, Badge "DEMNÄCHST"
- [ ] Gästeanzahl hat Min/Max Validierung
- [ ] Email-Format wird geprüft
- [ ] Pflichtfelder sind markiert mit *
- [ ] Adressfelder erscheinen nur bei Transfer
- [ ] Buchen-Button ist disabled solange nicht alle Felder ausgefüllt
- [ ] Checkboxen müssen alle aktiviert sein

---

## 📊 Checkliste für vollständige Tests

### Funktional:
- [ ] Cash-Buchung ohne Login funktioniert
- [ ] Transfer-Buchung ohne Login funktioniert
- [ ] Buchungsreferenz wird vom Backend generiert
- [ ] PaymentDetails bei Transfer werden empfangen
- [ ] Erfolgs-Modal zeigt korrekte Daten
- [ ] Error-Handling funktioniert (409, 400, 500)
- [ ] Loading-State während API-Call sichtbar

### UI/UX:
- [ ] Responsive Design auf Mobile/Tablet/Desktop
- [ ] Alle Buttons funktionieren
- [ ] Formular-Validierung funktioniert
- [ ] Gender-Grid zeigt nur 2 Optionen
- [ ] Bankdaten werden korrekt angezeigt
- [ ] Erfolgs-Modal ist schön formatiert

### Technisch:
- [ ] Keine Console-Errors
- [ ] CORS funktioniert (keine CORS-Errors)
- [ ] credentials: 'include' sendet Cookies
- [ ] Request-Format stimmt mit Backend überein
- [ ] Response-Format wird korrekt verarbeitet
- [ ] TypeScript-Typen passen

---

## 🐛 Troubleshooting

### Problem: CORS-Fehler
**Lösung:** Backend CORS-Header prüfen
```bash
curl -v http://localhost/OttbergenLocations-Backend/api/places/list.php
# Sollte Header enthalten: Access-Control-Allow-Origin: http://localhost:5173
```

### Problem: 404 Not Found
**Lösung:** Backend läuft nicht oder falsche URL
```bash
# Backend Quick Check:
curl http://localhost/OttbergenLocations-Backend/api/places/list.php
```

### Problem: Leere Response
**Lösung:** Datenbank-Seed prüfen
```bash
mysql -u root -e "SELECT COUNT(*) FROM ottbergen_booking.places;"
# Sollte mindestens 4 Places haben
```

### Problem: Session nicht persistent
**Lösung:** `credentials: 'include'` fehlt
- Prüfe useBookings.ts → alle fetch-Calls sollten `credentials: 'include'` haben

### Problem: Validation-Error obwohl Daten korrekt
**Lösung:** Gender-Format prüfen
- Frontend sendet "herr" oder "frau" (lowercase)
- NICHT "Herr" oder "Frau" (uppercase)

---

## 📝 Test-Protokoll

Nach den Tests bitte notieren:

### Was funktioniert ✅:
- [ ] Szenario 1 (Cash)
- [ ] Szenario 2 (Transfer)
- [ ] Szenario 3 (Error - nicht verfügbar)
- [ ] Szenario 4 (Error - zu viele Gäste)
- [ ] Szenario 5 (Error - fehlende Adresse)
- [ ] Szenario 6 (UI-Validierung)

### Gefundene Bugs 🐛:
_(Hier eintragen falls Probleme auftreten)_

### Verbesserungsvorschläge 💡:
_(Optional: Was könnte noch besser sein?)_

---

## 🎯 Nach erfolgreichen Tests

### Feedback an Backend:
1. Alle Szenarien durchgelaufen? → Grünes Licht für Phase 2 (E-Mails)
2. Bugs gefunden? → Detaillierte Beschreibung mit Request/Response
3. Alles perfekt? → Backend kann mit E-Mail-Integration starten

### Frontend Next Steps:
1. Error-Handling verfeinern (schöneres Modal statt alert)
2. Loading-States optimieren
3. Success-Page verbessern
4. "Meine Buchungen" View implementieren

---

## 🔗 Nützliche Links

- **Backend API-Doku:** [API_OVERVIEW.md](API_OVERVIEW.md)
- **Design-Dokumentation:** [DESIGN_CHANGELOG.md](DESIGN_CHANGELOG.md)
- **README:** [README.md](README.md)

---

**Viel Erfolg beim Testen! 🚀**

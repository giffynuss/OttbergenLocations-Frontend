<template>
  <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-luxury-light">
    <div class="max-w-4xl mx-auto">
      <!-- Überschrift -->
      <div class="text-center mb-12">
        <!-- Dekorative Elemente -->
        <div class="flex items-center justify-center mb-6">
          <div class="h-px w-16 bg-luxury-gold"></div>
          <div class="h-1 w-1 mx-2 bg-luxury-gold transform rotate-45"></div>
          <div class="h-px w-16 bg-luxury-gold"></div>
        </div>

        <h1 class="font-luxury text-5xl font-bold text-luxury-dark tracking-luxury">
          Datenschutzerklärung
        </h1>

        <p class="mt-4 text-luxury-brown font-light">
          Stand: {{ currentDate }}
        </p>
      </div>

      <!-- Datenschutz Content -->
      <div class="card-luxury p-8 space-y-8">
        <!-- 1. Allgemeine Hinweise -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            1. Allgemeine Hinweise
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <!-- 2. Datenerfassung -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            2. Datenerfassung auf dieser Website
          </h2>
          <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-3 mt-4">
            Wer ist verantwortlich für die Datenerfassung?
          </h3>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
            können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h3 class="font-luxury text-xl font-bold text-luxury-dark mb-3 mt-4">
            Wie erfassen wir Ihre Daten?
          </h3>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um
            Daten handeln, die Sie in ein Kontaktformular oder bei der Registrierung eingeben.
          </p>
          <p class="text-luxury-brown font-light leading-relaxed">
            Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
            allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>
        </section>

        <!-- 3. Registrierung -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            3. Registrierung auf dieser Website
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Sie können sich auf unserer Website registrieren, um zusätzliche Funktionen zu nutzen. Die dazu
            eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes,
            für den Sie sich registriert haben.
          </p>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Bei der Registrierung werden folgende Daten erhoben:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Anrede, Vorname und Nachname</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer</li>
            <li>Optional: Adressdaten (bei Buchungen mit Überweisung)</li>
          </ul>
        </section>

        <!-- 4. Buchungsdaten -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            4. Buchungsdaten
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Wenn Sie über unsere Plattform einen Veranstaltungsort buchen, erheben wir folgende Daten:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Buchungszeitraum (Check-in und Check-out)</li>
            <li>Anzahl der Gäste</li>
            <li>Gewählte Zahlungsart</li>
            <li>Ihre Kontaktdaten zur Buchungsbestätigung</li>
          </ul>
          <p class="text-luxury-brown font-light leading-relaxed mt-3">
            Diese Daten werden zur Vertragsabwicklung und zur Kommunikation zwischen Ihnen und dem Anbieter
            des Veranstaltungsortes verwendet.
          </p>
        </section>

        <!-- 5. Zahlungsdaten -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            5. Zahlungsdaten
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Wir bieten verschiedene Zahlungsmethoden an:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li><strong>Barzahlung vor Ort:</strong> Es werden keine Zahlungsdaten erfasst</li>
            <li><strong>Überweisung:</strong> Sie erhalten die Bankdaten des Anbieters zur Überweisung</li>
            <li><strong>PayPal / Wero:</strong> Die Zahlungsabwicklung erfolgt über externe Dienstleister</li>
          </ul>
          <p class="text-luxury-brown font-light leading-relaxed mt-3">
            Bei externen Zahlungsdienstleistern gelten deren Datenschutzbestimmungen.
          </p>
        </section>

        <!-- 6. Weitergabe von Daten -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            6. Weitergabe von Daten
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Eine Weitergabe Ihrer Daten erfolgt nur in folgenden Fällen:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>An den Anbieter des gebuchten Veranstaltungsortes zur Vertragsabwicklung</li>
            <li>An Zahlungsdienstleister zur Abwicklung der Zahlung</li>
            <li>Wenn Sie ausdrücklich eingewilligt haben</li>
            <li>Wenn eine gesetzliche Verpflichtung besteht</li>
          </ul>
        </section>

        <!-- 7. Ihre Rechte -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            7. Ihre Rechte
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
            <li><strong>Berichtigungsrecht:</strong> Sie können die Korrektur falscher Daten verlangen</li>
            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
            <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
            <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten Format erhalten</li>
            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen</li>
          </ul>
        </section>

        <!-- 8. Speicherdauer -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            8. Speicherdauer
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Wir speichern Ihre personenbezogenen Daten nur so lange, wie dies für die Erfüllung der Zwecke
            erforderlich ist, für die sie erhoben wurden, oder wie es gesetzliche Aufbewahrungsfristen vorschreiben.
            Nach Ablauf dieser Fristen werden Ihre Daten routinemäßig gelöscht.
          </p>
        </section>

        <!-- 9. Datensicherheit -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            9. Datensicherheit
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen
            zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter
            Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung
            fortlaufend verbessert.
          </p>
        </section>

        <!-- 10. Kontakt -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            10. Kontakt
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden.
            Die Kontaktdaten finden Sie im Impressum dieser Website.
          </p>
        </section>
      </div>

      <!-- Zurück Button -->
      <div class="mt-8 text-center">
        <button
          @click="$router.back()"
          class="btn-luxury-secondary px-8 py-3"
        >
          Zurück
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
section {
  scroll-margin-top: 100px;
}
</style>

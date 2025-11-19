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
          Allgemeine Geschäftsbedingungen
        </h1>

        <p class="mt-4 text-luxury-brown font-light">
          Stand: {{ currentDate }}
        </p>
      </div>

      <!-- AGB Content -->
      <div class="card-luxury p-8 space-y-8">
        <!-- § 1 Geltungsbereich -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 1 Geltungsbereich
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen BOOK A PLACE
            (nachfolgend "Anbieter" genannt) und den Nutzern der Plattform (nachfolgend "Nutzer" genannt)
            über die Vermittlung und Buchung von Veranstaltungsorten geschlossen werden.
          </p>
        </section>

        <!-- § 2 Vertragsgegenstand -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 2 Vertragsgegenstand
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            BOOK A PLACE betreibt eine Online-Plattform, auf der Veranstaltungsorte angeboten und gebucht
            werden können. Der Anbieter fungiert dabei als Vermittler zwischen den Anbietern von
            Veranstaltungsorten und den Nutzern, die diese buchen möchten.
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Vermittlung von Veranstaltungsorten</li>
            <li>Bereitstellung einer Buchungsplattform</li>
            <li>Verwaltung von Nutzerprofilen und Buchungen</li>
          </ul>
        </section>

        <!-- § 3 Registrierung und Nutzerkonto -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 3 Registrierung und Nutzerkonto
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Die Nutzung bestimmter Funktionen der Plattform erfordert eine Registrierung. Bei der
            Registrierung sind vollständige und wahrheitsgemäße Angaben zu machen.
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Der Nutzer ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln</li>
            <li>Jeder Nutzer darf nur ein Benutzerkonto erstellen</li>
            <li>Die Weitergabe des Nutzerkontos an Dritte ist untersagt</li>
            <li>Der Nutzer haftet für alle Aktivitäten, die unter seinem Konto durchgeführt werden</li>
          </ul>
        </section>

        <!-- § 4 Buchung und Zahlung -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 4 Buchung und Zahlung
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Die Buchung eines Veranstaltungsortes erfolgt über die Plattform. Mit der Buchungsbestätigung
            kommt ein verbindlicher Vertrag zwischen dem Nutzer und dem Anbieter des Veranstaltungsortes zustande.
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer</li>
            <li>Die Zahlung erfolgt über die von der Plattform bereitgestellten Zahlungsmethoden</li>
            <li>Der Anbieter behält sich das Recht vor, eine Buchung abzulehnen</li>
          </ul>
        </section>

        <!-- § 5 Stornierung und Rückerstattung -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 5 Stornierung und Rückerstattung
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Stornierungen müssen über die Plattform vorgenommen werden. Die Stornierungsbedingungen
            richten sich nach den vom jeweiligen Anbieter festgelegten Bedingungen.
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Kostenfreie Stornierung: bis zu 30 Tage vor der Veranstaltung</li>
            <li>50% Erstattung: bis zu 14 Tage vor der Veranstaltung</li>
            <li>Keine Erstattung: weniger als 14 Tage vor der Veranstaltung</li>
          </ul>
        </section>

        <!-- § 6 Pflichten der Nutzer -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 6 Pflichten der Nutzer
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Der Nutzer verpflichtet sich:
          </p>
          <ul class="list-disc list-inside text-luxury-brown font-light leading-relaxed space-y-2 ml-4">
            <li>Die Plattform nur für rechtmäßige Zwecke zu nutzen</li>
            <li>Keine falschen oder irreführenden Informationen bereitzustellen</li>
            <li>Die Rechte Dritter zu respektieren</li>
            <li>Keine schädliche Software oder Inhalte hochzuladen</li>
          </ul>
        </section>

        <!-- § 7 Haftung -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 7 Haftung
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Der Anbieter haftet nach den gesetzlichen Bestimmungen für Vorsatz und grobe Fahrlässigkeit.
            Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten
            sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
          </p>
        </section>

        <!-- § 8 Datenschutz -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 8 Datenschutz
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Der Anbieter verarbeitet personenbezogene Daten der Nutzer gemäß den geltenden
            Datenschutzbestimmungen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
          </p>
        </section>

        <!-- § 9 Änderungen der AGB -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 9 Änderungen der AGB
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed">
            Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern. Die Nutzer werden
            über Änderungen per E-Mail informiert. Widersprechen die Nutzer nicht innerhalb von
            vier Wochen nach Bekanntgabe, gelten die geänderten AGB als akzeptiert.
          </p>
        </section>

        <!-- § 10 Schlussbestimmungen -->
        <section>
          <h2 class="font-luxury text-2xl font-bold text-luxury-dark mb-4 tracking-luxury">
            § 10 Schlussbestimmungen
          </h2>
          <p class="text-luxury-brown font-light leading-relaxed mb-3">
            Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB
            unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
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

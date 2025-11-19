<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="min-h-screen bg-luxury-ivory flex flex-col">
    <NavigationBar />
    <!-- Padding-top um Platz für die fixierte Navigation zu schaffen -->
    <div class="pt-20 flex-grow">
      <RouterView />
    </div>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <div class="min-h-screen bg-luxury-ivory">
    <NavigationBar />
    <!-- Padding-top um Platz für die fixierte Navigation zu schaffen -->
    <div class="pt-20">
      <RouterView />
    </div>
  </div>
</template>

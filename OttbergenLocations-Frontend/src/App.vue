<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <div class="min-h-screen bg-booking-very-light">
    <NavigationBar />
    <RouterView />
  </div>
</template>

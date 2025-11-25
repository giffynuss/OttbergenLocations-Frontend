<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      statusColor
    ]"
  >
    {{ statusLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BookingStatusLabels, BookingStatusColors } from '@/types/place'

const props = defineProps<{
  status: string
}>()

const statusLabel = computed(() => BookingStatusLabels[props.status] || props.status)
const statusColor = computed(() => BookingStatusColors[props.status] || 'bg-gray-100 text-gray-800')
</script>

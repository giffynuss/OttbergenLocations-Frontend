import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import('../views/BookingsView.vue')
  },
  {
    path: '/booking/:id',
    name: 'booking-detail',
    component: () => import('../views/BookingDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

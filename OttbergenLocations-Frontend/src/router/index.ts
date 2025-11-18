import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'startseite',
    component: () => import('../views/StartseiteView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/manage-places',
    name: 'manage-places',
    component: () => import('../views/ManagePlacesView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/my-bookings',
    name: 'my-bookings',
    component: () => import('../views/MyBookingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard für geschützte Routen
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    // Weiterleitung zur Login-Seite wenn nicht authentifiziert
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'register') && userStore.isAuthenticated) {
    // Weiterleitung zur Home-Seite wenn bereits eingeloggt
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

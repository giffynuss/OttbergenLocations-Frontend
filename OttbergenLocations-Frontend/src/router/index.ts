import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
    path: '/location/:id',
    name: 'location-detail',
    component: () => import('../views/LocationDetailView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/manage-places',
    name: 'manage-places',
    component: () => import('../views/ManagePlacesView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/orte-einstellen',
    name: 'orte-einstellen',
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
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/agb',
    name: 'agb',
    component: () => import('../views/AgbView.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard für geschützte Routen
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Weiterleitung zur Login-Seite wenn nicht authentifiziert
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    // Weiterleitung zur Home-Seite wenn bereits eingeloggt
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VCalendar, { Calendar as VCalendarComponent, DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App)

app.use(router)

app.use(VCalendar, {})

app.component('VCalendar', VCalendarComponent)
app.component('VDatePicker', VDatePicker)

app.mount('#app')
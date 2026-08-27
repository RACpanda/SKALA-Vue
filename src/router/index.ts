import { createRouter, createWebHistory } from 'vue-router'

import WeatherHomeView from '../views/WeatherHomeView.vue'
import WeatherDetailView from '../views/WeatherDetailView.vue'
import WeatherAboutView from '../views/WeatherAboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'


const routes = [
  {path: '/',component: WeatherHomeView},
  {path: '/weather/:id',component: WeatherDetailView},
  {path: '/about',component: WeatherAboutView},
  {path: '/:pathMatch(.*)*',component: NotFoundView}
]

const router = createRouter({history:createWebHistory(),routes})

export default router

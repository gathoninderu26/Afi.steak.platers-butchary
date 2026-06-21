import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import ContactPage from './components/ContactPage.vue'
import UserDashboard from './components/UserDashboard.vue'
import CartPage from './components/CartPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/menu', component: MenuPage },
  { path: '/gallery', component: GalleryPage },
  { path: '/contact', component: ContactPage },
  { path: '/dashboard', component: UserDashboard },
  { path: '/cart', component: CartPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import ContactPage from './components/ContactPage.vue'
import UserDashboard from './components/UserDashboard.vue'
import CartPage from './components/CartPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: {
      title: 'AFI Steaks & Platters — Premium Kenyan Steakhouse | Kikuyu',
      description: 'Experience the finest Kenyan steakhouse at AFI Steaks & Platters. Sizzling steaks, premium platters, and an authentic culinary journey in Kikuyu, Kiambu County.'
    }
  },
  {
    path: '/menu',
    component: MenuPage,
    meta: {
      title: 'Our Menu — AFI Steaks & Platters | Signature Cuts & Platters',
      description: 'Explore the AFI menu — dry-aged tomahawks, Wagyu strips, savage platters, gourmet sides, and seasonal specials crafted in Kikuyu, Kenya.'
    }
  },
  {
    path: '/gallery',
    component: GalleryPage,
    meta: {
      title: 'Chronicle — AFI Steaks & Platters | Visual Odyssey',
      description: 'Explore the AFI visual chronicle — a gallery of sizzling steaks, fiery rituals, and the savage craftsmanship behind every cut.'
    }
  },
  {
    path: '/contact',
    component: ContactPage,
    meta: {
      title: 'Support & Reservations — AFI Steaks & Platters',
      description: 'Book a table, make a catering inquiry, or contact AFI Steaks & Platters. Located on the Southern Bypass Road, Kikuyu, Kiambu County, Kenya.'
    }
  },
  {
    path: '/dashboard',
    component: UserDashboard,
    meta: {
      title: 'Member Dashboard — AFI Steaks & Platters',
      description: 'Your personal AFI ritual hub — manage orders, track deliveries, and access exclusive member cuts and events.'
    }
  },
  {
    path: '/cart',
    component: CartPage,
    meta: {
      title: 'Your Ritual Cart — AFI Steaks & Platters',
      description: 'Review your selected AFI cuts and platters before checkout. Fast, city-wide delivery available across Nairobi and Kiambu County.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// ── Dynamic SEO head updates on route change ──────────────────────────────────
router.afterEach((to) => {
  const { title, description } = to.meta
  if (title) document.title = title
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc && description) metaDesc.setAttribute('content', description)
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle && title) ogTitle.setAttribute('content', title)
  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && description) ogDesc.setAttribute('content', description)
})

export default router

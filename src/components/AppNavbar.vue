<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { cart } from '../cartState'

const router = useRouter()
const isScrolled = ref(false)
const showLoginDialog = ref(false)
const mobileMenuOpen = ref(false)

const closeMobileMenu = () => { mobileMenuOpen.value = false }

const handleLogin = () => {
    showLoginDialog.value = false
    router.push('/dashboard')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    v-if="$route.path !== '/dashboard'"
    :class="[
      'fixed w-full z-[100] transition-all duration-300 border-b bg-black/90 backdrop-blur-md border-gray-800',
      isScrolled ? 'h-16 md:h-24 shadow-2xl shadow-black/50' : 'h-20 md:h-28'
    ]"
  >
    <div class="max-w-[2200px] mx-auto px-4 lg:px-12 h-full">
      <div class="flex justify-between items-center h-full">
        <!-- Logo -->
        <router-link to="/" class="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
          <div class="flex flex-col items-center justify-center">
            <div class="flex items-end leading-none">
              <span class="font-display font-bold text-2xl md:text-4xl tracking-tighter text-white group-hover:text-primary transition-colors">AF</span>
              <div class="relative">
                <span class="font-display font-bold text-2xl md:text-4xl tracking-tighter text-white group-hover:text-primary transition-colors">I</span>
                <span class="absolute -top-1 left-0 w-full h-2 md:h-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(217,4,4,0.8)]"></span>
              </div>
            </div>
            <span class="font-script text-sm md:text-lg -mt-1 text-gray-300 group-hover:text-white transition-colors">Steaks &amp; Platters</span>
          </div>
        </router-link>

        <!-- Navigation Links -->
        <div class="flex items-center lg:overflow-visible overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory flex-1 justify-end">
          <div class="flex items-center min-w-max lg:gap-8">
            <router-link 
              to="/" 
              class="nav-link snap-center hidden lg:block"
              exact-active-class="active-link"
            >Home</router-link>
            <router-link 
              to="/menu" 
              class="nav-link snap-center hidden lg:block"
              active-class="active-link"
            >Menu</router-link>

            <router-link 
              to="/gallery" 
              class="nav-link snap-center hidden lg:block"
              active-class="active-link"
            >Chronicle</router-link>

            <router-link 
              to="/contact" 
              class="nav-link snap-center hidden lg:block"
              active-class="active-link"
            >Support</router-link>

            <!-- CTA & Icons -->
            <div class="flex items-center gap-4 md:gap-6 pl-6 lg:pl-0">
              <button 
                @click="showLoginDialog = true"
                class="cta-button snap-center hidden lg:inline-flex"
              >
                Book a Table
              </button>

              <!-- Cart Icon -->
              <router-link to="/cart" class="relative group/nav-icon p-2" aria-label="View your cart">
                <span class="material-icons text-2xl md:text-3xl text-white group-hover/nav-icon:text-primary transition-colors" aria-hidden="true">shopping_bag</span>
                <span v-if="cart.length > 0" class="absolute top-0 right-0 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-[0_0_10px_rgba(217,4,4,0.5)]">
                  {{ cart.length }}
                </span>
              </router-link>

              <!-- Profile Icon -->
              <button @click="showLoginDialog = true" class="group/nav-icon p-2" aria-label="Sign in or manage account">
                <span class="material-icons text-2xl md:text-3xl text-white group-hover/nav-icon:text-primary transition-colors" aria-hidden="true">account_circle</span>
              </button>

              <!-- Hamburger (mobile only) -->
              <button
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="lg:hidden p-2 flex flex-col justify-center items-center gap-[5px] group/hb"
                :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
                aria-expanded="mobileMenuOpen"
              >
                <span
                  class="block w-6 h-[2px] bg-white transition-all duration-300"
                  :class="mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''"
                ></span>
                <span
                  class="block w-6 h-[2px] bg-white transition-all duration-300"
                  :class="mobileMenuOpen ? 'opacity-0 scale-x-0' : ''"
                ></span>
                <span
                  class="block w-6 h-[2px] bg-white transition-all duration-300"
                  :class="mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Ritual Dialog (Teleported for perfect centering) -->
    <Teleport to="body">
      <div v-if="showLoginDialog" class="fixed inset-0 z-[2000] flex items-center justify-center p-6 w-screen h-screen">
        <!-- Overlay (Increased visibility) -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-2xl animate-fade-in" @click="showLoginDialog = false"></div>
        
        <!-- Dialog Card (Glossy Obsidian Style) -->
        <div class="relative w-full max-w-lg bg-black/60 backdrop-blur-3xl border border-white/20 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-modal-pop text-center group/dialog overflow-hidden max-h-[90vh]">
          
          <!-- Glossy Sheen Effect -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
             <div class="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] animate-glossy"></div>
          </div>

          <!-- Close Button -->
          <button @click="showLoginDialog = false" class="absolute top-6 right-6 text-white/40 hover:text-primary transition-colors z-20" aria-label="Close dialog">
            <span class="material-icons text-2xl" aria-hidden="true">close</span>
          </button>

          <!-- Content (Lifted above sheen) -->
          <div class="relative z-10">
            <!-- Logo Symbol -->
            <div class="mb-10 flex flex-col items-center">
                <div class="flex items-end leading-none">
                  <span class="font-display font-bold text-6xl md:text-7xl tracking-tighter text-white">AF</span>
                  <div class="relative">
                    <span class="font-display font-bold text-6xl md:text-7xl tracking-tighter text-white">I</span>
                    <span class="absolute -top-1 left-0 w-full h-3 bg-primary rounded-sm shadow-[0_0_20px_rgba(217,4,4,0.8)]"></span>
                  </div>
                </div>
                <span class="font-script text-xl md:text-2xl mt-2 text-primary">Savage Membership</span>
            </div>

            <h3 class="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4 leading-none">Join the Ritual</h3>
            <p class="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10 max-w-sm mx-auto">
              Unlock exclusive cuts, member-only gatherings, and your personal <span class="text-primary italic font-bold">Vault of Savagery</span>.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-4 max-w-xs mx-auto">
              <button @click="handleLogin" class="flex items-center justify-center gap-4 w-full bg-white text-black py-4 font-display font-black uppercase tracking-[0.2em] text-xs hover:bg-primary hover:text-white transition-all duration-300 shadow-xl relative overflow-hidden group/btn">
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                <img src="https://www.google.com/favicon.ico" class="w-5 h-5 relative z-10" alt="Google">
                <span class="relative z-10">Sign in with Google</span>
              </button>
              <button @click="handleLogin" class="flex items-center justify-center gap-4 w-full bg-transparent border border-white/40 text-white py-4 font-display font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group/btn">
                <span class="material-icons text-xl relative z-10">apple</span>
                <span class="relative z-10">Sign in with Apple</span>
              </button>
            </div>

            <!-- Footer Notice -->
            <div class="mt-12 pt-8 border-t border-white/5 relative">
              <p class="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">By entering, you accept the Savage Terms of Honor</p>
              
              <!-- Subtle Bypass Links (Not very visible) -->
              <div class="absolute -bottom-6 left-0 flex justify-between w-full px-2 opacity-5 hover:opacity-40 transition-opacity duration-700">
                <router-link to="/dashboard" class="text-[7px] font-black uppercase tracking-tighter text-white cursor-help">UE_LOGIN_BYPASS</router-link>
                <router-link to="/admin" class="text-[7px] font-black uppercase tracking-tighter text-white cursor-help">ADMIN_CMD_BYPASS</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </nav>

  <!-- Mobile Menu Drawer (lg and above: hidden) -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 z-[90] flex"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-md"
          @click="closeMobileMenu"
        ></div>

        <!-- Drawer panel -->
        <div class="relative ml-auto w-[80vw] max-w-sm h-full bg-black border-l border-white/10 flex flex-col shadow-[0_0_80px_rgba(217,4,4,0.2)] overflow-y-auto">

          <!-- Drawer header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div class="flex items-end leading-none">
              <span class="font-display font-bold text-2xl tracking-tighter text-white">AF</span>
              <div class="relative">
                <span class="font-display font-bold text-2xl tracking-tighter text-white">I</span>
                <span class="absolute -top-1 left-0 w-full h-2 bg-primary rounded-sm shadow-[0_0_8px_rgba(217,4,4,0.9)]"></span>
              </div>
            </div>
            <button
              @click="closeMobileMenu"
              class="text-white/50 hover:text-primary transition-colors p-1"
              aria-label="Close navigation menu"
            >
              <span class="material-icons text-2xl" aria-hidden="true">close</span>
            </button>
          </div>

          <!-- Decorative red accent bar -->
          <div class="h-[2px] w-full bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>

          <!-- Nav links -->
          <nav class="flex flex-col gap-1 px-4 py-8">
            <router-link
              to="/"
              exact-active-class="mobile-active-link"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <span class="material-icons text-primary text-xl" aria-hidden="true">home</span>
              <span>Home</span>
            </router-link>

            <router-link
              to="/menu"
              active-class="mobile-active-link"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <span class="material-icons text-primary text-xl" aria-hidden="true">menu_book</span>
              <span>The Menu</span>
            </router-link>

            <router-link
              to="/gallery"
              active-class="mobile-active-link"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <span class="material-icons text-primary text-xl" aria-hidden="true">photo_library</span>
              <span>Chronicle</span>
            </router-link>

            <router-link
              to="/contact"
              active-class="mobile-active-link"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <span class="material-icons text-primary text-xl" aria-hidden="true">support_agent</span>
              <span>Support</span>
            </router-link>

            <router-link
              to="/cart"
              active-class="mobile-active-link"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <span class="material-icons text-primary text-xl" aria-hidden="true">shopping_bag</span>
              <span>Your Order</span>
              <span v-if="cart.length > 0" class="ml-auto bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {{ cart.length }}
              </span>
            </router-link>
          </nav>

          <!-- Divider -->
          <div class="mx-6 h-[1px] bg-white/5"></div>

          <!-- CTA block -->
          <div class="px-6 py-8 flex flex-col gap-4">
            <button
              @click="showLoginDialog = true; closeMobileMenu()"
              class="w-full bg-primary text-white py-2.5 font-display font-black uppercase tracking-[0.15em] text-xs hover:bg-red-700 transition-all shadow-[0_8px_20px_rgba(217,4,4,0.25)] active:scale-95"
            >
              Book a Table
            </button>
            <button
              @click="showLoginDialog = true; closeMobileMenu()"
              class="w-full border border-white/20 text-white py-4 font-display font-black uppercase tracking-[0.2em] text-sm hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              Member Login
            </button>
          </div>

          <!-- Footer info -->
          <div class="mt-auto px-6 pb-8">
            <div class="h-[1px] bg-white/5 mb-6"></div>
            <p class="text-[10px] text-gray-600 font-display uppercase tracking-[0.3em] mb-1">Location</p>
            <p class="text-xs text-gray-400 font-light">Southern Bypass Road, Kikuyu</p>
            <p class="text-[10px] text-gray-600 font-display uppercase tracking-[0.3em] mt-3 mb-1">Hours</p>
            <p class="text-xs text-gray-400 font-light">Mon–Thu 5–10 PM &nbsp;·&nbsp; Fri–Sat 5–11 PM</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.nav-link {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  transition: all 0.3s ease;
  padding: 0 1.25rem;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  font-size: 1.5rem; /* mobile tactical presence */
}

@media (min-width: 1024px) {
  .nav-link {
    font-size: 1.25rem; /* text-xl presence */
    padding: 0;
  }
}

.nav-link:hover {
  color: #D90404;
}

.active-link {
  color: #ffffff !important;
  border-bottom: 2px solid #D90404;
}

@media (min-width: 1024px) {
  .active-link {
    color: #D90404 !important;
    border-bottom: none;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background-color: #D90404;
  color: #ffffff;
  padding: 1rem 2rem;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  transition: all 0.3s transform;
  box-shadow: 0 10px 15px -3px rgba(217, 4, 4, 0.2);
  font-size: 0.875rem; /* text-sm */
}

@media (min-width: 1024px) {
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem; /* text-base */
  }
}

.cta-button:hover {
  background-color: #b90404;
  transform: scale(1.05);
}

/* Modal Animations */
@keyframes modalPop {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes glossy {
  0% { left: -100%; }
  100% { left: 100%; }
}

.animate-modal-pop {
  animation: modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-glossy {
  animation: glossy 6s linear infinite;
}

/* ── Mobile drawer nav links ─────────────────────────────────────────────── */
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  border-radius: 2px;
}

.mobile-nav-link:hover {
  color: #ffffff;
  background: rgba(217, 4, 4, 0.06);
  border-bottom-color: rgba(217, 4, 4, 0.2);
}

.mobile-active-link {
  color: #D90404 !important;
  background: rgba(217, 4, 4, 0.08) !important;
  border-bottom-color: rgba(217, 4, 4, 0.3) !important;
}

/* ── Mobile drawer slide-in transition ───────────────────────────────────── */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-active .relative.ml-auto,
.mobile-menu-leave-active .relative.ml-auto {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
.mobile-menu-enter-from .relative.ml-auto {
  transform: translateX(100%);
}
.mobile-menu-leave-to .relative.ml-auto {
  transform: translateX(100%);
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppNavbar from './components/AppNavbar.vue'

const showScrollTop = ref(false)
const showWhatsAppBubble = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleWhatsApp = (e) => {
  e.stopPropagation()
  showWhatsAppBubble.value = !showWhatsAppBubble.value
}

const closeWhatsAppOnOutside = (e) => {
  const bubble = document.getElementById('whatsapp-cleaver-bubble')
  const toggle = document.getElementById('whatsapp-toggle')
  if (bubble && toggle && !bubble.contains(e.target) && !toggle.contains(e.target)) {
    showWhatsAppBubble.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeWhatsAppOnOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeWhatsAppOnOutside)
})
</script>

<template>
  <div class="relative bg-black min-h-screen">
    <AppNavbar />
    
    <!-- Cinematic Page Transitions -->
    <router-view v-slot="{ Component }">
      <transition name="savage-page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- WhatsApp Themed Bubble -->
    <div
      v-if="showWhatsAppBubble"
      id="whatsapp-cleaver-bubble"
      :class="[
        'fixed right-8 z-[1000] w-96 max-w-[calc(100vw-32px)] bg-black/95 border border-primary/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(217,4,4,0.35)] animate-bubble-pop transition-all duration-300',
        showScrollTop ? 'bottom-40' : 'bottom-24'
      ]"
    >
      <!-- Bubble Pointer -->
      <div class="absolute -bottom-2 right-5 w-4 h-4 bg-black border-r border-b border-primary/40 rotate-45"></div>

      <!-- Bubble Content -->
      <div class="relative z-10 space-y-5">
        <!-- Header -->
        <div class="flex items-center gap-4 pb-4 border-b border-white/10">
          <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
            <span class="material-icons text-primary text-2xl">local_fire_department</span>
          </div>
          <div>
            <h4 class="font-display font-bold text-lg uppercase tracking-wider text-white">Pitmaster Link</h4>
            <p class="text-[9px] text-primary font-black uppercase tracking-widest mt-0.5">Live Support & orders</p>
          </div>
        </div>

        <!-- Info Description -->
        <p class="text-xs text-gray-400 leading-relaxed font-light">
          Get in touch directly with our Kikuyu pitmasters for live orders, catering reservations, or custom meat cuts. We response within fragments.
        </p>

        <!-- Dynamic Branch Status indicator -->
        <div class="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between text-xs">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            <span class="text-gray-300 font-bold uppercase tracking-wider text-[10px]">Butchery Deck Status:</span>
          </div>
          <span class="text-green-400 font-black uppercase tracking-wider text-[10px]">Active & Smoking</span>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-4 pt-2">
          <a
            href="https://wa.me/254700000000?text=Hello%20AFI%20Steaks%20%26%20Platters%2C%20I%20would%20like%20to%20initiate%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-2xl font-display font-black uppercase tracking-wider text-xs transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#25d366]/20"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.005 5.291 5.298.002 11.785.002c3.145.001 6.102 1.228 8.327 3.454a11.706 11.706 0 0 1 3.453 8.331c-.005 6.495-5.299 11.784-11.785 11.784-1.999-.001-3.963-.513-5.696-1.488L0 24zm6.59-4.859c1.62.962 3.208 1.47 4.883 1.47 5.394 0 9.785-4.391 9.789-9.786.002-2.612-1.012-5.069-2.858-6.915-1.847-1.846-4.303-2.858-6.92-2.858-5.394 0-9.785 4.392-9.789 9.787-.001 1.761.464 3.324 1.348 4.797l-.98 3.578 3.677-.965zm12.39-4.474c-.266-.134-1.58-.779-1.824-.868-.245-.089-.422-.134-.599.134-.177.266-.688.868-.843 1.046-.155.177-.311.201-.577.067-.266-.134-1.125-.415-2.143-1.324-.792-.707-1.328-1.58-1.484-1.847-.156-.266-.017-.411.116-.544.12-.12.266-.311.399-.467.133-.156.177-.267.266-.445.089-.178.045-.334-.022-.467-.067-.134-.599-1.446-.821-1.98-.217-.52-.439-.45-.599-.458-.156-.008-.334-.01-.51-.01s-.463.067-.707.334c-.244.266-.932.912-.932 2.227 0 1.315.956 2.58 1.089 2.758.133.178 1.881 2.872 4.557 4.03.637.276 1.134.44 1.522.563.64.203 1.222.174 1.682.105.513-.077 1.58-.646 1.802-1.27.222-.624.222-1.157.156-1.27-.067-.111-.244-.2-.511-.334z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
          
          <a
            href="tel:+254700000000"
            class="flex items-center justify-center gap-2 w-full bg-transparent border border-white/10 hover:border-primary hover:bg-primary/10 text-white py-3.5 rounded-2xl font-display font-black uppercase tracking-wider text-xs transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <span class="material-icons text-sm">phone</span>
            <span>Call Dial</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Floating Actions Container -->
    <!-- WhatsApp is fixed at bottom-8 (brand-themed red), Scroll-top transitions above it at bottom-24 -->
    <button
      id="whatsapp-toggle"
      @click="toggleWhatsApp"
      class="fixed bottom-8 right-8 z-[999] w-14 h-14 bg-primary hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(217,4,4,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Toggle WhatsApp Contact Info"
    >
      <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.005 5.291 5.298.002 11.785.002c3.145.001 6.102 1.228 8.327 3.454a11.706 11.706 0 0 1 3.453 8.331c-.005 6.495-5.299 11.784-11.785 11.784-1.999-.001-3.963-.513-5.696-1.488L0 24zm6.59-4.859c1.62.962 3.208 1.47 4.883 1.47 5.394 0 9.785-4.391 9.789-9.786.002-2.612-1.012-5.069-2.858-6.915-1.847-1.846-4.303-2.858-6.92-2.858-5.394 0-9.785 4.392-9.789 9.787-.001 1.761.464 3.324 1.348 4.797l-.98 3.578 3.677-.965zm12.39-4.474c-.266-.134-1.58-.779-1.824-.868-.245-.089-.422-.134-.599.134-.177.266-.688.868-.843 1.046-.155.177-.311.201-.577.067-.266-.134-1.125-.415-2.143-1.324-.792-.707-1.328-1.58-1.484-1.847-.156-.266-.017-.411.116-.544.12-.12.266-.311.399-.467.133-.156.177-.267.266-.445.089-.178.045-.334-.022-.467-.067-.134-.599-1.446-.821-1.98-.217-.52-.439-.45-.599-.458-.156-.008-.334-.01-.51-.01s-.463.067-.707.334c-.244.266-.932.912-.932 2.227 0 1.315.956 2.58 1.089 2.758.133.178 1.881 2.872 4.557 4.03.637.276 1.134.44 1.522.563.64.203 1.222.174 1.682.105.513-.077 1.58-.646 1.802-1.27.222-.624.222-1.157.156-1.27-.067-.111-.244-.2-.511-.334z"/>
      </svg>
    </button>

    <button
      @click="scrollToTop"
      :class="[
        'fixed right-8 z-[999] bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(217,4,4,0.4)] transition-all duration-500 hover:scale-110 active:scale-95 group cursor-pointer',
        showScrollTop ? 'bottom-24 opacity-100 scale-100' : 'bottom-24 opacity-0 scale-75 pointer-events-none translate-y-10'
      ]"
      aria-label="Scroll to top"
    >
      <span class="material-icons group-hover:-translate-y-1 transition-transform">north</span>
    </button>
  </div>
</template>

<style>
/* Global resets */
body {
  margin: 0;
  padding: 0;
  background-color: black;
  overflow-x: hidden;
}

/* Savage Page Transitions (Cinematic Deep Fade) */
.savage-page-enter-active,
.savage-page-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.savage-page-enter-from {
  opacity: 0;
  transform: scale(1.02);
  filter: blur(4px);
}

.savage-page-leave-to {
  opacity: 0;
  transform: scale(0.98);
  filter: blur(4px);
}

/* ── Themed Bubble Pop Animation ──────────────────────────────────────────── */
@keyframes bubblePop {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(15px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-bubble-pop {
  animation: bubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>

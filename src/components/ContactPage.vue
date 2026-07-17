<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppFooter from './AppFooter.vue'

// ─── State & Logic ───────────────────────────────────────────────────────────
const scrollProgress = ref(0)
const showScrollTop = ref(false)

const handleScroll = () => {
  const winScroll = window.pageYOffset || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
  showScrollTop.value = winScroll > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'Do you have vegan options?',
    answer: "Yes! While we pride ourselves on our steaks, we offer a curated selection of grilled vegetable platters, mushroom steaks, and gourmet salads designed to satisfy our vegan guests. Please ask your server for the dedicated plant-based menu."
  },
  {
    question: 'How do I book a private event?',
    answer: "For parties larger than 12, or to reserve our exclusive 'Ember Room', please use the contact form on this page and select \"Private Event Booking\" or call our events manager directly at +254 700 000 999."
  },
  {
    question: 'Is there a dress code?',
    answer: "We recommend \"Smart Casual\" or \"Business Casual\". We want you to feel comfortable but sophisticated. Please avoid athletic wear, flip-flops, and baseball caps in the main dining room."
  },
  {
    question: 'Do you accept walk-ins?',
    answer: "We do accept walk-ins for our bar seating and patio (weather permitting). However, reservations are highly recommended for the main dining room, especially on weekends."
  }
]
</script>

<template>
  <div class="bg-black text-gray-100 font-body min-h-screen flex flex-col pt-24 lg:pt-32">
    <!-- Scroll Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-[#ff4d4d] z-[2000] shadow-[0_0_15px_rgba(217,4,4,0.8)] transition-all duration-100"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <!-- Scroll Up Button -->
    <button 
      @click="scrollToTop"
      :class="[
        'fixed bottom-8 right-8 z-[100] bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-110 hover:bg-red-700 group',
        showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'
      ]"
    >
      <span class="material-icons group-hover:-translate-y-1 transition-transform font-bold">north</span>
    </button>


    <!-- Main Content -->
    <main class="flex-grow relative">
      <!-- Atmospheric Top Background -->
      <div class="absolute top-0 left-0 w-full h-[40vh] z-0 overflow-hidden pointer-events-none">
        <img src="https://images.unsplash.com/photo-1526367764999-5f507ba73252?auto=format&fit=crop&w=1920&q=80" 
             class="w-full h-full object-cover grayscale opacity-30 brightness-50">
        <!-- Deep tactical blend gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
      </div>

      <div class="relative py-12 z-10">
        <div class="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Minimal Typographic Header -->
          <div class="mb-20 pt-8 lg:pt-16">
            <h1 class="text-6xl md:text-8xl font-display font-black text-white tracking-tighter uppercase mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <span class="text-primary italic">Contact</span> HQ
            </h1>
            <p class="text-xl md:text-2xl text-gray-500 font-light italic max-w-2xl drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
              Forge a connection. Tactical support and private protocols standing by.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <!-- Left Side: Intelligence (FAQ - Accordion) -->
            <div class="lg:col-span-12 xl:col-span-4 space-y-12">
              <div class="flex items-center space-x-4 mb-10">
                <span class="material-icons text-primary text-4xl">fingerprint</span>
                <h2 class="text-3xl font-display font-bold text-white uppercase tracking-tight">Intelligence Brief</h2>
              </div>
              
              <div class="space-y-4">
                <!-- Redesigned FAQ as a High-Fidelity Accordion -->
                <div 
                  v-for="(faq, idx) in faqs" :key="idx"
                  class="bg-[#050505] border border-white/5 border-l-4 border-l-transparent hover:border-l-primary transition-all group overflow-hidden"
                >
                  <details class="group/details">
                    <summary class="flex justify-between items-center p-8 cursor-pointer list-none">
                      <span class="font-display font-bold text-white uppercase tracking-widest text-lg">{{ faq.question }}</span>
                      <span class="material-icons text-primary transition-transform duration-300 group-open/details:rotate-180">expand_more</span>
                    </summary>
                    <div class="px-8 pb-8 text-gray-400 text-sm leading-relaxed font-light border-t border-white/5 pt-6">
                      {{ faq.answer }}
                    </div>
                  </details>
                </div>
              </div>

              <!-- Emergency Uplink CTA (Refined) -->
              <div class="bg-gradient-to-br from-primary/30 to-transparent p-12 border border-primary/40 relative overflow-hidden group/cta mt-12 bg-[#080808]">
                <div class="relative z-10">
                  <h3 class="text-3xl font-display font-black text-white uppercase mb-4 leading-none">Emergency<br/>Uplink</h3>
                  <p class="text-gray-400 text-xs mb-10 font-light italic opacity-80 group-hover/cta:opacity-100 transition-opacity">Tactical support stands by Mon-Sun, 10am - 10pm EAT.</p>
                  <a href="tel:+254700000000" class="flex items-center justify-between w-full bg-white text-black py-4 px-6 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">
                    <span>Call Command HQ</span>
                    <span class="material-icons text-lg">phone_in_talk</span>
                  </a>
                </div>
                <div class="absolute -right-12 -bottom-12 text-[220px] font-black text-primary/5 pointer-events-none group-hover/cta:text-primary/10 transition-all duration-1500 rotate-6">AF</div>
              </div>
            </div>

            <!-- Right Side: Transmission Portal -->
            <div class="lg:col-span-12 xl:col-span-8">
              <div class="bg-[#050505] p-10 md:p-16 border border-white/5 border-t-8 border-t-primary shadow-2xl relative overflow-hidden">
                <!-- Decorative BG Gradient -->
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div class="flex items-center mb-12 space-x-6">
                  <span class="material-icons text-primary text-5xl">emergency_share</span>
                  <h2 class="text-5xl font-display font-black text-white uppercase tracking-tighter">Transmission Portal</h2>
                </div>
                
                <form @submit.prevent class="space-y-10" novalidate>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-3">
                      <label for="contact-first-name" class="block text-xs font-black uppercase tracking-[0.3em] text-gray-400">First Name Protocol</label>
                      <input
                        id="contact-first-name"
                        type="text"
                        placeholder="First Name"
                        autocomplete="given-name"
                        class="block w-full bg-black border border-white/10 p-6 text-white placeholder:text-gray-600 focus:border-primary transition-all outline-none font-black tracking-widest uppercase"
                      >
                    </div>
                    <div class="space-y-3">
                      <label for="contact-last-name" class="block text-xs font-black uppercase tracking-[0.3em] text-gray-400">Last Name Protocol</label>
                      <input
                        id="contact-last-name"
                        type="text"
                        placeholder="Last Name"
                        autocomplete="family-name"
                        class="block w-full bg-black border border-white/10 p-6 text-white placeholder:text-gray-600 focus:border-primary transition-all outline-none font-black tracking-widest uppercase"
                      >
                    </div>
                  </div>

                  <div class="space-y-3">
                    <label for="contact-email" class="block text-xs font-black uppercase tracking-[0.3em] text-gray-400">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      autocomplete="email"
                      class="block w-full bg-black border border-white/10 p-6 text-white placeholder:text-gray-600 focus:border-primary transition-all outline-none font-black tracking-widest uppercase"
                    >
                  </div>

                  <div class="space-y-3">
                    <label for="contact-message" class="block text-xs font-black uppercase tracking-[0.3em] text-gray-400">Your Message</label>
                    <textarea
                      id="contact-message"
                      rows="8"
                      placeholder="Tell us about your reservation, order, or inquiry..."
                      class="block w-full bg-black border border-white/10 p-6 text-white placeholder:text-gray-600 focus:border-primary transition-all outline-none resize-none font-medium text-lg italic"
                    ></textarea>
                  </div>

                  <div class="pt-6 relative">
                    <button type="submit" class="w-full bg-primary hover:bg-white text-white hover:text-black py-7 font-display font-black text-lg uppercase tracking-[0.6em] transition-all transform active:scale-95 shadow-[0_20px_60px_rgba(217,4,4,0.4)]">
                      Engage Uplink
                    </button>
                    <div class="absolute -bottom-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  </div>
                </form>


                <!-- Social Engagement Bar -->
                <div class="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
                  <div class="flex items-center gap-10">
                    <a href="#" class="group relative p-4 bg-white/5 rounded-full hover:bg-primary transition-all duration-500 overflow-hidden">
                      <span class="material-icons text-white group-hover:scale-110 transition-transform relative z-10">facebook</span>
                      <div class="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                    </a>
                    <a href="#" class="group relative p-4 bg-white/5 rounded-full hover:bg-primary transition-all duration-500 overflow-hidden">
                      <span class="material-icons text-white group-hover:scale-110 transition-transform relative z-10">camera_alt</span>
                      <div class="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                    </a>
                  </div>
                  <div class="text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 flex items-center gap-4">
                    <span class="h-[1px] w-12 bg-white/10"></span>
                    STAY IN THE CIRCLE
                    <span class="h-[1px] w-12 bg-white/10"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.font-display { font-family: 'Oswald', sans-serif; }
.font-body { font-family: 'Lato', sans-serif; }

.bubble-enter-active, .bubble-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.bubble-enter-from, .bubble-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

details > summary::-webkit-details-marker {
  display: none;
}
</style>

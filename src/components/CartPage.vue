<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { cart, cartTotal, removeFromCart, addToCart, formatPrice } from '../cartState'
import AppFooter from './AppFooter.vue'

const router = useRouter()

const backToMenu = () => {
  router.push('/menu')
}

const updateQuantity = (item, delta) => {
  if (delta > 0) {
    item.quantity++
  } else if (item.quantity > 1) {
    item.quantity--
  } else {
    const index = cart.value.findIndex(i => i.name === item.name)
    if (index !== -1) removeFromCart(index)
  }
}

const removeItem = (item) => {
  const index = cart.value.findIndex(i => i.name === item.name)
  if (index !== -1) removeFromCart(index)
}
</script>

<template>
  <div class="bg-[#020202] text-white font-body min-h-screen flex flex-col pt-[80px] md:pt-[112px]">
    
    <!-- Cinematic Header -->
    <section class="relative h-[300px] flex items-center justify-center overflow-hidden border-b border-white/10 shrink-0">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" 
                 class="w-full h-full object-cover grayscale opacity-40 brightness-50">
            <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>
        
        <div class="relative z-10 text-center">
            <h1 class="font-display text-6xl md:text-[100px] font-black uppercase tracking-tighter text-white animate-slide-up leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                Payload <span class="text-primary italic">Manifest</span>
            </h1>
        </div>
    </section>

    <!-- Main Content -->
    <main class="flex-1 max-w-[1600px] mx-auto w-full px-6 lg:px-12 py-16">
        
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center py-40 text-center animate-fade-in">
            <span class="material-icons text-8xl text-gray-800 mb-8 animate-pulse">shopping_basket</span>
            <h2 class="font-display text-4xl uppercase text-white mb-4">Payload Empty</h2>
            <p class="text-gray-500 font-light max-w-sm mx-auto mb-10 leading-relaxed uppercase tracking-widest text-xs">No tactical yields detected in your current session. Return to operations to add fragments.</p>
            <button @click="backToMenu" class="px-10 py-4 bg-primary text-white font-display font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(217,4,4,0.3)]">
                Open Menu Operations
            </button>
        </div>

        <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-16 animate-fade-in">
            <!-- Left: Item List -->
            <div class="xl:col-span-2 space-y-10">
                <div class="flex items-center justify-between border-b border-white/10 pb-8">
                    <h3 class="font-display text-4xl font-black text-white uppercase italic">Active <span class="text-primary">Payload</span></h3>
                    <span class="text-[12px] font-black text-gray-500 uppercase tracking-widest">{{ cart.length }} Fragments Identified</span>
                </div>

                <div class="space-y-6">
                    <div v-for="item in cart" :key="item.name" 
                         class="group relative bg-black/40 border border-white/10 p-8 flex flex-col md:flex-row gap-10 hover:border-primary/40 transition-all duration-500 shadow-2xl">
                        
                        <!-- Item Image -->
                        <div class="w-full md:w-40 h-40 overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform">
                        </div>

                        <!-- Item Content -->
                        <div class="flex-1 flex flex-col justify-center text-left">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <span class="text-primary font-display font-black text-[9px] uppercase tracking-[0.3em] mb-1 block">{{ item.category || 'Mission Essential' }}</span>
                                    <h4 class="font-display text-3xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{{ item.name }}</h4>
                                </div>
                                <button @click="removeItem(item)" class="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors hover:bg-white/5 border border-transparent hover:border-white/10">
                                    <span class="material-icons text-xl">close</span>
                                </button>
                            </div>

                            <div class="flex flex-wrap items-center gap-10 mt-2">
                                <!-- Quantity Controller -->
                                <div class="flex items-center bg-white/5 border border-white/10 p-1 h-12">
                                    <button @click="updateQuantity(item, -1)" class="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xl">-</button>
                                    <span class="w-12 text-center font-display font-black text-lg">{{ item.quantity }}</span>
                                    <button @click="updateQuantity(item, 1)" class="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xl">+</button>
                                </div>
                                
                                <!-- Pricing -->
                                <div class="flex flex-col">
                                    <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Unit Fragment Cost</span>
                                    <span class="text-primary font-display font-bold text-2xl">{{ formatPrice(item.price * item.quantity) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Scanner Detail Effect -->
                        <div class="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/5 group-hover:border-primary/20 transition-colors"></div>
                    </div>
                </div>

                <!-- Strategic Recommendations -->
                <div class="p-10 bg-primary/5 border border-primary/20 mt-16 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-5 mb-10">
                            <span class="material-icons text-primary animate-pulse text-3xl">auto_awesome</span>
                            <h4 class="font-display text-2xl font-black text-white uppercase tracking-widest">Augmented Rituals</h4>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="flex items-center gap-6 p-6 border border-white/10 hover:border-primary/40 transition-all cursor-pointer bg-black/60 group/rec shadow-xl">
                                <div class="w-20 h-20 bg-white/5 flex items-center justify-center group-hover/rec:bg-primary/20 transition-colors">
                                    <span class="material-icons text-primary/40 text-4xl group-hover/rec:text-primary transition-colors">local_fire_department</span>
                                </div>
                                <div class="text-left">
                                    <p class="text-[11px] font-black text-white uppercase mb-1 tracking-widest">Volcanic Salts</p>
                                    <p class="text-gray-500 text-[9px] uppercase font-bold mb-2">Enhance sear depth</p>
                                    <p class="text-primary font-display font-bold text-lg leading-none">+ {{ formatPrice(350) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-6 p-6 border border-white/10 hover:border-primary/40 transition-all cursor-pointer bg-black/60 group/rec shadow-xl">
                                <div class="w-20 h-20 bg-white/5 flex items-center justify-center group-hover/rec:bg-primary/20 transition-colors">
                                    <span class="material-icons text-primary/40 text-4xl group-hover/rec:text-primary transition-colors">opacity</span>
                                </div>
                                <div class="text-left">
                                    <p class="text-[11px] font-black text-white uppercase mb-1 tracking-widest">AFI Resin Glaze</p>
                                    <p class="text-gray-500 text-[9px] uppercase font-bold mb-2">Maximum gloss yields</p>
                                    <p class="text-primary font-display font-bold text-lg leading-none">+ {{ formatPrice(500) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Order Summary -->
            <div class="space-y-10">
                <div class="bg-black border border-white/10 p-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col text-left sticky top-[150px]">
                    <div class="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                        <span class="material-icons text-primary">analytics</span>
                        <h4 class="font-display text-2xl font-black text-white uppercase">Intelligence Summary</h4>
                    </div>
                    
                    <div class="space-y-6 mb-12">
                        <div class="flex justify-between items-center text-[11px] font-black uppercase text-gray-500 tracking-[0.2em]">
                            <span>Subtotal</span>
                            <span class="text-white">{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <div class="flex justify-between items-center text-[11px] font-black uppercase text-gray-500 tracking-[0.2em]">
                            <span>Tactical Tax (16%)</span>
                            <span class="text-white">{{ formatPrice(cartTotal * 0.16) }}</span>
                        </div>
                        <div class="flex justify-between items-center text-[11px] font-black uppercase text-gray-500 tracking-[0.2em]">
                            <span>Extraction Service</span>
                            <span class="text-white">{{ formatPrice(450) }}</span>
                        </div>
                        <div class="pt-8 mt-4 border-t border-white/10 flex justify-between items-end">
                            <span class="font-display font-black text-white uppercase tracking-widest text-lg">Total Payload</span>
                            <div class="text-right">
                                <span class="text-primary font-display font-black text-5xl italic drop-shadow-[0_0_15px_rgba(217,4,4,0.4)] block">{{ formatPrice(cartTotal * 1.16 + 450) }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-5">
                        <button class="w-full bg-primary text-white py-8 font-display font-black uppercase text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_30px_60px_rgba(217,4,4,0.3)] relative overflow-hidden group/btn">
                            <span class="relative z-10 flex items-center justify-center gap-4">
                                Execute Order Ritual <span class="material-icons">send</span>
                            </span>
                            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                        </button>
                        <button class="w-full border border-white/20 text-white/40 py-5 font-display font-black uppercase text-[10px] tracking-widest hover:border-white/60 hover:text-white transition-all bg-white/[0.02]">
                            Schedule Dynamic Drop-Off
                        </button>
                    </div>

                    <div class="mt-12 flex items-center gap-4 p-4 bg-white/5 border border-white/5">
                        <span class="material-icons text-primary/40 text-sm">security</span>
                        <p class="text-[9px] font-black text-gray-600 uppercase tracking-tighter leading-relaxed">
                            Secured via Savage Encrypted Relay. Your extraction target remains anonymous.
                        </p>
                    </div>
                    
                    <!-- Coupon Protocol -->
                    <div class="mt-10 pt-10 border-t border-white/10">
                        <h5 class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Validate Ritual Code</h5>
                        <div class="flex gap-4">
                            <input type="text" placeholder="CODE_FRAGMENT" class="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-[11px] font-black text-white focus:outline-none focus:border-primary/50 uppercase tracking-widest shadow-inner">
                            <button class="bg-white text-black px-8 text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Apply</button>
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
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

/* Hide Scrollbar */
::-webkit-scrollbar { display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; }
</style>

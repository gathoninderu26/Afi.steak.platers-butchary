<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import AppFooter from './AppFooter.vue'

// ─── Local Chronicle Assets ─────────────────────────────────────────────────
import img45DaySecret from '../assets/chronicles/images (5).jpg'
import imgNderuProfile from '../assets/nderu-profile.jpg'

// ─── Gallery Data ───────────────────────────────────────────────────────────
const galleryItems = ref([
  {
    id: 1,
    category: 'guest moments',
    type: 'photo',
    title: 'Cheers to the Heat',
    description: "Celebrating life's milestones with our signature Tomahawk.",
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    displace: 'displace-up',
    spanX: 7,
    spanY: 2,
    parallaxSpeed: 0.05
  },
  {
    id: 2,
    category: 'inside the heat',
    type: 'video',
    title: 'Tableside Inferno',
    description: 'The art of the perfect sear, delivered live.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    displace: 'displace-down',
    spanX: 5,
    spanY: 2,
    parallaxSpeed: -0.05
  },
  {
    id: 3,
    category: 'guest moments',
    type: 'photo',
    title: 'Date Night Perfection',
    description: 'Where romance meets the savage crave.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    displace: 'displace-left',
    spanX: 4,
    spanY: 1,
    parallaxSpeed: 0.08
  },
  {
    id: 4,
    category: 'inside the heat',
    type: 'photo',
    title: 'Mastering the Flame',
    description: 'Our artisans working the grill at 800°F.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    displace: 'displace-up',
    spanX: 4,
    spanY: 2,
    parallaxSpeed: -0.03
  },
  {
    id: 5,
    category: 'guest moments',
    type: 'photo',
    title: 'The Ritual of Meat',
    description: 'A deep dive into the raw elegance of our cuts.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
    displace: 'displace-down',
    spanX: 4,
    spanY: 2,
    parallaxSpeed: 0.1
  },
  {
    id: 6,
    category: 'inside the heat',
    type: 'photo',
    title: 'Liquid Fire',
    description: 'Mixology that mirrors the heat of the grill.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    displace: 'displace-left',
    spanX: 12,
    spanY: 2,
    parallaxSpeed: -0.02
  },
  {
    id: 7,
    category: 'guest moments',
    type: 'photo',
    title: 'Family Feast',
    description: 'Generations gathered around the eternal flame.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    displace: 'displace-up',
    spanX: 6,
    spanY: 1,
    parallaxSpeed: 0.04
  },
  {
    id: 8,
    category: 'inside the heat',
    type: 'photo',
    title: 'Shadow & Smoke',
    description: 'The mysterious side of the dry-age vault.',
    image: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&w=1200&q=80',
    displace: 'displace-right',
    spanX: 6,
    spanY: 1,
    parallaxSpeed: -0.06
  }
])

// ─── Blog Data ──────────────────────────────────────────────────────────────
const blogPosts = ref([
  {
    id: 1,
    title: "The 45-Day Secret: Why Dry Aging Matters",
    excerpt: "Go behind the steel doors of our custom salt-brick vault to learn why time is our most ingredient.",
    content: "At AFI, we don't just store meat; we let it evolve. Our dry-aging process occurs in a climate-controlled vault lined with Himalayan salt bricks. Over 45 days, enzymes break down tough fibers while moisture evaporates, concentrating the 'savage' flavor profile into something truly legendary. It's a ritual of patience and precision...",
    date: "MARCH 12, 2026",
    category: "CRAFT",
    readTime: "5 MIN READ",
    author: "MASTER BUTCHER",
    image: img45DaySecret
  },
  {
    id: 2,
    title: "Mastering the Tableside Sear",
    excerpt: "The science of the Maillard reaction and the theater of live-fire dining.",
    content: "When our chefs arrive at your table with a 800-degree cast iron surface, they are performing a chemical miracle. The Maillard reaction — the browning of sugars and amino acids — is what gives our steaks that signature crust. But beyond science, it's about the connection between the flame and the guest...",
    date: "FEBRUARY 28, 2026",
    category: "RITUAL",
    readTime: "4 MIN READ",
    author: "HEAD CHEF",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "The Source: Ethical Sourcing in a Savage World",
    excerpt: "How we track every cut from the emerald hills of the Rift Valley to your plate.",
    content: "Transparency is the ultimate luxury. We work exclusively with family-owned farms that prioritize regenerative grazing. By honoring the life of the animal and the soil it grazed upon, we ensure that every bite carries the integrity of the land. This isn't just business; it's a stewardship of the heritage...",
    date: "JANUARY 15, 2026",
    category: "ETHOS",
    readTime: "6 MIN READ",
    author: "FOUNDER",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "The Alchemy of Salt & Smoke",
    excerpt: "How selecting the right wood and mineral balance changes everything.",
    content: "Salt is more than a seasoning; it's a structure. Smoke is more than a flavor; it's an atmosphere. At AFI, we use a bespoke blend of white oak and mesquite to create a smoke profile that complements rather than competes with our dry-aged beef. When mineral salts meet the chemical components of wood smoke, a new dimension of taste is born.",
    date: "JANUARY 05, 2026",
    category: "ELEMENTS",
    readTime: "7 MIN READ",
    author: "ALCHEMY MASTER",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
  }
])

// ─── Reactive State ───────────────────────────────────────────────────────────
const activeFilter = ref('all')
const scrollProgress = ref(0)
const modalOpen = ref(false)
const selectedItem = ref(null)
const embers = ref([])
let emberId = 0
let emberInterval = null

// Interactive Title State
const subtitleLetters = ref([])
const theLetters = ref([])
const savageLetters = ref([])
const chronicleLetters = ref([])

function splitToLetters(text) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    id: i,
    popped: false,
    hovered: false
  }))
}

function popLettersSequentially(lettersArr, delay = 100, step = 50) {
  lettersArr.value.forEach((letter, i) => {
    setTimeout(() => {
      letter.popped = true
      setTimeout(() => { letter.popped = false }, 400)
    }, delay + i * step)
  })
}

function onLetterMouseover(letter) {
  letter.hovered = true
  letter.popped = true
}

function onLetterMouseleave(letter) {
  letter.hovered = false
}

function onLetterAnimEnd(letter) {
  letter.popped = false
}

// Blog Post State
const selectedPost = ref(null)
const postModalOpen = ref(false)

const branchDetails = [
  {
    name: 'Kikuyu',
    address: 'Southern Bypass Interchange, Kikuyu Town',
    phone: '+254 700 1',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80',
    primary: true
  },
  {
    name: 'Kidfamaco',
    address: 'Kidfamaco Estate Road, Kikuyu Sub-county',
    phone: '+254 700 2',
    image: 'https://images.unsplash.com/photo-1550966841-3ee7adac1661?auto=format&fit=crop&w=400&q=80',
    primary: false
  },
  {
    name: 'Muthiga',
    address: 'Waiyaki Way Interchange, Muthiga',
    phone: '+254 700 3',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    primary: false
  },
  {
    name: 'Nairobi CBD',
    address: 'Kenyatta Avenue, Nairobi Central',
    phone: '+254 700 4',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
    primary: false
  }
]

const testimonials = [
  {
      name: 'CAREN',
      role: 'Verified Guest',
      text: 'Good customer care',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'NDERU',
      role: 'Elite Member',
      text: 'Consistent quality and great ambiance. The dry-aged cuts are a revelation.',
      rating: 4,
      image: imgNderuProfile
  },
  {
      name: 'SAMUEL',
      role: 'Regular Diner',
      text: 'The service Was quite slow',
      rating: 3,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'SHEILA',
      role: 'Home Ritualist',
      text: 'Second time having a home delivery... Love that the meat is soft and fresh. Would definitely recom',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'ELIJAH',
      role: 'Tribesman',
      text: 'Leo nimenunua Nyama afi ya opposite Teresa leo jioni but mifupa ilikuwa inanuka kindly i think ni ...See full review',
      rating: 2,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'MARTIN',
      role: 'Executive Ritualist',
      text: 'Fast and simple',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]

// ─── Filtering Logic ──────────────────────────────────────────────────────────
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return galleryItems.value
  return galleryItems.value.filter(item => item.category === activeFilter.value)
})

function setFilter(filter) {
  activeFilter.value = filter
}

// ─── Modal Logic ───────────────────────────────────────────────────────────────
function openModal(item) {
  selectedItem.value = item
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modalOpen.value = false
  document.body.style.overflow = ''
}

function openPost(post) {
  selectedPost.value = post
  postModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closePost() {
  postModalOpen.value = false
  document.body.style.overflow = ''
}

// ─── Interactivity ─────────────────────────────────────────────────────────────
function handleTilt(e, id) {
  const item = document.getElementById(`gallery-item-${id}`)
  if (!item) return
  
  const rect = item.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const xPercent = (x / rect.width) * 100
  const yPercent = (y / rect.height) * 100

  item.style.setProperty('--mouse-x', `${xPercent}%`)
  item.style.setProperty('--mouse-y', `${yPercent}%`)

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15

  item.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
}

function resetTilt(id, displace) {
  const item = document.getElementById(`gallery-item-${id}`)
  if (!item) return
  
  let baseTransform = ''
  if (displace === 'displace-up') baseTransform = 'translateY(-50px)'
  else if (displace === 'displace-down') baseTransform = 'translateY(50px)'
  else if (displace === 'displace-left') baseTransform = 'translateX(-50px)'
  else if (displace === 'displace-right') baseTransform = 'translateX(50px)'

  item.style.transform = baseTransform
}

// ─── Embers Logic ──────────────────────────────────────────────────────────────
function createEmber() {
  const id = emberId++
  const size = Math.random() * 5 + 2
  const left = Math.random() * 100
  const duration = Math.random() * 7 + 5
  embers.value.push({ id, size, left, duration })
  setTimeout(() => {
    embers.value = embers.value.filter(e => e.id !== id)
  }, duration * 1000)
}

function handleScroll() {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100

  // Apply Parallax to gallery items
  document.querySelectorAll('.gallery-item').forEach((el, index) => {
    const item = galleryItems.value.find(i => `gallery-item-${i.id}` === el.id)
    if (item) {
      const speed = item.parallaxSpeed || 0
      const offset = winScroll * speed
      el.style.setProperty('--parallax-offset', `${offset}px`)
    }
  })
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  // Initialize Interactive Letters
  theLetters.value = splitToLetters('The')
  savageLetters.value = splitToLetters('Savage')
  chronicleLetters.value = splitToLetters('Chronicle')
  subtitleLetters.value = splitToLetters('Visual Odyssey & Tactical Stories')

  popLettersSequentially(theLetters, 400, 50)
  popLettersSequentially(savageLetters, 600, 50)
  popLettersSequentially(chronicleLetters, 800, 50)
  popLettersSequentially(subtitleLetters, 1000, 30)

  emberInterval = setInterval(createEmber, 400)
  window.addEventListener('scroll', handleScroll)
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el))
})

onUnmounted(() => {
  if (emberInterval) clearInterval(emberInterval)
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="bg-black text-gray-100 font-body relative overflow-x-hidden min-h-screen">
    <!-- Overlay Tools -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
    


    <div class="embers-container">
      <div v-for="e in embers" :key="e.id" class="ember" :style="{ width: e.size + 'px', height: e.size + 'px', left: e.left + '%', '--duration': e.duration + 's' }"></div>
    </div>

    <!-- Gallery Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modalOpen && selectedItem" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl">
          <div class="absolute inset-0" @click="closeModal"></div>
          <div class="relative z-10 w-full max-w-6xl bg-[#080808] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden animate-zoom-in">
            <button @click="closeModal" class="absolute top-6 right-6 z-20 w-12 h-12 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <span class="material-icons">close</span>
            </button>
            <div class="flex flex-col lg:flex-row">
              <div class="lg:w-2/3 aspect-video lg:aspect-auto h-full overflow-hidden">
                <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-cover">
              </div>
              <div class="lg:w-1/3 p-10 flex flex-col justify-center">
                <span class="text-primary font-display text-xs uppercase tracking-[0.4em] font-black mb-4 block">{{ selectedItem.category }}</span>
                <h2 class="text-white font-display font-black text-4xl uppercase tracking-tighter mb-6 leading-none">{{ selectedItem.title }}</h2>
                <p class="text-gray-400 text-lg font-light leading-relaxed mb-10 italic">"{{ selectedItem.description }}"</p>
                <div class="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span>AFI VISUAL ARCHIVE</span>
                  <span>REF NO. 0{{ selectedItem.id }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Chronicle Reader -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="postModalOpen && selectedPost" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl">
          <div class="absolute inset-0" @click="closePost"></div>
          <div class="relative w-full max-w-5xl max-h-[90vh] bg-[#050505] border border-white/10 overflow-y-auto custom-scrollbar shadow-2xl animate-slide-up">
            <button @click="closePost" class="absolute top-6 right-6 z-50 w-12 h-12 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <span class="material-icons">close</span>
            </button>
            <div class="flex flex-col">
              <div class="h-[450px] overflow-hidden relative">
                <img :src="selectedPost.image" :alt="selectedPost.title" class="w-full h-full object-cover brightness-75">
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              </div>
              <div class="px-8 md:px-20 py-16">
                <div class="flex items-center gap-6 mb-10">
                  <span class="px-4 py-1 bg-primary text-white text-[10px] font-black tracking-widest uppercase">{{ selectedPost.category }}</span>
                  <span class="text-gray-500 text-[10px] font-bold tracking-widest uppercase">{{ selectedPost.date }}</span>
                  <span class="text-gray-500 text-[10px] font-bold tracking-widest uppercase">{{ selectedPost.readTime }}</span>
                </div>
                <h2 class="font-display text-5xl md:text-7xl text-white font-black uppercase tracking-tighter mb-12 leading-[0.9]">{{ selectedPost.title }}</h2>
                <div class="prose prose-invert max-w-none">
                  <p class="text-gray-300 text-xl md:text-2xl font-light leading-relaxed mb-12 border-l-4 border-primary pl-8 italic">{{ selectedPost.excerpt }}</p>
                  <div class="text-gray-400 text-lg font-body leading-loose space-y-8">
                    <p>{{ selectedPost.content }}</p>
                    <p>The intersection of tradition and subversion is where we live. We don't believe in the standard 'fine dining' tropes. We believe in the tactile, the elemental, and the raw. When you sit at an AFI table, you aren't just dining; you are participating in a legacy of the flame that dates back to the dawn of man, refined for the modern palate.</p>
                  </div>
                </div>
                <div class="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                  <div class="flex items-center gap-6">
                    <div class="w-16 h-16 bg-primary flex items-center justify-center font-display font-black text-2xl text-white">AF</div>
                    <div>
                      <p class="text-white text-xs font-black uppercase tracking-widest mb-1">BY {{ selectedPost.author }}</p>
                      <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">AFI EDITORIAL BOARD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Editorial Header (Consolidated Branding) -->
    <header class="relative pt-40 pb-32 min-h-[70vh] flex flex-col justify-center overflow-hidden">
      <!-- Cinematic Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80" alt="" aria-hidden="true" class="w-full h-full object-cover brightness-[0.15] contrast-[1.2] grayscale opacity-60">
        <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <!-- Subtle Atmospheric Glow -->
        <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/80"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] animate-pulse"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div class="inline-block mb-8 py-2 px-8 border border-primary/20 backdrop-blur-3xl bg-primary/5 reveal-up">
          <span class="text-[12px] font-display uppercase tracking-[0.6em] text-primary font-black">Archive of the Eternal Flame</span>
        </div>
        <h1 class="font-display text-[4rem] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tightest text-white leading-[0.7] mb-6 reveal-up">
          <span class="inline-flex space-x-4">
            <span v-for="l in theLetters" :key="l.id" class="letter inline-block" :class="{ 'letter-pop': l.popped }" @mouseover="onLetterMouseover(l)" @mouseleave="onLetterMouseleave(l)" @animationend="onLetterAnimEnd(l)">{{ l.char }}</span>
          </span>
          <br/>
          <span class="inline-flex space-x-1">
            <span v-for="l in savageLetters" :key="l.id" class="letter text-primary italic inline-block" :class="{ 'letter-pop': l.popped }" @mouseover="onLetterMouseover(l)" @mouseleave="onLetterMouseleave(l)" @animationend="onLetterAnimEnd(l)">{{ l.char }}</span>
          </span>
          <br/>
          <span class="inline-flex space-x-1">
            <span v-for="l in chronicleLetters" :key="l.id" class="letter inline-block" :class="{ 'letter-pop': l.popped }" @mouseover="onLetterMouseover(l)" @mouseleave="onLetterMouseleave(l)" @animationend="onLetterAnimEnd(l)">{{ l.char }}</span>
          </span>
        </h1>
        <p class="font-script text-3xl md:text-5xl text-gray-400 mt-6 transform -rotate-2 reveal-up flex justify-center w-full" style="transition-delay: 200ms">
          <span v-for="l in subtitleLetters" :key="l.id" class="letter inline-block" :class="{ 'letter-pop': l.popped }" @mouseover="onLetterMouseover(l)" @mouseleave="onLetterMouseleave(l)" @animationend="onLetterAnimEnd(l)">{{ l.char }}</span>
        </p>
      </div>
    </header>

    <!-- Combined Content Section (Adjusted Overlap) -->
    <main class="relative z-10 -mt-24">
      
      <!-- Section 1: The Visual Odyssey (Direct Masonry Grid) -->
      <section class="py-12">
        <div class="max-w-[1900px] mx-auto px-8">
          <div class="gallery-container">
            <div 
              v-for="(item, index) in filteredItems" :key="item.id" :id="'gallery-item-' + item.id"
              :class="['gallery-item group reveal-up', item.displace]"
              :style="{ gridColumn: `span ${item.spanX}`, gridRow: `span ${item.spanY}`, transitionDelay: (index * 130) + 'ms', transform: `translateY(var(--parallax-offset, 0))` }"
              @mousemove="handleTilt($event, item.id)"
              @mouseleave="resetTilt(item.id, item.displace)"
              @click="openModal(item)"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-1000"></div>
              <div v-if="item.type === 'video'" class="video-indicator z-20"><span class="material-icons text-3xl">play_arrow</span></div>
              <img :src="item.image" :alt="item.title" loading="lazy" class="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-115 brightness-[0.8] group-hover:brightness-105">
              <div class="gallery-overlay">
                <div class="flex items-center gap-4 mb-4">
                  <span class="w-12 h-[1px] bg-primary group-hover:w-24 transition-all duration-800"></span>
                  <span class="text-primary font-display text-[12px] uppercase tracking-widest font-black">{{ item.category }}</span>
                </div>
                <h3 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.8] mb-6">{{ item.title }}</h3>
                <div class="flex items-center gap-3 text-gray-400 text-[11px] font-black uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all duration-800 delay-150 transform translate-y-4 group-hover:translate-y-0">
                  <span>ENGAGE ARCHIVE</span>
                  <span class="material-icons text-lg text-primary">north_east</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Savage Break Quote -->
        <div class="max-w-7xl mx-auto px-6 py-32 text-center reveal-up">
           <span class="material-icons text-primary text-5xl mb-8 opacity-50">format_quote</span>
           <h2 class="font-display text-4xl md:text-6xl text-white font-black uppercase tracking-tightest leading-[0.85] max-w-4xl mx-auto">
             In the smoke, we find <br/><span class="text-primary italic">clarity</span>. In the flame, we find <span class="text-primary italic">truth</span>.
           </h2>
           <p class="font-script text-2xl md:text-3xl text-gray-600 mt-8 transform rotate-1">— The Savage Proclamation</p>
        </div>
      </section>

      <!-- Tactical Interlude -->
      <section class="py-32 border-t border-white/5 bg-[#020202]">
         <div class="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
            <div class="reveal-up">
               <span class="text-primary font-display text-xs uppercase tracking-[0.5em] font-black block mb-6">Tactical Intelligence</span>
               <h2 class="text-4xl md:text-6xl text-white font-black uppercase tracking-tightest leading-[0.8] mb-10">The Alchemy of <span class="text-primary italic">Savage Dining</span></h2>
               <p class="text-gray-400 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-xl">Our process isn't just cooking; it's a chemical and spiritual transformation. Every cut is tracked with precision from source to flame.</p>
               <div class="grid grid-cols-2 gap-10">
                  <div class="border-l-4 border-primary pl-8">
                     <p class="text-4xl md:text-5xl text-white font-black tracking-tighter mb-1">850°F</p>
                     <p class="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-tight">THE OPTIMAL<br/>MAILLARD POINT</p>
                  </div>
                  <div class="border-l-4 border-primary pl-8">
                     <p class="text-4xl md:text-5xl text-white font-black tracking-tighter mb-1">45 DAYS</p>
                     <p class="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-tight">SALT-BRICK VAULT<br/>MATURATION</p>
                  </div>
               </div>
            </div>
            <div class="reveal-up relative group" style="transition-delay: 200ms">
               <div class="absolute -inset-3 border border-primary/20 group-hover:border-primary/50 transition-all duration-700"></div>
               <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80" alt="AFI Steakhouse interior" loading="lazy" class="w-full h-full object-cover border border-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1500 scale-100 group-hover:scale-105">
               <div class="absolute bottom-4 right-4 bg-primary text-white p-3 font-display font-black text-[10px] uppercase tracking-widest">LIVE KITCHEN FEED</div>
            </div>
         </div>
      </section>

      <!-- Section 2: The Chronicles (Blog Section) -->
      <section class="py-24 bg-black">
        <div class="max-w-7xl mx-auto px-4 mb-24 text-center">
            <div class="flex items-center justify-center gap-4 mb-6 reveal-up">
               <span class="h-[1px] w-16 bg-primary"></span>
               <span class="text-primary font-display text-xs uppercase tracking-[0.5em] font-black">Phase Two</span>
               <span class="h-[1px] w-16 bg-primary"></span>
            </div>
            <h2 class="text-5xl md:text-8xl lg:text-9xl text-white font-black uppercase tracking-tighter leading-none mb-8 reveal-up">The <span class="text-primary">Chronicles</span></h2>
            <p class="text-gray-500 text-xl font-light max-w-2xl mx-auto reveal-up leading-relaxed">Deep narratives on the craft, the ritual, and the ethos of AFI. Our steel-bound stories, unlocked for the dedicated.</p>
        </div>

        <div class="max-w-[1600px] mx-auto px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-32">
            <!-- Featured Blog Post (Large) -->
            <div class="lg:col-span-8 group cursor-pointer reveal-up" @click="openPost(blogPosts[0])">
              <div class="relative aspect-[16/9] overflow-hidden mb-12 border border-white/5 shadow-[0_0_80px_rgba(0,0,0,1)]">
                <img :src="blogPosts[0].image" :alt="blogPosts[0].title" loading="lazy" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-98"></div>
                <div class="absolute bottom-12 left-12 right-12">
                  <div class="flex items-center gap-4 mb-8">
                     <span class="px-4 py-1 bg-primary text-white text-[10px] font-black tracking-[0.3em] uppercase">MASTER PROTOCOL</span>
                     <span class="text-gray-400 text-[11px] font-bold tracking-[0.4em] uppercase">{{ blogPosts[0].readTime }}</span>
                  </div>
                  <h2 class="text-5xl md:text-7xl text-white font-black uppercase tracking-tightest leading-[0.8] group-hover:text-primary transition-all duration-1000 transform group-hover:-translate-y-3">{{ blogPosts[0].title }}</h2>
                </div>
              </div>
              <p class="text-gray-400 text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mb-12 group-hover:text-white transition-colors duration-700">{{ blogPosts[0].excerpt }}</p>
              <div class="flex items-center gap-10">
                 <button class="bg-primary hover:bg-white text-white hover:text-black py-5 px-16 font-display font-black text-sm uppercase tracking-[0.5em] transition-all duration-700 shadow-[0_10px_40px_rgba(217,4,4,0.3)]">ENGAGE PROTOCOL</button>
                 <div class="h-[2px] flex-1 bg-white/5 relative">
                    <div class="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-1500"></div>
                 </div>
              </div>
            </div>
            
            <!-- Blog Feed (Sidebar) -->
            <div class="lg:col-span-4 space-y-16">
              <div v-for="(post, index) in blogPosts.slice(1)" :key="post.id" class="group cursor-pointer border-b border-white/5 pb-12 reveal-up" :style="{ transitionDelay: (index * 120) + 'ms' }" @click="openPost(post)">
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-primary text-[11px] font-black uppercase tracking-[0.3em]">{{ post.category }}</span>
                  <span class="w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-primary transition-all duration-1000"></span>
                </div>
                <h3 class="text-2xl text-white font-black uppercase tracking-tight group-hover:text-primary transition-all mb-6 leading-tight transform group-hover:-translate-x-1">{{ post.title }}</h3>
                <p class="text-gray-500 text-base font-light leading-relaxed mb-8 line-clamp-2">{{ post.excerpt }}</p>
                <div class="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 transition-colors group-hover:text-white">
                  <span>{{ post.readTime }}</span>
                  <div class="flex items-center gap-2 text-primary group-hover:gap-4 transition-all duration-700">
                    <span class="material-icons text-2xl">east</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
      
      <!-- Section 3: Community Rituals (UGC) -->
      <section class="py-40 border-t border-white/5 bg-[#010101] relative overflow-hidden">
        <!-- Floating Embers 2 -->
        <div class="absolute inset-0 pointer-events-none z-0">
           <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[200px] animate-pulse"></div>
        </div>

        <div class="max-w-7xl mx-auto px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-32 items-center">
            <div class="reveal-up">
              <span class="text-primary font-display text-xs uppercase tracking-[0.7em] font-black mb-10 block">Community Archive Protocol</span>
              <h2 class="text-5xl md:text-[8rem] font-black text-white uppercase tracking-tightest mb-12 leading-[0.75]">Deposit Into<br/><span class="text-primary italic">The Vault</span></h2>
              <p class="text-gray-400 text-2xl md:text-3xl font-light leading-relaxed mb-16 max-w-2xl">Share your ritual using <span class="text-white font-bold">#AFISavage</span>. The most cinematic uploads are immortalized in our physical archive.</p>
              
              <div class="flex flex-wrap gap-12">
                <a href="#" class="group flex items-center gap-6 text-white text-[12px] font-black uppercase tracking-[0.5em] transition-all">
                  <span class="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.05)]"><i class="material-icons text-xl">photo_camera</i></span>
                  INSTAGRAM
                </a>
                <a href="#" class="group flex items-center gap-8 text-white text-[12px] font-black uppercase tracking-[0.5em] transition-all">
                  <span class="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.05)]"><i class="material-icons text-xl">videocam</i></span>
                  TIKTOK
                </a>
              </div>
            </div>
            
            <div class="bg-white/[0.01] border border-white/10 p-16 md:p-24 relative reveal-up" style="transition-delay: 200ms">
              <div class="absolute -top-8 -left-8 w-20 h-20 border-t-[6px] border-l-[6px] border-primary"></div>
              <div class="absolute -bottom-8 -right-8 w-20 h-20 border-b-[6px] border-r-[6px] border-primary"></div>
              
              <h3 class="text-4xl font-black text-white uppercase tracking-tight mb-16 text-left">Upload Intel</h3>
              <form class="space-y-10" @submit.prevent>
                <div class="grid md:grid-cols-2 gap-10">
                  <div class="space-y-3">
                    <label class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">GUID</label>
                    <input type="text" placeholder="GUEST IDENTIFIER" class="w-full bg-black border border-white/10 p-6 text-[12px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all rounded-none placeholder:text-gray-800">
                  </div>
                  <div class="space-y-3">
                    <label class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">UPLINK</label>
                    <input type="email" placeholder="ENCRYPTED EMAIL" class="w-full bg-black border border-white/10 p-6 text-[12px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all rounded-none placeholder:text-gray-800">
                  </div>
                </div>
                <div class="border-2 border-dashed border-white/10 p-20 text-center group cursor-pointer hover:border-primary/70 transition-all hover:bg-primary/10 relative overflow-hidden">
                  <div class="relative z-10">
                    <span class="material-icons text-7xl text-gray-800 group-hover:text-primary transition-all duration-1000 mb-8 transform group-hover:scale-110">cloud_upload</span>
                    <p class="text-[12px] font-black uppercase tracking-[0.4em] text-gray-700 group-hover:text-white transition-colors">DEPOSIT VISUAL DATA</p>
                  </div>
                   <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></div>
                </div>
                <button class="w-full bg-primary py-7 font-display font-black text-[16px] uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-[0_20px_60px_rgba(217,4,4,0.4)] transform hover:-translate-y-2 active:scale-95 duration-500">SUBMIT TO CHRONICLE</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>



    <!-- Locations Section Start -->
    <header class="relative bg-black py-24 overflow-hidden border-t border-white/5 reveal-up" id="locations">
        <div class="absolute inset-0 z-0 opacity-40">
            <img alt="Dark steakhouse background" class="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        <div class="relative z-10 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span class="font-script text-3xl text-primary block mb-1">Heritage & Growth</span>
            <h2 class="text-5xl md:text-7xl font-display text-white mb-2 tracking-tight uppercase drop-shadow-lg">
                Our <span class="text-primary">Locations</span>
            </h2>
            <p class="text-lg text-gray-300 font-light max-w-2xl mx-auto font-script italic">Find your nearest fiery experience.</p>
        </div>
    </header>

    <section class="bg-black py-20 relative overflow-hidden reveal-up">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Full Width Map Header -->
            <div class="mb-16 h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl border border-white/10 relative bg-black group/map">
                <div class="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-none text-white shadow-2xl max-w-xs transition-transform duration-500 group-hover/map:translate-x-2 text-left text-left">
                    <h4 class="font-display text-xl text-primary font-bold uppercase tracking-tight mb-2">Empire Map</h4>
                    <p class="text-xs text-gray-400 font-light leading-relaxed">
                        Identify your target. Navigate the AFI strongholds across the region.
                    </p>
                </div>
                <div class="w-full h-full map-container">
                    <iframe allowfullscreen="" height="100%" loading="lazy"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.3340578832!2d36.6570562!3d-1.250787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f23696576850d%3A0xc023c616853a419d!2sKikuyu%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                        style="border:0;" width="100%">
                    </iframe>
                </div>
                
                <!-- Tactical Markers -->
                <div class="absolute top-[55%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                    <div class="relative group cursor-pointer">
                        <svg class="w-16 h-16 text-primary drop-shadow-[0_0_20px_rgba(217,4,4,0.8)] animate-bounce"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-6-4.9-7-6.5-13.33zM11.5 19c-1.38 0-2.5-1.12-2.5-2.5 0-1.67 1.12-3 2.5-3s2.5 1.33 2.5 3c0 1.38-1.12 2.5-2.5 2.5z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Four Column Branch Grid with Staggered Reveal -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4 sm:px-0">
                <div v-for="(branch, index) in branchDetails" :key="branch.name" 
                     class="bg-black/40 backdrop-blur-xl border border-white/10 border-l-4 transition-all duration-500 group flex flex-col text-left reveal-up hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,4,4,0.15)] hover:bg-black/60"
                     :class="branch.primary ? 'border-l-primary' : 'border-l-gray-800 hover:border-l-primary'"
                     :style="{ transitionDelay: (index * 150) + 'ms' }">
                    <div class="relative h-32 overflow-hidden">
                        <img :alt="branch.name + ' Branch'" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" :src="branch.image" />
                        <div class="absolute inset-0 bg-black/40"></div>
                        <div class="absolute bottom-2 left-4">
                            <h3 class="text-white font-display text-lg font-bold uppercase tracking-tight">{{ branch.name }}</h3>
                        </div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col text-left">
                        <p class="text-gray-400 text-[10px] mb-4 flex-1">{{ branch.address }}</p>
                        <div class="text-primary font-display font-bold text-xs mb-6 uppercase tracking-widest">{{ branch.phone }}</div>
                        <button :class="branch.primary ? 'bg-primary hover:bg-white text-white hover:text-black' : 'bg-white/5 hover:bg-primary text-white'" 
                                class="w-full py-2.5 font-display font-black uppercase tracking-widest text-[9px] transition-all">Directions</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-black py-24 relative overflow-hidden reveal-up border-t border-white/5">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <span class="font-script text-3xl text-primary block mb-2">Voice of the Tribe</span>
                <h2 class="text-5xl md:text-7xl font-display text-white mb-4 tracking-tight uppercase">Savage <span class="text-primary italic">Tales</span></h2>
                <div class="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(t, index) in testimonials" :key="t.name" 
                     class="bg-black/95 backdrop-blur-3xl border border-white/10 p-10 flex flex-col group hover:border-primary/60 transition-all duration-500 text-left reveal-up"
                     :style="{ transitionDelay: (index * 150) + 'ms' }">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-primary grayscale group-hover:grayscale-0 transition-all duration-500 shadow-[0_0_20px_rgba(217,4,4,0.3)]">
                            <img :src="t.image" :alt="t.name" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h4 class="font-display text-white font-bold text-lg uppercase tracking-tight">{{ t.name }}</h4>
                            <span class="text-primary text-[10px] font-black uppercase tracking-widest">{{ t.role }}</span>
                        </div>
                    </div>
                    <div class="flex gap-1 mb-6">
                        <span v-for="i in 5" :key="i" class="material-icons text-sm" :class="i <= (t.rating || 5) ? 'text-primary' : 'text-gray-800'">star</span>
                    </div>
                    <p class="text-gray-400 text-base leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
                        "{{ t.text }}"
                    </p>
                </div>
            </div>
        </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.font-display { font-family: 'Oswald', sans-serif; }
.font-body { font-family: 'Lato', sans-serif; }
.font-script { font-family: 'Dancing Script', cursive; }

.tracking-tightest { letter-spacing: -0.1em; }

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 6px;
  background: linear-gradient(90deg, #D90404, #ff4d4d, #D90404, #ff4d4d);
  background-size: 300% 100%;
  animation: bg-move 4s linear infinite;
  z-index: 2000;
  box-shadow: 0 0 40px rgba(217, 4, 4, 1);
}

@keyframes bg-move { 0% { background-position: 300% 0; } 100% { background-position: -300% 0; } }

.gallery-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  perspective: 4000px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s ease;
  transform-style: preserve-3d;
  background: #080808;
  border: 1px solid rgba(255, 255, 255, 0.03);
  min-height: 320px;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0.3) 40%, transparent 100%);
  opacity: 0;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transform: translateY(60px) scale(0.85);
}

.gallery-item:hover .gallery-overlay { opacity: 1; transform: translateY(0) scale(1); }

.displace-up { transform: translateY(-30px); }
.displace-down { transform: translateY(30px); }
.displace-left { transform: translateX(-30px); }
.displace-right { transform: translateX(30px); }

.video-indicator {
  position: absolute;
  top: 3.5rem;
  right: 3.5rem;
  background: #D90404;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  z-index: 5;
  box-shadow: 0 0 60px rgba(217, 4, 4, 0.8);
}

.embers-container { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.ember { position: absolute; background: #D90404; border-radius: 50%; filter: blur(5px); opacity: 0.6; animation: float-up var(--duration) linear infinite; }

@keyframes float-up {
  0% { transform: translateY(110vh) rotate(0deg) scale(0.4); opacity: 0; }
  20% { opacity: 0.8; }
  100% { transform: translateY(-10vh) rotate(1080deg) scale(2); opacity: 0; }
}

.reveal-up { opacity: 0; transform: translateY(120px); transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1); }
.reveal-up.revealed { opacity: 1; transform: translateY(0); }

.fade-enter-active, .fade-leave-active { transition: opacity 1s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes zoom-in { from { transform: scale(0.8) translateY(60px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
.animate-zoom-in { animation: zoom-in 1s cubic-bezier(0.23, 1, 0.32, 1) both; }

@keyframes slide-up { from { transform: translateY(150px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.23, 1, 0.32, 1) both; }

.custom-scrollbar::-webkit-scrollbar { width: 10px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #000; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #D90404; border-radius: 20px; border: 2px solid #000; }

/* Interactive Letters */
.letter {
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
  transform-origin: center;
}
.letter:hover {
  color: #D90404;
  transform: scale(1.25) rotate(5deg);
  text-shadow: 0 0 20px rgba(217, 4, 4, 0.8);
  z-index: 10;
}
.letter-pop {
  animation: letter-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes letter-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.4) translateY(-10px); color: #D90404; }
  100% { transform: scale(1); }
}

/* Map Styling */
.map-container iframe {
  filter: grayscale(100%) invert(92%) contrast(83%);
  transition: filter 0.5s ease;
}
.group\/map:hover .map-container iframe {
  filter: grayscale(80%) invert(90%) contrast(90%);
}

@media (max-width: 1024px) {
  .gallery-container { grid-template-columns: repeat(6, 1fr); gap: 3rem; }
  .gallery-item { grid-column: span 3 !important; grid-row: span 1 !important; transform: none !important; min-height: 400px; }
  .gallery-overlay { padding: 3rem; }
}

@media (max-width: 640px) {
  .gallery-container { grid-template-columns: 1fr; }
  .gallery-item { grid-column: span 1 !important; }
}
</style>

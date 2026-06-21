<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppFooter from './AppFooter.vue'
import { addToCart } from '../cartState'

// ─── Daily Specials Data ───────────────────────────────────────────────────────
const specials = [
  {
    day: 'Sunday',
    type: 'Sunday Roast',
    icon: 'restaurant',
    name: "Heritage Roast",
    description: 'Slow-roasted prime beef with artisanal vegetables and bone-marrow gravy.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Monday',
    type: 'Smoked Special',
    icon: 'cloud',
    name: 'Smoked Brisket',
    description: '12-hour hickory-smoked brisket served with bourbon BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Tuesday',
    type: 'Premium Cut',
    icon: 'kebab_dining',
    name: 'Tomahawk Special',
    description: 'A massive 40oz bone-in Tomahawk ribeye, flame-grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Wednesday',
    type: 'Signature BBQ',
    icon: 'outdoor_grill',
    name: 'BBQ Ribs Feast',
    description: 'St. Louis style ribs, double-glazed in our honey-spiced blend.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Thursday',
    type: 'Ultimate Platter',
    icon: 'layers',
    name: "The King's Platter",
    description: 'A grand selection of Ribeye, glazed Pork Ribs, and bone marrow.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb2258139?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Friday',
    type: 'Craft Burger',
    icon: 'lunch_dining',
    name: 'Wagyu Gold Burger',
    description: 'Double Wagyu beef patties with truffle aioli and gold flakes.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80'
  },
  {
    day: 'Saturday',
    type: 'Surf & Turf',
    icon: 'set_meal',
    name: 'Surf & Turf Royal',
    description: 'Tender Filet Mignon paired with a buttery, grilled Atlantic Lobster tail.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80'
  }
]

const signatureHighlights = [
  {
    name: 'AFI Tomahawk',
    price: '12,500',
    rating: 5,
    description: '42oz Bone-in Ribeye, dry-aged for 45 days.',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Wagyu Strip',
    price: '9,500',
    rating: 5,
    description: 'Japanese A5 Wagyu with exceptional marbling.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Savage T-Bone',
    price: '7,500',
    rating: 4.8,
    description: '24oz T-Bone with house savage rub.',
    image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Surf & Turf',
    price: '22,000',
    rating: 4.9,
    description: 'Filet Mignon paired with Atlantic Lobster tail.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Truffle Mac',
    price: '1,400',
    rating: 4.7,
    description: 'Aged cheddar and truffle parmesan crust.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Loaded Potato',
    price: '1,200',
    rating: 4.6,
    description: 'Bacon, sour cream, chives, and cheddar.',
    image: 'https://images.unsplash.com/photo-1451276003260-2621746654e8?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Smoked Brisket',
    price: '2,800',
    rating: 4.9,
    description: '12-hour hickory-smoked prime brisket.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Flaming Ribs',
    price: '3,200',
    rating: 4.8,
    description: 'St. Louis style ribs with honey-spiced glaze.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Heritage Roast',
    price: '4,500',
    rating: 4.9,
    description: 'Slow-roasted prime beef with bone-marrow gravy.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Lamb Rack Savory',
    price: '5,800',
    rating: 4.8,
    description: 'Herb-crusted lamb rack with mint reduction.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Bourbon Wings',
    price: '1,200',
    rating: 4.7,
    description: 'Crispy wings glazed in a honey-bourbon reduction.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Garlic Prawns',
    price: '2,500',
    rating: 4.8,
    description: 'Jumbo prawns sautéed in garlic chili butter.',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'AFI Salad',
    price: '1,100',
    rating: 4.6,
    description: 'Fresh organic greens with house balsamic dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Truffle Fries',
    price: '900',
    rating: 4.9,
    description: 'Hand-cut fries with truffle oil and parmesan.',
    image: 'https://images.unsplash.com/photo-1573082844477-987819385501?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Lava Cake',
    price: '1,500',
    rating: 4.9,
    description: 'Rich dark chocolate cake with a molten center.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Cheesecake',
    price: '1,200',
    rating: 4.7,
    description: 'New York style cheesecake with berry compote.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddfdbf29d?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Old Fashioned',
    price: '1,800',
    rating: 4.8,
    description: 'Smoked bourbon with orange peel and bitters.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Mango Mocktail',
    price: '800',
    rating: 4.6,
    description: 'Fresh mango purée with lime and mint.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Grilled Asparagus',
    price: '950',
    rating: 4.5,
    description: 'Tender asparagus charred over open flames.',
    image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d71ff?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    name: 'Peppercorn Sauce',
    price: '400',
    rating: 4.9,
    description: 'Creamy green peppercorn reduction.',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bac3327?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
]

// ─── Testimonials Data ───────────────────────────────────────────────────────
const testimonials = [
  {
      name: 'CAREN',
      role: 'Verified Guest',
      text: 'Good customer care',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'MBUGUA',
      role: 'Elite Member',
      text: 'Quality and ritual combined. A must visit for every steak lover.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'SAMUEL',
      role: 'Regular Diner',
      text: 'The service Was quite slow',
      rating: 3,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'SHEILA',
      role: 'Home Ritualist',
      text: 'Second time having a home delivery... Love that the meat is soft and fresh. Would definitely recom',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'ELIJAH',
      role: 'Tribesman',
      text: 'Leo nimenunua Nyama afi ya opposite Teresa leo jioni but mifupa ilikuwa inanuka kindly i think ni ...See full review',
      rating: 2,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
      name: 'MARTIN',
      role: 'Executive Ritualist',
      text: 'Fast and simple',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80'
  }
]

const branchDetails = [
  {
    name: 'Kikuyu',
    address: 'Southern Bypass Interchange, Kikuyu Town',
    phone: '+254 700 1',
    image: 'https://images.unsplash.com/photo-1550966841-3ee7adac1661?auto=format&fit=crop&w=400&q=80',
    primary: true
  },
  {
    name: 'Kidfamaco',
    address: 'Kidfamaco Estate Road, Kikuyu Sub-county',
    phone: '+254 700 2',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    primary: false
  },
  {
    name: 'Muthiga',
    address: 'Waiyaki Way Interchange, Muthiga',
    phone: '+254 700 3',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80',
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
const selectedBranch = ref(branchDetails.find(b => b.primary) || branchDetails[0]);

function selectBranch(branch) {
  selectedBranch.value = branch;
}

const branchMapPositions = {
  'Kikuyu': { top: '55%', left: '45%' },
  'Kidfamaco': { top: '68%', left: '35%' },
  'Muthiga': { top: '48%', left: '70%' },
  'Nairobi CBD': { top: '50%', left: '50%' }
};


const flameStyle = computed(() => {
  const pos = branchMapPositions[selectedBranch.value.name];
  return pos ? { top: pos.top, left: pos.left } : {};
});
const savageServices = [
    { 
        title: "Savage Extraction", 
        desc: "City-wide synchronized fulfillment within 45 fragments. Logistics mapped for zero-friction urban delivery.", 
        icon: "local_shipping", 
        image: "https://images.unsplash.com/photo-1512412023979-5df16316aa11?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        title: "Ritual Scaling", 
        desc: "Full-scale smoky deployments for corporate or private sectors. Tactical catering engineered for mass impact.", 
        icon: "groups", 
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        title: "Yield Engineering", 
        desc: "Custom dry-aged yields tailored to your exact thermal requirements. Precision butchery protocols.", 
        icon: "precision_manufacturing", 
        image: "https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        title: "Mastery Training", 
        desc: "Learn the ancient fire rituals from the masters of the pit. Join the smokehouse elite in private sessions.", 
        icon: "workspace_premium", 
        image: "https://images.unsplash.com/photo-1544023109-173c62ba81b9?auto=format&fit=crop&w=600&q=80" 
    }
]

const specialtyCategories = [
  {
    id: 'steaks',
    title: 'Elite Steaks',
    subtitle: 'Dry-Aged Precision',
    description: 'Our steaks are monitored 24/7 in salt-brick vaults, ensuring a yield of unparalleled flavor and tenderness.',
    icon: 'kebab_dining',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=1200&q=80',
    items: ['45-Day Tomahawk', 'A5 Wagyu Strip', 'Savage T-Bone']
  },
  {
    id: 'platters',
    title: 'Deployment Platters',
    subtitle: 'Mass Impact Feasts',
    description: 'Engineered for the tribe. These massive deployments feature a synchronized selection of our finest yields.',
    icon: 'layers',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb2258139?auto=format&fit=crop&w=1200&q=80',
    items: ["The King's Platter", 'Savage Roast Feast', 'Tribal BBQ Tray']
  },
  {
    id: 'butchery',
    title: 'Precision Butchery',
    subtitle: 'The Source of Power',
    description: 'Raw yields available for private extraction. Take the ritual home with our premium, hand-carved cuts.',
    icon: 'content_cut',
    image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=1200&q=80',
    items: ['Custom Dry-Aged Ribeye', 'Signature Rub Packs', 'Whole Lamb Extraction']
  }
]

const handleAddToCart = (item) => {
    // Ensure item has a price as a number if it's a string
    const price = typeof item.price === 'string' ? parseInt(item.price.replace(/,/g, '')) : item.price
    addToCart({ ...item, price })
    
    const id = Date.now()
    notifications.value.push({
        id,
        title: item.name,
        msg: 'Added to your ritual'
    })
    setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }, 3000)
}

// ─── Reactive State ───────────────────────────────────────────────────────────
const currentDayIndex = ref(0)
const currentSpecial = ref(specials[0])
const heroImageSrc = ref(specials[0].image)
const heroImageOpacity = ref(1)

const dailySpecialContainerOpacity = ref(1)
const dailySpecialContainerTranslateY = ref(0)

const scrollProgress = ref(0)
const showScrollTop = ref(false)

const bubbleVisible = ref(false)
const bubbleAnimating = ref(false)

// ─── Signature Highlights States (Independent Rows) ───────────────────────────
const row1Index = ref(0)
const row2Index = ref(1) // Row 2 starts "ahead"
const isHighlightModalOpen = ref(false)
const selectedHighlight = ref(null)
const revealedHighlights = ref(false)
const revealedWhyChooseUs = ref(false)
const revealedSignatureDish = ref(false)

const nextRow1 = () => { row1Index.value = (row1Index.value < 5) ? row1Index.value + 1 : 0 }
const prevRow1 = () => { row1Index.value = (row1Index.value > 0) ? row1Index.value - 1 : 5 }

const nextRow2 = () => { row2Index.value = (row2Index.value < 5) ? row2Index.value + 1 : 0 }
const prevRow2 = () => { row2Index.value = (row2Index.value > 0) ? row2Index.value - 1 : 5 }

// Auto-scroll logic
let carouselInterval = null
onMounted(() => {
  carouselInterval = setInterval(() => {
    nextRow1()
    nextRow2()
  }, 5000) // Scroll every 5 seconds
})

onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval)
})

const openHighlightModal = (item) => {
  selectedHighlight.value = item
  isHighlightModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeHighlightModal = () => {
  isHighlightModalOpen.value = false
  document.body.style.overflow = ''
}

const dividerAnimated = ref(false)

// Letter-by-letter reactive arrays
const dayLetters = ref([])
const nameLetters = ref([])
const scriptLetters = ref([])
const afLetters = ref([])
const iLetters = ref([])

// ─── Letter Helpers ────────────────────────────────────────────────────────────
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

// ─── Daily Special ─────────────────────────────────────────────────────────────
function updateDailySpecial(index) {
  const special = specials[index]
  currentSpecial.value = special

  dayLetters.value = splitToLetters(special.day)
  nameLetters.value = splitToLetters(special.name)

  popLettersSequentially(dayLetters, 100, 50)
  popLettersSequentially(nameLetters, 100, 50)

  // Fade hero image
  const img = new Image()
  img.src = special.image
  img.onload = () => {
    heroImageOpacity.value = 0
    setTimeout(() => {
      heroImageSrc.value = special.image
      heroImageOpacity.value = 1
    }, 500)
  }
}

function cycleSpecial() {
  currentDayIndex.value = (currentDayIndex.value + 1) % 7
  dailySpecialContainerOpacity.value = 0.5
  dailySpecialContainerTranslateY.value = -10
  setTimeout(() => {
    updateDailySpecial(currentDayIndex.value)
    dailySpecialContainerOpacity.value = 1
    dailySpecialContainerTranslateY.value = 0
  }, 300)
}

// ─── Embers ───────────────────────────────────────────────────────────────────
const embers = ref([])
let emberId = 0
let emberInterval = null

function createEmber() {
  const id = emberId++
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const duration = Math.random() * 5 + 4
  embers.value.push({ id, size, left, duration })
  setTimeout(() => {
    embers.value = embers.value.filter(e => e.id !== id)
  }, duration * 1000)
}

// ─── Scroll Logic ─────────────────────────────────────────────────────────────
function handleScroll() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
  showScrollTop.value = winScroll > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ─── Info Bubble ──────────────────────────────────────────────────────────────
function toggleBubble(e) {
  e.stopPropagation()
  bubbleVisible.value = !bubbleVisible.value
}

function closeBubbleOnOutside(e) {
  const bubble = document.getElementById('info-bubble')
  const toggle = document.getElementById('info-bubble-toggle')
  if (bubble && toggle && !bubble.contains(e.target) && !toggle.contains(e.target)) {
    bubbleVisible.value = false
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  // Initial specials
  updateDailySpecial(currentDayIndex.value)

  // Logo letters
  afLetters.value = splitToLetters('AF')
  iLetters.value = splitToLetters('I')
  scriptLetters.value = splitToLetters('Steaks & Platters')
  popLettersSequentially(afLetters, 100, 50)
  popLettersSequentially(iLetters, 100, 50)
  popLettersSequentially(scriptLetters, 100, 50)

  // Divider
  setTimeout(() => { dividerAnimated.value = true }, 800)

  // Embers
  emberInterval = setInterval(createEmber, 350)

  // Scroll
  window.addEventListener('scroll', handleScroll)

  // Outside click for bubble
  document.addEventListener('click', closeBubbleOnOutside)

  // ─── Intersection Observer for Card Reveals ────────────────────────────────
  const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'highlights-row-1') revealedHighlights.value = true
        if (entry.target.id === 'why-choose-us-grid') revealedWhyChooseUs.value = true
        if (entry.target.id === 'signature-dish-section') revealedSignatureDish.value = true
        
        // Ported from MenuPage: add active class for general scroll reveals
        entry.target.classList.add('reveal-active')
        
        revealObserver.unobserve(entry.target)
      }
    })
  }, revealOptions)

  // Observe specific ID-based reveals
  const hRow1 = document.getElementById('highlights-row-1')
  const wGrid = document.getElementById('why-choose-us-grid')
  const sDish = document.getElementById('signature-dish-section')

  if (hRow1) revealObserver.observe(hRow1)
  if (wGrid) revealObserver.observe(wGrid)
  if (sDish) revealObserver.observe(sDish)

  // Observe all general scroll reveals (like testimonials)
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el)
  })
})

onUnmounted(() => {
  if (emberInterval) clearInterval(emberInterval)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeBubbleOnOutside)
})
</script>

<template>
  <div class="bg-black dark:bg-black min-h-screen font-body text-gray-100 transition-colors duration-300">

    <!-- Toast Notifications -->
    <div class="fixed top-24 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
        <transition-group name="toast-slide">
            <div v-for="n in notifications" :key="n.id" 
                 class="bg-black/90 backdrop-blur-xl border border-primary/40 px-8 py-6 flex items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-auto min-w-[400px]">
                <div class="w-14 h-14 bg-primary flex items-center justify-center">
                    <span class="material-icons text-white text-2xl">shopping_basket</span>
                </div>
                <div class="text-left">
                    <h5 class="text-white font-display font-bold uppercase tracking-tight text-lg">{{ n.title }}</h5>
                    <p class="text-primary text-xs font-black uppercase tracking-widest mt-1">{{ n.msg }}</p>
                </div>
                <div class="ml-auto w-1 h-10 bg-primary/20 relative overflow-hidden">
                    <div class="absolute inset-0 bg-primary animate-toast-progress"></div>
                </div>
            </div>
        </transition-group>
    </div>

    <!-- Scroll Progress Bar -->
    <div
      class="scroll-progress"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <!-- Scroll Top Button -->
    <button
      id="scroll-top"
      :class="['fixed bottom-8 right-8 z-[100] bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-110 hover:bg-red-700 group', showScrollTop ? 'show' : 'opacity-0 invisible translate-y-10']"
      @click="scrollToTop"
    >
      <svg class="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>

    <!-- Embers -->
    <div class="embers-container" id="embers">
      <div
        v-for="ember in embers"
        :key="ember.id"
        class="ember"
        :style="{
          width: ember.size + 'px',
          height: ember.size + 'px',
          left: ember.left + '%',
          '--duration': ember.duration + 's'
        }"
      ></div>
    </div>

    <!-- Brand Info Bubble (Mobile Only) -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center lg:hidden">
      <!-- Bubble Dialog -->
      <div
        id="info-bubble"
        :class="[
          'mb-6 bg-black/95 backdrop-blur-xl border border-primary/40 p-6 rounded-3xl shadow-[0_0_50px_rgba(217,4,4,0.3)] w-[320px] max-w-[calc(100vw-40px)] transform transition-all duration-500 origin-bottom',
          bubbleVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0 hidden'
        ]"
      >
        <div class="space-y-5">
          <!-- Location -->
          <div class="flex items-start gap-4 group/item">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
              <span class="material-icons text-primary">location_on</span>
            </div>
            <div>
              <h4 class="font-serif font-bold text-xs uppercase tracking-[0.2em] text-primary mb-1">Our Location</h4>
              <p class="text-sm text-white font-medium">Main Southern Bypass Road</p>
              <p class="text-xs text-gray-400">Kikuyu, Kiambu County</p>
            </div>
          </div>
          <!-- Hours -->
          <div class="flex items-start gap-4 group/item">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
              <span class="material-icons text-primary">schedule</span>
            </div>
            <div class="flex-1">
              <h4 class="font-serif font-bold text-xs uppercase tracking-[0.2em] text-primary mb-1">Opening Hours</h4>
              <div class="space-y-1">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">Mon - Thu</span>
                  <span class="text-white font-medium">5:00 - 10:00 PM</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">Fri - Sat</span>
                  <span class="text-white font-medium">5:00 - 11:00 PM</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">Sunday</span>
                  <span class="text-white font-medium">4:00 - 9:30 PM</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Contact -->
          <div class="flex items-start gap-4 group/item">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
              <span class="material-icons text-primary">contact_support</span>
            </div>
            <div>
              <h4 class="font-serif font-bold text-xs uppercase tracking-[0.2em] text-primary mb-1">Get In Touch</h4>
              <p class="text-sm text-white font-medium line-clamp-1">+254 700 000 000</p>
              <p class="text-xs text-gray-400 line-clamp-1">reservations@afikenya.com</p>
            </div>
          </div>
        </div>
        <!-- Triangle Pointer -->
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black/95 rotate-45 border-r border-b border-primary/40"></div>
      </div>

      <!-- Toggle Button -->
      <button
        id="info-bubble-toggle"
        class="bg-primary hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(217,4,4,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        @click="toggleBubble"
      >
        <div class="relative z-10 flex flex-col items-center leading-none">
          <div class="flex items-end">
            <span class="font-display font-bold text-lg tracking-tighter text-white">AF</span>
            <div class="relative">
              <span class="font-display font-bold text-lg tracking-tighter text-white">I</span>
              <span class="absolute -top-0.5 left-0 w-full h-1 bg-white rounded-sm"></span>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- Navigation is handled by global AppNavbar in App.vue -->

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          alt="Sizzling steak on a grill with flames"
          class="w-full h-full object-cover transition-opacity duration-1000"
          :src="heroImageSrc"
          :style="{ opacity: heroImageOpacity }"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent dark:from-black dark:via-black/70 dark:to-transparent/30 opacity-90"></div>
        <div class="absolute inset-0 bg-textured opacity-20 mix-blend-overlay"></div>
      </div>

      <!-- Vertical Side Slogans -->
      <div class="absolute left-6 md:left-12 inset-y-0 z-20 hidden sm:flex flex-col justify-between py-32">
        <div class="flex items-center gap-4 origin-left -rotate-90">
          <span class="h-[1px] w-12 bg-primary"></span>
          <span class="font-display uppercase tracking-[0.5em] text-white/40 text-[10px] md:text-xs whitespace-nowrap">Born from Fire</span>
        </div>
        <div class="flex items-center gap-4 origin-left -rotate-90">
          <span class="h-[1px] w-12 bg-primary"></span>
          <span class="font-display uppercase tracking-[0.5em] text-white/40 text-[10px] md:text-xs whitespace-nowrap">Sinfully Sizzling</span>
        </div>
      </div>
      <div class="absolute right-6 md:right-12 inset-y-0 z-20 hidden sm:flex flex-col justify-between py-32 text-right">
        <div class="flex items-center gap-4 origin-right rotate-90">
          <span class="font-display uppercase tracking-[0.5em] text-white/40 text-[10px] md:text-xs whitespace-nowrap">Unleash the Heat</span>
          <span class="h-[1px] w-12 bg-primary"></span>
        </div>
        <div class="flex items-center gap-4 origin-right rotate-90">
          <span class="font-display uppercase tracking-[0.5em] text-white/40 text-[10px] md:text-xs whitespace-nowrap">Raw Perfection</span>
          <span class="h-[1px] w-12 bg-primary"></span>
        </div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center pt-0 text-center min-h-[70vh]">
        <div class="max-w-[2000px] mx-auto flex flex-col items-center -mt-32">
          <!-- Brand Logo H1 -->
          <h1 class="mb-12 group cursor-default transform -rotate-3 -skew-x-[12deg] origin-center mx-auto" id="brand-logo">
            <div class="flex items-end justify-center leading-none">
              <span
                class="font-display font-bold text-6xl sm:text-9xl md:text-[10rem] tracking-tight text-white text-shadow-xl drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] animate-fade-in"
                id="logo-af"
              >
                <span
                  v-for="letter in afLetters"
                  :key="letter.id"
                  class="letter"
                  :class="{ 'letter-pop': letter.popped }"
                  :style="letter.hovered ? { color: '#D90404' } : {}"
                  @mouseover="onLetterMouseover(letter)"
                  @mouseleave="onLetterMouseleave(letter)"
                  @animationend="onLetterAnimEnd(letter)"
                >{{ letter.char }}</span>
              </span>
              <div class="relative">
                <span
                  class="font-display font-bold text-6xl sm:text-9xl md:text-[10rem] tracking-tight text-white text-shadow-xl drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] animate-fade-in"
                  id="logo-i"
                  style="animation-delay: 0.1s;"
                >
                  <span
                    v-for="letter in iLetters"
                    :key="letter.id"
                    class="letter"
                    :class="{ 'letter-pop': letter.popped }"
                    :style="letter.hovered ? { color: '#000000', 'text-shadow': 'none' } : {}"
                    @mouseover="onLetterMouseover(letter)"
                    @mouseleave="onLetterMouseleave(letter)"
                    @animationend="onLetterAnimEnd(letter)"
                  >{{ letter.char }}</span>
                </span>
                <span
                  class="absolute -top-2 sm:-top-4 left-0 w-full h-2.5 sm:h-4 md:h-8 bg-primary rounded-sm shadow-[0_0_40px_rgba(217,4,4,0.8)] animate-fade-in"
                  style="animation-delay: 0.4s"
                ></span>
              </div>
            </div>
            <div
              class="font-script text-4xl sm:text-5xl md:text-6xl mt-1 text-gray-300 dark:text-gray-400 opacity-0 animate-fade-in flex justify-center w-full"
              style="animation-delay: 0.6s"
              id="brand-script"
            >
              <span
                v-for="letter in scriptLetters"
                :key="letter.id"
                class="letter"
                :class="{ 'letter-pop': letter.popped }"
                @mouseover="onLetterMouseover(letter)"
                @mouseleave="onLetterMouseleave(letter)"
                @animationend="onLetterAnimEnd(letter)"
              >{{ letter.char }}</span>
            </div>
          </h1>

          <!-- Daily Special Container (Free Floating) -->
          <div
            class="group/special transition-all duration-500 max-w-6xl transform hover:scale-[1.01] cursor-pointer mb-8 animate-slide-up mx-auto flex flex-col items-center text-center"
            id="daily-special-container"
            :style="{ opacity: dailySpecialContainerOpacity, transform: `translateY(${dailySpecialContainerTranslateY}px)` }"
            @click="cycleSpecial"
          >
            <div class="flex flex-col sm:flex-row items-center gap-8 mb-4 overflow-visible">
              <span
                class="font-display text-[#FFF5E1]/70 font-black text-5xl sm:text-8xl md:text-[9rem] uppercase tracking-tight leading-none select-none text-outline-premium group-hover/special:text-[#FFF5E1]/90 whitespace-nowrap"
                id="daily-special-day"
              >
                <span
                  v-for="letter in dayLetters"
                  :key="letter.id"
                  class="letter"
                  :class="{ 'letter-pop': letter.popped }"
                  :style="letter.hovered ? { color: '#D90404' } : {}"
                  @mouseover="onLetterMouseover(letter)"
                  @mouseleave="onLetterMouseleave(letter)"
                  @animationend="onLetterAnimEnd(letter)"
                >{{ letter.char }}</span>
              </span>
              <div class="flex items-center self-start sm:self-auto gap-2 bg-primary/20 backdrop-blur-md px-3 py-1 border border-primary/30 rounded-full transition-all group-hover/special:bg-primary/40 group-hover/special:border-primary/60">
                <span class="material-icons text-primary text-xs md:text-sm animate-pulse" id="daily-special-icon">{{ currentSpecial.icon }}</span>
                <span class="font-display text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-primary font-bold" id="daily-special-type">{{ currentSpecial.type }}</span>
              </div>
            </div>

            <h2
              class="font-display text-4xl sm:text-6xl md:text-8xl text-white font-black uppercase tracking-normal leading-none mb-6 text-glow-white transition-all group-hover/special:tracking-wider whitespace-nowrap"
              id="daily-special-name"
            >
              <span
                v-for="letter in nameLetters"
                :key="letter.id"
                class="letter"
                :class="{ 'letter-pop': letter.popped }"
                :style="letter.hovered ? { color: '#D90404' } : {}"
                @mouseover="onLetterMouseover(letter)"
                @mouseleave="onLetterMouseleave(letter)"
                @animationend="onLetterAnimEnd(letter)"
              >{{ letter.char }}</span>
            </h2>

            <p
              class="font-body text-sm sm:text-base md:text-xl text-gray-400 mb-4 max-w-3xl font-light border-x border-primary/30 px-16 italic leading-relaxed transition-all group-hover/special:text-gray-200"
              id="daily-special-description"
            >
              {{ currentSpecial.description }}
            </p>

            <div class="flex items-center justify-center gap-2 opacity-0 group-hover/special:opacity-100 transition-opacity">
              <span class="material-icons text-primary text-xs">touch_app</span>
              <span class="font-display text-[10px] uppercase tracking-widest text-primary/80 font-bold">Tap to see tomorrow's special</span>
            </div>
          </div>

          <!-- Horizontal Bold Slogan Bar -->
          <div class="mb-4 flex items-center justify-center gap-6 animate-slide-up opacity-80" style="animation-delay: 0.8s;">
            <span class="font-display uppercase tracking-[0.2em] text-xs text-primary font-bold">Charred</span>
            <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
            <span class="font-display uppercase tracking-[0.2em] text-xs text-white/60">Bold</span>
            <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
            <span class="font-display uppercase tracking-[0.2em] text-xs text-white/60">Authentic</span>
            <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
            <span class="font-display uppercase tracking-[0.2em] text-xs text-primary font-bold">Savage</span>
          </div>

          <div class="fiery-divider mb-8 mx-auto" :class="{ 'animate-divider': dividerAnimated }"></div>
        </div>

        <!-- CTA Buttons Removed to De-bulk Layout -->
      </div>

      <!-- Scroll Arrow -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <span class="material-icons text-white text-4xl opacity-70">keyboard_arrow_down</span>
      </div>
    </section>

    <!-- Signature Highlights Dynamic Staggered Carousel Overlay (75% Overlap) -->
    <div class="relative z-40 max-w-[2400px] mx-auto px-4 -mt-32 sm:-mt-64 md:-mt-80 lg:-mt-96">
      <div class="flex flex-col gap-12 md:gap-32">
        <!-- Row 1 Container: Independent Controls -->
        <div class="relative group/row1">
          <!-- Row 1 Label & Explore -->
          <div class="flex items-end justify-between mb-8 px-3">
            <div>
              <span class="font-script text-2xl text-primary block -mb-1">Chef's Choice</span>
              <h2 class="font-display text-2xl md:text-4xl text-white font-bold uppercase tracking-tighter">Signature Steaks & Platters</h2>
            </div>
            <router-link to="/menu" class="group/link flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white font-bold hover:text-primary transition-all border-b border-white/20 hover:border-primary pb-1">
              <span>Explore More</span>
              <span class="material-icons text-sm transform group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </router-link>
          </div>
          
          <!-- Row 1 Arrows -->
          <button @click="prevRow1" class="absolute -left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-primary text-white border border-white/10 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover/row1:opacity-100 md:-translate-x-4 md:group-hover/row1:translate-x-0 overflow-visible">
            <span class="material-icons">chevron_left</span>
          </button>
          <button @click="nextRow1" class="absolute -right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-primary text-white border border-white/10 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover/row1:opacity-100 md:translate-x-4 md:group-hover/row1:translate-x-0 overflow-visible">
            <span class="material-icons">chevron_right</span>
          </button>

          <!-- Row 1: Signature Steaks & Platters -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              :style="{ transform: `translateX(-${row1Index * 25}%)` }"
              id="highlights-row-1"
            >
              <div 
                v-for="(item, index) in signatureHighlights.slice(0, 10)" 
                :key="item.name"
                class="min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] px-3 animate-reveal"
                :class="{ 'active': revealedHighlights }"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full">
                  <div class="relative h-64 overflow-hidden cursor-pointer" @click="openHighlightModal(item)">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div class="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                      <button @click.stop="handleAddToCart(item)" class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                        <span class="material-icons text-lg">shopping_cart</span>
                      </button>
                      <button @click.stop="openHighlightModal(item)" class="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-2xl">
                        <span class="material-icons text-lg">fullscreen</span>
                      </button>
                    </div>
                    <div class="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                      <span class="material-icons text-primary text-[10px]">star</span>
                      <span class="text-white text-[10px] font-bold tracking-widest">{{ item.rating }}</span>
                    </div>
                    <div class="absolute bottom-5 left-5">
                       <span class="text-primary font-display text-base font-bold tracking-widest bg-black px-2 py-0.5">KSh {{ item.price }}</span>
                    </div>
                  </div>
                  <div class="p-5">
                    <h4 class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors">{{ item.name }}</h4>
                    <p class="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-70">{{ item.description }}</p>
                    <div class="flex items-center gap-2">
                       <button @click="openHighlightModal(item)" class="text-[8px] uppercase tracking-[0.3em] text-primary font-black border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-white transition-all">Details</button>
                       <span class="h-[1px] flex-1 bg-white/5"></span>
                       <button @click="handleAddToCart(item)" class="text-[8px] uppercase tracking-[0.3em] text-white font-bold border border-white/10 px-3 py-1.5 hover:border-primary hover:text-primary transition-all">Order Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2 Container: Independent Controls (Hidden on Mobile) -->
        <div class="relative group/row2 hidden md:block">
          <!-- Row 2 Label & Explore -->
          <div class="flex items-end justify-between mb-8 px-3">
            <div>
              <span class="font-script text-2xl text-primary block -mb-1">Perfect Additions</span>
              <h2 class="font-display text-2xl md:text-4xl text-white font-bold uppercase tracking-tighter">Gourmet Sides & Desserts</h2>
            </div>
            <router-link to="/menu" class="group/link flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white font-bold hover:text-primary transition-all border-b border-white/20 hover:border-primary pb-1">
              <span>Explore More</span>
              <span class="material-icons text-sm transform group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </router-link>
          </div>

          <!-- Row 2 Arrows -->
          <button @click="prevRow2" class="absolute -left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-primary text-white border border-white/10 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover/row2:opacity-100 md:-translate-x-4 md:group-hover/row2:translate-x-0 overflow-visible">
            <span class="material-icons">chevron_left</span>
          </button>
          <button @click="nextRow2" class="absolute -right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-primary text-white border border-white/10 flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover/row2:opacity-100 md:translate-x-4 md:group-hover/row2:translate-x-0 overflow-visible">
            <span class="material-icons">chevron_right</span>
          </button>

          <!-- Row 2: Gourmet Sides & Desserts -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              :style="{ transform: `translateX(-${row2Index * 25}%)` }"
            >
              <div 
                v-for="(item, index) in signatureHighlights.slice(10, 20)" 
                :key="item.name"
                class="min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] px-3 animate-reveal"
                :class="{ 'active': revealedHighlights }"
                :style="{ animationDelay: `${(index + 2) * 100}ms` }"
              >
                <div class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full">
                  <div class="relative h-64 overflow-hidden cursor-pointer" @click="openHighlightModal(item)">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div class="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                      <button class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                        <span class="material-icons text-lg">shopping_cart</span>
                      </button>
                      <button @click.stop="openHighlightModal(item)" class="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-2xl">
                        <span class="material-icons text-lg">fullscreen</span>
                      </button>
                    </div>
                    <div class="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                      <span class="material-icons text-primary text-[10px]">star</span>
                      <span class="text-white text-[10px] font-bold tracking-widest">{{ item.rating }}</span>
                    </div>
                    <div class="absolute bottom-5 left-5">
                       <span class="text-primary font-display text-base font-bold tracking-widest bg-black px-2 py-0.5">KSh {{ item.price }}</span>
                    </div>
                  </div>
                  <div class="p-5">
                    <h4 class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors">{{ item.name }}</h4>
                    <p class="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-70">{{ item.description }}</p>
                    <div class="flex items-center gap-2">
                       <button @click="openHighlightModal(item)" class="text-[8px] uppercase tracking-[0.3em] text-primary font-black border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-white transition-all">Details</button>
                       <span class="h-[1px] flex-1 bg-white/5"></span>
                       <button @click="handleAddToCart(item)" class="text-[8px] uppercase tracking-[0.3em] text-white font-bold border border-white/10 px-3 py-1.5 hover:border-primary hover:text-primary transition-all">Order Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-View Detail Modal -->
    <!-- Pop-up: Highlight Detail Modal (Synced with Menu Style) -->
    <Teleport to="body">
      <Transition name="savage-fade">
        <div v-if="isHighlightModalOpen && selectedHighlight" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" @click="closeHighlightModal"></div>
          
          <div class="relative bg-[#050505] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-modal-pop shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
            <button @click="closeHighlightModal" class="absolute top-8 right-8 text-white/50 hover:text-primary z-50 transition-colors">
              <span class="material-icons text-4xl">close</span>
            </button>

            <div class="flex flex-col md:flex-row h-full">
              <!-- Modal Image Section -->
              <div class="md:w-1/2 h-80 md:h-[600px] overflow-hidden text-left relative">
                <img :src="selectedHighlight.image" :alt="selectedHighlight.name" class="w-full h-full object-cover">
              </div>

              <!-- Modal Details Section -->
              <div class="md:w-1/2 p-10 md:p-16 flex flex-col text-left justify-center">
                <span class="text-primary font-display font-black text-xs uppercase tracking-[0.4em] mb-4">AFI Signature</span>
                <h2 class="font-display text-4xl md:text-5xl text-white font-bold uppercase tracking-tighter mb-6 leading-none">
                  {{ selectedHighlight.name }}
                </h2>
                
                <div class="flex items-center gap-6 mb-8">
                  <span class="text-4xl md:text-5xl font-display font-bold text-primary">KSh {{ selectedHighlight.price }}</span>
                  <div class="h-10 w-[1px] bg-white/10"></div>
                  <div class="flex items-center gap-2">
                     <span class="material-icons text-yellow-500">star</span>
                     <span class="text-xl font-display font-bold">{{ selectedHighlight.rating }}</span>
                  </div>
                </div>

                <p class="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-10 opacity-80">
                  {{ selectedHighlight.description }} Our master chefs slow-cook this specialty cut to ensure the ultimate melt-in-your-mouth experience.
                </p>

                <div class="grid grid-cols-2 gap-4">
                  <button @click="handleAddToCart(selectedHighlight); closeHighlightModal()" class="bg-primary text-white py-5 font-display font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Add to Order
                  </button>
                  <button class="border border-white/20 text-white py-5 font-display font-black uppercase tracking-widest hover:border-primary transition-all">
                    View Sides
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-black relative">
      <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="font-script text-3xl text-primary">Why Choose Us</span>
          <h2 class="font-display text-4xl font-bold text-gray-900 dark:text-white uppercase mt-2">The AFI Standard</h2>
          <div class="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" id="why-choose-us-grid">
          <!-- Card 1 -->
          <div 
            class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full animate-reveal"
            :class="{ 'active': revealedWhyChooseUs }"
            style="animation-delay: 100ms"
          >
            <div class="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Prime Cuts" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-8">
                <span class="material-icons text-primary text-4xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">restaurant</span>
              </div>
            </div>
            <div class="p-8 md:p-10">
              <h3 class="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Prime Cuts</h3>
              <p class="text-gray-400 font-body font-light leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                We source only the highest quality, ethically raised beef, aged to perfection for tenderness and flavor that melts in your mouth.
              </p>
            </div>
          </div>
          <!-- Card 2 -->
          <div 
            class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full animate-reveal"
            :class="{ 'active': revealedWhyChooseUs }"
            style="animation-delay: 250ms"
          >
            <div class="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Master Grilling" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-8">
                <svg class="w-10 h-10 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-6-4.9-7-6.5-13.33zM11.5 19c-1.38 0-2.5-1.12-2.5-2.5 0-1.67 1.12-3 2.5-3s2.5 1.33 2.5 3c0 1.38-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </div>
            <div class="p-8 md:p-10">
              <h3 class="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Master Grilling</h3>
              <p class="text-gray-400 font-body font-light leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                Our chefs are masters of the flame, ensuring every steak is seared to lock in juices and grilled exactly to your preference.
              </p>
            </div>
          </div>
          <!-- Card 3 -->
          <div 
            class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full animate-reveal"
            :class="{ 'active': revealedWhyChooseUs }"
            style="animation-delay: 400ms"
          >
            <div class="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Curated Pairings" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-8">
                <span class="material-icons text-primary text-4xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">wine_bar</span>
              </div>
            </div>
            <div class="p-8 md:p-10">
              <h3 class="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Curated Pairings</h3>
              <p class="text-gray-400 font-body font-light leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                Explore our extensive wine list and signature cocktails, expertly curated to complement the bold flavors of our platters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Savage Specialties: Overlapping Tactical Dossiers -->
    <section class="py-40 bg-black relative overflow-hidden border-t border-white/5" id="specialties-section">
        <!-- Environmental Elements -->
        <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-28 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                <span class="font-script text-3xl text-primary block mb-2">Central Intelligence</span>
                <h2 class="text-5xl md:text-7xl font-display text-white font-black tracking-tight uppercase">
                    Savage <span class="text-primary italic">Specialties</span>
                </h2>
                <div class="w-32 h-1 bg-primary mx-auto mt-6"></div>
            </div>

            <!-- Asymmetric Tactical Bento Grid -->
            <div class="grid grid-cols-12 gap-6 lg:h-[800px]">
                <!-- Master Module: Elite Steaks (Large Primary Asset) -->
                <div class="col-span-12 lg:col-span-8 relative group overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-700 reveal-on-scroll opacity-0 translate-x-[-20px]">
                    <img :src="specialtyCategories[0].image" class="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-80 transition-all duration-[2000ms]">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    
                    <!-- HUD Elements -->
                    <div class="absolute inset-0 p-12 flex flex-col justify-end">
                        <div class="flex items-center gap-4 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <span class="text-primary font-display font-black text-6xl opacity-20 italic">01</span>
                            <div class="h-[1px] w-12 bg-primary/40"></div>
                            <span class="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Master Protocol // SEC_ID: 01-ALPHA</span>
                        </div>
                        
                        <div class="max-w-xl">
                            <h3 class="text-white font-display text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter group-hover:text-primary transition-colors">{{ specialtyCategories[0].title }}</h3>
                            <p class="text-gray-300 text-lg font-light italic leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                "{{ specialtyCategories[0].description }}"
                            </p>
                            <div class="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                <span v-for="item in specialtyCategories[0].items" :key="item" class="px-4 py-1.5 bg-primary/20 border border-primary/40 text-[10px] font-black text-primary uppercase tracking-widest">{{ item }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Side Trace -->
                    <div class="absolute top-0 right-0 w-24 h-full border-l border-white/5 bg-white/2 pointer-events-none hidden lg:block">
                        <div class="absolute top-1/2 left-1/2 -rotate-90 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase">
                            Operational Asset_01 // AFI_EXTRACT
                        </div>
                    </div>
                </div>

                <!-- Secondary Stacked Modules -->
                <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <!-- Module 2: Deployment Platters -->
                    <div class="flex-1 relative group overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-700 reveal-on-scroll opacity-0 translate-x-[20px]" style="transition-delay: 200ms">
                        <img :src="specialtyCategories[1].image" class="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-[2000ms]">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        
                        <div class="absolute inset-0 p-10 flex flex-col justify-end">
                            <div class="mb-4">
                                <span class="text-primary font-display font-black text-xs uppercase tracking-widest block mb-1">Asset 02</span>
                                <h4 class="text-white font-display text-3xl font-black uppercase group-hover:text-primary transition-colors">{{ specialtyCategories[1].title }}</h4>
                            </div>
                            <div class="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                <div v-for="item in specialtyCategories[1].items" :key="item" class="flex items-center gap-3">
                                    <div class="w-1 h-3 bg-primary/40 transition-all group-hover:bg-primary"></div>
                                    <span class="text-[9px] text-gray-400 font-black uppercase tracking-widest">{{ item }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Module 3: Precision Butchery -->
                    <div class="flex-1 relative group overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-700 reveal-on-scroll opacity-0 translate-x-[20px]" style="transition-delay: 400ms">
                        <img :src="specialtyCategories[2].image" class="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-[2000ms]">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        <div class="absolute inset-0 p-10 flex flex-col justify-end">
                            <div class="mb-6">
                                <span class="text-primary font-display font-black text-xs uppercase tracking-widest block mb-1">Asset 03</span>
                                <h4 class="text-white font-display text-3xl font-black uppercase group-hover:text-primary transition-colors text-gradient">{{ specialtyCategories[2].title }}</h4>
                            </div>
                            
                            <button class="w-full py-4 bg-primary hover:bg-white text-white hover:text-black text-[10px] font-black uppercase tracking-[0.4em] transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                                Initiate extraction
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Savage Service Protocols: Tactical Timeline -->
    <section class="py-32 bg-black relative overflow-hidden border-t border-white/5">
        <!-- Central Timeline Track -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block">
            <div class="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-transparent h-1/2"></div>
        </div>

        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="text-center mb-24 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                <span class="font-script text-3xl text-primary block mb-2">Operational Workflow</span>
                <h2 class="text-5xl md:text-7xl font-display text-white mb-4 tracking-tight uppercase">Savage <span class="text-primary italic">Lifecycle</span></h2>
                <div class="w-32 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div class="space-y-32">
                <div v-for="(service, index) in savageServices" :key="service.title" 
                     class="group relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24 reveal-on-scroll opacity-0 translate-y-24 transition-all duration-1000"
                     :class="index % 2 === 0 ? '' : 'lg:flex-row-reverse'"
                     :style="{ transitionDelay: (index * 200) + 'ms' }">
                    
                    <!-- Timeline Node -->
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-primary/40 rounded-full hidden lg:flex items-center justify-center z-20">
                        <div class="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(217,4,4,1)]"></div>
                        <span class="absolute -top-10 text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">Stage 0{{ index + 1 }}</span>
                    </div>

                    <!-- Large Image Card -->
                    <div class="w-full lg:w-1/2 group/img relative aspect-[16/10] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:border-primary/40 transition-colors duration-500">
                        <img :src="service.image" class="w-full h-full object-cover grayscale opacity-40 group-hover/img:scale-110 group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all duration-[2000ms]">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        
                        <!-- Scanner Effect -->
                        <div class="absolute inset-x-0 h-[1px] bg-primary shadow-[0_0_20px_rgba(217,4,4,0.8)] animate-scanner opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                        
                        <!-- Icon Overlay -->
                        <div class="absolute top-8 right-8 w-16 h-16 bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover/img:border-primary/40 transition-colors">
                            <span class="material-icons text-primary text-3xl group-hover/img:scale-110 transition-transform">{{ service.icon }}</span>
                        </div>

                        <!-- Corner Trace -->
                        <div class="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 group-hover/img:border-primary/40 transition-colors"></div>
                    </div>

                    <!-- Content Card -->
                    <div class="w-full lg:w-1/2 text-center lg:text-left">
                        <span class="text-primary font-display font-black text-xs uppercase tracking-[0.5em] mb-4 block">Intelligence Node</span>
                        <h3 class="font-display text-4xl md:text-5xl font-black text-white uppercase mb-6 tracking-tight group-hover:text-primary transition-all">
                            {{ service.title }}
                        </h3>
                        <p class="text-lg text-gray-400 font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 group-hover:text-gray-300 transition-colors">
                            {{ service.desc }}
                        </p>
                        <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <button class="px-10 py-4 bg-primary text-white font-display text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_15px_30px_rgba(217,4,4,0.3)]">
                                Initiate Protocol
                            </button>
                            <span class="text-[9px] font-black text-gray-700 uppercase tracking-widest bg-white/5 border border-white/5 px-4 py-4">Secured Feed Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Savage Legacy: Story Section -->
    <section class="bg-black py-28 relative overflow-hidden border-t border-white/5">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <span class="font-script text-3xl text-primary block mb-2">Our Ritual</span>
                <h2 class="text-5xl md:text-6xl font-display text-white mb-4 tracking-tight uppercase">Savage <span class="text-primary italic">Legacy</span></h2>
                <div class="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div class="space-y-32">
                <!-- Section 1: The Flame -->
                <section class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <div class="order-2 lg:order-1 text-left">
                        <span class="text-primary font-display font-black text-xs uppercase tracking-[0.4em] mb-4 block">Where it Began</span>
                        <h2 class="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-8">The <span class="text-primary italic">Eternal</span> Flame</h2>
                        <p class="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 italic">
                            "Savage wasn't born in a kitchen, it was forged in the fire. We believe that meat is a ritual, not just a meal. Our founders sought to bring back the raw, primal essence of the hunt."
                        </p>
                        <div class="flex items-center gap-6">
                            <div class="w-16 h-[1px] bg-primary"></div>
                            <span class="font-script text-2xl text-white">Founder, AFI</span>
                        </div>
                    </div>
                    <div class="order-1 lg:order-2 relative aspect-[16/10] overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=1200&q=80" 
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 border border-white/10 group-hover:border-primary/50 transition-colors m-4"></div>
                    </div>
                </section>

                <!-- Section 2: Raw Precision -->
                <section class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <div class="relative aspect-[16/10] overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=1200&q=80" 
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 border border-white/10 group-hover:border-primary/50 transition-colors m-4"></div>
                    </div>
                    <div class="text-left">
                        <span class="text-primary font-display font-black text-xs uppercase tracking-[0.4em] mb-4 block">Technical Mastery</span>
                        <h2 class="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-8">Raw <span class="text-primary italic">Precision</span></h2>
                        <p class="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8">
                            Every cut is curated and monitored in our salt-brick vaults. We orchestrate a symphony of smoke, heat, and time.
                        </p>
                        <ul class="space-y-4 text-white font-display text-xs uppercase tracking-widest">
                            <li class="flex items-center gap-4"><span class="w-2 h-2 bg-primary"></span> 45-Day Dry Aging Vault</li>
                            <li class="flex items-center gap-4"><span class="w-2 h-2 bg-primary"></span> Artisanal Hickory Smoking</li>
                            <li class="flex items-center gap-4"><span class="w-2 h-2 bg-primary"></span> Signature Savage Rub</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    </section>
    <header class="relative bg-black py-12 overflow-hidden border-t border-white/5 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-600" id="locations">
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

    <section class="bg-black py-20 relative overflow-hidden reveal-on-scroll opacity-0 translate-y-12 transition-all duration-600">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Full Width Map Header -->
            <div class="mb-16 h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-2xl border border-white/10 relative bg-black group/map">
                <div class="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-none text-white shadow-2xl max-w-xs transition-transform duration-500 group/map:translate-x-2 text-left">
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
                <div class="absolute group/map cursor-pointer" :style="flameStyle">
                  <div class="relative group cursor-pointer">
                    <svg class="w-16 h-16 text-primary drop-shadow-[0_0_20px_rgba(217,4,4,0.8)] animate-bounce"
                         viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-6-4.9-7-6.5-13.33zM11.5 19c-1.38 0-2.5-1.12-2.5-2.5 0-1.67 1.12-3 2.5-3s2.5 1.33 2.5 3c0 1.38-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
            </div>

            <!-- Four Column Branch Grid with Staggered Reveal -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4 sm:px-0">
                <div v-for="(branch, index) in branchDetails" :key="branch.name" 
                     class="bg-black/40 backdrop-blur-xl border border-white/10 border-l-4 transition-all duration-500 group flex flex-col text-left reveal-on-scroll opacity-0 translate-y-16 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,4,4,0.15)] hover:bg-black/60"
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
    <!-- Locations Section End -->

    <!-- Savage Tales: Testimonials -->
    <section class="bg-black py-24 relative overflow-hidden reveal-on-scroll opacity-0 translate-y-12 transition-all duration-600 border-t border-white/5">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <span class="font-script text-3xl text-primary block mb-2">Voice of the Tribe</span>
                <h2 class="text-5xl md:text-7xl font-display text-white mb-4 tracking-tight uppercase">Savage <span class="text-primary italic">Tales</span></h2>
                <div class="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                <div v-for="(t, index) in testimonials" :key="t.name" 
                     class="bg-black/95 backdrop-blur-3xl border border-white/10 p-10 flex flex-col group hover:border-primary/60 transition-all duration-500 reveal-on-scroll opacity-0 translate-y-12"
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

    <!-- Footer -->
    <AppFooter />

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=Inter:wght@300;400;700;900&display=swap');

.font-display { font-family: 'Outfit', sans-serif; }
.font-body { font-family: 'Inter', sans-serif; }

/* ── Textured background ─────────────────────────────────────────────────── */
.bg-textured {
  background-color: #000000;
  background-image: url(https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80);
}

/* ── Text shadows ──────────────────────────────────────────────────────────── */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
.text-shadow-xl {
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.9);
}

/* ── Savage Fade Transition ────────────────────────────────────────────────── */
.savage-fade-enter-active,
.savage-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.savage-fade-enter-from,
.savage-fade-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(20px);
  filter: blur(10px);
}

/* ── Carousel Improvements ────────────────────────────────────────────────── */
.group\/carousel-main:hover .group\/carousel-main\:opacity-100 {
  opacity: 1;
}

/* ── Hero animations ───────────────────────────────────────────────────────── */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}
.animate-slide-up {
  animation: slide-up 1s ease-out 0.5s forwards;
  opacity: 0;
}

@keyframes scanner {
  0% { top: -10%; }
  100% { top: 110%; }
}

.animate-scanner {
  animation: scanner 3s linear infinite;
}

@keyframes scanner-horizontal {
  0% { left: -10%; }
  100% { left: 110%; }
}

.animate-scanner-horizontal {
  animation: scanner-horizontal 2.5s linear infinite;
}

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-modal-pop {
  animation: modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* ── Reveal Animation ──────────────────────────────────────────────────────── */
@keyframes reveal-card {
  0%   { opacity: 0; transform: translateY(60px) scale(0.95); filter: blur(10px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
.animate-reveal {
  opacity: 0;
  will-change: transform, opacity, filter;
}
.animate-reveal.active {
  animation: reveal-card 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

/* ── Glow effect ───────────────────────────────────────────────────────────── */
@keyframes glow {
  0%,  100% { text-shadow: 0 0 15px rgba(217,4,4,0.6), 0 0 30px rgba(217,4,4,0.4); }
  50%       { text-shadow: 0 0 30px rgba(217,4,4,0.9), 0 0 60px rgba(217,4,4,0.6); }
}
.text-glow-primary {
  animation: glow 3s ease-in-out infinite;
}

/* ── Outlined premium text ─────────────────────────────────────────────────── */
.text-outline-premium {
  -webkit-text-stroke: 1.5px rgba(255, 245, 225, 0.6);
  color: transparent;
  letter-spacing: -0.05em;
}

/* ── Daily special container ───────────────────────────────────────────────── */
.daily-special-container {
  cursor: pointer;
  user-select: none;
}

/* ── Letter animation ──────────────────────────────────────────────────────── */
.letter {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
}
.letter:hover {
  transform: translateY(-15px) scale(1.2) rotate(5deg);
  color: #D90404;
}
@keyframes letter-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
.letter-pop {
  animation: letter-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ── Embers ────────────────────────────────────────────────────────────────── */
.embers-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}
.ember {
  position: absolute;
  background: #D90404;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.5;
  animation: float-up var(--duration) linear infinite;
}
@keyframes float-up {
  0%   { transform: translateY(110vh) translateX(0) rotate(0deg); opacity: 0; }
  20%  { opacity: 0.7; }
  100% { transform: translateY(-10vh) translateX(100px) rotate(360deg); opacity: 0; }
}

/* ── Fiery divider ─────────────────────────────────────────────────────────── */
.fiery-divider {
  height: 2px;
  background: linear-gradient(90deg, #D90404 0%, transparent 100%);
  box-shadow: 0 0 20px rgba(217, 4, 4, 0.6);
  width: 0;
  transition: width 1.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.animate-divider {
  width: 100%;
}

/* ── Special badge ─────────────────────────────────────────────────────────── */
.special-badge {
  background: linear-gradient(90deg, #D90404 0%, #ff4d4d 100%);
  clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
}

/* ── Scrollbar hide ────────────────────────────────────────────────────────── */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ── Nav fade mask on mobile ───────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .nav-mask {
    mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
  }
}

/* ── Map Styling ─────────────────────────────────────────────────────────── */
.map-container iframe {
  filter: grayscale(100%) invert(92%) contrast(83%);
  transition: filter 0.5s ease;
}
.group\/map:hover .map-container iframe {
  filter: grayscale(80%) invert(90%) contrast(90%);
}

.flame-text {
  background: -webkit-linear-gradient(#D90404, #ff4d4d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Scroll progress bar ───────────────────────────────────────────────────── */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #D90404, #ff4d4d);
  z-index: 1000;
  box-shadow: 0 0 15px rgba(217, 4, 4, 0.8);
  transition: width 0.1s ease;
}

/* ── Scroll top button visible state ──────────────────────────────────────── */
#scroll-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* ── Smooth scroll ─────────────────────────────────────────────────────────── */
:global(html) {
  scroll-behavior: smooth;
}

/* ── Scroll Reveal Hooks ────────────────────────────────────────────────────── */
.reveal-active {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Toast Animations */
.toast-slide-enter-active, .toast-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(50%) scale(0.8);
  filter: blur(8px);
}

@keyframes toastProgress {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
.animate-toast-progress {
  animation: toastProgress 3s linear forwards;
}
</style>

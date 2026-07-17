<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppFooter from './AppFooter.vue'

const router = useRouter()

// ─── Command State ───────────────────────────────────────────────────────────
const activeTab = ref('overview')
const searchQuery = ref('')
const selectedLocation = ref('Kikuyu HQ')
const locations = ['Kikuyu HQ', 'Westlands Base', 'Muthiga Sector', 'CBD Hub']
const mobileMenuOpen = ref(false)

const showNotificationsDropdown = ref(false)
const showCartDropdown = ref(false)
const notifications = ref([
    { id: 1, text: "Tactical Sear Protocol updated at Westlands Base.", time: "10m ago", read: false },
    { id: 2, text: "A5 Wagyu reserves are running low in Kikuyu sector.", time: "1h ago", read: false },
    { id: 3, text: "Reservation for the Obsidian Room confirmed.", time: "3h ago", read: true }
])

const closeDropdowns = () => {
    showNotificationsDropdown.value = false
    showCartDropdown.value = false
}

const currentDay = computed(() => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
})

const userRank = ref('High Ritualist')
const memberId = ref('AFI-0982-SAVAGE')

const handleLogout = () => {
    router.push('/')
}

// ─── Dashboard Navigation ───────────────────────────────────────────────────
const navItems = [
  { id: 'overview', label: 'Overview', icon: 'grid_view' },
  { id: 'menu', label: 'Menu', icon: 'restaurant_menu' },
  { id: 'transmissions', label: 'Uplink', icon: 'sensors' },
  { id: 'reservations', label: 'Reservations', icon: 'event_seat' },
  { id: 'events', label: 'Events', icon: 'celebration' },
  { id: 'rituals', label: 'Cart', icon: 'shopping_cart' }
]

// ─── Intelligence Content ───────────────────────────────────────────────────
const mealOfTheDay = {
    name: "The Obsidian Ribeye",
    desc: "45-day dry aged, crusted in tactical spices and finished over active embers.",
    price: "KSh 6,500",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
}

const topSavages = [
    { name: "General Meat", score: "45,200", rank: 1 },
    { name: "Sizzle King", score: "38,900", rank: 2 },
    { name: "Mbugua AFI", score: "12,500", rank: 3 }
]

const operationalAds = [
    { title: "Savage Sunday", subtitle: "Platter Ritual", price: "KSh 4,500", cta: "Pre-Book", type: "ritual" },
    { title: "VIP Vault Pass", subtitle: "Private Table", price: "RESERVE", cta: "Secure Pass", type: "exclusive" },
    { title: "Flame Mastery", subtitle: "Tactical Gear", price: "OFFERS", cta: "View Gear", type: "gear" }
]

const operationalReminders = [
    { title: "Dry-Aged", subtitle: "Prime Vault", highlight: "20% OFF RAW", cta: "Claim", type: "offer" },
    { title: "Loyalty Pulse", subtitle: "Flame Credits", highlight: "500 XP EARNED", cta: "View", type: "status" },
    { title: "Kitchen Uplink", subtitle: "Live Updates", highlight: "ORDER READY", cta: "Track", type: "alert" }
]

const currentAdIndex = ref(0)
const currentReminderIndex = ref(0)

const intelligenceFeed = [
    { title: "Wagyu Reserves Secured", summary: "Emergency shipment of A5 grade marbling has arrived at Kikuyu HQ. Limited yield available.", timestamp: "12m ago", category: "LOGISTICS" },
    { title: "New Smokehouse Protocol", subtitle: "Hyper-local oak integrated into Muthiga sector flavor profiles.", timestamp: "2h ago", category: "FLAVOR" },
    { title: "Market Alert: Lamb Shortage", subtitle: "Supply lines from the Highlands are experiencing tactical delays.", timestamp: "4h ago", category: "SUPPLY" }
]

const marketUpdates = [
    { label: "Dry-Aged Ribeye", price: "KSh 2,800/KG", trend: "+5%", status: "UP" },
    { label: "Highland Lamb", price: "KSh 3,800/KG", trend: "-2%", status: "DOWN" },
    { label: "Artisanal Sausage", price: "KSh 1,200/KG", trend: "0%", status: "STABLE" }
]

const savageBriefs = [
  { id: 1, title: 'The Sear Secret', desc: 'Maintain ember temperature at 450°C for the ultimate crust ritual.' },
  { id: 2, title: 'Blade Discipline', desc: 'Sharpen knives every 12 operations to ensure cellular integrity of high-grade cuts.' }
]

const intelligenceAds = [
    { title: "Tactical Aprons", desc: "Fire-resistant gear for the extreme ritualist.", cta: "Equip", image: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&w=400&q=80" },
    { title: "Savage Salts", desc: "Infused with volcanic minerals for superior sear.", cta: "Stock Up", image: "https://images.unsplash.com/photo-1541014741259-df549cae7744?auto=format&fit=crop&w=400&q=80" },
    { title: "Logistics Live: City Wide", desc: "Our couriers have now successfully mapped all major city sectors for high-speed meat extraction.", cta: "Trace Hub", image: "https://images.unsplash.com/photo-1512412023979-5df16316aa11?auto=format&fit=crop&w=600&q=80" }
]

const deploymentSteps = [
    { title: 'Initialize Sector', desc: 'Select between Dine-In Hub or Butchery Deck for yields.', img: 'https://images.unsplash.com/photo-1551218808-94e220e0341c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Identify Targets', desc: 'Isolate flavor profiles via filters or tactical search.', img: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=600&q=80' },
    { title: 'Execute Ritual', desc: 'Add fragments and proceed to the Checkout Uplink.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
    { title: 'Track Payload', desc: 'Monitor the extraction logistics for live ETA telemetry.', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' }
]

const rotateAds = () => {
    currentAdIndex.value = (currentAdIndex.value + 1) % operationalAds.length
    currentReminderIndex.value = (currentReminderIndex.value + 1) % operationalReminders.length
}

// ─── Menu Data ──────────────────────────────────────────────────────────────
const categories = computed(() => menuMode.value === 'dine' 
    ? ['All', 'Starters', 'Signature', 'Premium', 'Sides', 'The Bar']
    : ['All', 'Beef', 'Lamb', 'Pork', 'Poultry', 'Sausages', 'Dry-Aged']
)

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
const activeMenuCategory = ref('All')
const menuMode = ref('dine') // 'dine' or 'butchery'

const butcheryItems = [
    { name: 'Prime Ribeye Cut', price: 2800, category: 'Beef', unit: 'KG', image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80', description: 'Hand-selected premium ribeye, marbled to perfection.' },
    { name: 'AFI Sirloin Block', price: 2400, category: 'Beef', unit: 'KG', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80', description: 'Lean, tender sirloin aged for 21 days.' },
    { name: 'Tactical T-Bone', price: 3200, category: 'Beef', unit: 'KG', image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80', description: 'The best of both worlds: Fillet and Sirloin on the bone.' },
    { name: 'Savage Tomahawk', price: 4500, category: 'Beef', unit: 'KG', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80', description: 'Long-bone ribeye for the ultimate grilling ritual.' },
    { name: 'Highlands Lamb Rack', price: 3800, category: 'Lamb', unit: 'KG', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80', description: 'Spring lamb, tender and full of flavor.' },
    { name: 'Obsidian Pork Chops', price: 1800, category: 'Pork', unit: 'KG', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80', description: 'Thick-cut, bone-in pork chops.' },
    { name: 'Artisanal Beef Sausage', price: 1200, category: 'Sausages', unit: 'KG', image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ff36ff?auto=format&fit=crop&w=800&q=80', description: 'Spiced with our signature AFI rub.' },
    { name: 'Smoked Garlic Wurst', price: 1400, category: 'Sausages', unit: 'KG', image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ff36ff?auto=format&fit=crop&w=800&q=80', description: 'Cold-smoked over hickory for 12 hours.' },
    { name: '45-Day Dry Aged Rib', price: 5800, category: 'Dry-Aged', unit: 'KG', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', description: 'The pinnacle of flavor. Concentrated beef excellence.' }
]
const allItems = [
  // STARTERS (16 Items)
  { name: 'Bourbon Wings', price: 1200, category: 'Starters', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tactical Sliders', price: 1500, category: 'Starters', image: 'https://images.unsplash.com/photo-1550317144-b38c1a60a741?auto=format&fit=crop&w=800&q=80' },
  { name: 'Crispy Calamari', price: 1800, category: 'Starters', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80' },
  { name: 'Flambéed Chorizo', price: 1400, category: 'Starters', image: 'https://images.unsplash.com/photo-1541014741259-df549cae7744?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bone Marrow', price: 2200, category: 'Starters', image: 'https://images.unsplash.com/photo-1559144490-8348bc627748?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tuna Tartare', price: 2500, category: 'Starters', image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dynamite Shrimp', price: 1900, category: 'Starters', image: 'https://images.unsplash.com/photo-1559742811-822873691df0?auto=format&fit=crop&w=800&q=80' },
  { name: 'Truffle Croquettes', price: 1600, category: 'Starters', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smoked Salmon Dip', price: 1450, category: 'Starters', image: 'https://images.unsplash.com/photo-1510431199140-619f798b1031?auto=format&fit=crop&w=800&q=80' },
  { name: 'Beef Carpaccio', price: 2400, category: 'Starters', image: 'https://images.unsplash.com/photo-1512485600893-b08bc1ad59b1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Garlic Escargot', price: 2100, category: 'Starters', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ahi Poke Bowl', price: 1850, category: 'Starters', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Charred Octopus', price: 2600, category: 'Starters', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80' },
  { name: 'Wild Mushroom', price: 1300, category: 'Starters', image: 'https://images.unsplash.com/photo-1563815049112-2f232ff4ee81?auto=format&fit=crop&w=800&q=80' },
  { name: 'Oyster Shuck', price: 3200, category: 'Starters', image: 'https://images.unsplash.com/photo-1528667523992-0b3152dd0408?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pork Belly Pops', price: 1700, category: 'Starters', image: 'https://images.unsplash.com/photo-1544124499-173c62ba81b9?auto=format&fit=crop&w=800&q=80' },

  // SIGNATURE (16 Items)
  { name: 'The AFI Tomahawk', price: 12500, category: 'Signature', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Savage T-Bone', price: 8500, category: 'Signature', image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ghost Chili Ribs', price: 4200, category: 'Signature', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { name: 'Obsidion Lamb', price: 5800, category: 'Signature', image: 'https://images.unsplash.com/photo-1602491993917-03612508152c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Firebrand Fillet', price: 4500, category: 'Signature', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blackened Sirloin', price: 3800, category: 'Signature', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Ritual Platter', price: 15000, category: 'Signature', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dry Aged Porter', price: 9200, category: 'Signature', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chimichurri Flat', price: 3400, category: 'Signature', image: 'https://images.unsplash.com/photo-1534080333722-c5d19117ca12?auto=format&fit=crop&w=800&q=80' },
  { name: 'Peppercorn Rump', price: 3600, category: 'Signature', image: 'https://images.unsplash.com/photo-1593036413264-eb5c798fe376?auto=format&fit=crop&w=800&q=80' },
  { name: 'Wagyu Burger X', price: 2800, category: 'Signature', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80' },
  { name: 'Flame Short Ribs', price: 3900, category: 'Signature', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { name: 'Charcoal Chicken', price: 2400, category: 'Signature', image: 'https://images.unsplash.com/photo-1598515214211-16812833132d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smoked Brisket', price: 4100, category: 'Signature', image: 'https://images.unsplash.com/photo-1529193591184-b1d5c22509dc?auto=format&fit=crop&w=800&q=80' },
  { name: 'Spicy Lamb Rack', price: 6200, category: 'Signature', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ribeye Tagliata', price: 4300, category: 'Signature', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80' },

  // PREMIUM (16 Items)
  { name: 'A5 Wagyu Strip', price: 18500, category: 'Premium', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=800&q=80' },
  { name: 'Gold Leaf Ribeye', price: 25000, category: 'Premium', image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lobster Thermidor', price: 9500, category: 'Premium', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Iberico Chop', price: 7200, category: 'Premium', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80' },
  { name: 'Beluga Caviar', price: 12000, category: 'Premium', image: 'https://images.unsplash.com/photo-1519056123431-7ad6387d8840?auto=format&fit=crop&w=800&q=80' },
  { name: 'Truffle Wagyu', price: 19500, category: 'Premium', image: 'https://images.unsplash.com/photo-1628102476605-e991264c8c7f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bone-in Venison', price: 6800, category: 'Premium', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Foie Gras Sizzle', price: 4800, category: 'Premium', image: 'https://images.unsplash.com/photo-1582294125741-657d476f7b11?auto=format&fit=crop&w=800&q=80' },
  { name: 'Snow Wagyu Cube', price: 22000, category: 'Premium', image: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?auto=format&fit=crop&w=800&q=80' },
  { name: 'King Crab Leg', price: 11000, category: 'Premium', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80' },
  { name: 'Oshima Wagyu', price: 28000, category: 'Premium', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=800&q=80' },
  { name: 'Truffle Lobster', price: 13500, category: 'Premium', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Japanese A5 Tataki', price: 14000, category: 'Premium', image: 'https://images.unsplash.com/photo-1512485600893-b08bc1ad59b1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Wild Boar Rack', price: 7500, category: 'Premium', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dry Aged Duck', price: 5900, category: 'Premium', image: 'https://images.unsplash.com/photo-1513267048331-5611cad82e41?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kobe Reserve', price: 35000, category: 'Premium', image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80' },

  // SIDES (16 Items)
  { name: 'Truffle Mac', price: 1400, category: 'Sides', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Garlic Mash', price: 800, category: 'Sides', image: 'https://images.unsplash.com/photo-1621841957884-1210fe19d66d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Charred Asparagus', price: 1100, category: 'Sides', image: 'https://images.unsplash.com/photo-1515471209610-dae1c91581c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Creamed Spinach', price: 900, category: 'Sides', image: 'https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fire Fries', price: 700, category: 'Sides', image: 'https://images.unsplash.com/photo-1573082142393-8636906a6c24?auto=format&fit=crop&w=800&q=80' },
  { name: 'Grilled Corn', price: 850, category: 'Sides', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dirty Rice', price: 950, category: 'Sides', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80' },
  { name: 'Honey Glazed Carrots', price: 850, category: 'Sides', image: 'https://images.unsplash.com/photo-1598170845058-32b996a7042e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sweet Potato Wedges', price: 750, category: 'Sides', image: 'https://images.unsplash.com/photo-1544124499-173c62ba81b9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Crispy Sprouts', price: 1150, category: 'Sides', image: 'https://images.unsplash.com/photo-1515471209610-dae1c91581c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Loaded Jacket', price: 1200, category: 'Sides', image: 'https://images.unsplash.com/photo-1621841957884-1210fe19d66d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Broccoli Flambé', price: 950, category: 'Sides', image: 'https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Onion Shrapnel', price: 850, category: 'Sides', image: 'https://images.unsplash.com/photo-1573082142393-8636906a6c24?auto=format&fit=crop&w=800&q=80' },
  { name: 'Polenta Chips', price: 1300, category: 'Sides', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80' },
  { name: 'House Salad', price: 900, category: 'Sides', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tactical Slaw', price: 700, category: 'Sides', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
  
  // BAR (16 Items)
  { name: 'Smoked Old Fashion', price: 1800, category: 'The Bar', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tactical Negroni', price: 1600, category: 'The Bar', image: 'https://images.unsplash.com/photo-1551538827-9c049ec21361?auto=format&fit=crop&w=800&q=80' },
  { name: 'Obsidian Gin', price: 1400, category: 'The Bar', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dragon Martini', price: 2000, category: 'The Bar', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vulcan Margarita', price: 1500, category: 'The Bar', image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smoked Porter Pint', price: 900, category: 'The Bar', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80' },
  { name: 'Highball Ember', price: 1700, category: 'The Bar', image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&w=800&q=80' },
  { name: 'AFI Private Reserve', price: 45000, category: 'The Bar', image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fire Whiskey Cold', price: 2100, category: 'The Bar', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blood Orange Sip', price: 1550, category: 'The Bar', image: 'https://images.unsplash.com/photo-1551538827-9c049ec21361?auto=format&fit=crop&w=800&q=80' },
  { name: 'Charcoal Lemonade', price: 800, category: 'The Bar', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ritual Red Wine', price: 5400, category: 'The Bar', image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80' },
  { name: 'Double Ember Shot', price: 1200, category: 'The Bar', image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Midnight Mule', price: 1750, category: 'The Bar', image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&w=800&q=80' },
  { name: 'AFI Craft Ale', price: 950, category: 'The Bar', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80' },
  { name: 'Strategic Spritz', price: 1900, category: 'The Bar', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80' }
]

const filteredItems = computed(() => {
    let items = menuMode.value === 'dine' ? allItems : butcheryItems
    if (activeMenuCategory.value !== 'All') {
        items = items.filter(i => i.category === activeMenuCategory.value)
    }
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        items = items.filter(i => 
            i.name.toLowerCase().includes(query) || 
            (i.category && i.category.toLowerCase().includes(query))
        )
    }
    return items
})

// ─── Transmissions (UGC Uplink) ───
const isUploading = ref(false)
const uploadProgress = ref(0)

const recentUplinks = [
    { member: 'General Meat', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', timestamp: '2m ago' },
    { member: 'Sizzle King', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', timestamp: '15m ago' },
    { member: 'Steak Hunter', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=400&q=80', timestamp: '1h ago' },
    { member: 'Fire Master', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', timestamp: '3h ago' },
    { member: 'Blade Runner', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', timestamp: '4h ago' },
    { member: 'Grill Ghost', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=400&q=80', timestamp: '6h ago' },
    { member: 'T-Bone Titan', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=400&q=80', timestamp: '12h ago' },
    { member: 'Marbling King', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=400&q=80', timestamp: '1d ago' }
]

const pastUplinks = [
    { id: 'TX-01', name: 'The Tomahawk Ritual', date: '2024-03-10', status: 'Verified', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=400&q=80' },
    { id: 'TX-02', name: 'Obsidian Night', date: '2024-03-08', status: 'Verified', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80' }
]

const draftedUplinks = [
    { name: 'Unfinished Sizzle', size: '42.5 MB', type: '4K MP4' },
    { name: 'Platter Recon', size: '12.8 MB', type: 'RAW JPG' }
]

const uplinkStats = [
    { label: 'Total Transmissions', value: '1,240' },
    { label: 'Network Stability', value: '99.9%' },
    { label: 'Credits Generated', value: '85.4K' }
]

const handleUpload = () => {
    isUploading.value = true
    uploadProgress.value = 0
    const interval = setInterval(() => {
        uploadProgress.value += 10
        if (uploadProgress.value >= 100) { 
            clearInterval(interval)
            isUploading.value = false 
        }
    }, 200)
}

// ─── Reservations Data & State ──────────────────────────────────────────────
const reservationTabs = [
    { id: 'upcoming', label: 'Upcoming Deployments' },
    { id: 'past', label: 'Archived Rituals' },
    { id: 'new', label: 'Schedule New extraction' }
]
const activeResTab = ref('upcoming')

const eventFilters = ['All Operations', 'Live Intelligence', 'Tasting Rituals', 'Exclusive Access', 'Culinary Collabs', 'Underground Network']
const activeEventFilter = ref('All Operations')

const specialEvents = ref([
    { id: 1, title: 'Obsidian Fire Tasting', date: '2026-04-10', category: 'Tasting Rituals', description: 'Exclusive 5-course Wagyu experience focusing on primal cuts.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Jazz & Marrow', date: '2026-04-15', category: 'Live Intelligence', description: 'Rhythm and premium bone marrow serving with live acoustics.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Chef\'s Vault Reveal', date: '2026-04-20', category: 'Exclusive Access', description: 'Secret menu unboxing restricted for top tier ranks.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Flame Mastery Class', date: '2026-04-25', category: 'Tasting Rituals', description: 'Master the art of charcoal grilling with General Meat.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Oshima Wagyu Night', date: '2026-05-02', category: 'Exclusive Access', description: 'Imported cuts directly from Japan for a one-night deployment.', image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Acoustic Sirloin', date: '2026-05-08', category: 'Live Intelligence', description: 'Live strings alongside our signature blackened sirloin.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80' },
    { id: 7, title: 'Whiskey & Ember', date: '2026-05-15', category: 'Tasting Rituals', description: 'Pairing aged bourbon with slow-smoked meats in the dark room.', image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&w=800&q=80' },
    { id: 8, title: 'The Platinum Feast', date: '2026-05-22', category: 'Exclusive Access', description: 'The ultimate VIP table takeover with limitless cuts.', image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80' },
    { id: 9, title: 'Midnight Butcher', date: '2026-06-05', category: 'Underground Network', description: 'After-hours clandestine carving and high-stakes steaks.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80' },
    { id: 10, title: 'Global Grill Exchange', date: '2026-06-12', category: 'Culinary Collabs', description: 'Visiting savages from Texas deploy their smoke methods.', image: 'https://images.unsplash.com/photo-1602491993917-03612508152c?auto=format&fit=crop&w=800&q=80' },
    { id: 11, title: 'Truffle Recon', date: '2026-06-18', category: 'Tasting Rituals', description: 'Infusing black truffles into our A5 Wagyu for maximum flavor yield.', image: 'https://images.unsplash.com/photo-1628102476605-e991264c8c7f?auto=format&fit=crop&w=800&q=80' },
    { id: 12, title: 'Savage Cartel Meet', date: '2026-06-25', category: 'Underground Network', description: 'Invite-only gathering for top-ranking members holding VIP points.', image: 'https://images.unsplash.com/photo-1512485600893-b08bc1ad59b1?auto=format&fit=crop&w=800&q=80' }
])

const filteredEvents = computed(() => {
    if (activeEventFilter.value === 'All Operations') return specialEvents.value
    return specialEvents.value.filter(e => e.category === activeEventFilter.value)
})
const selectedResDate = ref('')
const selectedResTime = ref('')
const selectedResGuests = ref(2)
const selectedResLocation = ref('Kikuyu HQ')
const selectedResOccasion = ref('Standard Ritual')
const selectedResZone = ref('Main Floor')
const resSpecialRequests = ref('')

const isReserving = ref(false)
const resNotifications = ref([])

// ─── Custom Calendar Logic ──────────────────────────────────────────────────
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const occasionTypes = ref(['Standard Ritual', 'Tactical Briefing', 'Anniversary Operations', 'Covert Operation'])
const tableZones = ['Main Floor', 'Vault VIP', 'Perimeter', 'Chef\'s Command Center']

const bridgeToReservation = (event) => {
    activeTab.value = 'reservations'
    activeResTab.value = 'new'
    
    // Check if occasion type exists, if not add it
    if (!occasionTypes.value.includes(event.title)) {
        occasionTypes.value.push(event.title)
    }
    
    // Assign fields
    selectedResOccasion.value = event.title
    selectedResDate.value = event.date
    
    // Navigate calendar to event month
    const d = new Date(event.date)
    currentMonth.value = d.getMonth()
    currentYear.value = d.getFullYear()
    
    // Auto-scroll to top optionally
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const calendarDays = computed(() => {
    const days = []
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
    const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    
    // Add empty slots for the first week
    for (let i = 0; i < firstDay; i++) {
        days.push({ day: '', date: null, isEmpty: true })
    }
    
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        const cellDate = new Date(currentYear.value, currentMonth.value, i);
        
        days.push({
            day: i,
            date: dateStr,
            isEmpty: false,
            isPast: cellDate < today,
            isToday: cellDate.getTime() === today.getTime()
        })
    }
    return days
})

const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
    } else {
        currentMonth.value--
    }
}

const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
    } else {
        currentMonth.value++
    }
}

const selectDate = (day) => {
    if (day.isEmpty || day.isPast) return
    selectedResDate.value = day.date
}
// ────────────────────────────────────────────────────────────────────────────

const upcomingReservations = ref([
    { id: 'RES-0982A', date: '2026-03-24', time: '19:30', guests: 4, location: 'Kikuyu HQ', status: 'Confirmed', type: 'VIP Vault Segment', occasion: 'Tactical Briefing', zone: 'Vault VIP' },
    { id: 'RES-1044B', date: '2026-04-02', time: '20:00', guests: 2, location: 'Muthiga Sector', status: 'Pending Recon', type: 'Tactical Table', occasion: 'Standard Ritual', zone: 'Main Floor' }
])

const pastReservations = [
    { id: 'RES-0112A', date: '2025-12-14', time: '18:00', guests: 6, location: 'Kikuyu HQ', status: 'Completed', type: 'Savage Extraction', occasion: 'Covert Operation', zone: 'Chef\'s Command Center' },
    { id: 'RES-0099Z', date: '2025-11-20', time: '20:30', guests: 2, location: 'Westlands Base', status: 'Completed', type: 'Tactical Table', occasion: 'Standard Ritual', zone: 'Perimeter' }
]

const executeReservation = () => {
    if (!selectedResDate.value || !selectedResTime.value) return
    isReserving.value = true
    
    // Simulate API Call
    setTimeout(() => {
        isReserving.value = false
        const newRes = {
            id: `RES-${Math.floor(Math.random() * 9000) + 1000}X`,
            date: selectedResDate.value,
            time: selectedResTime.value,
            guests: selectedResGuests.value,
            location: selectedResLocation.value,
            status: 'Confirmed',
            type: selectedResGuests.value > 4 ? 'VIP Vault Segment' : 'Tactical Table',
            occasion: selectedResOccasion.value,
            zone: selectedResZone.value
        }
        upcomingReservations.value.unshift(newRes)
        
        // Reset form
        selectedResDate.value = ''
        selectedResTime.value = ''
        resSpecialRequests.value = ''
        
        // Show success
        activeResTab.value = 'upcoming'
        const notifId = Date.now()
        resNotifications.value.push({
            id: notifId,
            message: `Extraction sequence ${newRes.id} confirmed for ${newRes.date}.`
        })
        setTimeout(() => {
            resNotifications.value = resNotifications.value.filter(n => n.id !== notifId)
        }, 5000)
    }, 1500)
}

// ─── Carousel Logic ─────────────────────────────────────────────────────────
const animate = () => {
    categories.value.forEach(cat => {
        const top = document.getElementById(`carousel-${cat}-top`)
        const bottom = document.getElementById(`carousel-${cat}-bottom`)
        if (top) {
            top.scrollLeft += 0.5
            if (top.scrollLeft >= top.scrollWidth / 2) top.scrollLeft = 0
        }
        if (bottom) {
            bottom.scrollLeft -= 0.5
            if (bottom.scrollLeft <= 0) bottom.scrollLeft = bottom.scrollWidth / 2
        }
    })
    const protocol = document.getElementById('protocol-ticker')
    if (protocol) {
        protocol.scrollLeft += 0.8
        if (protocol.scrollLeft >= protocol.scrollWidth / 2) protocol.scrollLeft = 0
    }
    requestAnimationFrame(animate)
}

const manualScroll = (id, direction) => {
    const el = document.getElementById(id)
    if (!el) return
    const amount = direction === 'left' ? -400 : 400
    el.scrollBy({ left: amount, behavior: 'smooth' })
}

// ─── Modal State ────────────────────────────────────────────────────────────
const isHighlightModalOpen = ref(false)
const selectedHighlight = ref(null)

const openHighlightModal = (item) => {
  selectedHighlight.value = {
    ...item,
    description: item.description || "Our master chefs slow-cook this specialty cut to ensure the ultimate melt-in-your-mouth experience.",
    rating: item.rating || 4.9
  }
  isHighlightModalOpen.value = true
}

const cartItems = ref([
    { id: 1, name: 'Obsidian Ribeye', price: 6500, qty: 1, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Flame-Seared Asparagus', price: 850, qty: 2, image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Savage Bone Marrow', price: 1200, qty: 1, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'The Prime Vault Platter', price: 12500, qty: 1, image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=200&q=80' },
    { id: 5, name: 'Smoked Hickory Wings', price: 1800, qty: 1, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=200&q=80' },
    { id: 6, name: 'Savage Truffle Fries', price: 950, qty: 2, image: 'https://images.unsplash.com/photo-1630384066252-19e1aec9535c?auto=format&fit=crop&w=200&q=80' },
    { id: 7, name: 'Blood Orange Ritual Soda', price: 450, qty: 4, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80' }
])

const cartTotal = computed(() => cartItems.value.reduce((acc, item) => acc + (item.price * item.qty), 0))

const closeHighlightModal = () => {
  isHighlightModalOpen.value = false
}

const handleAddToCart = (item) => {
    // Logic for adding to cart
    console.log("Added to cart:", item.name)
}

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal-active') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))

    // Start Auto-Scroll (RAF)
    animate()
    
    // Rotate Tactical Ads
    setInterval(rotateAds, 5000)

    window.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <div class="bg-[#020202] text-white font-body min-h-screen flex flex-col h-screen overflow-hidden">
    
    <!-- FIXED DASHBOARD HEADER (COMMAND BAR) -->
    <header class="h-24 md:h-28 bg-black border-b border-white/10 px-6 lg:px-12 flex items-center justify-between shrink-0 z-50">
        <div class="flex items-center gap-10">
            <!-- Brand -->
            <div class="flex flex-col items-center">
                <div class="flex items-end leading-none">
                    <span class="font-display font-bold text-2xl lg:text-4xl text-white">AF</span>
                    <div class="relative">
                        <span class="font-display font-bold text-2xl lg:text-4xl text-white">I</span>
                        <span class="absolute -top-1 left-0 w-full h-2 bg-primary shadow-[0_0_10px_rgba(217,4,4,1)]"></span>
                    </div>
                </div>
            </div>

            <!-- Dashboard Specific Navigation -->
            <nav class="hidden md:flex items-center gap-8 h-full">
                <button v-for="item in navItems" :key="item.id" @click="activeTab = item.id"
                        class="h-full px-4 flex items-center gap-3 transition-all relative group"
                        :class="activeTab === item.id ? 'text-primary' : 'text-gray-500 hover:text-white'">
                    <span class="material-icons opacity-70 text-xl">{{ item.icon }}</span>
                    <span class="font-display font-black text-[10px] uppercase tracking-[0.2em]">{{ item.label }}</span>
                    <div v-if="activeTab === item.id" class="absolute bottom-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
                </button>
            </nav>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
            <!-- Hamburger (mobile only) -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
              <span class="material-icons text-white text-xl">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
            </button>
            <!-- User Tactical Profile -->
            <div class="hidden xl:flex items-center gap-4 px-6 border-l border-white/10">
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                         class="w-10 h-10 rounded-full object-cover grayscale border border-primary/40">
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                </div>
                <div class="flex flex-col">
                    <span class="text-[10px] font-display font-black text-white uppercase leading-none mb-1">Mbugua <span class="text-primary">AFI</span></span>
                    <span class="text-[8px] font-black text-primary uppercase tracking-[0.2em] leading-none">Level 04 • Ritualist</span>
                </div>
            </div>

            <!-- Tactical Actions -->
            <div class="flex items-center gap-3">
                <!-- Notifications -->
                <div class="relative">
                    <button @click.stop="showNotificationsDropdown = !showNotificationsDropdown; showCartDropdown = false"
                            class="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                        <span class="material-icons text-white/50 group-hover:text-primary transition-colors text-xl">notifications</span>
                        <span v-if="notifications.some(n => !n.read)" class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-black animate-pulse"></span>
                    </button>
                    <!-- Notifications Dropdown -->
                    <Transition name="drawer">
                        <div v-if="showNotificationsDropdown" 
                             class="absolute right-0 mt-3 w-80 bg-[#080808]/98 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[300] text-left">
                            <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                                <span class="font-display font-black text-xs uppercase tracking-widest text-primary">Tactical Uplinks</span>
                                <button @click="notifications.forEach(n => n.read = true)" class="text-[8px] font-black uppercase text-gray-500 hover:text-white tracking-widest">Mark All Read</button>
                            </div>
                            <div class="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
                                <div v-for="n in notifications" :key="n.id" 
                                     class="p-3 border transition-all"
                                     :class="n.read ? 'border-white/5 bg-white/[0.01]' : 'border-primary/20 bg-primary/5'">
                                    <p class="text-[10px] text-gray-300 font-medium leading-relaxed">{{ n.text }}</p>
                                    <span class="text-[8px] text-gray-600 block mt-2 font-black uppercase tracking-wider">{{ n.time }}</span>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
                
                <!-- Cart / Payload -->
                <div class="relative">
                    <button @click.stop="showCartDropdown = !showCartDropdown; showNotificationsDropdown = false"
                            class="relative h-10 px-4 flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                        <span class="material-icons text-white/50 group-hover:text-white transition-colors text-xl">shopping_cart</span>
                        <span class="font-display font-black text-[10px] uppercase tracking-widest text-primary">{{ cartItems.length.toString().padStart(2, '0') }}</span>
                    </button>
                    <!-- Cart Dropdown -->
                    <Transition name="drawer">
                        <div v-if="showCartDropdown" 
                             class="absolute right-0 mt-3 w-80 sm:w-96 bg-[#080808]/98 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[300] text-left"
                             @click.stop>
                            <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                                <span class="font-display font-black text-xs uppercase tracking-widest text-primary">Payload Fragments</span>
                                <span class="text-[8px] font-black uppercase text-gray-500 tracking-widest">{{ cartItems.length }} ITEMS</span>
                            </div>
                            <div v-if="cartItems.length === 0" class="py-8 text-center text-gray-600 font-display text-xs uppercase tracking-widest">
                                No Payload Allocated
                            </div>
                            <div v-else class="space-y-4 max-h-60 overflow-y-auto no-scrollbar">
                                <div v-for="item in cartItems" :key="item.id" 
                                     class="flex items-center gap-4 p-3 border border-white/5 bg-white/[0.01]">
                                    <img :src="item.image" class="w-12 h-12 object-cover grayscale" />
                                    <div class="flex-1 min-w-0">
                                        <h5 class="text-[10px] font-bold text-white uppercase truncate">{{ item.name }}</h5>
                                        <span class="text-[9px] text-primary font-bold">KSh {{ item.price.toLocaleString() }} x {{ item.qty }}</span>
                                    </div>
                                    <button @click="cartItems = cartItems.filter(i => i.id !== item.id)" class="text-gray-600 hover:text-primary">
                                        <span class="material-icons text-base">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="cartItems.length > 0" class="border-t border-white/10 pt-4 mt-4 space-y-4">
                                <div class="flex justify-between text-xs">
                                    <span class="text-gray-500 font-black uppercase tracking-widest">Est. Subtotal</span>
                                    <span class="text-white font-bold">KSh {{ cartTotal.toLocaleString() }}</span>
                                </div>
                                <button @click="activeTab = 'rituals'; showCartDropdown = false" 
                                        class="w-full py-3 bg-primary text-white font-display text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                                    <span>Go to Checkout Uplink</span>
                                    <span class="material-icons text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Sector Indicator -->
            <div class="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2">
                <span class="text-[8px] font-black uppercase text-gray-500 tracking-widest">Active Sector:</span>
                <select v-model="selectedLocation" class="bg-transparent text-primary font-display text-xs font-bold uppercase focus:outline-none appearance-none cursor-pointer pr-4">
                    <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
                </select>
            </div>

            <!-- Termination / Logout -->
            <button @click="handleLogout" class="flex items-center gap-2 group px-6 py-3 bg-white/5 border border-white/10 hover:bg-primary transition-all duration-500">
                <span class="text-[9px] font-black uppercase tracking-widest group-hover:text-white transition-colors">Abort Ritual</span>
                <span class="material-icons text-lg group-hover:rotate-180 transition-transform">logout</span>
            </button>
        </div>
    </header>

    <!-- Mobile Nav Drawer -->
    <Transition name="drawer">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-[200] md:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="mobileMenuOpen = false"></div>
        <!-- Drawer Panel -->
        <nav class="absolute top-0 left-0 h-full w-72 bg-[#080808] border-r border-white/10 flex flex-col pt-24 pb-10 px-6 gap-2">
          <!-- Brand at top -->
          <div class="absolute top-6 left-6 flex items-end leading-none">
            <span class="font-display font-bold text-2xl text-white">AF</span>
            <div class="relative">
              <span class="font-display font-bold text-2xl text-white">I</span>
              <span class="absolute -top-0.5 left-0 w-full h-1.5 bg-primary shadow-[0_0_8px_rgba(217,4,4,1)]"></span>
            </div>
          </div>
          <!-- Close button -->
          <button @click="mobileMenuOpen = false" class="absolute top-6 right-6 w-9 h-9 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-primary/20 transition-all">
            <span class="material-icons text-white text-xl">close</span>
          </button>

          <!-- Nav links -->
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="activeTab = item.id; mobileMenuOpen = false"
            class="flex items-center gap-4 px-4 py-3 border transition-all"
            :class="activeTab === item.id
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-transparent text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5'"
          >
            <span class="material-icons text-xl">{{ item.icon }}</span>
            <span class="font-display font-black text-xs uppercase tracking-[0.2em]">{{ item.label }}</span>
            <div v-if="activeTab === item.id" class="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          </button>

          <!-- Location selector -->
          <div class="mt-auto border-t border-white/10 pt-6">
            <span class="text-[8px] font-black uppercase text-gray-500 tracking-widest block mb-2">Active Sector</span>
            <select v-model="selectedLocation" class="w-full bg-transparent text-primary font-display text-xs font-bold uppercase focus:outline-none appearance-none cursor-pointer border border-white/10 px-3 py-2">
              <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>

          <!-- Logout -->
          <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:bg-primary transition-all duration-300 mt-2">
            <span class="material-icons text-lg">logout</span>
            <span class="text-[9px] font-black uppercase tracking-widest">Abort Ritual</span>
          </button>
        </nav>
      </div>
    </Transition>

    <!-- CENTRAL SCROLLABLE COMMAND HUB -->
    <main class="flex-1 overflow-y-auto custom-scrollbar bg-[#050505] relative pt-0">
        
        <!-- SAVAGE HUB BANNER SUITE (ULTRA-WIDE RECTANGULAR) -->
        <section class="w-full mb-10 overflow-hidden">
            <div class="relative h-[200px] lg:h-[240px] bg-black border-b border-white/5 flex items-center justify-between px-8 lg:px-20 overflow-hidden group">
                <!-- Background Ambiance -->
                <div class="absolute inset-0 z-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover grayscale brightness-50">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                </div>

                <!-- LEFT: TACTICAL SPECIALS CAROUSEL -->
                <div class="relative z-10 w-full lg:w-[400px] flex flex-col items-start text-left bg-black/60 backdrop-blur-xl p-8 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700">
                    <Transition name="slide-fade-up" mode="out-in">
                        <div :key="currentAdIndex" class="w-full">
                            <span class="text-primary font-display font-black text-[9px] uppercase tracking-[0.4em] mb-4 block animate-pulse">Live From Kitchen</span>
                            <h2 class="font-display text-3xl lg:text-4xl font-black text-white uppercase leading-none mb-2">{{ operationalAds[currentAdIndex].title }}</h2>
                            <h2 class="font-display text-4xl lg:text-5xl font-black text-primary italic uppercase leading-none mb-8">{{ operationalAds[currentAdIndex].subtitle }}</h2>
                            <div class="flex items-center gap-6">
                                <span class="text-white text-3xl font-display font-bold">{{ operationalAds[currentAdIndex].price }}</span>
                                <button class="bg-primary text-white px-6 py-3 font-display font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all">
                                    {{ operationalAds[currentAdIndex].cta }} <span class="material-icons text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </Transition>
                    
                    <!-- Progress Indicators -->
                    <div class="flex gap-2 mt-8">
                        <div v-for="(_, i) in operationalAds" :key="i" 
                             class="h-1 transition-all duration-500" 
                             :class="currentAdIndex === i ? 'w-8 bg-primary' : 'w-4 bg-white/20'"></div>
                    </div>
                </div>

                <!-- CENTER: MEAL OF THE DAY ANALYSIS -->
                <div class="hidden lg:flex relative z-10 flex-col items-center text-center">
                    <span class="font-script text-3xl text-primary italic mb-2">{{ currentDay }}'s Special</span>
                    <div class="flex flex-col items-center leading-none max-w-xl">
                        <h2 class="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-1">Ritual Selection</h2>
                        <h2 class="font-display text-6xl lg:text-7xl font-black text-primary italic uppercase tracking-tighter leading-[0.9] drop-shadow-[0_0_15px_rgba(217,4,4,0.3)]">{{ mealOfTheDay.name }}</h2>
                    </div>
                    <div class="w-24 h-1 bg-primary mt-6"></div>
                </div>

                <!-- RIGHT: TACTICAL REMINDERS CAROUSEL -->
                <div class="relative z-10 w-full lg:w-[400px] flex flex-col items-end text-right bg-black/60 backdrop-blur-xl p-8 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700">
                    <Transition name="slide-fade-up" mode="out-in">
                        <div :key="currentReminderIndex" class="w-full">
                            <span class="text-primary font-display font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">Sector Intelligence</span>
                            <h2 class="font-display text-3xl lg:text-4xl font-black text-white uppercase leading-none mb-2">{{ operationalReminders[currentReminderIndex].title }}</h2>
                            <h2 class="font-display text-4xl lg:text-5xl font-black text-primary italic uppercase leading-none mb-4">{{ operationalReminders[currentReminderIndex].subtitle }}</h2>
                            <div class="flex items-center justify-end gap-6">
                                <button class="border border-primary text-primary px-6 py-3 font-display font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                                    <span class="material-icons text-sm">{{ operationalReminders[currentReminderIndex].type === 'alert' ? 'notifications_active' : 'local_fire_department' }}</span> {{ operationalReminders[currentReminderIndex].cta }}
                                </button>
                                <span class="text-white text-2xl font-display font-bold border-l border-white/20 pl-6">{{ operationalReminders[currentReminderIndex].highlight }}</span>
                            </div>
                        </div>
                    </Transition>

                    <!-- Progress Indicators -->
                    <div class="flex gap-2 mt-8">
                        <div v-for="(_, i) in operationalReminders" :key="i" 
                             class="h-1 transition-all duration-500" 
                             :class="currentReminderIndex === i ? 'w-8 bg-primary' : 'w-4 bg-white/20'"></div>
                    </div>
                </div>
            </div>

            <!-- TACTICAL COMMAND BAR (LOCATION + SEARCH + CATEGORIES) - ONLY VISIBLE IN MENU TAB -->
            <div v-if="activeTab === 'menu'" class="flex flex-col xl:flex-row items-stretch bg-black border-x border-b border-white/10 h-auto xl:h-24">
                <!-- Menu Mode Selector (Replacing Location Selector) -->
                <div class="xl:w-64 border-b xl:border-b-0 xl:border-r border-white/10 p-6 flex items-center gap-5 group hover:bg-white/[0.02] transition-all">
                    <span class="material-icons text-primary animate-bounce">{{ menuMode === 'dine' ? 'restaurant' : 'outdoor_grill' }}</span>
                    <div class="flex flex-col text-left">
                        <span class="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Sector</span>
                        <select v-model="menuMode" @change="activeMenuCategory = 'All'" 
                                class="bg-transparent text-white font-display text-xl font-bold uppercase focus:outline-none appearance-none cursor-pointer pr-4 hover:text-primary transition-colors">
                            <option value="dine" class="bg-black text-white">Dine-In Hub</option>
                            <option value="butchery" class="bg-black text-white">Butchery Deck</option>
                        </select>
                    </div>
                </div>

                <!-- Logistics Protocol Note -->
                <div class="hidden lg:flex border-b xl:border-b-0 xl:border-r border-white/10 p-6 items-center gap-4 bg-primary/[0.03]">
                    <span class="material-icons text-primary text-sm animate-pulse">local_shipping</span>
                    <div class="flex flex-col text-left">
                        <span class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Service Status</span>
                        <span class="text-[11px] font-black text-white uppercase tracking-widest whitespace-nowrap">Delivery & Pick-up Enrolled</span>
                    </div>
                </div>


                <!-- Global Search -->
                <div class="flex-1 border-b xl:border-b-0 xl:border-r border-white/10 relative group bg-white/[0.01]">
                    <span class="material-icons absolute left-8 top-1/2 -translate-y-1/2 font-black text-gray-600 group-focus-within:text-primary transition-colors">search</span>
                    <input v-model="searchQuery" type="text" placeholder="Search the Savage Menu..." 
                            class="w-full h-full bg-transparent pl-20 pr-10 py-6 text-sm font-black uppercase tracking-[0.2em] text-white focus:outline-none placeholder:text-gray-700">
                </div>

                <!-- Category Strip -->
                <div class="flex items-center gap-2 px-6 py-4 lg:py-0 overflow-x-auto no-scrollbar">
                    <button v-for="cat in categories" :key="cat" @click="activeMenuCategory = cat; activeTab = 'menu'"
                            class="px-6 h-12 flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                            :class="activeMenuCategory === cat ? 'bg-primary text-white shadow-[0_0_20px_rgba(217,4,4,0.4)]' : 'bg-white/5 text-gray-400 border border-white/5 hover:border-primary/40 hover:text-white'">
                        {{ cat }}
                    </button>
                </div>
            </div>
        </section>

        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 pb-24">
            
            <!-- OVERVIEW: COMMAND SUMMARY -->
            <div v-if="activeTab === 'overview'" class="space-y-16 animate-fade-in">
                
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    <!-- LEFT SIDE: Intelligence Analysis -->
                    <div class="xl:col-span-8 space-y-12">
                        <!-- User Header / Ritual Profile -->
                        <div class="flex flex-col md:flex-row items-center gap-10 bg-white/[0.02] border border-white/5 p-10 lg:p-14">
                            <div class="relative">
                                <div class="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                                     class="relative w-32 h-32 rounded-full object-cover grayscale border-2 border-primary/20 ring-4 ring-black">
                            </div>
                            <div class="text-center md:text-left flex-1">
                                <h1 class="font-display text-5xl lg:text-7xl font-black uppercase text-white leading-none mb-3">Mbugua <span class="text-primary italic">AFI</span></h1>
                                <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    <span class="px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest">{{ userRank }}</span>
                                    <span class="px-3 py-1 bg-white/5 text-gray-500 text-[8px] font-black uppercase tracking-widest border border-white/10">ID: {{ memberId }}</span>
                                </div>
                            </div>
                            <div class="bg-black/40 border border-white/5 p-6 flex items-center gap-6">
                                <div class="text-center">
                                    <span class="text-[8px] font-black text-gray-600 block mb-1">XP LEVEL</span>
                                    <span class="text-2xl font-display font-bold text-white">42</span>
                                </div>
                                <div class="w-[1px] h-10 bg-white/10"></div>
                                <div class="text-center">
                                    <span class="text-[8px] font-black text-gray-600 block mb-1">RITUALS</span>
                                    <span class="text-2xl font-display font-bold text-primary">156</span>
                                </div>
                            </div>
                        </div>

                        <!-- Strategic Intelligence Feed (News) -->
                        <div class="bg-white/[0.03] border border-white/10 p-12">
                            <div class="flex items-center justify-between mb-10">
                                <h3 class="font-display text-3xl font-black uppercase text-white tracking-tight flex items-center gap-4">
                                    <span class="material-icons text-primary">lan</span>
                                    Intelligence Feed
                                </h3>
                                <button class="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">View All Broadcasts</button>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div v-for="news in intelligenceFeed" :key="news.title" class="bg-black/40 border border-white/5 p-8 group hover:border-primary/40 transition-all">
                                    <div class="flex items-center justify-between mb-6">
                                        <span class="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5">{{ news.category }}</span>
                                        <span class="text-[8px] font-bold text-gray-600">{{ news.timestamp }}</span>
                                    </div>
                                    <h4 class="font-display text-xl font-bold text-white uppercase group-hover:text-primary transition-colors mb-4">{{ news.title }}</h4>
                                    <p class="text-xs text-gray-500 font-light leading-relaxed">{{ news.summary || news.subtitle || "" }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Meal of the Day Analysis -->
                        <div class="group relative overflow-hidden bg-primary/5 border border-primary/20 p-2">
                             <div class="grid grid-cols-1 md:grid-cols-2 bg-black/40">
                                <div class="p-12 flex flex-col justify-center">
                                    <span class="text-primary font-display font-black text-[10px] uppercase tracking-[0.4em] mb-4 block animate-pulse">Tactical Selection: Meal of the Day</span>
                                    <h2 class="font-display text-5xl font-black text-white uppercase mb-4">{{ mealOfTheDay.name }}</h2>
                                    <p class="text-base text-gray-400 font-light leading-relaxed mb-10">{{ mealOfTheDay.desc }}</p>
                                    <div class="flex items-center gap-8">
                                        <div class="flex flex-col">
                                            <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest">Protocol Cost</span>
                                            <span class="text-3xl font-display font-bold text-white">{{ mealOfTheDay.price }}</span>
                                        </div>
                                        <button class="px-10 py-4 bg-primary text-white font-display text-xs font-black uppercase hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(217,4,4,0.3)]">Deploy Ritual</button>
                                    </div>
                                </div>
                                <div class="h-96 md:h-auto overflow-hidden relative">
                                    <img :src="mealOfTheDay.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000">
                                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                                </div>
                             </div>
                        </div>

                        <!-- Savage Service Protocols -->
                        <div class="space-y-10">
                            <div class="flex items-center justify-between border-b border-white/5 pb-6">
                                <h3 class="font-display text-3xl font-black uppercase text-white tracking-tight flex items-center gap-4">
                                    <span class="material-icons text-primary text-3xl">engineering</span>
                                    Savage Service Protocols
                                </h3>
                                <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Operations Overview</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div v-for="service in savageServices" :key="service.title" 
                                     class="group relative h-64 overflow-hidden bg-black border border-white/5 p-8 flex flex-col justify-end hover:border-primary/40 transition-all duration-500">
                                    <img :src="service.image" class="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                    
                                    <!-- Scanner Effect -->
                                    <div class="absolute inset-x-0 h-[1px] bg-primary/40 shadow-[0_0_15px_rgba(217,4,4,0.8)] animate-scanner opacity-0 group-hover:opacity-100"></div>

                                    <div class="relative z-10">
                                        <span class="material-icons text-primary mb-4 block group-hover:scale-110 transition-transform">{{ service.icon }}</span>
                                        <h4 class="font-display text-xl font-black text-white uppercase mb-2 group-hover:text-primary transition-colors">{{ service.title }}</h4>
                                        <p class="text-[9px] text-gray-400 uppercase font-light leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-2 italic">{{ service.desc }}</p>
                                    </div>
                                    
                                    <!-- Corner Trace -->
                                    <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-primary/40 transition-colors"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Leaderboard & Newsletter Dual-Column -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                             <!-- Savage Leaderboard -->
                             <div class="bg-white/[0.03] border border-white/10 p-10">
                                <div class="flex items-center justify-between mb-10">
                                    <h3 class="font-display text-2xl font-black uppercase text-white tracking-tight flex items-center gap-4">
                                        <span class="material-icons text-primary animate-pulse">radar</span>
                                        Top Savages
                                    </h3>
                                </div>
                                <div class="space-y-4">
                                    <div v-for="s in topSavages" :key="s.name" class="flex items-center justify-between p-4 border border-white/5 bg-black/40 group hover:border-primary/40 transition-all">
                                        <div class="flex items-center gap-6">
                                            <span class="font-display text-3xl font-black italic block w-8" :class="s.rank === 1 ? 'text-primary' : 'text-gray-700'">#{{ s.rank }}</span>
                                            <div class="flex flex-col">
                                                <span class="font-display text-xl font-bold uppercase text-white group-hover:text-primary transition-colors">{{ s.name }}</span>
                                                <span class="text-[7px] font-black text-gray-600 uppercase tracking-widest">Ranked Operator</span>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="text-xl font-display font-bold text-primary">{{ s.score }}</span>
                                        </div>
                                    </div>
                                </div>
                             </div>

                             <!-- Ritual Dispatch Newsletter -->
                             <div class="bg-primary/5 border border-primary/20 p-10 relative overflow-hidden group">
                                 <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all"></div>
                                 <h3 class="font-display text-2xl font-black uppercase text-white mb-4">Ritual Dispatch</h3>
                                 <p class="text-xs text-gray-400 font-light leading-relaxed mb-8">Join the inner circle for first access to dry-aged yielded batches and tactical gear drops.</p>
                                 <div class="flex flex-col gap-4">
                                     <input type="email" placeholder="ENTER MEMBER EMAIL" class="w-full bg-black border border-white/10 px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:border-primary outline-none transition-all">
                                     <button class="w-full py-4 bg-primary text-white font-display text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Enable Intelligence Link</button>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <!-- RIGHT SIDE: Operational Intelligence -->
                    <div class="xl:col-span-4 space-y-10">
                        <!-- Market Pulse Update -->
                        <div class="bg-black border border-white/10 p-10">
                            <h4 class="font-display text-2xl font-black text-white uppercase mb-8 flex items-center justify-between">
                                Market Pulse
                                <span class="material-icons text-primary spin-slow">autorenew</span>
                            </h4>
                            <div class="space-y-6">
                                <div v-for="m in marketUpdates" :key="m.label" class="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                                    <div class="flex flex-col">
                                        <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{{ m.label }}</span>
                                        <span class="text-sm font-bold text-white uppercase">{{ m.price }}</span>
                                    </div>
                                    <div class="text-right">
                                        <span :class="m.status === 'UP' ? 'text-green-500' : m.status === 'DOWN' ? 'text-red-500' : 'text-gray-500'" 
                                              class="text-[10px] font-black uppercase font-display italic">
                                            {{ m.trend }} {{ m.status === 'UP' ? '▲' : m.status === 'DOWN' ? '▼' : '▬' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Tactical Ads -->
                        <div v-for="(ad, i) in intelligenceAds" :key="ad.title" 
                             class="hidden xl:block h-[300px] relative overflow-hidden group cursor-pointer border border-primary/10">
                            <img :src="ad.image" class="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000">
                            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                            <div class="absolute bottom-8 left-8 right-8 text-left">
                                <span class="text-primary font-display font-black text-[8px] uppercase tracking-widest mb-2 block">EQUIPMENT DROP</span>
                                <h4 class="font-display text-2xl font-black text-white uppercase mb-3">{{ ad.title }}</h4>
                                <p class="text-[10px] text-gray-300 font-light mb-6 opacity-80 line-clamp-2 leading-relaxed">{{ ad.desc }}</p>
                                <button class="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:border-primary transition-all">
                                    {{ ad.cta }}
                                </button>
                            </div>
                        </div>

                        <!-- Mobile/Tablet Responsive Ads Carousel -->
                        <div class="xl:hidden relative">
                            <div 
                              class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide px-1 carousel-track"
                              id="mobile-intelligence-ads"
                            >
                                <div v-for="ad in intelligenceAds" :key="ad.title"
                                     data-card
                                     class="snap-start flex-shrink-0 w-[calc(100vw-48px)] h-[250px] relative overflow-hidden border border-primary/10">
                                    <img :src="ad.image" class="w-full h-full object-cover grayscale brightness-50">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                                    <div class="absolute bottom-6 left-6 right-6 text-left">
                                        <span class="text-primary font-display font-black text-[8px] uppercase tracking-widest mb-1.5 block">EQUIPMENT DROP</span>
                                        <h4 class="font-display text-xl font-black text-white uppercase mb-2">{{ ad.title }}</h4>
                                        <p class="text-[9px] text-gray-300 font-light mb-4 opacity-80 line-clamp-2 leading-relaxed">{{ ad.desc }}</p>
                                        <button class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-black uppercase tracking-widest">
                                            {{ ad.cta }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Savage Briefs -->
                        <div class="p-10 bg-white/[0.02] border border-white/5 space-y-10">
                            <h4 class="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em]">Operational Briefs</h4>
                            <div v-for="brief in savageBriefs" :key="brief.id" class="space-y-2">
                                <h5 class="text-primary font-display text-sm font-black uppercase italic">{{ brief.title }}</h5>
                                <p class="text-[10px] text-gray-500 leading-relaxed font-light">{{ brief.desc }}</p>
                            </div>
                        </div>

                        <div class="p-8 border border-white/10 bg-black/40 flex flex-col items-center justify-center text-center">
                             <span class="material-icons text-primary/30 text-4xl mb-4 animate-pulse">satellite_alt</span>
                             <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Satellite Intelligence Link</p>
                             <p class="text-[11px] font-bold text-primary uppercase">Status: Secure Encrypted</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- MENU TAB: MEMBER CATALOGUE (DYNAMIC CAROUSELS) -->
            <div v-if="activeTab === 'menu'" class="animate-fade-in space-y-24">
                
                <!-- Deployment Protocol: Dynamic Intelligence Stream -->
                <div class="relative bg-black/40 border-y border-white/10 overflow-hidden py-1">
                    <div id="protocol-ticker" class="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-4 py-2">
                        <!-- Double the items for seamless loop -->
                        <div v-for="step in [...deploymentSteps, ...deploymentSteps]" :key="step+Math.random()" 
                             class="group relative flex items-center gap-6 px-10 py-4 min-w-[320px] h-20 bg-black/60 border border-white/5 overflow-hidden transition-all hover:border-primary/40">
                             
                             <img :src="step.img" class="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000">
                             <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                             
                             <!-- Scanner Effect -->
                             <div class="absolute top-0 bottom-0 w-[1px] bg-primary/40 shadow-[0_0_15px_rgba(217,4,4,0.8)] animate-scanner-horizontal opacity-0 group-hover:opacity-100"></div>

                             <div class="relative z-10 flex flex-col">
                                 <h5 class="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-primary transition-colors leading-tight">{{ step.title }}</h5>
                                 <p class="text-[9px] text-gray-400 uppercase font-light tracking-wide group-hover:text-white transition-colors">{{ step.desc }}</p>
                             </div>
                             
                             <div class="relative z-10 ml-auto flex items-center gap-2">
                                 <span class="w-4 h-[1px] bg-primary group-hover:w-8 transition-all"></span>
                                 <span class="material-icons text-primary text-[10px]">arrow_forward</span>
                             </div>
                        </div>
                    </div>
                </div>

                <!-- (Upper Filter/Search was moved to global command bar above for better UX/UI sync) -->

                <!-- SEARCH RESULTS GRID -->
                <div v-if="searchQuery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                     <div v-for="item in filteredItems" :key="item.name" 
                          class="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full">
                        <div class="relative h-64 overflow-hidden cursor-pointer" @click="openHighlightModal(item)">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 grayscale group-hover/card:grayscale-0">
                            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div class="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                                <button @click.stop="handleAddToCart(item)" class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                                    <span class="material-icons text-lg">shopping_cart</span>
                                </button>
                                <button @click.stop="openHighlightModal(item)" class="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-2xl">
                                    <span class="material-icons text-lg">visibility</span>
                                </button>
                            </div>
                            <div class="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                                <span class="material-icons text-primary text-[10px]">star</span>
                                <span class="text-white text-[10px] font-bold tracking-widest">{{ item.rating || 4.9 }}</span>
                            </div>
                            <div class="absolute bottom-5 left-5">
                               <span class="text-primary font-display text-base font-bold tracking-widest bg-black px-2 py-0.5">
                                   KSh {{ item.price }} {{ item.unit ? '/ ' + item.unit : '' }}
                               </span>
                            </div>
                        </div>
                        <div class="p-5 text-left">
                            <h4 class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors">{{ item.name }}</h4>
                            <p class="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-70">{{ item.description || "Our master chefs slow-cook this specialty cut to ensure the ultimate melt-in-your-mouth experience." }}</p>
                            <div class="flex items-center gap-2">
                               <button @click="openHighlightModal(item)" class="text-[8px] uppercase tracking-[0.3em] text-primary font-black border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-white transition-all">Details</button>
                               <span class="h-[1px] flex-1 bg-white/5"></span>
                               <button @click="handleAddToCart(item)" class="text-[8px] uppercase tracking-[0.3em] text-white font-bold border border-white/10 px-3 py-1.5 hover:border-primary hover:text-primary transition-all">Order Now</button>
                            </div>
                        </div>
                    </div>
                    <div v-if="filteredItems.length === 0" class="col-span-full py-20 text-center opacity-40">
                         <span class="material-icons text-6xl mb-4">search_off</span>
                         <p class="font-display text-2xl uppercase tracking-widest">No Hunger Targets Identified</p>
                    </div>
                </div>

                <!-- CATEGORY SECTIONS (STANDARD CAROUSELS) -->
                <template v-else v-for="cat in (activeMenuCategory === 'All' ? categories.filter(c => c !== 'All') : [activeMenuCategory])" :key="cat">
                    <div class="space-y-12">
                        <div class="flex items-center justify-between gap-6">
                            <div class="flex items-center gap-6">
                                <span class="w-12 h-0.5 bg-primary"></span>
                                <h3 class="font-display text-3xl font-black uppercase text-white tracking-widest">{{ cat }} <span class="text-primary opacity-30">Selection</span></h3>
                            </div>
                        </div>
                        
                        <!-- CAROUSEL ROW 1 (TOP) -->
                        <div class="relative group/carousel">
                             <!-- ARROWS -->
                             <button @click="manualScroll(`carousel-${cat}-top`, 'left')" class="absolute top-1/2 -left-4 -translate-y-1/2 z-20 w-12 h-12 bg-black border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary">
                                 <span class="material-icons">chevron_left</span>
                             </button>
                             <button @click="manualScroll(`carousel-${cat}-top`, 'right')" class="absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-12 h-12 bg-black border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary">
                                 <span class="material-icons">chevron_right</span>
                             </button>

                             <div :id="`carousel-${cat}-top`" class="flex overflow-x-auto no-scrollbar scroll-smooth gap-8 pb-4">
                                <div v-for="(item, idx) in [...(menuMode === 'dine' ? allItems : butcheryItems).filter(i => i.category === cat).slice(0, 8), ...(menuMode === 'dine' ? allItems : butcheryItems).filter(i => i.category === cat).slice(0, 8)]" :key="`${item.name}-${idx}`" 
                                     class="flex-none w-[350px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full">
                                    <div class="relative h-64 overflow-hidden cursor-pointer" @click="openHighlightModal(item)">
                                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 grayscale group-hover/card:grayscale-0">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                        <div class="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                                            <button @click.stop="handleAddToCart(item)" class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                                                <span class="material-icons text-lg">shopping_cart</span>
                                            </button>
                                            <button @click.stop="openHighlightModal(item)" class="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-2xl">
                                                <span class="material-icons text-lg">visibility</span>
                                            </button>
                                        </div>
                                        <div class="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                                            <span class="material-icons text-primary text-[10px]">star</span>
                                            <span class="text-white text-[10px] font-bold tracking-widest">{{ item.rating || 4.9 }}</span>
                                        </div>
                                        <div class="absolute bottom-5 left-5">
                                           <span class="text-primary font-display text-base font-bold tracking-widest bg-black px-2 py-0.5">KSh {{ item.price }} {{ item.unit ? '/ ' + item.unit : '' }}</span>
                                        </div>
                                    </div>
                                    <div class="p-5 text-left">
                                        <h4 class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors">{{ item.name }}</h4>
                                        <p class="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-70">{{ item.description || "Our master chefs slow-cook this specialty cut to ensure the ultimate melt-in-your-mouth experience." }}</p>
                                        <div class="flex items-center gap-2">
                                           <button @click="openHighlightModal(item)" class="text-[8px] uppercase tracking-[0.3em] text-primary font-black border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-white transition-all">Details</button>
                                           <span class="h-[1px] flex-1 bg-white/5"></span>
                                           <button @click="handleAddToCart(item)" class="text-[8px] uppercase tracking-[0.3em] text-white font-bold border border-white/10 px-3 py-1.5 hover:border-primary hover:text-primary transition-all">Order Now</button>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                        <!-- CAROUSEL ROW 2 (BOTTOM) -->
                        <div class="relative group/carousel">
                             <!-- ARROWS -->
                             <button @click="manualScroll(`carousel-${cat}-bottom`, 'left')" class="absolute top-1/2 -left-4 -translate-y-1/2 z-20 w-12 h-12 bg-black border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary">
                                 <span class="material-icons">chevron_left</span>
                             </button>
                             <button @click="manualScroll(`carousel-${cat}-bottom`, 'right')" class="absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-12 h-12 bg-black border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary">
                                 <span class="material-icons">chevron_right</span>
                             </button>

                             <div :id="`carousel-${cat}-bottom`" class="flex overflow-x-auto no-scrollbar scroll-smooth gap-8 pb-4">
                                 <div v-for="(item, idx) in [...(menuMode === 'dine' ? allItems : butcheryItems).filter(i => i.category === cat).slice(8, 16), ...(menuMode === 'dine' ? allItems : butcheryItems).filter(i => i.category === cat).slice(8, 16)]" :key="`${item.name}-bottom-${idx}`" 
 
                                     class="flex-none w-[350px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] h-full">
                                    <div class="relative h-64 overflow-hidden cursor-pointer" @click="openHighlightModal(item)">
                                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 grayscale group-hover/card:grayscale-0">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                        <div class="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                                            <button @click.stop="handleAddToCart(item)" class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                                                <span class="material-icons text-lg">shopping_cart</span>
                                            </button>
                                            <button @click.stop="openHighlightModal(item)" class="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-2xl">
                                                <span class="material-icons text-lg">visibility</span>
                                            </button>
                                        </div>
                                        <div class="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                                            <span class="material-icons text-primary text-[10px]">star</span>
                                            <span class="text-white text-[10px] font-bold tracking-widest">{{ item.rating || 4.9 }}</span>
                                        </div>
                                        <div class="absolute bottom-5 left-5">
                                           <span class="text-primary font-display text-base font-bold tracking-widest bg-black px-2 py-0.5">KSh {{ item.price }} {{ item.unit ? '/ ' + item.unit : '' }}</span>
                                        </div>
                                    </div>
                                    <div class="p-5 text-left">
                                        <h4 class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors">{{ item.name }}</h4>
                                        <p class="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-70">{{ item.description || "Our master chefs slow-cook this specialty cut to ensure the ultimate melt-in-your-mouth experience." }}</p>
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
                </template>
            </div>

            <!-- UPLINK TAB: TRANSMISSION HUB -->
            <div v-if="activeTab === 'transmissions'" class="animate-fade-in space-y-16">
                
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    <!-- LEFT: Upload Controller -->
                    <div class="xl:col-span-12">
                        <div class="bg-white/[0.02] border border-white/5 p-12 lg:p-16 text-left relative overflow-hidden">
                             <div class="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none"></div>
                             
                             <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                 <div>
                                     <div class="flex items-center gap-4 mb-6">
                                         <span class="material-icons text-primary text-4xl animate-pulse">sensors</span>
                                         <h2 class="font-display text-4xl font-black uppercase text-white leading-tight">Tactical Uplink Hub</h2>
                                     </div>
                                     <p class="text-gray-400 font-light uppercase text-[10px] tracking-[0.4em] leading-relaxed max-w-sm">Deploy your tactical visual captures directly to the Chronicle. Ensure high-definition fragments only for synchronization.</p>
                                 </div>
                                 
                                 <div class="w-full">
                                     <div v-if="!isUploading" 
                                          class="border-2 border-dashed border-white/10 p-12 group hover:border-primary transition-all cursor-pointer bg-black/40 hover:bg-primary/5"
                                          @click="handleUpload">
                                         <div class="flex items-center gap-8">
                                             <span class="material-icons text-5xl text-gray-700 group-hover:text-primary transition-colors">file_upload</span>
                                             <p class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-white transition-colors">Select Fragments for Uplink</p>
                                         </div>
                                     </div>
                                     
                                     <div v-else class="py-8 space-y-6">
                                         <div class="w-full h-1 bg-white/5 relative overflow-hidden">
                                             <div class="absolute inset-y-0 left-0 bg-primary transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
                                         </div>
                                         <p class="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse italic">ESTABLISHING ENCRYPTED UPLINK... {{ uploadProgress }}%</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <!-- CENTER-LEFT: Recent Tactical Feed -->
                    <div class="xl:col-span-8 space-y-12">
                        <!-- Live Feed -->
                        <div class="bg-white/[0.02] border border-white/10 p-10">
                             <div class="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                                 <h3 class="font-display text-2xl font-black uppercase text-white tracking-widest flex items-center gap-4">
                                     <span class="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                                     Live Chronicle Feed
                                 </h3>
                                 <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Recent Global Uplinks</span>
                             </div>

                             <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                 <div v-for="uplink in recentUplinks" :key="uplink.member" 
                                      class="group relative aspect-square overflow-hidden bg-black border border-white/5">
                                      <img :src="uplink.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100">
                                      <div class="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all"></div>
                                      <div class="absolute bottom-4 left-4 right-4 text-left">
                                          <p class="text-[9px] font-black text-white uppercase mb-1">{{ uplink.member }}</p>
                                          <p class="text-[7px] text-primary font-black uppercase tracking-widest">{{ uplink.timestamp }}</p>
                                      </div>
                                 </div>
                             </div>
                        </div>

                        <!-- User Archive: Past Uplinks -->
                        <div class="bg-white/[0.02] border border-white/10 p-10">
                             <div class="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                                 <h3 class="font-display text-2xl font-black uppercase text-white tracking-widest flex items-center gap-4">
                                     <span class="material-icons text-primary text-xl">folder_special</span>
                                     Mission Archive
                                 </h3>
                                 <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Your Verified Fragments</span>
                             </div>

                             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div v-for="arch in pastUplinks" :key="arch.id" 
                                      class="flex items-center gap-6 bg-black/40 border border-white/5 p-4 group hover:border-primary/40 transition-all">
                                      <div class="w-24 h-24 overflow-hidden shrink-0 border border-white/10">
                                          <img :src="arch.image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                                      </div>
                                      <div class="flex flex-col text-left">
                                          <span class="text-[7px] font-mono text-primary mb-1">{{ arch.id }}</span>
                                          <h4 class="text-white font-display font-bold uppercase text-lg leading-tight mb-2">{{ arch.name }}</h4>
                                          <div class="flex items-center gap-4">
                                              <span class="text-[8px] font-black text-gray-500 uppercase">{{ arch.date }}</span>
                                              <span class="text-[8px] font-black text-green-500 uppercase flex items-center gap-1">
                                                  <span class="material-icons text-[10px]">verified</span> {{ arch.status }}
                                              </span>
                                          </div>
                                      </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <!-- RIGHT: System Status & Drafts -->
                    <div class="xl:col-span-4 space-y-12">
                         <!-- Tactical Drafts -->
                         <div class="p-10 border border-white/10 bg-black relative overflow-hidden group">
                             <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all"></div>
                             
                             <h4 class="font-display text-xl font-black text-white uppercase mb-8 flex items-center gap-3 relative z-10">
                                 <span class="material-icons text-primary text-sm">edit_note</span>
                                 Tactical Drafts
                             </h4>
                             <div class="space-y-4 relative z-10">
                                 <div v-for="draft in draftedUplinks" :key="draft.name" class="p-6 border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all group/draft text-left">
                                     <h5 class="text-white font-display font-black uppercase text-sm mb-2 group-hover/draft:text-primary transition-colors">{{ draft.name }}</h5>
                                     <div class="flex items-center justify-between">
                                         <span class="text-[8px] font-black text-gray-600 uppercase">{{ draft.type }}</span>
                                         <span class="text-[8px] font-black text-primary uppercase tracking-widest">{{ draft.size }}</span>
                                     </div>
                                 </div>
                             </div>
                             <button class="w-full mt-10 py-4 bg-white/5 border border-white/10 text-white font-display font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:border-primary transition-all">Resolve All Drafts</button>
                         </div>

                         <!-- Stats Grid -->
                         <div class="grid grid-cols-1 gap-4">
                             <div v-for="stat in uplinkStats" :key="stat.label" class="bg-black border border-white/10 p-6 flex flex-col gap-2">
                                 <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest">{{ stat.label }}</span>
                                 <span class="text-3xl font-display font-black text-white italic group-hover:text-primary transition-colors">{{ stat.value }}</span>
                             </div>
                         </div>

                         <!-- Compliance Guidelines -->
                         <div class="p-10 border border-primary/20 bg-primary/5">
                             <h4 class="font-display text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                                 <span class="material-icons text-primary text-sm">security</span>
                                 Compliance Protocol
                             </h4>
                             <ul class="space-y-4 text-[9px] font-black text-gray-500 uppercase tracking-widest list-none text-left">
                                 <li class="flex items-start gap-4"><span class="text-primary">01</span> Maximum resolution: 8K Fragment</li>
                                 <li class="flex items-start gap-4"><span class="text-primary">02</span> No civilian faces in capture</li>
                                 <li class="flex items-start gap-4"><span class="text-primary">03</span> Sensory artifacts required</li>
                                 <li class="flex items-start gap-4"><span class="text-primary">04</span> Encrypted relay only</li>
                             </ul>
                         </div>
                    </div>
                </div>

            </div>

            <!-- RESERVATIONS TAB: SCHEDULING & TACTICS -->
            <div v-if="activeTab === 'reservations'" class="animate-fade-in space-y-16 mt-10">
                <!-- Reservation System Notifications -->
                <div class="fixed top-24 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
                    <transition-group name="toast-slide">
                        <div v-for="notIf in resNotifications" :key="notIf.id" 
                             class="bg-black/90 backdrop-blur-xl border border-primary/40 px-8 py-6 flex items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-auto min-w-[400px]">
                            <div class="w-14 h-14 bg-primary flex items-center justify-center">
                                <span class="material-icons text-white text-2xl">event_available</span>
                            </div>
                            <div class="text-left">
                                <h5 class="text-white font-display font-bold uppercase tracking-tight text-lg">Intel Verified</h5>
                                <p class="text-primary text-xs font-black uppercase tracking-widest mt-1">{{ notIf.message }}</p>
                            </div>
                            <div class="ml-auto w-1 h-10 bg-primary/20 relative overflow-hidden">
                                <div class="absolute inset-0 bg-primary animate-toast-progress"></div>
                            </div>
                        </div>
                    </transition-group>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-12 gap-12">
                     <!-- LEFT: Tab Selection -->
                     <div class="xl:col-span-3 space-y-4">
                         <div class="p-8 border border-white/5 bg-white/[0.02]">
                             <h3 class="font-display font-black text-white text-2xl uppercase mb-6 flex items-center gap-3">
                                 <span class="material-icons text-primary animate-pulse">event_note</span> Ops Log
                             </h3>
                             <div class="flex flex-col gap-2">
                                 <button v-for="tab in reservationTabs" :key="tab.id" 
                                         @click="activeResTab = tab.id"
                                         class="px-6 py-4 text-left border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-between group"
                                         :class="activeResTab === tab.id ? 'bg-primary text-white shadow-[0_0_15px_rgba(217,4,4,0.4)] border-primary' : 'bg-black text-gray-400 hover:border-white/20'">
                                     {{ tab.label }}
                                     <span class="material-icons opacity-0 group-hover:opacity-100 transition-opacity text-sm" :class="activeResTab === tab.id ? 'text-white opacity-100' : 'text-primary'">arrow_forward</span>
                                 </button>
                             </div>
                         </div>

                         <!-- Tactical Note -->
                         <div class="p-8 bg-black/40 border border-primary/20 text-left">
                             <span class="text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-2 block">Tactical Briefing</span>
                             <p class="text-[10px] text-gray-500 uppercase leading-relaxed font-black">All deployments require 24H recon for modification. Failure to execute reservations impacts Global Trust Factor.</p>
                         </div>
                     </div>

                     <!-- RIGHT: Tab Content Area -->
                     <div class="xl:col-span-9 bg-white/[0.02] border border-white/10 p-10 lg:p-14 text-left relative overflow-hidden min-h-[600px]">
                         <!-- BG Overlay -->
                         <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none z-0"></div>
                         
                         <!-- UPCOMING SECTOR -->
                         <div v-if="activeResTab === 'upcoming'" class="relative z-10 animate-fade-in space-y-8">
                             <div class="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                 <h2 class="font-display text-4xl font-black uppercase text-white leading-none">Identified Timelines</h2>
                                 <div class="flex items-center gap-3">
                                     <span class="w-3 h-3 bg-red-600 rounded-full animate-pulse border border-black shadow-[0_0_10px_rgba(217,4,4,1)]"></span>
                                     <span class="text-[9px] font-black uppercase text-primary tracking-widest">Active Ping</span>
                                 </div>
                             </div>

                             <div v-if="upcomingReservations.length === 0" class="flex flex-col items-center justify-center h-64 text-center">
                                 <span class="material-icons text-6xl text-white/10 mb-4">do_not_disturb_alt</span>
                                 <h4 class="font-display text-xl uppercase font-black text-gray-500">No Target Locks</h4>
                                 <p class="text-[10px] uppercase font-black tracking-widest text-primary mt-2">Initialize new extraction sequence.</p>
                             </div>

                             <div v-for="res in upcomingReservations" :key="res.id" 
                                  class="flex flex-col md:flex-row items-center border border-white/10 bg-black/60 group hover:border-primary/50 transition-all p-6 gap-6 relative overflow-hidden">
                                  
                                  <!-- Scanner -->
                                  <div class="absolute top-0 bottom-0 left-0 w-[2px] bg-primary group-hover:shadow-[0_0_15px_rgba(217,4,4,1)] transition-all"></div>

                                  <div class="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 min-w-[120px]">
                                      <span class="text-[9px] font-black text-gray-500 uppercase">{{ new Date(res.date).toLocaleString('default', { month: 'short' }) }}</span>
                                      <span class="text-4xl font-display font-black text-white italic leading-none my-1">{{ res.date.split('-')[2] }}</span>
                                      <span class="text-[9px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5">{{ res.time }}</span>
                                  </div>

                                  <div class="flex-1 space-y-2 text-center md:text-left">
                                      <span class="text-[8px] font-mono text-gray-600 block mb-1">ID: {{ res.id }}</span>
                                      <h4 class="font-display text-2xl font-black uppercase text-white group-hover:text-primary transition-colors leading-none">{{ res.type }}</h4>
                                      <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                                          <div class="flex items-center gap-2">
                                              <span class="material-icons text-xs text-primary/70">location_on</span>
                                              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ res.location }}</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <span class="material-icons text-xs text-primary/70">people</span>
                                              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ res.guests }} Targets</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <span class="material-icons text-xs text-primary/70">workspace_premium</span>
                                              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ res.occasion }}</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <span class="material-icons text-xs text-primary/70">my_location</span>
                                              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ res.zone }}</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <span class="material-icons text-xs" :class="res.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'">verified_user</span>
                                              <span class="text-[10px] font-black uppercase tracking-widest" :class="res.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'">{{ res.status }}</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="flex flex-col gap-2 min-w-[160px]">
                                      <button class="w-full bg-white/10 hover:bg-white text-[9px] font-black uppercase tracking-widest py-3 text-white hover:text-black transition-all border border-white/5">Modify Coord</button>
                                      <button class="w-full border border-primary/20 hover:bg-primary text-[9px] font-black uppercase tracking-widest py-3 text-primary hover:text-white transition-all">Abort Lock</button>
                                  </div>
                             </div>
                         </div>

                         <!-- PAST SECTOR -->
                         <div v-if="activeResTab === 'past'" class="relative z-10 animate-fade-in space-y-8">
                             <div class="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                 <h2 class="font-display text-4xl font-black uppercase text-white leading-none">Archived Rituals</h2>
                                 <span class="material-icons text-gray-600 text-3xl">history</span>
                             </div>

                             <div class="space-y-4">
                                 <div v-for="res in pastReservations" :key="res.id" 
                                      class="flex flex-col md:flex-row items-center border border-white/5 bg-black/40 group hover:border-white/20 transition-all p-4 gap-6 opacity-70 hover:opacity-100">
                                      
                                      <div class="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 items-center w-full">
                                          <div>
                                              <span class="text-[8px] font-black uppercase text-gray-600 tracking-widest block mb-1">Chronicle Date</span>
                                              <span class="text-[12px] font-display font-black text-white uppercase">{{ res.date }} // {{ res.time }}</span>
                                          </div>
                                          <div>
                                              <span class="text-[8px] font-black uppercase text-gray-600 tracking-widest block mb-1">Target Zone</span>
                                              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ res.location }} - {{ res.zone }}</span>
                                          </div>
                                          <div>
                                              <span class="text-[8px] font-black uppercase text-gray-600 tracking-widest block mb-1">Protocol Type</span>
                                              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ res.type }}</span>
                                          </div>
                                          <div>
                                              <span class="text-[8px] font-black uppercase text-gray-600 tracking-widest block mb-1">Occasion</span>
                                              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ res.occasion || 'Standard' }}</span>
                                          </div>
                                          <div class="text-right">
                                              <span class="text-[8px] font-black text-green-500 border border-green-500/20 bg-green-500/10 px-3 py-1 uppercase tracking-widest">{{ res.status }}</span>
                                          </div>
                                      </div>
                                 </div>
                             </div>
                         </div>

                         <!-- NEW SCHEDULING SECTOR -->
                         <div v-if="activeResTab === 'new'" class="relative z-10 animate-fade-in space-y-8">
                             <div class="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                 <div>
                                     <h2 class="font-display text-4xl font-black uppercase text-white leading-none mb-2">Schedule Deployment</h2>
                                     <p class="text-[10px] font-black uppercase tracking-widest text-gray-500">Initialize Table Locking Sequence for your next ritual.</p>
                                 </div>
                                 <span class="material-icons text-primary animate-pulse text-4xl">radar</span>
                             </div>

                             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <!-- Form Section -->
                                 <div class="space-y-6">
                                     <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                         <div>
                                             <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">1. Isolate Sequence Target (Logistics Hub)</label>
                                             <select v-model="selectedResLocation" class="w-full bg-black border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-widest focus:border-primary outline-none transition-all text-white cursor-pointer hover:border-primary/50">
                                                 <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
                                             </select>
                                         </div>
                                         <div>
                                             <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">2. Occasion Protocol</label>
                                             <select v-model="selectedResOccasion" class="w-full bg-black border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-widest focus:border-primary outline-none transition-all text-white cursor-pointer hover:border-primary/50">
                                                 <option v-for="o in occasionTypes" :key="o" :value="o">{{ o }}</option>
                                             </select>
                                         </div>
                                     </div>

                                     <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                         <!-- RECON DATE CALENDAR -->
                                         <div>
                                             <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">3. Recon Date Window</label>
                                             <div class="bg-black border border-white/10 p-6 hover:border-primary/30 transition-all">
                                                 <div class="flex flex-col gap-5">
                                                     <div class="flex items-center justify-between border-b border-white/5 pb-3">
                                                         <button @click="prevMonth" class="text-white/50 hover:text-white transition-colors"><span class="material-icons text-base">chevron_left</span></button>
                                                         <div class="text-xs font-black uppercase text-white tracking-widest">{{ monthNames[currentMonth] }} {{ currentYear }}</div>
                                                         <button @click="nextMonth" class="text-white/50 hover:text-white transition-colors"><span class="material-icons text-base">chevron_right</span></button>
                                                     </div>
                                                     <div class="grid grid-cols-7 gap-2">
                                                         <div v-for="d in dayNames" :key="d" class="text-center text-[10px] font-black text-gray-600 mb-2 border-b border-white/5 pb-2">{{ d }}</div>
                                                         <div v-for="(day, idx) in calendarDays" :key="idx" 
                                                             @click="selectDate(day)"
                                                             :class="[
                                                                 'h-10 flex items-center justify-center text-xs font-bold transition-all border border-transparent',
                                                                 day.isEmpty || day.isPast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:border-white/20 hover:bg-white/5',
                                                                 day.date === selectedResDate ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(217,4,4,0.5)]' : 'text-gray-400 bg-white/[0.02]',
                                                                 day.isToday && day.date !== selectedResDate ? 'text-primary font-black' : ''
                                                             ]">
                                                             {{ day.day }}
                                                         </div>
                                                     </div>
                                                     <div class="flex justify-between items-center pt-3 border-t border-white/5 mt-2">
                                                         <span class="text-[9px] font-black text-gray-500 uppercase">Selected Lock:</span>
                                                         <span class="text-[10px] font-black uppercase tracking-widest" :class="selectedResDate ? 'text-white' : 'text-primary animate-pulse'">{{ selectedResDate || 'AWAITING LOCK' }}</span>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>

                                         <div class="space-y-6">
                                             <div>
                                                 <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">4. Threat Level (Guest Count)</label>
                                                 <div class="flex items-center bg-black border border-white/10">
                                                     <button @click="selectedResGuests > 1 && selectedResGuests--" class="w-14 h-[44px] flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-all text-xl">-</button>
                                                     <div class="flex-1 text-center font-display font-black text-2xl text-white italic border-x border-white/10 py-1">{{ selectedResGuests }}</div>
                                                     <button @click="selectedResGuests < 20 && selectedResGuests++" class="w-14 h-[44px] flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-all text-xl">+</button>
                                                 </div>
                                                 <p v-if="selectedResGuests > 6" class="text-[8px] font-black text-yellow-500 mt-2 uppercase flex items-center gap-1"><span class="material-icons text-[10px]">warning</span> Require Mass-Scale Approval.</p>
                                             </div>
                                             
                                             <div>
                                                 <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">5. Time Orbit</label>
                                                 <input type="time" v-model="selectedResTime"
                                                        class="w-full h-[44px] bg-black border border-white/10 px-4 text-xs font-black uppercase tracking-widest focus:border-primary outline-none transition-all text-white hover:border-primary/50 cursor-pointer">
                                             </div>
                                             
                                             <div>
                                                 <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">6. Tactical Zone Isolation</label>
                                                 <select v-model="selectedResZone" class="w-full h-[44px] bg-black border border-white/10 px-4 text-xs font-black uppercase tracking-widest focus:border-primary outline-none transition-all text-white cursor-pointer hover:border-primary/50">
                                                     <option v-for="z in tableZones" :key="z" :value="z">{{ z }}</option>
                                                 </select>
                                             </div>
                                         </div>
                                     </div>

                                     <div>
                                         <label class="text-[9px] font-black uppercase tracking-widest text-primary mb-2 block">7. Strategic Requirements (Notes)</label>
                                         <textarea v-model="resSpecialRequests" rows="2" placeholder="Dietary intel, tactical seating, specialized yields..." 
                                                   class="w-full bg-black border border-white/10 px-4 py-4 text-xs font-black uppercase tracking-[0.1em] focus:border-primary outline-none transition-all text-white resize-none"></textarea>
                                     </div>

                                     <button @click="executeReservation" :disabled="!selectedResDate || !selectedResTime || isReserving"
                                             class="w-full h-16 flex items-center justify-center gap-4 border border-primary disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                                             :class="isReserving ? 'bg-primary/20 text-white' : 'bg-primary text-white hover:shadow-[0_0_30px_rgba(217,4,4,0.6)]'">
                                             
                                         <span v-if="!isReserving" class="font-display font-black text-[11px] uppercase tracking-[0.3em]">Lock Deployment Coords</span>
                                         <div v-else class="flex items-center gap-2">
                                             <span class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                             <span class="font-display font-black text-[11px] uppercase tracking-[0.3em] animate-pulse">Establishing Link...</span>
                                         </div>
                                     </button>
                                 </div>

                                 <!-- Visual Reinforcement -->
                                 <div class="hidden md:flex flex-col items-end text-right h-full justify-between">
                                     <div class="w-full h-48 border border-white/10 relative overflow-hidden group">
                                         <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000">
                                         <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-24"></div>
                                         <span class="absolute bottom-4 right-4 bg-primary px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(217,4,4,0.5)]">VIP Table Recon</span>
                                     </div>
                                     
                                     <div class="flex flex-col gap-4 w-full">
                                         <div class="bg-black/40 border border-white/5 p-4 relative overflow-hidden">
                                             <div class="absolute right-0 top-0 h-full w-1 bg-white/10"></div>
                                             <span class="text-[9px] font-black text-gray-600 block mb-1 uppercase tracking-widest">Protocol 01</span>
                                             <p class="text-[10px] text-gray-300 font-bold leading-relaxed uppercase">Arrive 10 minutes prior to execution to establish command.</p>
                                         </div>
                                         <div class="bg-black/40 border border-white/5 p-4 relative overflow-hidden">
                                             <div class="absolute right-0 top-0 h-full w-1 bg-primary"></div>
                                             <span class="text-[9px] font-black text-gray-600 block mb-1 uppercase tracking-widest">Protocol 02</span>
                                             <p class="text-[10px] text-white font-bold leading-relaxed uppercase">Late deployment over 15 mins triggers reservation protocol reset.</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
            
            <!-- EVENTS TAB -->
            <div v-if="activeTab === 'events'" class="animate-fade-in mt-10">
                <div class="relative z-10 space-y-8 bg-black/40 border border-white/5 p-10">
                    <div class="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-8 pb-6 border-b border-white/5 gap-6">
                        <div class="text-left">
                            <h2 class="font-display text-4xl font-black uppercase text-white leading-none mb-2">Special Operations</h2>
                            <p class="text-[10px] font-black uppercase tracking-widest text-gray-500">Classified briefings and thematic engagements.</p>
                        </div>
                        
                        <!-- Filters -->
                        <div class="flex flex-wrap items-center gap-2">
                            <button v-for="filter in eventFilters" :key="filter"
                                    @click="activeEventFilter = filter"
                                    class="px-4 py-2 border text-[9px] font-black uppercase tracking-[0.1em] transition-all"
                                    :class="activeEventFilter === filter ? 'border-primary bg-primary text-white shadow-[0_0_10px_rgba(217,4,4,0.4)]' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'">
                                {{ filter }}
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-left">
                        <div v-for="event in filteredEvents" :key="event.id" class="group bg-black/60 border border-white/10 overflow-hidden hover:border-primary/50 transition-all flex flex-col h-full relative cursor-pointer">
                            <div class="h-40 w-full overflow-hidden relative border-b border-white/5 group-hover:border-primary/30 transition-colors">
                                <img :src="event.image" :alt="event.title" class="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
                                <div class="absolute top-2 right-2 bg-primary px-3 py-1 flex flex-col items-center shadow-[0_5px_15px_rgba(0,0,0,0.8)] border border-primary">
                                    <span class="text-white font-display font-black text-xl leading-none italic">{{ event.date.split('-')[2] }}</span>
                                    <span class="text-[9px] font-black uppercase tracking-widest text-black">{{ new Date(event.date).toLocaleString('default', { month: 'short' }) }}</span>
                                </div>
                            </div>
                            <div class="p-5 flex-1 flex flex-col justify-between relative z-10">
                                <div>
                                    <span class="text-[8px] font-black text-primary uppercase tracking-widest block mb-2 px-2 py-0.5 bg-primary/10 border border-primary/20 inline-block">{{ event.category }}</span>
                                    <h4 class="text-white font-display font-black text-lg uppercase leading-tight mb-3 group-hover:text-primary transition-colors">{{ event.title }}</h4>
                                    <p class="text-[10px] text-gray-400 font-bold leading-relaxed line-clamp-3 mb-4">{{ event.description }}</p>
                                </div>
                                <button class="w-full mt-auto text-[10px] font-black uppercase tracking-widest text-white border border-white/10 py-3 group-hover:border-primary group-hover:bg-primary hover:text-white transition-all shadow-[0_0_0_0_rgba(217,4,4,0)] group-hover:shadow-[0_0_20px_rgba(217,4,4,0.3)]">Secure Access</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CART TAB: PAYLOAD & CHECKOUT -->
            <div v-if="activeTab === 'rituals'" class="animate-fade-in pt-10">
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-12">
                    <!-- Left: Item List -->
                    <div class="xl:col-span-2 space-y-6">
                        <div class="flex items-center justify-between border-b border-white/10 pb-6">
                            <h3 class="font-display text-3xl font-black text-white uppercase italic">Active <span class="text-primary text-4xl">Payload</span></h3>
                            <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">{{ cartItems.length }} Fragments Identified</span>
                        </div>

                        <div v-for="item in cartItems" :key="item.id" class="group relative bg-black border border-white/10 p-6 flex flex-col md:flex-row gap-8 hover:border-primary/40 transition-all duration-500">
                            <div class="w-full md:w-32 h-32 overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1 flex flex-col justify-center text-left">
                                <div class="flex items-start justify-between mb-2">
                                    <h4 class="font-display text-xl font-black text-white uppercase tracking-tight">{{ item.name }}</h4>
                                    <button class="text-gray-600 hover:text-primary transition-colors">
                                        <span class="material-icons text-sm">close</span>
                                    </button>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="flex items-center bg-white/5 border border-white/10 p-1">
                                        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">-</button>
                                        <span class="w-10 text-center font-display font-black text-xs">{{ item.qty }}</span>
                                        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">+</button>
                                    </div>
                                    <span class="text-primary font-display font-bold text-lg">KSh {{ (item.price * item.qty).toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Specials Insertion -->
                        <div class="p-8 bg-primary/5 border border-primary/20 mt-12">
                            <div class="flex items-center gap-4 mb-6">
                                <span class="material-icons text-primary">auto_awesome</span>
                                <h4 class="font-display text-lg font-black text-white uppercase tracking-widest">Recommended Augmented Rituals</h4>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex items-center gap-4 p-4 border border-white/5 hover:border-primary/20 transition-all cursor-pointer bg-black">
                                    <div class="w-16 h-16 bg-white/5 flex items-center justify-center">
                                        <span class="material-icons text-primary/40">local_fire_department</span>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-black text-white uppercase mb-1">Volcanic Salts</p>
                                        <p class="text-primary font-display font-bold text-xs uppercase">+ KSh 350</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 p-4 border border-white/5 hover:border-primary/20 transition-all cursor-pointer bg-black">
                                    <div class="w-16 h-16 bg-white/5 flex items-center justify-center">
                                        <span class="material-icons text-primary/40">opacity</span>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-black text-white uppercase mb-1">AFI Resin Glaze</p>
                                        <p class="text-primary font-display font-bold text-xs uppercase">+ KSh 500</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Summary -->
                    <div class="space-y-8">
                        <div class="bg-black border border-white/10 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col text-left">
                            <h4 class="font-display text-xl font-black text-white uppercase mb-8 pb-4 border-b border-white/10">Order Intelligence</h4>
                            <div class="space-y-4 mb-10">
                                <div class="flex justify-between items-center text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <span>Subtotal</span>
                                    <span class="text-white">KSh {{ cartTotal.toLocaleString() }}</span>
                                </div>
                                <div class="flex justify-between items-center text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <span>Tactical Tax (16%)</span>
                                    <span class="text-white">KSh {{ (cartTotal * 0.16).toLocaleString() }}</span>
                                </div>
                                <div class="flex justify-between items-center text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <span>Service Courier</span>
                                    <span class="text-white">KSh 450</span>
                                </div>
                                <div class="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span class="font-display font-black text-white uppercase tracking-wider">Total Payload</span>
                                    <span class="text-primary font-display font-black text-3xl italic">KSh {{ (cartTotal * 1.16 + 450).toLocaleString() }}</span>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <button class="w-full bg-primary text-white py-6 font-display font-black uppercase text-[12px] tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(217,4,4,0.3)]">
                                    Execute Order Ritual
                                </button>
                                <button class="w-full border border-white/10 text-white/50 py-4 font-display font-black uppercase text-[9px] tracking-widest hover:border-white/40 hover:text-white transition-all">
                                    Schedule Drop-Off
                                </button>
                            </div>

                            <p class="mt-8 text-[8px] font-black text-gray-600 uppercase tracking-tighter leading-relaxed">
                                By executing, you agree to the AFI Savage protocols and ritual compliance standards. All sales are final once the fire hits the steel.
                            </p>
                        </div>

                        <!-- System Status Micro-Stat -->
                        <div class="p-6 border border-white/5 bg-white/[0.01] flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span class="text-[8px] font-black text-gray-500 uppercase tracking-widest">Kitchen Connection: Optimized</span>
                            </div>
                            <span class="text-[8px] font-black text-primary uppercase">MSR: 14ms</span>
                        </div>

                        <!-- Extraction Logistics -->
                        <div class="bg-black border border-white/10 p-8 flex flex-col text-left">
                            <h4 class="font-display text-lg font-black text-white uppercase mb-6 flex items-center gap-3">
                                <span class="material-icons text-primary text-sm">location_searching</span>
                                Extraction Logistics
                            </h4>
                            <div class="space-y-6">
                                <div>
                                    <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-2">Delivery Target</span>
                                    <p class="text-[10px] font-black text-white uppercase leading-relaxed">Unit 7G, Obsidian Towers, Sector 4, Nairobi Central Intelligence District</p>
                                </div>
                                <div class="flex items-center justify-between py-4 border-y border-white/5">
                                    <div>
                                        <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Telemetry Status</span>
                                        <span class="text-[10px] font-black text-green-500 uppercase">Live Tracking Active</span>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">ETA</span>
                                        <span class="text-[10px] font-black text-white uppercase">24 - 32 MINS</span>
                                    </div>
                                </div>

                                <!-- Deployment Telemetry (Progress Bar) -->
                                <div class="py-4">
                                     <div class="flex justify-between mb-4">
                                         <span class="text-[8px] font-black text-primary uppercase tracking-widest">Deployment Progress</span>
                                         <span class="text-[8px] font-black text-white uppercase tracking-widest">Stage 03: Out for Extraction</span>
                                     </div>
                                     <div class="relative h-[2px] bg-white/10 w-full mb-6">
                                         <div class="absolute h-full bg-primary shadow-[0_0_10px_rgba(217,4,4,0.8)]" style="width: 65%;"></div>
                                         <div class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                                             <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(217,4,4,1)]"></div>
                                             <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(217,4,4,1)]"></div>
                                             <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(217,4,4,1)] animate-pulse"></div>
                                             <div class="w-2 h-2 rounded-full bg-white/20"></div>
                                         </div>
                                     </div>
                                     <div class="grid grid-cols-4 gap-1 text-center">
                                         <span class="text-[6px] font-black text-white uppercase opacity-40">Ritual<br>Init</span>
                                         <span class="text-[6px] font-black text-white uppercase opacity-40">Fire<br>Prep</span>
                                         <span class="text-[6px] font-black text-primary uppercase">Extraction<br>Active</span>
                                         <span class="text-[6px] font-black text-white uppercase opacity-20">Delivery<br>Complete</span>
                                     </div>
                                </div>

                                <button class="text-[9px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                    Adjust Extraction Target <span class="material-icons text-xs">edit</span>
                                </button>
                            </div>
                        </div>

                        <!-- Tactical Coupons -->
                        <div class="bg-black border border-white/10 p-8 flex flex-col text-left">
                            <h4 class="font-display text-lg font-black text-white uppercase mb-6 flex items-center gap-3">
                                <span class="material-icons text-primary text-sm">confirmation_number</span>
                                Ritual Validation
                            </h4>
                            <div class="flex gap-2">
                                <input type="text" placeholder="ENTER CODE" class="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-[10px] font-black text-white focus:outline-none focus:border-primary/50 uppercase tracking-widest">
                                <button class="bg-white/10 px-6 text-[10px] font-black text-white uppercase tracking-widest hover:bg-primary transition-all">Apply</button>
                            </div>
                        </div>

                        <!-- Loyalty Intelligence -->
                        <div class="bg-primary/5 border border-primary/20 p-8 flex flex-col text-left">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="font-display text-md font-black text-white uppercase tracking-widest flex items-center gap-3">
                                    <span class="material-icons text-primary text-sm">local_fire_department</span>
                                    Flame Credits
                                </h4>
                                <span class="text-primary font-display font-black text-md">12,500 CC</span>
                            </div>
                            <p class="text-[9px] font-black text-gray-400 uppercase leading-relaxed mb-6">Redeem 5,000 CC for a 15% discount on the current ritual payload.</p>
                            <button class="w-full py-3 border border-primary/40 text-primary font-display font-black uppercase text-[9px] tracking-widest hover:bg-primary hover:text-white transition-all">Redeem Credits</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <!-- MAIN SITE FOOTER (SCROLLABLE) -->
        <AppFooter />
    </main>
    <!-- FULL-VIEW DETAIL MODAL -->
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
                  {{ selectedHighlight.description }}
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

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=Inter:wght@300;400;700;900&display=swap');

.font-display { font-family: 'Outfit', sans-serif; }
.font-body { font-family: 'Inter', sans-serif; }
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Tactical Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #000; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #D90404; border-radius: 10px; }

/* Hide Scrollbar Utility */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { 
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* Selection Fixes */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}

/* Modal Animations */
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

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-modal-pop {
  animation: modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Toast Animations */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes toastProgress {
  from { top: 0; }
  to { top: 100%; }
}
.animate-toast-progress {
  animation: toastProgress 5s linear forwards;
}

/* Slide-Fade-Up Transition */
.slide-fade-up-enter-active,
.slide-fade-up-leave-active {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  filter: blur(10px);
}

.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
  filter: blur(10px);
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

/* Mobile Drawer Transition */
.drawer-enter-active, .drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active nav, .drawer-leave-active nav {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from nav, .drawer-leave-to nav {
  transform: translateX(-100%);
}
</style>

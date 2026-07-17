<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import AppFooter from './AppFooter.vue'
import { cart, addToCart } from '../cartState'

// ─── State Management ────────────────────────────────────────────────────────
const menuMode = ref('dine') // 'dine' or 'butchery'
const searchQuery = ref('')
const activeCategory = ref('All')
const showItemDetail = ref(null)

// ─── Scroll Progress System ──────────────────────────────────────────────────
const scrollProgress = ref(0)
const handleScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const locations = ['Kikuyu', 'Westlands', 'Karen', 'Mombasa Road']
const butcheryCategories = ['All', 'Beef', 'Lamb', 'Pork', 'Sausages', 'Ritual Gear']
const dineCategories = ['All', 'Starters', 'Signature', 'Premium', 'Sides', 'Desserts', 'The Bar']

const categories = computed(() => menuMode.value === 'dine' 
    ? dineCategories
    : butcheryCategories
)

// ─── Toast System ───────────────────────────────────────────────────────────
const notifications = ref([])
const handleAddToCart = (item) => {
    addToCart(item)
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

// ─── Advertising Carousel State ─────────────────────────────────────────────
const activeLeftAd = ref(0)
const activeRightAd = ref(0)
const pausedCategories = reactive({})
const sanitizeId = (str) => str.replace(/\s+/g, '-').toLowerCase()

const leftAds = [
    {
        tag: 'Weekly Ritual',
        title: 'Savage Sunday <br/><span class="text-primary italic">Platter Ritual</span>',
        price: 'KSh 4,500',
        detail: 'Live from Kitchen',
        image: 'https://images.unsplash.com/photo-1544124499-196aa0967fc0?auto=format&fit=crop&w=1200&q=80',
        action: 'Pre-book'
    },
    {
        tag: 'Live Event',
        title: 'Savage Beats <br/><span class="text-primary italic">& Bourbon Nights</span>',
        price: 'Every Friday',
        detail: 'Live Vinyl DJ',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
        action: 'Join us'
    },
    {
        tag: 'Exclusive',
        title: 'Midnight <br/><span class="text-primary italic">Chef Selection</span>',
        price: 'Invite Only',
        detail: 'Secret Menu',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
        action: 'Inquire'
    },
    {
        tag: 'Operational',
        title: 'Live <span class="text-primary italic">Deployment</span> <br/>Direct to Sector',
        price: 'Delivery Active',
        detail: 'Doorstep extraction',
        image: 'https://images.unsplash.com/photo-1526367764999-5f507ba73252?auto=format&fit=crop&w=1200&q=80',
        action: 'Protocol Info'
    }
]

const rightAds = [
    {
        tag: 'Master Griller',
        title: 'Dry-Aged <br/><span class="text-primary italic">Prime Vault</span>',
        price: '20% OFF RAW',
        detail: "Butcher's Choice",
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80',
        action: 'Claim Now'
    },
    {
        tag: 'New Entry',
        title: 'A5 Wagyu <br/><span class="text-primary italic">Limited Stock</span>',
        price: 'Market Price',
        detail: 'Direct from Japan',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?auto=format&fit=crop&w=1200&q=80',
        action: 'View Cut'
    },
    {
        tag: 'Limited Edition',
        title: 'Gold Leaf <br/><span class="text-primary italic">Everything Pack</span>',
        price: 'KSh 25,000',
        detail: 'The Ultimate Gift',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
        action: 'Order Gift'
    },
    {
        tag: 'Fulfillment',
        title: 'Secure <span class="text-primary italic">Extraction</span> <br/>Self-Pickup Hub',
        price: 'Ready in 30M',
        detail: 'Skip the logistics',
        image: 'https://images.unsplash.com/photo-1556740734-7f9582b914a4?auto=format&fit=crop&w=1200&q=80',
        action: 'Hub Location'
    }
]

// ─── Interval Registry ───────────────────────────────────────────────────────
let leftInterval, rightInterval

// ─── Tactical Operations Data ──────────────────────────────────────────────
const deploymentSteps = [
    { title: 'Initialize Sector', desc: 'Select between Dine-In Hub or Butchery Deck for yields.', img: 'https://images.unsplash.com/photo-1551218808-94e220e0341c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Identify Targets', desc: 'Isolate flavor profiles via filters or tactical search.', img: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=600&q=80' },
    { title: 'Execute Ritual', desc: 'Add fragments and proceed to the Checkout Uplink.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
    { title: 'Track Payload', desc: 'Monitor the extraction logistics for live ETA telemetry.', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80' }
]

// ─── Menu Data ───────────────────────────────────────────────────────────────
const allItems = [
  // STARTERS
  {
    name: 'Bourbon Wings',
    price: 1200,
    rating: 4.8,
    description: 'Crispy wings glazed in a honey-bourbon reduction. Served with blue cheese dip.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    category: 'Starters'
  },
  {
    name: 'Garlic Prawns',
    price: 2500,
    rating: 4.9,
    description: 'Jumbo prawns sautéed in garlic chili butter and lime zest.',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?auto=format&fit=crop&w=800&q=80',
    category: 'Starters'
  },
  {
    name: 'Wagyu Sliders',
    price: 1800,
    rating: 5,
    description: 'Three mini Wagyu beef patties with caramelized onions and truffle mayo.',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80',
    category: 'Starters'
  },
  {
    name: 'Beef Carpaccio',
    price: 2200,
    rating: 4.8,
    description: 'Thinly sliced raw Wagyu beef, parmesan shavings, and arugula.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    category: 'Starters'
  },
  {
      name: 'Marrow Toast',
      price: 1500,
      rating: 4.7,
      description: 'Roasted bone marrow with herb crust and sourdough toast.',
      image: 'https://images.unsplash.com/photo-1603360946369-dc9bb2258139?auto=format&fit=crop&w=800&q=80',
      category: 'Starters'
  },
  {
      name: 'Chili Poppers',
      price: 900,
      rating: 4.5,
      description: 'Fire-roasted chilies stuffed with cream cheese and brisket bits.',
      image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
      category: 'Starters'
  },
  {
      name: 'Crispy Calamari',
      price: 1600,
      rating: 4.6,
      description: 'Lightly battered calamari rings with spicy harissa aioli.',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
      category: 'Starters'
  },
  {
      name: 'Truffle Fries',
      price: 850,
      rating: 4.4,
      description: 'Hand-cut fries tossed in truffle oil and parmesan dust.',
      image: 'https://images.unsplash.com/photo-1518013391915-e487594df63c?auto=format&fit=crop&w=800&q=80',
      category: 'Starters'
  },

  // SIGNATURE
  {
    name: 'The AFI Tomahawk',
    price: 12500,
    rating: 5,
    description: '42oz Bone-in Ribeye, dry-aged for 45 days. Served with roasted garlic bone-marrow gravy.',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80',
    tag: 'Signature',
    category: 'Signature'
  },
  {
    name: 'Savage T-Bone',
    price: 7500,
    rating: 4.8,
    description: '24oz T-Bone, flame-kissed with our house savage rub and marrow butter.',
    image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80',
    tag: 'Signature',
    category: 'Signature'
  },
  {
    name: 'Heritage Roast',
    price: 4500,
    rating: 4.9,
    description: 'Slow-roasted prime beef with artisanal vegetables and bone-marrow gravy.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    tag: 'Sunday Special',
    category: 'Signature'
  },
  {
    name: 'Black Garlic Ribeye',
    price: 6500,
    rating: 4.7,
    description: '16oz Hand-cut ribeye, crusted with fermented black garlic and smoked sea salt.',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?auto=format&fit=crop&w=800&q=80',
    category: 'Signature'
  },
  {
      name: 'Smoked Brisket',
      price: 3200,
      rating: 4.9,
      description: '12-hour hickory smoked brisket with bourbon BBQ glaze.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      category: 'Signature'
  },
  {
      name: 'Lamb Rack Savory',
      price: 5500,
      rating: 4.8,
      description: 'Herb-crusted lamb rack with mint reduction and charred vegetables.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      category: 'Signature'
  },
  {
      name: 'Flat Iron Steak',
      price: 3800,
      rating: 4.7,
      description: 'Hand-cut flat iron with chimichurri and garlic confit.',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      category: 'Signature'
  },
  {
      name: 'Pork Belly Burnt',
      price: 2200,
      rating: 4.9,
      description: 'Cubed pork belly, glazed in maple-bourbon reduction.',
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
      category: 'Signature'
  },

  // PREMIUM
  {
    name: 'A5 Wagyu Strip',
    price: 9500,
    rating: 5,
    description: '12oz Japanese A5 Wagyu. Exceptional marbling, served with black salt and truffle oil infusion.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Premium',
    category: 'Premium'
  },
  {
    name: "The King's Platter",
    price: 18500,
    rating: 5,
    description: 'A grand selection of Ribeye, glazed Pork Ribs, and bone marrow.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb2258139?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Ultimate',
    category: 'Premium'
  },
  {
    name: 'Surf & Turf Royal',
    price: 22000,
    rating: 4.9,
    description: 'Two 6oz Filet Mignons, lobster tails, and jumbo shrimp.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Royal',
    category: 'Premium'
  },
  {
    name: 'Gold Leaf Fillet',
    price: 12000,
    rating: 5,
    description: 'Center-cut filet mignon topped with 24k gold leaf and velvet butter.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Premium'
  },
  {
      name: 'Dry-Aged T-Bone',
      price: 8800,
      rating: 4.9,
      description: '30-day dry-aged T-Bone with truffle butter and smoked salt.',
      image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Premium'
  },
  {
      name: 'Venison Steak',
      price: 6500,
      rating: 4.8,
      description: 'Pan-seared venison with blackberry gastrique and parsnip puree.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Premium'
  },

  // SIDES
  {
    name: 'Truffle Mac & Cheese',
    price: 1400,
    rating: 4.7,
    description: 'Aged cheddar and truffle parmesan crust.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Sides'
  },
  {
    name: 'Loaded Potato',
    price: 1200,
    rating: 4.6,
    description: 'Bacon, sour cream, chives, and sharp cheddar.',
    image: 'https://images.unsplash.com/photo-1518013391915-e487594df63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Sides'
  },
  {
    name: 'Creamed Spinach',
    price: 1000,
    rating: 4.5,
    description: 'Classic steakhouse style with nutmeg and cream.',
    image: 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Sides'
  },
  {
      name: 'Grilled Asparagus',
      price: 1100,
      rating: 4.6,
      description: 'Flame-grilled with lemon butter and black pepper.',
      image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sides'
  },
  {
      name: 'Sweet Potato Fries',
      price: 800,
      rating: 4.4,
      description: 'Hand-cut with cinnamon dust and honey dip.',
      image: 'https://images.unsplash.com/photo-1518013391915-e487594df63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sides'
  },
  {
      name: 'Charred Broccolini',
      price: 950,
      rating: 4.5,
      description: 'Roasted with chili flakes and toasted almonds.',
      image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sides'
  },

  // DESSERTS
  {
    name: 'Savage Lava Cake',
    price: 1500,
    rating: 4.9,
    description: 'Dark Belgian chocolate with a molten heart of salted caramel.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c849a13e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Desserts'
  },
  {
    name: 'Bourbon Pecan Pie',
    price: 1200,
    rating: 4.7,
    description: 'Warm pecan pie with a kick of Kentucky bourbon and vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1509149190613-42be110c8189?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Desserts'
  },
  {
    name: 'Gold Leaf Brownie',
    price: 2500,
    rating: 5,
    description: 'Fudgy triple-chocolate brownie topped with 24k gold leaf.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Desserts'
  },
  {
      name: 'NY Cheesecake',
      price: 1300,
      rating: 4.8,
      description: 'New York style with berry compote and graham cracker crust.',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Desserts'
  },
  {
      name: 'Tiramisu Savage',
      price: 1800,
      rating: 4.9,
      description: 'Espresso-soaked ladyfingers with mascarpone and cocoa.',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Desserts'
  },
  {
      name: 'Bread Pudding',
      price: 1100,
      rating: 4.7,
      description: 'Warm brioche pudding with white chocolate and raspberries.',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Desserts'
  },

  // THE BAR
  {
    name: 'Savage Old Fashioned',
    price: 1800,
    rating: 5,
    description: 'Smoked oak bourbon, bitter orange, and a hint of cherry wood smoke.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'The Bar'
  },
  {
    name: 'AFI Signature Red',
    price: 12000,
    rating: 4.9,
    description: 'A bold Cabernet Sauvignon, specially aged for our steakhouse.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'The Bar'
  },
  {
    name: 'Smoked Tequila Sour',
    price: 1600,
    rating: 4.7,
    description: 'Añejo tequila, mezcal, agave, and fresh lime with a smoky rim.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'The Bar'
  },
  {
      name: 'Single Malt 18y',
      price: 3500,
      rating: 4.9,
      description: 'Premium scotch with a single clear ice sphere.',
      image: 'https://images.unsplash.com/photo-1527281473222-793895bf44b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'The Bar'
  },
  {
      name: 'Gin Botanical',
      price: 1400,
      rating: 4.6,
      description: 'Handcrafted gin with cucumber, elderflower and tonic.',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'The Bar'
  },
  {
      name: 'Spicy Paloma',
      price: 1550,
      rating: 4.7,
      description: 'Tequila, grapefruit juice, and a splash of jalapeño syrup.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'The Bar'
  },

  // BUTCHERY
  {
    name: 'Dry-Aged Ribeye (Raw)',
    price: 4500,
    rating: 5,
    description: 'Aged 45 days in our salt-brick vault. Ready for your home grill.',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    tag: 'Butcher Select',
    category: 'Beef',
    isButchery: true
  },
  {
    name: 'Raw Tomahawk',
    price: 8500,
    rating: 5,
    description: 'A dramatic bone-in ribeye for the ultimate home BBQ experience.',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?auto=format&fit=crop&w=800&q=80',
    tag: 'Showstopper',
    category: 'Beef',
    isButchery: true
  },
  {
    name: 'Wagyu Burger Patties',
    price: 3200,
    rating: 4.9,
    description: 'Hand-pressed Wagyu blend with bone-marrow fat infusion. Set of 4.',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=800&q=80',
    category: 'Beef',
    isButchery: true
  },
  {
    name: 'Signature BBQ Sauce',
    price: 950,
    rating: 4.9,
    description: 'Rich, smoky, and slightly sweet. The perfect finishing touch.',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80',
    category: 'Ritual Gear',
    isButchery: true
  },
  {
      name: 'Bacon Jam Jar',
      price: 1800,
      rating: 4.8,
      description: 'Slow-cooked bacon with onions and balsamic. 250g jar.',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Ritual Gear',
      isButchery: true
  },
    {
      name: 'AFI Sirloin Block',
      price: 2400,
      rating: 4.7,
      description: 'Lean, tender sirloin aged for 21 days. Perfect for tactical portioning.',
      image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=800&q=80',
      tag: 'Aged 21 Days',
      category: 'Beef',
      isButchery: true
    },
    {
      name: 'Highlands Lamb Rack',
      price: 3800,
      rating: 4.9,
      description: 'Spring lamb, tender and full of flavor. Pre-trimmed for immediate deployment.',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
      tag: 'Fresh Yield',
      category: 'Lamb',
      isButchery: true
    },
    {
      name: 'Obsidian Pork Chops',
      price: 1800,
      rating: 4.6,
      description: 'Thick-cut, bone-in pork chops. Marinated in our signature charcoal rub.',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
      category: 'Pork',
      isButchery: true
    },
    {
      name: 'Artisanal Beef Sausage',
      price: 1200,
      rating: 4.8,
      description: 'Spiced with our proprietary AFI rub. Hand-linked and smoked over hickory.',
      image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ff36ff?auto=format&fit=crop&w=800&q=80',
      category: 'Sausages',
      isButchery: true
    },
    {
      name: 'Tactical T-Bone Cut',
      price: 3200,
      rating: 4.9,
      description: 'The best of both worlds: Fillet and Sirloin on the bone. High-grade marbling.',
      image: 'https://images.unsplash.com/photo-1606416132922-22ab37c1231e?auto=format&fit=crop&w=800&q=80',
      tag: 'Prime Cut',
      category: 'Beef',
      isButchery: true
    },
    {
      name: 'Bone Marrow Canoe',
      price: 1500,
      rating: 4.7,
      description: 'Pre-split bone marrow, rich in specialized healthy fats and minerals.',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      category: 'Beef',
      isButchery: true
    },
    {
      name: 'Savage Salt Scrub',
      price: 850,
      rating: 5,
      description: 'Infused with volcanic minerals and activated charcoal for the ultimate crust ritual.',
      image: 'https://images.unsplash.com/photo-1541014741259-df549cae7744?auto=format&fit=crop&w=800&q=80',
      tag: 'Ritual Gear',
      category: 'Ritual Gear',
      isButchery: true
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
      name: 'MBUGUA',
      role: 'Elite Member',
      text: 'Consistent quality and great ambiance. The dry-aged cuts are a revelation.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
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

// ─── Computed Logic ──────────────────────────────────────────────────────────
const filteredItems = computed(() => {
  return allItems.filter(item => {
    // Mode grouping logic
    const modeMatches = menuMode.value === 'butchery' 
        ? (item.isButchery === true)
        : (item.isButchery !== true)
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'All' || item.category === activeCategory.value
    return modeMatches && matchesSearch && matchesCategory
  })
})

const itemsByCategory = computed(() => {
  const grouped = {}
  categories.value.filter(c => c !== 'All').forEach(cat => {
    const items = filteredItems.value.filter(item => item.category === cat)
    if (items.length > 0) {
      grouped[cat] = items
    }
  })
  return grouped
})

const splitItemsForRows = (items) => {
    // On mobile (< sm) always single row; desktop splits large sets into 2 rows
    if (typeof window !== 'undefined' && window.innerWidth < 640) return [items]
    if (items.length < 6) return [items]
    const mid = Math.ceil(items.length / 2)
    return [items.slice(0, mid), items.slice(mid)]
}

// ─── Carousel Logic ──────────────────────────────────────────────────────────
const scrollCarousel = (id, direction) => {
    const el = document.getElementById(id)
    if (!el) return
    // Scroll by one card width (first child width + gap)
    const firstCard = el.querySelector('[data-card]')
    const cardW = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.85
    el.scrollBy({ left: direction === 'next' ? cardW : -cardW, behavior: 'smooth' })
}

// ─── Unified Animation System ────────────────────────────────────────────────
let rafId = null
const animateSystem = () => {
    const protocol = document.getElementById('protocol-ticker')
    if (protocol) {
        protocol.scrollLeft += 0.8
        if (protocol.scrollLeft >= protocol.scrollWidth / 2) protocol.scrollLeft = 0
    }
    rafId = requestAnimationFrame(animateSystem)
}

let carouselAutoInterval = null
const startCarouselAutoPlay = () => {
    carouselAutoInterval = setInterval(() => {
        Object.keys(itemsByCategory.value).forEach(category => {
            const rows = splitItemsForRows(itemsByCategory.value[category])
            rows.forEach((_, rowIndex) => {
                const id = `carousel-${sanitizeId(category)}-${rowIndex}`
                if (pausedCategories[id]) return
                const el = document.getElementById(id)
                if (!el) return
                const firstCard = el.querySelector('[data-card]')
                const cardW = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth
                const maxScroll = el.scrollWidth - el.clientWidth
                if (rowIndex % 2 === 0) {
                    if (el.scrollLeft >= maxScroll - 4) {
                        el.scrollTo({ left: 0, behavior: 'smooth' })
                    } else {
                        el.scrollBy({ left: cardW, behavior: 'smooth' })
                    }
                } else {
                    if (el.scrollLeft <= 4) {
                        el.scrollTo({ left: maxScroll, behavior: 'smooth' })
                    } else {
                        el.scrollBy({ left: -cardW, behavior: 'smooth' })
                    }
                }
            })
        })
    }, 3500)
}

// ─── Scroll Reveal Logic ───────────────────────────────────────────────────
let observer = null

const observeElements = () => {
    if (observer) {
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            observer.observe(el)
        })
    }
}

watch([menuMode, activeCategory, searchQuery], () => {
    nextTick(() => {
        observeElements()
    })
})

onMounted(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active')
            }
        })
    }, observerOptions)

    observeElements()

    // 1. Initialize Ad Protocols
    leftInterval = setInterval(() => {
        activeLeftAd.value = (activeLeftAd.value + 1) % leftAds.length
    }, 5000)

    rightInterval = setInterval(() => {
        activeRightAd.value = (activeRightAd.value + 1) % rightAds.length
    }, 5500)

    // 2. Start ticker rAF + carousel auto-play
    animateSystem()
    startCarouselAutoPlay()

    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    if (leftInterval) clearInterval(leftInterval)
    if (rightInterval) clearInterval(rightInterval)
    if (carouselAutoInterval) clearInterval(carouselAutoInterval)
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bg-black text-white font-body overflow-x-hidden min-h-screen pt-28 no-scrollbar">
    
    <!-- Scroll Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-[#ff4d4d] z-[2000] shadow-[0_0_15px_rgba(217,4,4,0.8)] transition-all duration-100"
      :style="{ width: scrollProgress + '%' }"
    ></div>
    
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
    
    <!-- Page Header with Immersive Atmospheric Background & Advertising Carousels -->
    <header class="py-10 border-b border-white/5 relative overflow-hidden group/header">
        
        <!-- Atmospheric Dynamic Background -->
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                 class="w-full h-full object-cover scale-105 group-hover/header:scale-110 transition-transform duration-[20s] ease-linear brightness-[0.2] contrast-[1.2]">
            <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
            <!-- Texture Overlay -->
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 z-20"></div>
        </div>

        <div class="max-w-[2100px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-10 relative z-30">
            
            <!-- LEFT DYNAMIC AD CAROUSEL -->
            <div class="hidden xl:flex w-[550px] h-[200px] relative overflow-hidden group cursor-pointer border border-white/10 hover:border-primary transition-all duration-700 animate-fade-in shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black/80 backdrop-blur-sm">
                <transition-group name="ad-slide">
                    <div v-for="(ad, index) in leftAds" :key="index" 
                         v-show="activeLeftAd === index"
                         class="absolute inset-0">
                        <div class="absolute inset-0 z-0 overflow-hidden">
                            <img :src="ad.image" 
                                 class="w-full h-full object-cover animate-ken-burns brightness-[0.5] contrast-125">
                            <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 p-8 flex flex-col justify-center text-left">
                                <span class="text-primary text-[9px] font-black uppercase tracking-[0.5em] mb-3 block animate-pulse">{{ ad.detail }}</span>
                                <h3 class="font-display text-4xl font-bold uppercase text-white leading-none mb-4 tracking-tighter" v-html="ad.title"></h3>
                                <div class="flex items-center gap-6 mt-2">
                                    <span class="text-3xl font-display font-bold text-white border-l-2 border-primary pl-4">{{ ad.price }}</span>
                                    <div class="flex items-center gap-2 group/btn cursor-pointer bg-primary px-4 py-1.5 hover:bg-white transition-colors">
                                       <span class="text-[9px] uppercase font-black tracking-widest text-white group-hover/btn:text-black">{{ ad.action }}</span>
                                       <span class="material-icons text-white group-hover/btn:text-black text-sm">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
                <!-- Carousel Indicators -->
                <div class="absolute bottom-4 left-8 z-30 flex gap-2">
                    <div v-for="(_, i) in leftAds" :key="i" 
                         class="w-8 h-1 transition-all duration-500"
                         :class="activeLeftAd === i ? 'bg-primary' : 'bg-white/20'"></div>
                </div>
            </div>

            <!-- Main Title Area -->
            <div class="text-center flex-1 py-4">
                <span class="font-script text-4xl text-primary mb-2 block animate-fade-in">Raw & Refined</span>
                <h1 class="font-display text-6xl md:text-[95px] font-bold uppercase tracking-tighter text-white animate-slide-up transform -rotate-1 leading-[0.8] drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                    The <span class="text-primary italic">Savage</span> <br/>Dine
                </h1>
                <div class="w-40 h-1 bg-primary mx-auto mt-4 shadow-[0_0_30px_rgba(217,4,4,1)]"></div>
            </div>

            <!-- RIGHT DYNAMIC AD CAROUSEL -->
            <div class="hidden xl:flex w-[550px] h-[200px] relative overflow-hidden group cursor-pointer border border-white/10 hover:border-primary transition-all duration-700 animate-fade-in shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black/80 backdrop-blur-sm">
                <transition-group name="ad-slide">
                    <div v-for="(ad, index) in rightAds" :key="index" 
                         v-show="activeRightAd === index"
                         class="absolute inset-0">
                        <div class="absolute inset-0 z-0 overflow-hidden text-right">
                            <img :src="ad.image" 
                                 class="w-full h-full object-cover animate-ken-burns brightness-[0.5] contrast-125">
                            <div class="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent z-10 p-8 flex flex-col justify-center items-end">
                                <span class="text-primary text-[9px] font-black uppercase tracking-[0.5em] mb-3 block animate-pulse">{{ ad.detail }}</span>
                                <h3 class="font-display text-4xl font-bold uppercase text-white leading-none mb-4 tracking-tighter" v-html="ad.title"></h3>
                                <div class="flex items-center gap-6 mt-2">
                                    <div class="flex items-center gap-2 group/btn cursor-pointer border border-primary px-4 py-1.5 hover:bg-primary transition-colors">
                                       <span class="material-icons text-primary group-hover/btn:text-white text-sm">local_offer</span>
                                       <span class="text-[9px] uppercase font-black tracking-widest text-primary group-hover/btn:text-white">{{ ad.action }}</span>
                                    </div>
                                    <span class="text-3xl font-display font-bold text-white border-r-2 border-primary pr-4">{{ ad.price }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
                <!-- Carousel Indicators -->
                <div class="absolute bottom-4 right-8 z-30 flex gap-2">
                    <div v-for="(_, i) in rightAds" :key="i" 
                         class="w-8 h-1 transition-all duration-500"
                         :class="activeRightAd === i ? 'bg-primary' : 'bg-white/20'"></div>
                </div>
            </div>
        </div>
    </header>

    <!-- Branch & Search Bar (Sticky) -->
    <div class="sticky top-[80px] md:top-[112px] z-[50] bg-black/90 backdrop-blur-xl border-b border-white/10 py-6">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
            <!-- Operational Mode Selector -->
            <div class="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-none group cursor-pointer hover:border-primary transition-colors text-left">
                <span class="material-icons text-primary">{{ menuMode === 'dine' ? 'restaurant' : 'outdoor_grill' }}</span>
                <div>
                    <p class="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Operational Sector</p>
                    <select v-model="menuMode" @change="activeCategory = 'All'" class="bg-transparent border-none text-white font-display text-lg focus:ring-0 p-0 cursor-pointer uppercase">
                        <option value="dine" class="bg-black text-white">Dine-In Hub</option>
                        <option value="butchery" class="bg-black text-white">Butchery Deck</option>
                    </select>
                </div>
            </div>

            <!-- Search -->
            <div class="relative flex-1 w-full lg:w-auto">
                <span class="material-icons absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input v-model="searchQuery" 
                       type="text" 
                       placeholder="SEARCH THE SAVAGE MENU..." 
                       class="w-full bg-white/5 border border-white/10 pl-16 pr-6 py-4 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-display uppercase tracking-widest">
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                <button v-for="cat in categories" :key="cat"
                        @click="activeCategory = cat"
                        class="px-6 py-2.5 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all border font-display"
                        :class="activeCategory === cat ? 'bg-primary border-primary text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'">
                    {{ cat }}
                </button>
            </div>
        </div>
    </div>

    <!-- Tactical Operations Protocol: Operational Marquee -->
    <section class="relative bg-black border-y border-white/10 mt-10 mb-12">
        <div class="max-w-[1800px] mx-auto overflow-hidden px-6 lg:px-12">
            <div id="protocol-ticker" class="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-4 py-2">
                <!-- Double the items for seamless loop -->
                <div v-for="step in [...deploymentSteps, ...deploymentSteps]" :key="step.title + Math.random()" 
                     class="group relative flex items-center gap-6 px-10 py-4 min-w-[320px] h-16 bg-black/60 border border-white/5 overflow-hidden transition-all hover:border-primary/40">
                     
                     <img :src="step.img" :alt="step.title" loading="lazy" class="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000">
                     <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                     
                     <!-- Scanner Effect -->
                     <div class="absolute top-0 bottom-0 w-[1px] bg-primary/40 shadow-[0_0_15px_rgba(217,4,4,0.8)] animate-scanner-horizontal opacity-0 group-hover:opacity-100"></div>

                     <div class="relative z-10 flex flex-col">
                         <h5 class="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-primary transition-colors leading-tight">{{ step.title }}</h5>
                         <p class="text-[8px] text-gray-400 uppercase font-light tracking-wide group-hover:text-white transition-colors">{{ step.desc }}</p>
                     </div>
                     
                     <div class="relative z-10 ml-auto flex items-center gap-2">
                         <span class="w-4 h-[1px] bg-primary group-hover:w-8 transition-all"></span>
                         <span class="material-icons text-primary text-[10px]">arrow_forward</span>
                     </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Main Content: Category Based Carousels -->
    <main class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4 divide-y divide-white/10">
        
        <div v-if="Object.keys(itemsByCategory).length === 0" class="text-center py-40">
            <span class="material-icons text-7xl text-gray-800 mb-6">sentiment_very_dissatisfied</span>
            <h3 class="font-display text-3xl uppercase text-gray-600">No treasures found in your search</h3>
            <button @click="searchQuery = ''; activeCategory = 'All'" class="text-primary mt-6 font-bold border-b-2 border-primary pb-2 text-xl">Reset Search</button>
        </div>

        <div v-for="(items, category) in itemsByCategory" :key="category" class="py-8 first:pt-0 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row items-end justify-between mb-6 px-3 gap-6">
                <div class="border-l-4 border-primary pl-8 text-left">
                    <span class="font-script text-3xl text-primary block -mb-1">{{ category === 'Butchery' ? 'Master Griller' : 'The Essence' }}</span>
                    <h2 class="font-display text-4xl md:text-6xl text-white font-bold uppercase tracking-tighter">{{ category }}</h2>
                </div>
            </div>

            <!-- MULTI-TIER CAROUSEL AREA: INDEPENDENT STACKED ROWS -->
            <div class="flex flex-col gap-8">
                <div v-for="(rowItems, rowIndex) in splitItemsForRows(items)" :key="rowIndex" 
                     class="relative group/carousel reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                     :style="{ transitionDelay: (rowIndex * 150) + 'ms' }">
                    
                    <!-- Tactical Row Indicator (desktop only) -->
                    <div class="absolute -left-2 top-0 h-full flex-col items-center justify-center gap-2 opacity-20 group-hover/carousel:opacity-100 transition-opacity hidden lg:flex">
                        <span class="text-[8px] font-black text-primary -rotate-90 uppercase tracking-widest whitespace-nowrap">Tier {{ rowIndex + 1 }}</span>
                        <div class="w-[1px] flex-1 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                    </div>

                    <!-- Left Arrow Button -->
                    <button 
                        @click="scrollCarousel(`carousel-${sanitizeId(category)}-${rowIndex}`, 'prev')"
                        class="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-16 sm:w-12 sm:h-24 bg-black/90 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white group shadow-xl"
                    >
                        <span class="material-icons text-xl sm:text-3xl group-hover:scale-125 transition-transform">chevron_left</span>
                    </button>

                    <!-- Carousel Container -->
                    <div 
                        :id="`carousel-${sanitizeId(category)}-${rowIndex}`"
                        @mouseenter="pausedCategories[`carousel-${sanitizeId(category)}-${rowIndex}`] = true"
                        @mouseleave="pausedCategories[`carousel-${sanitizeId(category)}-${rowIndex}`] = false"
                        @touchstart="pausedCategories[`carousel-${sanitizeId(category)}-${rowIndex}`] = true"
                        @touchend="pausedCategories[`carousel-${sanitizeId(category)}-${rowIndex}`] = false"
                        class="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar px-10 sm:px-14 carousel-track"
                    >
                        <div v-for="item in rowItems" :key="item.name"
                             data-card
                             class="snap-start flex-shrink-0 w-[calc(100vw-88px)] sm:w-[calc(50vw-56px)] lg:w-[calc(25vw-56px)] min-w-[240px] max-w-[340px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden group/card hover:border-primary/60 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col h-[400px]">
                            
                            <div class="relative h-44 overflow-hidden cursor-pointer" @click="showItemDetail = item">
                                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110">
                                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                
                                <div class="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover/card:translate-x-0 transition-transform duration-500">
                                  <button @click.stop="handleAddToCart(item)" class="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-2xl">
                                    <span class="material-icons text-sm">add_shopping_cart</span>
                                  </button>
                                </div>

                                <div v-if="item.tag" class="absolute top-4 left-4 bg-primary px-2 py-0.5 flex items-center border border-white/10">
                                  <span class="text-white text-[8px] font-black uppercase tracking-[0.2em]">{{ item.tag }}</span>
                                </div>
                                <div class="absolute bottom-4 left-4">
                                   <span class="text-primary font-display text-lg font-bold tracking-widest bg-black px-3 py-1 border border-white/10">KSh {{ item.price.toLocaleString() }}</span>
                                </div>
                            </div>

                            <div class="p-5 flex flex-col flex-1 text-left">
                                <div class="flex items-center gap-1.5 mb-1.5 text-primary">
                                   <span class="material-symbols-outlined text-[10px]">hotel_class</span>
                                   <span class="text-white text-[9px] font-bold tracking-widest font-display text-primary">{{ item.rating }} RATING</span>
                                </div>
                                <h4 @click="showItemDetail = item" class="font-display text-white font-bold text-lg uppercase tracking-tighter mb-1.5 group-hover/card:text-primary transition-colors cursor-pointer line-clamp-1">{{ item.name }}</h4>
                                <p class="text-gray-400 text-[10px] leading-relaxed line-clamp-2 font-body font-light mb-4 opacity-80">{{ item.description }}</p>
                                
                                <div class="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                   <button @click="handleAddToCart(item)" class="text-[9px] uppercase tracking-[0.3em] text-primary font-black flex items-center gap-2 group/btn">
                                       <span>Add to Order</span>
                                       <span class="material-icons text-xs transform group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                   </button>
                                   <span class="text-gray-700 text-[7px] uppercase font-bold tracking-widest">{{ item.category }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Arrow Button -->
                    <button 
                        @click="scrollCarousel(`carousel-${sanitizeId(category)}-${rowIndex}`, 'next')"
                        class="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-16 sm:w-12 sm:h-24 bg-black/90 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white group shadow-xl"
                    >
                        <span class="material-icons text-xl sm:text-3xl group-hover:scale-125 transition-transform">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <!-- Pop-up: Item Detail Modal -->
    <div v-if="showItemDetail" 
         class="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-xl" @click="showItemDetail = null"></div>
        <div class="relative bg-[#050505] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-modal-pop">
            <button @click="showItemDetail = null" class="absolute top-8 right-8 text-white/50 hover:text-primary z-50 transition-colors">
                <span class="material-icons text-4xl">close</span>
            </button>
            
            <div class="flex flex-col md:flex-row h-full">
                <div class="md:w-1/2 h-80 md:h-[600px] overflow-hidden text-left">
                    <img :src="showItemDetail.image" :alt="showItemDetail.name" class="w-full h-full object-cover">
                </div>
                <div class="md:w-1/2 p-12 md:p-20 flex flex-col text-left">
                    <span class="text-primary font-display font-black text-xs uppercase tracking-[0.4em] mb-4">{{ showItemDetail.category }}</span>
                    <h2 class="font-display text-4xl md:text-6xl text-white font-bold uppercase tracking-tighter mb-6">{{ showItemDetail.name }}</h2>
                    
                    <div class="flex items-center gap-6 mb-10">
                        <span class="text-5xl font-display font-bold text-primary">KSh {{ showItemDetail.price.toLocaleString() }}</span>
                        <div class="h-10 w-[1px] bg-white/10"></div>
                        <div class="flex items-center gap-2">
                           <span class="material-icons text-yellow-500">star</span>
                           <span class="text-xl font-display font-bold">{{ showItemDetail.rating }}</span>
                        </div>
                    </div>

                    <p class="text-gray-400 text-lg leading-relaxed font-light mb-12 flex-1">
                        {{ showItemDetail.description }} Our master chefs recommend medium-rare to experience the full marbling depth of this signature cut.
                    </p>

                    <div class="grid grid-cols-2 gap-4">
                        <button @click="handleAddToCart(showItemDetail); showItemDetail = null" class="bg-primary text-white py-5 font-display font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
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

    <!-- Locations Section Start -->
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
                <div class="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-none text-white shadow-2xl max-w-xs transition-transform duration-500 group-hover/map:translate-x-2 text-left">
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

    <!-- Testimonials Section -->
    <section class="bg-black py-24 relative overflow-hidden reveal-on-scroll opacity-0 translate-y-12 transition-all duration-600 border-t border-white/5">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <span class="font-script text-3xl text-primary block mb-2">Voice of the Tribe</span>
                <h2 class="text-5xl md:text-7xl font-display text-white mb-4 tracking-tight uppercase">Savage <span class="text-primary italic">Tales</span></h2>
                <div class="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(t, index) in testimonials" :key="t.name" 
                     class="bg-black/95 backdrop-blur-3xl border border-white/10 p-10 flex flex-col group hover:border-primary/60 transition-all duration-500 text-left reveal-on-scroll opacity-0 translate-y-12"
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

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.scrollbar-style::-webkit-scrollbar { height: 4px; }
.scrollbar-style::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
.scrollbar-style::-webkit-scrollbar-thumb { background: #D90404; }

.animate-fade-in {
  animation: fadeIn 1.2s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.animate-modal-pop {
  animation: modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Cinematic Ken Burns Effect */
.animate-ken-burns {
  animation: kenBurns 20s linear infinite alternate;
}

@keyframes kenBurns {
  0% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.15) translate(-2%, -2%); }
  100% { transform: scale(1.3) translate(-4%, -4%); }
}

/* Ad Transition Animations */
.ad-slide-enter-active, .ad-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.ad-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.ad-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}

/* Scroll Reveal */
.reveal-active {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
/* Map Styling */
.map-container iframe {
  filter: grayscale(100%) invert(92%) contrast(83%);
  transition: filter 0.5s ease;
}
.group\/map:hover .map-container iframe {
  filter: grayscale(80%) invert(90%) contrast(90%);
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

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

@keyframes scanner-horizontal {
  0% { left: -10%; }
  100% { left: 110%; }
}

.animate-scanner-horizontal {
  animation: scanner-horizontal 2.5s linear infinite;
}
</style>

import { ref, computed } from 'vue'

export const cart = ref([])

export const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

export const addToCart = (item) => {
  const existing = cart.value.find(i => i.name === item.name)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
}

export const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

// ─── Shared Currency Converter State ──────────────────────────────────────────
export const selectedCurrency = ref('KES')

export const exchangeRates = {
  KES: 1.0,
  USD: 0.0078,
  EUR: 0.0072,
  GBP: 0.0061,
  AED: 0.0286,
  ZAR: 0.14
}

export const currencySymbols = {
  KES: 'KSh',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
  ZAR: 'R '
}

export const currencyNames = {
  KES: 'Kenyan Shilling',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  AED: 'UAE Dirham',
  ZAR: 'South African Rand'
}

export const formatPrice = (priceInKes) => {
  let numPrice = 0
  if (typeof priceInKes === 'string') {
    numPrice = parseFloat(priceInKes.replace(/[^0-9.]/g, '')) || 0
  } else {
    numPrice = parseFloat(priceInKes) || 0
  }
  
  const converted = numPrice * exchangeRates[selectedCurrency.value]
  const symbol = currencySymbols[selectedCurrency.value]
  
  if (selectedCurrency.value === 'KES') {
    return `${symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }
  return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}


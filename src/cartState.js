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

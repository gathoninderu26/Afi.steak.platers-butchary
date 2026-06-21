<script setup>
import AppNavbar from './components/AppNavbar.vue'
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
</style>

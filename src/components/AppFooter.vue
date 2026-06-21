<template>
  <footer class="bg-black text-white pt-16 pb-8 border-t border-gray-800 relative z-10">
    <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex flex-col mb-6">
            <div class="flex items-end leading-none">
              <span class="font-display font-bold text-4xl tracking-tighter text-white">AF</span>
              <div class="relative">
                <span class="font-display font-bold text-4xl tracking-tighter text-white">I</span>
                <span class="absolute -top-1 left-0 w-full h-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(217,4,4,0.8)]"></span>
              </div>
            </div>
            <span class="font-script text-lg -mt-1 text-gray-300">Steaks &amp; Platters</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            Premium steakhouse delivering an authentic culinary experience with a fiery twist. Quality meats, exceptional service.
          </p>
          <div class="flex space-x-4">
            <a class="text-gray-400 hover:text-primary transition-colors" href="#"><span class="material-icons">facebook</span></a>
            <a class="text-gray-400 hover:text-primary transition-colors" href="#"><span class="material-icons">camera_alt</span></a>
            <a class="text-gray-400 hover:text-primary transition-colors" href="#"><span class="material-icons">alternate_email</span></a>
          </div>
        </div>
        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-bold text-lg uppercase mb-6 tracking-wider">Quick Links</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li><router-link class="hover:text-white transition-colors" to="/menu">Our Menu</router-link></li>
            <li><router-link class="hover:text-white transition-colors" to="/gallery">Chronicle</router-link></li>
            <li><router-link class="hover:text-white transition-colors" to="/contact">Support</router-link></li>
          </ul>
        </div>
        <!-- Contact -->
        <div>
          <h4 class="font-display font-bold text-lg uppercase mb-6 tracking-wider">Contact</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-3">
              <span class="material-icons text-primary text-sm mt-1">location_on</span>
              <span>Main Southern Bypass Road,<br />Kikuyu, Kiambu County</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-primary text-sm">phone</span>
              <span>+254 700 000 000</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-primary text-sm">email</span>
              <span>reservations@afikenya.com</span>
            </li>
          </ul>
        </div>
        <!-- Opening Hours -->
        <div>
          <h4 class="font-display font-bold text-lg uppercase mb-6 tracking-wider">Opening Hours</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex justify-between">
              <span>Mon - Thu</span>
              <span class="text-white">5:00 PM - 10:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Fri - Sat</span>
              <span class="text-white">5:00 PM - 11:00 PM</span>
            </li>
            <li class="flex justify-between">
              <span>Sunday</span>
              <span class="text-white">4:00 PM - 9:30 PM</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2023 AFI Steaks &amp; Platters. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a class="hover:text-white" href="#">Privacy Policy</a>
          <a class="hover:text-white" href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No extra logic needed for now
</script>

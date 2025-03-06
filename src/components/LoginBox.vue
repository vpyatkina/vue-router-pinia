<script setup>
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

import msLoginLight from '@/assets/ms-login.svg'
import msLoginDark from '@/assets/ms-login-dark.svg'

//Function to login the user when the login with MS button is pressed
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'azure',
  })
}

// Initialize with the current system theme
const newColorScheme = ref(
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
)

// Update when system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  newColorScheme.value = event.matches ? 'dark' : 'light'
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="bg-white dark:bg-neutral-800 p-5 rounded-xl text-center">
      <h1 class="text-primary text-4xl">Login</h1>
      <img
        class="mt-10 cursor-pointer"
        @click="login"
        :src="newColorScheme === 'light' ? msLoginLight : msLoginDark"
      />
    </div>
  </div>
</template>

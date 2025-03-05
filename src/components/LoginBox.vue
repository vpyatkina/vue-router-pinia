<script setup>
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

import msLoginLight from '@/assets/ms-login.svg'
import msLoginDark from '@/assets/ms-login-dark.svg'

//Function to login the user when the login with MS button is pressed
async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
  })
  console.log(data)
  console.log(error)
}

// Initialize with the current system theme
const newColorScheme = ref(
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
)

console.log(newColorScheme.value)

// Update when system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  newColorScheme.value = event.matches ? 'dark' : 'light'
  console.log(newColorScheme.value)
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

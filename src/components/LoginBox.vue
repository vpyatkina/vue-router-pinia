<script setup>
import { supabase } from '@/lib/supabaseClient'

async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
  })
  console.log(data)
  console.log(error)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="bg-white p-5 rounded-3xl text-center">
      <h1 class="text-primary text-4xl">Login</h1>
      <img class="mt-10 cursor-pointer" @click="login" src="@/assets/ms-login.svg" />
    </div>
  </div>
</template>

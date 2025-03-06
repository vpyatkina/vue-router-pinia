<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { Button, Menubar, Toast } from 'primevue'
import { supabase } from './lib/supabaseClient'
import router from './router'

const items = ref([
  {
    label: 'Form',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Table',
    command: () => {
      router.push('/table')
    },
  },
])

//logout a user
async function logOut() {
  const { error } = await supabase.auth.signOut()
  console.log(error)
}

//redirect user back to login page once login is processed
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/login')
    console.log('Signed Out')
    getUser()
  }
})

const user = ref()

//check if user is logged in, in order to hide menu bar when they arent
async function getUser() {
  const response = await supabase.auth.getUser()
  user.value = response.data.user
}

getUser()
</script>

<template>
  <Menubar v-if="user !== null" :model="items">
    <template #end> <Button @click="logOut" label="Log Out"></Button> </template>
  </Menubar>
  <Toast></Toast>
  <RouterView />
</template>

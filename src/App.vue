<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import { Button } from 'primevue'
import { supabase } from './lib/supabaseClient'
import router from './router'

const items = ref([
  {
    label: 'Form',
  },
  {
    label: 'Table',
  },
])

async function logOut() {
  const { error } = await supabase.auth.signOut()
  console.log(error)
}

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  if (event === 'SIGNED_OUT') {
    router.push('/login')
    console.log('Signed Out')
    getUser()
  }
})

const user = ref()

async function getUser() {
  const response = await supabase.auth.getUser()
  user.value = response.data.user
  console.log(user.value)
}

getUser()
</script>

<template>
  <Menubar v-if="user !== null" :model="items">
    <template #end> <Button @click="logOut" label="Log Out"></Button> </template>
  </Menubar>
  <RouterView />
</template>

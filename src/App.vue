<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { Button, Menubar, Toast } from 'primevue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()

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

//logout a user using the auth store
async function logOut() {
  await authStore.logout()
}
</script>

<template>
  <Menubar v-if="authStore.user !== null" :model="items">
    <template #end> <Button @click="logOut" label="Log Out"></Button> </template>
  </Menubar>
  <Toast></Toast>
  <RouterView />
</template>

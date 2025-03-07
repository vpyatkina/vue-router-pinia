import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // Get the current user
  async function getUser() {
    const response = await supabase.auth.getUser()
    user.value = response.data.user
    return user.value
  }

  // Login with OAuth (Microsoft)
  async function loginWithMicrosoft() {
    return await supabase.auth.signInWithOAuth({
      provider: 'azure',
    })
  }

  // Logout the user
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      return { error }
    }
    user.value = null
    router.push('/login')
    return { error: null }
  }

  // Initialize auth state listener
  function initAuthStateListener() {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        user.value = null
        router.push('/login')
        console.log('Signed Out')
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        user.value = session.user
      }
    })
  }

  // Initialize the store by getting the current user
  getUser()
  initAuthStateListener()

  return {
    user,
    getUser,
    loginWithMicrosoft,
    logout,
  }
})

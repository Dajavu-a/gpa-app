import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { login as loginService , getProfile} from '@/services/auth.service22'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const loading = ref(false)
  const errmsg = ref('')

  const role = computed(() => user.value?.role ?? null)
  const isAuthenticated = computed (() => accessToken.value !== null)
  const login = async (username, password) => {
    loading.value =true
    errmsg.value = ''
    try {
      const res = await loginService(username, password)
    const payload = res?.data?.data ?? res?.data ?? {}

    accessToken.value = payload.accessToken ?? null
    user.value = payload.user ?? null
    return res
    } catch (error) {
      errmsg.value = error.response?.data?.message ?? 'Unable tp login'
      throw error 
    }finally{
      loading.value = false
    }

  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    errmsg.value = ''
    loading.value = false
  }

  const checkAuth = async () => {
    if(!accessToken.value){
      return false
    }
    try {
      await getProfile()
      return true
    } catch (error) {
      console.log(error)
      logout()
      return false
    }
  }

  return { user, accessToken, login, logout ,role,isAuthenticated,errmsg, checkAuth}
},
{persist: true}
)

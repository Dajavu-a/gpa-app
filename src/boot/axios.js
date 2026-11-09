
import { defineBoot } from '#q-app'
import axios from 'axios'
import {useAuthStore} from '@/stores/auth-store'

const api = axios.create({
  baseURL: import.meta.env.QCLI_API_URL || 'http://127.0.0.1:3007',
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3007',
})
const authApi = axios.create({
  baseURL: 'http://127.0.0.1:3008',
})

api.interceptors.request.use((config)=> {
  const authStore = useAuthStore()
  config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  // const token = 'mock_token'
  if(authStore.accessToken){
    config.headers['Authorization'] =` Bearer ${authStore.accessToken}`
  }
  return config
},
  //   config.headers['Authorization'] =` Bearer ${token}`
  // }
  // return config
 (error) =>{
  return Promise.reject(error)})

authApi.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  if (authStore.accessToken) {
    config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
  }
  return config
})

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api, authApi }
import { authApi } from '@/boot/axios'

export const login = (username, password) => {
  return authApi.post('/auth/login', { username, password })
}

export const getProfile = () => {
  return authApi.get('/profile')
}
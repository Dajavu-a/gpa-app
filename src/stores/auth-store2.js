// import { defineStore } from "pinia";
// import { ref } from 'vue'

// import { login as loginService } from "@/services/auth.service22";


// export const useAuthStore = defineStore('auth2' ,()=>{
//     const user = ref(null)
//     const accessToken = ref(null)

//     const login = async(username,password) => { 
//         const res = await loginService(username, password)
//         accessToken.value = res.data.data.accessToken
//         user.value = res.data.data.user
//         return res
//      }

//      const logout = () => {
//         user.value = null
//         accessToken.value = null
//      }
//      return {user,accessToken,login,logout}
// })
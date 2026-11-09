import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes.js'
// import {useAuthStore} from '@/stores/authStore'
import { useAuthStore } from '@/stores/auth-store'
import { Notify } from 'quasar'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  // Router.beforeEach((to, from, next) => {
  //   console.log('From:', from.path)
  //   console.log('To:', to.path)

  //   const authStore = useAuthStore()

  //   if (to.meta.requireAuth && !authStore.isLogin) {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // })

  Router.beforeEach((to, from, next) => {

    const authStore = useAuthStore()
    if (to.meta.requireAuth && !authStore.isAuthenticated) {
      Notify.create({
        type: 'warning',
        message: 'Please login to continue first',
      })
      return next({name: 'login'})
    } 
    if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      Notify.create({
        type: 'negative',
        message: 'You do not have permission to access this page',
      })
      return next({ name: 'profile' })
    }
    next()
  })

  return Router
})

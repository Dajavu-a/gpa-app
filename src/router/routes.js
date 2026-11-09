// import {useAuthStore} from '@/stores/authStore'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: 'a', component: () => import('@/pages/ch8/subjectPage.vue')},
      { path: 'second', component: () => import('@/pages/SecondPage.vue') },
      { path: 'button', component: () => import('@/pages/ch4/Ex_qbtn.vue') },
      { path: 'list', component: () => import('@/pages/ch4/Ex_qlist.vue') },
      { path: 'table', component: () => import('@/pages/ch4/Ex_qtable.vue') },
      { path: 'save', component: () => import('@/pages/ch4/Ex_Notify.vue') },
      { path: 'load', component: () => import('@/pages/ch4/Ex_Loading.vue') },
      { path: 'dialog', component: () => import('@/pages/ch4/Ex_Dialog.vue') },
      { path: 'vilidation', component: () => import('@/pages/ch4/Ex_validation.vue') },
      { path: 'exapi', component: () => import('@/pages/ch6/ExEpi.vue') },
      { path: 'Excrud', component: () => import('@/pages/ch6/Ex_crud.vue') },
      {
        path: 'moc',
        component: () => import('@/pages/ch6/SubjectPage.vue'),
        meta: { requireAuth: true },
      },
      { path: 'login', name: 'login',
         component: () => import('@/pages/ch7/Loginpage.vue') },
      { path: 'profile',
        name:'profile',
        meta:{requireAuth:true},
         component: () => import('@/pages/ch7/ProfilePage.vue') 
        },

         { path: 'teacher',
        name:'teacher',
        meta:{requireAuth:true, roles:['teacher','admin']},
         component: () => import('@/pages/ch7/TeacherPage.vue') 
        },

         { path: 'admin',
        name:'admin',
        meta:{requireAuth:true, roles:'admin'},
         component: () => import('@/pages/ch7/AdminPage.vue') 
        },
        { path: 'env', component: () => import('@/pages/ch8/Ex_env.vue') },
        { path: '',name:'subject', component: () => import('@/pages/ch8/subjectPage.vue') },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes

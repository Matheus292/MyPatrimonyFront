import { createRouter, createWebHistory } from 'vue-router'


import { isLogged } from '@/services/checkSession';

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from ,next) => {

  const isUserLogged = await isLogged();

  if(isUserLogged && to.path === '/')
    next({name: 'dashboard'})
  else if(!isUserLogged && to.path !== '/')
    next({name: 'login'})
  else 
    next()
});

export default router;
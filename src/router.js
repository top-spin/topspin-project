import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/account',
      name: 'account',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Account.vue')
    },
    {
      path: '/chat',
      name: 'chat',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/friends',
      name: 'friends',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Friends.vue')
    },
    {
      path: '/tournaments',
      name: 'tournaments',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Tournaments.vue')
    },
    {
      path: '/players',
      name: 'players',
 
      component: () => import(/* webpackChunkName: "about" */ './views/Players.vue')
    },
  ]
})

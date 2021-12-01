import Vue from 'vue'
import VueRouter from 'vue-router'

import toyApp from '../views/gig-app.vue'
import homePage from '../views/home-page.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import userProfile from '../views/user-profile.vue'
import dashboard from '../views/dashboard.vue'
import about from '../views/about.vue'
import chat from '../views/chat.vue'
import reviewApp from '../views/review-app.vue'
import loginSignup from '../views/login-signup.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/toy-app',
    component: toyApp,
  },
  {
    path: '/user/:userId',
    component: userProfile,
  },
  {
    path: '/about',
    component: about,

  },
  {
    path: '/toy/edit/:toyId?',
    component: toyEdit
  },
  {
    path: '/toy/:toyId',
    component: toyDetails,
  },
  {
    path: '/dashboard',
    component: dashboard,
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import gigApp from '../views/gig-app.vue'
import homePage from '../views/home-page.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import userProfile from '../views/user-profile.vue'
import dashboard from '../views/dashboard.vue'
import chat from '../views/chat.vue'
import reviewApp from '../views/review-app.vue'
import loginSignup from '../views/login-signup.vue'
import becomeASeller from '../views/become-a-seller.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/explore',
    component: gigApp,
  },
  {
    path: '/start_selling',
    component: becomeASeller,
  },
  {
    path: '/user/:userId',
    component: userProfile,
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

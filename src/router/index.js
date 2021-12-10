import Vue from 'vue'
import VueRouter from 'vue-router'

import gigApp from '../views/gig-app.vue'
import homePage from '../views/home-page.vue'
import gigEdit from '../views/gig-edit-new.vue'
import gigDetails from '../views/gig-details.vue'
import gigOrder from '../views/gig-order.vue'
import userProfile from '../views/profile-page.vue'
import dashboard from '../views/dashboard.vue'
import chat from '../views/chat.vue'
import reviewApp from '../views/review-app.vue'
import becomeASeller from '../views/become-a-seller.vue'
import sellerOrders from '../components/seller-orders.vue'
import profile from '../components/profile.vue'

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
    path: '/user',
    component: userProfile,
    children: [
      {
        path: '/user/orders',
        component: sellerOrders
      },
      {
        path: '/user',
        component: profile
      }
    ]


  },
  {
    path: '/gig/edit/:gigId?',
    component: gigEdit
  },
  {
    path: '/gig/:gigId',
    component: gigDetails,
  },
  {
    path: '/checkout/:gigId',
    component: gigOrder,
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

]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router

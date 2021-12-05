import Vue from 'vue'
import Vuex from 'vuex'
import { gigStore } from './gig.store.js'
import { orderStore } from './order.store.js'
import { userStore } from './user.store.js'
import { reviewStore } from './review.store.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
  },
  getters: {   
  },
  mutations: {
  },
  modules: {
      gigStore,
      orderStore,
      userStore,
      reviewStore
  }
})

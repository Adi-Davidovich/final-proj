import Vue from 'vue'
import Vuex from 'vuex'
import { toyStore } from './toy.store.js'
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
      toyStore,
      userStore,
      reviewStore
  }
})

import Vue from 'vue'
import QVuex from './qvuex.js'

Vue.use(QVuex)

export default new QVuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions: {
    add ({ commit, state }) {
      commit('add', state)
    }
  }
})

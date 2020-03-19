import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    winner: false
  },
  mutations: {
    SET_NAME (state, value) {
      state.name = value
    },
    SET_WINNER (state, value) {
      state.winner = value
    }
  },
  actions: {

  },
  getters: {}
})

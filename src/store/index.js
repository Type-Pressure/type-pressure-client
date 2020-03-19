import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: ''
  },
  mutations: {
    SET_NAME (state, value) {
      state.name = value
    }
  },
  actions: {

  },
  getters: {}
})

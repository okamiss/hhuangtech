import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    token: '',
  },
  mutations: {
    name1(state) {
      state.name = ''
    },
    name2(state, payload) {
      state.name = payload.name
    },
  },
  actions: {},
  modules: {},
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    token:'1askldjflakjsdkalsjksf'
  },
  mutations: {
    name1(state) {
      state.name = '名字1'
    },
    name2(state,payload){
      state.name = payload.name
    }

  },
  actions: {
  },
  modules: {
  }
})

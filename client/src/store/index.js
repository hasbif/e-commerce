import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const url = "http://localhost:3000/"
export default new Vuex.Store({
  state: {
    allproduct: []
  },
  mutations: {
    SETallproduct(state, payload) {
      state.allproduct = payload
    }
  },
  actions: {
    toast({ commit, state }, pl) {
      let { title, message, vm } = pl
      console.log('toast')
      vm.$root.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true
      })
    },
    getProduct({ commit, state }) {
      axios({ method: 'get', url: url + "product" }).then(res => {
        console.log('data', res.data.product)
        commit('SETallproduct', res.data.product)
      }).catch(err => {
        console.log('err', err)
      })
    }
  },
  modules: {
  }
})

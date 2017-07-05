import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from './storage.js'
Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    login: {
      state: {
        token: storage.get('token'),
        userInfo: JSON.parse(storage.get('userInfo')) ? JSON.parse(storage.get('userInfo')) : {}
      },
      mutations: {
        updateToken(state, val) {
          state.token = val;
        },
        updateUserInfo(state, val) {
          state.userInfo = val;
        }
      }
    }
  }

});
export {
  Store
}

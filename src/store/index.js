import Vuex from 'vuex'
import global from './modules/global'

export function createStore (Vue) {
  Vue.use(Vuex)
  return new Vuex.Store({
    modules: {
      global: {
        ...global
      }
    }
  })
}

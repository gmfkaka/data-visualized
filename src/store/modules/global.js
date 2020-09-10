import {getUserDetail, getOtherUserDetail} from '@/servers/api'
export default {
  namespaced: true,
  state: {
    userDetail: {avatar: '', orgInfo: ''}
  },
  mutations: {
    GET_USER_DETAIL (state, data) {
      state.userDetail = data
    }
  },
  actions: {
    GET_USER_DETAIL ({commit}, config) {
      return getUserDetail(config).then((res) => {
        if (res && res.data) {
          commit('GET_USER_DETAIL', res.data.data)
        }
        return res
      })
    },
    GET_OTHER_USER_DETAIL ({commit}, config) {
      return getOtherUserDetail(config).then((res) => {
        if (res && res.data) {
          return res.data.data
        }
      })
    }
  }
}

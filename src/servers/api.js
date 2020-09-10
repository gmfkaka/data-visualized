import Vue from 'vue'
import axios from 'axios'
import { getPlatId } from '@/utils/appinfo'
import { storage } from '@/utils/storage'

const instance = axios.create({
  timeout: 36000,
  credentials: false
})
/* 接口配置 guid: 项目标识默认 */
export const httpsbaseUrl = 'https://monitor-screen.cloud.hoge.cn'
// const baseUrl = 'http://monitor-screen.cloud.hoge.cn'
export const workcallUrl = 'https://sys-team.cloud.hoge.cn'
export const GUID = getPlatId()

// workcallInfoList 记者列表
export const getReporter = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=screen&a=reporterLine`)
export const getMemberInfo = (memberId) => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=user&a=memberInfo&member_id=${memberId}&access_token={access_token}`)

/* 通用 */
// 大屏登录
export const doLogin = (data) => axios.post(`${workcallUrl}/sys/login/dologin?password=${data.password}&user_name=${data.user_name}`)
// 大屏用户详情
export const getUserDetail = () => createXietongAPI(`${workcallUrl}/Apisys/members/detail`, 'post')
// 查询其他用户详情
export const getOtherUserDetail = (userId) => createXietongAPI(`${workcallUrl}/Apisys/members/other_user_detail?user_id=${userId}`, 'post')
// 指挥连线用户详情
export const getUserInfo = (memberId) => createXietongAPI(`${workcallUrl}/Apisys/organization/memberDetail?member_id=${memberId}`)
/* 通用 end */

// 获取配置数据
export const getConfigData = () => createAPI(`${httpsbaseUrl}/index.php?m=Apidaping&c=CP_project&a=new_detail&guid=${GUID}`)

export const getUrl = (action) => {
  if (!action) {
    console.warn('接口地址不能为空')
    return false
  }
  return action
}

export const createAPI = (action, method = 'get', config = {}) => {
  if (action.indexOf('{access_token}') > -1) {
    let config = storage.get('saas_config')
    action = action.replace('{access_token}', config && config.extend ? config.extend.access_token : '')
  }
  return instance({
    url: getUrl(action),
    withCredentials: false,
    method,
    ...config
  })
}

export const createXietongAPI = (action, method = 'get', config = {}) => {
  let accesstoken = storage.get('access_token')
  if (!accesstoken) {
    window.ddVue.$router.push({
      path: '/login'
    })
    return
  }
  action = action + `&access_token=${accesstoken}`
  return instance({
    url: action,
    withCredentials: false,
    method,
    ...config
  })
}

Vue.mixin({
  beforeCreate () {
    const options = this.$options
    if (options.api) {
      this.$api = options.api
    } else if (options.parent && options.parent.$api) {
      this.$api = options.parent.$api
    }
  }
})

instance.interceptors.response.use((res, xhr) => {
  return res
}, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        window.ddVue.$router.push({
          path: '/error'
        })
        break
      default:
    }
  }
  return Promise.reject(error)
})

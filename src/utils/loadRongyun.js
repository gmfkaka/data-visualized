import loadScript from '@/utils/loadScript'

export default function loadBMap () {
  const protocol = window.location.protocol
  return new Promise(function (resolve, reject) {
    console.log('loadRongyun!!', window.RongIMLib)
    loadScript(`${protocol}//cdn.ronghub.com/RongIMLib-2.3.2.js`).then(res => {
      loadScript(`${protocol}//cdn.ronghub.com/RongCallLib-3.0.0.min.js`).then(res => {
        resolve(window.RongCallLib)
      }).catch(rej => {
      })
    })
  })
}

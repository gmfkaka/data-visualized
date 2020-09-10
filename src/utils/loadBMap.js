export default function loadBMap () {
  return new Promise(function (resolve, reject) {
    console.log('loadBMaploadBMaploadBMap!!')
    var BMap = window.BMap
    if (typeof BMap !== 'undefined') {
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function () {
      resolve(BMap)
    }
    let ak = '3SAhMgYVNvyrkV8dFGlEdDnqlGrYIr6D'
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=onBMapCallback`
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function loadScript (src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.src = src
    script.onerror = reject
    document.head.appendChild(script)
    script.addEventListener('load', function () {
      resolve(script)
    }, false)
  })
}

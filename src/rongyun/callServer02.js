/* eslint-disable */
export const server = (cb) => {
  let CallLib = RongCallLib.init({
    RongIMLib: RongIMLib
  })

  let tools = {
    // 仅支持类选择器和 Id 选择器
    getDom: function (selector) {
      let selectorMap = {
        class: function (selector) {
          return document.getElementsByClassName(selector)
        },
        id: function (selector) {
          return document.getElementById(selector)
        }
      }
      let isClass = (selector.indexOf('.') == 0)
      let type = isClass ? 'class' : 'id'
      let name = selector.slice(1)
      return selectorMap[type](name)
    },
    toggleClass: function (node, name) {
      node.className = name
    },
    createDom: function (name, attrs) {
      attrs = attrs || {}
      let node = document.createElement(name)
      for (let key in attrs) {
        node[key] = attrs[key]
      }
      return node
    },
    noop: function () { }
  }

  let mp3 = require('./assets/mp3/2620.mp3')
  let video = tools.createDom('video', {
    id: 'ring-call',
    src: mp3,
    loop: "loop"
  })
  document.getElementById('app').appendChild(video)


  let ClassType = {
    MAX: 'rong-max-window',
    MIN: 'rong-min-window'
  }

  let containerNode = ''

  let clearWindow = () => {
    containerNode.innerHTML = ''
  }

  let setMaxWindow = (minNode) => {
    let maxNode = tools.getDom('.' + ClassType.MAX)[0]
    if (maxNode) {
      tools.toggleClass(maxNode, ClassType.MIN)
    }
    tools.toggleClass(minNode, ClassType.MAX)
  }


  let videoItem = {
    added: function (result) {
      let node = result.data
      let win = tools.createDom('div', {
        className: ClassType.MIN
      })
      let isLocal = result.isLocal

      win.onclick = function (event) {
        setMaxWindow(event.currentTarget)
      }
      win.appendChild(node)
      containerNode.appendChild(win)
      if (isLocal) {
        setMaxWindow(win)
      }
    },
    removed: function (result) {
      let videoId = result.data
      let video = tools.getDom('#' + videoId)
      if (video) {
        let win = video.parentNode
        containerNode.removeChild(win)
      }
    },
    leave: function () {
      clearWindow()
    }
  }

  let params = {}
  let InviteUsers = []
  let conversationType = ''

  // 注册视频节点监听
  CallLib.videoWatch(function (result) {
    videoItem[result.type](result)
  })

  // 注册命令监听
  CallLib.commandWatch((command) => {
    cb(command)
    params = command
  })

  let CallType = RongIMLib.VoIPMediaType

  let call = (params) => {
    CallLib.call(params, (error) => {
      console.log(error)
    })
  }

  return {
    callVideo: (data, dom) => {
      containerNode = document.getElementById(dom)
      data.mediaType = CallType.MEDIA_VEDIO
      data.conversationType = RongIMLib.ConversationType.PRIVATE
      params = data
      call(params)
    },

    callAudio: (data, dom) => {
      containerNode = document.getElementById(dom)
      data.mediaType = CallType.MEDIA_AUDIO
      data.conversationType = RongIMLib.ConversationType.PRIVATE
      params = data
      call(params)
    },

    hangUp: (data) => {
      console.log(params)
      CallLib.hungup(data ? data : params, (error, summary) => {
        console.log(error)
      })
    },

    acceptVideo: (dom) => {
      containerNode = document.getElementById(dom)
      let p = {
        conversationType: params.conversationType,
        mediaType: 2,
        targetId: params.targetId,
      }
      console.log(p)
      CallLib.accept(p)
    },

    reject: () => {
      let p = {
        conversationType: params.conversationType,
        targetId: params.targetId,
      }
      CallLib.reject(p)
    },

    ring: () => {
      video.play()
    },

    pause: () => {
      video.pause()
    }

  }
}

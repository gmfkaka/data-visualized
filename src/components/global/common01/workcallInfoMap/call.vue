<template>
  <div class="call-wrap sys-flex" v-if="call_Show">
    <div id="call-main" class="rong-container sys-flex sys-flex-center flex-justify-center">
      <div class="call-user" v-if="!online">
        <img class="call-reporter-avatar" v-if="info_item.avatar" :src="info_item.avatar.uri" />
        <img
          class="call-reporter-avatar"
          v-if="!info_item.avatar"
          src="./assets/default_avatar.png"
        />
        <img class="call-reporter-line" src="./assets/pic_soundwave.png" />
        <span class="call-status">连接{{info_item.member_name}}中...</span>
      </div>
      <div class="video-info">
        <span class="video-time">{{time}}</span>
        <span class="hug-btn" @click="hangUp"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { initRong } from '@/rongyun/init'
import { server } from '@/rongyun/callServer02'
import loadRongyun from '@/utils/loadRongyun.js'
import { getDataConfig } from '@/utils/model'

export default {
  name: 'call',
  data () {
    return {
      online: false,
      time: '00:00',
      onlineTime: 0,
      info_item: {},
      call_Show: false,
      invite_call: false,
      invite_tip: '邀请您进行视频会议'
    }
  },
  props: {
    infoItem: {
      type: Object,
      default: {}
    },
    callType: '',
    callShow: false
  },
  watch: {
    infoItem (res) {
      this.info_item = res
    },
    callShow (res) {
      if (res) {
        this.call_Show = res
        this.call()
      }
    },
    callType (res) {
      this.callType = res
    }
  },
  mounted () {
    let _this = this
    loadRongyun().then(() => {
      getDataConfig().then((data) => {
        initRong(data.rongInfo)
        _this.RongCall = server((res) => {
          _this.commandMap(res)
        })
      })
    })
  },
  methods: {
    commandMap (res) {
      switch (res.messageType) {
        case 'InviteMessage':
          console.log('InviteMessage')
          break
        case 'RingingMessage':
          console.log('RingingMessage')
          break
        case 'AcceptMessage':
          console.log('AcceptMessage')
          this.RongCall.pause()
          break
        case 'HungupMessage':
          console.log('HungupMessage')
          this.RongCall.pause()
          this.hangUp()
          break
        case 'SummaryMessage':
          console.log('SummaryMessage')
          break
      }
    },
    call () {
      setTimeout(() => {
        let params = {
          targetId: this.info_item.member_id.toString(),
          inviteUserIds: [this.info_item.member_id.toString()]
        }
        this.initTime()
        if (this.callType === 'video') {
          this.RongCall.callVideo(params, 'call-main')
        } else {
          this.RongCall.callAudio(params, 'call-main')
        }
      }, '1000')
    },
    accept () {
      this.RongCall.pause()
      this.onlineTime = 0
      this.initTime()
      this.RongCall.acceptVideo('call-main')
      this.invite_tip = '正在连线'
      this.online = true
    },
    reject () {
      this.RongCall.pause()
      this.RongCall.reject()
      this.close()
    },
    initTime () {
      this.callTimer = setInterval(() => {
        this.onlineTime++
        this.time = this.formatSeconds(this.onlineTime)
      }, 1000)
    },
    formatSeconds (value) {
      let s = parseInt(value)
      let m = 0
      if (s > 60) {
        m = parseInt(s / 60)
        s = parseInt(s % 60)
      }
      let min = m
      let sec = s
      if (m < 10) {
        min = '0' + m
      }

      if (s < 10) {
        sec = '0' + s
      }
      return min + ':' + sec
    },
    hangUp () {
      this.RongCall.hangUp()
      this.onlineTime = 0
      clearInterval(this.callTimer)
      this.close()
    },
    close () {
      this.call_Show = false
      this.online = false
      this.onlineTime = 0
      this.$emit('update:callShow', false)
      this.$emit('update:infoItem', {})
      this.invite_call = false
      this.invite_tip = '邀请您进行视频会议'
    }
  }
}
</script>

<style lang="scss">
.call-wrap {
  width: 100%;
  height: 100%;
  border: pxrem(1px) solid rgba(96, 186, 236, 0.2);
  background: rgba(31, 57, 103, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  #call-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #000;
    position: relative;
    overflow: hidden;
    padding: 0.05rem;
    .call-user {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .call-status {
        width: 100%;
        color: #fff;
        text-align: center;
        display: block;
        font-size: 0.3rem;
        margin-top: -0.05rem;
      }
      .call-reporter-avatar {
        width: 2rem;
        height: 2rem;
        margin: 1rem auto 0 auto;
        display: block;
        border-radius: 50%;
      }
      .call-reporter-line {
        width: 2.8rem;
        height: 0.625rem;
        margin: 0.25rem auto;
        display: block;
      }
    }

    .rong-min-window {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      span {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.25rem;
        color: #ddd;
      }
    }
    .rong-max-window {
      width: 5rem;
      height: 4rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0.02rem;
      cursor: pointer;
      position: absolute;
      overflow: hidden;
      top: 0.9rem;
      right: 0.25rem;
    }
    .rong-max-window {
      video {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .rong-min-window {
      video {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .rong-calllib-remote {
      canvas {
        position: absolute;
        top: 0;
        right: 0;
        width: 100% !important;
        height: 100% !important;
        z-index: 9;
      }
    }
    div {
      &:nth-of-type(2) {
        canvas {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.5rem !important;
          height: 0.5rem !important;
          z-index: 99999 !important;
        }
      }
    }
    .video-info {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      bottom: 1.5rem;
      left: calc(50% - 0.75rem);
      z-index: 999999;
      .video-time {
        display: block;
        width: 1rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 0.125rem;
        text-align: center;
        font-size: 0.3rem;
        color: #00fdfe;
        margin: 0 auto;
        margin-bottom: 0.25rem;
      }
      .hug-btn {
        display: block;
        width: 1rem;
        height: 1rem;
        background: url(./assets/icon_videoff.png) no-repeat
          center center;
        background-size: 1rem 1rem;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .main-wrap {
    .call-reporter-avatar {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0 auto;
      border-radius: 50%;
    }
    .call-reporter-line {
      display: block;
      width: 2.8rem;
      height: 1.25rem;
      margin: 0 auto;
    }
    .call-status {
      display: block;
      color: #fff34a;
      font-size: 0.4rem;
      margin-top: -0.4rem;
      margin-bottom: 0.1rem;
      text-align: center;
    }
    .call-btn {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.1rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .call-info-wrap {
    width: 1.54rem;
    height: 1.89rem;
    background-size: 2.54rem 2.89rem;
    margin-right: 0.4rem;
    padding: 0.5rem;
    &.invite-info-wrap {
      span {
        display: block;
        text-align: center;
        font-size: 0.15rem;
        color: #fff;
        margin-top: 0.15rem;
        &.invite-name {
          font-size: 0.25rem;
          margin-top: 0.25rem;
          font-weight: bold;
          color: #02ffea;
        }
      }
    }
    .reporter-name {
      display: block;
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      text-indent: 0.5rem;
      font-size: 0.18rem !important;
      text-align: left;
      color: #00ffea;
      background-size: 0.41rem 0.14rem;
    }
    .info-list {
      display: block;
      text-align: left;
      font-size: 0.12rem;
      color: #00ffea;
      margin: 0.1rem 0;
      &.introduce {
        height: 0.14rem;
        background-position: center left;
        background-size: 0.5rem;
      }
    }
  }
  .close-btn {
    display: block;
    width: 0.485rem;
    height: 0.14rem;
    background-size: 0.485rem 0.14rem;
    cursor: pointer;
  }
}
</style>
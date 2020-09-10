<template>
  <div class="member-call-wrap sys-flex" v-if="call_Show">
    <div class="sys-flex-one" v-show="online">
      <div id="call-main" class="rong-container">
        <div class="rong-min-window-wrap">
          <div id="rong-min-window-list" class="min-window-list"></div>
        </div>
        <div class="video-info">
          <span class="video-time">{{time}}</span>
          <span class="hug-btn" @click="hangUp"></span>
        </div>
      </div>
    </div>
    <div class="main-wrap sys-flex-one" v-show="!online">
      <img class="call-reporter-avatar" v-if="info_item.avatar" v-bind:src="info_item.avatar.uri">
      <img class="call-reporter-avatar" v-if="!info_item.avatar" src="./assets/default_avatar.png" />
      <img class="call-reporter-line" src="./assets/pic_soundwave.png">
      <span class="call-status">连接中...</span>
      <div class="sys-flex sys-flex-center flex-justify-center">
        <img class="call-btn" src="./assets/accept.png" v-if="invite_call" @click="accept">
        <img class="call-btn" src="./assets/icon_voiceoff.png" v-if="invite_call" @click="reject">
        <img class="call-btn" src="./assets/icon_voiceoff.png" v-if="!invite_call" @click="close">
      </div>

    </div>
    <div class="call-info-wrap" v-if="!invite_call">
      <span class="reporter-name overhidden">{{info_item.member_name}}</span>
      <span class="info-list" v-if="info_item.displayData && info_item.displayData.mobile">手机号：{{info_item.displayData.mobile.value}}</span>
      <span class="info-list" v-if="info_item.displayData && info_item.displayData.role_id">职 位：{{info_item.displayData.role_id.value}}</span>
      <span class="info-list overhidden" v-if="info_item.displayData && info_item.displayData.org_info">部 门：{{info_item.displayData.org_info.value}}</span>
    </div>
    <div class="call-info-wrap invite-info-wrap" v-if="invite_call">
      <span class="invite-name">{{info_item.member_name}}</span>
      <span class="invite-tip">{{invite_tip}}</span>
    </div>
    <span class="close-btn" @click="close">返回</span>
  </div>
</template>

<script>
import { storage } from '@/utils/storage'
import {initRong} from '@/rongyun/init'
import {getDataConfig} from '@/utils/model'
import {server} from '@/rongyun/callServer'
// import { getIndexMemberDetail } from '@/servers/interface'
import loadRongyun from '@/utils/loadRongyun.js'
import { getWorkCallConnectList } from '@/servers/interface'

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
      reporterList: [],
      invite_tip: '邀请您进行视频会议'
    }
  },
  props: {
    infoItem: {
      type: Object,
      default: () => {}
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
    this.getWorkCallConnectList()
    loadRongyun().then(() => {
      getDataConfig().then((data) => {
        initRong(data.rongInfo)
        _this.RongCall = server((res) => {
          _this.commandMap(res)
        })
        if (this.$route.query && this.$route.query.access_token && this.$route.query.userid) {
          setTimeout(() => {
            this.getUserInfo(this.$route.query.access_token, this.$route.query.userid)
          }, 1500)
        }
      })
    })
  },

  methods: {
    getWorkCallConnectList () {
      getWorkCallConnectList().then(res => {
        if (!res.data.error_code && res.data.result.length) {
          this.reporterList = res.data.result
        }
      })
    },
    commandMap (res) {
      switch (res.messageType) {
        case 'InviteMessage':
          break
        case 'RingingMessage':
          console.log('RingingMessage')
          break
        case 'AcceptMessage':
          console.log('AcceptMessage')
          this.RongCall.pause()
          break
        case 'HungupMessage':
          console.log(res, 'HungupMessage')
          if (res.messageUId) {
            this.RongCall.pause()
            this.hangUp()
          }
          break
        case 'SummaryMessage':
          console.log('SummaryMessage')
          break
      }
    },

    call () {
      this.online = true
      setTimeout(() => {
        let params = {
          targetId: (this.info_item.member_id).toString(),
          inviteUserIds: [(this.info_item.member_id).toString()]
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
      this.time = '00:00'
      clearInterval(this.callTimer)
      this.$emit('update:callShow', false)
      this.$emit('update:infoItem', {})
      this.invite_call = false
      this.invite_tip = '邀请您进行视频会议'
    },
    // 自动呼叫
    getUserInfo (accessToken, userId) {
      storage.set('access_token', accessToken)
      this.$store.dispatch('global/GET_OTHER_USER_DETAIL', userId).then(data => {
        if (data && data.member_id) {
          this.autoCallvideo(data)
        }
      })
    },
    autoCallvideo (reporter) {
      this.info_item = reporter
      this.callType = 'video'
      this.call_Show = true
      this.call()
    }
  }
}
</script>

<style lang="scss">
.member-call-wrap{
  height: 100%;
  background:rgba(31,57,103,1);
  position: absolute;
  left: calc( 50% - 7.5em );
  z-index: 10;
  #call-main{
    width: 7.5em;
    height: 100%;
    margin : 0 auto;
    background: #000;
    position: relative;
    overflow: hidden;
    padding: 0.1em;
    .rong-min-window-wrap{
      bottom: 0.1em;
      width: 100%;
      display: flex;
      position: absolute;
      height: 1em;
      overflow: hidden;
      overflow-x: scroll;
      .min-window-list{
        display: flex;
      }
    }
    .rong-min-window{
      width: 1.2em;
      height: 0.9em;
      cursor: pointer;
      border: 0.01em solid #ddd;
      border-radius: 0.03em;
      overflow: hidden;
      background: rgba(0,0,0,0.4);
      margin-right: 0.1em;
      span{
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.5em;
        color: #ddd;
      }
    }
    .rong-max-window {
      width: calc(100% - 0.2em);
      height: calc(100% - 1.3em);
      position: absolute;
      bottom: 1.3em !important;
    }
    .rong-max-window {
      video{
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .rong-min-window{
      video{
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .rong-calllib-emote{
      canvas{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%!important;
        height: 100%!important;
        z-index: 9;
      }
    }
    div{
      &:nth-of-type(2){
        canvas{
          position: absolute;
          top: 0;
          right: 0;
          width: 1em!important;
          height: 1em!important;
          z-index: 99999!important;
        }
      }
    }
    .video-info{
      width: 1.3em;
      height: 1.3em;
      position: absolute;
      bottom : -0.19em;
      left : calc(50% - 0.8em);
      z-index:999999;
      .video-time{
        display: block;
        height: 0.5em;
        line-height: 0.5em;
        background:rgba(0,0,0,0.5);
        border-radius:0.25em;
        text-align: center;
        font-size: 0.24em;
        color: #00FDFE;
      }
      .hug-btn{
        display: block;
        width: 0.8em;
        height: 0.8em;
        background:url(./assets/icon_videoff.png) no-repeat center center;
        background-size: 0.8em 0.8em;
        cursor: pointer;
        margin: 0.16em auto;
      }

    }

  }
  .main-wrap{
    .call-reporter-avatar{
      display: block;
      width: 2.5em;
      height: 2.5em;
      margin: 0 auto;
      border-radius: 50%;
    }
    .call-reporter-line{
      display: block;
      width: 5.6em;
      height: 2.49em;
      margin: 0 auto;
    }
    .call-status{
      display: block;
      color: #FFF34A;
      font-size: 0.24em;
      margin-top: -0.8em;
      margin-bottom: 0.2em;
      text-align: center;
    }
    .call-btn{
      display: block;
      width: 1em;
      height: 1em;
      margin: 0 0.2em;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
  .call-info-wrap{
    width: 4.08em;
    height: 3.78em;
    padding-top: 0.8em;
    padding-left: 0.1em;
    &.invite-info-wrap{
      span{
        display: block;
        text-align: center;
        font-size: 0.3em;
        color: #fff;
        margin-top: 0.3em;
        &.invite-name{
          font-size: 0.5em;
          margin-top: 0.5em;
          font-weight: bold;
          color: #02ffea;
        }
      }
    }
    .reporter-name{
      display: block;
      width: 100%;
      height: 1em;
      line-height: 1em;
      font-size:0.36em!important;
      text-align: left;
      color: #00ffea;
    }
    .info-list{
      display: block;
      text-align: left;
      font-size:0.24em;
      color:#00ffea;
      margin : 0.2em 0;
      &.introduce{
        height: 0.28em;
        background-image:url(./assets/icon_date.png);
        background-position: center left;
        background-size:1em
      }
    }
  }
  .close-btn{
    text-align: center;
    position: absolute;
    display: block;
    bottom: 0.5em;
    right: 0.5em;
    left: 25.5em;
    // width: 4em;
    height: 2em;
    line-height: 2em;
    font-size: 0.3em;
    color: #02ffea;
    border: 0.01em solid #02ffea;
    // background:url(./assets/btn_return.png) no-repeat center center;
    // background-size: 0.97em 0.28em;
    cursor: pointer;
    &.close-btn:hover {
      cursor: pointer;
    }
  }
}
</style>

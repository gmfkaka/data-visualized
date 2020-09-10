<template>
  <div class="call-wrap sys-flex" v-if="call_Show">
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
      <img class="call-reporter-line" src="../workcallInfoMap/assets/pic_soundwave.png">
      <span class="call-status">连接中...</span>
      <div class="sys-flex sys-flex-center flex-justify-center">
        <img class="call-btn" src="./assets/accept.png" v-if="invite_call" @click="accept">
        <img class="call-btn" src="./assets/icon_voiceoff.png" v-if="invite_call" @click="reject">
        <img class="call-btn" src="./assets/icon_voiceoff.png" v-if="!invite_call" @click="close">
      </div>

    </div>
    <div class="call-info-wrap" v-if="!invite_call">
      <span class="reporter-name overhidden">
        {{info_item.member_name}}
      </span>
      <span class="info-list"> 手机号：</span>
      <span class="info-list">&nbsp;&nbsp;{{info_item.mobile}}</span>
      <span class="info-list"> 职 位：</span>
      <span class="info-list">&nbsp;&nbsp;{{info_item.role_title}}</span>
      <span class="info-list "> 部 门：</span>
      <span class="info-list overhidden">&nbsp;&nbsp;{{info_item.org_title}}</span>
      <span class="close-btn" @click="close"></span>
    </div>
    <div class="call-info-wrap invite-info-wrap" v-if="invite_call">
      <span class="invite-name">{{info_item.member_name}}</span>
      <span class="invite-tip">{{invite_tip}}</span>
      <br>
      <span class="close-btn" @click="close"></span>
    </div>
  </div>
</template>

<script>

import {initRong} from '@/rongyun/init'
import {getDataConfig} from '@/utils/model'
import {server} from '@/rongyun/callServer'
// import { getIndexMemberDetail } from '@/servers/interface'
import loadRongyun from '@/utils/loadRongyun.js'

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
          // getIndexMemberDetail(res.senderUserId).then((response) => {
          //   if (!response.data.error_code) {
          //     this.info_item = {
          //       member_id: response.data.result.user_id,
          //       member_name: response.data.result.member_name,
          //       avatar: response.data.result.avatar && response.data.result.avatar.host ? response.data.result.avatar.host + response.data.result.avatar.dir + response.data.result.avatar.filename : ''
          //     }
          //   }
          //   this.RongCall.ring()
          //   this.$emit('updateList')
          //   this.call_Show = true
          //   this.invite_call = true
          // })
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
          // this.RongCall.pause();
          // this.hangUp();
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
    }
  }
}
</script>

<style lang="scss" scoped>
.call-wrap{
  height: 7.6em;
  padding: 0.46em 0.9em;
  border : 0.02em solid rgba(96, 186, 236,0.2);
  background:rgba(31,57,103,1);
  position: absolute;
  top : calc( 50% - 4.8em );
  left: calc( 50% - 6em );
  z-index: 10;
  #call-main{
    width: 7.5em;
    height: 7.5em;
    margin : 0 auto;
    background: #000;
    position: relative;
    overflow: hidden;
    padding: 0.1em;
    margin-top: -0.4em;
    .rong-min-window-wrap{
      top: 0.3em;
      position: relative;
      width: 100%;
      height: 1.2em;
      display: flex;
      position: absolute;
      height: 1.2em;
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
      top: 1.2em;
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
        // width: 3.25em!important;
        // height: 5.78em!important;
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
      width: 1.7em;
      height: 1.7em;
      position: absolute;
      bottom : 0.3em;
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
        width: 1em;
        height: 1em;
        background:url(./assets/icon_videoff.png) no-repeat center center;
        background-size: 1em 1em;
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
    // width: 3.08em;
    // height: 3.78em;
    // background: url(./assets/pic_message_border.png) no-repeat center center;
    background-size: 5.08em 5.78em;
    margin-right: 0.8em;
    // padding: 1em;
    &.invite-info-wrap{
      span{
        display: block;
        text-align: center;
        font-size: 0.3em;
        color: #fff;
        margin-top: 0.3em;
        &.invite-name{
          word-wrap: break-word;
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
      text-indent: 1em;
      font-size:0.36em!important;
      text-align: left;
      color: #00ffea;
      background: url(./assets/pic_arrow_big.png) no-repeat center left;
      background-size : 0.82em 0.28em;
    }
    .info-list{
      display: block;
      text-align: left;
      font-size: 0.24em;
      color:#00ffea;
      margin : 0.2em 0;
      padding: 0 0.2em;
      &.introduce{
        height: 0.28em;
        background-image:url(./assets/icon_date.png);
        background-position: center left;
        background-size:1em
      }
    }
  }
  .close-btn{
    display: block;
    width: 0.97em;
    height: 0.28em;
    background:url(./assets/btn_return.png) no-repeat center center;
    background-size: 0.97em 0.28em;
    cursor: pointer;
  }
}
</style>

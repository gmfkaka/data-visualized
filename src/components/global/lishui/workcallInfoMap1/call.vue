<template>
  <div class="lishui-call-wrap1 sys-flex" v-if="call_Show">
    <div class="connect-wrap" v-show="online || invite_call">
      <div id="call-main" class="flex flex-center">
        <!-- 对方 -->
        <div class="rong-min-window-wrap">
          <div class="screen_all" @click.stop="fullScreen('min')"></div>
          <div class="call-info">
            <img class="user-avatar" :src="(info_item.avatar && info_item.avatar.uri) || defaultAvatar" alt="" />
            <div class="user-name">{{info_item.member_name}}</div>
            <div class="user-role">溧水区融媒体中心-{{info_item.role_title}}</div>
            <div class="loading" v-if="!invite_call">等待连线...</div>
            <div class="loading" v-if="invite_call">{{invite_tip}}</div>
          </div>
          <div id="rong-min-window-list" class="min-window-list">
            <!-- 调试用 -->
            <!-- <div class="rong-min-window"><video id="18357" autoplay="" userid="18357"></video></div> -->
          </div>
        </div>
        <!-- 调试用 主叫方 -->
        <!-- <div class="rong-max-window"><video id="18358" autoplay="" userid="18358"></video></div> -->
        <div class="max-window-prepare">
          <div class="screen_all" @click.stop="fullScreen('max')"></div>
          <div class="call-info">
            <img class="user-avatar" :src="defaultLogo" alt="" />
            <div class="user-name">指挥调度中心</div>
          </div>
        </div>
        <div class="times-info">
          <span class="video-time" v-if="!isFull">{{time}}</span>
          <img class="call-btn" src="./assets/accept.png" v-if="invite_call" @click="accept">
          <img class="call-btn" src="./assets/icon_voiceoff.png" v-if="invite_call" @click="reject">
          <img class="hangUp-btn" src="./assets/icon_voiceoff.png" v-if="!invite_call" @click="hangUp">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {initRong} from '@/rongyun/init'
import {getDataConfig} from '@/utils/model'
import {server} from '@/rongyun/callServer'
import { getIndexMemberDetail } from '@/servers/interface'
import loadRongyun from '@/utils/loadRongyun.js'

export default {
  name: 'call',
  data () {
    return {
      isFull: false,
      defaultAvatar: require('./assets/default_avatar.png'),
      defaultLogo: require('./assets/logo.jpg'),
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
          getIndexMemberDetail(res.senderUserId).then((response) => {
            if (!response.data.error_code) {
              this.info_item = {
                member_id: response.data.result.user_id,
                member_name: response.data.result.member_name,
                avatar: response.data.result.avatar && response.data.result.avatar.host ? response.data.result.avatar.host + response.data.result.avatar.dir + response.data.result.avatar.filename : ''
              }
            }
            this.RongCall.ring()
            this.$emit('updateList')
            this.call_Show = true
            this.$emit('update:callShow', true)
            this.invite_call = true
          })
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
      }, '10')
    },

    accept () {
      this.RongCall.pause()
      this.initTime()
      this.RongCall.acceptVideo('call-main')
      this.invite_tip = '正在连线'
      this.online = true
      this.invite_call = false
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
    fullScreen (type) {
      let min = document.getElementsByClassName('rong-min-window-wrap')[0] || {}
      let max = document.getElementsByClassName('rong-max-window')[0] || {}
      let maxprepare = document.getElementsByClassName('max-window-prepare')[0] || {}
      let timesinfo = document.getElementsByClassName('times-info')[0] || {}
      clearClass()
      if (this.isFull) {
        this.isFull = false
        return
      }
      if (type === 'min') {
        min.className = 'rong-min-window-wrap full_screen'
        this.isFull = true
      } else if (type === 'max') {
        max.className = 'rong-max-window full_screen2'
        maxprepare.className = 'max-window-prepare full_screen'
        timesinfo.className = 'times-info times-info2'
        this.isFull = true
      }
      function clearClass () {
        min.className = 'rong-min-window-wrap'
        max.className = 'rong-max-window'
        maxprepare.className = 'max-window-prepare'
        timesinfo.className = 'times-info'
      }
    }
  }
}
</script>

<style lang="scss">
// px转rem,第二个参数可以控制倍数
@function pxrem($px-values,$base-multiple: 18.75, $baseline-px:16px,$support-for-ie:false){
  //Conver the baseline into rems
  $baseline-rem: $baseline-px / 1rem * $base-multiple;
  //Print the first line in pixel values
  @if $support-for-ie {
      @return $px-values;
  }
  //if there is only one (numeric) value, return the property/value line for it.
  @if type-of($px-values) == "number"{
      @return $px-values / $baseline-rem;
  }
  @else {
      //Create an empty list that we can dump values into
      $rem-values:();
      @each $value in $px-values{
          // If the value is zero or not a number, return it
          @if $value == 0 or type-of($value) != "number"{
              $rem-values: append($rem-values, $value / $baseline-rem);
          }
      }
      @return $rem-values;
  }
}
.lishui-call-wrap1{
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 10;
  background:rgba(0,0,0,0.6);
  .connect-wrap{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  #call-main{
    margin: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    position: relative;
    overflow: hidden;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .screen_all{
      cursor: pointer;
      position: absolute;
      top: pxrem(65px);
      right: pxrem(88px);
      width: pxrem(70px);
      height: pxrem(70px);
      background-image:url(./assets/screen_all.png);
      background-size: 100%;
    }
    .call-info{
      z-index: 1;
      width: pxrem(900px);
      position: absolute;
      top: pxrem(450px);
      left: 50%;
      transform: translate(-50%, 0%);
      .user-avatar{
        width: pxrem(400px);
        height: pxrem(400px);
        border-radius: 50%;
        border: solid 0.03rem #00E4FF;
        overflow: hidden;
      }
      .user-name{
        font-size: pxrem(90px);
        color: #00E4FF;
      }
      .user-role{
        font-size: pxrem(72px);
        color: #00E4FF;
      }
      .loading{
        margin-top: pxrem(600px);
        color: #fff;
        font-size: pxrem(88px);
      }
    }
    // 对方
    .rong-min-window-wrap{
      width: 9rem;
      height: 7.2rem;
      border: solid 0.02rem #00E4FF;
      background:linear-gradient(0deg,rgba(1,24,87,1),rgba(1,47,83,1));
      overflow: hidden;
      overflow-x: scroll;
      position: absolute;
      top: calc(50% - 4rem);
      left: calc(50% - 9.2rem);
      .min-window-list{
        position: absolute;
        width: 80%;
        height: 100%;
        top: 0;
        left: 10%;
        z-index: 2;
        display: flex;
        flex: 1;
        .rong-min-window{
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: 0.01em solid #ddd;
          border-radius: 0.03em;
          overflow: hidden;
          background: rgba(0,0,0,0.4);
          margin-right: 0.1em;
          video{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    // 主叫准备
    .max-window-prepare{
      width: 9rem;
      height: 7.2rem;
      top: calc(50% - 4rem);
      right: calc(50% - 9.2rem);
      background:linear-gradient(0deg,rgba(1,24,87,1),rgba(1,47,83,1));
      border: solid 0.02rem #00E4FF;
      position: absolute;
      z-index: 1;
    }
    .times-info{
      z-index: 3;
      position: absolute;
      top: calc(50% + 1.5rem);
      right: calc(50% - 4.6rem);
      transform: translate(50%, 0%);
      .video-time{
        margin-bottom: pxrem(46px);
        display: block;
        border-radius:0.25em;
        text-align: center;
        font-size: pxrem(60px);
        color: #fff;
      }
      .call-btn{
        width: pxrem(164px);
        height: pxrem(164px);
        margin: 0 auto;
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
      .hangUp-btn{
        margin: 0 auto;
        display: block;
        width: pxrem(164px);
        height: pxrem(164px);
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
    }
    // 主叫方
    .rong-max-window {
      width: 7.8rem;
      height: 7.2rem;
      top: 0.4rem;
      right: calc(50% - 8.6rem);
      position: absolute;
      z-index: 2;
      video{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    // 全屏样式
    .full_screen{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 4;
      .min-window-list{
        z-index: 4;
      }
    }
    .full_screen2{
      width: 80%;
      height: 100%;
      top: 0;
      left: 10%;
      z-index: 4;
    }
    .times-info2{
      z-index: 5;
      top: calc(100% - 1.5rem)!important;
      right: 50%!important;
    }
  }
}
</style>

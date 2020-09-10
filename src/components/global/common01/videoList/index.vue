<template>
  <div class="xy-tv" id="xy-tv" v-cloak>
    <div class="videoTitle" :style="setFontSize(63)">视频监看</div>
    <div class="tv-wrap sys-flex sys-vertical" style="height: 90%;">
      <div class="tv-main">
        <div  class="tv-list list-box">
          <div class="sys-flex tv-detail">
            <div class="tv-left">
                <video-player
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="leftVideo.playerOpt"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player>
            </div>
            <div class="tv-right">
              <div :class="['right-item', {'active': k == curIndex}]" v-for="(v,k) in tvList" :key="k">
               <img :src="v.index_pic" alt="" class="sys-flex,sys-vertical">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
import { getM2OPlusPublishVideo } from '@/servers/interface'
export default {
  name: 'tv',
  data () {
    return {
      tvList: [],
      curIndex: 0,
      leftVideo: {},
      rightVideo: []
    }
  },
  components: {
    videoPlayer
  },
  created () {
    this.getTvList()
    setInterval(() => {
      this.curIndex += 1
      if (this.curIndex === 3) {
        this.curIndex = 0
      }
      this.leftVideo = this.tvList[this.curIndex]
      this.rightVideo = this.tvList.filter((item, index) => {
        if (parseInt(index) !== parseInt(this.curIndex)) {
          return item
        }
      })
    }, 15000)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getTvList () {
      getM2OPlusPublishVideo().then(res => {
        if (!res.data.error_code) {
          let data = res.data.result
          data.forEach(value => {
            value.playerOpt = {
              autoplay: true, // 自动播放
              controls: true, // 是否显示控制栏
              muted: true,
              fluid: true,
              width: 820,
              // techOrder: ['flash', 'html5'], // 兼容顺序
              sourceOrder: true,
              flash: { hls: { withCredentials: false } },
              html5: { hls: { withCredentials: false } },
              sources: [
                {
                  withCredentials: false,
                  type: 'application/x-mpegURL',
                  src: value.video.host +
                  value.video.dir +
                  value.video.filepath +
                  value.video.filename// 播放器默认图片
                }
              ],
              poster: value.index_pic,
              controlBar: {
                // 配置控制栏
                timeDivider: false, // 时间分割线
                durationDisplay: false, // 总时间
                progressControl: true, // 进度条
                customControlSpacer: true, // 未知
                fullscreenToggle: true // 全屏
              }
            }
          })
          this.tvList = data.slice(0, 3)
          this.leftVideo = this.tvList[this.curIndex]
          this.rightVideo = this.tvList.filter((item, index) => {
            if (parseInt(index) !== parseInt(this.curIndex)) {
              return item
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
[v-cloak]{
  display: none;
}
.xy-tv {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .videoTitle{
    font-size: pxrem(58px);
    font-weight: 500;
    text-shadow: 0 pxrem(16px) pxrem(16px) rgba(0, 222, 255, 0.2);
    color: #fff;
    text-align: left;
    margin-bottom: pxrem(20px);
  }
  .tv-main {
    position: relative;
    width: 100%;
    height: 100%;
    .name-box {
      position: absolute;
      width: 100%;
      top: 0;
      font-size: px1em(13px);
      padding-left: 0.5%;
      padding-right: 7.5%;
    }
    .tv-name {
      color: #fff;
      width:0.8rem;
      padding-right: 0.1rem;
      font-size:0.42rem;
      writing-mode:lr-tb;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .tv-list {
      width: 100%;
      height: 100%;
      .tv-detail{
        width:100%;
        height:100%;
        justify-content: space-between;
        .tv-left{
          flex: 2;
          width:100%;
          height:100%;
          background: url(./assets/back.png) center center no-repeat;
          background-size: 100% 100%;
          margin-right: pxrem(10px);
        }
        .tv-right{
          flex: 1;
          width:100%;
          height:100%;
          flex-direction: column;
          .right-item{
            width: 100%;
            height: 33%;
            flex: 1;
            margin-bottom: pxrem(12px);
            overflow: hidden;
            display: flex;
            align-items: center;
            &.active{
              border: 3px solid rgb(0, 228, 255);
            }
            img{
              width: 100%;
              // max-height: 100%;
            }
          }
        }
      }
      .vjs-custom-skin {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 10px;
      }
      .tv-name {
        color: #fff;
        width:0.8rem;
        font-size:0.42rem;
        writing-mode:tb
      }
    }
  }
}
</style>

<template>
  <div class="xy-tv" id="xy-tv">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="tv-wrap sys-flex sys-vertical">
      <div class="tv-main">
        <div v-for="(v,k) in tvList" :key="k" class="tv-list list-box">
          <div class="sys-flex tv-detail">
            <div class="tv-name">{{v.name}}</div>
            <div class="tv-item">
            <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :options="v.playerOpt"
              :playsinline="true"
              customEventName="customstatechangedeventname"
            ></video-player>
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
import { getM2OPlusChannelList } from '@/servers/interface'
export default {
  name: 'tv',
  data () {
    return {
      tvList: []
    }
  },
  components: {
    videoPlayer
  },
  created () {
    this.getTvList()
  },
  mounted () {
    this.setFontsize('xy-tv')
  },
  methods: {
    getTvList () {
      getM2OPlusChannelList().then(res => {
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
                  src: value.m3u8
                }
              ],
              poster:
                value.snap.host +
                value.snap.dir +
                value.snap.filepath +
                value.snap.filename, // 播放器默认图片
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
          let nullData = [
            {
              playerOpt: {
                autoplay: true, // 自动播放
                loop: true,
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
                    src: 'http://36772.live-vod.cdn.aodianyun.com/clip/0x0/d629d9961e4aef0b6c65a93e32ac968f/d629d9961e4aef0b6c65a93e32ac968f.m3u8'
                  }
                ],
                /* poster:
                  value.snap.host +
                  value.snap.dir +
                  value.snap.filepath +
                  value.snap.filename, // 播放器默认图片 */
                controlBar: {
                  // 配置控制栏
                  timeDivider: false, // 时间分割线
                  durationDisplay: false, // 总时间
                  progressControl: true, // 进度条
                  customControlSpacer: true, // 未知
                  fullscreenToggle: true // 全屏
                }
              }
            },
            {
              playerOpt: {
                autoplay: true, // 自动播放
                loop: true,
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
                    src: 'http://36772.live-vod.cdn.aodianyun.com/clip/0x0/ec797e2c2cd612a4ee7654cbbdf9d811/ec797e2c2cd612a4ee7654cbbdf9d811.m3u8'
                  }
                ],
                // poster:
                //   value.snap.host +
                //   value.snap.dir +
                //   value.snap.filepath +
                //   value.snap.filename, // 播放器默认图片
                controlBar: {
                  // 配置控制栏
                  timeDivider: false, // 时间分割线
                  durationDisplay: false, // 总时间
                  progressControl: true, // 进度条
                  customControlSpacer: true, // 未知
                  fullscreenToggle: true // 全屏
                }
              }
            }
          ]
          this.tvList = data.slice(0, 2).concat(nullData)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-tv {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
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
      font-size:0.42rem;
      writing-mode:lr-tb
    }
    .tv-list {
      width: 49%;
      height: 4.5rem;
      display:inline-block;
      background: url("./assets/back.png") no-repeat center;
      background-size: 100% 100%;
      margin-bottom:0.9rem;
      &:nth-child(odd) {
        margin-right:2%;
      }
      .tv-detail{
        width:100%;
        height:100%;
      }
      .tv-item{
        flex:1;
        height:100%;
      }
      .vjs-custom-skin {
        width: 100%;
        height: 100%;
        overflow: hidden;
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

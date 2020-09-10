<template>
  <div class="xy-tv" id="xy-tv">
    <!--  :class="[{'warp-bg' : showDefault}]" -->
    <div class="tv-wrap sys-flex sys-vertical">
      <div class="tv-title sys-flex sys-flex-center">{{tvTitle}}</div>
      <div class="tv-main">
        <div class="name-box sys-flex sys-flex-center flex-justify-around">
          <div class="tv-name">《新闻频道》</div>
          <div class="tv-name">《生活频道》</div>
        </div>
        <div class="sys-flex sys-flex-center flex-justify-between sys-flex-wrap tv-box">
          <div v-for="(v,k) in tvList" :key="k" class="tv-list list-box">
            <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :options="v.playerOpt"
              :playsinline="true"
              customEventName="customstatechangedeventname"
            ></video-player>
            <!-- <div class="tv-name">{{v.name}}</div> -->
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
      tvTitle: '电视频道',
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
                    src: 'http://36772.live-vod.cdn.aodianyun.com/clip/0x0/12cdd5dd23be29dcb9c337aae8a675ab/12cdd5dd23be29dcb9c337aae8a675ab.m3u8'
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
                    src: 'https://36772.live-vod.cdn.aodianyun.com/clip/0x0/004d1d03d523c495a6b8f611a426f110/004d1d03d523c495a6b8f611a426f110.m3u8'
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
  padding: 0.25vh 0.1vw;
  .tv-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .tv-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .tv-main {
    position: relative;
    width: 80%;
    height: 85%;
    margin: 0 auto;
    margin-top: -2.5%;
    .tv-box {
      padding: 4.5% 7.5% 0 0.5%;
      height: 100%;
      background: url("./assets/tvbg.png") no-repeat center;
      background-size: 100% 100%;
    }
    .name-box {
      position: absolute;
      width: 100%;
      top: 0;
      font-size: px1em(13px);
      padding-left: 0.5%;
      padding-right: 7.5%;
    }
    .tv-name {
      color: #d6e6ff;
    }
    .tv-list {
      position: relative;
      width: 49%;
      height: 48%;
      padding: 2px;
      background: url("./assets/back.png") no-repeat center;
      background-size: 100% 100%;
      .vjs-custom-skin {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .tv-name {
        color: #00fff6;
        font-size: 0.36em;
        text-align: center;
        margin-top: 0.15em;
      }
    }
  }
}
</style>

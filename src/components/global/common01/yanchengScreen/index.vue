<template>
  <div class="common01-web">
      <img src="./assets/zs.png" class="img-zs">
      <div class="toutiao-wrap common01-border screen-bg">
          <div class="video-content">
              <div class="video-player-wrapper">
                  <video-player
                  class="vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOpt"
                  :playsinline="true"
                  customEventName="customstatechangedeventname"
                ></video-player>
              </div>
              <div class="img-box flex">
                  <img :src="item.img" @click="changeVideo(item)" :class="{'img-active':currentItem.img == item.img}" class="avatar" v-for="(item,k) in videoList" :key="k"> 
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
export default {
  name: 'screen',
  components: {
    videoPlayer
  },
  data () {
    return {
      currentItem: {},
      videoList: [{
        img: 'http://img1.0515yc.cn/material/mediaserver/img/2020/06/925dd5b94ea146ec26f04209c99c0c08.jpg?0.08881594022217132',
        video: 'http://vfile1.0515yc.cn/2020/1591/2654/0368/159126540368.ssm/159126540368.m3u8'
      },
      {
        img: 'http://img1.0515yc.cn/material/mediaserver/img/2020/06/ec6094a28c89ce497fa27021a3cf866e.jpg?0.43822582404319976',
        video: 'http://vfile1.0515yc.cn/2020/1591/1790/0376/159117900376.ssm/159117900376.m3u8'
      },
      {
        img: 'http://img1.0515yc.cn/material/mediaserver/img/2020/06/dbf9971b1f31924b4d990d52869f0ff0.jpg?0.5606754340450291',
        video: 'http://vfile1.0515yc.cn/2020/1591/0926/0385/159109260385.ssm/159109260385.m3u8'
      }
      ],
      playerOpt: {
        autoplay: true, // 自动播放
        controls: false, // 是否显示控制栏
        muted: true,
        fluid: true,
        // techOrder: ['flash', 'html5'], // 兼容顺序
        sourceOrder: true,
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://vfile1.0515yc.cn/2020/1591/2654/0368/159126540368.ssm/159126540368.m3u8'
          }
        ]
      }
    }
  },
  created () {
    this.currentItem = this.videoList[0]
  },
  methods: {
    changeVideo (item) {
      this.currentItem = item
      let myPlayer = this.$refs.videoPlayer.player
      myPlayer.src(item.video)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-web {
  width: 100%;
  height: 100%;
  padding: pxrem(20px) pxrem(40px) pxrem(40px) 0;
  .img-zs{
    position: absolute;
    bottom:pxrem(8px);
    left:0;
  }
  .toutiao-wrap{
    color: #fff;
    padding:pxrem(110px) 0 pxrem(42px) pxrem(170px);
  }
  .screen-bg{
    background: url('./assets/ping-bg.png');
    // background-size: contain;
    background-size: pxrem(1890px) pxrem(1030px);
    background-repeat: no-repeat;
  }
  .video-content{
    margin:0 auto;
    width: pxrem(1156px);
    .video-player-wrapper{
      width: 100%;
      height: pxrem(650px);
      border:pxrem(8px) solid rgba(0, 222, 255, 1);
    }
    .vjs-custom-skin {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
  }
  .img-box{
    margin-top:pxrem(37px);
    width: 100%;
    justify-content: space-between;
    object-fit: cover;
    .img-active{
      border:pxrem(8px) solid #00F5FF;
    }
    .avatar{
      width: pxrem(320px);
      height: pxrem(180px);
    }
  }

}

</style>

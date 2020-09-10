<template>
  <div class="common01-clickrank">
    <div class="clickrank-wrap common01-border" v-if="!showDetail">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '点击量排行'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" @click="showContentDetail(v)" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + count - 4}}</div>
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="read common01-ft32 sys-flex sys-flex-center" :style="setFontSize(45)">
            <img src="../../../../assets/common/read.png" />
            <span>{{v.click_num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="clickrank-detail common01-border" v-if="showDetail">
      <div class="detail-title sys-flex sys-flex-center">
        <div class="back" @click="backList">
          <img src="../newArticle/assets/back.png" />
        </div>
        <div class="title common01-ft60 overhidden" :style="setFontSize(65)">{{detailData.title}}</div>
      </div>
      <div class="detail-list sys-flex sys-flex-center common01-ft30" :style="setFontSize(40)">
        <div class="source overhidden">来源：{{detailData.source}}</div>
        <div class="author overhidden">作者：{{detailData.author}}</div>
        <div class="time">{{detailData.create_time}}</div>
        <div class="read sys-flex sys-flex-center" v-if="detailData.click_num">
          <img src="../newArticle/assets/read.png" />
          <span>{{detailData.click_num}}</span>
        </div>
        <div class="comment sys-flex sys-flex-center" v-if="detailData.comment_num">
          <img src="../newArticle/assets/comment.png" />
          <span>{{detailData.comment_num}}</span>
        </div>
      </div>
      <div class="detail-content common01-ft36" :style="setFontSize(40)">
        <div class="news" v-if="detailData.listType === 'weChat' || (detailData.listType === 'm2o' && detailData.type === 'news')" v-html="detailData.listType === 'weChat' ? handelHtml(detailData.content) : handelHtml(detailData.content.html)"></div>
        <div class="pic" v-if="detailData.listType === 'm2o' && detailData.type === 'tuji'">
          <img :src="v.pic" v-for="(v, k) in detailData.content" :key="k" />
        </div>
        <div class="video" v-if="detailData.listType === 'm2o' && detailData.type === 'vod'">
          <video-player
            class="vjs-custom-skin"
            ref="videoPlayer"
            :options="detailData.content"
            :playsinline="true"
            customEventName="customstatechangedeventname"
          ></video-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
import { getClickArticleList, getM2OPLUSArticleDetail } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'clickRank',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: [],
      detailData: {},
      showDetail: false,
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getClickArticleList()
  },
  components: {
    videoPlayer
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    handelHtml (html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi
      return html.replace(rel, '')
    },
    getClickArticleList () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getClickArticleList(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result
          this.initList()
        }
      })
    },
    initList () {
      this.dataList = this.list.slice(
        this.count,
        this.count + 5 > this.list.length ? this.list.length : this.count + 5
      )
      this.count += 5
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 5)
            this.count += 5
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.countNum)
          this.count = 0
          this.getClickArticleList()
        }
      }, this.frequency)
    },
    backList () {
      this.showDetail = false
    },
    showContentDetail (value) {
      this.showDetail = true
      getM2OPLUSArticleDetail(value.id, value.type, this.currentViewId).then(res => {
        if (res && res.data && res.data.result) {
          this.detailData = res.data.result
          this.detailData.listType = value.type
          if (this.detailData.listType === 'm2o' && this.detailData.type === 'vod') {
            this.detailData.content = {
              autoplay: true, // 自动播放
              controls: true, // 是否显示控制栏
              muted: true,
              fluid: true,
              width: 820,
              sourceOrder: true,
              flash: { hls: { withCredentials: false } },
              html5: { hls: { withCredentials: false } },
              sources: [
                {
                  withCredentials: false,
                  type: 'application/x-mpegURL',
                  src: this.detailData.content
                }
              ],
              poster: this.detailData.thumb_url, // 播放器默认图片
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
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-clickrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .clickrank-wrap {
    padding: pxrem(220px) pxrem(96px) pxrem(95px) pxrem(78px);
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("./assets/one.png");
          }
          &.two {
            background-image: url("./assets/two.png");
          }
          &.three {
            background-image: url("./assets/three.png");
          }
          &.four {
            background-image: url("./assets/four.png");
          }
        }
        .title {
          text-align: left;
          width: 70%;
          margin-left: pxrem(43px);
        }
        .read {
          margin-left: auto;
          img {
            width: pxrem(42px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
  .clickrank-detail {
    padding: pxrem(100px) pxrem(72px) pxrem(10px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .detail-title {
      .back {
        width: pxrem(44px);
        height: pxrem(44px);
        margin-right: pxrem(40px);
      }
      .title {
        font-weight: bold;
      }
    }
    .detail-list {
      color: #05D9FF;
      border-bottom: pxrem(2px) dashed #00EAFF;
      padding: pxrem(40px) pxrem(20px) pxrem(35px) pxrem(80px);
      .source {
        width: 30%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .author {
        width: 17%;
        text-align: left;
        margin-right: pxrem(15px);
      }
      .read {
        margin-left: auto;
        img {
          width: pxrem(42px);
          height: pxrem(30px);
          margin-right: pxrem(10px);
        }
      }
      .comment {
        margin-left: pxrem(50px);
        img {
          width: pxrem(34px);
          height: pxrem(31px);
          margin-right: pxrem(10px);
        }
      }
    }
    .detail-content {
      width: 100%;
      height: 6.2rem;
      overflow: hidden;
      margin-top: pxrem(40px);
      &>div {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
      }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .video {
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

<template>
  <div class="common-activityInfo">
    <div class="activityInfo-page common01-border" v-if="!showDetail">
      <div class="common01-title page-title">{{ viewAttr.header || '活动资讯' }}</div>
        <img v-if="showUnit" class="unit_icon" src="../../../../assets/common/allunit.png" alt="" @click="showEvery()">
        <img v-if="!showUnit" class="unit_icon" src="../../../../assets/common/unit.png" alt="" @click="showAll()">
      <div class="list-title">
        <div
          class="list-item flex sys-flex-center animated"
          :class="{ flipInX: v.title }"
          :style="{ 'animation-delay': k / 2 + 's' }"
          v-for="(v, k) in dataList"
          @click="getDetail(v.id)"
          :key="k"
        >
          <!--  -->
          <div class="list-text overhidden common01-ft38 flex-one">
            <div class="flex">
              <div class="type-area sys-flex sys-flex-center">
                <img v-if="k === 0" src="./assets/new.png" />
                <img v-if="k === 1" src="./assets/icon_hot.png" />
              </div>
              <div :class="k<2?'title-div haveico':'title-div'">
                <p>{{ v.title }}</p>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="right-part">
            <div class="flex">
              <div class="list-read flex flex-center">
                <img class="img-icon" src="@/assets/common/reader.png" />
                <span class="common01-ft32 click-span">{{ v.click_num }}</span>
              </div>
              <div class="list-time flex flex-center">
                <img class="img-icon" src="@/assets/common/time.png" />
                <span class="common01-ft32">{{ v.showTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activityInfo-detail common01-border" v-if="showDetail">
      <div class="back-line">
        <div @click="backList()" class="back">
          <div class="back-img">
            <img src="./assets/icon_back.png" />
          </div>
          <span class="back-text">返回</span>
        </div>
      </div>
      <img v-if="showUnit" class="unit_icon" src="../../../../assets/common/allunit.png" alt="" @click="showEvery1()">
      <img v-if="!showUnit" class="unit_icon" src="../../../../assets/common/unit.png" alt="" @click="showAll()">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @slideNextTransitionEnd="goNext"
        @slidePrevTransitionEnd="goBefore"
      >
        <swiper-slide v-for="(v, k) in swiperDataList" :key="k" class="content-swiper">
          <div class="detail-title">{{ v.title }}</div>
          <div class="detail-list">
            <div class="source">来源：{{ v.source }}</div>
            <div class="author">发布时间：{{ v.showTime }}</div>
            <div class="bg-line">
              <p class="line"></p>
            </div>
          </div>
          <div
            class="detail-content common01-ft36"
            :style="setFontSize(40)"
            v-if="v.contentDetail || getContent(k)"
          >
            <div class="contnet-detail-div" v-html="handelHtml(v.contentDetail)"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white" @click="goBefore()"></div>
      <div class="swiper-button-next swiper-button-white" @click="goNext"></div>
    </div>
  </div>
</template>

<script>
import {GUID} from '@/servers/api'
import { getActivityInfo, getActivityInfoDetail } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'manuscript',
  data () {
    return {
      showUnit: true,
      dataList: [],
      swiperDataList: [],
      count: 5,
      detailData: {},
      showDetail: false,
      page: this.$route.query.page || 1,
      maxPage: 3,
      swiperLeftPage: 1, // 定位swiper滑动边界页码
      swiperRightPage: 1, // 定位swiper滑动边界页码
      showIndex: 0,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 10000,
      swiperOption: {
        notNextTick: true,
        initialSlide: this.$route.query.key || 0,
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        direction: 'horizontal',
        loop: true,
        observer: true,
        observeParents: true,
        paginationClickable: true
      },
      guid: GUID,
      detailId: '',
      key: '',
      isCheckPage: false
    }
  },
  async created () {
    if (window.location.href.indexOf('All') >= 0) {
      this.showUnit = true
    } else {
      this.showUnit = false
    }
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    setInterval(() => {
      if (!this.showDetail) {
        this.getDataList()
      }
    }, this.frequency)
  },
  methods: {
    showAll () {
      var url = window.location.origin + '/' + this.guid + '/All'
      window.location.href = url
    },
    showEvery () {
      var url = window.location.origin + '/' + this.guid + '/activityInfo'
      window.location.href = url
    },
    showEvery1 () {
      var url = window.location.origin + '/' + this.guid + '/activityInfo' + '?detailId=' + this.detailId + '&key=' + this.showIndex + '&showDetail=' + this.showDetail + '&page=' + (this.page - 1)
      window.location.href = url
    },
    goBefore () {
      if (this.swiperLeftPage > 1 && this.$refs.mySwiper.swiper.realIndex < 2) {
        this.getMoreList(this.swiperLeftPage--, 'left')
      }
    },
    goNext () {
      if (this.$refs.mySwiper.swiper.realIndex === this.dataList.length - 2) {
        this.getMoreList(this.swiperRightPage++, 'right')
      }
    },
    getDetail (id) {
      this.detailId = id
      // 保存swiper所需数据
      this.swiperLeftPage = this.page
      this.swiperRightPage = this.page
      this.showIndex = 0
      console.log(this.dataList)
      this.dataList.forEach((v, index) => {
        if (v.id === parseInt(this.detailId)) {
          // console.log('当前展示id：', this.detailId, v.id)
          this.showIndex = index
        }
      })
      this.swiperDataList = [...this.dataList]
      this.swiperOption.initialSlide = this.showIndex
      setTimeout(() => {
        this.showDetail = true
      }, 0)
    },
    backList () {
      this.showDetail = false
    },
    // 滑动获取更多
    getMoreList (pageNum, type) {
      // 接口需要调整 获取更多
      getActivityInfo(pageNum, this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            let newSwiperData = res.data.result.data
            newSwiperData.map(v => {
              v.contentDetail = ''
              let newDate = v.create_time.split('-').join('/')
              let _date = new Date(newDate)
              let month = (_date.getMonth() + 1).toString().padStart(2, '0')
              let day = _date
                .getDate()
                .toString()
                .padStart(2, '0')
              let hour = _date
                .getHours()
                .toString()
                .padStart(2, '0')
              let min = _date
                .getMinutes()
                .toString()
                .padStart(2, '0')
              v.showTime = month + '-' + day + '  ' + hour + ':' + min
            })
            if (type === 'right') {
              this.swiperDataList = [...this.swiperDataList, ...newSwiperData]
            }
            if (type === 'left') {
              this.swiperDataList = [...newSwiperData, ...this.swiperDataList]
            }
          }
        }
      })
    },
    checkPageType () {
      if (this.$route.query.detailId) {
        this.detailId = this.$route.query.detailId
        this.swiperOption.initialSlide = this.$route.query.key
        // this.showDetail = this.$route.query.showDetail
        // this.getDetail(this.detailId)
        this.showDetail = true
        this.getDetail(this.detailId)
      }
      this.isCheckPage = true
    },
    getDataList () {
      getActivityInfo(this.page, this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                let newDate = v.create_time.split('-').join('/')
                let _date = new Date(newDate)
                let month = (_date.getMonth() + 1).toString().padStart(2, '0')
                let day = _date
                  .getDate()
                  .toString()
                  .padStart(2, '0')
                let hour = _date
                  .getHours()
                  .toString()
                  .padStart(2, '0')
                let min = _date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')
                v.showTime = month + '-' + day + '  ' + hour + ':' + min
                v.contentDetail = ''
                return {
                  ...v
                }
              })
              if (!this.isCheckPage) {
                // 校验页面是否全屏
                this.checkPageType()
              }
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    },
    getContent (k) {
      getActivityInfoDetail(this.swiperDataList[k].id).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.content) {
            this.swiperDataList[k].contentDetail = res.data.result.content
          }
        }
      })
    },
    handelHtml (html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi
      return html.replace(rel, '')
    },
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-activityInfo {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    font-family: "SourceHanSansSC-Medium";
  }
  .activityInfo-page {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .page-title {
      font-weight: 600;
    }
    .unit_icon {
      width: pxrem(58px);
      height: pxrem(58px);
      position: absolute;
      top: pxrem(90px);
      right: pxrem(40px);
    }
    .list-item {
      margin-bottom: pxrem(110px);
      align-items: center;
    }
    .type-area {
      color: #0afbf2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
    }
    .list-title {
      color: #fff;
      font-size: 0.38rem;
      text-align: left;
    }
    .list-text {
      width: 40%;
      text-align: left;
    }
    .list-time {
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .title-div {
      width: 100%;
      &.haveico {
        width: calc(100% - 1.06rem);
      }
      > p {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .right-part {
      width: 5.4rem;
    }
    .list-read {
      margin: 0 0.3rem 0 0.45rem;
      font-size: 0.32rem;
      .click-span {
        display: inline-block;
        width: 1.1rem;
      }
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
  }
  .activityInfo-detail {
    padding: pxrem(130px) pxrem(72px) pxrem(10px);
    .content-swiper {
      height: pxrem(800px);
      overflow-y: scroll;
    }
    .back-line {
      margin-bottom: 0.45rem;
      position: absolute;
      z-index: 10;
      top: pxrem(80px);
      left: pxrem(80px);
    }
    .back {
      display: inline-block;
      font-weight: bold;
    }
    .unit_icon {
      z-index: 1;
      width: pxrem(58px);
      height: pxrem(58px);
      position: absolute;
      top: pxrem(90px);
      right: pxrem(40px);
    }
    .back-text {
      font-size: 0.34rem;
      color: #00ffea;
    }
    .back-img {
      display: inline-block;
      width: 0.36rem;
      height: 0.28rem;
      margin-right: 0.2rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .detail-title {
      display: inline-block;
      width: pxrem(1250px);
      font-weight: bold;
      font-size: 0.52rem;
      // line-height:0.52rem;
      color: #fff;
      margin-bottom: 0.38rem;
      text-align: center;
    }
    .detail-list {
      color: #fff;
      margin: 0 auto;
      text-align: center;
      .source {
        margin-right: 0.34rem;
        display: inline-block;
        font-size: 0.28rem;
      }
      .author {
        display: inline-block;
        font-size: 0.28rem;
      }
      .bg-line {
        margin-top: pxrem(12px);
        .line {
          width: pxrem(1017px);
          height: pxrem(2px);
          margin: 0 auto;
          background: linear-gradient(
            90deg,
            rgba(64, 107, 173, 0) 0%,
            rgba(64, 107, 173, 0.99) 48%,
            rgba(64, 107, 173, 0) 100%
          );
        }
      }
    }
    .detail-content {
      width: 100%;
      // height: 6.2rem;
      overflow: hidden;
      margin-top: pxrem(40px);
      padding: 0 pxrem(30px);
      & > div {
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
      .contnet-detail-div {
        font-size: pxrem(40px);
        color: #eeeeee;
        img {
          width: auto;
          max-width: 100%;
        }
      }
    }
    .swiper-slide {
      width: 100% !important;
    }
    .swiper-button-prev {
      background-image: url(./assets/icon_left.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-next {
      background-image: url(./assets/icon_right.png) !important;
      width: 0.4rem;
      height: 0.78rem;
      background-size: 100%;
    }
    .swiper-button-prev:focus,
    .swiper-button-next:focus {
      outline: none;
    }
  }
}
</style>

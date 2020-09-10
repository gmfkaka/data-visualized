<template>
  <div class="common-activityInfo-js">
    <div class="activityInfo-page common01-border" v-if="!showDetail">
      <div class="common01-title page-title">{{ viewAttr.header || '文明播报' }}</div>
      <div class="tab-btn sys-flex">
        <div
          :class="showOrg?'btn common01-ft38 act':'btn common01-ft38'"
          @click="showOrg=!showOrg"
        >活动资讯</div>
        <div
          :class="showOrg?'btn common01-ft38':'btn common01-ft38 act'"
          @click="showOrg=!showOrg"
        >先进典型</div>
      </div>
      <!-- 咨询业 -->
      <div v-if="showOrg">
        <div class="list-title">
          <div
            class="list-item flex sys-flex-center animated"
            :class="{ flipInX: v.title }"
            :style="{ 'animation-delay': k / 2 + 's' }"
            v-for="(v, k) in dataList"
            @click="getDetail(v)"
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
        <div class="scroll_icon"> 
          <!-- <i class="el-icon-top" :class="{icon_opcity: page === 1}" @click="lastPage"></i>
          <i class="el-icon-bottom" :class="{icon_opcity: page === PageTotal}"  @click="nextPage"></i> -->
          <img class="icon_up" :class="{icon_opcity: page === 1}" src="./assets/arrow_up.png" @click="lastPage"/>
          <img class="icon_up" src="./assets/arrow_down.png" :class="{icon_opcity: page === PageTotal}" @click="nextPage"/>
        </div>
      </div>
      <!-- 先进典型 -->
      <div class="org-div" :class="{org_div_add: !showOrg}" v-if="!showOrg && advanceList.length">
        <div class="total advance_total">
          <p>先进典型</p>
          <span>{{advanceTotal}}</span>
        </div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position1" @click="getDataList(0)">{{advanceList[0].name}}</div>
        <div v-if="advanceList.length" class="name1 common01-ft36 animated flipInX advance_position2" @click="getDataList(1)">{{advanceList[1].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position3" @click="getDataList(2)">{{advanceList[2].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position4" @click="getDataList(3)">{{advanceList[3].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position5" @click="getDataList(4)">{{advanceList[4].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position6" @click="getDataList(5)">{{advanceList[5].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position7" @click="getDataList(6)">{{advanceList[6].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position8" @click="getDataList(7)">{{advanceList[7].name}}</div>
        <div v-if="advanceList.length" class="name common01-ft36 animated flipInX advance_position9" @click="getDataList(8)">{{advanceList[8].name}}</div>
        <div class="number advance_position1" @click="getDataList(0)">{{advanceList[0].publish_number}}</div>
        <div class="number advance_position2" @click="getDataList(1)">{{advanceList[1].publish_number}}</div>
        <div class="number advance_position3" @click="getDataList(2)">{{advanceList[2].publish_number}}</div>
        <div class="number advance_position4" @click="getDataList(3)">{{advanceList[3].publish_number}}</div>
        <div class="number advance_position5" @click="getDataList(4)">{{advanceList[4].publish_number}}</div>
        <div class="number advance_position6" @click="getDataList(5)">{{advanceList[5].publish_number}}</div>
        <div class="number advance_position7" @click="getDataList(6)">{{advanceList[6].publish_number}}</div>
        <div class="number advance_position8" @click="getDataList(7)">{{advanceList[7].publish_number}}</div>
        <div class="number advance_position9" @click="getDataList(8)">{{advanceList[8].publish_number}}</div>
      </div>
    </div>
    <!-- 咨询页详情 -->
    <div class="activityInfo-detail common01-border" v-if="showDetail && !showAdvancePage && !showAdvanceDeatil">
      <!-- <div class="back-line">
        <div @click="backList()" class="back">
          <div class="back-img">
            <img src="./assets/icon_back.png" />
          </div>
          <span class="back-text">返回</span>
        </div>
      </div> -->
      <div class="back-btn common01-ft36" @click="backList()">返回</div>
      <swiper
        :options="swiperOption"
        @slideChangeTransitionEnd='swiperChange'
        ref="mySwiper"
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
            v-if="v.contentDetail"
          >
            <div class="video" v-if="v.videoList.length">
              <video-player
                v-for="video in v.videoList"
                :key="video.file_name"
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="video.options"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player>
            </div>
            <div class="contnet-detail-div" v-html="handelHtml(v.contentDetail)"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
    <!-- 先进典型咨询列表页 -->
    <div class="activityInfo-page common01-border" v-if="showDetail && showAdvancePage">
        <div class="back-btn common01-ft36" @click="advanceListBack">返回</div>
        <div class="common01-title page-title">{{ viewAttr.header || '先进典型' }}</div>
        <div class="list-title">
          <div
            class="list-item flex sys-flex-center animated list-item-add"
            :class="{ flipInX: v.title }"
            :style="{ 'animation-delay': k / 2 + 's' }"
            v-for="(v, k) in dataList"
            @click="getDetail(v, 'adv')"
            :key="k"
          >
            <p>{{ v.title }}</p>
            <div>{{ v.brief }}</div>
            <!--  -->
          </div>
        </div>
        <div class="scroll_icon"> 
          <img class="icon_up" :class="{icon_opcity: page === 1}" src="./assets/arrow_up.png" @click="lastPage('adv')"/>
          <img class="icon_up" src="./assets/arrow_down.png" :class="{icon_opcity: page === PageTotal}" @click="nextPage('adv')"/>
        </div>
    </div>
    <!-- 先进典型详情页 -->
    <div class="activityInfo-detail common01-border" v-if="showDetail && showAdvanceDeatil">
      <!-- <div class="back-line">
        <div @click="backList()" class="back">
          <div class="back-img">
            <img src="./assets/icon_back.png" />
          </div>
          <span class="back-text">返回</span>
        </div>
      </div> -->
      <div class="back-btn common01-ft36" @click="backAdvList()">返回</div>
      <swiper
        :options="swiperOption"
        ref="mySwiper"
      >
        <swiper-slide v-for="(v, k) in swiperDataList" :key="k" class="content-swiper">
          <div class="detail-title">{{ v.title }}</div>
          <div class="detail-list">
            <!-- <div class="source">来源：{{ v.source }}</div>
            <div class="author">发布时间：{{ v.showTime }}</div>
            <div class="bg-line">
              <p class="line"></p>
            </div> -->
          </div>
          <div  class="detail-content common01-ft36 flex" :style="setFontSize(40)" v-if="v.contentDetail">
            <div class="contnet-detail-img" v-html="handelHtml(v.imgContent)"></div>
            <div class="contnet-detail-div-add" v-html="handelHtml(v.wordDetail)"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  </div>
</template>

<script>
import { getJSActivityInfo, getActivityInfoDetail, getAdvancedList } from '@/servers/interface'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
export default {
  name: 'manuscript',
  data () {
    return {
      showOrg: false,
      columnId: 0,
      dataList: [],
      PageTotal: 0,
      advanceTotal: 0,
      currentIndex: 0,
      swiperDataList: [],
      showAdvancePage: false,
      advanceList: [], // 先进典型数据
      count: 5,
      detailData: {},
      showDetail: false,
      showAdvanceDeatil: false,
      page: 1,
      maxPage: 3,
      currentPage: 1,
      swiperLeftPage: 1, // 定位swiper滑动边界页码
      swiperRightPage: 1, // 定位swiper滑动边界页码
      showIndex: 0,
      column_id: '1046,1047,1048,1052,1265',
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
        initialSlide: 0,
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        direction: 'horizontal',
        loop: false,
        observer: true,
        observeParents: true,
        paginationClickable: true
      }
    }
  },
  created () {
    this.getDataList()
    this.getAdvancedList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    // setInterval(() => {
    //   if (!this.showDetail) {
    //     this.getDataList()
    //   }
    // }, this.frequency)
  },
  watch: {
    showOrg (val) {
      if (!val) {
        this.page = 1
      }
    }
  },
  methods: {
    backAdvList () {
      this.showAdvanceDeatil = false
      this.showAdvancePage = true
    },
    advanceListBack () {
      this.page = 1
      this.showAdvancePage = false
      this.showDetail = false
      this.getDataList()
    },
    // 获取先进典型列表
    getAdvancedList () {
      getAdvancedList().then(res => {
        if (!res.data.error_code) {
          this.advanceList = res.data.result
          this.advanceList.forEach(val => {
            this.advanceTotal += Number(val.publish_number)
          })
        }
      })
    },
    // 下一页
    nextPage (adv) {
      if (this.page === this.PageTotal) return false
      this.page += 1
      if (adv === 'adv') {
        this.getDataList(this.currentIndex)
      } else {
        this.getDataList()
      }
    },
    // 上一页
    lastPage (adv) {
      if (this.page === 1) return false
      this.page -= 1
      if (adv === 'adv') {
        this.getDataList(this.currentIndex)
      } else {
        this.getDataList()
      }
    },
    swiperChange () {
      if (this.$refs.videoPlayer && this.$refs.videoPlayer.length) {
        this.$refs.videoPlayer.forEach(e => {
          e.player.pause()
        })
      }
    },
    // goBefore () {
    //   console.log(this.swiperDataList)
    //   if (this.currentPage > 1 && this.$refs.mySwiper.swiper.realIndex < 1) {
    //     this.getMoreList(this.currentPage--, 'left')
    //   }
    // },
    // goNext () {
    //   if (this.$refs.mySwiper.swiper.realIndex === this.dataList.length - 1) {
    //     this.getMoreList(this.currentPage++, 'right')
    //   }
    // },
    getDetail (item, adv) {
      // if (item.title.indexOf('金山好人') > -1) return false // 金山好人暂时没详情，不进入详情
      // 保存swiper所需数据
      this.showIndex = 0
      this.dataList.forEach((v, index) => {
        if (v.id === item.id) {
          this.showIndex = index
        }
      })
      this.swiperDataList = [...this.dataList]
      this.getListcontent()
      this.swiperOption.initialSlide = this.showIndex
      setTimeout(() => {
        if (adv === 'adv') {
          this.showAdvanceDeatil = true
          this.showAdvancePage = false
        } else {
          this.showDetail = true
        }
      }, 0)
    },
    backList () {
      this.showDetail = false
    },
    getListcontent () {
      this.swiperDataList.forEach((val, index) => {
        if (val.contentDetail) {
          return false
        }
        this.getContent(index)
      })
    },
    // 滑动获取更多
    // getMoreList (pageNum, type) {
    //   // 接口需要调整 获取更多
    //   getJSActivityInfo(pageNum, this.count).then(res => {
    //     if (!res.data.error_code) {
    //       if (res.data.result.data && res.data.result.data.length) {
    //         let newSwiperData = res.data.result.data
    //         newSwiperData.map(v => {
    //           v.contentDetail = ''
    //           let newDate = v.create_time.split('-').join('/')
    //           let _date = new Date(newDate)
    //           let month = (_date.getMonth() + 1).toString().padStart(2, '0')
    //           let day = _date
    //             .getDate()
    //             .toString()
    //             .padStart(2, '0')
    //           let hour = _date
    //             .getHours()
    //             .toString()
    //             .padStart(2, '0')
    //           let min = _date
    //             .getMinutes()
    //             .toString()
    //             .padStart(2, '0')
    //           v.showTime = month + '-' + day + '  ' + hour + ':' + min
    //         })
    //         if (type === 'right') {
    //           this.swiperDataList = [...this.swiperDataList, ...newSwiperData]
    //           this.getListcontent()
    //         }
    //         if (type === 'left') {
    //           this.swiperDataList = [...newSwiperData, ...this.swiperDataList]
    //           this.getListcontent()
    //         }
    //       }
    //     }
    //   })
    // },
    getDataList (i) {
      let config = {
        site_id: 143,
        page: this.page,
        count: this.count,
        status: 1,
        date_search: 5,
        column_id: this.column_id
      }
      if (i || i === 0) {
        config.column_id = this.advanceList[i].id
        this.showAdvancePage = true
        this.showDetail = true
        this.currentIndex = i
      }
      this.dataList = []
      getJSActivityInfo({ params: config }).then(res => {
        this.currentPage = this.page
        if (!res.data.error_code) {
          if (res.data.result.data && res.data.result.data.length) {
            this.dataList = []
            this.PageTotal = Math.ceil(res.data.result.total / 5)
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
            }, 100)
            // if (this.isPaging) {
            //   this.page += 1
            //   if (this.page > this.maxPage) {
            //     this.page = 1
            //   }
            // }
          } else {
            // if (this.page !== 1) {
            //   this.page = 1
            //   this.getDataList()
            // }
          }
        }
      })
    },
    getContent (k) {
      getActivityInfoDetail(this.swiperDataList[k].id).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.content) {
            let videoList = []
            this.$set(this.swiperDataList[k], 'contentDetail', res.data.result.content)
            let imgContent = ''
            let textContent = ''
            let content = res.data.result.content
            if (content.indexOf('<img') > -1) {
              textContent = content.substring(0, content.indexOf('<img')) + content.substring(content.indexOf('"/>') + 3, content.length)
              imgContent = content.substring(content.indexOf('<img'), content.indexOf('"/>') + 3)
            } else {
              textContent = content
            }
            this.$set(this.swiperDataList[k], 'wordDetail', textContent)
            this.$set(this.swiperDataList[k], 'imgContent', imgContent)
            if (res.data.result.attachments && res.data.result.attachments.length) {
              res.data.result.attachments.forEach(val => {
                if (val.type === 'video') {
                  val.options = {
                    autoplay: false, // 自动播放
                    controls: true, // 是否显示控制栏
                    muted: true,
                    fluid: true,
                    width: 820,
                    sourceOrder: true,
                    sources: [
                      {
                        src: 'http://vodjs.newsjs.net/' + val.file_path + val.file_name
                      }
                    ],
                    poster: 'http://imgjs.newsjs.net/' + val.index_pic, // 播放器默认图片
                    controlBar: {
                      // 配置控制栏
                      timeDivider: false, // 时间分割线
                      durationDisplay: false, // 总时间
                      progressControl: true, // 进度条
                      customControlSpacer: true, // 未知
                      fullscreenToggle: true // 全屏
                    }
                  }
                  videoList.push(val)
                }
              })
            }
            this.$set(this.swiperDataList[k], 'videoList', videoList)
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
    swiperSlide,
    videoPlayer
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-activityInfo-js {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    outline: 0;
    font-family: "SourceHanSansSC-Medium";
  }
  .activityInfo-page {
    position: relative;
    padding: pxrem(200px) pxrem(120px) pxrem(95px) pxrem(78px);
    .back-btn {
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(11px);
    }
    .org-div {
      position: absolute;
      width: pxrem(1678px);
      height: pxrem(810px);
      bottom: pxrem(35px);
      // background: url("./assets/bg_group_new2.png") no-repeat center;
      background: url("./assets/bg_new.png") no-repeat center;
      background-size: auto 100%;
      left: 52%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      .total,
      .name,
      .number {
        position: absolute;
      }
      .total {
        width: pxrem(314px);
        height: pxrem(189px);
        text-align: center;
        top: pxrem(338px);
        left: pxrem(667px);
        p {
          font-size: pxrem(52px);
          height: pxrem(50px);
          line-height: 1;
          letter-spacing: pxrem(3px);
          margin-top: pxrem(32px);
          color: #fff;
        }
        span {
          font-size: pxrem(68px);
          color: #00f6ff;
          font-weight: 800;
          letter-spacing: pxrem(11px);
        }
      }
      .advance_total{
        top: 3.58rem;
      }
      .name {
        height: pxrem(76px);
        line-height: pxrem(76px);
        color: #fff;
        font-weight: bold;
        letter-spacing: pxrem(2px);
        background: url("./assets/box_3.png") no-repeat center;
        background-size: 100% 100%;
        white-space: nowrap;
      }
      .name1{
        position: absolute;
        position: relative;
        color: #fff;
        max-width: 4.3rem;
        height: 1.32rem;
        letter-spacing: pxrem(2px);
        font-weight: bold;
        background: url("./assets/3@2x.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0.15rem 0.3rem;
      }
      .name1::before {
        left: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/1@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name1::after {
        right: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/2@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::before {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_1.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::after {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_2.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name.advance_position1 {
        top: -0.1rem;
        left: 3rem;
      }
      .name.advance_position3{
        left: 13.2rem;
        top: 4rem;
      }
      .name.advance_position4{
        left: 13rem;
        top: 5.5rem;
      }
      .name.advance_position5{
        left: 11.4rem;
        top: 7.45rem;
      }
      .name.advance_position6{
        left: 0.75rem;
        top: 7.45rem;
      }
      .name.advance_position7{
        left: -0.8rem;
        top: 5.5rem;
      }
      .name.advance_position8{
        left: -0.8rem;
        top: 4.05rem;
      }
      .name.advance_position9{
        left: 1.45rem;
        top: 1.7rem;
      }
      .name1.advance_position2{
        left: 12.3rem;
        top: 1.5rem;
      }
      .number {
        width: pxrem(138px);
        height: pxrem(138px);
        text-align: center;
        font-size: pxrem(48px);
        line-height: pxrem(138px);
        font-weight: bold;
        letter-spacing: pxrem(2px);
        color: #becfff;
      }
      .number.top-info {
        top: pxrem(20px);
        left: pxrem(750px);
      }
      .number.left-top-info {
        top: pxrem(248px);
        left: pxrem(428px);
        color: #0ce7e6;
      }
      .number.left-bottom-info {
        bottom: pxrem(96px);
        left: pxrem(482px);
      }
      .number.right-top-info {
        top: pxrem(250px);
        right: pxrem(462px);
        color: #0ce7e6;
      }
      .number.right-bottom-info {
        bottom: pxrem(96px);
        right: pxrem(514px);
      }
      .number.advance_position1{
        top: 0.83rem;
        left: 7.52rem;
      }
      .number.advance_position2{
        top: 1.57rem;
        left: 9.64rem;
        color: #0ce7e6;
      }
      .number.advance_position3{
        top: 3.28rem;
        left: 10.6rem;
      }
      .number.advance_position4{
        top: 5.26rem;
        left: 10.32rem;
        color: #0ce7e6;
      }
      .number.advance_position5{
        top: 6.6rem;
        left: 8.86rem;
      }
      .number.advance_position6{
        top: 6.58rem;
        left: 6.16rem;
      }
      .number.advance_position7{
        top: 5.28rem;
        left: 4.8rem;
        color: #0ce7e6;
      }
      .number.advance_position8{
        top: 3.28rem;
        left: 4.6rem;
      }
      .number.advance_position9{
        top: 1.57rem;
        left: 5.58rem;
        color: #0ce7e6;
      }
    }
    .scroll_icon{
      position: absolute;
      right: 0.4rem;
      top: 5.1rem;
      display: flex;
      flex-direction: column;
      img{
        margin-top: 0.2rem;
        width: 0.585rem;
        height: 0.664rem;;
      }
      .icon_opcity{
        opacity: 0.4;
      }
    }
    .tab-btn {
      position: absolute;
      outline: none;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(77px);
      .btn {
        width: pxrem(253px);
        height: pxrem(94px);
        line-height: pxrem(98px);
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: url("./assets/rectangle.png") no-repeat center;
        background-size: 100%;
      }
      .btn.act {
        background: url("./assets/rectangle_pre.png") no-repeat center;
        background-size: 100%;
      }
    }
    .page-title {
      font-weight: 600;
    }
    .list-item {
      padding: 0.2rem 0.2rem 0.2rem 0;
      margin-bottom: pxrem(60px);
      align-items: center;
      background: url(/static/img/box@2x.d7de315.png);
      background-size: 100% 100%;
    }
    .list-item-add{
       margin-bottom: pxrem(50px);
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
      padding-left: 0.225rem;
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
    padding: 0.7rem pxrem(72px) pxrem(10px);
    .back-btn{
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: 0.55rem;
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: 0.36rem 0.28rem;
      background-position: 0 0.11rem;
    }
    .content-swiper {
      height: pxrem(820px);
      overflow-y: scroll;
    }
    .back-line {
      position: absolute;
      z-index: 10;
      right: pxrem(80px);
      bottom: pxrem(50px);
    }
    .back {
      display: inline-block;
      font-weight: bold;
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
    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    //   display: block;
    // }
    .detail-title {
      display: inline-block;
      width: pxrem(1250px);
      font-weight: bold;
      font-size: 0.52rem;
      // line-height:0.52rem;
      color: #fff;
      margin-bottom: 0.3rem;
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
      overflow-y: scroll;
      margin-top: pxrem(40px);
      padding: 0 pxrem(30px);
      .video{
        margin: 0 auto;
        width: 12rem;
        height: 6rem;
        .vjs-custom-skin {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .vjs-big-play-button{
            left: calc(50% - 1.5em);
            top: calc(50% - 0.8em);
          }
        }
      }
      & > div {
        // width: 100%;
      }
      .pic {
        img {
          margin-bottom: pxrem(20px);
        }
      }
      .contnet-detail-div {
        line-height: 0.8rem;
        font-size: pxrem(40px);
        color: #eeeeee;
        img {
          width: auto;
          max-width: 100%;
        }
      }
      .contnet-detail-div-add {
        flex: 1;
        line-height: 0.6rem;
        font-size: pxrem(35px);
        text-indent: 2em;
        text-align: left;
        color: #eeeeee;
        p{
          br{
            display: none;
          }
        }
      }
      .contnet-detail-img{
        max-width: 35%;
        margin-right: 0.3rem;
        display: flex;
        img {
          object-fit: contain;
          max-width: 100%;
          max-height: 6.8rem;
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

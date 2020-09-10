<template>
  <div class="lishui-hotword">
    <!-- 详情框 -->
    <transition name="fade">
        <div class="content-wrap" v-if="isContent">
            <div class="content-inner" style="overflow-y: auto;">
                <div class="content-title overhidden">{{contentInfo.title}}</div>
                <div class="content-info sys-flex sys-flex-center">
                    <div class="source">来源：{{contentInfo.source}}</div>
                    <div class="date">发布时间：{{contentInfo.date}}</div>
                </div>
                <div class="content-brief" v-html="contentInfo.content"></div>
            </div>
            <div class="back" @click="hideContent"></div>
        </div>
    </transition>
    <!-- 列表弹框 -->
    <transition name="fade">
        <div class="content-wrap" v-if="isList">
              <!-- 列表 -->
              <div v-show="!ifListContent" class="content-inner">
                <div class="clue-list" style="width:100%;height:100%;overflow-y:auto;">
                  <div class="clue-list-item animated" style="margin-bottom:0.25rem;" v-for="(item,index) in modalNewsList" :key="index" v-bind:style="{'animation-delay' : index/2+'s'}" @click="showListContent(item.id)">
                      <div class="clue-title">{{item.title}}</div>
                      <div class="clue-info">
                          <span class="clue-from">来源：{{item.source}}</span>
                          <span class="clue-time">{{item.date}}</span>
                      </div>
                  </div>
                </div>
              </div>
              <!-- 详情 -->
              <div v-show="ifListContent" class="content-inner" style="overflow-y: auto;">
                  <div class="content-title overhidden">{{contentInfo.title}}</div>
                  <div class="content-info sys-flex sys-flex-center">
                      <div class="source">来源：{{contentInfo.source}}</div>
                      <div class="date">发布时间：{{contentInfo.date}}</div>
                  </div>
                  <div class="content-brief" v-html="contentInfo.content"></div>
              </div>
              <div v-show="ifListContent" class="goback" @click="ifListContent = false"></div>
              <div class="back" @click="hideList"></div>
        </div>
    </transition>
    <div class="hotword-wrap flex" id="word-cloud">
      <div class="clue-list">
          <div class="clue-list-item animated" :class="{'flipInX' : item.title}"  v-for="(item,index) in newsList" :key="index" v-bind:style="{'animation-delay' : index/2+'s'}" @click="showContent(item.id)">
              <div class="clue-title">{{item.title}}</div>
              <div class="clue-info">
                  <span class="clue-from">来源：{{item.source}}</span>
                  <span class="clue-time">{{item.date}}</span>
              </div>
          </div>
      </div>
      <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
    </div>
  </div>
</template>
<script>
import {getCloudNewsList, getCloudNewsDetail, getCloudHotword} from '@/servers/interface'
import echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'hotword',
  data () {
    return {
      newsList: [],
      modalNewsList: [],
      index: 0,
      id: null,
      proportion: 1,
      hotWordsList: [],
      currentIndex: 0,
      page: 1,
      count: 7,
      totalPage: 3,
      isContent: false,
      isList: false,
      ifListContent: false,
      contentInfo: {},
      sourceIds: '[3072709,3073249,3072828,3072624,3073309,47779,218]'
    }
  },
  created () {
    this.getNewsList()
    setInterval(() => {
      this.getMoreNewsList()
      this.getWordsList('溧水', this.sourceIds)
    }, 15000)
  },
  methods: {
    initWordCloud () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.wordcloud)
      _this.myChart.off('click')
      _this.options = {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 25,
            sizeRange: [60, 100],
            rotationRange: [0, 0],
            rotationStep: 0,
            shape: 'square',
            width: '100%',
            height: '100%',
            top: 0,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.hotWordsList
          }
        ]
      }
      _this.myChart.setOption(_this.options)
      _this.myChart.on('click', function (params) {
        _this.showList(params.data.name)
      })
    },
    getNewsList () {
      getCloudNewsList(1, this.count, '', this.sourceIds).then(res => {
        if (!res.data.error_code && res.data.result.data) {
          this.newsList = res.data.result.data
          this.getWordsList('溧水', this.sourceIds)
        }
      })
    },
    // 加载更多新闻
    getMoreNewsList () {
      if (this.page === this.totalPage) {
        this.page = 1
      } else {
        this.page++
      }
      getCloudNewsList(this.page, this.count, '', this.sourceIds).then(res => {
        if (!res.data.error_code && res.data.result.data) {
          this.newsList = []
          setTimeout(() => {
            this.newsList = res.data.result.data
          }, 100)
        }
      })
    },
    getWordsList (k, source) {
      getCloudHotword(k, source).then(res => {
        if (res.data.result.data && res.data.result.data[0]) {
          let newList = []
          let list = res.data.result.data
          list.forEach(element => {
            let obj = {
              name: element.key,
              value: element.doc_count
            }
            newList.push(obj)
          })
          this.hotWordsList = newList
          this.$nextTick(() => {
            this.initWordCloud()
          })
        }
      })
    },
    showContent (id) {
      getCloudNewsDetail(id).then(res => {
        if (!res.data.error_code) {
          this.contentInfo = res.data.result
          setTimeout(() => {
            this.isContent = true
          }, 10)
        }
      })
    },
    hideContent () {
      this.isContent = false
    },
    // 打开新闻列表弹框
    showList (keyword) {
      getCloudNewsList(1, 10, keyword, '', 7).then(res => {
        if (!res.data.error_code && res.data.result.data) {
          this.modalNewsList = res.data.result.data
          setTimeout(() => {
            this.isList = true
          }, 10)
        }
      })
    },
    hideList () {
      this.isList = false
      this.ifListContent = false
    },
    // 打开弹框里的详情
    showListContent (id) {
      getCloudNewsDetail(id).then(res => {
        if (!res.data.error_code) {
          this.contentInfo = res.data.result
          setTimeout(() => {
            this.ifListContent = true
          }, 10)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-hotword {
  width: 100%;
  height: 100%;
  padding: pxrem(33px) pxrem(26px) pxrem(53px) pxrem(50px);
  .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to  {
      opacity: 0;
  }
  .content-wrap{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0,0.8);
      z-index: 1;
      .content-inner{
          padding: 0.3rem 0.3rem;
          position: absolute;
          width: 14rem;
          height: 8rem;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          background:rgba(18,29,76,1);
          border:1px solid rgba(0, 96, 255, 1);
          border-radius:5px;
          .content-title{
              color:#fff;
              font-size: 0.4rem;
              text-align: center;
              padding: 0 1rem;
          }
          .content-info{
              border-bottom:1px dashed rgba(0,252,255,1);
              height: 1rem;
              font-size: 0.3rem;
              color:rgba(171,189,231,1);
              justify-content: center;
              .source{
                  margin-right: 0.8rem;
              }
              .date{
                  margin-right: 0.8rem;
              }
          }
          .content-brief{
              height: 5.8rem;
              padding-top: 0.3rem;
              color:#fff;
              font-size: 0.3rem;
              line-height: 0.7rem;
              overflow-x: auto;
              text-align: justify;
              text-indent: 2em;
          }
      }
      .back{
          width: 0.7rem;
          height: 0.7rem;
          position: absolute;
          right: 1.5rem;
          top: 1.2rem;
          background: url('./assets/back.png') no-repeat;
          background-size: 100% 100%;
      }
      .goback{
          width: 0.7rem;
          height: 0.7rem;
          position: absolute;
          left: 2.8rem;
          top: 1.8rem;
          background: url('./assets/goback.png') no-repeat;
          background-size: 100% 100%;
      }
  }
  .hotword-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: pxrem(120px) pxrem(50px) pxrem(50px);
    .word-cloud {
      height: 100%;
      flex: 1;
    }
  }
      .clue-list{
      width: 40%;
      .clue-list-item{
          height: 1rem;
          margin-bottom: 0.2rem;
          padding: 0.15rem 0.3rem;
          background: url('./assets/news-border.png') no-repeat;
          background-size: 100% 100%;
          font-family:PingFangSC-Regular;
          font-weight:400;
          text-align: left;
          &.selected{
              background: url('./assets/news-border-selected.png') no-repeat;
              background-size: 100% 100%;
          }
          .clue-title{
              font-size:0.25rem;
              height: 0.3rem;
              overflow: hidden;
              color:rgba(255,255,255,1);
              font-weight: 600;
              &.active{
                  color:rgba(255,226,34,1);
              }
          }
          .clue-info{
              padding-top: 0.15rem;
              font-size: 0.2rem;
              color:rgba(54,229,240,1);
              .clue-time{
                  padding-left: 0.28rem;
                  .time-icon{
                      width: 0.13rem;
                      height: 0.13rem;
                      margin-right: 0.11rem;
                      background: url('./assets/time.png') no-repeat;
                      background-size: 100% 100%;
                  }
              }
              .clue-read{
                  .read-icon{
                      width: 0.2rem;
                      height: 0.13rem;
                      margin-right: 0.11rem;
                      background: url('./assets/read.png') no-repeat;
                      background-size: 100% 100%;
                  }
              }
          }
      }
    }
}
</style>

<template>
  <div class="xy-news" id="xy-news">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="news-wrap sys-flex sys-vertical">
      <div class="news-title sys-flex sys-flex-center">{{newsTitle}}</div>
      <div class="title-list sys-flex sys-flex-center">
        <div class="list-item sys-flex sys-flex-center flex-justify-center" v-for="(v,k) in titleList" :key="k" :class="{'active': currentIndex === k}">
          {{v.name}}
        </div>
      </div>
      <div
        class="news-list animated sys-flex sys-flex-center overhidden"
        :class="{'fadeInLeft' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div 
          class="list-icon"
          :class="{'bgzero': k%3 === 0, 'bgfir': k%3 === 1, 'bgsec': k%3 === 2}"
        >{{k+1}}</div>
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-number sys-flex sys-flex-center flex-justify-center">
          <span class="list-number-icon read-icon" v-show="titleList[currentIndex].type === 0"></span>
          <span class="list-number-icon comment-icon" v-show="titleList[currentIndex].type === 1"></span>
          <span class="list-number-text">{{ titleList[currentIndex].type === 0 ? v.click_num : v.comment_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusRankList } from '@/servers/interface'
export default {
  name: 'news',
  data () {
    return {
      newsTitle: '稿件排行',
      titleList: [{
        name: '阅读量',
        type: 0
      }, {
        name: '评论',
        type: 1
      }],
      currentIndex: 0,
      dataList: [],
      count: 6,
      clickPage: 1,
      commentPage: 1,
      isPaging: false,
      frequency: 35000
    }
  },
  created () {
    this.getDataList(this.titleList[this.currentIndex].type)
  },
  mounted () {
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.titleList.length) {
        this.currentIndex = 0
        this.getDataList(this.titleList[this.currentIndex].type)
      } else {
        this.getDataList(this.titleList[this.currentIndex].type)
      }
    }, this.frequency)
    this.setFontsize('xy-news')
  },
  methods: {
    getDataList (type) {
      this.dataList = []
      if (type === 0) {
        getM2OPlusRankList('click_num', this.count, this.clickPage).then(res => {
          if (!res.data.error_code) {
            if (res.data.result.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result
              }, 100)
              if (this.isPaging) {
                this.clickPage += 1
              }
            } else {
              if (this.clickPage !== 1) {
                this.clickPage = 1
                this.getDataList()
              }
            }
          }
        })
      } else if (type === 1) {
        getM2OPlusRankList('comment_num', this.count, this.commentPage).then(res => {
          if (!res.data.error_code) {
            if (res.data.result.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result
              }, 100)
              if (this.isPaging) {
                this.commentPage += 1
              }
            } else {
              if (this.commentPage !== 1) {
                this.commentPage = 1
                this.getDataList()
              }
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-news {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .news-wrap {
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
  .news-title {
    height: 15%;
    text-align: left;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .title-list {
    width: 100%;
    height: 15%;
    margin-left: 1%;
    .list-item {
      width: px1em(180px);
      height: px1em(60px);
      margin-right: 2%;
      font-size: px1em(15px);
      color: #d6e6ff;
      background: url('./assets/news-btn.png') no-repeat center;
      background-size: 100% 100%;
    }
    .active {
      background: url('./assets/news-active-btn.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .news-list {
    height: 11%;
    color: #d6e6ff;
    .list-icon {
      width: px1em(40px);
      height: px1em(40px);
      line-height: px1em(40px);
      font-size: px1em(18px);
      margin-right: px1em(15px);
      text-align: center;
    }
    .bgzero {
      background-color: #3f8aff;
    }
    .bgfir {
      background-color: #fc8e26;
    }
    .bgsec {
      background-color: #1f56ab;
    }
    .list-title {
      flex: 1;
      font-size: px1em(18px);
      text-align: left;
    }
    .list-number {
      flex-basis: 20%;
      color: rgba(243, 248, 254, 0.5);
      .list-number-icon {
        font-size: px1em(14px);
        width: px1em(45px);
        height: px1em(45px);
        margin-right: px1em(10px);
        &.read-icon {
          background: url('./assets/read.png') no-repeat center;
          background-size: 100% 100%;
        }
        &.comment-icon {
          background: url('./assets/comment.png') no-repeat center;
          background-size: 80% 80%;
        }
      }
      .list-number-text {
        font-size: px1em(14.5px) !important;
      }
    }
  }
}
</style>

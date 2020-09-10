<template>
  <div class="qx-news" id="qx-news">
    <div class="news-wrap">
      <div class="news-list-wrap sys-flex sys-flex-wrap">
        <div class="news-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v,k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div 
            class="news-icon"
            :class="{'bgfirst': k == 0, 'bgsecond': k == 1, 'bgthird': k === 2}"
          >{{k+1}}</div>
          <div class="news-title overhidden">{{v.title}}</div>
          <div class="news-number sys-flex sys-flex-center">
            <img src="./assets/read.png" alt="" class="number-icon">
            <span class="number-text">{{v.click_num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusPublish } from '@/servers/interface'
export default {
  name: 'news',
  data () {
    return {
      dataList: [],
      count: 5,
      page: 1,
      isPaging: false,
      frequency: 15000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    // this.setFontsize('qx-news')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusPublish(this.count, this.page, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.qx-news {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .news-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .news-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
  }
  .news-list{
    color : #fff;
    width: 100%;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .news-icon {
      width: pxrem(60px);
      height: pxrem(60px);
      font-size: pxrem(40px);
      line-height: pxrem(60px);
      margin-right: pxrem(40px);
      background: url("./assets/other.png") no-repeat center;
      background-size: 100% 100%;
      &.bgfirst {
        background: url("./assets/first.png") no-repeat center;
        background-size: 100% 100%;
      }
      &.bgsecond {
        background: url("./assets/second.png") no-repeat center;
        background-size: 100% 100%;
      }
      &.bgthird {
        background: url("./assets/third.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .news-title{
      flex: 1;
      font-size: pxrem(40px);
      text-align: left;
    }
    .news-number{
      width: 12%;
      margin-left: pxrem(40px);
      .number-icon {
        width: pxrem(42px);
        height: pxrem(30px);
        margin-right: pxrem(18px);
      }
      .number-text {
        font-size: pxrem(32px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,246,255,1);
      }
    }
  }
}
</style>

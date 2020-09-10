<template>
  <div class="common01-wechat">
    <div class="wechat-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '微信热点'}}</div>
      <div class="wrap-content">
        <div class="item-list animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="item-info">
            <div class="item-title">{{v.title}}</div>
            <div class="item-tips sys-flex sys-flex-center">
              <div class="item-source">{{v.source}}</div>
              <!-- <div class="item-read sys-flex">
                <div class="read"><img src="./assets/read.png" /></div>
                333
              </div>
              <div class="item-read sys-flex">
                <div class="read"><img src="./assets/zan.png" /></div>
                1111
              </div>
              <div class="item-read sys-flex">
                <div class="read"><img src="./assets/star.png" /></div>
                2222
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCluesTogether } from '@/servers/interface'
export default {
  name: 'clickRank',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: []
    }
  },
  created () {
    this.getCluesTogether()
    setInterval(() => {
      this.getCluesTogether()
    }, this.frequency)
  },
  methods: {
    getCluesTogether () {
      getCluesTogether('weChat', 8, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
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
              this.getCluesTogether()
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
.common01-wechat {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .wechat-wrap {
    padding: pxrem(170px) pxrem(96px) pxrem(95px) pxrem(78px);
    background: url("./assets/background.png") no-repeat center;
    background-size: 100% 100%;
    color: #fff;
    .wrap-content {
      text-align:left;
      .item-list {
        margin-bottom: pxrem(20px);
        padding:pxrem(36px);
        width:24%;
        display:inline-block;
        background: url("./assets/bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-right:1%;
        background-color:rgba(0,96,255,0.2);
        .item-title {
          text-align: left;
          font-size:pxrem(38px);
          line-height:pxrem(60px);
          margin-bottom:pxrem(50px);
          height:pxrem(120px);
          overflow:hidden;
        }
        .item-source, .item-read{
          font-size:pxrem(30px);
          color:#36E5F0;
          margin-right:pxrem(42px);
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
}
</style>

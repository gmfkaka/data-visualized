<template>
  <div class="common01-weibohotnews">
    <div class="weibohotnews-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '微博热点'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + count - 4}}</div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <!-- <div class="read common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/read.png" />
            <span>{{v.click_num}}</span>
          </div> -->
          <div class="time common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/timeblue.png" />
            <span>{{v.date.substring(5,16)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCluesTogether } from '@/servers/interface'
export default {
  name: 'weiboHotNews',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getCluesTogether('weiBo', 20, 1, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result.data
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
          this.getList()
        }
      }, this.frequency)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-weibohotnews {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .weibohotnews-wrap {
    padding: pxrem(220px) pxrem(96px) pxrem(95px) pxrem(78px);
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .index {
          width: pxrem(57px);
          height: pxrem(63px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(55px);
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
          &::after{
            content: '';
            width: pxrem(1px);
            height: pxrem(128px);
            position: absolute;
            top: pxrem(63px);
            left: pxrem(29px);
            background-color: #0061E6;
          }
        }
        &:last-child .index::after{
          display: none;
        }
        .title {
          text-align: left;
          width: 70%;
          margin-left: pxrem(43px);
        }
        .read {
          color: #36E5F0;
          margin-left: auto;
          img {
            width: pxrem(42px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
        .time {
          color: #36E5F0;
          margin-left: auto;
          img {
            width: pxrem(30px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
}
</style>

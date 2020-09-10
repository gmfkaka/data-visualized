<template>
  <div class="jn-civilization">
    <div class="civilization-wrap">
      <div class="wrap-title sys-flex sys-flex-center flex-justify-center">
        <img src="./assets/logo@2x.png" />
        <span>文明江宁</span>
      </div>
      <div class="wrap-content">
        <div class="content-total">共<span>30</span>条</div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.Title}" v-bind:style="{'animation-delay' : k/2+'s'}">
            <!-- <span class="status" :class="{'new': v.status === 0, 'hot': v.status === 1, 'report': v.status === 2}"><span>{{v.status === 0 ? '新' : v.status === 1 ? '热' : '报'}}</span></div> -->
            <div class="status report"><span>报</span></div>
            <div class="title overhidden">{{v.Title}}</div>
            <div class="time">{{v.CreateTime.slice(5)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getcivilizationJN } from '@/servers/interface'
export default {
  name: 'civilizationJn',
  data () {
    return {
      dataList: [],
      topList: [],
      count: 0
    }
  },
  created () {
    this.getcivilizationJN()
  },
  methods: {
    getcivilizationJN () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getcivilizationJN(30).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result
          this.topList = this.list.splice(0, 2)
          this.initList()
        }
      })
    },
    initList () {
      this.dataList = this.list.slice(
        this.count,
        this.count + 6 > this.list.length ? this.list.length : this.count + 6
      )
      this.dataList.unshift(...this.topList)
      this.count += 6
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 6)
            this.dataList.unshift(...this.topList)
            this.count += 6
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.countNum)
          this.count = 0
          this.getcivilizationJN()
        }
      }, 10000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-civilization {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .civilization-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(20px) pxrem(100px) pxrem(5px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(52px);
      font-weight: 600;
      margin-top: pxrem(-8px);
      img {
        width: pxrem(68px);
        height: pxrem(68px);
        margin-right: pxrem(15px);
      }
      span {
        margin-left: pxrem(15px);
      }
    }
    .wrap-content {
      .content-total {
        font-size: pxrem(38px);
        text-align: left;
        margin-bottom: pxrem(10px);
        padding-left: pxrem(20px);
        span {
          color: #00F6FF;
          margin: 0 pxrem(8px);
        }
      }
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(100px);
          border-bottom: pxrem(4px) dashed #2A5EBA;
          margin-bottom: pxrem(10px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .status {
            width: pxrem(69px);
            height: pxrem(55px);
            background: no-repeat center;
            background-size: 100%;
            font-size: pxrem(36px);
            line-height: pxrem(55px);
            margin-right: pxrem(26px);
            &.new {
              background-image: url('./assets/new@2x.png');
            }
            &.hot {
              background-image: url('./assets/hot@2x.png');
            }
            &.report {
              background-image: url('./assets/report@2x.png');
            }
            span {
              padding-right: pxrem(15px);
            }
          }
          .title {
            width: 75%;
            text-align: left;
            font-size: pxrem(40px);
          }
          .time {
            margin-left: auto;
            font-size: pxrem(36px);
          }
        }
      }
    }
  }
}
</style>
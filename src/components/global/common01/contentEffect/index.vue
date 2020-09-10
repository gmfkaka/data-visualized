<template>
  <div class="common01-contenteffect">
    <div class="contenteffect-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '作品影响力'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + count - 4}}</div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="read common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/read.png" />
            <span>{{v.access_nums}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2ORankList } from '@/servers/interface'
export default {
  name: 'contentEffect',
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
      getM2ORankList(this.currentViewId).then(res => {
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
.common01-contenteffect {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .contenteffect-wrap {
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
}
</style>

<template>
  <div class="common01-dispatchrank">
    <div class="dispatchrank-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '发稿量排行'}}</div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in leftList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
            <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.publish}}</span>条</div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in rightList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k + 7 === 0, 'two': k + 7 === 1, 'three': k + 7 === 2, 'four':k + 7 > 2}">{{k + 8}}</div>
            <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.publish}}</span>条</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPublishDataRank } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'dispatchRank',
  data () {
    return {
      leftList: [],
      rightList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getPublishDataRank()
    setInterval(() => {
      this.getPublishDataRank()
    }, 60000)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getPublishDataRank () {
      getPublishDataRank(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          let dataList = res.data.result.data
          if (dataList && dataList.length > 7) {
            this.leftList = dataList.slice(0, 7)
            this.rightList = dataList.slice(7)
          } else {
            this.leftList = dataList
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
.common01-dispatchrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .dispatchrank-wrap {
    padding: pxrem(159px) pxrem(96px) pxrem(57px) pxrem(74px);
    color: #fff;
    .wrap-content {
      .content-left {
        .item-list {
          margin-right: pxrem(70px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-right {
        .item-list {
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .item-list {
        width: pxrem(800px);
        height: pxrem(100px);
        background: url("./assets/back.png") no-repeat center;
        background-size: 100%;
        padding: 0 pxrem(82px) 0 pxrem(38px);
        margin-bottom: pxrem(14px);
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("../clickRank/assets/one.png");
          }
          &.two {
            background-image: url("../clickRank/assets/two.png");
          }
          &.three {
            background-image: url("../clickRank/assets/three.png");
          }
          &.four {
            background-image: url("../clickRank/assets/four.png");
          }
        }
        .title {
          text-align: left;
          width: 40%;
          margin-left: pxrem(40px);
        }
        .num {
          margin-left: auto;
          color: #00FCFF;
        }
      }
    }
  }
}
</style>

<template>
  <div class="common01-workdepartrank">
    <div class="workdepartrank-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '部门排行'}}</div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in leftList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
            <div class="title common01-ft40">{{v.name}}</div>
            <div class="num common01-ft36"><span class="common01-ft60">{{v.total}}</span>条</div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in rightList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k + 5 === 0, 'two': k + 5 === 1, 'three': k + 5 === 2, 'four':k + 5 > 2}">{{k + 6}}</div>
            <div class="title common01-ft40">{{v.name}}</div>
            <div class="num common01-ft36"><span class="common01-ft60">{{v.total}}</span>条</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OWorkDepartRank } from '@/servers/interface'
export default {
  name: 'workDepartRank',
  data () {
    return {
      leftList: [],
      rightList: []
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 60000)
  },
  methods: {
    getDataList () {
      getM2OWorkDepartRank(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          let dataList = res.data.result
          if (dataList && dataList.length > 5) {
            this.leftList = dataList.slice(0, 5)
            this.rightList = dataList.slice(5)
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
.common01-workdepartrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .workdepartrank-wrap {
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
        margin-bottom: pxrem(70px);
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

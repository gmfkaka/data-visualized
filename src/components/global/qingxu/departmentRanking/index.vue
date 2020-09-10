<template>
  <div class="qx-personalranking" id="qx-personalranking">
    <div class="personalranking-wrap sys-flex sys-flex-wrap flex-justify-between">
      <div class="rank-list sys-flex sys-flex-center flex-justify-between animated" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList" :key="k">
        <div class="serial hg-flex" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four': k > 2}">
          <span class="serial-number">{{k + 1}}</span>
        </div>
        <div class="information sys-flex sys-flex-center">
          <span class="info-name">{{v.name}}</span>
        </div>
        <div class="num sys-flex sys-flex-center">
          <span class="num-text">{{v.publish}}</span>
          <span class="num-unit">条</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusWorkDepartRank } from '@/servers/interface'
export default {
  name: 'personalRanking',
  data () {
    return {
      dataList: [],
      count: 8,
      page: 1,
      isPaging: false,
      frequency: 15000
    }
  },
  created () {
    this.getDataList()
    // this.setFontsize('qx-personalranking')
  },
  mounted () {
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusWorkDepartRank(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result
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
.qx-personalranking {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .personalranking-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    align-content: space-around;
    .rank-list {
      width: 47%;
      height: 17%;
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 pxrem(57px) 0 pxrem(94px);
      position: relative;
      .serial {
        width: pxrem(60px);
        height: pxrem(70px);
        position: absolute;
        background: no-repeat center;
        background-size: 100% 100%;
        left: 0;
        top: 0;
        .serial-number {
          font-size: pxrem(40px);
          padding-bottom: 0.5em;
          color: #ffffff;
        }
        &.one {
          background-image: url('./assets/one.png');
        }
        &.two {
          background-image: url('./assets/two.png');
        }
        &.three {
          background-image: url('./assets/three.png');
        }
        &.four {
          background-image: url('./assets/four.png');
        }
      }
      .information {
        .info-name {
          font-size: pxrem(42px);
          color: #FFFFFF;
        }
      }
      .num {
        color: #00FCFF;
        .num-text {
          font-size: pxrem(60px);
        }
        .num-unit {
          font-size: pxrem(36px);
        }
      }
    }
  }
}
</style>
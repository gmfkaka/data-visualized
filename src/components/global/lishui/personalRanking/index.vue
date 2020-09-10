<template>
  <div class="lishui-personalranking" id="lishui-personalranking">
    <div class="personalranking-wrap sys-flex sys-flex-wrap flex-justify-between">
      <div class="rank-list sys-flex sys-flex-center flex-justify-between animated" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList" :key="k">
        <div class="serial hg-flex" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four': k > 2}"><span>{{k + 1}}</span></div>
        <div class="information sys-flex sys-flex-center">
          <img :src="v && v.avatar ? v.avatar.host + v.avatar.filepath + v.avatar.filename : defaultImg" />
          <span>{{v.name}}</span>
        </div>
        <div class="num sys-flex sys-flex-center">
          <span>{{v.publish}}</span>
          <span>条</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusWorkRank } from '@/servers/interface'
export default {
  name: 'personalRanking',
  data () {
    return {
      dataList: [],
      count: 8,
      page: 1,
      isPaging: false,
      defaultImg: require('../../../../assets/avatar/touxiang.png'),
      frequency: 25000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-personalranking')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusWorkRank(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
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
@import "~@/styles/index.scss";
.lishui-personalranking {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .personalranking-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(152px) px2em(128px) px2em(110px) px2em(114px);
    color: #fff;
    .rank-list {
      width: px2em(780px);
      height: px2em(140px);
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 px2em(57px) 0 px2em(94px);
      position: relative;
      .serial {
        width: px2em(55px);
        height: px2em(65px);
        position: absolute;
        background: no-repeat center;
        background-size: 100% 100%;
        left: 0;
        top: 0;
        span {
          font-size: px2em(32px);
          padding-bottom: px2em(50px);
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
        img {
          width: px2em(94px);
          height: px2em(94px);
          border-radius: 50%;
          margin-right: px2em(20px);
        }
        span {
          font-size: px2em(42px);
        }
      }
      .num {
        color: #00FCFF;
        span:first-of-type {
          font-size: px2em(72px);
          margin-right: px2em(20px);
        }
        span:last-of-type {
          font-size: px2em(36px);
        }
      }
    }
  }
}
</style>
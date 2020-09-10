<template>
  <div class="lishui-daytask" id="lishui-daytask">
    <div class="daytask-wrap sys-flex sys-flex-center">
      <div class="wrap-left">
        <div class="left-list" v-for="(v, k) in numList" :key="k">
          <div class="sys-flex sys-flex-center"><span>{{v.title}}：</span><span>{{v.num}}</span></div>
          <div class="progress-total">
            <span class="progress" :style="{'width' : getPersent(v.num, total)}"></span>
          </div>
        </div>
      </div>
      <div class="wrap-right">
        <div class="right-list sys-flex sys-flex-center animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList" :key="k">
          <div class="list-status">
            <img v-if="v.status === '1'" src="./assets/start.png" />
            <img v-if="v.status === '2'" src="./assets/ing.png" />
            <img v-if="v.status === '4'" src="./assets/finish.png" />
          </div>
          <div class="list-text overhidden">{{v.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallTaskNum, getWorkCallTaskList } from '@/servers/interface'
export default {
  name: 'dayTask',
  data () {
    return {
      dataList: [],
      count: 5,
      page: 1,
      isPaging: true,
      numList: [],
      total: 0,
      frequency: 25000
    }
  },
  created () {
    // 接口获取任务列表
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-daytask')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getWorkCallTaskList(this.count, this.page, this.currentViewId).then(res => {
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
              this.getDataList()
            }
          }
        }
      })
      getWorkCallTaskNum(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
            this.numList = []
            this.numList = res.data.result.filter(v => v.status === 1 || v.status === 2 || v.status === 4).map(v => {
              return {
                title: v.title,
                num: v.total
              }
            })
            this.total = res.data.result.reduce((past, cur) => past + cur.total, 0)
            this.numList.unshift({
              title: '总任务',
              num: this.total
            })
          }
        }
      })
    },
    getPersent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-daytask {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .daytask-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(198px) px2em(103px) px2em(106px) px2em(108px);
    color: #fff;
    .wrap-left {
      width: px2em(420px);
      height: px2em(680px);
      background: url('./assets/miniBorder.png') no-repeat center;
      background-size: 100% 100%;
      padding: px2em(52px) px2em(60px);
      margin-right: px2em(88px);
      .left-list {
        margin-bottom: px2em(73px);
        &:last-of-type {
          margin-bottom: 0;
        }
        span:first-of-type {
          font-size: px2em(32px);
        }
        span:last-of-type {
          font-size: px2em(54px);
          color: #00FFF6;
        }
        .progress-total {
          width: px2em(300px);
          height: px2em(10px);
          border-radius: px2em(5px);
          background-color: #0F385A;
          overflow: hidden;
          margin-top: px2em(15px);
          .progress {
            height: 100%;
            display: block;
            background-color: #247BF1;
            border-radius: px2em(5px);
          }
        }
      }
    }
    .wrap-right {
      .right-list {
        margin-bottom: px2em(92px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .list-status {
          width: px2em(130px);
          height: px2em(54px);
          margin-right: px2em(30px);
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .list-text {
          width: 62%;
          font-size: px2em(38px);
          text-align: left;
        }
      }
    }
  }
}
</style>

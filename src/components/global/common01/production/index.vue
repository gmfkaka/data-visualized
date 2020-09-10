<template>
  <div class="common01-contentproduction" id="common01-contentproduction">
    <div class="contentproduction-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '内容生产'}}</div>
      <div class="wrap-top sys-flex sys-flex-center">
        <div class="top-total sys-flex sys-flex-center">
          <div class="total-text common01-ft40">总内容：</div>
          <div class="total-num sys-flex sys-flex-center">
            <div class="num-list hg-flex" v-for="(v, k) in totalContent" :key="k"><span>{{v}}</span></div>
          </div>
        </div>
        <div class="top-right top-pass sys-flex sys-flex-center">
          <span class="common01-ft40">已通过：</span>
          <span class="common01-ft40">{{workdata.publish || 0}}</span>
        </div>
        <div class="top-right sys-flex sys-flex-center flex-justify-between">
          <span class="common01-ft40">未过审：</span>
          <span class="common01-ft40">{{workdata.audit || 0}}</span>
        </div>
      </div>
      <div class="wrap-bottom sys-flex sys-flex-center flex-justify-between">
        <div class="bottom-left">
          <div class="left-list sys-flex sys-flex-center flex-justify-between" v-for="(v, k) in dateList" :key="k" :class="{'active': k === currentIndex}">
            <div class="list-date sys-flex sys-flex-center">
              <span class="common01-ft40">{{v.text}}：</span>
              <span>{{v.date}}</span>
            </div>
            <div class="list-rank common01-ft32">
              部门日排行：{{v.num}}
            </div>
          </div>
        </div>
        <div class="bottom-right">
          <chart v-if="barOptions" :options="barOptions" :autoResize="true"></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusWorkRate, getM2OPlusWorkChartSummary } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
export default {
  name: 'contentProduction',
  props: {
    screenConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      multiple: 1,
      barOptions: '',
      workdata: {},
      totalContent: [0, 0, 0, 0, 0, 0, 0, 0],
      dateList: [{
        text: '日',
        type: 'd',
        date: '52',
        num: '2'
      }, {
        text: '周',
        type: 'w',
        date: '374',
        num: '4'
      }, {
        text: '月',
        type: 'm',
        date: '1307',
        num: '3'
      }, {
        text: '年',
        type: 'y',
        date: '10689',
        num: '3'
      }],
      currentIndex: 0,
      frequency: 25000
    }
  },
  components: {
    chart: echarts
  },
  mounted () {
    this.setFontsize('common01-contentproduction')
    this.initData()
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.dateList.length) {
        this.currentIndex = 0
      }
      this.initData(this.dateList[this.currentIndex].type)
    }, this.frequency)
  },
  methods: {
    initData (type = 'd') {
      getM2OPlusWorkRate(type, this.currentViewId).then(res => {
        if (res.data && res.data.result) {
          this.workdata = res.data.result
        } else {
          this.workdata = {}
        }
        this.totalContent = this.preFixInterge(+(this.workdata.create || '') + +(this.workdata.audit || '') + +(this.workdata.publish || ''), 8)
      })
      getM2OPlusWorkChartSummary(type, this.currentViewId).then(res => {
        if (res.data && res.data.result) {
          this.initChart(res.data.result)
        }
      })
    },
    initChart (data = {}) {
      let publishList = [data.article.publish || 0, data.gallery.publish || 0, data.video.publish || 0, data.link.publish || 0]
      let auditList = [data.article.create || 0, data.gallery.create || 0, data.video.create || 0, data.link.create || 0]
      if (!isNaN(+this.screenConfig.multiple) && +this.screenConfig.multiple !== 0) {
        this.multiple = +this.screenConfig.multiple
      }
      this.barOptions = {
        legend: {
          itemWidth: 30 * this.multiple,
          itemHeight: 30 * this.multiple,
          itemGap: 50 * this.multiple,
          data: [{
            name: '已通过',
            textStyle: {
              color: '#fff',
              fontSize: 30 * this.multiple
            }
          }, {
            name: '未过审',
            textStyle: {
              color: '#fff',
              fontSize: 30 * this.multiple
            }
          }]
        },
        xAxis: {
          type: 'category',
          data: ['文稿', '图集', '视频', '外链'],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 30 * this.multiple,
            fontWeight: 'bold',
            margin: 15 * this.multiple
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 0.5,
              opacity: 0.5,
              type: 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLabel: {
            formatter: function () {
              return ''
            }
          }
        },
        series: [{
          type: 'bar',
          name: '已通过',
          stack: 'sum',
          barWidth: 60 * this.multiple,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#064DFF']
                return colorList[params.dataIndex]
              }
            }
          },
          data: publishList
        }, {
          type: 'bar',
          name: '未过审',
          stack: 'sum',
          barWidth: 60 * this.multiple,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#DC355C']
                return colorList[params.dataIndex]
              }
            }
          },
          data: auditList
        }]
      }
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-contentproduction {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .contentproduction-wrap {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    padding: px2em(172px) px2em(133px) px2em(70px) px2em(102px);
    color: #fff;
    .wrap-top {
      width: 100%;
      height: px2em(145px);
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0 px2em(90px) 0 px2em(66px);
      margin-bottom: px2em(65px);
      .top-total {
        .total-text {
          font-size: px2em(36px);
        }
        .total-num {
          .num-list {
            width: px2em(58px);
            height: px2em(75px);
            background: url('./assets/numBack.png') no-repeat center;
            margin-right: px2em(8px);
            &:last-of-type {
              margin-right: 0;
            }
            span {
              font-size: px2em(60px);
              color: #00FFF6;
            }
          }
        }
      }
      .top-pass {
        margin: 0 px2em(100px) 0 auto;
      }
      .top-right {
        span:first-of-type {
          font-size: px2em(36px);
        }
        span:last-of-type {
          font-size: px2em(48px);
          font-weight: bold;
          color: #00FFF6;
        }
      }
    }
    .wrap-bottom {
      .bottom-left {
        .left-list {
          width: px2em(649px);
          height: px2em(105px);
          background: rgba(15,134,218,0.15);
          border: px2em(2px) solid rgba(0, 150, 255, 0.2);
          margin-bottom: px2em(30px);
          padding: 0 px2em(80px) 0 px2em(68px);
          &.active {
            background: rgba(15,134,218,0.4);
            border-color: rgba(0, 210, 255, 0.9);
          }
          &:last-of-type {
            margin-bottom: 0;
          }
          .list-date {
            color: #00FFF6;
            span:first-of-type {
              font-size: px2em(40px);
            }
            span:last-of-type {
              font-size: px2em(48px);
            }
          }
          .list-rank {
            font-size: px2em(36px);
          }
        }
      }
      .bottom-right {
        width: px2em(900px);
        height: px2em(550px);
      }
    }
  }
}
</style>

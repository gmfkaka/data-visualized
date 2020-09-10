<template>
  <div class="common01-datasystem">
    <div class="datasystem-wrap">
      <div class="wrap-title sys-flex">
        <div class="title-time sys-flex sys-flex-center">
          <div class="time-list" @click="changeTime(v.type)" :class="{'active': model === v.type}" v-for="(v, k) in timeList" :key="k">{{v.name}}</div>
        </div>
      </div>
      <div class="wrap-circle"></div>
      <div class="wrap-content sys-flex sys-flex-wrap flex-justify-between">
        <div class="content-echarts">
          <div class="echarts-title"></div>
          <div class="echarts-body">
            <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
        <div class="content-echarts">
          <div class="echarts-title user-title"></div>
          <div class="echarts-body">
            <chart :options="lineOptions" :autoResize="true"></chart>
          </div>
        </div>
        <div class="content-publish">
          <div class="publish-title"></div>
          <div class="publish-body sys-flex sys-flex-center sys-flex-wrap flex-justify-between">
            <div class="publish-list" :class="{'mb19': k === 0 || k === 1}" v-for="(v, k) in publishList" :key="k">
              <div>{{v.column_name}}</div>
              <div>{{v.count}}</div>
            </div>
          </div>
        </div>
        <div class="content-read">
          <div class="read-title"></div>
          <div class="read-body sys-flex flex-justify-between">
            <div class="read-width">
              <div class="read-list sys-flex sys-flex-center animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}" v-for="(v, k) in leftList" :key="k">
                <div class="list-num" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + 1}}</div>
                <div class="list-title overhidden">{{v.title}}</div>
                <div class="list-read sys-flex sys-flex-center">
                  <img src="./assets/read.png" />
                  <span>{{v.click_num}}</span>
                </div>
              </div>
            </div>
            <div class="read-width">
              <div class="read-list sys-flex sys-flex-center animated" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}" v-for="(v, k) in rightList" :key="k">
                <div class="list-num four">{{k + 6}}</div>
                <div class="list-title overhidden">{{v.title}}</div>
                <div class="list-read sys-flex sys-flex-center">
                  <img src="./assets/read.png" />
                  <span>{{v.click_num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import { getPropagationForceData } from '@/servers/interface'
export default {
  name: 'dataSystem',
  data () {
    return {
      leftList: [],
      rightList: [],
      model: 'd',
      timeList: [{
        name: '今日',
        type: 'd'
      }, {
        name: '近3天',
        type: 't'
      }, {
        name: '本周',
        type: 'w'
      }, {
        name: '本月',
        type: 'm'
      }],
      publishList: [],
      barOptions: {
        grid: {
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 16,
            margin: 10
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
              opacity: 1,
              type: 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
            fontSize: 16
          }
        },
        series: [{
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#FCC737',
              width: 2
            }
          },
          lineStyle: {
            width: 2
          },
          data: []
        }, {
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#3FB0FF'
              }, {
                offset: 1,
                color: '#003CFF'
              }])
            }
          },
          data: []
        }]
      },
      lineOptions: {
        grid: {
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 16,
            margin: 10
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
              opacity: 1,
              type: 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
            fontSize: 16
          }
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#00AEFF',
              width: 0,
              opacity: 0
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#00AEFF' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#7E00FF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      }
    }
  },
  created () {
    this.getPropagationForceData()
  },
  components: {
    chart: echarts
  },
  methods: {
    getPropagationForceData () {
      getPropagationForceData(this.model).then(res => {
        if (res && res.data && res.data.result) {
          this.barOptions.xAxis.data = []
          this.lineOptions.xAxis.data = []
          res.data.result.pv.time.forEach(value => {
            this.barOptions.xAxis.data.push(value.slice(5))
          })
          this.barOptions.series[0].data = res.data.result.pv.click_count
          this.barOptions.series[1].data = res.data.result.pv.click_count
          res.data.result.member_active.time.forEach(value => {
            this.lineOptions.xAxis.data.push(value.slice(5))
          })
          this.lineOptions.series[0].data = res.data.result.member_active.$member_active_count
          this.publishList = res.data.result.public_count
          this.leftList = res.data.result.news_rank.slice(0, 5)
          this.rightList = res.data.result.news_rank.slice(5)
        }
      })
    },
    changeTime (type) {
      this.model = type
      this.getPropagationForceData()
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
.common01-datasystem {
  width: 100%;
  height: 100%;
  padding: pxrem(20px);
  color: #fff;
  .datasystem-wrap {
    position: relative;
    .wrap-title {
      width: 100%;
      height: pxrem(100px);
      background: url('./assets/title.png') no-repeat center;
      background-size: 100% 100%;
      flex-direction: row-reverse;
      padding-right: pxrem(45px);
      margin-bottom: pxrem(18px);
      .title-time {
        .time-list {
          width: pxrem(107px);
          height: pxrem(48px);
          line-height: pxrem(48px);
          background: url('./assets/button2.png') no-repeat center;
          background-size: 100% 100%;
          font-size: pxrem(24px);
          font-weight: 500;
          margin-right: pxrem(15px);
          &:last-child {
            margin-right: 0;
          }
          &.active {
            background: url('./assets/button1.png') no-repeat center;
          }
        }
      }
    }
    .wrap-circle {
      width: pxrem(16px);
      height: pxrem(71px);
      background: url('./assets/circle.png') no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: pxrem(82px);
      right: 0;
    }
    .wrap-content {
      width: 100%;
      height: pxrem(921px);
      background: url('./assets/content-border.png') no-repeat center;
      background-size: 100% 100%;
      padding: pxrem(58px) pxrem(54px) pxrem(48px) pxrem(65px);
      .content-echarts {
        width: pxrem(574px);
        .user-title {
          background-image: url('./assets/user-total.png')!important;
        }
        .echarts-title {
          width: 100%;
          height: pxrem(29px);
          background: url('./assets/article-pv.png') no-repeat center;
          background-size: 100% 100%;
          margin-bottom: pxrem(54px);
        }
        .echarts-body {
          width: 100%;
          height: pxrem(252px);
        }
      }
      .content-publish {
        width: pxrem(488px);
        .publish-title {
          width: 100%;
          height: pxrem(29px);
          background: url('./assets/num-total.png') no-repeat center;
          background-size: 100% 100%;
          margin-bottom: pxrem(54px);
        }
        .publish-body {
          .publish-list {
            width: pxrem(230px);
            height: pxrem(115px);
            background: url('./assets/num-back.png') no-repeat center;
            background-size: 100% 100%;
            padding: pxrem(20px) pxrem(22px);
            text-align: left;
            div:first-child {
              font-size: pxrem(22px);
              margin-bottom: pxrem(10px);
            }
            div:last-child {
              color: #00FFF6;
              font-size: pxrem(34px);
            }
            &.mb19 {
              margin-bottom: pxrem(19px);
            }
          }
        }
      }
      .content-read {
        width: pxrem(1759px);
        margin-top: pxrem(60px);
        .read-title {
          width: 100%;
          height: pxrem(29px);
          background: url('./assets/read-rank.png') no-repeat center;
          background-size: 100% 100%;
          margin-bottom: pxrem(60px);
        }
        .read-body {
          .read-width {
            width: 48%;
            &:first-child {
              .read-list:last-child {
                margin-bottom: 0;
              }
            }
            &:last-child {
              .read-list:last-child {
                margin-bottom: 0;
              }
            }
          }
          .read-list {
            margin-bottom: pxrem(40px);
            .list-num {
              width: pxrem(30px);
              height: pxrem(30px);
              line-height: pxrem(30px);
              font-size: pxrem(20px);
              background: no-repeat center;
              background-size: 100%;
              margin-right: pxrem(14px);
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
            .list-title {
              font-size: pxrem(22px);
              width: 80%;
              text-align: left;
            }
            .list-read {
              margin-left: auto;
              img {
                width: pxrem(23px);
                height: pxrem(17px);
                margin-right: pxrem(8px);
              }
              span {
                font-size: pxrem(18px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
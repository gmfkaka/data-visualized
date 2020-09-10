<template>
  <div class="lishui-communicationeffect" id="lishui-communicationeffect">
    <div class="communicationeffect-wrap">
      <div class="wrap-top sys-flex sys-flex-center flex-justify-between">
        <div class="top-left top-common sys-flex sys-flex-center flex-justify-center">
          <span>阅读总量：</span>
          <span>{{readNum}}</span>
        </div>
        <div class="top-center">
          <img src="./assets/line.png" />
        </div>
        <div class="top-right top-common sys-flex sys-flex-center flex-justify-center">
          <span>收获评论：</span>
          <span>{{commentNum}}</span>
        </div>
      </div>
      <div class="wrap-bottom">
        <chart :options="barOptions" :autoResize="true"></chart>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusChart } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  name: 'communicationEffect',
  data () {
    return {
      readNum: 0,
      commentNum: 0,
      frequency: 25000,
      barOptions: {
        title: {
          text: '',
          x: 'center',
          y: 0,
          textStyle: {
            color: '#B4B4B4',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        grid: {
          top: '20%'
        },
        // backgroundColor: '#0d235e',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.1)',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        legend: {
          data: [{
            name: '阅读量',
            textStyle: {
              color: '#fff',
              fontSize: 30,
              width: 100,
              height: 100
            }
          }, {
            name: '评论量',
            textStyle: {
              color: '#fff',
              fontSize: 30
            }
          }],
          top: '7%'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
            margin: 20
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        yAxis: [
          {
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold'
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold'
            }
          }
        ],
        series: [{
          name: '评论量',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 20,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#F02FC2',
              width: 5
            }
          },
          lineStyle: {
            width: 5
          },
          data: []
        }, {
          name: '阅读量',
          type: 'bar',
          barWidth: 45,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
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
      }
    }
  },
  components: {
    chart: echarts
  },
  created () {
  },
  mounted () {
    this.setFontsize('lishui-communicationeffect')
    this.getDataList()
    // setInterval(() => {
    //   this.getDataList()
    // }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusChart(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.list) {
            let data = res.data.result
            this.readNum = data.total_click_num
            this.commentNum = data.total_comment_num
            let arr = data.list.map(v => v.time)
            this.barOptions.xAxis.data = arr
            this.barOptions.series[1].data = data.list.map(v => v.click_num)
            this.barOptions.series[0].data = data.list.map(v => v.comment_num)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-communicationeffect {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .communicationeffect-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(170px) px2em(103px) px2em(106px) px2em(108px);
    color: #fff;
    .wrap-top {
      margin-bottom: px2em(30px);
      .top-common {
        width: px2em(740px);
        height: px2em(130px);
        background: url('./assets/back.png') no-repeat center;
        background-size: 100% 100%;
        span:first-of-type {
          font-size: px2em(36px);
        }
        span:last-of-type {
          font-size: px2em(60px);
          color: #00FFF6;
        }
      }
      .top-center {
        width: px2em(89px);
        height: px2em(62px);
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .wrap-bottom {
      width: 100%;
      height: px2em(550px);
    }
  }
}
</style>
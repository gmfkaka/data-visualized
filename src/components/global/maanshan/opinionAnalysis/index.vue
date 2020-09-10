<template>
  <div class="maanshan-opinion" id="maanshan-opinion">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="opinion-wrap sys-flex sys-vertical">
      <div class="opinion-title">{{hotNews.title}}</div>
      <div class="opinion-charts sys-flex sys-flex-wrap flex-justify-between">
        <div class="heat-trend chart-box">
          <chart :options="heatOpt" :autoResize="true"></chart>
        </div>
        <div class="sentiment-analysis chart-box">
          <chart :options="sentimentOpt" :autoResize="true"></chart>
        </div>
        <div class="geographical-distribution chart-box">
          <chart :options="geoOpt" :autoResize="true"></chart>
        </div>
        <div class="regional-distribution chart-box">
          <chart :options="regionalOpt" :autoResize="true"></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotsTopicList, getHotsTopicTrend, getHotsTopicEmotion, getHotsTopicPubArea } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import china from 'echarts/map/json/china.json'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
echarts.registerMap('china', china)
export default {
  name: 'hotStats',
  components: {
    chart: echarts
  },
  data () {
    return {
      hotNews: {},
      dataList: [],
      count: 4,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10,
      curIndex: 0,
      curId: null,
      proportion: 1,
      heatData: {
        xAxis: [],
        series: []
      },
      sentimentData: {
        series: []
      },
      areaData: {
        geo: [{ value: 0 }],
        reg: [{ value: 0 }]
      },
      seriesData: []
    }
  },
  computed: {
    heatOpt () {
      return {
        color: ['#14da7d', '#8c6bf9', '#f36764', '#005edd'],
        title: {
          top: this.proportion * 20,
          left: this.proportion * 20,
          text: '分渠道热度走势',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 20
          }
        },
        grid: {
          left: this.proportion * 30,
          right: this.proportion * 60,
          top: this.proportion * 105,
          bottom: this.proportion * 15,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['网站', '微信', '微博'],
          right: this.proportion * 60,
          top: this.proportion * 30,
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 15
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            name: '日期',
            // nameLocation:'start',
            nameGap: 5,
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            boundaryGap: true,
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            data: this.heatData.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              // formatter: '{value} °C'
              formatter: '{value}'
            },
            name: '访问量',
            nameTextStyle: {
              fontSize: this.proportion * 15
            },
            nameGap: 10,
            color: '#fff',
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            splitLine: {
              // show:false
              lineStyle: {
                color: ['rgba(113,164,242,0.3)'],
                width: '1',
                type: 'dashed'
              }
            },
            axisPointer: {
              show: true
            }
          }
        ],
        series: this.heatData.series
      }
    },
    sentimentOpt () {
      return {
        color: ['#ce4272', '#0554f5', '#f3972e', '#008aed', '#14da7d'],
        textStyle: {
          color: '#fff'
        },
        title: {
          top: this.proportion * 20,
          left: this.proportion * 20,
          text: '情感分析',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 20
          }
        },
        series: [
          {
            name: '情感分析',
            type: 'pie',
            // center: ['45%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {d}%',
                textStyle: {
                  color: 'rgba(214, 230, 255, 0.5)',
                  fontSize: this.proportion * 14,
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: this.proportion * 18,
                  fontWeight: 'bold',
                  color: 'rgba(214, 230, 255, 0.5)'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.sentimentData.series
          }
        ]
      }
    },
    geoOpt () {
      return {
        color: ['#4da2fe'],
        title: {
          top: this.proportion * 20,
          left: this.proportion * 20,
          text: '地域分布Top5',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 20
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: this.proportion * 30,
          right: this.proportion * 60,
          top: this.proportion * 80,
          bottom: this.proportion * 15,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            // axisLabel: {
            //   interval: 0,
            //   rotate: -45
            // },
            data: this.areaData.geo.slice(0, 5).map(v => v.name)
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 1,
              formatter: '{value}%',
              textStyle: {
                // fontSize:'13'
              }
            },
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            color: '#fff',
            axisLine: {
              lineStyle: {
              // show:false,
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            max: 100,
            splitLine: {
              // interval:15,
              lineStyle: {
                color: ['rgba(113,164,242,0.1)'],
                width: '1',
                type: 'solid'
              }
            },
            axisPointer: {
              show: true
            }
          }
        ],
        series: [
          {
            name: '地域分布',
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}%',
                  color: '#ffffff'
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#0066FF' },
                    { offset: 0, color: '#18BBFF' }
                  ]
                )
              }
            },
            data: this.areaData.geo.slice(0, 5).map(v => v.value)
          }
        ]
      }
    },
    regionalOpt () {
      return {
        title: {
          top: this.proportion * 20,
          left: this.proportion * 20,
          text: '区域分布',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 20
          }
        },
        tooltip: {
          show: false,
          trigger: 'item'
        },
        // 用来展示映射的效果
        visualMap: {
          show: false,
          min: 0,
          max: this.areaData.geo[0].value || 0,
          left: 'center',
          top: 'bottom',
          inRange: {
            color: ['#6d9ce6', '#0763f3']
          },
          textStyle: {
            color: '#fff'
          },
          itemWidth: 10,
          itemHeight: 70,
          text: ['高', '低'],
          calculable: true
        },
        series: [
          {
            name: '区域分析',
            type: 'map',
            mapType: 'china',
            left: 'center',
            showLegendSymbol: true,
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#567bb6'
              },
              emphasis: {
                areaColor: '#567bb6'
              }
            },
            data: this.areaData.reg
          }
        ]
      }
    }
  },
  watch: {
    // 监测热点的ID变换，更新图表数据
    curId: {
      handler: function (newValue) {
        this.getHotTopicDetail(newValue)
      }
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.proportion = this.getProportion('maanshan-opinion')
    this.setFontsize('maanshan-opinion')
  },
  methods: {
    // 初始化新闻列表
    getDataList () {
      getHotsTopicList(this.count, this.page).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            this.dataList = res.data.result.data
            this.initList()
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
    },
    getHotTopicDetail (value) {
      getHotsTopicTrend(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.heatData.xAxis = res.data.result[0].count.map(v => v.field.slice(5))
          this.heatData.series = res.data.result.map(v => {
            return {
              name: v.name_zh,
              smooth: true,
              type: 'line',
              data: v.count.map(c => c.value),
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              }
            }
          })
        }
      })
      getHotsTopicEmotion(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.sentimentData.series = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
      getHotsTopicPubArea(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          let total = res.data.result.reduce((past, cur) => past + cur.count, 0)
          this.areaData.geo = res.data.result.map(v => {
            return {
              value: parseInt(v.count / total * 100),
              name: v.name_zh.replace(/省|市|自治区|维吾尔|壮族|回族/g, '')
            }
          })
          // 地图数据省份不要后缀，正则替换掉
          this.areaData.reg = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh.replace(/省|市|自治区|维吾尔|壮族|回族/g, '')
            }
          })
        }
      })
    },
    initList () {
      this.hotNews = this.dataList[this.curIndex]
      this.curId = this.hotNews.id
      this.curIndex++
      this.listInterval = setInterval(() => {
        if (this.curIndex < this.dataList.length) {
          this.hotNews = ''
          setTimeout(() => {
            this.hotNews = this.dataList[this.curIndex]
            this.curId = this.hotNews.id
            this.curIndex++
          }, 100)
        } else {
          clearInterval(this.listInterval)
          this.curIndex = 0
          this.getDataList()
        }
      }, this.frequency)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.maanshan-opinion {
  width: 100%;
  padding: 0.4em;
  .opinion-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/bg.png") no-repeat center;
    background-size: 100% 100%;
    padding: 0.85em;
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .opinion-title {
    height: 2em;
    line-height: 1em;
    text-align: center;
    font-size: 0.5em;
    font-weight: bold;
    color: #d6e6ff;
  }
  .opinion-charts {
    flex: 1;
    .chart-box {
      position: relative;
      width: 48%;
      height: 45%;
      background-color: #042557;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
    .chart-box::after{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      height: 25%;
      width: 25%;
      border-top-left-radius: 10%;
      border-left: 0.02em solid #8c6bf9;
      border-top: 0.02em solid #8c6bf9;
    }
    .chart-box::before{
      position: absolute;
      bottom: 0px;
      right: 0px;
      content: '';
      display: block;
      height: 25%;
      width: 25%;
      border-bottom-right-radius: 10%;
      border-right: 0.02em solid #8c6bf9;
      border-bottom: 0.02em solid #8c6bf9;
    }
  }
}
</style>

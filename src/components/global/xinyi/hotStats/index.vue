<template>
  <div class="xy-hot" id="xy-hot">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="hot-wrap sys-flex sys-vertical">
      <div class="hot-title hidden" id="hot-title">{{hotNews.title}}</div>
      <div class="hot-charts sys-flex sys-flex-wrap flex-justify-between">
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
          <!--  <chart :options="regionalOpt" :autoResize="true"></chart>  -->
          <chart :options="keyOpt" :autoResize="true"></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotsTopicList, getHotsTopicTrend, getHotsTopicEmotion, getHotsTopicPubArea, getHotsTopicHotWord } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts-wordcloud'
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
      isPaging: false,
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
      keyWordsList: [],
      frequency: 35000
    }
  },
  computed: {
    heatOpt () {
      return {
        color: ['#14da7d', '#8c6bf9', '#f36764', '#005edd'],
        title: {
          text: '分渠道热度走势',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
          }
        },
        grid: {
          left: this.proportion * 30,
          top: this.proportion * 50,
          bottom: this.proportion * 30,
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
          top: this.proportion * 20,
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 14
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            name: '日期',
            // nameLocation:'start',
            nameTextStyle: {
              fontSize: this.proportion * 12
            },
            nameGap: 5,
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            axisTick: {
              show: false,
              // interval:15,
              alignWithLabel: true
            },
            axisLabel: {
              fontSize: this.proportion * 12
            },
            data: this.heatData.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              fontSize: this.proportion * 12
            },
            axisLabel: {
              fontSize: this.proportion * 12,
              formatter: '{value}'
            },
            name: '访问量',
            nameGap: 10,
            color: '#fff',
            axisTick: {
              show: false,
              fontSize: this.proportion * 12,
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
          text: '情感分析',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
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
          text: '地域分布Top5',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
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
          top: this.proportion * 60,
          bottom: this.proportion * 30,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              fontSize: this.proportion * 12
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: this.areaData.geo.slice(0, 5).map(v => v.name)
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 15,
              formatter: '{value}%',
              fontSize: this.proportion * 12,
              textStyle: {
                // fontSize:'13'
              }
            },
            axisTick: {
              show: false,
              fontSize: this.proportion * 12,
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
                  color: '#ffffff',
                  fontSize: this.proportion * 10
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
          text: '区域分布',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
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
    },
    keyOpt () {
      return {
        title: {
          text: '关联热词',
          textStyle: {
            color: 'rgb(214,230,255)',
            fontSize: this.proportion * 18
          }
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 20,
            sizeRange: [10, 50],
            rotationRange: [0, 90],
            rotationStep: 90,
            shape: 'square',
            width: '80%',
            height: '80%',
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.keyWordsList
          }
        ]
      }
    }
  },
  watch: {
    // 监测热点的ID变换，更新图表数据
    curId: {
      handler (newValue) {
        this.getHotTopicDetail(newValue)
      }
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.proportion = this.getProportion('xy-hot') * 1.5
    this.setFontsize('xy-hot')
  },
  methods: {
    getDataList () {
      getHotsTopicList(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          // 判断是否使用假数据
          if (res.data.result.virtual) {
            this.fakeData(res.data.result.data)
          } else {
            if (res.data.result.data.length) {
              this.dataList = []
              this.dataList = res.data.result.data
              this.initList()
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
              data: v.count.map(c => c.value + Math.random() * 10)
            }
          })
        }
      })
      getHotsTopicEmotion(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.sentimentData.series = res.data.result.map(v => {
            return {
              value: v.count + Math.random() * 10,
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
      getHotsTopicHotWord(value).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.keyWordsList = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
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
    },

    // 本地假数据
    fakeData (data) {
      let fakeDataList = data
      let fakeDataIndex = 0
      this.hotNews = fakeDataList[fakeDataIndex].hotNews
      this.heatData.xAxis = fakeDataList[fakeDataIndex].heatDataxAxis
      this.heatData.series = fakeDataList[fakeDataIndex].heatDataseries
      this.sentimentData.series = fakeDataList[fakeDataIndex].sentimentDataseries
      this.areaData.geo = fakeDataList[fakeDataIndex].areaDatageo
      this.areaData.reg = fakeDataList[fakeDataIndex].areaDatareg.map(v => {
        return {
          value: v.value,
          name: v.name
        }
      })
      this.keyWordsList = fakeDataList[fakeDataIndex].keyWordsList
      setInterval(() => {
        fakeDataIndex++
        if (fakeDataIndex > 2) {
          fakeDataIndex = 0
        }
        this.hotNews = fakeDataList[fakeDataIndex].hotNews
        this.heatData.xAxis = fakeDataList[fakeDataIndex].heatDataxAxis
        this.heatData.series = fakeDataList[fakeDataIndex].heatDataseries
        this.sentimentData.series = fakeDataList[fakeDataIndex].sentimentDataseries
        this.areaData.geo = fakeDataList[fakeDataIndex].areaDatageo
        this.areaData.reg = fakeDataList[fakeDataIndex].areaDatareg.map(v => {
          return {
            value: v.value,
            name: v.name
          }
        })
        this.keyWordsList = fakeDataList[fakeDataIndex].keyWordsList
      }, this.frequency)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.xy-hot {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .hot-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/bg.png") no-repeat center;
    background-size: 100% 100%;
    padding: px1em(8.5px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .hot-title {
    height: px1em(110px);
    text-align: center;
    font-size: px1em(11px);
    font-weight: bold;
    color: #d6e6ff;
  }
  #hot-title {
    text-align: -webkit-center;
  }
  .hidden {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hot-charts {
    flex: 1;
    .chart-box {
      position: relative;
      width: 48%;
      height: 45%;
      padding: 1% 0 0 1%;
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
      border-left: px1em(1px) solid #8c6bf9;
      border-top: px1em(1px) solid #8c6bf9;
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
      border-right: px1em(1px) solid #8c6bf9;
      border-bottom: px1em(1px) solid #8c6bf9;
    }
  }
}
</style>

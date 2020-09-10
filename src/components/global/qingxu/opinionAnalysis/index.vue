<template>
  <div class="qx-opinionAnalysis" id="qx-opinionAnalysis">
    <div class="opinion-analysis-wrap sys-flex flex-justify-between sys-vertical">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(v, k) in localList" :key="k">
          <div class="data-box">
            <div class="data-title overhidden" :class="{activeTitle: k === activeIndex}">
              {{v.title}}
            </div>
          </div>
        </swiper-slide>
      </swiper>
     
      <div class="data-echarts sys-flex flex-justify-between sys-flex-center">
        <div class="sentiment-analysis sys-flex flex-justify-between sys-vertical">
          <div class="sentiment-title"></div>
          <div class="chart-box sys-flex sys-flex-center flex-justify-around">
            <div class="sentiment-tip">
              <div class="tip-list sys-flex sys-flex-center" v-for="(v, k) in tipList" :key="k">
                <span class="tip-icon" :class="v.class"></span>
                <span class="tip-class">{{v.name}}</span>
                <span>{{v.value}}</span>
              </div>
            </div>
            <div class="sentiment-chart"> 
              <chart :options="sentimentOpt" :autoResize="true"></chart>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="key-word sys-flex flex-justify-between sys-vertical">
          <div class="key-title"></div>
          <div class="chart-box">
            <chart :options="keyOpt" :autoResize="true"></chart>
          </div>
        </div>
        <div class="line"></div>
        <div class="geographical-analysis sys-flex flex-justify-between sys-vertical">
          <div class="geographical-title"></div>
          <div class="chart-box">
            <chart :options="geoOpt" :autoResize="true"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
import 'echarts-wordcloud'
import { getHotsTopicList, getHotsTopicEmotion, getHotsTopicPubArea, getHotsTopicHotWord } from '@/servers/interface'
export default {
  name: 'opinionAnalysis',
  components: {
    swiper,
    swiperSlide,
    chart: echarts
  },
  data () {
    return {
      localList: [],
      page: 1,
      count: 12,
      curId: null,
      tipList: [],
      sentimentData: {
        series: []
      },
      keyWordsList: [],
      areaData: {
        geo: [{ value: 0 }],
        reg: [{ value: 0 }]
      },
      activeIndex: 0
    }
  },
  computed: {
    swiperOption () {
      return {
        speed: 2000,
        autoplay: {
          delay: 15000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        autoHeight: true,
        slidesPerView: 3, // 设置slider容器能够同时显示的slides数量(carousel模式)。
        centeredSlides: true, // 设定为true时，活动块会居中
        initialSlide: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper,
        onSlideChangeStart: () => {
          // 通过$refs获取对应的swiper对象
          let swiper = this.$refs.mySwiper.swiper
          this.activeIndex = swiper.activeIndex
        },
        on: {
          slideChange: () => {
            let swiper = this.$refs.mySwiper.swiper
            this.activeIndex = swiper.activeIndex
            if (this.activeIndex === 0) {
              this.initLocalList()
            } else {
              this.curId = this.localList[this.activeIndex]['id']
            }
          }
        }
      }
    },
    sentimentOpt () {
      return {
        color: ['#0084FF', '#DE3766', '#DE9937', '#008aed', '#14da7d'],
        textStyle: {
          color: '#fff'
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
                show: false,
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: this.proportion * 15,
          right: this.proportion * 15,
          top: this.proportion * 15,
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
            data: this.areaData.geo.slice(0, 7).map(v => v.name)
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
            data: this.areaData.geo.slice(0, 7).map(v => v.value)
          }
        ]
      }
    },
    keyOpt () {
      return {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 20,
            sizeRange: [10, 30],
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
    curId: {
      handler: function (newValue) {
        this.getHotTopicDetail()
      }
    }
  },
  created () {
    // 本地模拟分页效果
    this.initLocalList()
  },
  mounted () {
    this.proportion = this.getProportion('xy-hot')
    this.setFontsize('qx-opinionAnalysis')
  },

  methods: {
    // 本地模拟分页效果
    initLocalList () {
      getHotsTopicList(this.count).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.localList = res.data.result.data
            this.curId = this.localList[this.activeIndex]['id']
          }
        }
      })
    },

    // 获取详细数据
    getHotTopicDetail () {
      getHotsTopicEmotion(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.sentimentData.series = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
          let total = res.data.result.reduce((past, cur) => past + cur.count, 0)
          this.tipList = res.data.result.map(v => {
            return {
              class: v.name_en,
              value: (parseInt(v.count / total * 100) || 0) + '%',
              name: v.name_zh
            }
          })
        }
      })
      getHotsTopicPubArea(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          let total = res.data.result.reduce((past, cur) => past + cur.count, 0)
          this.areaData.geo = res.data.result.map(v => {
            return {
              value: parseInt(v.count / total * 100),
              name: v.name_zh.replace(/省|市|自治区|维吾尔|壮族|回族/g, '')
            }
          })
        }
      })
      getHotsTopicHotWord(this.curId).then(res => {
        if (res && res.data && res.data.result && res.data.result[0]) {
          this.keyWordsList = res.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'src/styles/index.scss';
.qx-opinionAnalysis {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .opinion-analysis-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    .data-box {
      padding: 0 pxrem(60px);
      margin-bottom: pxrem(40px);
    }
    .data-title {
      width: 100%;
      height: pxrem(80px);
      line-height: pxrem(80px);
      font-size: pxrem(38px);
      color: #FEFEFE;
      padding-bottom: pxrem(20px);
      border-bottom: pxrem(3px) dashed #008AFF;
      &.activeTitle {
        font-size: pxrem(48px);
        color: #00FFE4;
        position: relative;
        border-bottom: pxrem(3px) solid #00FCFF;
      }
    }
    .data-echarts {
      width: 100%;
      height: 80%;
      .sentiment-analysis {
        width: 24%;
        height: 100%;
        .sentiment-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/sentiment.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
          .sentiment-tip {
            width: 30%;
            .tip-list {
              font-size: pxrem(34px);
              color: #FFFFFF;
              line-height: pxrem(100px);
              .positive {
                width: pxrem(30px);
                height: pxrem(24px);
                background-color: #0066FF;
              }
              .tip-icon {
                width: pxrem(30px);
                height: pxrem(24px);
                margin-right: pxrem(20px);
                &.positive {
                  background-color: #0066FF;
                }
                &.negative {
                  background-color: #DE3766;
                }
                &.neutral {
                  background-color: #DE9937;
                }
              }
              .tip-class {
                margin-right: pxrem(38px)
              }
            }
          }
          .sentiment-chart {
            width: 60%;
            height: 100%;
          }
        }
      }
      .key-word {
        width: 26%;
        height: 100%;
        .key-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/keyword.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
        }
      }
      .geographical-analysis {
        width: 45%;
        height: 100%;
        .geographical-title {
          height: pxrem(88px);
          width: pxrem(330px);
          background: url('./assets/area.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chart-box {
          height: 80%;
        }
      }
      .line {
        height: 60%;
        width: pxrem(5px);
        background: url('./assets/border.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>

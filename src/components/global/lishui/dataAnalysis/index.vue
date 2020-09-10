<template>
  <div class="main-wrap" id="ls-dataAnalysis">
    <div class="data-analysis-wrap sys-flex flex-justify-between">
      <div class="data-analysis-list sys-flex sys-flex-wrap">
        <div
          class="data-list animated sys-flex sys-vertical flex-justify-between"
          v-for="(v , k) in newsList"
          :key="k"
          :class="{'active' : curIndex == k,'fadeInLeft' : v.title}"
          v-bind:style="{'animation-delay' : k/2+'s'}"
        >
          <div class="data-title overhidden">{{v.title}}</div>
          <div class="data-brief">{{v.content}}</div>
        </div>
      </div>
      <div class="data-echarts sys-flex sys-vertical flex-justify-between">
        <div class="echarts-top sys-flex flex-justify-between">
          <div class="data-channel">
            <p class="echarts-title channel-title">分渠道数据分析</p>
            <div class="channel-box">
              <chart :options="lineOptions" :autoResize="true"></chart>
            </div>
          </div>
          <div class="data-media">
            <p class="echarts-title media-title">媒体占比</p>
            <div class="media-box">
              <chart :options="pieOptions" :autoResize="true"></chart>
            </div>
          </div>
        </div>
        <div class="echarts-bottom">
          <div class="data-source">
            <p class="echarts-title source-title">TOP 10 活跃新闻媒体来源</p>
            <div class="source-box">
              <chart :options="top10options" :autoResize="true"></chart>
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
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
import { getHotsTopicList, getHotsTopicTrend, getHotsTopicActiveMedia, getHotsTopicMedia } from '@/servers/interface'
export default {
  name: 'dataAnalysis',
  components: {
    chart: echarts
  },
  data () {
    return {
      localList: [],
      newsList: [],
      page: 1,
      count: 20,
      currentNewsData: {
        title: '',
        result: {
          media_distribution: {},
          sex_scale: {},
          emotion: [],
          age: [],
          area: {}
        }
      },
      top10options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '2%',
          right: '0%',
          bottom: '4%',
          top: '7%',
          containLabel: true
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 20,
              color: '#fff',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
              interval: 30
            },

            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: [
          {
            name: '文稿',
            type: 'bar',
            barCategoryGap: '60%',
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  let colorList = ['#03c1b5', '#03c1b5', '#03c1b5', '#0060fd', '#0060fd', '#0060fd', '#0060fd', '#0060fd', '#0060fd', '#0060fd']
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 14,
                    color: 'white'
                  }
                }
              }
            },
            data: []
          }
        ]
      },
      pieOptions: {
        color: ['#EF5766', '#0466FF', '#DE9937'],
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          icon: 'rect',
          textStyle: {
            color: '#fff',
            fontSize: 8
          }
        },
        series: [
          {
            name: '发布渠道占比',
            type: 'pie',
            center: ['45%', '50%'],
            radius: ['50%', '70%'],
            minAngle: 5,
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                length: 1,
                // formatter: '{b}:{d}%',
                formatter: function (data) {
                  return data.percent.toFixed(1) + '%'
                },
                position: 'outside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 10
              }
            },
            data: []
          }
        ]
      },
      lineOptions: {
        color: ['#C100FF', '#00FFC0', '#ED9547'],
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
          orient: 'horizontal',
          top: 0,
          right: 0,
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          data: []
        },

        grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: [1, 2, 3],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
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
              color: '#fff',
              fontSize: 10,
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#4A6AA8'
              }
            }
          }
        ],
        series: []
      },
      curIndex: 0,
      curId: null,
      frequency: 5000,
      virtual: false
    }
  },
  watch: {
    curId: {
      handler: function (newValue) {
        if (this.virtual) {
          this.virtualDetail()
        } else {
          this.getHotTopicDetail()
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.setFontsize('ls-dataAnalysis')
    this.initLocalList()
    setInterval(() => {
      this.curIndex += 1
      // 如果当前新闻索引超出当前列表，分页
      if (this.curIndex > 3 || this.curIndex >= this.newsList.length) {
        this.curIndex = 0
        this.page === this.maxPage ? this.page = 1 : this.page++
        // 分页超过3页重新发请求获取新数据
        if (this.page === 1) {
          this.initLocalList()
        } else {
          // 未超过3页，人为更新列表
          this.newsList = []
          setTimeout(() => {
            this.newsList = this.localList.slice((this.page - 1) * 4, this.page * 4)
            this.curId = this.newsList[this.curIndex]['id']
          }, 100)
        }
      } else {
        this.curId = this.newsList[this.curIndex]['id']
      }
    }, this.frequency)
  },

  methods: {
    // 本地模拟分页效果
    initLocalList () {
      getHotsTopicList(this.count, 1, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.localList = res.data.result.data
            this.virtual = res.data.result.virtual
            this.newsList = this.localList.slice((this.page - 1) * 4, this.page * 4)
            this.curId = this.newsList[this.curIndex]['id']
          }
        }
      })
    },
    // 初始化新闻列表
    initNewsList () {
      getHotsTopicList(this.count, this.page).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.newsList = []
            setTimeout(() => {
              this.newsList = res.data.result.data
              this.curId = this.newsList[this.curIndex]['id']
            }, 100)
          } else {
            this.page = 1
          }
        }
      })
    },

    // 获取详细数据
    getHotTopicDetail () {
      getHotsTopicTrend(this.curId).then(response => {
        if (!response.data.error_code) {
          this.lineOptions.legend.data = []
          this.lineOptions.xAxis[0].data = []
          this.lineOptions.series = []
          this.lineOptions.xAxis[0].data = response.data.result[0].count.map(v => v.field)
          this.lineOptions.legend.data = response.data.result.map(v => v.name_zh)
          this.lineOptions.series = response.data.result.map(v => {
            return {
              name: v.name_zh,
              type: 'line',
              data: v.count.map(i => i.value),
              smooth: true,
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
      getHotsTopicMedia(this.curId).then(response => {
        if (!response.data.error_code) {
          this.pieOptions.series[0].data = []
          this.pieOptions.series[0].data = response.data.result.map(v => {
            return {
              value: v.count,
              name: v.name_zh,
              label: {
                fontSize: 12
              }
            }
          })
        }
      })
      getHotsTopicActiveMedia(this.curId).then(response => {
        if (!response.data.error_code) {
          this.top10options.xAxis[0].data = []
          this.top10options.series[0].data = []
          this.top10options.xAxis[0].data = response.data.result.map(v => v.name_zh)
          this.top10options.series[0].data = response.data.result.map(v => v.count)
        }
      })
    },
    // 获取详细数据
    virtualDetail () {
      let data = this.localList.find(v => v.id === this.curId)
      this.lineOptions.legend.data = []
      this.lineOptions.xAxis[0].data = []
      this.lineOptions.series = []
      this.lineOptions.xAxis[0].data = data.hot.time
      this.lineOptions.legend.data = ['网站', '微信', '微博']
      this.lineOptions.series = [
        {
          name: '网站',
          type: 'line',
          data: data.hot.web,
          smooth: true,
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
        },
        {
          name: '微信',
          type: 'line',
          data: data.hot.wx,
          smooth: true,
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
        },
        {
          name: '微博',
          type: 'line',
          data: data.hot.weibo,
          smooth: true,
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
      ]

      this.pieOptions.series[0].data = []
      this.pieOptions.series[0].data = [
        {
          value: data.media[0],
          name: '网站',
          label: {
            fontSize: 12
          }
        },
        {
          value: data.media[1],
          name: '微信',
          label: {
            fontSize: 12
          }
        },
        {
          value: data.media[2],
          name: '微博',
          label: {
            fontSize: 12
          }
        }
      ]

      this.top10options.xAxis[0].data = []
      this.top10options.series[0].data = []
      this.top10options.xAxis[0].data = data.top.name
      this.top10options.series[0].data = data.top.count
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'src/styles/index.scss';
.main-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  background-color: #121D58;
  .data-analysis-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(215px, 12.5) pxem(100px, 12.5) pxem(146px, 12.5) ;
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    background-color: #0F1C46;
    .data-analysis-list {
      width: 48%;
      height: 100%;
      padding: pxrem(67px, 12.5);
      background: url('./assets/news-border.png') no-repeat center center;
      background-size: 100% 100%;
    }
    .data-list {
      height: 23%;
      width: 100%;
      margin-bottom: 1%;
      background: rgb(16, 43, 95);
      padding: pxrem(55px, 12.5);

      &.active {
        background: rgb(10, 67, 183);
        .data-title {
          color: #F7F02B;
        }
      }
      .data-title {
        width: 100%;
        height: 1em;
        line-height: 1em;
        font-size: pxrem(54px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        text-align: left;
      }
      .data-brief {
        font-size: pxrem(40px);
        color: #fff;
        text-align: left;
        height: 2.5em;
        line-height: 1.25em;
        overflow: hidden;
      }
    }
    .data-echarts {
      width: 48%;
      height: 100%;
      .echarts-title {
        font-size: pxrem(48px);
        color: #fff;
        text-align: left;
      }
      .echarts-top {
        width: 100%;
        height: 48%;
        .data-channel {
          width: 55%;
          height: 100%;
          background: url('./assets/channel-border.png') no-repeat center center;
          background-size: 100% 100%;
          position: relative;
          padding: pxrem(37px);
          margin-right: pxrem(67px);
          .channel-box {
            width: 100%;
            height: pxem(650px, 12.5);
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
        .data-media {
          flex: 1;
          height: 100%;
          background: url('./assets/media-border.png') no-repeat center center;
          background-size: 100% 100%;
          position: relative;
          padding: pxrem(37px);
          .media-box {
            width: 100%;
            height: pxem(650px, 12.5);
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .echarts-bottom {
        width: 100%;
        height: 50%;
        .data-source {
          width: 100%;
          height: 100%;
          background: url('./assets/source-border.png') no-repeat center center;
          background-size: 100% 100%;
          padding: pxrem(37px);
          .source-box {
            width: 100%;
            height: 100%;
            .echarts {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>

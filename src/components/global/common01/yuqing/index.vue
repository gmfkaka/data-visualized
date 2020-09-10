<template>
 <div class="yuhuatai">
   <div class="yuqing-title" :style="setFontSize(63)">舆情分析</div>
   <div class="yuqing flex">
    <div class="left">
      <div class="title">{{title}}</div>
      <ul class="leftList">
        <li v-for="(item, index) in leftList.slice(0,8)" :key="index">
          <span class="dian"></span>
          <p class="lineHeight">{{item.news_title}}</p>  
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="rightTop flex">
        <div class="emotional">
          <div class="titleIcon">
            <img src="./asset/qinggan.png" alt="">
          </div>
          <div class="emotional-wrap" ref="emotionalWrap"></div>
        </div>
        <div class="line"></div>
        <div class="keywords">
          <div class="titleIcon">
            <img src="./asset/keywords.png" alt="">
          </div>
          <div class="hot-wrap">
            <div class="hotword-wrap flex" id="word-cloud">
                <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="content">
          <div class="titleIcon">
            <img src="./asset/neirong.png" alt="">
          </div>
          <div class="content-analysis" ref="analysis"></div>
        </div>

      </div>
      <div class="rightBottom flex">
        <div class="media">
          <div class="titleIcon">
            <img src="./asset/meiti.png" alt="">
          </div>
          <div class="media-chart" ref="mediaChart"></div>
        </div>
        <div class="line"></div>
        <div class="hot">
           <div class="titleIcon">
            <img src="./asset/hot.png" alt="">
          </div>
          <div class="hot-chart" ref="hotChart"></div>
        </div>
      </div>
    </div>
    </div>
 </div>
</template>
<script>
import { getYuqing, getEmotional, getKeywords, getContent, getMedia, getTrend, getYuqingList } from '@/servers/interface'
import echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'yuqing',
  data () {
    return {
      proportion: 1,
      leftList: [],
      hotWordsList: [],
      yuQingList: [],
      index: 0,
      title: '',
      id: ''
    }
  },
  created () {
    this.getYuqingData()
    setInterval(() => {
      this.index += 1
      if (this.index > this.yuQingList.length - 1) {
        this.index = 0
      }
      this.id = this.yuQingList[this.index].tracker_id
      this.title = this.yuQingList[this.index].name
      this.hotWordsList = []
      this.getLeftList()
      this.getEmotional()
      this.getKeywordsData()
      this.getContentList()
      this.getMediaList()
      this.getHotList()
    }, 10000)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getYuqingData () {
      getYuqingList().then(res => {
        if (res.data.error_code === 0) {
          this.yuQingList = res.data.result.data
          this.title = this.yuQingList[0].name
          this.id = this.yuQingList[0].tracker_id
          this.getLeftList()
          this.getEmotional()
          this.getKeywordsData()
          this.getContentList()
          this.getMediaList()
          this.getHotList()
        }
      })
    },
    getLeftList () {
      getYuqing(this.id).then(res => {
        if (res.data.error_code === 0) {
          this.leftList = res.data.result
        }
      })
    },
    getEmotional () {
      let legendData = []
      let seriesData = []
      getEmotional(this.id).then(res => {
        if (res.data.error_code === 0) {
          res.data.result.forEach(item => {
            legendData.push(item.name_zh)
            seriesData.push({
              value: item.count,
              name: item.name_zh,
              itemStyle: { color: '' }
            })
          })
        }
        seriesData[0].itemStyle.color = '#003CFF'
        seriesData[1].itemStyle.color = '#DE3766'
        seriesData[2].itemStyle.color = '#DE9937'
        this.$nextTick(() => {
          this.initEmotional(legendData, seriesData)
        })
      })
    },
    initEmotional (legendData, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.emotionalWrap)
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '60%',
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          data: legendData,
          formatter: function (name) {
            let total = 0
            let target
            for (let i = 0, l = seriesData.length; i < l; i++) {
              total += seriesData[i].value
              if (seriesData[i].name === name) {
                target = seriesData[i].value
              }
            }
            return name + ' ' + ((target / total) * 100).toFixed(0) + '%'
          },
          textStyle: { color: '#fff', fontSize: '14', padding: [ 0, 0, 0, 5 ] }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: seriesData
          }
        ]
      }
      _this.myChart.setOption(options)
    },
    getKeywordsData () {
      getKeywords(this.id).then(res => {
        if (res.data.error_code === 0) {
          res.data.result.slice(0, 50).forEach(item => {
            this.hotWordsList.push({
              name: item.name_zh,
              value: item.count
            })
          })
          this.$nextTick(() => {
            this.initWordCloud()
          })
        }
      })
    },
    initWordCloud () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.wordcloud)
      let options = {
        series: [
          {
            type: 'wordCloud',
            sizeRange: [14, 24],
            rotationRange: [0, 90],
            rotationStep: 90,
            shape: 'square',
            width: '100%',
            height: '100%',
            top: 0,
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
            data: this.hotWordsList
          }
        ]
      }
      _this.myChart.setOption(options, true)
    },
    getContentList () {
      let indicator = []
      let seriesData = []
      getContent(this.id).then(res => {
        if (res.data.error_code === 0) {
          res.data.result.forEach(item => {
            indicator.push({
              text: item.name_zh,
              // max: 100,
              color: 'rgba(255,255,255,1)'
            })
            seriesData.push(item.count)
          })
          this.$nextTick(() => {
            this.initContent(indicator, seriesData)
          })
        }
      })
    },
    initContent (indicator, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.analysis)
      _this.option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'center',
          textStyle: { // 图例的公用文本样式。
            fontSize: 14,
            color: '#fff'
          }
        },
        radar: [
          {
            indicator: indicator,
            center: ['50%', '50%'],
            name: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            },
            radius: 48,
            axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
              lineStyle: {
                color: '#00E4FF',
                // 坐标轴线线的颜色。
                width: 1,
                // 坐标轴线线宽。
                type: 'solid'
                // 坐标轴线线的类型。
              }
            },
            splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
              lineStyle: {
                color: '#00E4FF',
                // 分隔线颜色
                width: 1
                // 分隔线线宽
              }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: { // 分隔区域的样式设置。
                color: ['rgba(0,228,255,0.3)', 'rgba(0,228,255,0.1)']
                // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            lineStyle: {
              normal: {
                color: 'rgba(248,134,0,0.66)'
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(248,134,0,1)'
              }
            },
            data: [
              {
                value: seriesData
              }
            ]
          }
        ]
      }
      _this.myChart.setOption(_this.option)
    },
    getMediaList () {
      let colorList = ['#003CFF', '#44CF98', '#DE9937', '#941BF2', '#DE3766', '#DE6E00']
      let legendData = []
      let seriesData = []
      getMedia(this.id).then(res => {
        if (res.data.error_code === 0) {
          res.data.result.forEach((item, index) => {
            seriesData.push({
              name: item.name_zh,
              value: item.count,
              itemStyle: {
                color: colorList[index]
              }
            })
            legendData.push(item.name_zh)
          })
        }
        this.$nextTick(() => {
          this.initMediaChart(legendData, seriesData)
        })
      })
    },
    initMediaChart (legendData, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.mediaChart)
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '49%',
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          data: legendData,
          formatter: function (name) {
            let total = 0
            let target
            for (let i = 0, l = seriesData.length; i < l; i++) {
              total += seriesData[i].value
              if (seriesData[i].name === name) {
                target = seriesData[i].value
              }
            }
            return name + ' ' + ((target / total) * 100).toFixed(0) + '%'
          },
          textStyle: { color: '#fff', fontSize: '14', padding: [ 0, 0, 0, 2 ] }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '25%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: seriesData
          }
        ]
      }
      _this.myChart.setOption(options)
    },
    getHotList () {
      let legendData = []
      let xAxisData = []
      let colorList = ['rgba(0,61,255,1)', 'rgba(70,207,152,1)', 'rgba(222,153,55,1)', 'rgba(147,29,242,1)', 'rgba(222,55,102,1)', 'rgba(222,110,0,1)', 'rgba(179,227,56,1)', 'rgba(219,134,158,1)']
      let seriesData = []
      getTrend(this.id).then(res => {
        if (res.data.error_code === 0) {
          seriesData = res.data.result.map((item, index) => {
            legendData.push(item.name_zh)
            let arr = []
            item.count.forEach(itemData => {
              arr.push(itemData.value)
            })
            return {
              name: item.name_zh,
              type: 'line',
              stack: '总量',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                  // 三种由深及浅的颜色
                  [ {
                    offset: 0,
                    color: colorList[index]
                  }, {
                    offset: 0.5,
                    color: colorList[index].replace(',1)', ',0.5)')
                  }, {
                    offset: 1,
                    color: colorList[index].replace(',1)', ',0)')
                  } ])
              },
              itemStyle: {
                normal: {
                  color: colorList[index],
                  lineStyle: {
                    color: colorList[index]
                  }
                }
              },
              data: arr
            }
          })
          res.data.result[0].count.forEach(itemCount => {
            xAxisData.push(itemCount.field.substring(itemCount.field.length - 5))
          })
        }
        this.$nextTick(() => {
          this.initHotChart(legendData, xAxisData, seriesData)
        })
      })
    },
    initHotChart (legendData, xAxisData, seriesData) {
      const _this = this
      _this.myChart = echarts.init(this.$refs.hotChart)
      _this.option = {
        title: {
          text: ''
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
          data: legendData,
          top: 10,
          textStyle: {
            fontSize: '14',
            color: '#fff'
          },
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFFFFF'
              },
              fontSize: 14// 字体大小
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255, 0.5)',
                width: 1 // 这里是为了突出显示加上的
              }
            }
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: 'rgba(255,255,255, 1)', // 网格线的颜色
            //     width: 1,
            //     type: 'solid'
            //   }
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              fontSize: '14'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFFFFF'
              },
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255, 1)',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255, 0.1)', // 网格线的颜色
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: seriesData
      }
      _this.myChart.setOption(_this.option)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.yuhuatai{
  background: url(./asset/kuang.png) center center no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
.yuqing-title{
  text-align: left;
  color: #ffffff;
  position: unset;
  font-size: pxrem(58px);
  margin-top: pxrem(40px);
  margin-left: pxrem(80px); 
}
.yuqing {
  padding: pxrem(27px) pxrem(20px) pxrem(49px) pxrem(37px);
  // margin-top: pxrem(140px);
  height: 100%;
  .left{
    margin-top: pxrem(80px);
    background: url(./asset/yuqing.png) center center no-repeat;
    background-size: pxrem(800px) 100%;
    width:pxrem(800px);
    // width: 20%;
    height:90%;
    // padding: 0 pxrem(98px);
    .title{
      background: url(./asset/title.png) center center no-repeat;
      background-size: 100% 100%;
      width: 80%;
      height: pxrem(90px);
      color:rgba(0,255,228,1);
      font-size:pxrem(64px);
      font-family:Source Han Sans CN;
      font-weight:500;
      line-height: pxrem(90px);
      margin: pxrem(47px) auto;
    }
    .leftList{
      color: #fff;
      font-size: pxrem(50px);
      li{
        margin-left: pxrem(28px);
        margin-right: pxrem(27px);
        margin-bottom: pxrem(45px);
        display: flex;
        p{
          // width: pxrem(333px);
          line-height: pxrem(80px);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }
        .dian{
          width: pxrem(10px);
          height: pxrem(10px);
          background: url(./asset/newsIcon.png) center center no-repeat;
          background-size: contain;
          display: block;
          margin-right: pxrem(40px);
          margin-top: pxrem(25px);
        }
      }
    }
  }
  .right{
    margin-left: pxrem(48px);
    width: 80%;
    margin-top: pxrem(80px);
    // height: 100%;
    .titleIcon{
      width: pxrem(350px);
      height: pxrem(88px);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .rightTop{
      height: 50%;
      .line{
        width: pxrem(2px);
        height: 80%;
        background: url(./asset/line1.png) center center no-repeat;
        background-size: cover;
        margin-top: pxrem(64px);
        margin-right: pxrem(15px);
      }
      .emotional{
        width: 30%;
        flex: 3;
        .emotional-wrap{
          height: 90%;
          width: 100%;
        }
      }
      .keywords{
        flex: 3;
        width: 30%;
        .hot-wrap{
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          position: relative;
          .hotword-wrap {
            width: 100%;
            height: 50%;
            background-size: 100% 100%;
            position: relative;
            margin-top: 30%;
            padding: pxrem(50px);
            .word-cloud {
              height: 100%;
              flex: 1;
            }
          }
        }
      }
      .content{
        flex: 4;
        width: 40%;
        .content-analysis{
          height: 90%;
          width: 100%;
        }
      }
    }
    .rightBottom{
      height: 50%;
      .line{
        width: pxrem(2px);
        height: 80%;
        background: url(./asset/line2.png) center center no-repeat;
        background-size: cover;
        margin-top: pxrem(64px);
        margin-right: pxrem(15px);
      }
      .media{
        flex: 3;
        .media-chart{
          height: 90%;
          width: 100%;
        }
      }
      .hot{
        flex: 7;
        .hot-chart{
          height: 90%;
          width: 100%;
        }
      }
    }
  }
}
</style>

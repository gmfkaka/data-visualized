<template>
  <div class="common01-myyancheng">
    <div class="myyancheng-wrap">
      <div class="content-wrap sys-flex">
          <div class="left sys-flex sys-vertical flex-justify-between">
            <div class="left-item" v-for="(item,i) in leftList" :key="i">
              <div class="title-box sys-flex sys-flex-center">
                <p>{{item.name}}</p>
                <img class="title-icon" src="./assets/left_icon.png"/>
              </div>
              <p class="name-text">{{item.num}}</p>
              <img class="split" src="./assets/split.png" alt="">
            </div>
          </div>
          <div class="center">
              <div class="common-title-box">
                <img src="./assets/title.png" alt="">
                <p>部门服务使用总量排行</p>
              </div>
              <div class="rank-list">
                <div class="rank-item sys-flex sys-flex-center animated" v-for="(item,i) in rankList" :key="i" :class="{'flipInX' : item.title}" :style="{'animation-delay' : i/2+'s'}">
                  <div class="rank-num" :class="{'rank-one':i === 0,'rank-two':i === 1,'rank-three':i === 2}">{{i+1}}</div>
                  <div class="rank-title">{{item.title}}</div>
                  <div class="rank-count">{{item.count}}</div>
                </div>
              </div>
              <div class="common-title-box" style="margin-bottom:0;">
                <img src="./assets/title.png" alt="">
                <p>前7天新增用户数</p>
              </div>
              <div class="new-user-chart">
                  <div class="chart-box" style="height:80%;width:120%;">
                    <chart :options="newuserOpt" :autoResize="true"></chart>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="right-top sys-flex sys-flex-wrap">
                  <div class="right-top-box" style="width:40%;">
                    <div class="common-title-box">
                      <img src="./assets/title.png" alt="">
                      <p>用户渠道分布</p>
                    </div>
                    <div class="chart-box" style="height:70%;">
                      <chart :options="userfromOpt" :autoResize="true"></chart>
                    </div>
                    <img class="user-icon" src="./assets/user.png" alt="">
                  </div>
                  <div class="right-top-box" style="width:60%">
                    <div class="common-title-box">
                      <img src="./assets/title.png" alt="">
                      <p>高频服务分布TOP4</p>
                    </div>
                    <div class="chart-box sys-flex sys-flex-wrap" style="height:70%;">
                      <div class="percent-box">
                        <chart class="percent-chart" :options="percentOpt1" :autoResize="true"></chart>
                        <div class="percent-title">公积金服务</div>
                      </div>
                      <div class="percent-box">
                        <chart class="percent-chart" :options="percentOpt2" :autoResize="true"></chart>
                        <div class="percent-title">预约挂号服务</div>
                      </div>
                      <div class="percent-box" style="margin-top:0.2rem;">
                        <chart class="percent-chart" :options="percentOpt3" :autoResize="true"></chart>
                        <div class="percent-title">社保服务</div>
                      </div>
                      <div class="percent-box" style="margin-top:0.2rem;">
                        <chart class="percent-chart" :options="percentOpt4" :autoResize="true"></chart>
                        <div class="percent-title">生活缴费服务</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="right-bottom" style="height:40%;">
                  <div class="common-title-box" style="margin-bottom:0;">
                      <img src="./assets/title.png" alt="">
                      <p>各委办局接入服务排行</p>
                  </div>
                  <div class="chart-box">
                    <chart :options="serviceOpt" :autoResize="true"></chart>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataConfig } from '@/utils/model'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
export default {
  name: 'myyancheng',
  components: {
    chart: echarts
  },
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      proportion: 1,
      leftList: [
        {name: '总下载量', num: 7056},
        {name: '总注册量', num: 2749},
        {name: '总实名用户', num: 1652},
        {name: '日活跃量', num: 1588}
      ],
      rankList: [
        {title: '盐城市公积金中心', count: 26550},
        {title: '盐城市城市建设投资集团有限公司', count: 21678},
        {title: '盐城市人力资源和社会保障局', count: 20032},
        {title: '盐城市城市医疗保障局', count: 19860},
        {title: '盐城市卫生健康委员会', count: 16504},
        {title: '盐城市交通投资控股集团有限公司', count: 13900}
      ],
      userFromData: [
        {value: 5, name: '小米'},
        {value: 15, name: 'VIVO'},
        {value: 35, name: '华为'},
        {value: 25, name: '苹果'},
        {value: 15, name: 'OPPO'},
        {value: 5, name: '其他'}
      ],
      newuserData: {
        days: ['06-02', '06-03', '06-04', '06-05', '06-06', '06-07', '06-08'],
        data: [180, 350, 300, 320, 280, 320, 390]
      },
      serviceData: {
        nameList: ['盐城市公积金中心', '人力资源社会保障局', '城市建设投资集团', '交通投资建设控股集团', '盐城市医疗保障局', '盐城市公安局', '盐城市住建局', '盐城市交通运输局'],
        data: [580, 570, 550, 520, 480, 430, 370, 280]
      },
      userfromOpt: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: ['#44CF98', '#DB4E4E', '#E88559', '#0066FF', '#941BF2', '#B3B834'],
        grid: {
          left: this.proportion * 30,
          right: this.proportion * 60,
          top: this.proportion * 80,
          bottom: this.proportion * 15,
          containLabel: true
        },
        legend: {
          orient: 'horizontal',
          left: 50,
          bottom: 0,
          data: ['小米', 'VIVO', '', '华为', '苹果', '', 'OPPO', '其他'],
          show: true,
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          // 使用回调函数
          formatter: function (name) {
            var data = [
              {value: 5, name: '小米'},
              {value: 15, name: 'VIVO'},
              {value: 35, name: '华为'},
              {value: 25, name: '苹果'},
              {value: 15, name: 'OPPO'},
              {value: 5, name: '其他'}
            ]
            var total = 0
            var tarValue
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value
              if (data[i].name === name) {
                tarValue = data[i].value
              }
            }
            var p = ((tarValue / total) * 100)
            return name + ' ' + ' ' + p + '%'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '35%'], // 设置饼图位置
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 5, name: '小米'},
              {value: 15, name: 'VIVO'},
              {value: 35, name: '华为'},
              {value: 25, name: '苹果'},
              {value: 15, name: 'OPPO'},
              {value: 5, name: '其他'}
            ]
          }
        ]
      }
    }
  },
  computed: {
    newuserOpt () {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            margin: 15,
            textStyle: {
              color: '#fff',
              fontSize: 15 // 更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              // show:false,
              color: ['#71a4f2'],
              width: '1',
              type: 'solid'
            }
          },
          data: this.newuserData.days
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            margin: 15,
            textStyle: {
              color: '#fff',
              fontSize: 15 // 更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              // show:false,
              color: ['#71a4f2'],
              width: '1',
              type: 'solid'
            }
          },
          // max: 100,
          splitLine: {
            // interval:15,
            lineStyle: {
              color: ['rgba(113,164,242,0.1)'],
              width: '1',
              type: 'dashed'
            }
          }
        },
        series: [{
          data: this.newuserData.data,
          type: 'line',
          areaStyle: {},
          symbolSize: 10, // 折线点的大小
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(2,105,152)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgb(4,52,136)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          lineStyle: {
            color: '#00F8BD',
            width: 3 // 设置线条粗细
          }
        }]
      }
    },
    serviceOpt () {
      return {
        color: ['#4da2fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // grid: {
        //   left: this.proportion * 15,
        //   right: this.proportion * 15,
        //   top: this.proportion * 15,
        //   bottom: this.proportion * 15,
        //   containLabel: true
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              margin: 10,
              textStyle: {
                color: '#fff',
                fontSize: 15 // 更改坐标轴文字大小
              },
              formatter: function (params) {
                var newParamsName = ''
                var paramsNameNumber = params.length
                var provideNumber = 4 // 一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ''
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p === rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: this.serviceData.nameList
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 1,
              margin: 10,
              textStyle: {
                fontSize: 15,
                color: '#fff'
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
            // max: 100,
            splitLine: {
              // interval:15,
              lineStyle: {
                color: ['rgba(113,164,242,0.1)'],
                width: '1',
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '地域分布',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'top',
                  //   formatter: '{c}%',
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
            data: this.serviceData.data
          }
        ]
      }
    },
    percentOpt1 () {
      return {
        title: {
          show: true,
          text: '43%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 25,
            color: 'rgba(0,255,246,1)',
            fontWeight: 'normal'
          }
        },
        color: ['rgb(0,148,240)', 'rgb(15,74,148)'],
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
        {
          name: '',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 0.43, name: ''},
            {value: 1 - 0.43, name: ''}
          ]
        }
      }
    },
    percentOpt2 () {
      return {
        title: {
          show: true,
          text: '28%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 25,
            color: 'rgba(0,255,246,1)',
            fontWeight: 'normal'
          }
        },
        color: ['rgb(0,148,240)', 'rgb(15,74,148)'],
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
        {
          name: '',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 0.28, name: ''},
            {value: 1 - 0.28, name: ''}
          ]
        }
      }
    },
    percentOpt3 () {
      return {
        title: {
          show: true,
          text: '17%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 25,
            color: 'rgba(0,255,246,1)',
            fontWeight: 'normal'
          }
        },
        color: ['rgb(0,148,240)', 'rgb(15,74,148)'],
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
        {
          name: '',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 0.17, name: ''},
            {value: 1 - 0.17, name: ''}
          ]
        }
      }
    },
    percentOpt4 () {
      return {
        title: {
          show: true,
          text: '12%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 25,
            color: 'rgba(0,255,246,1)',
            fontWeight: 'normal'
          }
        },
        color: ['rgb(0,148,240)', 'rgb(15,74,148)'],
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
        {
          name: '',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 0.12, name: ''},
            {value: 1 - 0.12, name: ''}
          ]
        }
      }
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-myyancheng {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .myyancheng-wrap{
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .content-wrap {
        width: 100%;
        height: 100%;
        padding: pxrem(125px) pxrem(45px) pxrem(65px);
        .left{
          width: pxrem(250px);
          height: 100%;
          background: url("./assets/left_bg.png") no-repeat center;
          background-size: 100% 100%;
          position: relative;
          padding: pxrem(45px) pxrem(30px);
          margin-right: 50px;
          .left-item{
            text-align: left;
            .title-box{
              p{
                font-size:pxrem(22px);
                color: #fff;
              }
              .title-icon{
                width: pxrem(33px);
                height: pxrem(15px);
                margin-left: pxrem(10px);
              }
            }
            .name-text{
              font-size:pxrem(40px);
              color: #4AFBE8;
              padding: pxrem(18px) 0 pxrem(15px);
            }
            .split{
              height: pxrem(8px);
            }
          }
        }
        .center{
          width: 30%;
          height: 100%;
          margin-right: pxrem(100px);
          .rank-list{
            margin-bottom: pxrem(72px);
            .rank-item{
              margin-bottom: pxrem(30px);
              .rank-num{
                width: pxrem(30px);
                height: pxrem(30px);
                line-height: pxrem(30px);
                font-size:pxrem(20px);
                color: #fff;
                background:rgba(0,108,255,0.45);
                border-radius:5px;
                &.rank-one{
                  background:rgba(251,49,97,0.45);
                }
                &.rank-two{
                  background:rgba(251,173,49,0.45);
                }
                &.rank-three{
                  background:rgba(192,49,251,0.45);
                }
              }
              .rank-title{
                flex: 1;
                font-size:pxrem(22px);
                color: #fff;
                text-align: left;
                padding-left: 17px;
              }
              .rank-count{
                font-size:pxrem(22px);
                color: #0BA0FF;
              }
            }
          }
          .new-user-chart{
              height: 50%;
          }
        }
        .right{
          width: 50%;
          height: 100%;
          .right-top{
              height: 63%;
              .right-top-box{
                width: 50%;
                position: relative;
                .percent-box{
                  width: 50%;
                  height: 50%;
                  .percent-title{
                    color: #fff;
                    font-size:pxrem(22px);
                  }
                }
                .user-icon{
                  width: pxrem(47px);
                  height: pxrem(42px);
                  position: absolute;
                  top: 2rem;
                  left: 1.42rem;
                }
              }
          }
          .right-bottom{
              height: 37%;
          }
        }
        .chart-box{
          width: 100%;
          height: 100%;
          .percent-chart{
              width: 100% !important;
              height: 80% !important;
          }
          .echarts {
              width: 100%;
              height: 100%;
          }
       }
    }
  }
  .common-title-box{
    display: flex;
    align-items: center;
    margin-bottom: pxrem(60px);
    img{
      width: pxrem(21px);
      height: pxrem(20px);
      margin-right: pxrem(10px);
    }
    p{
      font-size: pxrem(22px);
      color: #49F1DF;
      font-weight:600;
    }
  }
}
</style>

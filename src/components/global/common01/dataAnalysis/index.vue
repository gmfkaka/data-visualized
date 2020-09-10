<template>
  <div class="common01-data">
    <div class="data-wrap common01-border">
       <!-- <div class="common01-title">{{viewAttr.header || '舆情分析'}}</div> -->
       <div class="sweiper-box">
           <!-- <img src="./assets/active-bg.png" alt=""> -->
             <el-carousel :autoplay="false" :interval="3000" type="card" height= "100px">
                <el-carousel-item v-for="item in list" :key="item">
                    <p class="slide-title">{{item}}</p>
                </el-carousel-item>
            </el-carousel>
       </div>
       <div class="bottom-box">
           <div class="qinggan-box">
               <div style="display:flex; flex-direction: row;align-items: center;">
                    <img class="title-logo" src="./assets/title.png" alt="">
                    <p class="bottom-title">情感分析</p>
               </div>
               <div class="qinggan-item-box"> 
                    <div class="qinggan-item">
                        <p class="qinggan-title">正面：615 </p>
                        <div style="display:flex; flex-direction: row;align-items: center;">
                            <div class="all-percent">
                                <div class="item-percent green"></div>
                            </div>
                            <span class="percent-num">25%</span>
                        </div>
                    </div>
                       <div class="qinggan-item">
                        <p class="qinggan-title">中立：1320 </p>
                        <div style="display:flex; flex-direction: row;align-items: center;">
                            <div class="all-percent">
                                <div class="item-percent yellow"></div>
                            </div>
                            <span class="percent-num">62%</span>
                        </div>
                    </div>
                       <div class="qinggan-item">
                        <p class="qinggan-title">负面：446 </p>
                        <div style="display:flex; flex-direction: row;align-items: center;">
                            <div class="all-percent">
                                <div class="item-percent red"></div>
                            </div>
                            <span class="percent-num">13%</span>
                        </div>
                    </div>
               </div>
               
           </div>
            <div class="geographical-distribution chart-box">
                <div style="display:flex; flex-direction: row;align-items: center;">
                    <img class="title-logo" src="./assets/title.png" alt="">
                    <p class="bottom-title">情感分析</p>
               </div>
                <chart :options="geoOpt" :autoResize="true"></chart>
            </div>
       </div>
     
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts-wordcloud'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import { Carousel, CarouselItem } from 'element-ui'
export default {
  name: 'dataAnalysis',
  components: {
    chart: echarts,
    Carousel,
    CarouselItem
  },
  data () {
    return {
      proportion: 1,
      list: [
        '什刹海冰场正式开放 市民排队入场 冰面游人如织',
        '什刹海冰场正式开放 市民排队入场 冰面游人如织',
        '什刹海冰场正式开放 市民排队入场 冰面游人如织'
      ]
    }
  },
  created () {
  },
  computed: {
    geoOpt () {
      return {
        color: ['#4da2fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
              show: true,
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: '#fff',
                fontSize: 24 // 更改坐标轴文字大小
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#71a4f2'],
                width: '1',
                type: 'solid'
              }
            },
            data: ['吉林', '安徽', '西安', '江苏', '北京', '广州', '湖南']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 1,
              margin: 15,
              textStyle: {
                fontSize: 30,
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
            data: [600, 500, 400, 350, 390, 330, 220]
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-data {
  width: 100%;
  height: 100%;
  padding: pxrem(30px);
  .data-wrap{
      padding: pxrem(100px);
      background: url("./assets/border.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
     .chart-box {
        position: relative;
        width: 60%;
        height: 60%;
        padding: 1% 0 0 1%;
        .echarts {
            width: 100%;
            height: 100%;
        }
     }
    .sweiper-box{
        width: 100%;
        height: pxrem(120px);
        margin: pxrem(80px) 0;
        img{
            width: pxrem(1300px);
            height: pxrem(120px);
        }
    }
    .bottom-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .bottom-title{
            text-align: left;
            font-size: pxrem(44px);
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(72,241,223,1);
            margin-left: pxrem(20px);;
        }
        .qinggan-item-box{
            padding-top: pxrem(25px);
            .qinggan-item{
                height: pxrem(150px);
            }
            display: flex;
            flex-direction: column;
            .qinggan-title{
                text-align: left;
                font-size: pxrem(36px);
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(254,254,254,1);
                margin: pxrem(20px) 0;
            }
            .all-percent{
                position: relative;
                left: 0;
                width: pxrem(440px);
                height: pxrem(10px);
                background-color:#21479A;
                border-radius: pxrem(5px);
                .green{
                    width: pxrem(204px);
                    background-color: #00BDA4;
                }
                .yellow{
                    width: pxrem(300px);
                    background-color: #C8C232;
                }
                .red{
                    width: pxrem(160px);
                    background-color: #D83E69;
                }
                .item-percent{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: pxrem(10px);
                    border-radius: pxrem(5px);
                    &::after{
                        width: pxrem(20px);
                        height: pxrem(20px);
                        border-radius: 50%;
                    }
                }
            }
            .percent-num{
                font-size:pxrem(32px);
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(254,254,254,1);
                margin-left: pxrem(20px);
            }
        }
    }
  }
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .slide-title{
    font-size:pxrem(44px);
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
.title-logo{
    width: pxrem(40px);
    height: pxrem(40px);
}
//   /deep/{
.el-carousel__indicators--outside{
    display: none;
}
.el-carousel__item--card{
    // background-image: url("./assets/no-active.png");
    display: flex;
    align-items: center;
    background-color: #013D99;
    padding: 0 pxrem(20px);
}
.el-carousel__item--card.is-active{
    // background-image: url("./assets/active-bg.png");
    display: flex;
    align-items: center;
    background-color: #2634C3;
    padding: 0 pxrem(20px);
}
//   }
</style>

<template>
  <div class="common01-heatmap">
    <div class="wrap-content common01-border">
      <div class="common01-title">{{viewAttr.header || '用户热力图'}}</div>
      <div class="heatmap-wrap flex">
        <div class="bg"></div>
        <!-- 热力图 -->
        <div class="flex-one">
          <div  id="my-map" class="heat-map flex-one">
          </div>
        </div>
        <!-- 用户统计汇总 -->
        <div class="user-info">
         <div class="user-label flex flex-center"><div class="user-icon"></div>本市用户排行</div>
         <div class="flex flex-center">
             <div class="user-item sys-vertical flex-center" v-for="(item, index) in districtList" :key="item.district">
                <div class="user-rank">
                    <span class="icon index common01-ft40" :class="{'one': index === 0, 'two': index === 1, 'three': index === 2, 'four':index > 2}">{{index + 1}}</span>
                    <span class="name">{{item.district}}</span>
                </div>
                <div>
                  <!-- <div class="progress-bar" :style="{width: Math.ceil((item.num / total) * 100) + '%'}"></div> -->
                  <span class="name">{{(item.num / total * 100).toFixed(1)}}%</span>
                </div>
            </div>
         </div>
          <div class="user-label flex flex-center"><div class="user-icon"></div>省内用户排行</div>
          <div class="flex flex-center">
             <div class="user-item sys-vertical flex-center" v-for="(item, index) in cityList.slice(0,3)" :key="index">
                <div class="user-rank">
                    <span class="icon index common01-ft40" :class="{'one': index === 0, 'two': index === 1, 'three': index === 2, 'four':index > 2}">{{index + 1}}</span>
                    <span class="name">{{item.name}}市</span>
                </div>
                <div>
                  <!-- <div class="progress-bar" :style="{width: Math.ceil((item.num / total) * 100) + '%'}"></div> -->
                  <span class="name">{{(item.count / total * 100).toFixed(1)}}%</span>
                </div>
            </div>
         </div>
          <div class="user-label flex flex-center"><div class="user-icon"></div>国内前三占比</div>
          <div class="flex flex-center flex-justify-between">
            <div v-for="(item, index) in provinceList" :key="index" class="pie-chart-city">
              <chart v-if="item.opt" :options="item.opt" :autoResize="true"></chart>
              <div class="label-percent">{{(item.count / total * 100).toFixed(1)}}%</div>
              <div class="label-name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OUserHot, getM2OCityList } from '@/servers/interface'
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import 'echarts/map/js/china.js'
import 'echarts/lib/chart/pie'
import vueecharts from 'vue-echarts/components/ECharts'
import loadScript from '@/utils/loadScript.js'
import loadBMap from '@/utils/loadBMap.js'
import mapstyle from '@/config/mapstyle/darkblue.json'

export default {
  name: 'userHeatmap',
  data () {
    return {
      frequency: 15000,
      total: 0,
      cityTotal: 0,
      cityList: [],
      provinceList: [],
      districtList: [],
      pieOptions: '',
      colors: ['#F35467', '#E4BD53', '#36E892'],
      myChart: ''
    }
  },
  components: {
    chart: vueecharts
  },
  mounted () {
    loadScript('/static/jquery.min.js').then(res => {
      loadBMap().then(() => {
        this.getUserHeat()
        this.getCity()
        // 半天更新一次
        this.time = setInterval(() => {
          this.getUserHeat()
          this.getCity()
        }, 43200000)
      })
    })
  },
  created () {
    this.initCharts()
  },
  methods: {
    getUserHeat () {
      getM2OUserHot().then(res => {
        this.initMap(res.data.result)
      })
    },
    getCity () {
      getM2OCityList().then(res => {
        if (res.data.result.length) {
          const { provinceList, cityList, districtList, count } = res.data.result[0]
          this.provinceList = provinceList
          this.cityList = cityList
          this.districtList = districtList
          this.cityTotal = provinceList[0].count
          this.total = count
          this.provinceList.forEach((item, index) => {
            let opt = JSON.parse(JSON.stringify(this.pieOptions))
            opt.series[0].data[1].itemStyle.normal.color = this.colors[index]
            let data = opt.series[0].data
            data[0].value = this.total// 没数据默认 0%
            data[1].value = item.count * 10
            data[1].name = item.name
            item.opt = opt
          })
        }
      })
    },
    initMap (data) {
      let myChart = echarts.init(document.getElementById('my-map'))
      var points = [].concat.apply([], data.map(function (track) {
        return [[track.longitude, track.latitude, 1]]
      }))
      /* points示例：
        [
          [lng, lat, 1],
          [lng, lat, 1],
          [lng, lat, 1]
        ]
      */
      myChart.setOption({
        animation: false,
        bmap: {
          center: [120.169125, 33.335470],
          zoom: 9,
          roam: true
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['#2d45ff', '#36b7ff', '#50ffe2', '#ecffb6', '#ff43b6']
            // color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        series: [{
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: points,
          pointSize: 5,
          blurSize: 6
        }]
      })
      // 添加百度地图插件
      var bmap = myChart.getModel().getComponent('bmap').getBMap()
      bmap.setMapStyle(mapstyle)
    },
    initCharts () {
      this.pieOptions = {
        series: [
          {
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '50%'],
            radius: ['80%', '100%'],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 30,
              name: '总数',
              itemStyle: {
                normal: {
                  color: '#1B467F'
                }
              }
            }, {
              value: 70,
              name: '文本',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#003DFF'},
                      {offset: 1, color: '#10FFC7'}
                    ]
                  )
                }
              }
            }]
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-heatmap {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .wrap-content{
    padding: pxrem(200px) pxrem(96px) pxrem(80px) pxrem(78px);
    color: #fff;
  }
  .heatmap-wrap {
    position: relative;
    height: pxrem(740px);
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: url("./assets/back.png") no-repeat center;
      background-size: 100% 100%;
      border: solid pxrem(1px) #00BAFF;
    }
    .heat-map{
      width: 100%;
      height: 100%;
    }
    .user-info{
      width: pxrem(530px);
      padding: pxrem(30px) pxrem(40px) pxrem(40px);
      .user-item{
        margin: 0 0 pxrem(30px) 0;
        width: 34%;
        .name{
          font-size: pxrem(30px);
          margin-right: pxrem(20px);
        }
        .icon {
          display: inline-block;
        }
        .user-rank {
          margin-bottom: pxrem(12px)
        }
        .index {
          width: pxrem(30px);
          height: pxrem(30px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(30px);
          &.common01-ft40{
            font-size: pxrem(30px) !important;
          }
          &.one {
            background-image: url("../clickRank/assets/one.png");
          }
          &.two {
            background-image: url("../clickRank/assets/two.png");
          }
          &.three {
            background-image: url("../clickRank/assets/three.png");
          }
          &.four {
            background-image: url("../clickRank/assets/four.png");
          }
        }
      }
      .progress-bar{
        height: pxrem(16px);
        background:linear-gradient(-90deg,rgba(40,186,234,1),rgba(0,90,255,1));
        border-radius: pxrem(8px);
        margin-right: pxrem(20px);
      }
    }
    .user-label{
      color: #49F1DF;
      font-size: pxrem(34px);
      margin-bottom: pxrem(30px);
      .user-icon{
        width: pxrem(36px);
        height: pxrem(33px);
        background: url('./assets/tip.png');
        background-size: 100%;
        margin-right: pxrem(12px);
      }
    }
    .pie-chart-city{
      position: relative;
      width: pxrem(150px)!important;
      height: pxrem(120px)!important;
      margin-right: pxrem(60px);
      &:nth-child(3n){
        margin-right: 0;
      }
      .label-percent{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: pxrem(30px);
      }
      .label-name{
        font-size: pxrem(30px);
      }
    }
  }
}
</style>

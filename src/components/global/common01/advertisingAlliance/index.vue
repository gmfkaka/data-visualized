<template>
  <div class="common01-advertising" id="common01-advertising">
    <div class="advertising-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '客户分布'}}</div>
      <div class="map-wrap" id="map-wrap"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'report',
  props: {
    screenConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      multiple: 1,
      option: {
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false, // 禁止地图放大缩小
          itemStyle: {
            normal: {
              areaColor: 'rgb(2, 66, 142)',
              borderColor: 'rgb(78, 150, 207)'
            }
          }
        },
        series: [
          {
            name: '覆盖范围',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 14 * this.multiple,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#fff',
                shadowBlur: 10 * this.multiple,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      },
      mapData: [
        { 'name': '黑龙江', 'value': 0 },
        { 'name': '长春', 'value': 0 },
        { 'name': '辽宁', 'value': 0 },
        { 'name': '北京', 'value': 0 },
        { 'name': '河北', 'value': 0 },
        { 'name': '济南', 'value': 0 },
        { 'name': '山东', 'value': 0 },
        { 'name': '甘肃', 'value': 0 },
        { 'name': '河南', 'value': 0 },
        { 'name': '徐州', 'value': 0 },
        { 'name': '江苏', 'value': 0 },
        { 'name': '无锡', 'value': 0 },
        { 'name': '浙江', 'value': 0 },
        { 'name': '四川', 'value': 0 },
        { 'name': '湖北', 'value': 0 },
        { 'name': '湖南', 'value': 0 },
        { 'name': '江西', 'value': 0 },
        { 'name': '福州', 'value': 0 },
        { 'name': '广东', 'value': 0 },
        { 'name': '云南', 'value': 0 },
        { 'name': '广州', 'value': 0 },
        { 'name': '吉林', 'value': 0 },
        { 'name': '内蒙古', 'value': 0 },
        { 'name': '西藏', 'value': 0 },
        { 'name': '青海', 'value': 0 }
      ]
    }
  },
  mounted () {
    this.setFontsize('common01-advertising')
    this.initMap()
    if (!isNaN(+this.screenConfig.multiple) && +this.screenConfig.multiple !== 0) {
      this.multiple = +this.screenConfig.multiple
    }
  },
  methods: {
    initMap () {
      let myMap = echarts.init(document.getElementById('map-wrap'))
      myMap.clear()
      const data = this.convertData(this.mapData)
      this.option.series[0].data = data
      myMap.setOption(this.option, true)
    },
    convertData (data) {
      var res = []
      const geoCoordMap = {
        '山东': [118.58, 37.48],
        '福建': [117.64, 26.27],
        '广东': [113.76, 23.04],
        // '广州': [113.23, 23.16],
        '云南': [102.73, 25.04],
        '辽宁': [123.38, 41.8],
        // '长春': [125.35, 43.88],
        '江西': [115.89, 28.68],
        '四川': [104.06, 30.67],
        '西安': [108.95, 34.27],
        '江苏': [118.78, 32.04],
        // '无锡': [120.29, 31.59],
        '北京': [116.46, 39.92],
        // '徐州': [117.2, 34.26],
        '浙江': [120.19, 30.26],
        // '济南': [117, 36.65],
        '甘肃': [103.73, 36.03],
        '河南': [113.65, 34.76],
        '黑龙江': [126.63, 45.75],
        '河北': [114.48, 38.03],
        '湖南': [112, 27.21],
        '湖北': [114.31, 30.52],
        '吉林': [126.56, 43.87],
        '内蒙古': [113.11, 43.02],
        '西藏': [91.11, 29.66],
        '青海': [100.22, 34.48]
      }
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-advertising {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .advertising-wrap {
    padding: 0 pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
  }
  .map-wrap {
    margin: 0 auto;
    width: 100%;
    // height: pxrem(950px);
    height: pxrem(1100px);
    position: relative;
  }
}
</style>

<template>
  <div class="lishui-workcallmap-container" id="ls-workcallInfoMap">
    <div class="container-title sys-flex sys-flex-center flex-justify-center">
      <div class="title-image"></div>
    </div>
    <div class="container-inner">
      <div class="main-wrap">
        <div class="reporter-map-wrap flex">
          <call
            @updateList="getReporter"
            :info-item.sync="callInfo"
            :call-show.sync="callShow"
            :call-type.sync="callType">
          </call>
          <div id="my-map" ref="allmap" class="reporter-map flex-one"></div>
          <div class="reporter-list-wrap" v-if="reporterList && reporterList.length">
              <div class="reporter-list-content" v-if="reporterList && reporterList.length">
                <div class="reporter-list" v-for="(v,k) in reporterList" v-if="v.rc_status === 0" :key="k">
                    <div class="sys-flex sys-flex-center" @click="reporterLocate(v)">
                      <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                      <img class="avatar" v-if="!v.avatar" src="./assets/default_avatar.png" />
                      <div class="info overhidden sys-flex-one">
                          <div class="name overhidden">{{v.member_name}}</div>
                          <!-- <div class="depart">{{`${v.role_title}-${v.org_title}`}}</div> -->
                          <div class="depart">溧水区融媒体中心-{{v.rc_status ? (v.rc_status === 1 ? '离线':'登出') : '在线'}}</div>
                      </div>
                      <div class="connect connect-audio" @click="callaudio(v)"></div>

                      <div class="connect connect-video" @click="callvideo(v)"></div>
                      <!-- @click="callvideo(v)" -->
                    </div>
                    <!-- <div class="border-line"></div> -->
                </div>
              </div>
              <div class="no-data" v-else>
                暂无数据
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import call from './call.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import loadScript from '@/utils/loadScript.js'
import loadBMap from '@/utils/loadBMap.js'
import { getWorkCallConnectList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'workcallInfoMap',
  data () {
    return {
      center: '',
      reporterList: [],
      frequency: 60000,
      currentActive: false,
      callInfo: {},
      callShow: false,
      callType: 'video',
      coordinateList: [],
      unlinecoordinateList: [],
      // 地图样式
      mapStyle: {
        styleJson: [{
          'featureType': 'land',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#0d1835'
          }
        }, {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#0b142b'
          }
        }, {
          'featureType': 'green',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#0b142b'
          }
        }, {
          'featureType': 'building',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'building',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#091022'
          }
        }, {
          'featureType': 'building',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#091022'
          }
        }, {
          'featureType': 'subwaystation',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#b15454B2'
          }
        }, {
          'featureType': 'education',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#091022'
          }
        }, {
          'featureType': 'medical',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#203b81'
          }
        }, {
          'featureType': 'scenicspots',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'color': '#203b81'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 4
          }
        }, {
          'featureType': 'highway',
          'elementType': 'geometry.fill',
          'stylers': {
            'visibility': 'off',
            'color': '#203b81'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#203b81ff'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#203b81'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 2
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#d8d8d8ff'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffeebbff'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2e55bbff'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'local',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 1
          }
        }, {
          'featureType': 'local',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#d8d8d8ff'
          }
        }, {
          'featureType': 'local',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'local',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'local',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2e55bbff'
          }
        }, {
          'featureType': 'local',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'railway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 1
          }
        }, {
          'featureType': 'railway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#123c52ff'
          }
        }, {
          'featureType': 'railway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#12223dff'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on',
            'weight': 1
          }
        }, {
          'featureType': 'subway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#d8d8d8ff'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2e55bbff'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'continent',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'continent',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'continent',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#2e55bbff'
          }
        }, {
          'featureType': 'continent',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'city',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'city',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'city',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#454d50ff'
          }
        }, {
          'featureType': 'city',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'town',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'town',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'town',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#454d50ff'
          }
        }, {
          'featureType': 'town',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#12223dff'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'districtlabel',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': {
            'visibility': 'on'
          }
        }, {
          'featureType': 'road',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'district',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels.icon',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#294ca6ff'
          }
        }, {
          'featureType': 'poilabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffff00'
          }
        }, {
          'featureType': 'manmade',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        }, {
          'featureType': 'districtlabel',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'entertainment',
          'elementType': 'geometry',
          'stylers': {
            'color': '#ffffffff'
          }
        }, {
          'featureType': 'shopping',
          'elementType': 'geometry',
          'stylers': {
            'color': '#12223dff'
          }
        }]
      }
    }
  },
  components: {
    call,
    swiper,
    swiperSlide
  },
  created () {
    getDataConfig().then(res => {
      console.log(res)
      this.center = {lng: +res.lng, lat: +res.lat}
    })
  },
  mounted () {
    this.setFontsize('ls-workcallInfoMap')
    loadScript('/static/jquery.min.js').then(res => {
      loadBMap().then(() => {
        this.getReporter()
      })
    })
    let _this = this
    setInterval(() => {
      _this.getReporter()
    }, this.frequency)
  },
  methods: {
    rMap () {
      var BMap = window.BMap
      let map = this.map = new BMap.Map('my-map')
      // if (!map) {
      //   map = new BMap.Map('my-map')
      // }
      // map.setMapStyle(this.mapStyle)
      map.addControl(new BMap.NavigationControl())
      // 绘制带图标注
      var _this = this
      SquareOverlay.prototype = new BMap.Overlay()
      SquareOverlay.prototype.initialize = function (map) {
        this._map = map
        let div = document.createElement('div')
        let img = document.createElement('img')
        let img2 = document.createElement('img')
        let span = document.createElement('span')
        let span2 = document.createElement('span')
        div.appendChild(img)
        div.appendChild(img2)
        div.appendChild(span)
        span.appendChild(span2)
        var item = this._mid
        img.src = this._src
        img.style.position = 'absolute'
        img.style['border-radius'] = '50%'
        img.style.overflow = 'hidden'
        img.style.width = '0.5em'
        img.style.height = '0.5em'
        img.style.top = '0'
        img.style.left = '0'
        img.style.zIndex = 10
        img2.style.position = 'absolute'
        img2.style['border-radius'] = '50%'
        img2.style.overflow = 'hidden'
        img2.style.width = '0.2em'
        img2.style.height = '0.2em'
        img2.style.bottom = '0'
        img2.style.left = '0.45em'
        img2.style.background = 'url(' + require('./assets/landmark.png') + ') no-repeat center center'
        img2.style.backgroundSize = '100%'
        span.style.position = 'absolute'
        span.style.borderRadius = '0.5em'
        span.style.overflow = 'hidden'
        span.style.width = '0.9em'
        span.style.height = '0.35em'
        span.style.top = '0.1em'
        span.style.left = '0.25em'
        span.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
        span.style.color = 'rgb(255, 255, 255)'
        span.zIndex = 9
        span2.style.position = 'absolute'
        span2.style.top = '0.4em'
        span2.style.left = '30%'
        span2.style.fontSize = '0.16rem'
        span2.innerText = item.member_name
        div.style.position = 'absolute'
        div.style.width = '1.1em'
        div.style.height = '0.7em'
        map.getPanes().markerPane.appendChild(div)
        this._div = div
        div.onclick = function () {
          _this.callvideo(item)
        }
        return div
      }
      SquareOverlay.prototype.draw = function () {
        var position = this._map.pointToOverlayPixel(this._center)
        this._div.style.left = position.x - this._length / 2 + 5 + 'px'
        this._div.style.top = position.y - this._length / 1.1 + 5 + 'px'
      }
      // 清除覆盖物
      map.clearOverlays()
      this.coordinateList = []
      this.unlinecoordinateList = []
      this.reporterList.forEach(vv => {
        // vv.member_id = vv.user_id
        var img = vv.avatar && vv.avatar.uri ? vv.avatar.uri : require('./assets/default_avatar.png')
        if (vv.longitude && vv.latitude) { // 地图上只画在线且有坐标的
          if (vv.rc_status === 0 || vv.rc_status === 1) {
            var mySquare = new SquareOverlay({
              lng: vv.longitude,
              lat: vv.latitude
            }, 60, 'red', img, vv)
            setTimeout(function () {
              if (vv.rc_status === 0) {
                map.addOverlay(mySquare)
                // mySquare['_div'].classList.add('landmark-red')
              }
            }, 100)
            // 设置地图的最佳视图
            this.coordinateList.push(new BMap.Point(vv.longitude, vv.latitude))
          } else {
            this.unlinecoordinateList.push(new BMap.Point(vv.longitude, vv.latitude))
          }
        }
      })
      // 绘制带图标注结束
      // if (this.coordinateList.length || this.unlinecoordinateList.length) {
      //   var view = map.getViewport(this.coordinateList.length > 0 ? this.coordinateList : this.unlinecoordinateList)
      //   var mapZoom = view.zoom - 1
      //   var centerPoint = view.center
      //   map.centerAndZoom(centerPoint, mapZoom)
      // } else {
      //   console.log(this.center)
      //   map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 20)
      // }
      map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 17)
      map.addControl(new BMap.NavigationControl())
      function SquareOverlay (center, length, color, src, mid) {
        this._src = src
        this._center = center
        this._length = length
        this._color = color
        this._mid = mid
      }

      // 以下方法添加自定义控件，用来重回原点
      /* eslint-disable */
      // 定义一个控件类，即function
      function ZoomControl(anchor = BMAP_ANCHOR_BOTTOM_RIGHT, offset = new BMap.Size(10, 10)) {
        // 设置默认停靠位置和偏移量
        this.defaultAnchor = anchor
        this.defaultOffset = offset
      }
      /* eslint-enable */
      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control()
      ZoomControl.prototype.initialize = function (map) {
        // 创建一个DOM元素
        var div = document.createElement('div')
        // 添加文字说明
        // 设置样式
        div.style.cursor = 'pointer'
        div.style.width = '0.5em'
        div.style.height = '0.5em'
        div.style.background = 'url(' + require('./assets/position.png') + ')'
        div.style.backgroundSize = '100%'
        // 绑定事件，点击回到原点
        div.onclick = function (e) {
          map.centerAndZoom(new BMap.Point(_this.center.lng, _this.center.lat), 17)
        }
        // 添加DOM元素到地图中
        map.getContainer().appendChild(div)
        // 将DOM元素返回
        return div
      }
      var myZoomCtrl = new ZoomControl()
      // 添加到地图当中
      map.addControl(myZoomCtrl)
    },
    hideCurrent () {
      this.currentActive = false
    },
    getReporter () {
      getWorkCallConnectList().then(res => {
        if (!res.data.error_code && res.data.result.length) {
          this.reporterList = res.data.result.filter(item => item.rc_status === 0)
        }
        this.rMap()
      })
    },
    callaudio (reporter) {
      this.getReporter()
      this.callInfo = reporter
      this.callType = 'audio'
      this.callShow = true
    },
    callvideo (reporter) {
      this.getReporter()
      this.callInfo = reporter
      this.callType = 'video'
      this.callShow = true
    },
    // 定位记者中心
    reporterLocate (reporter) {
      let BMap = window.BMap
      let centerPoint = new BMap.Point(reporter.longitude, reporter.latitude)
      this.map.panTo(centerPoint)
    },
    split_array (arr, len) {
      let aLen = arr.length
      let result = []
      for (let i = 0; i < aLen; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  }
}
</script>

<style lang="scss">
// px转em,第二个参数可以控制倍数
@function pxem($px-values,$base-multiple: 18.75, $baseline-px:16px,$support-for-ie:false){
  //Conver the baseline into rems
  $baseline-rem: $baseline-px / 1em * $base-multiple;
  //Print the first line in pixel values
  @if $support-for-ie {
      @return $px-values;
  }
  //if there is only one (numeric) value, return the property/value line for it.
  @if type-of($px-values) == "number"{
      @return $px-values / $baseline-rem;
  }
  @else {
      //Create an empty list that we can dump values into
      $rem-values:();
      @each $value in $px-values{
          // If the value is zero or not a number, return it
          @if $value == 0 or type-of($value) != "number"{
              $rem-values: append($rem-values, $value / $baseline-rem);
          }
      }
      @return $rem-values;
  }
}

// px转rem,第二个参数可以控制倍数
@function pxrem($px-values,$base-multiple: 18.75, $baseline-px:16px,$support-for-ie:false){
  //Conver the baseline into rems
  $baseline-rem: $baseline-px / 1rem * $base-multiple;
  //Print the first line in pixel values
  @if $support-for-ie {
      @return $px-values;
  }
  //if there is only one (numeric) value, return the property/value line for it.
  @if type-of($px-values) == "number"{
      @return $px-values / $baseline-rem;
  }
  @else {
      //Create an empty list that we can dump values into
      $rem-values:();
      @each $value in $px-values{
          // If the value is zero or not a number, return it
          @if $value == 0 or type-of($value) != "number"{
              $rem-values: append($rem-values, $value / $baseline-rem);
          }
      }
      @return $rem-values;
  }
}
.anchorBL{
  display:none!important;
}
.lishui-workcallmap-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 11px;
  background-color: #121D58;
  .container-title {
    width: 100%;
    height: 20%;
    .title-image {
      width: 80%;
      height: 50%;
      background: url('./assets/title-image.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .container-inner {
    position: absolute;
    top: 17%;
    width: calc(100% - 22px);
    height: 82%;
    padding: 0.5em 0.07em 0.07em 0.07em;
    background: url('./assets/map-back.png') no-repeat center;
    background-size: 100% 100%;
    .main-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .reporter-map-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        .no-data{
          font-size: pxrem(70px);
          color: #ebebeb;
          padding: 2em;
        }
        .reporter-map {
          height: 100%;
          background: #202b67;
        }
        .reporter-list-wrap {
          width: 23%;
          padding: pxem(70px);
          overflow-y: hidden;
          overflow-x: scroll;
          position: relative;
          background: #021E61;
          .reporter-list-content{
            height: 100%;
            overflow: scroll;
          }
          .reporter-list {
            position: relative;
            height: pxem(300px);
            padding: pxem(50px);
            margin-bottom: pxem(50px);
            background-color: #123371;
            &:hover {
              background-color: #0A43B7;
            }
            // .border-line{
            //   width: 100%;
            //   margin-top: 0.4em;
            //   height: 0.03em;
            //   background: url('./assets/border-line.png') no-repeat bottom;
            //   background-size: 100%;
            // }
            .avatar {
              width: pxrem(190px);
              height: pxrem(190px);
              border-radius: 50%;
              overflow: hidden;
              border: solid 0.02em #fff;
              margin-right: pxrem(60px);
            }
            .info {
              height: 100%;
              flex-direction: column;
              text-align: left;
              .name {
                font-size: pxrem(70px);
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
              .depart {
                font-size: pxrem(48px);
                font-family: PingFangSC-Light;
                font-weight: 400;
                color: #00BAFF;
              }
            }
            .connect {
              width: pxrem(120px);
              height: pxrem(120px);
              background: url("") no-repeat center right;
              background-size: pxrem(120px) pxrem(120px);
              cursor: pointer;
              &.connect-audio {
                background-image: url("./assets/audio.png");
                margin-right: pxrem(30px);
              }
              &.connect-video {
                background-image: url("./assets/video.png");
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="container" id="workcallInfoMap">
    <div class="container-inner overhidden">
      <div class="main-wrap">
        <div class="reporter-map-wrap flex">
          <call
            :info-item.sync="callInfo"
            :call-show.sync="callShow"
            :call-type.sync="callType">
          </call>
          <div id="my-map" ref="allmap" class="reporter-map flex-one"></div>
          <div class="reporter-list-wrap">
              <div class="reporter-list-title">
                记者列表
              </div>
              <div class="reporter-list-content" v-if="reporterList && reporterList.length">
                <div class="reporter-list" v-for="(v,k) in reporterList" :key="k">
                    <div class="sys-flex sys-flex-center" @click="reporterLocate(v)">
                      <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                      <img class="avatar" v-if="!v.avatar" src="./assets/default_avatar.png" />
                      <div class="info overhidden sys-flex-one">
                          <div class="name overhidden">{{v.member_name}}</div>
                          <div class="depart">{{v.mobile}}</div>
                      </div>
                      <div class="connect connect-audio" @click="callaudio(v)"></div>
                      
                      <div class="connect connect-video" @click="callvideo(v)"></div>
                      <!-- @click="callvideo(v)" -->
                    </div>
                    <div class="border-line"></div>
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
import loadScript from '@/utils/loadScript.js'
import loadBMap from '@/utils/loadBMap.js'
import { getWorkCallConnectList } from '@/servers/interface'
import {getDataConfig} from '@/utils/model'
export default {
  name: 'workcallInfoMap',
  data () {
    return {
      center: '',
      reporterList: [],
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
    call
  },
  created () {
    getDataConfig().then(res => {
      this.center = {lng: +res.lng, lat: +res.lat}
    })
  },
  mounted () {
    this.setFontsize('workcallInfoMap')
    loadScript('/static/jquery.min.js').then(res => {
      loadBMap().then(() => {
        this.getReporter()
      })
    })
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
        div.appendChild(img)
        var item = this._mid
        img.src = this._src
        img.style.position = 'absolute'
        img.style['border-radius'] = '50%'
        img.style.overflow = 'hidden'
        img.style.width = '0.72em'
        img.style.height = '0.72em'
        img.style.top = '0.12em'
        img.style.left = '0.15em'
        div.className = 'map-style'
        div.style.position = 'absolute'
        div.style.width = '1em'
        div.style.height = '1.3em'
        div.style.background = 'url(' + require('./assets/landmark.png') + ') no-repeat center center'
        div.style.backgroundSize = '100%'
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
                mySquare['_div'].classList.add('landmark-red')
              }
            }, 100)
            map.addOverlay(mySquare)
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
    },
    hideCurrent () {
      this.currentActive = false
    },
    getReporter () {
      getWorkCallConnectList(this.currentViewId).then(res => {
        if (!res.data.error_code && res.data.result.length) {
          this.reporterList = res.data.result
        }
        this.rMap()
      })
    },
    callaudio (reporter) {
      this.callInfo = reporter
      this.callType = 'audio'
      this.callShow = true
    },
    callvideo (reporter) {
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

<style lang="scss" scoped>
.anchorBL{
  display:none!important;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // border: solid 0.02em #00D2FF;
  padding: 0.25vh 0.1vw;
  .container-inner {
    width: 100%;
    height: 100%;
    border: solid 0.02em #00D2FF;
    border-radius: 0.2em;
    // background: url('./assets/bg_1.png') no-repeat center;
    // background-size: 100% 100%;
    // padding: 0.3em 0.5em;
    .main-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .reporter-map-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        .no-data{
          font-size: 0.34em;
          color: #ebebeb;
          padding: 2em;
        }
        .reporter-map {
          height: 100%;
          background: #202b67;
        }
        .reporter-list-wrap {
          width: 6em;
          overflow-y: hidden;
          overflow-x: scroll;
          position: relative;
          background: #0A1D4D;
          .reporter-list-title{
            height: 2.2em;
            line-height: 2.2em;
            color: #fff;
            font-size: 0.43em;
            font-weight: 700;
            text-align: center;
            background-color: #114497;
          }
          .reporter-list-content{
            height: 9em;
            overflow: scroll;
          }
          .reporter-list {
            padding: 0.4em 0.4em 0;
            position: relative;
            .border-line{
              width: 100%;
              margin-top: 0.4em;
              height: 0.03em;
              background: url('./assets/border-line.png') no-repeat bottom;
              background-size: 100%;
            }
            .avatar {
              width: 1em;
              height: 1em;
              border-radius: 50%;
              overflow: hidden;
              border: solid 0.02em #fff;
              margin-right: 0.28em;
            }
            .info {
              height: 100%;
              flex-direction: column;
              text-align: left;
              .name {
                font-size: 0.4em;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
              .depart {
                font-size: 0.28em;
                font-family: PingFangSC-Light;
                font-weight: 400;
                color: #00BAFF;
              }
            }
            .connect {
              width: 0.68em;
              height: 0.68em;
              background: url("") no-repeat center right;
              background-size: 0.68em 0.68em;
              cursor: pointer;
              &.connect-audio {
                background-image: url("./assets/audio.png");
                margin-right: 0.3em;
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

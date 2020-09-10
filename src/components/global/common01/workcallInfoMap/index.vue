<template>
  <div class="common01-workmap">
    <div class="reporter-map-wrap sys-flex sys-flex-center flex-justify-center">
      <call
        :info-item.sync="callInfo"
        :call-show.sync="callShow"
        :call-type.sync="callType"
      ></call>
      <div id="my-map" ref="allmap" class="reporter-map"></div>
      <div class="reporter-list-wrap">
        <div class="reporter-title common01-ft70" :style="setFontSize(40)">{{viewAttr.header || '记者列表'}}</div>
        <div class="reporter-body" v-if="reporterList && reporterList.length">
          <div class="reporter-list" v-for="(v, k) in reporterList" :key="k">
            <div class="sys-flex list-body sys-flex-center">
              <div class="avatar-box">
                <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                <img class="avatar" v-if="!v.avatar" src="./assets/default_avatar.png" />
              </div>
              <div class="member-name">
                <div class="name common01-ft58 overhidden" :style="setFontSize(35)">{{v.member_name}}</div>
                <div class="role common01-ft38 overhidden" :style="setFontSize(25)">{{v.org_title}}-{{v.role_title}}</div>
              </div>
              <div class="connect connect-audio" @click="callaudio(v)"></div>
              <div class="connect connect-video" @click="callvideo(v)"></div>
            </div>
            <div class="border-line"></div>
          </div>
        </div>
        <div class="no-data" v-else>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import call from './call.vue'
import loadScript from '@/utils/loadScript.js'
import loadBMap from '@/utils/loadBMap.js'
import { getWorkCallConnectList } from '@/servers/interface'
import { getDataConfig, getRouterConfig } from '@/utils/model'
export default {
  name: 'workcallInfoMap',
  props: {
    viewId: String
  },
  data () {
    return {
      center: '',
      reporterList: [],
      frequency: 120000,
      callInfo: {},
      callShow: false,
      callType: 'video',
      coordinateList: [],
      unlinecoordinateList: [],
      mapStyle: '',
      customSize: false
    }
  },
  components: {
    call
  },
  created () {
    getDataConfig().then(res => {
      console.log(res)
      this.center = { lng: +res.lng, lat: +res.lat }
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    getRouterConfig().then(data => {
      if (data[this.viewId].mapStyle) {
        this.mapStyle = data[this.viewId].mapStyle
      }
    })
  },
  mounted () {
    loadScript('/static/jquery.min.js').then(res => {
      loadBMap().then(() => {
        this.getReporter()
        setInterval(() => {
          this.getReporter()
        }, this.frequency)
      })
    })
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    rMap () {
      var BMap = window.BMap
      let map = this.map = new BMap.Map('my-map')
      map.addControl(new BMap.NavigationControl())
      map.setMapStyle({style: this.mapStyle})
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
        img.style.width = '0.65rem'
        img.style.height = '0.65rem'
        img.style.top = '0'
        img.style.left = '0'
        img.style.zIndex = 10
        img2.style.position = 'absolute'
        img2.style['border-radius'] = '50%'
        img2.style.overflow = 'hidden'
        img2.style.width = '0.3rem'
        img2.style.height = '0.3rem'
        img2.style.bottom = '0'
        img2.style.left = '0.75rem'
        img2.style.background = 'url(' + require('./assets/landmark.png') + ') no-repeat center center'
        img2.style.backgroundSize = '100%'
        span.style.position = 'absolute'
        span.style.borderRadius = '0.215rem'
        span.style.overflow = 'hidden'
        span.style.width = '1.185rem'
        span.style.height = '0.465rem'
        span.style.top = '0.1rem'
        span.style.left = '0.3rem'
        span.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
        span.style.color = 'rgb(255, 255, 255)'
        span.zIndex = 9
        span2.style.position = 'absolute'
        span2.style.top = '0.075rem'
        span2.style.left = '40%'
        span2.style.fontSize = '0.2rem'
        span2.innerText = item.member_name
        div.style.position = 'absolute'
        div.style.width = '1.5rem'
        div.style.height = '0.925rem'
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
      map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 15)
      map.addControl(new BMap.NavigationControl())
      function SquareOverlay (center, length, color, src, mid) {
        this._src = src
        this._center = center
        this._length = length
        this._color = color
        this._mid = mid
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.common01-workmap {
  width: 100%;
  height: 100%;
  padding: pxrem(20px);
  .reporter-map-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("./assets/mapBorder.png") no-repeat center;
    background-size: 100% 100%;
    color: #fff;
    .reporter-map {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
    }
    .reporter-list-wrap {
      width: pxrem(505px);
      position: absolute;
      top: pxrem(35px);
      right: pxrem(32px);
      .reporter-title {
        width: 100%;
        height: pxrem(80px);
        line-height: pxrem(80px);
        background: #174EC1;
      }
      .reporter-body {
        width: 100%;
        height: pxrem(885px);
        background: #0B2152;
        overflow-y: scroll;
        overflow-x: hidden;
        .reporter-list {
          .avatar-box {
            width: pxrem(80px);
            height: pxrem(80px);
            border-radius: pxrem(5px);
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          }
          .member-name {
            width: 38%;
            margin: 0 pxrem(40px) 0 pxrem(21px);
            .name {
              margin-bottom: pxrem(3px);
            }
          }
          .connect {
            width: pxrem(55px);
            height: pxrem(55px);
            background: no-repeat center right;
            background-size: pxrem(55px) pxrem(55px);
            cursor: pointer;
            &.connect-audio {
              background-image: url("./assets/audio.png");
              margin-right: pxrem(20px);
            }
            &.connect-video {
              background-image: url("./assets/video.png");
            }
          }
          .list-body {
            padding: pxrem(27.5px) pxrem(30px) pxrem(31.5px);
          }
          .border-line{
            width: 100%;
            height: pxrem(5px);
            background: url('./assets/line.png') no-repeat bottom;
            background-size: 100%;
          }
        }
      }
      .no-data{
        width: 100%;
        height: pxrem(885px);
        background: #0B2152;
        font-size: pxrem(35px);
        color: #ebebeb;
      }
    }
  }
}
.common01-ft70 {
  font-size: pxrem(35px);
}
.common01-ft58 {
  font-size: pxrem(29px);
}
.common01-ft38 {
  font-size: pxrem(19px);
}
</style>

<template>
  <div class="lishui-workcallmap-container1" id="ls-workcallInfoMap">
    <div class="container-title sys-flex sys-flex-center flex-justify-center">
      <div class="title-image"></div>
    </div>
    <div class="container-inner">
      <call
        @updateList="getReporter"
        :info-item.sync="callInfo"
        :call-show.sync="callShow"
        :call-type.sync="callType">
      </call>
      <div class="main-wrap">
        <div class="reporter-map-wrap flex">
          <div id="my-map" ref="allmap" class="reporter-map flex-one"></div>
          <div class="reporter-list-wrap" v-if="reporterList && reporterList.length" :class="{'hide-list': !isOpen}">
              <div class="shouqi" @click.stop="isOpen = false" v-if="isOpen"></div>
              <div class="zhankai" @click.stop="isOpen = true" v-if="!isOpen"></div>
              <div class="reporter-list-content" v-if="isOpen">
                <div class="reporter-list" v-for="(v,k) in reporterList" :key="k">
                    <div class="sys-flex sys-flex-center" @click="reporterLocate(v)">
                      <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                      <img class="avatar" v-if="!v.avatar" src="./assets/default_avatar.png" />
                      <div class="info overhidden sys-flex-one">
                          <div class="name overhidden">{{v.member_name}}</div>
                          <div class="depart overhidden">{{`溧水区融媒体中心-${v.role_title}`}}</div>
                          <!-- <div class="depart">溧水区融媒体中心-{{v.rc_status ? (v.rc_status === 1 ? '离线':'登出') : '在线'}}</div> -->
                      </div>
                      <div class="connect connect-audio" @click="callaudio(v)"></div>

                      <div class="connect connect-video" @click="callvideo(v)"></div>
                    </div>
                </div>
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
import { formatDate } from '@/utils/utils'
export default {
  name: 'workcallInfoMap',
  data () {
    return {
      isOpen: true,
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
  watch: {
    callShow (res) {
      if (!res) {
        this.isOpen = this.reporterList && this.reporterList.length > 0
      } else {
        this.isOpen = false
      }
    }
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
      var currenttime = formatDate(+new Date() / 1000, 'YYYY-MM-DD hh:mm')
      SquareOverlay.prototype = new BMap.Overlay()
      SquareOverlay.prototype.initialize = function (map) {
        this._map = map
        var div = document.createElement('div')
        var item = this._mid
        div.id = item.id
        div.className = 'member-wrap'
        var addDiv = `
          <div class="avatar-wrap">
            <img src="${(item.avatar && item.avatar.uri) ||
              require('./assets/default_avatar.png')}" alt="" />
          </div>
          <div class="wrap sys-flex sys-flex-center">
            <div class="sys-flex sys-flex-center member-info">
              <img class="member-avatar" src="${(item.avatar && item.avatar.uri) ||
                require('./assets/default_avatar.png')}" alt="" />
              <div>
                ${item.member_name}
                <div class="status">当前状态：${item.is_connection === 1 ? '连线中' : '未连线'}</div>
              </div>
            </div>
            <div class="other-info"><i class="icon-item org-icon"></i>${item.org_title}-${item.role_title}</div>
            <div class="other-info"><i class="icon-item time-icon"></i>${currenttime}</div>
            <div class="other-info txt-overflow"><i class="icon-item lo-icon"></i>${item.address}</div>
            <div class="close"></div>
            <div class="audio"></div>
            <div class="video"></div>
          </div>`
        div.insertAdjacentHTML('beforeEnd', addDiv)
        map.getPanes().markerPane.appendChild(div)
        this._div = div
        // 点击显示浮窗
        div.onclick = function (e) {
          e.stopPropagation()
          var doms = document.getElementsByClassName('member-wrap show-detail')
          for (let i = 0; i < doms.length; i += doms.length) {
            doms[i].className = 'member-wrap'
          }
          div.className = 'member-wrap show-detail'
          _this.reporterLocate(item)
        }
        var parent = div.childNodes
        if (parent[3] && parent[3].childNodes) {
          var childs = parent[3].childNodes
          // 关闭
          childs[9].onclick = function (e) {
            e.stopPropagation()
            var doms = document.getElementsByClassName('member-wrap show-detail')
            for (let i = 0; i < doms.length; i += doms.length) {
              doms[i].className = 'member-wrap'
            }
            var dom = e.target.parentNode.parentNode
            dom.className = 'member-wrap hide-detail'
          }
          // 语音
          childs[11].onclick = function () {
            _this.callaudio(item)
          }
          // 视频
          childs[13].onclick = function () {
            _this.callvideo(item)
          }
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
      this.isOpen = false
      this.getReporter()
      this.callInfo = reporter
      this.callType = 'audio'
      this.callShow = true
    },
    callvideo (reporter) {
      this.isOpen = false
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
@import "src/styles/index.scss";
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
.lishui-workcallmap-container1 {
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
          width: pxrem(1300px);
          padding: pxem(70px);
          position: relative;
          background: #0157AF;
          .shouqi{
            cursor: pointer;
            width: pxrem(120px);
            height: 100%;
            position: absolute;
            top: 0;
            left: pxrem(-100px);
            background-image: url("./assets/unopen.png");
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
          }
          .zhankai{
            cursor: pointer;
            width: pxrem(120px);
            height: 100%;
            position: absolute;
            top: 0;
            left: pxrem(-100px);
            background-image: url("./assets/isopen.png");
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
          }
          .reporter-list-content{
            height: 100%;
            overflow: scroll;
          }
          .reporter-list {
            cursor: pointer;
            position: relative;
            height: pxem(300px);
            padding: pxem(50px);
            margin-bottom: pxem(50px);
            background-color: #02499F;
            &:hover {
              background-color: #056BE8;
            }
            .avatar {
              width: pxrem(190px);
              height: pxrem(190px);
              overflow: hidden;
              border:1px solid rgba(255,255,255,1);
              margin-right: pxrem(39px);
              object-fit: cover;
            }
            .info {
              height: 100%;
              flex-direction: column;
              text-align: left;
              .name {
                font-size: pxrem(70px);
                font-family:PingFang SC;
                font-weight: 700;
                color: rgba(255, 255, 255, 1);
                margin-bottom: 0.05rem;
              }
              .depart {
                font-size: pxrem(48px);
                font-family: PingFangSC-Light;
                font-weight: 400;
                color: #64C7FF;
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
                &:hover{
                  background-image: url("./assets/audio-hover.png");
                }
              }
              &.connect-video {
                background-image: url("./assets/video.png");
                &:hover{
                  background-image: url("./assets/video-hover.png");
                }
              }
            }
          }
        }
        .hide-list{
          width: 0%;
          padding: 0;
        }
      }
    }
  }
  /*
    标注
  */
  .member-wrap{
    width: 2.4rem;
    height: 1.9rem;
    border-radius: 0.07rem;
    position: absolute;
    padding: 0.2rem;
    font-size: 0.25rem;
    color: #fff;
    .member-avatar{
      width: pxrem(200px);
      height: pxrem(200px);
      border-radius: 50%;
      margin-right: 0.12rem;
      overflow: hidden;
    }
    .avatar-wrap{
      width: pxrem(250px);
      height: pxrem(320px);
      background-repeat: no-repeat;
      background-image: url("./assets/lo.png");
      background-size: 100%;
      position: relative;
      img{
        border-radius: 50%;
        position: absolute;
        width: pxrem(154px);
        height: pxrem(154px);
        top: pxrem(20px);
        left: pxrem(50px);
        overflow: hidden;
      }
    }
    .wrap{
      padding: pxrem(45px) pxrem(145px);
      top: pxrem(-209px);
      left: pxrem(300px);
      position: absolute;
      display: none;
      width: pxrem(1607px);
      height: pxrem(800px);
      background-image: url("./assets/reporter-bg.png");
      background-size: 100%;
      overflow: hidden;
    }
  }
  .show-detail{
    .wrap{
      display: block;
      .member-info{
        font-size: pxrem(84px);
        font-weight: 600;
        margin-bottom: pxrem(60px);
        .status{
          font-size: pxrem(52px);
          color: #92D7FF;
        }
      }
      .other-info{
        font-size: pxrem(58px)!important;
        margin: 0 0 pxrem(15px) pxrem(40px);
      }
      .icon-item{
        display: inline-block;
        margin-right: pxrem(32px);
      }
      .lo-icon{
        width: pxrem(42px);
        height: pxrem(53px);
        background-image: url("./assets/lo-icon.png");
        background-size: 100%;
      }
      .org-icon{
        width: pxrem(50px);
        height: pxrem(48px);
        background-image: url("./assets/org-icon.png");
        background-size: 100%;
      }
      .time-icon{
        width: pxrem(47px);
        height: pxrem(48px);
        background-image: url("./assets/time-icon.png");
        background-size: 100%;
      }
      .audio{
        position: absolute;
        bottom: pxrem(50px);
        left: pxrem(182px);
        width: pxrem(520px);
        height: pxrem(130px);
        cursor: pointer;
        background-size: 100% 100%;
        background-image: url("./assets/audiocall.png");
      }
      .video{
        position: absolute;
        bottom: pxrem(50px);
        left: pxrem(762px);
        width: pxrem(520px);
        height: pxrem(130px);
        cursor: pointer;
        background-size: 100% 100%;
        background-image: url("./assets/videocall.png");
      }
      .close{
        font-weight: bold;
        position: absolute;
        right: 0.25rem;
        top: 0.2rem;
        width: pxrem(46px);
        height: pxrem(46px);
        background-size: 100% 100%;
        background-image: url("./assets/close-icon.png");
      }
    }
  }
}
</style>

<template>
  <div class="common01-civilizationrank-js" id="civilizationrank">
    <div class="dispatchrank-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '数据统计'}}</div>
      <div class="title-tab sys-flex">
          <div class="item">
            <div>
              <h4>志愿服务总时长(时)</h4>
              <p>{{timeTotalNum}}</p>
            </div>
          </div>
          <div class="item">
              <div>
                <h4>服务队总数(个)</h4>
                <p>{{teamTotalNum}}</p>
              </div>
          </div>
          <div class="item">
              <div>
                <h4>志愿者总数(人)</h4>
                <p>{{memberTotalNum}}</p>
              </div>
          </div>
      </div>
      <div class="civilizationrank_content">
        <chart class="civilizationrank_static" :options="pieOpt" :autoResize="true"></chart>
        <div class="static_tab">
          <div class="btn" :class="{act: type === 'area'}" @click="type = 'area'">服务区域</div>
          <div class="btn" :class="{act: type === 'age'}" @click="type = 'age'">年龄</div>
          <div class="btn" :class="{act: type === 'political'}" @click="type = 'political'">政治面貌</div>
          <div class="btn" :class="{act: type === 'service_type'}" @click="type = 'service_type'">服务领域</div>
        </div>
      </div>
      <!-- <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left sys-flex-one">
          <div class="title">志愿组织排行<span class="unit">(时长/h)</span></div>
          <div class="item-list sys-flex sys-flex-center animated flipInX" v-for="(v, k) in leftList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2}"><div>{{k + (pageNum - 1) * count + 1}}</div></div>
            <div class="img-box">
              <div>
                <img :src="v.head_pic?v.head_pic:defaultImg" alt="">  
              </div>
            </div>
            <div class="title common01-ft38 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.duration}}</span>h</div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="title">志愿者排行<span class="unit">(时长/h)</span></div>
          <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in rightList" :key="k" :class="{'flipInX' : v.real_name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2}"><div>{{k + (pageNum - 1) * count + 1}}</div></div>
            <div class="img-box">
              <div>
                <img :src="v.head_pic?v.head_pic:defaultImg" alt="">
              </div>
            </div>
            <div class="title common01-ft38 overhidden" :style="setFontSize(50)">{{v.real_name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)"><span class="common01-ft60" :style="setFontSize(65)">{{v.duration}}</span>h</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getJSstaticList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
export default {
  name: 'civilizationRank',
  data () {
    return {
      defaultImg: require('../../../../assets/avatar/touxiang.png'),
      timeTotalNum: 0,
      teamTotalNum: 0,
      memberTotalNum: 0,
      // leftCount: 0,
      // rightCount: 0,
      pieOpt: {},
      type: 'area',
      pageNum: 1,
      count: 3,
      frequency: 10000,
      leftList: [],
      rightList: [],
      customSize: false,
      staticData: []
    }
  },
  components: {
    chart: echarts
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    // this.getVolunteerRank()
    this.getStaticList()
    // setInterval(() => {
    //   if (this.pageNum >= 3) {
    //     this.pageNum = 1
    //   } else {
    //     this.pageNum += 1
    //   }
    //   this.leftList = []
    //   this.rightList = []
    //   this.getVolunteerRank()
    // }, this.frequency)
  },
  watch: {
    type () {
      this.getStaticList()
    }
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    echartRemSize (res) {
      let clientWidth = document.getElementById('civilizationrank').clientWidth
      if (!clientWidth) return
      let fontSize = 100 * (clientWidth / 1920)
      return res * fontSize
    },
    getStaticList () {
      getJSstaticList({ params: { mark: this.type } }).then(res => {
        let _result = res.data.result
        this.timeTotalNum = _result.statistics.service_time
        this.teamTotalNum = _result.statistics.organize_num
        this.memberTotalNum = _result.statistics.volunteer_num
        this.staticData = []
        _result.market_data.forEach(val => {
          this.staticData.push({
            name: val.title,
            value: val.volunteer_num
          })
        })
        // this.staticData = _result.market_data
        this.pieOpt = {
          // color: ['#ce4272', '#0554f5', '#f3972e', '#008aed', '#14da7d'],
          textStyle: {
            color: '#fff'
          },
          series: [
            {
              name: '任务统计',
              type: 'pie',
              center: ['50%', '50%'],
              radius: '75%',
              avoidLabelOverlap: true,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}:{d}%  {c}人',
                  textStyle: {
                    color: 'rgba(214, 230, 255)',
                    fontSize: this.echartRemSize(0.25),
                    fontWeight: 'bold'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: this.echartRemSize(0.28),
                    fontWeight: 'bold',
                    color: 'rgba(255, 255, 255)'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: this.echartRemSize(0.2), // 指示线宽度
                  length2: this.echartRemSize(0.7),
                  lineStyle: {
                    width: 2,
                    color: '#03F6FF' // 指示线颜色
                  }
                }
              },
              data: this.staticData
            }
          ]
        }
      })
    }
    // getVolunteerRank (type) {
    //   getVolunteerRank(this.pageNum, this.count).then(res => {
    //     if (!res.data.error_code) {
    //       let _result = res.data.result
    //       if (_result.volunteerRank.data) {
    //         this.rightList = _result.volunteerRank.data
    //       }
    //       if (_result.organizeRank.data) {
    //         this.leftList = _result.organizeRank.data
    //       }
    //       this.timeTotalNum = _result.duration
    //       this.teamTotalNum = _result.organize_number
    //       this.memberTotalNum = _result.volunteer_number
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-civilizationrank-js {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  *{
    font-family:'SourceHanSansSC-Medium';
  }
  .dispatchrank-wrap {
    padding: pxrem(154px) pxrem(70px) pxrem(61px) pxrem(70px);
    color: #fff;
    .civilizationrank_content{
      height: calc(100% - 1.1rem);
      padding: 0.474rem 0;
      display: flex;
      .civilizationrank_static{
        flex: 1
      }
      .static_tab{
        display: flex;
        flex-direction: column;
        .btn {
          font-size: 0.285rem;
          margin-bottom: 0.395rem;
          width: 2.21rem;
          height: 0.743rem;
          line-height: 0.743rem;
          text-align: center;
          font-weight: bold;
          color: #fff;
          background: url("./assets/rectangle.png") no-repeat center;
          background-size: 100%;
        }
        .btn.act {
          background: url("./assets/rectangle_pre.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
    .common01-title {
        font-family: 'SourceHanSansSC-Medium';
        top: pxrem(53px);
        height: pxrem(56px);
        font-weight: 600;
        line-height: 1;
        text-shadow:0px 16px 16px rgba(7,222,255,0.2);
    }
    .title-tab {
      width: 100%;
      padding-bottom: pxrem(8px);
      .item {
        flex: 1;
        position: relative;
        font-size: pxrem(36px);
        background: rgba(13, 99, 223, 0.15);
        height: pxrem(160px);
        box-sizing: border-box;
        >div{
          display: inline-block;
          height:pxrem(35px);
          font-size:pxrem(36px);
          color:rgba(255,255,255,1);
          line-height:1;
          margin-top: pxrem(31px);
          >p{
            text-align: left;
            font-size: pxrem(50px);
            margin-top: pxrem(20px);
            color: #00C0FF;
            font-weight: bold;
            letter-spacing: pxrem(3px);
          }  
        }  
      }
      >.item:not(:last-child)::after{
        display: block;
        content: '';
        width:pxrem(3px);
        height:pxrem(100px);
        background:linear-gradient(90deg,rgba(64,107,173,0) 0%,rgba(64,107,173,0.99) 48%,rgba(64,107,173,0) 100%);
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .wrap-content {
      .content-left {
        .item-list {
          margin-right: pxrem(40px);
          // width: pxrem(900px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-right {
        .item-list {
          width: pxrem(760px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-left>div.title, .content-right>div.title {
        text-align: left;
        font-size: pxrem(38px);
        height: pxrem(38px);
        line-height: 1;
        margin: pxrem(39px) 0 pxrem(30px);
        .unit {font-size: pxrem(30px);}
      }
      .item-list {
        height: pxrem(140px);
        background: url("./assets/back.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0 pxrem(60px) 0 pxrem(50px);
        margin-bottom: pxrem(50px);
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("./assets/one.png");
          }
          &.two {
            background-image: url("./assets/three.png");
          }
          &.three {
            background-image: url("./assets/two.png");
          }
          &.four {
            background-image: url("./assets/four.png");
          }
          >div{
            width: pxrem(60px);
            height: pxrem(60px);
          }
        }
        .img-box{
          width: pxrem(170px);
          height: pxrem(88px);
          padding-left: pxrem(57px);
          padding-right: pxrem(25px);
          >div{
            width: pxrem(88px);
            height: pxrem(88px);
            border-radius: 50%;
            overflow: hidden;
            >img{
              width: 100%;
              height: 100%;
            }
          }
        }
        >.title {
          text-align: left;
          width: pxrem(357px);
          line-height: 1;
          margin: pxrem(50px) 0 pxrem(52px);
        }
        .num {
          margin-left: auto;
          color: #00FCFF;
          font-weight: 600;
          word-break: keep-all;
        }
      }
    }
  }
}
</style>

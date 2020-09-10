<template>
  <div class="common01-message" id="common01-message">
    <div class="message-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '消息汇总'}}</div>
      <div class="count-wrap">
        <div class="count-item flex flex-center">
          <span class="count-title common01-ft40">消息总数</span>
          <span class="count">{{totalmessage.messages_count || 0}}</span>
        </div>
        <div class="count-item flex flex-center">
          <span class="count-title common01-ft40">参与人数</span>
          <span class="count">{{totalmessage.participators_count || 0}}</span>
        </div>
        <div class="count-item flex flex-center">
          <span class="count-title common01-ft40">人均消息数</span>
          <span class="count" v-if="totalmessage">{{Math.ceil(totalmessage.messages_count / (totalmessage.participators_count === 0 ? 1 : totalmessage.participators_count))}}</span>
          <span class="count" v-else>0</span>
        </div>
      </div>
      <div class="chart flex flex-one">
        <div class="source-wrap">
          <div class="message-label flex flex-center common01-ft40"><div class="message-icon"></div>消息来源</div>
          <chart class="pie-chart" v-if="pieOptions" :options="pieOptions" :autoResize="true"></chart>
        </div>
        <div class="flex-one">
          <div class="message-label flex flex-center common01-ft40"><div class="message-icon"></div>消息类型</div>
          <div class="mt20 flex flex-center type-wrap">
            <div v-for="(item, index) in typeList" class="pie-chart-type">
              <chart v-if="item.opt" :options="item.opt" :autoResize="true"></chart>
              <div class="label-wrap">
                <div class="label-value">{{Math.ceil(item.value / typeTotal * 100)}}%</div><div class="label-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSoundBeansMessagesCount, getSoundBeansAllProgramMonitor, getM2OPlusChannelList } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
export default {
  props: {
    screenConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      multiple: 1,
      typeTotal: 0,
      pieOptions: '',
      pieOptionsType: '',
      typeList: [],
      pieOptions0: '',
      pieOptions1: '',
      pieOptions2: '',
      pieOptions3: '',
      pieOptions4: '',
      pieOptions5: '',
      channelId: '11',
      totalmessage: ''
    }
  },
  mounted () {
    this.setFontsize('common01-message')
    if (!isNaN(+this.screenConfig.multiple) && +this.screenConfig.multiple !== 0) {
      this.multiple = +this.screenConfig.multiple
    }
    this.initCharts2()
    this.initData()
  },
  methods: {
    initData () {
      getM2OPlusChannelList(this.currentViewId).then(res => {
        if (res.data && res.data.result && res.data.result[0]) {
          this.channelId = res.data.result[0].id
        }
        getSoundBeansMessagesCount(this.channelId, this.currentViewId).then(res => {
          if (res && res.data && res.data.result) {
            this.totalmessage = res.data.result || {}
          }
        })
        getSoundBeansAllProgramMonitor(this.channelId, this.currentViewId).then(res => {
          let result = res.data.result
          // 消息来源
          if (result.messages_source_count) {
            this.initCharts1(result.messages_source_count)
          }
          // 消息类型
          if (result.messages_source_distribution) {
            this.typeList = [{
              name: '文本',
              value: result.messages_source_distribution.messages_text_count || 0,
              opt: ''
            }, {
              name: '图片',
              value: result.messages_source_distribution.messages_unknown_count || 0,
              opt: ''
            }, {
              name: '视频',
              value: result.messages_source_distribution.messages_video_count || 0,
              opt: ''
            }, {
              name: '语音',
              value: result.messages_source_distribution.messages_voice_count || 0,
              opt: ''
            }, {
              name: '位置',
              value: result.messages_source_distribution.messages_location_count || 0,
              opt: ''
            }, {
              name: '链接',
              value: result.messages_source_distribution.messages_link_count || 0,
              opt: ''
            }]
          }
          this.initTypes()
        })
      })
    },
    initCharts1 (result) {
      this.pieOptions = {
        color: ['#0066FF', '#E88559', '#44CF98'],
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 12 * this.multiple
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          icon: 'rect',
          itemWidth: 25 * this.multiple,
          itemHeight: 25 * this.multiple,
          itemGap: 20 * this.multiple,
          textStyle: {
            color: '#fff',
            fontSize: 25 * this.multiple
          },
          formatter: (name) => {
            let data = this.pieOptions.series[0].data
            let total = 0
            let tarValue = 0
            data.forEach(item => {
              total += +item.value
              if (item.name === name) {
                tarValue = item.value
              }
            })
            if (total === 0) {
              total = 1
            }
            let p = Math.ceil(tarValue / total * 100)
            // 没数据默认 0%
            return ` ${name}：    ${p}%    ${tarValue}条`
          },
          data: ['微博', '微信', 'H5']
        },
        series: [
          {
            name: '发布渠道占比',
            type: 'pie',
            center: ['50%', '35%'],
            radius: ['40%', '60%'],
            minAngle: 5,
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{per|{d}%}\n{name|{b}}',
                rich: {
                  name: {
                    color: '#fff',
                    fontSize: 25 * this.multiple,
                    padding: [5 * this.multiple, 0, 0, 0],
                    align: 'center'
                  },
                  per: {
                    color: '#fff',
                    fontSize: 37 * this.multiple,
                    fontWeight: 'bold',
                    align: 'center'
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 30 * this.multiple,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 10 * this.multiple,
                length2: 10 * this.multiple
              }
            },
            data: [{
              name: '微博', value: result.messages_weibo_count || 0
            }, {
              name: '微信', value: result.messages_weixin_count || 0
            }, {
              name: 'H5', value: result.messages_h5_count || 0
            }]
          }
        ]
      }
    },
    initCharts2 () {
      this.pieOptionsType = {
        series: [
          {
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            center: ['50%', '50%'],
            radius: ['55%', '75%'],
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
    },
    initTypes () {
      this.typeTotal = 0
      this.typeList.forEach(item => {
        this.typeTotal += item.value
      })
      if (this.typeTotal === 0) {
        this.typeTotal = 1
      }
      this.typeList.forEach(item => {
        let opt = JSON.parse(JSON.stringify(this.pieOptionsType))
        let data = opt.series[0].data
        data[0].value = this.typeTotal // 没数据默认 0%
        data[1].value = item.value
        data[1].name = item.name
        item.opt = opt
      })
    }
  },
  components: {
    chart: echarts
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-message{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  font-family:PingFang SC;
  .message-wrap{
    padding: pxrem(194px) pxrem(122px) pxrem(80px) pxrem(122px);
  }
  .count-wrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: pxrem(60px);
    .count-item{
      width: pxrem(460px);
      height: pxrem(100px);
      background: url('./assets/title-bg.png');
      background-size: 100%;
      padding: 0 pxrem(33px);
      margin-right: pxrem(90px);
      &:last-child{
        margin-right: 0;
      }
      .count-title{
        color: #fff;
        font-size: pxrem(34px);
        margin-right: pxrem(38px);
      }
      .count{
        color: #0CFFF6;
        font-weight: 700;
        font-size: pxrem(54px);
      }
    }
  }
  .chart{
    .message-label{
      color: #49F1DF;
      font-size: pxrem(36px);
      .message-icon{
        width: pxrem(36px);
        height: pxrem(33px);
        background: url('./assets/tip.png');
        background-size: 100%;
        margin-right: pxrem(12px);
      }
    }
    .pie-chart{
      width: 80%!important;
      height: pxrem(500px)!important;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
    .pie-chart-type{
      position: relative;
      width: pxrem(250px)!important;
      height: pxrem(250px)!important;
      margin-right: pxrem(100px);
      &:nth-child(3n){
        margin-right: 0;
      }
      .echarts {
        width: 100%;
        height: 100%;
      }
      .label-wrap{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 33%;
        left: calc( 50% - 50px );
        text-align: center;
        color: #fff;
        .label-value{
          font-size: pxrem(44px);
        }
        .label-name{
          font-size: pxrem(30px);
        }
      }
    }
    .source-wrap{
      width: pxrem(560px);
    }
    .type-wrap{
      flex-wrap: wrap;
    }
  }
}
</style>

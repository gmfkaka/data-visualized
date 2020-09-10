<template>
  <div class="jn-publish">
    <div class="publish-wrap">
      <div class="wrap-title">传播分析</div>
      <div class="wrap-content sys-flex sys-flex-center">
        <div class="content-left">
          <div class="left-total positionAb">
            <div>{{total}}</div>
            <div>总用户数</div>
          </div>
          <chart v-if="initFinished" :options="pieOption" :autoResize="true"></chart>
        </div>
        <div class="content-right">
          <div class="right-list" v-for="(v, k) in dataList" :key="k">
            <div class="title"><span :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four': k === 3}"></span>{{v.name}}</div>
            <div class="num">{{v.value}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOperationalData } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
export default {
  name: 'publish',
  data () {
    return {
      initFinished: false,
      config: {
        app: '无线江宁APP',
        shortVideo: '短视频',
        weChat: '微信',
        weiBo: '微博'
      },
      total: 0,
      onePercent: 0,
      twoPercent: 0,
      threePercent: 0,
      fourPercent: 0,
      currentIndex: -1,
      dataList: [],
      // 数据
      pieOption: {
        tooltip: {
          // 设置悬停出现的弹框样式
          trigger: 'item',
          formatter: '{d}% \n {b}'
        },
        series: [
          {
            startAngle: 240,
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: '{per|{d}%}\n\n{name|{b}}',
                rich: {
                  name: {
                    fontSize: 20,
                    align: 'center'
                  },
                  per: {
                    fontSize: 30,
                    fontWeight: 'bold',
                    align: 'center'
                  }
                }
              },
              position: 'top'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [],
            itemStyle: {
              normal: {
                // 设置饼图间隔
                borderColor: '#000f31',
                borderWidth: 12,
                color: function (params) {
                  // 随机设置柱子的颜色
                  var colorList = ['#E8854A', '#2684FA', '#DE4646', '#1AC8C6']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.getOperationalData()
    setInterval(() => {
      this.getOperationalData()
    }, 60000)
  },
  methods: {
    getOperationalData () {
      this.initFinished = false
      getOperationalData().then(res => {
        this.dataList = []
        this.total = 0
        let data = res.data.result
        if (data) {
          for (let key in data) {
            let item = {
              name: this.config[key],
              value: data[key].cumulate_user
            }
            this.dataList.push(item)
            this.total += item.value
          }
          this.dataList = this.dataList.sort((a, b) => {
            return b.value - a.value
          })
          this.pieOption.series[0].data = this.dataList
        }
        this.initFinished = true
      }).catch(rej => {
        this.initFinished = true
      })
    },
    GetPercent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    }
  },
  mounted () {
    // setInterval(() => {
    //   var dataLen = this.pieOption.series[0].data.length
    //   // 取消之前高亮的图形
    //   echarts.dispatchAction({
    //     type: 'downplay',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    //   this.currentIndex = (this.currentIndex + 1) % dataLen
    //   // 高亮当前图形
    //   echarts.dispatchAction({
    //     type: 'highlight',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    //   // 显示 tooltip
    //   echarts.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: 0,
    //     dataIndex: this.currentIndex
    //   })
    // }, 1000)
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-publish {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .publish-wrap {
    width: 100%;
    height: 100%;
    background: url("../../../../assets/common/border@2x.png") no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(52px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      width: 100%;
      height: pxrem(680px);
      margin-top: pxrem(140px);
      .content-left {
        width: 80%;
        height: 100%;
        position: relative;
        .positionAb {
          position: absolute;
          div:first-of-type {
            font-size: pxrem(62px);
            font-weight: bold;
            margin-bottom: pxrem(10px);
          }
          div:last-of-type {
            font-size: pxrem(36px);
          }
        }
        .left-one {
          top: pxrem(80px);
          left: pxrem(180px);
        }
        .left-two {
          top: pxrem(80px);
          right: pxrem(180px);
        }
        .left-three {
          bottom: pxrem(80px);
          left: pxrem(180px);
        }
        .left-four {
          bottom: pxrem(80px);
          right: pxrem(180px);
        }
        .left-total {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .content-right {
        width: 20%;
        .right-list {
          font-size: pxrem(42px);
          text-align: left;
          margin-bottom: pxrem(60px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .title {
            span {
              display: inline-block;
              width: pxrem(24px);
              height: pxrem(24px);
              border-radius: 50%;
              margin-right: pxrem(15px);
              &.one {
                background-color: #E8854A;
              }
              &.two {
                background-color: #2684FA;
              }
              &.three {
                background-color: #DE4646;
              }
              &.four {
                background-color: #1AC8C6;
              }
            }
          }
          .num {
            padding: pxrem(10px) 0 0 pxrem(35px);
          }
        }
      }
    }
  }
}
</style>

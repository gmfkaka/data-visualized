<template>
  <div class="jn-news">
    <div class="news-wrap">
      <div class="wrap-title">稿件统计</div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left">
          <div class="left-title sys-flex sys-flex-center flex-justify-center">本周稿件总数<span>{{total}}</span></div>
          <div class="left-one sys-flex sys-flex-center flex-justify-between">
            <div class="pass">
              <div>已提审</div>
              <div>{{pass}}</div>
            </div>
            <div class="examine">
              <div>待审核</div>
              <div>{{edit}}</div>
            </div>
            <div class="publish">
              <div>已发布</div>
              <div>{{publish}}</div>
            </div>
          </div>
          <div class="left-two sys-flex sys-flex-center flex-justify-between">
            <div class="two-progress">
              <div class="percent">{{passPersent}}%</div>
              <div class="progress-total">
                <span class="progress on-progress" :style="{'width' : passPersent + '%'}"></span>
              </div>
              <div class="article">稿件通过率</div>
            </div>
            <div class="two-progress">
              <div class="percent">{{publishPersent}}%</div>
              <div class="progress-total">
                <span class="progress on-progress" :style="{'width' : publishPersent + '%'}"></span>
              </div>
              <div class="article">稿件发布率</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="date sys-flex sys-flex-center flex-justify-between">
            <div class="day" v-for="(v, k) in dayList" :key="k" :class="{'active': k === currentIndex}">{{v}}</div>
          </div>
          <div class="publish-article">已发布稿件<span>{{publishTotal}}</span></div>
          <div class="line">
            <chart :options="barOptions" :autoResize="true"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallSubjectPie } from '@/servers/interface'
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
export default {
  name: 'news',
  data () {
    return {
      publishTotal: 0,
      total: 0,
      pass: 0,
      edit: 0,
      publish: 0,
      passPersent: '',
      publishPersent: '',
      model: 'd',
      currentIndex: 0,
      dayList: ['今日', '本周', '本月'],
      barOptions: {
        grid: {
          left: '18%'
        },
        xAxis: {
          type: 'category',
          data: ['已提审', '待审核', '已发布'],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 0.5,
              opacity: 0.5,
              type: 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold'
          }
        },
        series: [{
          type: 'bar',
          barWidth: 80,
          itemStyle: {
            normal: {
              // 颜色渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#3FB0FF'
              }, {
                offset: 1,
                color: '#003CFF'
              }])
            }
          },
          data: []
        }]
      }
    }
  },
  created () {
    this.getTotal()
    this.getWorkCallSubjectPie()
  },
  methods: {
    GetPercent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00)
    },
    getWorkCallSubjectPie () {
      getWorkCallSubjectPie(this.model).then(res => {
        if (res && res.data && res.data.result) {
          this.publishTotal = res.data.result.publish
          this.barOptions.series[0].data = [res.data.result.create, res.data.result.audit, res.data.result.publish]
        }
      })
    },
    getTotal () {
      getWorkCallSubjectPie('w').then(res => {
        if (res && res.data && res.data.result) {
          this.total = res.data.result.create + res.data.result.audit + res.data.result.publish
          this.pass = res.data.result.create
          this.edit = res.data.result.audit
          this.publish = res.data.result.publish
          this.passPersent = this.GetPercent(this.pass, this.total)
          this.publishPersent = this.GetPercent(this.publish, this.total)
        }
      })
    }
  },
  mounted () {
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.dayList.length) {
        this.currentIndex = 0
      }
      if (this.currentIndex === 0) {
        this.model = 'd'
        this.getWorkCallSubjectPie()
      } else if (this.currentIndex === 1) {
        this.model = 'w'
        this.getWorkCallSubjectPie()
      } else if (this.currentIndex === 2) {
        this.model = 'm'
        this.getWorkCallSubjectPie()
      }
    }, 10000)
  },
  components: {
    chart: echarts
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-news {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .news-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(52px);
      font-weight: 600;
      margin-top: pxrem(-16px);
      margin-bottom: pxrem(40px);
    }
    .wrap-content {
      .content-left {
        width: pxrem(820px);
        .left-title {
          width: 100%;
          height: pxrem(160px);
          background-color: #0B295E;
          font-size: pxrem(42px);
          span {
            font-size: pxrem(62px);
            color: #FF3C3C;
            margin-left: pxrem(39px);
          }
        }
        .left-one {
          width: 100%;
          height: pxrem(325px);
          background-color: #0B204C;
          font-size: pxrem(36px);
          border-bottom: 1px solid #fff;
          padding: 0 pxrem(87px) 0 pxrem(75px);
          .pass {
            div:last-of-type {
              color: #00F6FF;
              font-size: pxrem(58px);
              margin-top: pxrem(8px);
            }
          }
          .examine {
            div:last-of-type {
              color: #2684FA;
              font-size: pxrem(58px);
              margin-top: pxrem(8px);
            }
          }
          .publish {
            div:last-of-type {
              color: #FF9A02;
              font-size: pxrem(58px);
              margin-top: pxrem(8px);
            }
          }
        }
        .left-two {
          width: 100%;
          height: pxrem(334px);
          background-color: #0B204C;
          padding: 0 pxrem(87px) 0 pxrem(75px);
          .two-progress {
            .percent {
              font-size: pxrem(62px);
              color: #00F6FF;
            }
            .progress-total {
              width: pxrem(240px);
              height: pxrem(20px);
              background: RGBA(68, 97, 115, 1);
              border-radius: pxrem(10px);
              overflow: hidden;
              margin: pxrem(20px) 0;
              .progress {
                display: block;
                height: 100%;
                border-radius: pxrem(10px);
                &.on-progress {
                  background: -webkit-linear-gradient(left, #0272ff, #80bfff);
                  background: -o-linear-gradient(right, #0272ff, #80bfff);
                  background: -moz-linear-gradient(right, #0272ff, #80bfff);
                  background: linear-gradient(to right, #0272ff, #80bfff);
                }
                &.on-stop {
                  background: #ff3366;
                }
                &.on-done {
                  background: -webkit-linear-gradient(left, #09de74, #2ff6c5);
                  background: -o-linear-gradient(right, #09de74, #2ff6c5);
                  background: -moz-linear-gradient(right, #09de74, #2ff6c5);
                  background: linear-gradient(to right, #09de74, #2ff6c5);
                }
              }
            }
            .article {
              font-size: pxrem(36px);
            }
          }
        }
      }
      .content-right {
        width: 50%;
        .date {
          padding: 0 pxrem(80px);
          .day {
            width: pxrem(140px);
            height: pxrem(60px);
            border-radius: pxrem(8px);
            background-color: #2684FA;
            font-size: pxrem(36px);
            line-height: pxrem(60px);
            &.active {
              background-color: #FF9A02;
            }
          }
        }
        .publish-article {
          font-size: pxrem(36px);
          span {
            color: #00FF9C;
            font-size: pxrem(58px);
            margin-left: pxrem(25px);
          }
          margin: pxrem(30px) 0 pxrem(20px);
        }
        .line {
          width: 100%;
          height: pxrem(670px);
        }
      }
    }
  }
}
</style>
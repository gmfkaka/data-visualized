<template>
  <div class="jn-report">
    <div class="report-wrap">
      <div class="wrap-title">报题展示</div>
      <div class="wrap-content">
        <div class="content-total sys-flex sys-flex-center flex-justify-between">
          <div class="total-left">今日报题<span>{{total}}</span>篇</div>
          <div class="total-right">通过<span>{{pass}}</span>篇，待审核<span>{{edit}}</span>篇，打回<span>{{reject}}</span>篇</div>
        </div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
            <div class="status" :class="{'one': v.audit_status === '0', 'two': v.audit_status === '1', 'three': v.audit_status === '2', 'four': v.audit_status === '4'}">{{v.audit_status === '0' ? '待审核' : v.audit_status === '1' ? '通过' : v.audit_status === '2' ? '打回' : '报审'}}</div>
            <div class="title overhidden">{{v.title}}</div>
            <div class="name">{{v.create_user_name}}</div>
            <div class="time">{{v.create_time | format}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getJnWorkCallReportList, getJnReport } from '@/servers/interface'
export default {
  name: 'report',
  data () {
    return {
      total: 0,
      pass: 0,
      edit: 0,
      reject: 0,
      count: 10,
      page: 1,
      dataList: []
    }
  },
  filters: {
    format: inputTime => {
      inputTime = parseInt(inputTime) * 1000
      var date = new Date(inputTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      var time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      return time.slice(5, 16)
    }
  },
  created () {
    this.getJnWorkCallReportList()
    this.getJnReport()
    setInterval(() => {
      this.getJnWorkCallReportList()
      this.getJnReport()
    }, 10000)
  },
  methods: {
    getJnWorkCallReportList () {
      getJnWorkCallReportList(this.count, this.page, 1).then(res => {
        if (!res.data.error_code) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = res.data.result.data
          }, 100)
          if (res.data.result.data.length < 10 || this.page > 1) {
            this.page = 1
          } else {
            this.page += 1
          }
        }
      })
    },
    getJnReport () {
      getJnReport().then(res => {
        this.total = res.data.result.total
        this.pass = res.data.result.num_status[1].total
        this.edit = res.data.result.num_status[0].total
        this.reject = res.data.result.num_status[2].total
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-report {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .report-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(20px) pxrem(100px) pxrem(5px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(52px);
      font-weight: 600;
      margin-top: pxrem(-12px);
    }
    .wrap-content {
      .content-total {
        font-size: pxrem(38px);
        text-align: left;
        margin-bottom: pxrem(10px);
        padding-left: pxrem(20px);
        span {
          font-size: pxrem(52px);
          font-weight: 600;
          color: #00F6FF;
          margin: 0 pxrem(8px);
        }
      }
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(80px);
          border-bottom: pxrem(4px) dashed #2A5EBA;
          margin-bottom: pxrem(8px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .status {
            width: pxrem(130px);
            height: pxrem(52px);
            line-height: pxrem(52px);
            font-size: pxrem(30px);
            border-radius: pxrem(5px);
            &.one {
              background-color: #2684FA;
            }
            &.two {
              background-color: #1AC8C6;
            }
            &.three {
              background-color: #DE4646;
            }
            &.four {
              background-color: #FF9A02;
            }
          }
          .title {
            text-align: left;
            width: 50%;
            font-size: pxrem(38px);
            margin: 0 pxrem(135px) 0 pxrem(33px);
          }
          .name {
            font-size: pxrem(34px);
            color: #00F6FF;
          }
          .time {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>

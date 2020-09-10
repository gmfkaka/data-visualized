<template>
  <div class="ls-report" id="ls-report">
    <div class="report-wrap">
      <div class="report-list-wrap sys-flex sys-flex-wrap flex-justify-between">
        <div class="report-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v,k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="report-status">
            <span v-if="v.audit_status==2" class="reject"></span>
            <span v-if="v.audit_status==1" class="pass"></span>
            <span v-if="v.audit_status==0" class="review"></span>
            <span v-if="v.audit_status==4" class="baoshen"></span>
          </div>
          <div class="report-title overhidden">{{v.title}}</div>
          <div class="report-user">{{v.project_user_name}}</div>
          <div class="report-time">{{v.update_time | dateFormat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkCallReportList } from '@/servers/interface'
export default {
  name: 'report',
  data () {
    return {
      dataList: [],
      count: 10,
      page: 1,
      isPaging: true,
      frequency: 15000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('ls-report')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getWorkCallReportList(this.count, this.page, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.ls-report {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  background-color: #121D58;
  .report-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    background-color: #0F1C46;
    .report-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
  }
  .report-list{
    color : #fff;
    width: 48%;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .report-status{
      width: pxrem(130px);
      height: pxrem(52px);
      text-align: center;
      span{
        display: block;
        margin : 0 auto;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
        border-radius: 0.025rem;
        &.pass{
          background: url('./assets/pass.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.reject{
          background: url('./assets/reject.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.review{
          background: url('./assets/review.png') no-repeat center center;
          background-size: 100% 100%;
        }
        &.baoshen{
          background: url('./assets/submit.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
    .report-title{
      flex: 1;
      font-size: pxrem(38px);
      margin-left: pxrem(24px);
      text-align: left;
    }
    .report-user{
      width: 10%;
      margin-left: pxrem(40px);
      font-size: pxrem(32px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0,246,255,1);
    }
    .report-time{
      width: 20%;
      font-size: pxrem(32px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0,246,255,1);
    }
  }
}
</style>

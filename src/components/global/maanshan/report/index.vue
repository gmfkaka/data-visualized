<template>
  <div class="maanshan-report" id="maanshan-report">
    <div class="report-wrap sys-flex sys-vertical" >
      <div class="report-title sys-flex sys-flex-center">{{componentTitle}}</div>
      <div
        class="report-list animated sys-flex sys-flex-center"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div 
          class="list-icon"
          :class="{'bgback': v.audit_status !== '1', 'bgpass': v.audit_status === '1'}"
        ></div>
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user overhidden">{{v.project_user_name}}</div>
        <div class="list-time">{{v.update_time | dateFormat}}</div>
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
      componentTitle: '报题展示',
      dataList: [],
      count: 4,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('maanshan-report')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      console.log(this.currentViewId)
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
.maanshan-report {
  width: 100%;
  height: 100%;
  padding: 0.4em;
  .report-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0.85em;
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .report-title {
    height: 1em;
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #D6E6FF;
    margin-bottom: 1.25em;
  }
  .report-list {
    padding-left: 0.5em;
    margin-bottom: 0.97em;
    color: #ffffff;
    .list-icon {
      width: 0.9em;
      height: 0.74em;
      margin-right: 0.25em;
    }
    .bgpass {
      background: url('./assets/pass.png') no-repeat center;
      background-size: 100% 100%;
    }
    .bgback {
      background: url('./assets/back.png') no-repeat center;
      background-size: 100% 100%;
    }
    .list-title {
      flex: 1;
      font-size: 0.58em;
      text-align: left;
    }
    .list-user {
      flex-basis: 10%;
      font-size: 0.42em;
    }
    .list-time {
      flex-basis: 20%;
      font-size: 0.42em;
    }
  }
}
</style>

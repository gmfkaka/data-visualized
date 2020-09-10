<template>
  <div class="xy-report" id="xy-report">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="report-wrap sys-flex sys-vertical" >
      <div class="report-title sys-flex sys-flex-center">{{reportTitle}}</div>
      <div
        class="report-list animated sys-flex sys-flex-center overhidden"
        :class="{'fadeInLeft' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div 
          class="list-icon"
          :class="{'bgwait': v.audit_status === '0','bgback': v.audit_status === '2', 'bgpass': v.audit_status === '1'}"
        ></div>
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user">{{v.project_user_name}}</div>
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
      reportTitle: '报题展示',
      dataList: [],
      count: 8,
      page: 1,
      isPaging: false,
      frequency: 35000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
    this.setFontsize('xy-report')
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
@import 'src/styles/index.scss';
.xy-report {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .report-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .report-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .report-list {
    height: 10%;
    color: #d6e6ff;
    background-size: 100%;
    .list-icon {
      width: px1em(40px);
      height: px1em(32px);
      line-height: px1em(32px);
      font-size: px1em(17px);
      margin-right: px1em(10px);
      text-align: center;
    }
    .bgwait {
      background: url('./assets/wait.png') no-repeat center;
      background-size: 100% 100%;
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
      font-size: px1em(18px);
      text-align: left;
    }
    .list-user {
      flex-basis: 20%;
      font-size: px1em(14.5px);
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 20%;
      font-size: px1em(14.5px);
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>

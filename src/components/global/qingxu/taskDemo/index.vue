<template>
  <div class="qx-project" id="qx-project">
    <div class="project-wrap">
      <div class="project-transform">
        任务共568条&nbsp;&nbsp;&nbsp;&nbsp;采访任务完成率：80%
      </div>
      <div class="project-list-wrap sys-flex sys-flex-wrap">
        <!-- @click="showContent(v,k)" -->
        <div
          class="project-list sys-flex sys-flex-center flex-justify-between animated"
          v-for="(v,k) in dataList"
          :key="k"
          :class="{'flipInX' : v.title}"
          v-bind:style="{'animation-delay' : k/2+'s'}"
        >
          <div class="project-title overhidden">{{v.title}}</div>
          <div class="project-user">{{v.task_user_name}}</div>
          <div class="project-status" :class="{'status-progress' : v.status == 1 || v.status == 2 , 'status-stop' : v.status == 4 , 'status-done' : v.status == 3}">{{v.status_show}}</div>
          <div class="project-progress sys-flex sys-flex-center">
            <div class="progress-total">
              <span
                class="progress"
                :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status == 4 , 'on-done' : v.status == 3}"
                :style="{'width' : v.percent + '%'}"
              ></span>
            </div>
            <div class="percent">{{Math.ceil(v.percent)}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkCallTaskList } from '@/servers/interface'
export default {
  name: 'project',
  data () {
    return {
      dataList: [],
      count: 6,
      page: 1,
      isPaging: false,
      frequency: 15000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
    // this.setFontsize('qx-project')
  },
  methods: {
    getDataList () {
      getWorkCallTaskList(this.count, this.page, this.currentViewId).then((response) => {
        if (!response.data.error_code) {
          if (response.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = [
                {
                  title: '采访雨花小区保安管理员',
                  task_user_name: '周捷',
                  status: 1,
                  status_show: '进行中',
                  percent: '50.00'
                },
                {
                  title: '生成厚建趣味运动会报道',
                  task_user_name: '宋凯',
                  status: 3,
                  status_show: '已完成',
                  percent: '100.00'
                },
                {
                  title: '探访野猪逛大街',
                  task_user_name: '杨鹏鹏',
                  status: 2,
                  status_show: '进行中',
                  percent: '80.00'
                },
                {
                  title: '完成新一轮选题的方案',
                  task_user_name: '张雷',
                  status: 2,
                  status_show: '进行中',
                  percent: '60.00'
                },
                {
                  title: '微信公众号新文章编写',
                  task_user_name: '吕超',
                  status: 3,
                  status_show: '已完成',
                  percent: '100.00'
                },
                {
                  title: '网站新闻的文章更新',
                  task_user_name: '周捷',
                  status: 3,
                  status_show: '已完成',
                  percent: '100.00'
                }
              ]
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
@import "src/styles/index.scss";
.qx-project {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .project-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .project-transform {
      position: absolute;
      right: pxrem(72px);
      top: pxrem(100px);
      font-size: pxrem(24px);
      color: #fff;
    }
    .project-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
  }
  .project-list{
    width: 100%;
    color: #fff;
    height: 16.5%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .project-title{
      width: 60%;
      font-size: pxrem(40px);
      text-align: left;
    }

    .project-user{
      width: 8%;
      text-align: left;
      line-height: pxrem(32px);
      font-size: pxrem(32px);
      color:rgba(255,255,255,1);
      margin-left: 1em;
    }

    .project-status{
      width: 8%;
      text-align: center;
      display: block;
      text-align: center;
      border-radius: 0.08rem;
      font-size: pxrem(32px);
      color: rgba(255,255,255,0.7);
    }
    .status-progress{
      color: #00F6FF;
    }
    .status-stop{
      color: #F34A4A;
    }
    .status-done{
      color: #01DF76;
    }

    .project-progress{
      width: 20%;
      color : rgba(255,255,255,0.7);
      font-size: pxrem(32px);
      text-align: center;
      .progress-total{
        width: 70%;
        height: pxrem(22px);
        background: RGBA(68, 97, 115, 1);
        border-radius: 0.11rem;
        overflow: hidden;
        .progress{
          display: block;
          height: 100%;
          border-radius: 0.055rem;
          &.on-progress{
            background: -webkit-linear-gradient(left,  #0272ff , #80bfff);
            background: -o-linear-gradient(right,  #0272ff , #80bfff);
            background: -moz-linear-gradient(right,  #0272ff , #80bfff);
            background: linear-gradient(to right, #0272ff , #80bfff);
          }
          &.on-stop{
            background: -webkit-linear-gradient(left,  #EE3232 , #F65959);
            background: -o-linear-gradient(right,  #EE3232 , #F65959);
            background: -moz-linear-gradient(right, #EE3232 , #F65959);
            background: linear-gradient(to right, #EE3232 , #F65959);
          }
          &.on-done{
            background: -webkit-linear-gradient(left,  #09de74 , #2ff6c5);
            background: -o-linear-gradient(right,  #09de74 , #2ff6c5);
            background: -moz-linear-gradient(right,  #09de74 , #2ff6c5);
            background: linear-gradient(to right, #09de74 , #2ff6c5);
          }
        }
      }
      .percent{
        line-height: pxrem(32px);
        font-size: pxrem(32px);
        margin-left: pxrem(30px);
        color:rgba(255,255,255,1);
      }
    }
  }
}
</style>

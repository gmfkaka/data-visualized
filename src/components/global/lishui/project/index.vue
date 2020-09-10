<template>
  <div class="ls-project" id="ls-project">
    <div class="project-wrap">
      <div class="project-list-wrap sys-flex sys-flex-wrap flex-justify-between">
        <!-- @click="showContent(v,k)" -->
        <div
          class="project-list sys-flex sys-flex-center flex-justify-between animated"
          v-for="(v,k) in dataList"
          :key="k"
          :class="{'flipInX' : v.title}"
          v-bind:style="{'animation-delay' : k/2+'s'}"
        >
          <div class="project-title overhidden">{{v.title}}</div>
          <div class="project-user">{{v.project_user_name}}</div>
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
import { getWorkCallSubjectList } from '@/servers/interface'
export default {
  name: 'project',
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
    this.setFontsize('ls-project')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getWorkCallSubjectList(this.count, this.page, this.currentViewId).then((res) => {
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
.ls-project {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  background-color: #121D58;
  .project-wrap {
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    background-color: #0F1C46;
    .project-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
  }
  .project-list{
    width: 48%;
    color : #fff;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .project-title{
      width: 60%;
      font-size: pxrem(38px);
      text-align: left;
    }

    .project-user{
      width: 10%;
      text-align: left;
      line-height: pxrem(32px);
      font-size: pxrem(32px);
      color:rgba(255,255,255,1);
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }

    .project-status{
      width: 15%;
      text-align: center;
      display: block;
      margin: 0 pxrem(64px) 0 pxrem(32px);
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
      width: 25%;
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

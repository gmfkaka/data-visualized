<template>
  <div class="common01-project">
    <div class="project-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '选题展示'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in projectList" :key="k" :class="{'flipInX' : v.title, 'marginBottom75': customSize}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="name overhidden common01-ft32" :style="setFontSize(45)">{{v.project_user_name}}</div>
          <div class="project-status common01-ft32" :style="setFontSize(45)" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}">{{v.status_show}}</div>
          <div class="project-progress common01-ft32 sys-flex sys-flex-center overhidden" :style="setFontSize(45)">
            <div class="progress-total">
              <span class="progress" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}" :style="{'width' : v.percent + '%'}"></span>
            </div>
            <div class="percent common01-ft32" :style="setFontSize(45)" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}">{{Math.ceil(v.percent)}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallSubjectList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'project',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      projectList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getWorkCallSubjectList()
    setInterval(() => {
      this.getWorkCallSubjectList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getWorkCallSubjectList () {
      getWorkCallSubjectList(7, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.projectList = []
            setTimeout(() => {
              this.projectList = res.data.result.data
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
              this.getWorkCallSubjectList()
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-project {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .project-wrap {
    padding: pxrem(220px) pxrem(80px) pxrem(95px) pxrem(78px);
    padding-top: pxrem(200px)!important;
    padding-right: pxrem(80px)!important;
    color: #fff;
    .wrap-content {
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .item-list {
        margin-bottom: pxrem(60px)!important;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 55%;
          margin-right: pxrem(20px);
        }
        .name {
          width: 24%!important;
          margin-right: pxrem(10px)!important;
        }
        .project-status {
          width: pxrem(170px);
          &.on-progress {
            color: #0272ff;
          }
          &.on-stop {
            color: #ff3366;
          }
          &.on-done {
            color: #09de74;
          }
        }
        .project-progress {
          margin-left: auto;
          .progress-total {
            width: pxrem(200px)!important;
            height: pxrem(16px);
            background: #2B3A58;
            border-radius: pxrem(8px);
            overflow: hidden;
            .progress {
              display: block;
              height: 100%;
              border-radius: pxrem(8px);
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
          .percent {
            margin-left: pxrem(20px);
            width: pxrem(120px);
            &.on-progress {
              color: #0272ff;
            }
            &.on-stop {
              color: #ff3366;
            }
            &.on-done {
              color: #09de74;
            }
          }
        }
      }
    }
  }
}
</style>

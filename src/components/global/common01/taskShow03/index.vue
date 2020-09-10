<template>
  <div class="common01-taskshow">
    <div class="taskshow-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '任务展示'}}</div>
      <div class="wrap-content">
        <div
          class="item-list animated"
          v-for="(v, k) in dataList"
          :key="k"
          :class="{'flipInX' : v.title, 'marginBottom50': customSize}"
          :style="{'animation-delay' : k/2+'s'}"
        >
          <div class="status-title sys-flex sys-flex-center common01-ft40" :style="setFontSize(50)">
            <div
              class="status"
              :class="{'one': v.priority === '1', 'two': v.priority === '2', 'three': v.priority === '3' || v.priority === '4'}"
            >【{{v.priority === '1' ? '一级' : v.priority === '2' ? '二级' : v.priority === '3' ? '三级' : '四级'}}】</div>
            <div
              class="status-show"
              :class="{'one': v.priority === '1', 'two': v.priority === '2', 'three': v.priority === '3'}"
            >【{{v.status_show}}】</div>
            <div class="title overhidden">{{v.title}}</div>
          </div>
          <div class="project-name sys-flex sys-flex-center common01-ft32" :style="setFontSize(45)">
            <div class="project overhidden">所属选题：{{v.project_title}}</div>
            <div class="name overhidden">负责人：{{v.task_user_name}}</div>
            <div class="time">{{v.update_time | dateFormat(0, 16)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallTaskList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'taskShow',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getWorkCallTaskList()
    setInterval(() => {
      this.getWorkCallTaskList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getWorkCallTaskList () {
      getWorkCallTaskList(9, this.page, this.currentViewId).then(res => {
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
              this.getWorkCallTaskList()
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-taskshow {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .taskshow-wrap {
    padding: pxrem(200px) pxrem(96px) pxrem(80px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .marginBottom50 {
        margin-bottom: pxrem(50px) !important;
      }
      .item-list {
        margin-bottom: pxrem(70px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .status-title {
          .one {
            color: #05d9ff;
          }
          .two {
            color: #fea32c;
          }
          .three {
            color: RGBA(217, 67, 110, 1);
          }
          .title {
            width: 60%;
            text-align: left;
          }
        }
        .project-name {
          color: #05d9ff;
          padding: pxrem(10px) 0 0 pxrem(130px);
          .project {
            width: 50%;
            text-align: left;
          }
          .name {
            width: 22%;
            text-align: left;
            margin: 0 pxrem(32px) 0 auto;
          }
        }
      }
    }
  }
}
</style>

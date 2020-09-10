<template>
  <div class="jn-project">
    <div class="project-wrap">
      <div class="wrap-title">选题汇总</div>
      <div class="wrap-content">
        <div class="content-total sys-flex sys-flex-center flex-justify-between">
          <div class="total-left">今日选题<span>{{total}}</span>篇</div>
          <div class="total-right">完成<span>{{finish}}</span>篇，进行中<span>{{ing}}</span>篇</div>
        </div>
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
            <div class="title overhidden">{{v.title}}</div>
            <div class="name">{{v.create_user_name}}</div>
            <div class="status">{{v.status_show}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getJnWorkCallSubjectList, getJnProject } from '@/servers/interface'
export default {
  name: 'project',
  data () {
    return {
      finish: 0,
      ing: 0,
      count: 10,
      page: 1,
      total: 0,
      dataList: []
    }
  },
  created () {
    this.getJnWorkCallSubjectList()
    this.getJnProject()
    setInterval(() => {
      this.getJnWorkCallSubjectList()
      this.getJnProject()
    }, 10000)
  },
  methods: {
    getJnProject () {
      getJnProject().then(res => {
        this.total = res.data.result.total
        this.finish = res.data.result.num_status[3].total
        this.ing = res.data.result.num_status[1].total
      })
    },
    getJnWorkCallSubjectList () {
      getJnWorkCallSubjectList(this.count, this.page, 1).then(res => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-project {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .project-wrap {
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
          .title {
            font-size: pxrem(38px);
            margin: 0 pxrem(180px) 0 pxrem(33px);
            width: 70%;
            text-align: left;
          }
          .name {
            font-size: pxrem(34px);
            color: #00F6FF;
          }
          .status {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>

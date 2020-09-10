<template>
  <div class="maanshan-project" id="maanshan-project">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="project-wrap sys-flex sys-vertical" >
      <div class="project-title sys-flex sys-flex-center">{{componentTitle}}</div>
      <div
        class="project-list animated sys-flex sys-flex-center"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user overhidden">{{v.project_user_name}}</div>
        <div class="list-time">{{v.update_time | dateFormat}}</div>
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
      componentTitle: '选题展示',
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
    this.setFontsize('maanshan-project')
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
.maanshan-project {
  width: 100%;
  height: 100%;
  padding: 0.4em;
  .project-wrap {
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
  .project-title {
    height: 1em;
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #D6E6FF;
    margin-bottom: 1.25em;
  }
  .project-list {
    padding-left: 0.5em;
    margin-bottom: 0.97em;
    color: #ffffff;
    background-size: 100%;
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

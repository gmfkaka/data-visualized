<template>
  <div class="qx-leftDemo" id="qx-leftDemo">
    <div class="leftDemo-wrap">
      <div class="project-list-wrap sys-flex sys-flex-center flex-justify-around">
        <div v-for="(v, i) in dataList" :key="i" @click="goNewRouter(v.url)" class="list-item sys-flex sys-flex-center flex-justify-center" :calss="'btn' + i">
          {{v.lable}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftDemo',
  data () {
    return {
      dataList: [
        {
          lable: '报题展示',
          url: 'http://monitor-datav.cloud.hoge.cn/MGNlYzAyMT/reportDemo'
        },
        {
          lable: '选题展示',
          url: 'http://monitor-datav.cloud.hoge.cn/MGNlYzAyMT/projectDemo'
        },
        {
          lable: '全网热点',
          url: 'http://monitor-datav.cloud.hoge.cn/MGNlYzAyMT/hotTopicDemo'
        },
        {
          lable: '任务统计',
          url: 'http://monitor-datav.cloud.hoge.cn/MGNlYzAyMT/taskDemo'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    // this.setFontsize('qx-leftDemo')
  },
  methods: {
    goNewRouter (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.qx-leftDemo {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .leftDemo-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .project-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
    .list-item {
      width: 20%;
      height: 20%;
      font-size: pxrem(40px);
      color: #ffffff;
      border: 0.1em solid rgb(4, 70, 4);
      background-color: #44B9F4;
    }
    .list-item:hover {
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="xy-clue" id="xy-clue">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="clue-wrap sys-flex sys-vertical">
      <div class="clue-title sys-flex sys-flex-center">{{clueTitle}}</div>
      <div class="title-list sys-flex sys-flex-center">
        <div class="list-item sys-flex sys-flex-center flex-justify-center" v-for="(v,k) in titleList" :key="k" :class="{'active': currentIndex === k}">
          {{v.name}}
        </div>
      </div>
      <div
        class="clue-list animated sys-flex sys-flex-center overhidden"
        :class="{'fadeInLeft' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user">{{v.source}}</div>
        <div class="list-time">{{v.date.slice(5, 16)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCluesTogether } from '@/servers/interface'
export default {
  name: 'clue',
  data () {
    return {
      clueTitle: '线索汇聚',
      titleList: [{
        name: '互联网',
        type: 0
      }, {
        name: '微信',
        type: 1
      }, {
        name: '微博',
        type: 2
      }],
      currentIndex: 0,
      dataList: [],
      count: 6,
      webPage: 1,
      weChatPage: 1,
      weBoPage: 1,
      isPaging: false,
      frequency: 35000
    }
  },
  created () {
    this.getDataList(this.titleList[this.currentIndex].type)
  },
  mounted () {
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.titleList.length) {
        this.currentIndex = 0
        this.getDataList(this.titleList[this.currentIndex].type)
      } else {
        this.getDataList(this.titleList[this.currentIndex].type)
      }
    }, this.frequency)
    this.setFontsize('xy-clue')
  },
  methods: {
    getDataList (type) {
      this.dataList = []
      // 根据传参不同调用不同的接口数据
      if (type === 0) {
        getCluesTogether('website', this.count, this.webPage).then(res => {
          if (!res.data.error_code) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.webPage += 1
              }
            } else {
              if (this.webPage !== 1) {
                this.webPage = 1
                this.getDataList(this.titleList[this.currentIndex].type)
              }
            }
          }
        })
      } else if (type === 1) {
        getCluesTogether('website', this.count, this.weChatPage, '149434').then(res => {
          if (!res.data.error_code) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.weChatPage += 1
              }
            } else {
              if (this.weChatPage !== 1) {
                this.weChatPage = 1
                this.getDataList(this.titleList[this.currentIndex].type)
              }
            }
          }
        })
      } else if (type === 2) {
        getCluesTogether('website', this.count, this.weBoPage, '149433').then(res => {
          if (!res.data.error_code) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.weBoPage += 1
              }
            } else {
              if (this.weBoPage !== 1) {
                this.weBoPage = 1
                this.getDataList(this.titleList[this.currentIndex].type)
              }
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-clue {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .clue-wrap {
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
  .clue-title {
    height: 15%;
    text-align: left;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .title-list {
    width: 100%;
    height: 15%;
    margin-left: 1%;
    .list-item {
      width: px1em(180px);
      height: px1em(60px);
      margin-right: 2%;
      font-size: px1em(15px);
      font-weight: bold;
      color: #d6e6ff;
      background: url('./assets/clue-btn.png') no-repeat center;
      background-size: 100% 100%;
    }
    .active {
      background: url('./assets/clue-active-btn.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .clue-list {
    height: 11%;
    color: #d6e6ff;
    .list-title {
      flex: 1;
      font-size: px1em(18px);
      text-align: left;
    }
    .list-user {
      flex-basis: 15%;
      font-size: px1em(14.5px);
      margin-left: px1em(27px);
      text-align: left;
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

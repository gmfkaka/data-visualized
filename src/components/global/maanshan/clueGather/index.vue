<template>
  <div class="maanshan-clue" id="maanshan-clue">
    <!-- :class="[{'warp-bg' : showDefault}]" -->
    <div class="clue-wrap sys-flex sys-vertical">
      <div class="clue-title sys-flex sys-flex-center">{{componentTitle}}</div>
      <div class="title-list sys-flex sys-flex-center">
        <div class="list-item sys-flex sys-flex-center flex-justify-center" v-for="(v,k) in titleList" :key="k" :class="{'active': currentIndex === k}">
          <span>{{v.name}}</span>
        </div>
      </div>
      <div
        class="clue-list animated sys-flex sys-flex-center"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user overhidden">{{v.source}}</div>
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
      componentTitle: '线索汇聚',
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
      count: 3,
      webPage: 1,
      weChatPage: 1,
      weBoPage: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10
    }
  },
  created () {
    this.getData(this.titleList[this.currentIndex].type)
  },
  mounted () {
    this.setFontsize('maanshan-clue')
    setInterval(() => {
      this.currentIndex++
      if (this.currentIndex >= this.titleList.length) {
        this.currentIndex = 0
        this.getData(this.titleList[this.currentIndex].type)
      } else {
        this.getData(this.titleList[this.currentIndex].type)
      }
    }, this.frequency)
  },
  methods: {
    getData (type) {
      // 根据传参不同调用不同的接口数据
      if (type === 0) {
        getCluesTogether('website', this.count, this.webPage).then(res => {
          if (res && res.data && res.data.result && res.data.result.data) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.webPage += 1
                if (this.webPage > this.maxPage) {
                  this.webPage = 1
                }
              }
            } else {
              this.webPage = 1
              this.getData(this.titleList[this.currentIndex].type)
            }
          }
        })
      } else if (type === 1) {
        getCluesTogether('weChat', this.count, this.weChatPage).then(res => {
          if (res && res.data && res.data.result && res.data.result.data) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.weChatPage += 1
                if (this.weChatPage > this.maxPage) {
                  this.weChatPage = 1
                }
              }
            } else {
              if (this.weChatPage !== 1) {
                this.weChatPage = 1
                this.getData(this.titleList[this.currentIndex].type)
              }
            }
          }
        })
      } else if (type === 2) {
        getCluesTogether('weiBo', this.count, this.weBoPage).then(res => {
          if (res && res.data && res.data.result && res.data.result.data) {
            if (res.data.result.data.length) {
              this.dataList = []
              setTimeout(() => {
                this.dataList = res.data.result.data
              }, 100)
              if (this.isPaging) {
                this.weBoPage += 1
                if (this.weBoPage > this.maxPage) {
                  this.weBoPage = 1
                }
              }
            } else {
              if (this.weChatPage !== 1) {
                this.weChatPage = 1
                this.getData(this.titleList[this.currentIndex].type)
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
.maanshan-clue {
  width: 100%;
  height: 100%;
  padding: 0.4em;
  .clue-wrap {
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
  .clue-title {
    height: 1em;
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #d6e6ff;
    margin-bottom: 0.75em;
  }
  .title-list {
    width: 100%;
    height: 1.2em;
    margin-bottom: 0.85em;
    .list-item {
      width: 3.5em;
      height: 1.2em;
      margin-right: 0.7em;
      background: url('./assets/clue-btn.png') no-repeat center;
      background-size: 100% 100%;
      span {
        font-size: 0.66em;
        font-weight: bold;
        color: #d6e6ff;
      }
    }
    .active {
      background: url('./assets/clue-active-btn.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .clue-list {
    margin-bottom: 0.97em;
    color: #ffffff;
    .list-title {
      flex: 1;
      font-size: 0.58em;
      text-align: left;
    }
    .list-user {
      flex-basis: 15%;
      font-size: 0.42em;
      padding-left: 0.5em;
      text-align: left;
      color: rgba(243, 248, 254, 0.5);
    }
    .list-time {
      flex-basis: 15%;
      font-size: 0.42em;
      color: rgba(243, 248, 254, 0.5);
    }
  }
}
</style>

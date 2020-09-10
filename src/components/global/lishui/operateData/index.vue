<template>
  <div class="main-wrap" id="ls-operateData">
    <div class="operate-data-wrap sys-flex flex-justify-between">
      <div class="micro-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in microList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center animated" :class="{'flipInX' : v.value}" :style="{'animation-delay' : i/2+'s'}">
          <span class="item-text">{{v.text}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="app-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in appList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center animated" :class="{'flipInX' : v.value}" :style="{'animation-delay' : i/2+'s'}">
          <span class="item-text">{{v.text}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="web-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in webList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center animated" :class="{'flipInX' : v.value}" :style="{'animation-delay' : i/2+'s'}">
          <span class="item-text">{{v.text}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
      <div class="content-box box-item sys-flex sys-vertical flex-justify-between">
        <div v-for="(v, i) in contentList" :key="i" class="list-item sys-flex flex-justify-between sys-flex-center animated" :class="{'flipInX' : v.value}" :style="{'animation-delay' : i/2+'s'}">
          <span class="item-text">{{v.text}}</span>
          <span class="item-value">{{v.value | numberFormat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOperateData } from '@/servers/interface'
export default {
  name: 'operateData',
  data () {
    return {
      microList: [
        {
          text: '昨日阅读数：',
          lable: 'yesterday_click_num',
          value: 0
        }, {
          text: '昨日评论数：',
          lable: 'today_msg_num',
          value: 0
        }, {
          text: '新增粉丝数：',
          lable: 'new_user_num',
          value: 0
        }, {
          text: '累计粉丝数：',
          lable: 'cumulative_user_num',
          value: 0
        }
      ],
      appList: [
        {
          text: '昨日浏览量数：',
          lable: 'yesterday_click_num',
          value: 0
        }, {
          text: '今日发布数：',
          lable: 'today_publish_num',
          value: 0
        }, {
          text: '新增用户数：',
          lable: 'new_user_num',
          value: 0
        }, {
          text: '累计用户数：',
          lable: 'cumulative_user_num',
          value: 0
        }
      ],
      webList: [
        {
          text: '昨日阅读数：',
          lable: 'yesterday_click_num',
          value: 0
        }, {
          text: '昨日点赞数：',
          lable: 'yesterday_like_num',
          value: 0
        }, {
          text: '新增注册数：',
          lable: 'new_user_num',
          value: 0
        }, {
          text: '累计注册数：',
          lable: 'cumulative_user_num',
          value: 0
        }
      ],
      contentList: [
        {
          text: '昨日点赞数：',
          lable: 'yesterday_like_num',
          value: 0
        }, {
          text: '今日新消息数：',
          lable: 'today_msg_num',
          value: 0
        }, {
          text: '新增粉丝数：',
          lable: 'new_user_num',
          value: 0
        }, {
          text: '累计粉丝数：',
          lable: 'cumulative_user_num',
          value: 0
        }
      ],
      frequency: 15000
    }
  },

  created () {
    this.getDataList()
  },

  mounted () {
    this.setFontsize('ls-operateData')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },

  methods: {
    getDataList () {
      getOperateData(this.currentViewId).then((response) => {
        if (!response.data.error_code) {
          this.microList = this.microList.map(v => {
            return {
              ...v,
              value: response.data.result.weiYunYin[v.lable]
            }
          })
          this.appList = this.appList.map(v => {
            return {
              ...v,
              value: response.data.result.app[v.lable]
            }
          })
          this.webList = this.webList.map(v => {
            return {
              ...v,
              value: response.data.result.web[v.lable]
            }
          })
          this.contentList = this.contentList.map(v => {
            return {
              ...v,
              value: response.data.result.content[v.lable]
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'src/styles/index.scss';
.main-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 17px;
  background-color: #121D58;
  .operate-data-wrap{
    width: 100%;
    height: 100%;
    padding: pxem(115px) pxem(100px) pxem(58px) ;
    background: url('./assets/border.png') no-repeat center center;
    background-size: 100% 100%;
    background-color: #0F1C46;
    .box-item {
      width: 22%;
      height: 100%;
      padding: pxem(135px) pxem(80px) pxem(120px);
      .list-item {
        width: 100%;
        height: 25%;
        .item-text {
          font-size: pxrem(38px);
          color: #ffffff;
        }
        .item-value {
          font-size: pxrem(72px);
          font-weight: bold;
        }
      }
    }
    .micro-box {
      background: url('./assets/micro.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #d79c2e;
      }
    }
    .app-box {
      background: url('./assets/app.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #02b5fd;
      }
    }
    .web-box {
      background: url('./assets/web.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #2ad199;
      }
    }
    .content-box {
      background: url('./assets/content.png') no-repeat center center;
      background-size: 100% 100%;
      .item-value {
        color: #a63ae5;
      }
    }
  }
}
</style>

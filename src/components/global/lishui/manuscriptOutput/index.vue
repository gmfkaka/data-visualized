<template>
  <div class="lishui-manuscriptoutput" id="lishui-manuscriptoutput">
    <div class="manuscriptoutput-wrap">
      <div
        class="wrap-list sys-flex sys-flex-center animated"
        :class="{'flipInX' : v.title}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v, k) in dataList"
        :key="k"
      >
        <div class="list-status sys-flex sys-flex-center">
          <img v-if="k === 0" src="./assets/new.png" />
          <span v-if="k !== 0">【{{v.typeName}}】</span>
        </div>
        <div class="list-text overhidden">{{v.title}}</div>
        <div class="list-time list-span sys-flex sys-flex-center">
          <img src="./assets/time.png" />
          <span>{{v.publish_time.slice(0, 16)}}</span>
        </div>
        <div class="list-read list-span sys-flex sys-flex-center">
          <img src="./assets/read.png" />
          <span>{{v.click_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OPlusPublish } from '@/servers/interface'
export default {
  name: 'manuscriptOutput',
  data () {
    return {
      dataList: [],
      count: 5,
      page: 1,
      isPaging: true,
      typeList: {
        article: '文稿',
        gallery: '图集',
        topic: '专题',
        link: '外链',
        video: '视频'
      },
      frequency: 25000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-manuscriptoutput')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusPublish(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                return {
                  ...v,
                  typeName: this.typeList[(v.type)]
                }
              })
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
@import "~@/styles/index.scss";
.lishui-manuscriptoutput {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .manuscriptoutput-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    padding: px2em(210px) px2em(128px) px2em(130px) px2em(96px);
    color: #fff;
    .wrap-list {
      margin-bottom: px2em(95px);
      &:last-of-type {
        margin-bottom: 0;
      }
      .list-status {
        span {
          font-size: px2em(38px);
          color: #0afbf2;
        }
        img {
          width: px2em(107px);
          height: px2em(48px);
          margin: 0 px2em(22.5px);
        }
      }
      .list-text {
        font-size: px2em(38px);
        width: 52%;
        text-align: left;
      }
      .list-span {
        span {
          font-size: px2em(32px);
          color: #fefeff;
        }
      }
      .list-time {
        margin: 0 px2em(80px) 0 px2em(65px);
        img {
          width: px2em(30px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
      .list-read {
        img {
          width: px2em(42px);
          height: px2em(30px);
          margin-right: px2em(20px);
        }
      }
    }
  }
}
</style>
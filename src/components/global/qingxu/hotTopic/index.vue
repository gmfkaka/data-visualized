<template>
  <div class="qx-hotTopic" id="qx-hotTopic">
    <div class="hotTopic-wrap">
      <div class="hotTopic-list-wrap sys-flex sys-flex-wrap">
        <div class="hotTopic-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v,k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="hotTopic-title overhidden">{{v.title}}</div>
          <div class="hotTopic-user">{{v.class_name}}</div>
          <div class="hotTopic-number sys-flex sys-flex-center">
            <!-- <img src="./assets/read.png" alt="" class="number-icon"> -->
            <span class="number-text">{{v.create_time.slice(5, 16)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotsTopicList } from '@/servers/interface'
export default {
  name: 'hotTopic',
  data () {
    return {
      dataList: [],
      count: 6,
      page: 1,
      isPaging: false,
      frequency: 15000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    // this.setFontsize('qx-hotTopic')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getHotsTopicList(this.count, this.page).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data
            }, 100)
            if (this.isPaging) {
              this.page += 1
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
.qx-hotTopic {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(40px);
  .hotTopic-wrap {
    width: 100%;
    height: 100%;
    padding: pxrem(150px) pxrem(72px) pxrem(20px);
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    .hotTopic-list-wrap{
      height: 100%;
      align-content: flex-start;
    }
  }
  .hotTopic-list{
    color : #fff;
    width: 100%;
    height: 16.5%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .hotTopic-title{
      flex: 1;
      font-size: pxrem(40px);
      text-align: left;
    }
    .hotTopic-user{
      width: 8%;
      margin-left: pxrem(40px);
      font-size: pxrem(32px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0,246,255,1);
    }
    .hotTopic-number{
      width: 12%;
      .number-icon {
        width: pxrem(42px);
        height: pxrem(30px);
        margin-right: pxrem(18px);
      }
      .number-text {
        font-size: pxrem(32px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,246,255,1);
      }
    }
  }
}
</style>

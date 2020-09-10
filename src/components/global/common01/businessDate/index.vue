<template>
  <div class="common01-cluegather-other">
    <div class="cluegather-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">运营数据</div>
      <div class="wrap-content">
        <div class="list-sort sys-flex sys-flex-center flex-justify-around">
            <div class="common01-ft32 weixin sys-flex sys-flex-center flex-justify-center" :class="active ? 'active' : 'normal' ">
                <img src="./assets/weixin.png" alt="" style="width: 12%;">
                微信：{{wechatNum}}
                </div>
            <!-- <div class="common01-ft32 weibo sys-flex sys-flex-center flex-justify-center" :class="!active ? 'active' : 'normal' ">
                <img src="./assets/weibo.png" alt="">
                微博：68
                </div> -->
        </div>
        <div class="marquee_list">
            <div class="list-content list-title">
                <span class="common01-ft32">名称</span>
                <span class="common01-ft32">粉丝数</span>
                <span class="common01-ft32">阅读量</span>
                <span class="common01-ft32">新用户</span>
            </div>
            <vue-seamless-scroll :data="dateList" :class-option="classOption" style="overflow:hidden">
                <div class="list-content" v-for="(v,k) in dateList" :key="k">
                    <span class="common01-ft32">{{v.account_name}}</span>
                    <span class="common01-ft32">{{v.cumulate_user}}</span>
                    <span class="common01-ft32">{{v.int_page_read_count}}</span>
                    <span class="common01-ft32">{{v.new_user}}</span>
                </div>
            </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMicroOperationYesterday } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'clueGather2',
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      wechatNum: 0,
      active: true,
      page: 1,
      isPaging: true,
      frequency: 1500,
      maxPage: 3,
      dateList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getCluesTogether()
    // setInterval(() => {
    //   this.active = !this.active
    // //   this.getCluesTogether()
    // }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getCluesTogether () {
      // getMicroOperationAppList().then(res => {
      //   console.log(res.data, 'getMicroOperationAppList')
      // })
      getMicroOperationYesterday().then(res => {
        if (res.data.error_code === 0) {
          this.dateList = res.data.result
          this.wechatNum = this.dateList.length
        }
        console.log(res.data, 'getMicroOperationYesterday')
      })
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.6,
        autoPlay: true,
        hoverStop: true,
        isSingleRemUnit: true,
        singleHeight: 1.4,
        waitTime: 1000
      }
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-cluegather-other {
  width: 100%;
  height: 100%;
  .cluegather-wrap {
    padding: pxrem(180px) pxrem(50px) pxrem(95px) pxrem(50px);
    color: #fff;
    .wrap-content {
        .weibo,.weixin{
            img{
                margin-right: pxrem(20px);
            }
        }
        .active{
            width: pxrem(600px);
            height: pxrem(130px);
            line-height: pxrem(100px);
            background-image: url("./assets/active-bg.png");
            color:#ffffff;
            background-size: 100% pxrem(130px);
        }
        .normal{
            width: pxrem(600px);
            height: pxrem(100px);
            line-height: pxrem(100px);
            background-image: url("./assets/bg.png");
            color:#ffffff;
        }
       
        .list-content{
            width: 100%;
            height: pxrem(140px);
            line-height: pxrem(140px);
            display: flex;
            justify-content: space-between;
            &:nth-child(odd){
                // background-color: #092A84;
            }
            span{
                text-align: center;
                width: 25%;
            }
            &.list-title{
                color:#01EBFF;
            }
        }
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .list-sort{
          margin-bottom: pxrem(50px);
      }
      .item-list {
        overflow: hidden;
        margin: pxrem(90px) 0;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          width: 60%;
          text-align: left;
          flex: 1;
          margin-left: pxrem(40px);
        }
      }
    }
  }

}
</style>

<template>
  <div class="common01-cluegather-other">
    <div class="cluegather-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '线索汇聚'}}</div>
      <div class="wrap-content">
        <div class="list-sort sys-flex sys-flex-center flex-justify-between">
            <img class="imgHeight" :src=' activeIdx == 0 ? require("./assets/zixun-active.png") : require("./assets/zixun.png")'  alt="">
            <img class="imgHeight" :src=' activeIdx == 1 ? require("./assets/weixin-active.png") : require("./assets/weixin.png")'  alt="">
            <img class="imgHeight" :src=' activeIdx == 2 ? require("./assets/weibo-active.png") : require("./assets/weibo.png")' alt="">
            <img class="imgHeight" :src=' activeIdx == 3 ? require("./assets/qiangguo-active.png") : require("./assets/qiangguo.png")'  alt="">
        </div>
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title, 'marginBottom75': customSize}" :style="{'animation-delay' : k/2+'s'}">
          <div v-if="k == 0" class="common01-ft32 idx1">{{k+1}}</div>
          <div v-else-if="k == 1" class="common01-ft32 idx2">{{k+1}}</div>
          <div v-else-if="k == 2" class="common01-ft32 idx3">{{k+1}}</div>
          <div v-else class="common01-ft32 idx4">{{k+1}}</div>
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="source common01-ft32" :style="setFontSize(45)">{{v.source}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotsList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'clueGather2',
  data () {
    return {
      activeIdx: 0,
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      source: []
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getHotsList()
    setInterval(() => {
      this.activeIdx++
      if (this.activeIdx === 4) {
        this.activeIdx = 0
      }
      this.dataList = []
      this.getHotsList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getHotsList () {
      switch (this.activeIdx) {
        case 0:
          // this.plateform = 0
          this.plateForm = 'website'
          this.source = []
          break
        case 1:
          // this.plateform = 2
          this.plateForm = 'weChat'
          this.source = []
          break
        case 2:
          // this.plateform = 1
          this.plateForm = 'weiBo'
          this.source = []
          break
        case 3:
          // this.plateform = 0
          this.plateForm = 'website'
          this.source = [170503, 8064]
          break
      }
      getHotsList(this.plateForm, 1, 10, this.source).then(res => {
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
          }
        }
      })
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
  padding: pxrem(40px);
  .cluegather-wrap {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    color: #fff;
    .wrap-content {
      .marginBottom75 {
        margin-bottom: pxrem(75px)!important;
      }
      .list-sort{
        img{
          width: 25%;
        }
        .imgHeight{
          height: pxrem(80px);
        }
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
        .idx1{
            width:pxrem(56px);
            height:pxrem(56px);
            line-height: pxrem(56px);
            text-align: center;
            background:rgba(238,80,80,1);
            border-radius:5px;
        }
        .idx2{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(230,125,39,1);
            border-radius:5px;
        }
        .idx3{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(173,80,238,1);
            border-radius:5px;
        }
        .idx4{
            width:pxrem(56px);
            height:pxrem(56px);
            background:rgba(4,102,255,1);
            border-radius:5px;
        }
        .read {
          img {
            width: pxrem(30px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
}
</style>

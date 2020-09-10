<template>
  <div class="common01-power">
    <div class="power-wrap">
      <!-- <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '学习强国'}}</div> -->
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)" style="margin-right:1.5rem;">{{v.title}}</div>
          <div class="name common01-ft32 overhidden" :style="setFontSize(45)">{{v.author}}</div>
          <div class="time common01-ft32" :style="setFontSize(45)" style="margin-left:1.4rem;">{{v.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getWorkCallReportList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'report',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      dataList: [],
      customSize: false,
      fakeData: [
        {title: '走近盐城伍佑历史文化遗产 感受千年古镇文脉悠长', author: '张明', time: '06-04 13:00'},
        {title: '夜·盐南', author: '李军', time: '06-03 14:00'},
        {title: '江苏盐城：净美城市暖民心', author: '张明', time: '06-03 13:00'},
        {title: '江苏盐城：湿地家园 世界遗产', author: '张明', time: '06-02 13:00'},
        {title: '江苏盐城：利用中韩“快捷通道” 助力重大外资项目加快建设', author: '李军', time: '06-01 13:00'}
      ]
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getWorkCallReportList()
    setInterval(() => {
      this.getWorkCallReportList()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getWorkCallReportList () {
      this.dataList = []
      setTimeout(() => {
        this.dataList = this.fakeData
      }, 100)
      // getWorkCallReportList(5, this.page, this.currentViewId).then((res) => {
      //   if (!res.data.error_code) {
      //     if (res.data.result.data.length) {
      //       this.dataList = []
      //       setTimeout(() => {
      //         this.dataList = res.data.result.data
      //       }, 100)
      //       if (this.isPaging) {
      //         this.page += 1
      //         if (this.page > this.maxPage) {
      //           this.page = 1
      //         }
      //       }
      //     } else {
      //       if (this.page !== 1) {
      //         this.page = 1
      //         this.getWorkCallReportList()
      //       }
      //     }
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-power {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .power-wrap {
    padding: pxrem(230px) pxrem(90px) pxrem(78px);
    color: #fff;
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(80px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .status {
          width: pxrem(120px);
          height: pxrem(50px);
          line-height: pxrem(50px);
          border-radius: pxrem(2px);
          &.one {
            background-color: #0466FF;
          }
          &.two {
            background-color: #39C78D;
          }
          &.three {
            background-color: #EA4A68;
          }
          &.four {
            background-color: #FF9A02;
          }
        }
        .title {
          text-align: left;
          width: 55%;
          margin-right: pxrem(37px);
        }
        .name {
          width: 12%;
          text-align: left;
          color: rgb(78,253,236);
        }
        .time {
          margin-left: auto;
          color: rgb(78,253,236);
        }
      }
    }
  }
}
</style>

<template>
  <div class="common-operatedata01">
    <div class="operatedata01-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '运营数据'}}</div>
      <div class="wrap-content sys-flex">
        <div class="icon-box">
          <div class="app img-box" @click="changeTab(0)">
            <img :src="currentIndex === 0 ? app02 : app01" />
          </div>
          <div class="wechat img-box" @click="changeTab(1)">
            <img :src="currentIndex === 1 ? wechat02 : wechat01" />
          </div>
        </div>
        <div class="data-list sys-flex-one">
          <div class="title sys-flex sys-flex-center common01-ft36" :style="setFontSize(40)">
            <div v-for="(v, k) in titleList" :key="k">{{v}}</div>
          </div>
          <div class="body sys-flex sys-flex-center common01-ft38 animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2+'s'}">
            <div class="img-title sys-flex sys-flex-center flex-justify-center" :style="setFontSize(45)">
              <img :src="v.avatar" />
              <span class="overhidden">{{v.name}}</span>
            </div>
            <div class="one" :style="setFontSize(45)">{{currentIndex === 0 ? v.app_install_amount : v.cumulate_user}}</div>
            <div class="two" :style="setFontSize(45)">{{currentIndex === 0 ? v.new_user_count_channel_num : v.int_page_read_count}}</div>
            <div class="three" :style="setFontSize(45)">{{currentIndex === 0 ? v.user_count_num : v.share_count}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAppStatisticalData, getMicroOperationData } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'clueGather',
  data () {
    return {
      frequency: 15000,
      count: 0,
      currentIndex: 0,
      wechat01: require('./assets/wechat01.png'),
      wechat02: require('./assets/wechat02.png'),
      app01: require('./assets/app01.png'),
      app02: require('./assets/app02.png'),
      titleList: [],
      dataList: [],
      customSize: false
    }
  },
  created () {
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    this.getData()
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getData () {
      if (this.currentIndex === 0) {
        clearInterval(this.countNum)
        this.dataList = []
        this.count = 0
        this.list = []
        this.titleList = ['名称', '安装量', '注册用户', '日活量']
        this.getAppStatisticalData()
      } else {
        clearInterval(this.countNum)
        this.dataList = []
        this.count = 0
        this.list = []
        this.titleList = ['名称', '总粉丝量', '昨日点击量', '昨日转发量']
        this.getMicroOperationData()
      }
    },
    getAppStatisticalData () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getAppStatisticalData(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result
          this.initList()
        }
      })
    },
    getMicroOperationData () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getMicroOperationData(this.currentViewId).then(res => {
        if (!res.data.error_code) {
          this.list = res.data.result
          this.initList()
        }
      })
    },
    initList () {
      this.dataList = this.list.slice(
        this.count,
        this.count + 5 > this.list.length ? this.list.length : this.count + 5
      )
      this.count += 5
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.dataList = []
          setTimeout(() => {
            this.dataList = this.list.slice(this.count, this.count + 5)
            this.count += 5
          }, 100)
        } else {
          this.dataList = []
          clearInterval(this.countNum)
          this.count = 0
          this.getData()
        }
      }, this.frequency)
    },
    changeTab (index) {
      this.currentIndex = index
      this.getData()
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common-operatedata01 {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .operatedata01-wrap {
    padding: pxrem(183px) pxrem(72px) pxrem(74px) pxrem(82px);
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .wrap-content {
      .icon-box {
        margin-right: pxrem(36px);
        .app {
          margin-bottom: pxrem(40px);
        }
        .img-box {
          width: pxrem(150px);
          height: pxrem(150px);
        }
      }
      .data-list {
        width: 100%;
        .title {
          height: pxrem(90px);
          background: #0F4BB1;
          color: #00EAFF;
          div {
            width: 18%;
            &:first-of-type {
              width: 46%;
              text-align: left;
              padding-left: pxrem(200px);
            }
          }
        }
        .body {
          height: pxrem(130px);
          &:nth-of-type(odd) {
            background: #103D95;
          }
          &:nth-of-type(even) {
            background: #10398C;
          }
          div {
            width: 18%;
            &:first-of-type {
              width: 46%;
            }
          }
          .img-title {
            img {
              width: pxrem(75px);
              height: pxrem(75px);
              border-radius: 50%;
              margin-right: pxrem(20px);
            }
            span {
              width: 60%;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>

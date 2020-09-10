<template>
  <div class="common01-cluegather">
    <div class="cluegather-wrap common01-border">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '线索汇聚'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title, 'marginBottom75': customSize}" :style="{'animation-delay' : k/2+'s'}">
          <div class="title common01-ft40 overhidden" :style="setFontSize(50)">{{v.title}}</div>
          <div class="source common01-ft32" :style="setFontSize(45)">{{v.source}}</div>
          <div class="read common01-ft32 sys-flex sys-flex-center" :style="setFontSize(45)">
            <img src="../../../../assets/common/time.png" />
            <span>{{v.date.slice(5, 16)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCluesTogether } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'clueGather',
  data () {
    return {
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
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
    this.getCluesTogether()
    setInterval(() => {
      this.getCluesTogether()
    }, this.frequency)
  },
  methods: {
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getCluesTogether () {
      getCluesTogether('website', 5, this.page, this.currentViewId).then(res => {
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
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getCluesTogether()
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
.common01-cluegather {
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
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          width: 60%;
          text-align: left;
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

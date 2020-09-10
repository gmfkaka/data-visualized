<template>
  <div class="common01-chengnan">
      <div class="chengnan-wrap">
        <div class="list">
            <div class="list-item sys-flex animated" v-for="(item,k) in list" :key="k" :class="{'flipInX' : item.title}" :style="{'animation-delay' : k/2+'s'}">
                <div class="list-right sys-flex sys-vertical flex-justify-center">
                    <div class="title overhidden">{{item.title}}</div>
                    <div class="info">
                        <span class="source" v-if="item.source">{{item.source}}</span>
                        <span>{{item.date.substring(0,16)}}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getCityNews } from '@/servers/interface'
export default {
  name: 'chengnan',
  data () {
    return {
      list: [],
      page: 1,
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      customSize: false
    }
  },
  created () {
    this.getList()
    setInterval(() => {
      this.getList()
    }, this.frequency)
  },
  methods: {
    getList () {
      getCityNews('盐城', this.page, 7).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.length) {
            this.list = []
            setTimeout(() => {
              this.list = res.data.result
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
              this.getList()
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
.common01-chengnan {
  width: 100%;
  height: 100%;
  padding: pxrem(40px) !important;
  .chengnan-wrap{
      padding: pxrem(200px) pxrem(72px) pxrem(72px);
      width: 100%;
      height: 100%;
      background: url("./assets/border.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
     .list{
        height: 100%;
        .list-item{
            height: pxrem(218px);
            margin-bottom: pxrem(44px);
            background: url("./assets/item_bg.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
            &:last-of-type {
              margin-bottom: 0;
            }
            .list-right{
                padding: pxrem(40px) 0;
                padding-left: pxrem(78px);
                text-align: left;
                .title{
                    color: #fff;
                    font-size: pxrem(44px);
                    width: 1300px;
                }
                .info{
                    padding-top: pxrem(20px);
                    color: #00C0FF;
                    font-size: pxrem(32px);
                    .source{
                        margin-right: pxrem(40px);
                    }
                }
            }
        }
     }
  }
}
</style>

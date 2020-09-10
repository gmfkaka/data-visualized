<template>
  <div class="common01-web">
      <div class="web-toutiao-wrap">
        <div class="list">
            <div class="list-item sys-flex animated" v-for="(item,k) in list" :key="k" :class="{'flipInX' : item.title}" :style="{'animation-delay' : k/2+'s'}">
                <div class="list-left sys-flex sys-flex-center sys-vertical flex-justify-center">
                  <img class="hot-icon" src="./assets/hot.png" alt="">
                  <p>{{item.news_click_num}}</p>
                </div>
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
import { getWebNews } from '@/servers/interface'
export default {
  name: 'webToutiao',
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
      getWebNews(this.page, 7).then((res) => {
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
.common01-web {
  width: 100%;
  height: 100%;
  padding: pxrem(40px) !important;
  .web-toutiao-wrap{
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
            .list-left{
              width: pxrem(220px);
              height: 100%;
              .hot-icon{
                width: pxrem(45px);
                height: pxrem(57px);
              }
              p{
                color: #fff;
                font-size: pxrem(56px);
                padding-top: pxrem(24px);
              }
            }
            .list-right{
                padding: pxrem(40px) 0;
                padding-left: pxrem(55px);
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

<template>
  <div class="common01-liverank">
    <div class="liverank-wrap common01-border">
      <div class="common01-title">{{viewAttr.header || '直播排行'}}</div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}">
          <div class="index common01-ft40" :class="{'one': k === 0, 'two': k === 1, 'three': k === 2, 'four':k > 2}">{{k + count - 4}}</div>
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <!-- <div class="share common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/share.png" />
            <span>{{v.share_num}}</span>
          </div> -->
          <div class="comment common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/comment.png" />
            <span>{{v.comment_num}}</span>
          </div>
          <div class="read common01-ft32 sys-flex sys-flex-center">
            <img src="../../../../assets/common/read.png" />
            <span>{{v.click_num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getM2OLiveList } from '@/servers/interface'
export default {
  name: 'liveRank',
  data () {
    return {
      frequency: 15000,
      count: 0,
      dataList: []
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      if (this.countNum) {
        this.dataList = []
        clearInterval(this.countNum)
        this.count = 0
      }
      getM2OLiveList(this.currentViewId).then(res => {
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
          this.getDataList()
        }
      }, this.frequency)
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-liverank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  color: #fff;
  .liverank-wrap {
    padding: pxrem(220px) pxrem(96px) pxrem(95px) pxrem(78px);
    .wrap-content {
      .item-list {
        margin-bottom: pxrem(90px);
        &:last-of-type {
          margin-bottom: 0;
        }
        .index {
          width: pxrem(60px);
          height: pxrem(60px);
          background: no-repeat center;
          background-size: 100%;
          line-height: pxrem(60px);
          &.one {
            background-image: url("./assets/one.png");
          }
          &.two {
            background-image: url("./assets/two.png");
          }
          &.three {
            background-image: url("./assets/three.png");
          }
          &.four {
            background-image: url("./assets/four.png");
          }
        }
        .title {
          text-align: left;
          width: 70%;
          margin-left: pxrem(43px);
        }
        .share{
          margin-left: auto;
          img {
            width: pxrem(32px);
            height: pxrem(32px);
            margin-right: pxrem(18px);
          }
        }
        .read {
          margin-left: auto;
          img {
            width: pxrem(42px);
            height: pxrem(30px);
            margin-right: pxrem(18px);
          }
        }
        .comment{
          margin-left: auto;
          img {
            width: pxrem(34px);
            height: pxrem(31px);
            margin-right: pxrem(18px);
          }
        }
      }
    }
  }
}
</style>

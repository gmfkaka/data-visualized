<template>
  <div class="common-cluegather ">
    <div class="manuscript-page common01-border">
      <div class="common01-title">{{viewAttr.header || '稿件生产'}}</div>
	    <div class="list-title">
        <div class="list-item flex sys-flex-center animated"
          :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList"
          :key="k">
          <div class="type-area sys-flex sys-flex-center">
            <img v-if="k === 0" src="./assets/new.png" />
            <span class="common01-ft38" v-if="k !== 0">【{{v.typeName || '文稿'}}】</span>
          </div>
          <div class="list-text overhidden common01-ft38 flex-one">{{v.title}}</div>
          <div class="list-read flex flex-center">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.click_num}}</span>
          </div>
          <div class="list-time flex flex-center">
            <img class="img-icon" src="@/assets/common/time.png" />
            <span class="">{{v.publish_time.slice(5, 16)}}</span>
          </div>
        </div>
	    </div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusPublish } from '@/servers/interface'
export default {
  name: 'manuscript',
  data () {
    return {
      dataList: [],
      count: 12,
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
          if (res.data.result.data && res.data.result.data.length) {
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

<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common-cluegather{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
	.manuscript-page{
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
		.list-item{
		  margin-bottom: pxrem(110px);
		  align-items:center;
		}
		.type-area{
		  color:#0AFBF2;
      span {
        color: #0afbf2;
      }
      img {
        width: 1.07rem;
        height: 0.48rem;
        margin: 0 0.225rem;
      }
		}
		.list-title{
		  color:#fff;
		  font-size:0.38rem;
		  margin-right:1.12rem;
		  text-align:left;
		}
    .list-text {
      width: 40%;
      text-align: left;
    }
    .list-time {
      .img-icon {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .list-read {
      margin: 0 0.8rem 0 0.65rem;
      font-size:0.32rem;
      .img-icon {
        width: 0.42rem;
        height: 0.3rem;
        margin-right: 0.2rem;
      }
    }
	}
}

</style>

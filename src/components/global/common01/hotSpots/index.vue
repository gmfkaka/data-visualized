<template>
  <div class="common-hotspots ">
    <div class="hotspots-page common01-border">
      <div class="common01-title">{{viewAttr.header || '市县热点'}}</div>
	    <div class="tab-line">
	      <div class="tabs-item common01-ft42" :class="{'active': active === 'chifeng'}" @click="changeTab('chifeng')">赤峰</div>
	      <div class="tabs-item common01-ft42" :class="{'active': active === 'wulan'}" @click="changeTab('wulan')">乌兰察布</div>
	    </div>
	    <div class="hot-list">
	      <div class="list-item flex sys-flex-center animated"
	        :class="{'flipInX' : v.title}"
          :style="{'animation-delay' : k/2 + 's'}"
          v-for="(v, k) in dataList">
	        <div class="list-title overhidden common01-ft38 flex-one">
	        	{{v.title}}
	        </div>
	        <div class="list-viewer flex">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.click_num}}</span></div>
	        <div class="list-time flex">
            <img class="img-icon" src="@/assets/common/reader.png" />
            <span class="common01-ft32">{{v.publish_time.slice(5, 16)}}</span>
	        </div>
	      </div>
	    </div>
    </div>
  </div>
</template>

<script>
import {getM2OPlusHotPublish} from '@/servers/interface'
export default {
  data () {
    return {
      active: 'chifeng',
      dataList: [],
      siteId: 14,
      frequency: 10000,
      count: 4,
      page: 1,
      isPaging: true
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    changeTab (item) {
      this.active = item
      this.dataList = []
      if (this.active === 'wulan') {
        this.siteId = 96
        this.page = 1
        this.getDataList()
      } else {
        this.dataList = []
        this.siteId = 14
        this.page = 1
        this.getDataList()
      }
    },
    getDataList () {
      getM2OPlusHotPublish(this.count, this.page, this.currentViewId, this.siteId).then(res => {
        if (!res.data.error_code) {
          this.total = res.data.result.total
          if (res.data.result.data.length) {
            this.dataList = []
            res.data.result.data.forEach((item, index) => {
              if (index < 8) {
                this.dataList.push(item)
              }
            })
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
.common-hotspots{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
	.hotspots-page{
    padding: pxrem(130px) pxrem(96px) pxrem(95px) pxrem(78px);
		.tab-line{
		  margin-top:0.16rem;
		  text-align:center;
		  margin-bottom:0.7rem;
		  .tabs-item{
		    height:0.9rem;
		    line-height:0.9rem;
		    background: url("../../../../assets/common/tabsborder.png") no-repeat center;
		    width:3.2rem;
		    background-size: 100% 100%;
		    color:#fff;
		    text-align:center;
		    display:inline-block;
		  }
		  .active{
		    background-color:#02D2FF;
		  }
		}
		.list-item{
		  margin-bottom:1.2rem;
		}
		.list-viewer{
		  color:#fff;
		  align-items:center;
		  width:10%;
		}
		.list-time{
		  color:#fff;
		  align-items:center;
		}
		.img-icon{
		  width:0.42rem;
		  height:0.3rem;
		  margin-right:0.2rem;
		}
		.list-title{
		  color:#fff;
		  text-align:left;
		}
	}
}

</style>

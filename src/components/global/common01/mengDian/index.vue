<template>
  <div class="common-mengdian ">
    <div class="mengdian-page common01-border">
      <div class="common01-title">{{viewAttr.header || '蒙点号'}}</div>
	   	<div class="member-info">
	   	  <div class="member-all flex">
	   	    <div class="member-title flex-one">
	   	    <img class="icon" src="./assets/icon.png" />
	   	    入驻蒙点号数:</div>
	   	    <div class="member-num flex-one">{{total || 0}}</div>
	   	  </div>
	   	  <div class="member-list">
	   	    <div class="member-item animated"
	   	    :class="{'flipInX' : v.name}"
            :style="{'animation-delay' : k/2 + 's'}"
            v-for="(v, k) in dataList">
	   	      <div class="member-icon">
	   	        <img :src='v.indexpic.host + v.indexpic.filename' />
	   	      </div>
	   	      <div class="member-name">{{v.name}}</div>
	   	    </div>
	   	  </div>
	   	</div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusSubscribeIndex } from '@/servers/interface'
export default {
  data () {
    return {
      dataList: [],
      frequency: 10000,
      count: 8,
      page: 1,
      total: 0,
      maxPage: 10,
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
    getDataList () {
      getM2OPlusSubscribeIndex(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            this.total = res.data.result.total
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
.common-mengdian{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
	.mengdian-page{
    padding: pxrem(167px) pxrem(80px) pxrem(80px) pxrem(78px);
		.title{
		  color:#fff;
		  font-size:0.58rem;
		  text-align:left;
		  padding-top:0.53rem;
		  margin-bottom:1.30rem;
		}
		.member-info{
		  padding:0 1rem;
		  margin-top:0.6rem;
		}
		.member-all{
		  width:100%;
		  height:1.45rem;
		  line-height:1.45rem;
		  border:3px solid rgba(0,156,255,1);
		  align-items:center;
		  margin-botttom:0.6rem;
		}
		.member-title{
		  font-size:0.4rem;
		  color:#fff;
		  text-align:right;
		  padding-right:0.88rem;
		}
		.member-num{
		  display:inline-block;
		  color:#0BFCFF;
		  font-size:0.7rem;
		  line-height:1.45rem;
		  text-align:left;
		}
		.member-list{
		  margin-top:0.6rem;
		  text-align:left;
		}
		.member-item{
		  display:inline-block;
		  margin-right:1%;
		  width:24%;
		  margin-bottom:1rem;
		  text-align:center;
		}
		.member-icon{
		  width:1.5rem;
		  height:1.5rem;
		  overflow:hidden;
		  border-radius:0.05rem;
		  margin-bottom:0.28rem;
		  display:inline-block;
		  img{
		    width:100%;
		    height:100%;
		  }
		}
		.member-name{
		  font-size:0.34rem;
		  color:#fff;
		  height:0.5rem;
		  overflow:hidden;
		}
	}
	.icon{
	  width:0.46rem;
	  height:0.4rem;
	}
}

</style>

<template>
  <div class="common-personRank ">
    <div class="personRank-page common01-border">
      <div class="common01-title">{{viewAttr.header || '个人排行'}}</div>
	   	<div class="rank-list">
	   	  <div class="list-item animated" :class="{'flipInX' : v.name}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList">
	   	    <div class="flex item-detail">
	   	    	<div class="item-index" :class="'index-' + k">{{k+1}}</div>
	   	    	<div class="flex-one person-info flex">
	   	    	  <div class="person-avatar">
	   	    	    <img :src="v && v.avatar ? v.avatar.host + v.avatar.filepath + v.avatar.filename : defaultImg" />
	   	    	  </div>
	   	    	  <div class="person-name">{{v.name}}</div>
	   	    	</div>
	   	    	<div class="item-num">
	   	    	  <div class="num">{{v.publish}}</div>
	   	    	  <span class="num-label">条</span>
	   	    	</div>
	   	    </div>
	   	  </div>
	   	</div>
    </div>
  </div>
</template>

<script>
import { getM2OPlusWorkRank } from '@/servers/interface'
export default {
  name: 'manuscript',
  data () {
    return {
      dataList: [],
      isPaging: false,
      defaultImg: require('../../../../assets/avatar/touxiang.png'),
      frequency: 25000
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('lishui-personalranking')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getM2OPlusWorkRank(this.count, this.page, this.currentViewId).then(res => {
        if (!res.data.error_code) {
          if (res.data.result && res.data.result.data.length) {
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
.common-personRank{
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
	.personRank-page{
    padding: pxrem(200px) pxrem(96px) pxrem(95px) pxrem(78px);
		.rank-list{
		  text-align:left;
		  .list-item{
		    width:45%;
		    height:1.4rem;
		    padding:0 0.4rem;
		    margin-bottom:0.5rem;
		    background:linear-gradient(0deg,rgba(7,141,255,0.7) 0%,rgba(37,132,250,0.01) 52%,rgba(7,141,255,0.7) 100%);
				border-radius:5px;
				display:inline-block;
				&:nth-child(odd) {
				  margin-right:8%;
				}
				.item-detail{
				  align-items:center;
				  height:100%;
				}
		  }
		  .item-num{
		    .num{
		      font-size:0.6rem;
		    	color:#0BFCFF;
		      display:inline-block;
		    }
		    .num-label{
		      font-size:0.36rem;
		      color:#0BFCFF;
		      display:inline-block;
		    }
		  }
		}
		.item-index{
		  width:0.6rem;
			height:0.6rem;
			background:rgba(0,108,255,0.45);
			border:1px solid rgba(251, 49, 97, 1);
			border-radius:5px;
			color:#fff;
			font-size:0.4rem;
			text-align:center;
			line-height:0.6rem;
			font-family:PingFangSC-Medium;
		}
		.index-0{
		  background:rgba(251,49,97,0.45);
		}
		.index-1{
			background:rgba(251,173,49,0.45);
		}
		.index-2{
			background:rgba(192,49,251,0.45);
		}
	}
	.person-info{
	  padding-left:0.46rem;
	  align-items:center;
	  .person-avatar{
		  width:0.88rem;
		  height:0.88rem;
		  border:1px solid #078DFF;
		  border-radius:50%;
		  overflow:hidden;
		}
		img{
		  width:100%;
		  height:100%;
		}
		.person-name{
		  font-size:0.4rem;
		  color:#fff;
		  margin-left:0.4rem;
		}
	}
}

</style>

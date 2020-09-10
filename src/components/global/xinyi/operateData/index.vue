<template>
  <div class="xy-operate" id="xy-operate">
    <!--  :class="[{'warp-bg' : showDefault}]"  -->
    <div class="operate-wrap sys-flex sys-vertical">
      <div class="operate-title sys-flex sys-flex-center">{{operateDataTitle}}</div>
      <div class="operate-list sys-flex sys-vertical">
        <div class="operate-item sys-flex">
          <div class="one-img img-box">
            <img src="./assets/file.png" />
          </div>
          <div class="one-left mr100">
            <div class="mbt12">当月新增稿件数</div>
            <numCount :num-info="manuscript_total" :fontcolor="'yellow'"></numCount>         
          </div>
          <div class="one-right">
            <div class="mbt12">今日新增稿件数</div>
            <numCount :num-info="manuscript_today" :fontcolor="'yellow'"></numCount>
          </div>
        </div>
        <div class="operate-line mtt22 operate-item"></div>
        <div class="operate-item sys-flex">
          <div class="two-img img-box">
            <img src="./assets/web.png" />
          </div>
          <div class="two-left mr100">
            <div class="mbt12">累计网站访问量</div>
            <numCount :num-info="web_total" :fontcolor="'red'"></numCount>      
          </div>
          <div class="two-right">
            <div class="mbt12">当日网站访问量</div>
            <numCount :num-info="web_regist" :fontcolor="'red'"></numCount>        
          </div>
        </div>
        <div class="operate-line mtt22 operate-item"></div>
        <div class="operate-item sys-flex">
          <div class="three-img img-box">
            <img src="./assets/wechat.png" />
          </div>
          <div class="three-left mr100">
            <div class="mbt12">累计微信粉丝总数</div>
            <numCount :num-info="wechat_total" :fontcolor="'green'"></numCount>        
          </div>
          <div class="three-right">
            <div class="mbt12">昨日阅读总数</div>
            <numCount :num-info="wechat_regist" :fontcolor="'green'"></numCount>        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numCount from './numCount'
export default {
  name: 'operateDate',
  data () {
    return {
      operateDataTitle: '运营数据',
      manuscript_total: [0, 0, 0, 0, 0, 0, 0, 0],
      manuscript_today: [0, 0, 0, 0, 0, 0, 0, 0],
      web_total: [0, 0, 0, 0, 0, 0, 0, 0],
      web_regist: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_total: [0, 0, 0, 0, 0, 0, 0, 0],
      wechat_regist: [0, 0, 0, 0, 0, 0, 0, 0],
      frequency: 35000
    }
  },
  components: {
    numCount
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('xy-operate')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      this.getArticleData()
      this.getWebsiteData()
      this.getWechatData()
    },
    getArticleData () {
      // this.$api.getArticleData().then(res => {
      //   if (res && res.data && res.data.result) {
      //     setTimeout(() => {
      //       this.manuscript_total = this.preFixInterge(res.data.result.article_month_amount, 8)
      //       this.manuscript_today = this.preFixInterge(res.data.result.article_today_amount, 8)
      //     }, 10);
      //   }
      // })
      setTimeout(() => {
        this.manuscript_total = this.preFixInterge('572', 8)
        this.manuscript_today = this.preFixInterge('22', 8)
      }, 100)
    },
    getWebsiteData () {
      setTimeout(() => {
        this.web_total = this.preFixInterge('8652', 8)
        this.web_regist = this.preFixInterge('651', 8)
      }, 100)
    },
    getWechatData () {
      // this.$api.getWeixinTotal().then((res) => {
      //   if(res && res.data && res.data.result){
      //     setTimeout(() => {
      //       // 微信总数
      //       this.wechat_total = this.preFixInterge(res.data.result.cumulate_user, 8)
      //       this.wechat_regist = this.preFixInterge(res.data.result.int_page_read_count, 8)
      //     },100)
      //   }
      // })
      setTimeout(() => {
        this.wechat_total = this.preFixInterge('186537', 8)
        this.wechat_regist = this.preFixInterge('15636', 8)
      }, 100)
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-operate {
  width: 100%;
  padding: 0.25vh 0.1vw;
  text-align: left;
  .operate-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .operate-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .operate-list {
    height: 85%;
    padding: 0 5%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .operate-line {
    width: 100%;
    height: 0.2em;
    background: url("./assets/line.png") no-repeat center;
    background-size: 100%;
  }
  .img-box {
    width: 1.6em;
    height: 1.6em;
    margin-right: 1.5em;
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 0.5em;
    color: #ffffff;
  }
  .mtt22 {
    margin: 0.8em 0;
  }
  .mr100 {
    margin-right: 2em;
  }
}
</style>

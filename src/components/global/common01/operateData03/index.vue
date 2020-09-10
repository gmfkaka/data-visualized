<template>
  <div class="common01-operatedata02" id="common01-operatedata02">
    <div class="operate-wrap sys-flex sys-vertical common01-border">
      <div class="common01-title">{{viewAttr.header || '运营数据'}}</div>
      <div class="operate-list sys-flex sys-vertical">
        <div class="sys-flex">
          <div class="one-img img-box">
            <img src="./assets/app.png" />
          </div>
          <div class="custom-wrap flex flex-justify-between flex-one" v-if="customConfig.app && customConfig.app.length">
            <div v-for="(item, index) in customConfig.app" :key="index">
              <div class="mbt12 common01-ft40">{{item.name}}</div>
              <numCount :num-info="item.number" :fontcolor="'yellow'"></numCount>
            </div>
          </div>
          <div class="flex" v-else>
            <!-- 默认项 -->
            <div class="one-left mr100">
              <div class="mbt12 common01-ft40">APP装机总量</div>
              <numCount :num-info="today_publish_num" :fontcolor="'yellow'"></numCount>
            </div>
            <div class="one-right mr100">
              <div class="mbt12 common01-ft40">APP总注册数</div>
              <numCount :num-info="new_user" :fontcolor="'yellow'"></numCount>
            </div>
            <div class="one-right">
              <div class="mbt12 common01-ft40">APP日活跃人数</div>
              <numCount :num-info="web_au_total" :fontcolor="'yellow'"></numCount>
            </div>
          </div>
        </div>
        <div class="operate-line mtt22"></div>
        <div class="sys-flex">
          <div class="two-img img-box">
            <img src="./assets/web.png" />
          </div>
          <div class="custom-wrap flex flex-justify-between flex-one" v-if="customConfig.website && customConfig.website.length">
            <div v-for="(item, index) in customConfig.website" :key="index">
              <div class="mbt12 common01-ft40">{{item.name}}</div>
              <numCount :num-info="item.number" :fontcolor="'red'"></numCount>
            </div>
          </div>
          <div class="flex" v-else>
            <div class="two-left mr100">
              <div class="mbt12 common01-ft40">微信周阅读次数</div>
              <numCount :num-info="click_count" :fontcolor="'red'"></numCount>
            </div>
            <div class="two-right mr100">
              <div class="mbt12 common01-ft40">微信总粉丝数</div>
              <numCount :num-info="daily_click_count" :fontcolor="'red'"></numCount>
            </div>
              <div class="two-right">
              <div class="mbt12 common01-ft40">微信周评论数</div>
              <numCount :num-info="comment_num" :fontcolor="'red'"></numCount>
            </div>
          </div>
        </div>
        <div class="operate-line mtt22"></div>
        <div class="sys-flex">
          <div class="three-img img-box">
            <img src="./assets/wechat.png" />
          </div>
          <div class="custom-wrap flex flex-justify-between flex-one" v-if="customConfig.weChat && customConfig.weChat.length">
            <div v-for="(item, index) in customConfig.weChat" :key="index">
              <div class="mbt12 common01-ft40">{{item.name}}</div>
              <numCount :num-info="item.number" :fontcolor="'green'"></numCount>
            </div>
          </div>
          <div class="flex" v-else>
            <div class="three-left mr100">
              <div class="mbt12 common01-ft40">网站日均浏览量</div>
              <numCount :num-info="cumulate_user" :fontcolor="'green'"></numCount>
            </div>
            <div class="three-right mr100">
              <div class="mbt12 common01-ft40">网站独立访问量</div>
              <numCount :num-info="int_page_read_count" :fontcolor="'green'"></numCount>
            </div>
              <div class="three-right">
              <div class="mbt12 common01-ft40">中江论坛注册数</div>
              <numCount :num-info="luntan_count" :fontcolor="'green'"></numCount>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOperationalData01 } from '@/servers/interface'
import numCount from './numCount'
export default {
  name: 'operateDate',
  data () {
    return {
      today_publish_num: [0, 0, 0, 0, 0, 0, 0, 0],
      new_user: [0, 0, 0, 0, 0, 0, 0, 0],
      click_count: [0, 0, 0, 0, 0, 0, 0, 0],
      daily_click_count: [0, 0, 0, 0, 0, 0, 0, 0],
      cumulate_user: [0, 0, 0, 0, 0, 0, 0, 0],
      int_page_read_count: [0, 0, 0, 0, 0, 0, 0, 0],
      frequency: 35000,
      customConfig: {}
    }
  },
  components: {
    numCount
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('common01-operatedata02')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      let params = this.viewAttr.operateParams || 'website,weChat,app,weiBo,shortVideo'
      getOperationalData01(params, this.currentViewId).then(res => {
        let data = res.data.result
        setTimeout(() => {
          // 稿件总数
          this.today_publish_num = this.preFixInterge(1282642, 8)
          this.new_user = this.preFixInterge(1650081, 8)
          this.web_au_total = this.preFixInterge(865387, 8)
          // 微信总数
          this.int_page_read_count = this.preFixInterge(1799485, 8)
          this.cumulate_user = this.preFixInterge(2980300, 8)
          this.comment_num = this.preFixInterge(144980, 8)
          // 网站总数
          this.click_count = this.preFixInterge(873960, 8)
          this.daily_click_count = this.preFixInterge(863941, 8)
          this.luntan_count = this.preFixInterge(1138816, 8)
          // 自定义字段数据（可配项）
          if (this.viewAttr.weChat && this.viewAttr.weChat.key) {
            this.initConfig('weChat', data)
          }
          if (this.viewAttr.website && this.viewAttr.website.key) {
            this.initConfig('website', data)
          }
          if (this.viewAttr.app && this.viewAttr.app.key) {
            this.initConfig('app', data)
          }
        }, 100)
      })
    },
    initConfig (key, data) {
      this.customConfig[key] = []
      let keys = this.viewAttr[key].key.split(',')
      let names = this.viewAttr[key].name.split(',')
      keys.forEach((item, index) => {
        this.customConfig[key].push({
          name: names[index],
          number: this.preFixInterge((data[key][item] || '00000000'), 8)
        })
      })
      // this.customConfig = JSON.parse(JSON.stringify(this.customConfig))
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
@import '../style/index.scss';
.common01-operatedata02 {
  width: 100%;
  padding: pxrem(40px);
  text-align: left;
  .operate-wrap {
    padding: pxrem(207px) pxrem(96px) pxrem(95px) pxrem(78px);
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
  .operate-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .operate-line {
    width: 100%;
    height: pxrem(20px);
    background: url("./assets/line.png") no-repeat center;
    margin: pxrem(39px) 0;
    background-size: 100%;
  }
  .img-box {
    width: pxrem(168px);
    height: pxrem(168px);
    margin-right: pxrem(48px);
  }
  .mbt12 {
    font-size: 0.4em;
    margin-bottom: 0.5em;
    color: #ffffff;
  }
  .mr100 {
    margin-right: 2em;
  }
  .custom-wrap{
    padding: 0 pxrem(120px) 0 0;
  }
}
</style>

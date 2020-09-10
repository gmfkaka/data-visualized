<template>
  <div class="common-orderSheet-js">
    <div class="orderSheet-page common01-border">
      <div v-if="!showDetail">
        <div class="today-weather sys-flex">
          <div class="day">{{day}}</div>
          <div class="weekday">{{weekday}}</div>
          <div class="temp">{{temp}}</div>
          <div class="icon">
            <img :src="icon" />
          </div>
        </div>
        <!-- <div class="title">盐湖区新时代文明实践中心</div> -->
        <div class="title">{{title}}</div>
        <div class="order-list sys-flex">
          <div class="type-list">
            <div
              class="type-item"
              @click="changType('latest')"
              :class="{'check-item': type === 'latest'}"
            >
              <div class="new-img order-img">
                <img src="./assets/new_pre.png" v-if="type === 'latest'" />
                <img src="./assets/new.png" v-else />
              </div>
              <div class="type-name">最新鑫愿</div>
            </div>
            <div
              class="type-item"
              @click="changType('ongoing')"
              :class="{'check-item': type === 'ongoing'}"
            >
              <div class="order-img">
                <img src="./assets/process_pre.png" v-if="type === 'ongoing'" />
                <img src="./assets/process.png" v-else />
              </div>
              <div class="type-name">鑫愿进程</div>
            </div>
            <div
              class="type-item"
              @click="changType('complete')"
              :class="{'check-item': type === 'complete'}"
            >
              <div class="order-img">
                <img src="./assets/complete_pre.png" v-if="type === 'complete'" />
                <img src="./assets/complete.png" v-else />
              </div>
              <div class="type-name">完成鑫愿</div>
            </div>
          </div>
          <div class="list-content sys-flex-one">
            <div
              class="list-item sys-flex animated"
              @click="changeDetail(v)"
              :class="{'flipInX' : v.title}"
              :style="{'animation-delay' : k/2 + 's'}"
              v-for="(v, k) in dataList"
              :key="k"
            >
              <div class="list-country">【{{v.type.title}}】</div>
              <div class="list-title txt-overflow sys-flex-one">{{v.title}}</div>
              <div class="list-time">{{v.date}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-detail" v-if="showDetail">
        <div class="detail-info">
          <div class="title-line sys-flex">
            <div class="status-img">
              <img src="./assets/doing.png" />
            </div>
            <div class="detail-title txt-overflow sys-flex-one">{{detail.title}}</div>
          </div>
          <div class="detail-content sys-flex">
            <div class="help-info">
              <div class="help-title sys-flex">
                <div class="help-img">
                  <img src="./assets/arrow_list.png" />
                </div>
                <div class="help-text">求助信息：</div>
              </div>
              <div class="help-brief">
                <div>{{detail.brief}}</div>
              </div>
            </div>
            <div class="process-info sys-flex-one">
              <div class="help-title sys-flex">
                <div class="help-img">
                  <img src="./assets/arrow_list.png" />
                </div>
                <div class="help-text">处理进度：</div>
              </div>
              <div class="process-brief">
                <!-- 1 已打回 -->
                <div class="process-item back" v-if="detail.status && detail.status === 3">
                  <div class="status-name">{{detail.status_name}}</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 3">
                  <div class="status-name">待接单</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 3">
                  <div class="status-name">待沟通</div>
                </div>
                <!-- 2 审核中 -->
                <div class="process-item during" v-if="detail.status && detail.status === 1">
                  <div class="status-name">{{detail.status_name}}</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 1">
                  <div class="status-name">待接单</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 1">
                  <div class="status-name">待沟通</div>
                </div>
                <!-- 2.1 -->
                <div class="process-item" v-if="detail.status && detail.status === 2">
                  <div class="status-name">{{detail.status_name}}</div>
                </div>
                <div class="process-item during" v-if="detail.status && detail.status === 2">
                  <div class="status-name">接单中</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 2">
                  <div class="status-name">待沟通</div>
                </div>
                <!-- 3 接单中 -->
                <div class="process-item during" v-if="detail.status && detail.status === 4">
                  <div class="status-name">{{detail.status_name}}</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 4">
                  <div class="status-name">待接单</div>
                </div>
                <div class="process-item waiting" v-if="detail.status && detail.status === 4">
                  <div class="status-name">待沟通</div>
                </div>
                <!-- 4 已通过 -->
                <div
                  class="process-item"
                  v-if="detail.status !== 1 && detail.status !== 3 && detail.status !== 4 && detail.status !== 2"
                >
                  <div class="status-name">已通过</div>
                </div>
                <div
                  :class="detail.volunteer&&detail.organize?'process-item':'process-item during'"
                  v-if="detail.status !== 1 && detail.status !== 3 && detail.status !== 4 && detail.status !== 2"
                >
                  <div class="status-name">{{detail.volunteer?'已接单':detail.organize?'已受理':''}}</div>
                  <div class="process-org" v-if="detail.organize">{{detail.organize.name}}已受理</div>
                  <div class="process-member sys-flex" v-if="detail.volunteer">
                    志愿者：
                    <div class="member-name">{{detail.volunteer.member_name}}</div>已接单
                  </div>
                </div>
                <div
                  :class="detail.status === 8 ? 'process-item during':detail.status === 10 ? 'process-item':'process-item waiting'"
                  v-if="detail.status !== 1 && detail.status !== 3 && detail.status !== 4 && detail.status !== 2"
                >
                  <div class="status-name">{{detail.status === 10 ?detail.status_name:'待沟通'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="back-line">
          <div @click="backList()" class="back">
            <div class="back-img">
              <img src="./assets/icon_back.png" />
            </div>
            <span class="back-text">返回</span>
          </div>
        </div> -->
        <div class="back-btn common01-ft36" @click="backList()">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJiangningWeather, getVolunteerHelpList, getVolunteerHelpDetail } from '@/servers/interface'
export default {
  name: 'manuscript',
  data () {
    return {
      dataList: [],
      type: 'latest',
      temp: '',
      icon: '',
      wstr: '',
      day: '',
      weekday: '',
      count: 4,
      page: 1,
      title: '金山区新时代文明实践中心',
      isPaging: false,
      detail: {},
      showDetail: false,
      frequency: 10000,
      firstLoad: true
    }
  },
  created () {
    this.getWeather()
    this.getList()
    this.getToday('')
  },
  mounted () {
    setInterval(() => {
      this.getWeather()
      this.getList()
      this.getToday('')
    }, this.frequency)
  },
  methods: {
    backList () {
      this.showDetail = false
      // this.type = 'latest'
      this.getList()
    },
    changeDetail (item) {
      this.showDetail = true
      this.detail = []
      getVolunteerHelpDetail(item.id).then(res => {
        if (!res.error_code) {
          this.detail = res.data.result
        }
      })
    },
    changType (type) {
      this.type = type
      if (this.type === 'latest') {
        this.dataList = []
        this.page = 1
        this.getList('latest')
      } else if (this.type === 'ongoing') {
        this.dataList = []
        this.page = 1
        this.getList('ongoing')
      } else {
        this.dataList = []
        this.page = 1
        this.getList('completed')
      }
    },
    getList (status = this.type) {
      getVolunteerHelpList(this.count, this.page, status).then(res => {
        if (!res.data.error_code) {
          this.total = res.data.result.total
          if (res.data.result.data.length) {
            this.dataList = []
            res.data.result.data.forEach((item, index) => {
              let _date = new Date(item.create_time * 1000)
              let month = (_date.getMonth() + 1).toString().padStart(2, '0')
              let day = _date.getDate().toString().padStart(2, '0')
              let hour = _date.getHours().toString().padStart(2, '0')
              let min = _date.getMinutes().toString().padStart(2, '0')
              item.date = month + '-' + day + '  ' + hour + ':' + min
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
              this.getList()
            } else {
              // 首次进入“最新点单”没有数据，进入“完成点单”
              if (this.firstLoad) {
                this.firstLoad = false
                this.changType('complete')
              }
            }
          }
        }
      })
    },
    getWeather () {
      let city = '运城'
      getJiangningWeather(city).then(res => {
        if (res && res.data && res.data.result && res.data.result.basic) {
          let data = res.data.result.basic
          this.temp = `${data.now.tmp}℃`
          this.icon = `${data.now.cond.icon.host}${data.now.cond.icon.dir}${data.now.cond.icon.filepath}${data.now.cond.icon.filename}`
        }
      })
    },
    getToday () {
      let date = new Date()
      let week = date.getDay()
      let weeklist = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      this.time = `${hour}:${minute}`
      this.weekday = weeklist[week - 1]
      this.day = `${month}月${day}日 `
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-orderSheet-js {
  width: 100%;
  height: 100%;
  background-color: #0a1742;
  padding: pxrem(40px);
  * {
    font-family: "SourceHanSansSC-Medium";
  }
  .orderSheet-page {
    padding: 0.57rem 0.8rem 0.76rem 0.8rem;
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      color: #00fffa;
      font-size: 1.2rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.1rem;
      line-height: 1.2rem;
      margin-top: 0.8rem;
      margin-bottom: 0.6rem;
    }
    .today-weather {
      font-size: 0.35rem;
      line-height: 0.35rem;
      align-items: center;
      color: #fff;
      .icon {
        width: 0.47rem;
        margin: 0 0.1rem 0 0.24rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .weekday {
        margin-left: 0.15rem;
        margin-right: 0.2rem;
      }
    }
    .type-list {
      margin-right: 0.35rem;
    }
    .type-item {
      width: 1.5rem;
      height: 1.5rem;
      padding-top: 0.24rem;
      text-align: center;
      margin-bottom: 0.4rem;
      background: url("./assets/orderbox.png") no-repeat center;
      background-size: 100% 100%;
    }
    .type-name {
      font-size: 0.28rem;
      line-height: 0.28rem;
      margin-top: 0.18rem;
      color: rgba(252, 255, 255, 0.6);
    }
    .check-item {
      background: url("./assets/orderbox_pre.png") no-repeat center;
      background-size: 100% 100%;
      .type-name {
        color: rgba(252, 255, 255, 1);
      }
    }
    .order-img {
      width: 0.6rem;
      height: 0.6rem;
      display: inline-block;
    }
    .process-img {
      background: url("./assets/process.png") no-repeat 100%;
    }
    .complete-img {
      background: url("./assets/complete.png") no-repeat 100%;
    }
    .list-item {
      height: 1.45rem;
      align-items: center;
      color: #fff;
      padding-left: 0.55rem;
      padding-right: 0.6rem;
      background: url(/static/img/box@2x.d7de315.png);
      background-size: 100% 100%;
    }
    .list-item:nth-child(odd) {
      background-color: rgba(13, 99, 223, 0.2);
    }
    .list-item:nth-child(even) {
      background-color: rgba(13, 99, 223, 0.1);
    }
    .list-country {
      font-size: 0.38rem;
      color: #00d2ff;
      margin-right: 0.1rem;
    }
    .list-title {
      font-size: 0.38rem;
      text-align: left;
    }
    .list-time {
      font-size: 0.32rem;
      margin-left: 0.72rem;
    }
    .content-detail {
      text-align: left;
      .back-btn{
      position: absolute;
      z-index: 1;
      right: 0.8rem;
      bottom: 0.5rem;
      padding-left: 0.55rem;
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: 0.36rem 0.28rem;
      background-position: 0 0.11rem;
    }
      .detail-info{
        margin-top: 0.6rem;
      }
    }
    .back-line {
      text-align: right;
      margin-top: 0.25rem;
    }
    .back {
      display: inline-block;
      font-weight: bold;
    }
    .back-text {
      font-size: 0.34rem;
      color: #00ffea;
    }
    .back-img {
      display: inline-block;
      width: 0.36rem;
      height: 0.28rem;
      margin-right: 0.2rem;
    }
    .detail-title {
      font-size: 0.52rem;
      line-height: 0.6rem;
      color: #fff;
    }
    .title-line {
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #3073d4;
      width: 100%;
      margin-bottom: 0.64rem;
    }
    .status-img {
      width: 1.54rem;
      height: 0.6rem;
      display: inline-block;
      margin-right: 0.22rem;
    }
    .help-info {
      margin-right: 0.8rem;
    }
    .help-title {
      align-items: center;
      margin-bottom: 0.23rem;
    }
    .help-img {
      width: 0.8rem;
      height: 0.28rem;
      margin-right: 0.23rem;
      img {
        vertical-align: top;
      }
    }
    .help-text {
      font-size: 0.42rem;
      color: #fff;
    }
    .help-brief {
      width: 5.36rem;
      height: 5.1rem;
      overflow-y: scroll;
      padding: 0.46rem 0.55rem 0.2rem 0.5rem;
      background-color: rgba(13, 99, 223, 0.15);
      color: #fff;
      font-size: 0.36rem;
      line-height: 0.6rem;
      word-break: break-word;
    }
    .process-brief {
      width: 100%;
      height: 5.1rem;
      background-color: rgba(13, 99, 223, 0.15);
      overflow-y: scroll;
      padding: 0.5rem;
    }
    .status-name {
      font-size: 0.42rem;
      color: #fff;
      padding-left: 0.3rem;
    }
    .process-item {
      padding-bottom: 0.74rem;
      border-left: 0.03rem solid #4defe8;
      line-height: 0.42rem;
      position: relative;
    }
    .process-item:before {
      content: "";
      width: 0.42rem;
      height: 0.42rem;
      background: url("./assets/icon_finish.png") no-repeat;
      position: absolute;
      left: -0.21rem;
      top: -0.04rem;
      background-color: rgba(13, 99, 223, 0.15);
      background-position: center;
      background-size: 100% 100%;
    }
    .process-item.during:before {
      content: "";
      width: 0.42rem;
      height: 0.42rem;
      background: url("./assets/icon_during.png") no-repeat;
      position: absolute;
      left: -0.21rem;
      top: -0.04rem;
      background-color: rgba(13, 99, 223, 0.15);
      background-position: center;
      background-size: 100% 100%;
    }
    .process-item.waiting:before {
      content: "";
      width: 0.42rem;
      height: 0.42rem;
      background: url("./assets/icon_waiting.png") no-repeat;
      position: absolute;
      left: -0.21rem;
      top: -0.04rem;
      background-color: rgba(13, 99, 223, 0.15);
      background-position: center;
      background-size: 100% 100%;
    }
    .process-item.back:before {
      content: "";
      width: 0.42rem;
      height: 0.42rem;
      background: url("./assets/icon_refuse.png") no-repeat;
      position: absolute;
      left: -0.21rem;
      top: -0.04rem;
      background-color: rgba(13, 99, 223, 0.15);
      background-position: center;
      background-size: 100% 100%;
    }
    .process-item:nth-last-child(2) {
      border-image: linear-gradient(to bottom, #4dffe8, #ffe84b) 1 10;
      border-right: 0;
      border-top: 0;
      border-bottom: 0;
    }
    .process-item.during,
    .process-item.waiting,
    .process-item.back {
      border-image: none;
      border-left: 0.03rem solid #738cbe;
    }
    .process-item:last-child {
      border-left: 0;
    }
    .process-org {
      color: #fff;
      font-size: 0.34rem;
      line-height: 0.34rem;
      margin-bottom: 0.3rem;
      margin-top: 0.27rem;
      padding-left: 0.25rem;
    }
    .process-member {
      color: #fff;
      font-size: 0.34rem;
      padding-left: 0.25rem;
      line-height: 0.34rem;
    }
    .member-name {
      color: #0bfcff;
    }
  }
}
</style>


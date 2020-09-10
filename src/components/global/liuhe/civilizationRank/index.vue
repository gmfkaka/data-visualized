<template>
  <div class="common01-civilizationrank">
    <div class="dispatchrank-wrap org-top common01-border" v-if="!showOrgDetails&&!showVolDetails">
      <div class="common01-title" :style="setFontSize(63)">{{viewAttr.header || '文明排行'}}</div>
      <img
        v-if="showUnit"
        class="unit_icon"
        src="../../../../assets/common/allunit.png"
        alt
        @click="showEvery()"
      />
      <img
        v-if="!showUnit"
        class="unit_icon"
        src="../../../../assets/common/unit.png"
        alt
        @click="showAll()"
      />
      <div class="title-tab sys-flex">
        <div class="item">
          <div>
            <h4>志愿服务总时长(时)</h4>
            <p>{{timeTotalNum}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <h4>服务队总数(个)</h4>
            <p>{{teamTotalNum}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <h4>志愿者总数(人)</h4>
            <p>{{memberTotalNum}}</p>
          </div>
        </div>
      </div>
      <div class="wrap-content sys-flex flex-justify-between">
        <div class="content-left sys-flex-one">
          <div class="title">
            志愿组织排行
            <span class="unit">(时长/h)</span>
          </div>
          <div
            @click="getActivitys(v.id,'organize')"
            class="item-list rank-height sys-flex sys-flex-center animated flipInX"
            v-for="(v, k) in leftList"
            :key="k"
            :class="{'flipInX' : v.name}"
            :style="{'animation-delay' : k/2+'s'}"
          >
            <div
              class="index common01-ft40"
              :class="{'one': k === 0, 'two': k === 1, 'three': k === 2}"
            >
              <div>{{k + (pageNum - 1) * count + 1}}</div>
            </div>
            <div class="img-box">
              <div>
                <img :src="v.head_pic?v.head_pic:defaultImg" alt />
              </div>
            </div>
            <div class="title common01-ft38 overhidden" :style="setFontSize(50)">{{v.name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)">
              <span class="common01-ft60" :style="setFontSize(65)">{{v.duration}}</span>h
            </div>
          </div>
        </div>
        <div class="content-right" v-if="rightList && rightList[0]">
          <div class="title">
            志愿者排行
            <span class="unit">(时长/h)</span>
          </div>
          <div
            @click="getActivitys(v.id,'volunteer')"
            class="item-list rank-height sys-flex sys-flex-center animated"
            v-for="(v, k) in rightList"
            :key="k"
            :class="{'flipInX' : v.real_name}"
            :style="{'animation-delay' : k/2+'s'}"
          >
            <div
              class="index common01-ft40"
              :class="{'one': k === 0, 'two': k === 1, 'three': k === 2}"
            >
              <div>{{k + (pageNum - 1) * count + 1}}</div>
            </div>
            <div class="img-box">
              <div>
                <img :src="v.head_pic?v.head_pic:defaultImg" alt />
              </div>
            </div>
            <div class="title common01-ft38 overhidden" :style="setFontSize(50)">{{v.real_name}}</div>
            <div class="num common01-ft36" :style="setFontSize(40)">
              <span class="common01-ft60" :style="setFontSize(65)">{{v.duration}}</span>h
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 组织排行详情 -->
    <div class="dispatchrank-wrap act-top common01-border" v-if="showOrgDetails">
      <div class="top-title sys-flex sys-flex-center">
        <div class="icon_back sys-flex sys-flex-center" @click="backList()">
          <img class="back-img" src="../orderSheet/assets/icon_back.png" />
          <div class="back_text">返回</div>
        </div>
      <img
        v-if="showUnit"
        class="unit_icon"
        src="../../../../assets/common/allunit.png"
        alt
        @click="showEvery1()"
      />
      <img
        v-if="!showUnit"
        class="unit_icon"
        src="../../../../assets/common/unit.png"
        alt
        @click="showAll()"
      />
        <div class="org-title sys-flex sys-flex-center">
          <div>总排名 {{orgRank}}：</div>
          <img class="header-img" :src="orgHeadPic" />
          <div class="title">{{orgName}}</div>
        </div>
      </div>
      <div class="title-tab sys-flex">
        <div class="item">
          <div>
            <h4>累计服务时长(时)</h4>
            <p>{{orgService}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <h4>举办活动(个)</h4>
            <p>{{activity_count}}</p>
          </div>
        </div>
      </div>
      <div class="detail-content">
        <div class="help-info">
          <div class="help-title sys-flex">
            <div class="help-img">
              <img src="../orderSheet/assets/arrow_list.png" />
            </div>
            <div class="help-text">志愿活动</div>
          </div>
        </div>
        <div class="activity_content">
          <div class="item-list" v-for="(v, k) in orgActList" :key="k">
            <div class="act_title">
              <span>{{k+1}}、</span>
              {{v.title}}
            </div>
            <div class="act_desc">{{v.desc}}</div>
            <div class="act_duration">
              <span class="color_white">服务</span>
              <span class="colour_hours">{{v.duration}}</span>
              <span class="color_white">小时</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 志愿者排行详情 -->
    <div class="dispatchrank-wrap act-top common01-border" v-if="showVolDetails">
      <div class="top-title sys-flex sys-flex-center">
        <div class="icon_back sys-flex sys-flex-center" @click="backList()">
          <img class="back-img" src="../orderSheet/assets/icon_back.png" />
          <div class="back_text">返回</div>
        </div>
      <img
        v-if="showUnit"
        class="unit_icon"
        src="../../../../assets/common/allunit.png"
        alt
        @click="showEvery1()"
      />
      <img
        v-if="!showUnit"
        class="unit_icon"
        src="../../../../assets/common/unit.png"
        alt
        @click="showAll()"
      />
        <div class="org-title sys-flex sys-flex-center">
          <div>总排名 {{volRank}}：</div>
          <img class="header-img" :src="volHeadPic" />
          <div class="title">{{volName}}</div>
        </div>
      </div>
      <div class="title-tab sys-flex">
        <div class="item">
          <div>
            <h4>累计服务时长(时)</h4>
            <p>{{volService}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <h4>求助点单(个)</h4>
            <p>{{help_count}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <h4>参与活动(个)</h4>
            <p>{{volAct}}</p>
          </div>
        </div>
      </div>
      <div class="vol_rank sys-flex">
        <div class="content">
          <div class="help-info">
            <div class="help-title sys-flex">
              <div class="help-img">
                <img src="../orderSheet/assets/arrow_list.png" />
              </div>
              <span class="help-text">求助点单</span>
            </div>
          </div>
          <div class="actbox">
            <div class="item-list-null" v-if="!leftOrderList.length"><span class="null-text">暂未接单</span></div>
            <div v-if="leftOrderList.length">
              <div class="item-list" v-for="(v, k) in leftOrderList" :key="k">
                <div class="act_title">
                  <span>{{k+1}}、</span>
                  {{v.title}}
                </div>
                <div class="act_desc">{{v.brief}}</div>
                <div class="act_duration">
                  <span class="color_white">服务</span>
                  <span class="colour_hours">{{v.duration}}</span>
                  <span class="color_white">小时</span>
                </div>
               </div>
            </div>
          </div>
        </div>
        <div class="content margin40">
          <div class="help-info">
            <div class="help-title sys-flex">
              <div class="help-img">
                <img src="../orderSheet/assets/arrow_list.png" />
              </div>
              <span class="help-text">志愿活动</span>
            </div>
          </div>
          <div class="actbox">
            <div class="item-list-null" v-if="!rightActList.length"><span class="null-text">暂无活动</span></div>
            <div v-if="rightActList.length">
              <div class="item-list" v-for="(v, k) in rightActList" :key="k">
                <div class="act_title">
                  <span>{{k+1}}、</span>
                  {{v.title}}
                </div>
                <div class="act_desc">{{v.desc}}</div>
                <div class="act_duration">
                  <span class="color_white">服务</span>
                  <span class="colour_hours">{{v.duration}}</span>
                  <span class="color_white">小时</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GUID } from '@/servers/api'
import { getActivity, getVolunteerRank } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'civilizationRank',
  data () {
    return {
      showUnit: false,
      showVolDetails: false,
      showOrgDetails: false,
      defaultImg: require('../../../../assets/avatar/touxiang.png'),
      timeTotalNum: 0,
      teamTotalNum: 0,
      memberTotalNum: 0,
      pageNum: 1,
      count: 3,
      frequency: 10000,
      leftList: [],
      rightList: [],
      customSize: false,
      page: 1, // 详情页
      orgActList: [],
      orgService: '', // 组织时长
      activity_count: '', // 组织活动
      detailId: '',
      orgName: '',
      orgHeadPic: '',
      orgRank: '',
      volAct: '', // 志愿者详情
      help_count: '',
      volService: '',
      rightActList: [],
      leftOrderList: [],
      volRank: '',
      volHeadPic: '',
      volName: '',
      guid: GUID
    }
  },
  created () {
    if (window.location.href.indexOf('All') >= 0) {
      this.showUnit = true
    } else {
      this.showUnit = false
    }
    getDataConfig().then(res => {
      if (Number(res.customSize)) {
        this.customSize = true
      }
    })
    if (this.$route.query.detailId) {
      this.detailId = this.$route.query.detailId
      this.flag = this.$route.query.flag
      this.getActivitys(this.detailId, this.flag)
    }
    this.getVolunteerRank()
    setInterval(() => {
      if (this.pageNum >= 3) {
        this.pageNum = 1
      } else {
        this.pageNum += 1
      }
      this.leftList = []
      this.rightList = []
      this.getVolunteerRank()
    }, this.frequency)
  },
  methods: {
    showAll () {
      var url = window.location.origin + '/' + this.guid + '/All'
      window.location.href = url
    },
    showEvery () {
      var url = window.location.origin + '/' + this.guid + '/civilizationRank'
      window.location.href = url
    },
    showEvery1 () {
      var url = window.location.origin + '/' + this.guid + '/civilizationRank' + '?detailId=' + this.detailId + '&flag=' + this.flag
      window.location.href = url
    },
    backList () {
      this.showOrgDetails = false
      this.showVolDetails = false
      this.page = 1
      clearInterval(this.orgClear)
      clearInterval(this.volClear)
    },
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    getActivitys (id, flag) {
      this.detailId = id
      this.flag = flag
      if (this.flag === 'organize') {
        this.showOrgDetails = true
        getActivity(this.detailId, 'organize').then(res => {
          console.log(res.data.result)
          if (!res.data.error_code) {
            let _result = res.data.result
            if (_result.activity) {
              this.orgActList = _result.activity
            }
            this.activity_count = _result.activity_count
            this.orgService = _result.service
            this.orgRank = _result.rank
            this.orgHeadPic = _result.data.head_pic ? _result.data.head_pic : this.defaultImg
            this.orgName = _result.data.name
          }
        })
      }
      if (this.flag === 'volunteer') {
        this.showVolDetails = true
        getActivity(this.detailId, 'volunteer').then(res => {
          if (!res.data.error_code) {
            let _result = res.data.result
            if (_result.activity) {
              this.rightActList = _result.activity
            }
            if (_result.help) {
              this.leftOrderList = _result.help
            }
            this.volAct = _result.activity_count
            this.help_count = _result.help_count
            this.volService = _result.service
            this.volRank = _result.rank
            this.volHeadPic = _result.data.head_pic ? _result.data.head_pic : this.defaultImg
            this.volName = _result.data.real_name
          }
        })
      }
    },
    getVolunteerRank (type) {
      getVolunteerRank(this.pageNum, this.count).then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result
          if (_result.volunteerRank.data) {
            this.rightList = _result.volunteerRank.data
          }
          if (_result.organizeRank.data) {
            this.leftList = _result.organizeRank.data
          }
          this.timeTotalNum = _result.duration
          this.teamTotalNum = _result.organize_number
          this.memberTotalNum = _result.volunteer_number
        }
      })
    }
  }
}
</script>
<style lang='scss'>
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-civilizationrank {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    font-family: SourceHanSansSC-Medium;
  }
  .org-top {
    padding-top: pxrem(154px);
  }
  .act-top {
    padding-top: pxrem(71px);
  }
  .dispatchrank-wrap {
    padding-right: pxrem(70px);
    padding-bottom: pxrem(61px);
    padding-left: pxrem(70px);
    color: #fff;
    .top-title {
      margin-bottom: pxrem(45px);
      .icon_back {
        margin-right: pxrem(70px);
        .back-img {
          display: inline-block;
          height: pxrem(28px);
          width: pxrem(36px);
          margin-right: pxrem(20px);
        }
        .back_text {
          color: #00ffea;
          font-size: pxrem(36px);
        }
      }
      .org-title {
        font-family: SourceHanSansSC-Medium;
        top: pxrem(53px);
        height: pxrem(56px);
        font-size: pxrem(58px);
        font-weight: 600;
        line-height: 1;
        text-shadow: 0px 16px 16px rgba(7, 222, 255, 0.2);
        .header-img {
          width: pxrem(100px);
          height: pxrem(100px);
          border-radius: 50%;
          // background-color: red;
          margin-right: pxrem(40px);
        }
        .title {
          height: pxrem(56px);
          font-size: pxrem(48px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
        }
      }
    }
    .detail-content {
      .help-info {
        .help-title {
          align-items: center;
          margin-bottom: 0.2rem;
          margin-top: 0.2rem;
        }
        .help-img {
          margin-right: 0.23rem;
          img {
            width: 0.8rem;
            height: 0.28rem;
            // vertical-align: top;
          }
        }
        .help-text {
          font-size: 0.42rem;
          color: #fff;
        }
      }
      .activity_content {
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        height: pxrem(526px);
        .item-list {
          margin-left: pxrem(40px);
          width: 48.8%;
          height: pxrem(310px);
          background: url('./assets/back.png') no-repeat center;
          background-size: 100% 100%;
          padding: pxrem(26px) pxrem(40px) pxrem(26px) pxrem(40px);
          margin-bottom: pxrem(24px);
          text-align: left;
          .act_title {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            height: pxrem(50px);
            font-size: pxrem(36px);
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: pxrem(60px);
          }
          .act_desc {
            width: 100%;
            height: pxrem(107px);
            font-size: pxrem(26px);
            display: -moz-box;
            display: -webkit-box;
            -moz-box-orient: vertical;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(221, 221, 221, 1);
            margin: pxrem(26px) 0;
          }
          .act_duration {
            text-align: right;
            .colour_hours {
              height: pxrem(34px);
              font-size: pxrem(36px);
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(0, 192, 255, 1);
            }
            .color_white {
              height: pxrem(34px);
              font-size: pxrem(36px);
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: pxrem(60px);
            }
          }
          &:last-of-type {
            margin-bottom: 0;
          }
          &:nth-child(2n + 1) {
            margin-left: 0;
          }
        }
      }
    }
    .common01-title {
      font-family: "SourceHanSansSC-Medium";
      top: pxrem(53px);
      height: pxrem(56px);
      font-weight: 600;
      line-height: 1;
      text-shadow: 0px 16px 16px rgba(7, 222, 255, 0.2);
    }
    .unit_icon {
      width: pxrem(58px);
      height: pxrem(58px);
      position: absolute;
      top: pxrem(90px);
      right: pxrem(40px);
    }
    .title-tab {
      width: 100%;
      padding-bottom: pxrem(8px);
      .item {
        flex: 1;
        position: relative;
        font-size: pxrem(36px);
        background: rgba(13, 99, 223, 0.15);
        height: pxrem(160px);
        box-sizing: border-box;
        > div {
          display: inline-block;
          height: pxrem(35px);
          font-size: pxrem(36px);
          color: rgba(255, 255, 255, 1);
          line-height: 1;
          margin-top: pxrem(31px);
          > p {
            text-align: left;
            font-size: pxrem(50px);
            margin-top: pxrem(20px);
            color: #00c0ff;
            font-weight: bold;
            letter-spacing: pxrem(3px);
            text-align: center;
          }
        }
      }
      > .item:not(:last-child)::after {
        display: block;
        content: "";
        width: pxrem(3px);
        height: pxrem(100px);
        background: linear-gradient(
          90deg,
          rgba(64, 107, 173, 0) 0%,
          rgba(64, 107, 173, 0.99) 48%,
          rgba(64, 107, 173, 0) 100%
        );
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    // 志愿者点单活动详情
    .vol_rank{
      .margin40{
        margin-left: 0.4rem;
      }
      .content {
        width: 48.8%;
        .help-info {
          .help-title {
            align-items: center;
            margin-bottom: 0.2rem;
            margin-top: 0.2rem;
          }
          .help-img {
            display: inline-block;
            margin-right: 0.23rem;
            img {
              width: 0.8rem;
              height: 0.28rem;
              // vertical-align: top;
            }
          }
          .help-text {
            font-size: 0.42rem;
            color: #fff;
          }
        }
        .actbox {
          overflow-y: scroll;
          height: pxrem(526px);
          .item-list-null{
            height: pxrem(321px);
            background: url("./assets/back.png") no-repeat center;
            background-size: 100% 100%;
            padding: pxrem(26px) pxrem(40px) pxrem(26px) pxrem(40px);
            margin-bottom: pxrem(24px);
            display: flex;
            align-items: center;
            justify-content: center;
            .null-text{
              font-size: pxrem(36px);
            }
          }
          .item-list {
            background: url("./assets/back.png") no-repeat center;
            background-size: 100% 100%;
            padding: pxrem(26px) pxrem(40px) pxrem(26px) pxrem(40px);
            margin-bottom: pxrem(24px);
            text-align: left;
            .act_title {
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              height: pxrem(50px);
              font-size: pxrem(36px);
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: pxrem(60px);
            }
            .act_desc {
              width: 100%;
              height: pxrem(107px);
              font-size: pxrem(26px);
              display: -moz-box;
              display: -webkit-box;
              -moz-box-orient: vertical;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(221, 221, 221, 1);
              margin: pxrem(26px) 0;
            }
            .act_duration {
              text-align: right;
              .colour_hours {
                height: pxrem(34px);
                font-size: pxrem(36px);
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(0, 192, 255, 1);
              }
              .color_white {
                height: pxrem(34px);
                font-size: pxrem(36px);
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: pxrem(60px);
              }
            }
            &:last-of-type {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .wrap-content {
      .content-left {
        .item-list {
          margin-right: pxrem(40px);
          // width: pxrem(900px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-right {
        .item-list {
          margin-right: pxrem(40px);
          // width: pxrem(900px);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .content-left > div.title,
      .content-right > div.title {
        text-align: left;
        font-size: pxrem(38px);
        height: pxrem(38px);
        line-height: 1;
        margin: pxrem(39px) 0 pxrem(30px);
        .unit {
          font-size: pxrem(30px);
        }
      }
      .content-left > div.help-info,
      .content-right > div.help-info {
        .help-title {
          align-items: center;
          margin-bottom: 0.2rem;
          margin-top: 0.2rem;
        }
        .help-img {
          margin-right: 0.23rem;
          img {
            width: 0.8rem;
            height: 0.28rem;
            vertical-align: top;
          }
        }
        .help-text {
          font-size: 0.42rem;
          color: #fff;
        }
      }
      .item-list {
        background: url("./assets/back.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0 pxrem(60px) 0 pxrem(50px);
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
            background-image: url("./assets/three.png");
          }
          &.three {
            background-image: url("./assets/two.png");
          }
          &.four {
            background-image: url("./assets/four.png");
          }
          > div {
            width: pxrem(60px);
            height: pxrem(60px);
          }
        }
        .img-box {
          width: pxrem(170px);
          height: pxrem(88px);
          padding-left: pxrem(57px);
          padding-right: pxrem(25px);
          > div {
            width: pxrem(88px);
            height: pxrem(88px);
            border-radius: 50%;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        > .title {
          text-align: left;
          width: pxrem(357px);
          line-height: 1;
          margin: pxrem(50px) 0 pxrem(52px);
        }
        > .title_content {
          text-align: left;
          width: pxrem(557px);
          line-height: 1;
          margin: pxrem(50px) 0 pxrem(52px);
        }
        .num {
          margin-left: auto;
          color: #00fcff;
          font-weight: 600;
          word-break: keep-all;
        }
      }
      .rank-height {
        height: pxrem(140px);
        margin-bottom: pxrem(50px);
      }
    }
  }
}
</style>

<template>
  <div class="common-orgStructure-js">
    <!-- 一级页面 -->
    <div class="orgStructure-page common01-border" v-if="!showDetailPage">
      <div class="common01-title">{{viewAttr.header || '组织架构'}}</div>
      <div class="tab-btn sys-flex">
        <div
          :class="showOrg?'btn common01-ft38 act':'btn common01-ft38'"
          @click="showOrg=!showOrg"
        >组织机构</div>
        <div
          :class="showOrg?'btn common01-ft38':'btn common01-ft38 act'"
          @click="showOrg=!showOrg"
        >成员名单</div>
      </div>
      <div class="org-div"  v-if="showOrg">
        <div class="total">
          <p>服务总队</p>
          <span>{{orgIndexData.total}}</span>
        </div>
        <div
          v-if="orgIndexData.topInfo.name"
          class="name common01-ft36 animated flipInX left-bottom-info"
          @click="showChildDetail(orgIndexData.topInfo.id, orgIndexData.topInfo.name)"
        >{{orgIndexData.topInfo.name}}</div>
        <div
          v-if="orgIndexData.leftTopInfo.name"
          class="name common01-ft36 animated flipInX left-top-info"
          @click="showChildDetail(orgIndexData.leftTopInfo.id, orgIndexData.leftTopInfo.name)"
        >{{orgIndexData.leftTopInfo.name}}</div>
        <div
          v-if="orgIndexData.leftBottomInfo.name"
          class="name common01-ft36 animated flipInX top-info"
          @click="showChildDetail(orgIndexData.leftBottomInfo.id, orgIndexData.leftBottomInfo.name)"
        >{{orgIndexData.leftBottomInfo.name}}</div>
        <div
          v-if="orgIndexData.rightTopInfo.name"
          class="name common01-ft36 animated flipInX right-top-info"
          @click="showChildDetail(orgIndexData.rightTopInfo.id, orgIndexData.rightTopInfo.name)"
        >{{orgIndexData.rightTopInfo.name}}</div>
        <div
          v-if="orgIndexData.rightBottomInfo.name"
          class="name common01-ft36 animated flipInX right-bottom-info"
          @click="showChildDetail(orgIndexData.rightBottomInfo.id, orgIndexData.rightBottomInfo.name)"
        >{{orgIndexData.rightBottomInfo.name}}</div>
        <div
          v-if="orgIndexData.bottomInfo.name"
          class="name common01-ft36 animated flipInX bottom-info"
          @click="showChildDetail(orgIndexData.bottomInfo.id, orgIndexData.bottomInfo.name)"
        >{{orgIndexData.bottomInfo.name}}</div>
        <div
          class="number left-bottom-info"
          @click="showChildDetail(orgIndexData.topInfo.id, orgIndexData.topInfo.name)"
        >{{orgIndexData.topInfo.number}}</div>
        <div
          class="number left-top-info"
          @click="showChildDetail(orgIndexData.leftTopInfo.id, orgIndexData.leftTopInfo.name)"
        >{{orgIndexData.leftTopInfo.number}}</div>
        <div
          class="number top-info"
          @click="showChildDetail(orgIndexData.leftBottomInfo.id, orgIndexData.leftBottomInfo.name)"
        >{{orgIndexData.leftBottomInfo.number}}</div>
        <div
          class="number right-top-info"
          @click="showChildDetail(orgIndexData.rightTopInfo.id, orgIndexData.rightTopInfo.name)"
        >{{orgIndexData.rightTopInfo.number}}</div>
        <div
          class="number right-bottom-info"
          @click="showChildDetail(orgIndexData.rightBottomInfo.id, orgIndexData.rightBottomInfo.name)"
        >{{orgIndexData.rightBottomInfo.number}}</div>
        <div
          class="number bottom-info"
          @click="showChildDetail(orgIndexData.bottomInfo.id, orgIndexData.bottomInfo.name)"
        >{{orgIndexData.bottomInfo.number}}</div>
      </div>
      <!-- 成员名单 -->
      <div class="member-div sys-flex" v-if="!showOrg">
        <div class="left-part sys-flex-one">
          <div class="title">
            <div class="img-div">
              <img src="./assets/arrow_list.png" alt />
            </div>
            <span>{{memberIndexData.leftMember.title}}</span>
          </div>
          <div class="member-list">
            <div
            class="item_add"
              :class="item.title === '成员'?'item type-member':'item type-leader'"
              v-for="(item, index) in memberIndexData.leftMember.data"
              :key="index"
            >
              <div class="type-title">
                <span>{{item.title}}</span>
                <span>:</span>
              </div>
              <div class="member sys-flex" v-for="(item2, index2) in item.data" :key="index2">
                <div class="name">
                  <div>
                    <span>{{item2.name}}</span>
                  </div>
                </div>
                <div class="position">{{item2.duty}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-part sys-flex-one">
          <div class="title">
            <div class="img-div"  v-if="memberIndexData.rightMember.title">
              <img src="./assets/arrow_list.png" alt />
            </div>
            <span>{{memberIndexData.rightMember.title}}</span>
          </div>
          <div class="member-list">
            <div
              :class="item.title === '成员'?'item type-member':'item type-leader'"
              v-for="(item, index) in memberIndexData.rightMember.data"
              :key="index"
            >
              <div class="type-title">
                <span>{{item.title}}</span>
                <span>:</span>
              </div>
              <div class="member sys-flex" v-for="(item2, index2) in item.data" :key="index2">
                <div class="name">
                  <div>
                    <span>{{item2.name}}</span>
                  </div>
                </div>
                <div class="position">{{item2.duty}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 组织二级页面 -->
    <div class="orgStructure-detail-page common01-border" v-if="showDetailPage">
      <div class="back-btn common01-ft36" @click="childDetailPageBack">返回</div>
      <div class="box">
        <div class="top-part">
          <div class="page-title">
            <div class="title-box">
              <div class="sys-flex">
                <div class="title-left">
                  <img src="./assets/namebox_left.png" alt />
                </div>
                <div class="title">
                  {{detailTitle}}
                  <span
                    class="num"
                    v-if="detailInfo && detailInfo.length > 0"
                  >({{detailInTotal}})</span>
                </div>
                <div class="title-right">
                  <img src="./assets/namebox_right.png" alt />
                </div>
              </div>
            </div>
            <div class="bg-div">
              <img src="./assets/bg_ladder.png" alt />
            </div>
          </div>
        </div>
        <div class="list-line sys-flex">
          <div class="first-line line" v-if="checkCanShow(0)"></div>
          <div class="line" v-if="checkCanShow(1)"></div>
          <div class="line" v-if="checkCanShow(2)"></div>
          <div class="line" v-if="checkCanShow(3)"></div>
          <div class="line" v-if="checkCanShow(4)"></div>
          <div class="line" v-if="checkCanShow(5)"></div>
        </div>
        <div class="list-box sys-flex" v-if="detailInfo && detailInfo.length > 0">
          <div class="item" v-for="(item, index) in detailInfo" :key="index">
            <div class="img-box">
              <img v-if="item.head_pic" :src="item.head_pic" alt />
              <img v-else src="./assets/icon_group.png" alt />
            </div>
            <div class="name">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVolunteerOrganizeList, getVolunteerOrganizeDetail, getVolunteerMemberList } from '@/servers/interface'
export default {
  name: 'orgStructure',
  data () {
    return {
      orgImg: require('./assets/icon_group.png'),
      showOrg: false,
      detailInTotal: 0,
      orgIndexData: {
        total: 0,
        topInfo: {
          title: '',
          score: 0,
          id: ''
        },
        leftTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        leftBottomInfo: {
          title: '',
          score: 0,
          id: ''
        },
        rightTopInfo: {
          title: '',
          score: 0,
          id: ''
        },
        rightBottomInfo: {
          title: '',
          score: 0,
          id: ''
        },
        bottomInfo: {
          title: '',
          score: 0,
          id: ''
        }
      },
      dimensionalArr: [],
      memberIndexData: {
        leftMember: {
          title: '',
          data: []
        },
        rightMember: {
          title: '',
          data: []
        }
      },
      // 二级页面
      showDetailPage: false,
      detailTitle: '',
      detailInfo: []
    }
  },
  created () {
    this.getVolunteerOrganizeList()
    this.getVolunteerMemberList()
  },
  watch: {
  },
  methods: {
    handelHtml (html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi
      return html.replace(rel, '')
    },
    setFontSize (size) {
      if (this.customSize && size && size > 0) {
        return `font-size: ${size / 100}rem!important`
      }
    },
    checkCanShow (num) {
      if (this.detailInfo && this.detailInfo.length > num) {
        return true
      } else {
        return false
      }
    },
    // 获取组织架构
    getVolunteerOrganizeList () {
      getVolunteerOrganizeList().then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result.organize_cate
          if (_result && _result.length > 0) {
            this.orgIndexData.total = res.data.result.total
            this.orgIndexData.topInfo = _result[0]
            this.orgIndexData.leftTopInfo = _result[1]
            this.orgIndexData.leftBottomInfo = _result[2]
            this.orgIndexData.rightTopInfo = _result[3]
            this.orgIndexData.rightBottomInfo = _result[4]
            this.orgIndexData.bottomInfo = _result[5]
            _result.forEach(e => {
            })
          }
        }
      })
    },
    // 获取组织架构（子组织）
    showChildDetail (id, name) {
      getVolunteerOrganizeDetail(id).then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result
          if (_result) {
            this.detailTitle = name
            this.detailInfo = _result.data
            this.detailInTotal = _result.to
            this.dimensionalArr.push({
              name: name,
              data: _result.data
            })
            this.showDetailPage = true
          }
        }
      })
    },
    // 二级页面返回
    childDetailPageBack () {
      if (this.dimensionalArr.length > 1) {
        this.dimensionalArr = this.dimensionalArr.splice(0, 1)
        this.detailInfo = this.dimensionalArr[0].data
        this.detailTitle = this.dimensionalArr[0].name
      } else {
        this.showDetailPage = false
        this.detailInfo = []
        this.dimensionalArr = []
        this.detailTitle = ''
      }
    },
    // 成员名单
    getVolunteerMemberList () {
      getVolunteerMemberList().then(res => {
        if (!res.data.error_code) {
          let _result = res.data.result
          if (_result) {
            this.memberIndexData.leftMember.title = _result[0].title
            this.memberIndexData.leftMember.data = _result[0].relation
            this.memberIndexData.rightMember.title = _result[1].title
            this.memberIndexData.rightMember.data = _result[1].relation
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
@import "../style/index.scss";
.common-orgStructure-js {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  background: #0a1742;
  * {
    outline: 0;
    font-family: "SourceHanSansSC-Medium";
  }
  .orgStructure-page {
    padding: pxrem(230px) pxrem(96px) pxrem(95px) pxrem(78px);
    .common01-title {
      height: pxrem(56px);
      font-weight: 600;
      line-height: 1;
      text-shadow: 0px 16px 16px rgba(7, 222, 255, 0.2);
    }
    .tab-btn {
      position: absolute;
      z-index: 2;
      top: pxrem(90px);
      right: pxrem(77px);
      .btn {
        width: pxrem(253px);
        height: pxrem(94px);
        line-height: pxrem(98px);
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: url("./assets/rectangle.png") no-repeat center;
        background-size: 100%;
      }
      .btn.act {
        background: url("./assets/rectangle_pre.png") no-repeat center;
        background-size: 100%;
      }
    }
    .org-div {
      position: absolute;
      width: pxrem(1678px);
      height: pxrem(710px);
      bottom: pxrem(35px);
      background: url("./assets/bg_group_new4.png") no-repeat center;
      background-size: auto 100%;
      // left: 52%;
      // -webkit-transform: translateX(-50%);
      // -moz-transform: translateX(-50%);
      // -ms-transform: translateX(-50%);
      // -o-transform: translateX(-50%);
      // transform: translateX(-50%);
      .total,
      .name,
      .number {
        position: absolute;
      }
      .total {
        width: pxrem(314px);
        height: pxrem(189px);
        text-align: center;
        top: pxrem(238px);
        left: pxrem(705px);
        p {
          font-size: pxrem(52px);
          height: pxrem(50px);
          line-height: 1;
          letter-spacing: pxrem(3px);
          margin-top: pxrem(32px);
          color: #fff;
        }
        span {
          font-size: pxrem(68px);
          color: #00f6ff;
          font-weight: 800;
          letter-spacing: pxrem(11px);
        }
      }
      .advance_total{
        top: 3.58rem;
      }
      .name {
        height: pxrem(76px);
        line-height: pxrem(76px);
        color: #fff;
        font-weight: bold;
        letter-spacing: pxrem(2px);
        background: url("./assets/box_3.png") no-repeat center;
        background-size: 100% 100%;
        white-space: nowrap;
      }
      .name1{
        position: absolute;
        position: relative;
        color: #fff;
        max-width: 4.3rem;
        height: 1.32rem;
        letter-spacing: pxrem(2px);
        font-weight: bold;
        background: url("./assets/3@2x.png") no-repeat center;
        background-size: 100% 100%;
        padding: 0.15rem 0.3rem;
      }
      .name1::before {
        left: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/1@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name1::after {
        right: 0;
        top: 0;
        position: absolute;
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/2@2x.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::before {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_1.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name::after {
        display: inline-block;
        content: "";
        width: pxrem(30px);
        height: 100%;
        background: url("./assets/box_2.png") no-repeat center;
        background-size: 100% 100%;
        vertical-align: top;
      }
      .name.top-info {
        // width: pxrem(294px);
        top: pxrem(15px);
        // left: pxrem(354px);
        right: pxrem(1215px);
      }
      .name.left-top-info {
        // width: pxrem(294px);
        top: pxrem(285px);
        right: pxrem(1360px);
      }
      .name.left-bottom-info {
        // width: pxrem(374px);
        bottom: pxrem(50px);
        // right: pxrem(1306px);
        right: pxrem(1240px);
      }
      .name.right-top-info {
        // width: pxrem(294px);
        top: pxrem(295px);
        left: pxrem(1358px);
      }
      .name.right-bottom-info {
        // width: pxrem(408px);
        bottom: pxrem(54px);
        left: pxrem(1285px);
      }
      .name.bottom-info {
        top: pxrem(15px);
        right: pxrem(152px);
      }
      .number {
        width: pxrem(138px);
        height: pxrem(138px);
        text-align: center;
        font-size: pxrem(48px);
        line-height: pxrem(138px);
        font-weight: bold;
        letter-spacing: pxrem(2px);
        color: #becfff;
      }
      .number.top-info {
        top: pxrem(0px);
        left: pxrem(610px);
      }
      .number.left-top-info {
        top: pxrem(262px);
        left: pxrem(468px);
        color: #0ce7e6;
      }
      .number.left-bottom-info {
        bottom: pxrem(92px);
        left: pxrem(556px);
      }
      .number.right-top-info {
        top: pxrem(265px);
        right: pxrem(423px);
        color: #0ce7e6;
      }
      .number.right-bottom-info {
        bottom: pxrem(86px);
        right: pxrem(524px);
      }
      .number.bottom-info {
        top: pxrem(0px);
        right: pxrem(556px);
      }
    }
    .org_div_add{
      background: url("./assets/bg_new.png") no-repeat center;
      background-size: auto 100%;
    }
    .member-div {
      .left-part {
        margin-right: pxrem(80px);
      }
      .title {
        height: pxrem(40px);
        font-size: pxrem(42px);
        line-height: 1;
        text-align: left;
        font-weight: bold;
        color: #fff;
        margin-bottom: pxrem(33px);
        .img-div {
          display: inline-block;
          width: pxrem(80px);
          height: pxrem(28px);
          > img {
            width: 100%;
          }
        }
      }
      .member-list {
        // width: pxrem(800px);
        height: pxrem(629px);
        background: rgba(0, 132, 255, 0.15);
        padding-left: pxrem(51px);
        overflow-y: scroll;
        .item.type-leader {
          background: url("./assets/icon_leader.png") no-repeat;
          background-size: pxrem(29px) pxrem(36px);
          background-position: 0 pxrem(45px);
        }
        .item.type-member {
          background: url("./assets/icon_member.png") no-repeat;
          background-size: pxrem(41px) pxrem(26px);
          background-position: 0 pxrem(50px);
        }
        .item {
          padding: pxrem(43px) 0 0 pxrem(51px);
          text-align: left;
          font-size: pxrem(36px);
          line-height: pxrem(36px);
          color: #fff;
          .type-title {
            span {
              display: inline-block;
              min-width: pxrem(105px);
              text-align: justify;
              text-align-last: justify;
              text-justify: distribute-all-lines;
            }
            span::after {
              display: inline-block;
              content: "";
              overflow: hidden;
              width: 100%;
              height: 0;
            }
          }
          .member {
            margin-top: pxrem(34px);
            padding-right: pxrem(30px);
            .name {
              color: #0bfcff;
              font-weight: bold;
              word-break: keep-all;
              > div {
                width: pxrem(181px);
              }
              span {
                display: inline-block;
                width: pxrem(110px);
                text-align-last: justify;
                text-align: justify;
                text-justify: distribute-all-lines;
              }
              span::after {
                display: inline-block;
                content: "";
                overflow: hidden;
                width: 100%;
                height: 0;
              }
            }
            .position {
              font-size: pxrem(30px);
            }
          }
        }
        .item_add{
          line-height: 0.3rem;
        }
        > .item:last-child {
          padding-bottom: pxrem(43px);
        }
      }
    }
  }
  // 二级页面
  .orgStructure-detail-page {
    .box {
      height: 100%;
      position: relative;
    }
    .box::after {
      position: absolute;
      display: block;
      content: "";
      bottom: pxrem(23px);
      width: 100%;
      box-shadow: 0px 8px 22px 12px rgba(14, 34, 84, 0.7);
    }
    .back-btn {
      position: absolute;
      z-index: 1;
      right: pxrem(80px);
      bottom: pxrem(50px);
      padding-left: pxrem(55px);
      color: #00ffea;
      font-weight: bold;
      background: url("./assets/icon_back.png") no-repeat;
      background-size: pxrem(36px) pxrem(28px);
      background-position: 0 pxrem(11px);
    }
    .top-part {
      padding-top: 0.95rem;
      .page-title {
        .title-box {
          display: inline-block;
          position: relative;
          z-index: 1;
          font-size: pxrem(56px);
          color: #fff;
          line-height: pxrem(131px);
          justify-content: center;
          box-shadow: 0px pxrem(25px) pxrem(40px) rgba(14, 34, 84, 0.7);
          .title {
            background: url("./assets/namebox_mid.png") no-repeat center;
            background-size: 100% 100%;
            .num {
              font-size: pxrem(60px);
              color: #00fffa;
            }
          }
          .sys-flex > div {
            height: pxrem(131px);
            > img {
              height: 100%;
            }
          }
        }
        .bg-div {
          width: pxrem(1451px);
          height: pxrem(70px);
          margin: pxrem(-20px) auto 0;
          position: relative;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .list-line {
      height: pxrem(121px);
      width: pxrem(1464px);
      padding-top: 0.24rem;
      padding-bottom: pxrem(10px);
      margin: 0 auto;
      justify-content: center;
      .line {
        position: relative;
        width: pxrem(291px);
        border-top: pxrem(2px) solid #03f6ff;
        border-right: pxrem(2px) solid #03f6ff;
      }
      .line::before,
      .line::after {
        display: block;
        content: "";
        position: absolute;
      }
      .line::before {
        // right: 0;
        // top: 0;
        // width: pxrem(2px);
        // height: pxrem(58px);
        // background:#03F6FF;
      }
      .line::after {
        width: pxrem(10px);
        height: pxrem(10px);
        border-radius: 50%;
        background: #03f6ff;
        bottom: pxrem(-10px);
        right: 0;
        -webkit-transform: translateX(pxrem(6px));
        -moz-transform: translateX(pxrem(6px));
        -ms-transform: translateX(pxrem(6px));
        -o-transform: translateX(pxrem(6px));
        transform: translateX(pxrem(6px));
        box-shadow: 0px 0px pxrem(10px) pxrem(4px) #05e8f1;
      }
      .first-line {
        width: pxrem(2px);
        // height: pxrem(60px);
        border-left: pxrem(2px) solid #03f6ff;
        border-right: none;
        &::after{
          -webkit-transform: translateX(pxrem(4px));
          -moz-transform: translateX(pxrem(4px));
          -ms-transform: translateX(pxrem(4px));
          -o-transform: translateX(pxrem(4px));
          transform: translateX(pxrem(4px));
        }
      }
    }
    .list-box {
      position: relative;
      width: pxrem(1758px);
      height: pxrem(460px);
      overflow-y: scroll;
      flex-flow: row wrap;
      margin: 0.13rem auto 0;
      justify-content: center;
      .item {
        width: pxrem(293px);
        height: pxrem(283px);
        padding-bottom: pxrem(16px);
        .img-box {
          // margin-bottom: pxrem(16px);
          img {
            width: pxrem(150px);
            height: pxrem(150px);
            border-radius: pxrem(20px);
          }
        }
        .name {
          display: -webkit-box;
          font-size: pxrem(34px);
          color: #fff;
          width: pxrem(277px);
          height: pxrem(96px);
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: center;
          > span {
            display: inline-block;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>

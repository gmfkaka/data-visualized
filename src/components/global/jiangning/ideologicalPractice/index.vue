<template>
  <div class="jn-practice">
    <div class="practice-wrap">
      <div class="wrap-title">思想与实践</div>
      <div class="wrap-content">
        <div class="content-img sys-flex flex-justify-between">
          <div class="img-left">
            <img src="http://static.jstv.com/2019/12/02/zyjs-zybd.png" />
          </div>
          <div class="img-right">
            <div class="right-one">
              <img src="http://static.jstv.com/2019/12/02/zyjs-zyjh.png" />
            </div>
            <div class="right-two">
              <img src="http://static.jstv.com/2019/12/02/zyjs-zywz.png" />
            </div>
          </div>
        </div>
        <div class="content-scroll sys-flex sys-flex-center">
          <div class="list-top">置顶</div>
          <div class="list-content">
            <div class="list-center" :class="{'scroll-active': animate}">
              <div class="scroll-list sys-flex sys-flex-center" v-for="(v, k) in dataList" :key="k">
                <div class="list-title overhidden">{{v.title}}</div>
                <div class="list-time">{{v.create_time}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getThoughtPractice } from '@/servers/interface'
export default {
  name: 'ideologicalPractice',
  data () {
    return {
      animate: false,
      dataList: []
    }
  },
  created () {
    this.getThoughtPractice()
  },
  methods: {
    getThoughtPractice () {
      getThoughtPractice().then(res => {
        if (!res.data.error_code) {
          this.dataList = res.data.result
          setInterval(this.showMarquee, 2000)
        }
      })
    },
    showMarquee () {
      this.animate = true
      setTimeout(() => {
        this.dataList.push(this.dataList[0])
        this.dataList.shift()
        this.animate = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-practice {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .practice-wrap {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/common/border@2x.png') no-repeat center;
    background-size: 100% 100%;
    padding: pxrem(30px);
    color: #fff;
    .wrap-title {
      font-size: pxrem(50px);
      font-weight: 600;
      margin-top: pxrem(-16px);
    }
    .wrap-content {
      .content-img {
        margin: pxrem(80px) 0 pxrem(63px);
        .img-left {
          width: pxrem(860px);
          height: pxrem(613px);
        }
        .img-right {
          div {
            width: pxrem(885px);
            height: pxrem(285px);
          }
          .right-one {
            margin-bottom: pxrem(44px);
          }
        }
      }
      .content-scroll {
        width: 100%;
        height: pxrem(140px);
        background-color: #0B295E;
        padding-left: pxrem(35px);
        .list-top {
          width: pxrem(110px);
          height: pxrem(52px);
          background-color: #DE4646;
          border-radius: pxrem(5px);
          font-size: pxrem(30px);
          margin-right: pxrem(30px);
        }
        .list-content {
          position: relative;
          overflow: hidden;
          flex: 1;
          height: pxrem(100px);
          line-height: pxrem(100px);
          .list-center {
            position: absolute;
	          top: 0;
	          left: 0;
          }
        }
        .scroll-active {
          transition: all 0.5s;
	        margin-top: pxrem(-100px);
        }
        .scroll-list {
          .list-title {
            width: 80%;
            font-size: pxrem(40px);
          }
          .list-time {
            margin-left: auto;
            font-size: pxrem(36px);
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="maanshan-task" id="maanshan-task">
    <div class="task-wrap">
      <!-- <div class="report-title sys-flex sys-flex-center">{{componentTitle}}</div> -->
      <swiper :options="swiperOption" ref="mySwiper" >
        <swiper-slide class="sys-flex sys-vertical" style="height:100%!important;" v-for="(item,k) in dataList" :key="k">
          <div class="task-list" v-for="(list,key) in item" :key="key">
            <div class="task-nav sys-flex sys-flex-center">
              <div class="task-title sys-flex-one overhidden">所属选题：{{list.project_title}}</div>
              <div class="task-status normal" v-if="list.priority == 1">普通</div>
              <div class="task-status emergency" v-if="list.priority == 2">紧急</div>
              <div class="task-status urgent" v-if="list.priority == 3">加急</div>
            </div>
            <div class="task-content sys-flex sys-vertical  flex-justify-between">
              <div class="brief">{{list.title}}</div>
              <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                <div class="task-create-user">{{list.create_user_name}}</div>
                <div class="task-create-time">{{list.update_time | dateFormat(0, 16)}}</div>
                <div class="task-type sys-flex-one" :class="{'on-start': list.status == 1,'on-progress' :  list.status == 2 , 'on-stop' : list.status == 3 , 'on-done' : list.status == 4}">{{list.status_show}}</div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getWorkCallSubjectList } from '@/servers/interface'
export default {
  name: 'task',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // notNextTick: true,
        speed: 2000,
        // autoplay : false,
        autoplay: {
          delay: 15000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        autoHeight: true,
        // direction: 'vertical',
        effect: 'flip',
        initialSlide: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      dataList: [],
      count: 24,
      page: 1,
      isPaging: true
    }
  },
  created () {
    this.getDataList()
    setInterval(() => {
      this.getDataList()
    }, 90000)
  },
  mounted () {
    this.setFontsize('maanshan-task')
  },
  methods: {
    getDataList () {
      getWorkCallSubjectList(this.count, this.page, this.currentViewId).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            this.dataList = this.split_array(res.data.result.data, 4)
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
    },
    split_array (arr, len) {
      let arrlen = arr.length
      let result = []
      for (let i = 0; i < arrlen; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.maanshan-task {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.2em;
  .task-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0.425em;
    // .report-title {
    //   height: 0.5em;
    //   text-align: left;
    //   font-size: 0.4em;
    //   font-weight: bold;
    //   color: #D6E6FF;
    //   margin-bottom: 0.625em;
    // }
    .swiper-container{
      width: 100%;
      height: 100%;
      .swiper-wrapper{
        height: 100%;
      }
    }
    .task-list{
      width: 99%;
      height: 24%;
      margin-bottom: 1%;
      background: rgba(2,122,186,0.2);
      border: 0.01rem solid rgba(2, 122, 186, 0.5);
      .task-nav{
        width: 100%;
        height: 25%;
        padding: pxem(33px, 12.5);
        background: rgba(9,44,111,1);
        .task-title{
          font-size: pxem(28px);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: rgba(174,183,209,1);
        }
        .task-status{
          width: 3em;
          height: 1.5em;
          line-height: 1.5em;
          border-radius: 0.025rem;
          text-align: center;
          font-size: pxem(25px);
          color: #fff;
          &.normal{
            background: RGBA(34, 115, 238, 1);
          }
          &.emergency{
            background: RGBA(226, 118, 46, 1);
          }
          &.urgent{
            background: RGBA(217, 67, 110, 1);
          }
        }
      }
      .task-content{
        height: 75%;
        padding: pxem(35px, 12.5) pxem(33px, 12.5);
        background: rgba(23,52,76,0);
        .brief{
          font-size: pxem(30px);
          line-height: 1.5em;
          height: 3em;
          font-weight: 400;
          color: #fff;
          text-align: left;
          overflow: hidden;
        }
        .task-info{
          width: 100%;
          .task-create-user{
            font-size: pxem(25px);
            padding-left: 1.4em; 
            color: #fff;
            background: url('./assets/user.png') no-repeat center left;
            background-size: 1.1em 1.2em;
            margin-right: 1.4em; 
          }
          .task-create-time{
            font-size: pxem(25px);
            padding-left: 1.4em;  
            color:#fff;
            background: url('./assets/time.png') no-repeat center left;
            background-size: 1.1em;
          }
          .task-type{
            font-size: pxem(25px);
            text-align: right;
            color: #fff;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            &.on-progress {
              color: #01DF76;
            }
            &.on-stop {
              color: #F34A4A;
            }
            &.on-done {
              color: #25B17C;
            }
          }
        }
      }
    }
  }
}
</style>

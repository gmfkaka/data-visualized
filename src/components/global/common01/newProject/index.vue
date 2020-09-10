<template>
  <div class="common01-newproject">
    <div class="newproject-wrap common01-border">
      <div class="common01-title"><span class="areaTit">{{viewAttr.header || '选题展示'}}</span> <span class="time">{{getDate()}}</span>  </div>
      <div class="select-content">
        <el-select v-model="value" placeholder="全部" @change="changeSort">
          <el-option
            v-for="item in sortList"
            :key="item.id"
            :label="item.sort"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="wrap-content">
        <div class="item-list sys-flex sys-flex-center animated" v-for="(v, k) in projectList" :key="k" :class="{'flipInX' : v.title}" :style="{'animation-delay' : k/2+'s'}" @mouseenter="enter(k)" @mouseleave="leave(k)">
          <div class="title common01-ft40 overhidden">{{v.title}}</div>
          <div class="hoverTitle" v-show="isShow == k">{{v.title}}</div>
          <div class="name overhidden common01-ft32">{{v.sort_name}}</div>
          <div class="sort-name common01-ft32">{{v.channel_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkCallSubjectSort, getWorkCallSubjectSortList } from '@/servers/interface'
export default {
  name: 'newproject',
  data () {
    return {
      isPaging: true,
      frequency: 15000,
      maxPage: 3,
      projectList: [],
      sortList: [],
      value: '',
      list: [],
      isShow: -1
    }
  },
  created () {
    this.getWorkCallSubjectSort()
  },
  methods: {
    changeSort (value) {
      getWorkCallSubjectSortList(value).then(res => {
        if (res && res.data && res.data.result && res.data.result.data) {
          this.projectList = res.data.result.data
        }
      })
    },
    getWorkCallSubjectSort () {
      getWorkCallSubjectSort().then(res => {
        if (res && res.data && res.data.result) {
          this.sortList = res.data.result
          this.sortList.unshift({
            id: '',
            sort: '全部'
          })
          this.changeSort(this.sortList[0].id)
        }
      })
    },
    getDate (n) {
      var date = new Date()
      // var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + ' 年 ' + month + ' 月 ' + strDate + ' 日 '
      return currentdate
    },
    enter (index) {
      this.isShow = index
    },
    leave (index) {
      this.isShow = -1
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-newproject {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .newproject-wrap {
    padding: pxrem(250px) pxrem(96px) pxrem(45px) pxrem(78px);
    color: #fff;
    overflow: hidden;
    .common01-title{
      .areaTit{font-weight: bold;}
      .time{font-size: pxrem(40px);}
    }
    .select-content {
      width: pxrem(200px);
      height: pxrem(30px);
      position: absolute;
      top: pxrem(110px);
      right: pxrem(110px);
    }
    .wrap-content {
      overflow: scroll;
      height: pxrem(740px);
      
      .item-list {
        margin-bottom: pxrem(60px);
        position: relative;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          text-align: left;
          width: 55%;
        }
        .hoverTitle{
          position: absolute;
          left:pxrem(90px);
          top:pxrem(55px);
          color:#333;
          background: #fff;
          border-radius: pxrem(10px);
          padding: 0 pxrem(20px);
          font-size:pxrem(40px);
          text-align: left;
          z-index: 999;
          // display:none;
        }
        .name {
          width: 25%;
          margin-right: pxrem(80px);
        }
        .sort-name {
          margin-left: auto;
          color:yellow;
        }
      }
    }
  }
}
.el-select-dropdown__wrap {
    max-height: unset;
}

</style>

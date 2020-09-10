<template>
  <div class="jn-cue">
    <div class="cue-wrap">
      <div class="wrap-title">网站线索</div>
      <div class="wrap-content">
        <div class="content-list">
          <div class="list-box sys-flex sys-flex-center animated" v-for="(v, k) in dataList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}">
            <div class="status" :class="{'one': v.status === 0, 'two': v.status === 1}"></div>
            <div class="title overhidden">{{v.title}}</div>
            <div class="source">{{v.source}}</div>
            <div class="time">{{v.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cueNavigation',
  data () {
    return {
      dataList: [{
        status: 0,
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        source: '央视新闻',
        time: '05-25  13:51'
      }, {
        status: 0,
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        source: '央视新闻',
        time: '05-25  13:51'
      }, {
        status: 0,
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        source: '央视新闻',
        time: '05-25  13:51'
      }, {
        status: 1,
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        source: '央视新闻',
        time: '05-25  13:51'
      }, {
        status: 1,
        title: '第二届中国国际进口博览会：科技保险为智慧出行保驾护航',
        source: '央视新闻',
        time: '05-25  13:51'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/index.scss";
.jn-cue {
  width: 100%;
  height: 100%;
  position: relative;
  padding: pxrem(35px);
  .cue-wrap {
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
      margin-top: pxrem(70px);
      .content-list {
        .list-box {
          width: 100%;
          height: pxrem(140px);
          background-color: #0B295E;
          margin-bottom: pxrem(30px);
          padding: 0 pxrem(36px);
          &:last-of-type {
            margin-bottom: 0;
          }
          .status {
            width: pxrem(45px);
            height: pxrem(59px);
            background: no-repeat center;
            background-size: 100%;
            &.one {
              background-image: url('./assets/one@2x.png');
            }
            &.two {
              background-image: url('./assets/two@2x.png');
            }
          }
          .title {
            font-size: pxrem(40px);
            margin: 0 pxrem(110px) 0 pxrem(30px);
          }
          .source {
            font-size: pxrem(34px);
            color: #00F6FF;
          }
          .time {
            margin-left: auto;
            font-size: pxrem(34px);
          }
        }
      }
    }
  }
}
</style>
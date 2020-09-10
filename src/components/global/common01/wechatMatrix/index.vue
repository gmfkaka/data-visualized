<template>
  <div class="common01-wechatmartix">
    <div class="wechatmartix-wrap common01-border wechatMatrixbg">
      <!-- <div class="common01-title">{{viewAttr.header || '城南区微信矩阵'}}</div> -->
      <div class="wrap-content">
          <div class="title sys-flex sys-flex-center flex-justify-center">
            <span class="gzh-icon"></span>
            公众号：<span class="gzh-num"> 23</span>
          </div>
          <div class="list sys-flex flex-justify-between sys-flex-wrap">
              <div class="list-item sys-flex sys-vertical flex-justify-center sys-flex-center" v-for="(item,i) in list" :key="i">
                  <img class="avatar" :src="item.indexpic" alt="">
                  <p class="list-title">{{item.name}}</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wechatMatrix',
  data () {
    return {
      list: [
        {name: '黄海发布', num: 100, indexpic: require('../wechatRank/assets/hhfb.png')},
        {name: '千年珠溪', num: 100, indexpic: require('../wechatRank/assets/qnzx.png')},
        {name: '幸福新都', num: 100, indexpic: require('../wechatRank/assets/xfxd.png')},
        {name: '新河街道', num: 100, indexpic: require('../wechatRank/assets/xhjd.png')},
        {name: '城南财政', num: 100, indexpic: require('../wechatRank/assets/cncz.png')},
        {name: '城南社保', num: 100, indexpic: require('../wechatRank/assets/cnsb.png')},
        {name: '城南教育发布', num: 100, indexpic: require('../wechatRank/assets/ynjy.png')},
        {name: '城南清风', num: 100, indexpic: require('../wechatRank/assets/cnqf.png')},
        {name: '青春盐南', num: 100, indexpic: require('../wechatRank/assets/qcyn.png')},
        {name: '盐城盐南公安', num: 100, indexpic: require('../wechatRank/assets/ycynga.png')},
        {name: '平安盐南', num: 100, indexpic: require('../wechatRank/assets/payn.png')},
        {name: '城南高新区河长办', num: 100, indexpic: require('../wechatRank/assets/yngxqhcb.png')}]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '~@/styles/index.scss';
@import '../style/index.scss';
.common01-wechatmartix {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .wechatMatrixbg{
    background: url('./assets/back.png')
  }
  .wechatmartix-wrap {
      padding: pxrem(180px) pxrem(100px) 0;
      .title{
        width: 100%;
        height: pxrem(145px);
        line-height: pxrem(145px);
        font-size: pxrem(40px);
        color: #fff;
        background-size: 100%;
        background: no-repeat center;
        background: url('./assets/gzhback.png') !important;
        .gzh-num{
          font-size: pxrem(74px);
          color: #00F6FF;
          margin-left:pxrem(30px);
        }
        .gzh-icon{
          width: pxrem(54px);
          height: pxrem(44px);
          background-size: 100%;
          margin-right:pxrem(20px);
          background: url('./assets/gzhicon.png') !important;
        }
      }
      .list{
            width: 100%;
            padding-top: pxrem(60px);
            .list-item{
                width: 16.6%;
                &:nth-child(n+7){
                  margin-top:pxrem(106px)
                }
                .avatar{
                    border-radius:pxrem(20px);
                    width: pxrem(150px);
                    height: pxrem(150px);
                    margin-bottom: pxrem(28px);
                }
                p.list-title{
                    line-height: pxrem(34px);
                    font-size: pxrem(34px);
                    color: #fff;
                }
            }
      }
  }
}
</style>

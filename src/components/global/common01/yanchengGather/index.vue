<template>
  <div class="common01-yancheng">
    <img src="./assets/zs.png" class="img-zs1">
    <img src="./assets/zs.png" class="img-zs2">
    <img src="./assets/zs.png" class="img-zs3">
    <img src="./assets/zs.png" class="img-zs4">
    <img src="./assets/zs.png" class="img-zs5">
    <div class="yancheng-wrap">
        <div class="rong-box">
            <!-- <img src="./assets/image.jpeg" alt=""> -->
        </div>
        <div class="bo-box">
            <img class="bo-logo" src="./assets/hhfb.png" alt="">
            <img class="bo2" src="./assets/bo2.png" alt="">
            <p>盐城广播</p>
        </div>
        <div class="bao-box"></div>
        <div class="wang-box">
            <div class="wang-list">
                <div class="wang-list-item" v-for="(item,i) in wangList" :key="i">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="wei-box">
            <div class="wei-list">
                <div class="wei-list-item" v-for="(item,i) in weiList" :key="i">
                    <img :src="item.img" alt="">
                    <div>
                        <p class="wei-title">{{item.title}}</p>
                        <p class="wei-tag">{{item.source}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="duan-box">
            <div class="duan-list">
                <div class="duan-list-item" v-for="(item,i) in duanList" :key="i">
                    <p class="duan-title">{{item.title}}</p>
                    <p class="duan-tag">
                        <span>{{item.source}}</span>
                        <span style="margin-left:0.2rem;">{{item.date}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yanchengGather',
  data () {
    return {
      wangList: ['马化腾已经对库克动手了，网友 们表示：就看马云的了', '马化腾已经对库克动手了，网友 们表示：就看马云的了', '马化腾已经对库克动手了，网友 们表示：就看马云的了', '马化腾已经对库克动手了，网友 们表示：就看马云的了'],
      weiList: [
        {title: '黄海街道“娃娃趣说到...', source: '黄海街道', img: require('./assets/hhfb.png')},
        {title: '2020年全国两会政府...', source: '千年珠溪', img: require('./assets/qnzx.png')},
        {title: '两会闭幕！你的生活将...', source: '城南财政', img: require('./assets/cncz.png')},
        {title: '全国人大闭幕次日，李...', source: '城南社保', img: require('./assets/cnsb.png')}
      ],
      duanList: [
        {title: '俄媒：中国对美博弈可能“不战...', source: '青年网', date: '06-02 13:09'},
        {title: '端午节放假安排来了！还有一个...', source: '环球网', date: '06-02 13:09'},
        {title: '华为随行WiFi 3正式发售 重量仅...', source: '人民网', date: '06-02 13:09'},
        {title: '签证禁令下的中国“国防七校”赴..', source: '环球网', date: '06-02 13:09'}
      ]
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
.common01-yancheng {
  width: 100%;
  height: 100%;
  padding: pxrem(20px) 0 pxrem(40px) 0;
  position: relative;
  .img-zs1{
    position: absolute;
    bottom:pxrem(8px);;
    left:pxrem(1170px);
  }
  .img-zs2{
    position: absolute;
    bottom:pxrem(8px);;
    left:pxrem(2050px);
  }
  .img-zs3{
    position: absolute;
    bottom:pxrem(8px);;
    left:pxrem(2890px);
  }
  .img-zs4{
    position: absolute;
    bottom:pxrem(8px);
    left:pxrem(3830px);
  }
  .img-zs5{
    position: absolute;
    bottom:pxrem(8px);
    left:pxrem(4780px);
  }
  .yancheng-wrap{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
        .rong-box{
            width: pxrem(1230px);
            height: 100%;
            background: url("./assets/rong1.png") no-repeat;
            padding: pxrem(200px) pxrem(40px) pxrem(40px) pxrem(230px);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bo-box{
            width: pxrem(910px);
            height: 100%;
            background: url("./assets/bo1.png") no-repeat;
            background-size: 100% 10.3rem;
            position: relative;
            .bo-logo{
                width: pxrem(150px);
                height: pxrem(150px);
                position: absolute;
                top: 30%;
                left: 52%;
            }
            .bo2{
                width: 90%;
                height: pxrem(265px);
                position: absolute;
                bottom: pxrem(10px);
                left: pxrem(140px);
            }
            p{
                font-size:pxrem(70px);
                font-family:PingFang SC;
                font-weight:600;
                text-align: center;
                color:rgba(255,255,255,1);
                position: absolute;
                top: 48%;
                left: 45%;
            }
        }
        .bao-box{
            width: pxrem(870px);
            height: 100%;
            background: url("./assets/bao.png") no-repeat;
            background-size: 100% 10.3rem;
        }
        .wang-box{
            width: pxrem(970px);
            height: 100%;
            background: url("./assets/wang.png") no-repeat;
            background-size: 100% 10.3rem;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(230px);
            .wang-list{
                width: 100%;
                height: 100%;
                .wang-list-item{
                    padding: pxrem(20px);
                    width:pxrem(660px);
                    height:pxrem(146px);
                    background:linear-gradient(180deg,rgba(26,118,255,0.24) 0%,rgba(0,110,252,0) 100%);
                    margin-bottom: pxrem(50px);
                    text-align: left;
                    font-size: pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(254,254,254,1);
                }
            }
        }
        .wei-box{
            width: pxrem(950px);
            height: 100%;
            background: url("./assets/wei.png") no-repeat;
            background-size: 100% 10.3rem;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(260px);
            .wei-list-item{
                width:pxrem(660px);
                height:pxrem(146px);
                display: flex;
                flex-direction: row;
                margin-bottom: pxrem(50px);
                img{
                    width: pxrem(150px);
                    height: pxrem(150px);
                    margin-right: pxrem(20px);
                }
                .wei-title{
                    font-size:pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    text-align: left;
                    color:rgba(255,255,255,1);
                    margin-bottom: pxrem(20px);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .wei-tag{
                    font-size: pxrem(36px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(0,198,255,1);
                    text-align: left;
                }
            }
        }
        .duan-box{
            width: pxrem(960px);
            height: 100%;
            background: url("./assets/duan.png") no-repeat;
            background-size: 100% 10.3rem;
            padding: pxrem(240px) pxrem(40px) pxrem(40px) pxrem(260px);
            .duan-list-item{
                width:pxrem(660px);
                height:pxrem(146px);
                margin-bottom: pxrem(50px);
                border-bottom:2px dashed rgba(0,222,255,1);
                    .duan-title{
                    font-size:pxrem(40px);
                    font-family:PingFang SC;
                    font-weight:400;
                    text-align: left;
                    color:rgba(255,255,255,1);
                    margin-bottom: pxrem(20px);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .duan-tag{
                    font-size: pxrem(36px);
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(0,198,255,1);
                    text-align: left;
                }
            }
        }
  }
}

</style>

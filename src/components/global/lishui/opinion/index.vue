<template>
  <div class="lishui-opinion">
    <div class="opinion-wrap" v-if="!showDetail">
      <el-button class="btn-page pre" type="text" @click="goTo(0)">上一页</el-button>
      <el-button class="btn-page next" type="text" @click="goTo(1)">下一页</el-button>
      <div class="common01-title">{{viewAttr.header || '民生热点'}}</div>
      <div class="wrap-list sys-flex sys-flex-center flex-justify-between" @click="showContentDetail(v)" v-for="(v, k) in currentData" :key="k">
        <div class="title overhidden">{{v.title}}</div>
        <div class="time sys-flex sys-flex-center">
          <img src="../manuscriptOutput/assets/time.png" />
          <span>{{v.time}}</span>
        </div>
      </div>
    </div>
    <div class="opinion-detail" v-if="showDetail">
      <div class="detail-title sys-flex sys-flex-center">
        <div class="back" @click="backList">
          <img src="./assets/back.png" />
        </div>
        <div class="title">{{detail.title}}</div>
      </div>
      <div class="detail-content">
        <div>{{detail.content}}</div>
        <div v-if="detail.imgs && detail.imgs[0]" class="imgs">
          <img :src="v" v-for="(v, k) in detail.imgs" :key="k" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'opinion',
  data () {
    return {
      detail: {},
      showDetail: false,
      dataList: [{
        title: '栖凤北路路况',
        time: '2020-01-13 04:12',
        content: '栖凤北路红绿灯路口路面好长时间没有修复，大概有4个月了，存在安全隐患。',
        imgs: ['http://cdnapp.ls114.cn/pic/20200113/1578859801213837_977.jpg', 'http://cdnapp.ls114.cn/pic/20200113/1578859801229212_334.jpg'],
        url: 'http://www.ls114.cn/thread-486764-1-1.html'
      }, {
        title: '关于福田社区蝉山村新农村建设村容村貌的疑问',
        time: '2020-01-11 09:35',
        content: '2019年10月份溧水区响应中央文件精神，花巨资对开发区福田社区蝉山村的村容村貌的进行了整治，当时使村里的环境焕然一新，可这次回村却发现村里的环境又恢复到了整治前的那样一塌糊涂，建筑垃圾，生活垃圾到处堆放无人清理，村里的道路两边护栏被损坏无人修补，触目惊心，当初耗费钱财人力去做整治为了应付领导的视察，可领导视察完后福田社区和蝉村委会就不管不问，请问福田社区和村委会的各位领导你们就是如此应付工作的吗？财政拨款的资金到底被你们如此挥霍，你们不觉得可耻和浪费吗？请福田社区的领导不要整天在办公室喝茶聊天玩手机了到村上去实地走访看下吧，毕竟福田社区办公场所就在蝉山村进村口，把图片晒出来给你们领导看看吧，你们这是为人民办事吗',
        imgs: ['http://cdnapp.ls114.cn/pic/20200111/157868361476795994.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683615577206731.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683616344884458.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683617172663762.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683618000944423.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683618798217263.jpg', 'http://cdnapp.ls114.cn/pic/20200111/1578683679889084419.jpg'],
        url: 'http://www.ls114.cn/thread-486608-1-1.html'
      }, {
        title: '树枝已断，非常有安全隐患，无人管理',
        time: '2020-01-11 10:42',
        content: '洪兰吕家边一进村有棵大树，树下是停车场，大树由于年数较多，一个大树枝已断裂，经常砸到停放在下面的车辆，人来人去非常危险。村里领导不管不问，请有关部门尽快协调处理，不要等出了人命了再处理。',
        imgs: ['http://cdnapp.ls114.cn/pic/20200111/1578732881702485_87.jpg'],
        url: 'http://www.ls114.cn/thread-486670-1-1.html'
      }, {
        title: '石山公园的篮球架，有架无板',
        time: '2020-01-13 13:32',
        content: '石湫政府领导，请求领导百忙之中，过问一下石山公园的篮球架，有架无板了，是因为前不久学生打球所致，盼近期修复，谢谢',
        url: 'http://www.ls114.cn/thread-486838-1-1.html'
      }, {
        title: '城区主要交通干道的建设问题',
        time: '2020-01-13 14:02',
        imgs: ['https://m-team.cloud.hoge.cn/81/materials/materials/image/2020/0119/9d4c3426b6cd4d3198e83439baf17b3d.png', 'https://m-team.cloud.hoge.cn/81/materials/materials/image/2020/0119/4513c770504cad0a4bdd2a5ebdacbaea.png'],
        content: '在我们溧水城区主要交通干道的扩建中，部分断头路还没彻底打通，例如：淮源街向北至交通路，现状是丁字路，再向北至中山河永寿路，距离交通路近200多米，十几年来始终没有打通。',
        url: ''
      }, {
        title: '请问开发区沙河村的过渡费什么时候发？',
        time: '2020-01-13 10:44',
        content: '永阳镇都发了，开发区什么时候发？年前还能不能发？',
        url: 'http://www.ls114.cn/thread-486820-1-1.html'
      }, {
        title: '请问秋湖嘉苑一期何时能领房产证',
        time: '2020-01-13 12:14',
        content: '请问秋湖嘉苑一期何时能领房产证',
        url: 'http://www.ls114.cn/thread-486827-1-1.html'
      }, {
        title: '轻轨溧水站西面的小吃街',
        time: '2020-01-06 14:23',
        content: '轻轨溧水站旁边的小吃街怎幺没动静了？',
        url: 'http://www.lsxww.net/thread-61775-1-1.html'
      }, {
        title: '荷花嘉苑地下车库太脏',
        time: '2019-12-29 09:55',
        content: '荷花嘉苑地下车库，通道路面破损严重，垃圾常年无人打扫。车库地面灰尘垃圾十分恶心。电梯通道蜘蛛撞头。电灯不亮。快过年了，恳请相关领导和社区关心。让百姓干干净净过年。',
        url: 'http://www.lsxww.net/thread-61795-1-1.html'
      }, {
        title: '广成北门车库作为商铺严重影响小区环境和治安',
        time: '2019-10-31 21:29',
        content: '广成北门91栋、92栋、93栋的一楼车库现在大批量的被改造成为服装店、水果店、美容店等等。这些车库改造成为商铺危害如下：一、没有营业执照，商品质量无保证，属于无证经营。恳请工商局领导好好查查这些无证经营的店铺。二、影响居民夜间休息，很多服装店一直到十点十一点还灯火通明，在楼下大声喧哗，严重影响居民正常休息。三、影响小区交通，本来广成作为老小区，停车压力巨大，这些商铺吸引了顾客来，很多顾客直接把车停在车库门口或者道路上，导致其他车辆出入堵塞。四、影响小区治安，很多不属于本小区的人经常以光顾店铺为名在小区游荡，对居民的财产安全存在重大隐患。五、消防隐患重大。这些店铺没有通风设施，没有安全通道，一旦发生火灾，后果不堪设想，甚至对整栋楼的住户都构成威胁。综上所述，希望永阳街道的领导能够结合相关部门针对这些车库商铺进行一次重点整顿，必须清除这些重大隐患，还居民一片安静、安全、安心。',
        url: 'http://www.lsxww.net/thread-60422-1-1.html'
      }, {
        title: '强烈建议，天鸿国际到机场路改为单向一车道',
        time: '2020-01-13 08:33',
        content: '改为单向一车道双向两车道后 ，司机们才有更多的时间看花坛风景，理解设计者的苦衷',
        url: 'http://www.ls114.cn/thread-486786-1-1.html'
      }, {
        title: '锦绣家园物业问题',
        time: '2020-01-14 11:51',
        content: '小区漆黑，晚上也不开路灯，一到下雨，路面积水。偶尔开路灯的地方，跟萤火虫一样。这个就成了死循环么？物业会说：收不上物业。没交业主会说：路灯不点。楼梯不扫。车被撞了，被告之无监控。就成了死循环么？',
        url: 'http://www.ls114.cn/thread-486944-1-1.html'
      }, {
        title: '恒大金碧天下湖光苑广场舞扰民',
        time: '2020-01-14 13:46',
        content: '感谢区公安分局的重视，据官方回复已经过去几天了，楼下仍歌舞升平，音乐一首跟着一首，我想问一下，你们确定你们和组织者联系过了，让她音量小一些了，是吗？？我想问一下，居民楼楼下，跳广场只是调小音量就可以了吗？？试问，如果我们人人都拎着音响在楼下听歌，跳舞，锻炼身体这样可以吗？恒大小区有这么多的健身器材，就是为了居民强身健体的，小区地方空旷，也有那么多地方既不扰民还可以一展舞姿，就为了就近而非要在居民楼楼下跳舞吗？？我们为了孩子，搬家到此，就为了有一个安静的环境，现在就为了仅仅几个人的愉快，非要我妥协？还是再次搬家呢？我的诉求是，请她们到别处跳，爱怎么跳怎么跳，前提不能扰民',
        url: 'http://www.ls114.cn/thread-486964-1-1.html'
      }, {
        title: '如此“四网合一”谁来管？',
        time: '2020-01-15 10:37',
        content: '庆丰小区园村淮源街东片区刚出新好，楼道里刚粉刷干净。“四网合一”整理线路，把楼道里整理成这样（如图）几乎每幢楼都这样，把东西拆了就不管了，过去几个星期了无人过问。如此工作态度让市民惊讶。楼道里出新有何用？电信、移动、联通、广电------“四网合一”谁来负责擦屁股？？',
        imgs: ['http://cdn.ls114.cn/forum/202001/15/103321adsrrsx010crux1b.jpg', 'http://cdn.ls114.cn/forum/202001/15/103403s0qsxxs44der0qb8.jpg', 'http://cdn.ls114.cn/forum/202001/15/103419ck9uctsfe0gzsrst.jpg', 'http://cdn.ls114.cn/forum/202001/15/103428tvxhlosfolixxzfx.jpg'],
        url: 'http://www.ls114.cn/thread-487052-1-1.html'
      }, {
        title: '东屏街道的主干道常溧公路的灯问题',
        time: '2020-01-11 08:33',
        content: '昨天小雨下了一下午，东屏街道的主干道常溧公路的灯到六点还没有全亮，有些车辆开启了远光灯，路面是漆黑黑的一片，能见度极低。我想问发生交通事故东屏街道负责吗？希望能得到东屏街道领导的足够重视。谢谢！',
        url: 'http://www.ls114.cn/thread-486643-1-1.html'
      }, {
        title: '栖凤北路红绿灯路口路面好长时间没有修复',
        time: '2020-01-13 12:08',
        content: '栖凤北路红绿灯路口路面好长时间没有修复，大概有4个月了，存在安全隐患。',
        imgs: ['http://cdnapp.ls114.cn/pic/20200113/1578859801213837_977.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20', 'http://cdnapp.ls114.cn/pic/20200113/1578859801229212_334.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20'],
        url: 'http://www.ls114.cn/thread-486764-1-1.html'
      }, {
        title: '关于福田社区蝉山村新农村建设村容村貌的疑问',
        time: '2020-01-11 14:42',
        content: '2019年10月份溧水区响应中央文件精神，花巨资对开发区福田社区蝉山村的村容村貌的进行了整治，当时使村里的环境焕然一新，可这次回村却发现村里的环境又恢复到了整治前的那样一塌糊涂，建筑垃圾，生活垃圾到处堆放无人清理，村里的道路两边护栏被损坏无人修补，触目惊心，当初耗费钱财人力去做整治为了应付领导的视察，可领导视察完后福田社区和蝉村委会就不管不问，请问福田社区和村委会的各位领导你们就是如此应付工作的吗？财政拨款的资金到底被你们如此挥霍，你们不觉得可耻和浪费吗？请福田社区的领导不要整天在办公室喝茶聊天玩手机了到村上去实地走访看下吧，毕竟福田社区办公场所就在蝉山村进村口，把图片晒出来给你们领导看看吧，你们这是为人民办事吗',
        imgs: [
          'http://cdnapp.ls114.cn/pic/20200111/157868361476795994.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683615577206731.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683616344884458.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683617172663762.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683618000944423.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683618798217263.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20',
          'http://cdnapp.ls114.cn/pic/20200111/1578683679889084419.jpg?x-oss-process=image/watermark,image_cGljLzIwMTgwNzI1L29zc18xNTMyNTA4NzI1NjEzXzQyXzc1OV81NTkucG5n,t_50,g_se,x_20,y_20'
        ],
        url: 'http://www.ls114.cn/thread-486608-1-1.html'
      }, {
        title: '15路公交新规划问题',
        time: '2020-01-13 09:21',
        content: '弱弱的问一句，现在溧水人民医院附近15路路线怎么规划的，体育公园人民医院北门施工什么时候竣工，说好的1月15日结束，现在也没有结束迹象。最近公交车老是等不到，不知道是改路线了还是请告知一下，以往是坐公交车上班，现在只能打的。',
        url: 'http://www.ls114.cn/thread-487134-1-1.html'
      }, {
        title: '和凤镇骆驼桥村断修路，何时铺',
        time: '2020-01-15 15:16',
        content: '老家房子在和凤镇骆驼桥村村东头池塘边，之前新农村建设，从村头修了水泥路。结果距离我家十几米处就断修了。每到下雨就非常泥泞，车子行驶打滑，好几次差点滑进旁边田里，人员经过也易摔倒。别的村水泥路都是根据村民房子修的，请问为什么一直不给铺？何时给铺？',
        imgs: ['http://cdn.ls114.cn/forum/202001/15/154244n0za5t0prqsffrt0.jpeg', 'http://cdn.ls114.cn/forum/202001/15/154226jtxgtz2ddaxxg71d.jpeg', 'http://cdn.ls114.cn/forum/202001/15/154218jw9ix4kl9x2f2999.jpeg'],
        url: 'http://www.ls114.cn/thread-487100-1-1.html'
      }, {
        title: '省溧中东门路段路灯问题',
        time: '2020-01-13 09:27',
        content: '省溧中东门路段这两天路灯不亮、交通安全有隐患、望关注尽快解决',
        url: 'http://www.ls114.cn/thread-486842-1-1.html'
      }],
      currentIndex: 0,
      currentData: [],
      currentData2: []
    }
  },
  mounted () {
    this.currentData = this.dataList.slice(0, 10)
  },
  methods: {
    goTo (val) {
      this.currentIndex = val
      if (this.currentIndex === 0) {
        this.currentData = this.dataList.slice(0, 10)
      } else {
        this.currentData = this.dataList.slice(10, 20)
      }
    },
    showContentDetail (value) {
      this.showDetail = true
      this.detail = value
    },
    backList () {
      this.showDetail = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-opinion {
  width: 100%;
  height: 100%;
  padding: pxrem(33px) pxrem(26px) pxrem(53px) pxrem(50px);
  color: #fff;
  position: relative;
  .common01-title{
    font-family: PingFangSC-Semibold;
    font-size: pxrem(70px);
    position: absolute;
    top: pxrem(-25px);
    left: calc(50% - 20px);
    transform: translate(-50%, 0);
    letter-spacing: pxrem(10px);
  }
  .opinion-wrap {
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: pxrem(100px);
    .wrap-list {
      font-size: pxrem(40px);
      margin-bottom: pxrem(22px);
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        width: 70%;
        text-align: left;
      }
      .time {
        font-size: pxrem(36px);
        img {
          width: pxrem(30px);
          height: pxrem(30px);
          object-fit: cover;
          margin-right: pxrem(18px);
        }
      }
    }
    .btn-page{
      bottom: 0.2rem;
      color: #fff;
      position: absolute;
      text-align: center;
      cursor: pointer;
      width: 1.5rem;
      height: 0.6rem;
      font-size: 0.34rem;
    }
    .next{
      right: 0.8rem;
    }
    .pre{
      left: 0.8rem;
    }
  }
  .opinion-detail {
    width: 100%;
    height: 100%;
    padding: pxrem(50px) pxrem(60px) 0;
    .detail-title {
      padding-bottom: pxrem(20px);
      border-bottom: pxrem(2px) dashed #00EAFF;
      .back {
        width: pxrem(44px);
        height: pxrem(44px);
        cursor: pointer;
        margin-right: pxrem(20px);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      .title {
        font-size: pxrem(50px);
        font-weight: bold;
      }
    }
    .detail-content {
      width: 100%;
      height: pxrem(800px);
      font-size: pxrem(36px);
      margin-top: pxrem(40px);
      overflow-y: scroll;
      text-align: left;
      .imgs{
        display: flex;
        text-align: center;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      img {
        display: block;
        width: pxrem(600px);
        margin-top: pxrem(20px);
      }
    }
  }
}
</style>

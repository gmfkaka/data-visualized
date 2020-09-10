<template>
  <div class="xy-newspaper" id="xy-newspaper">
    <div class="newspaper-wrap sys-flex sys-vertical">
      <div class="newspaper-title sys-flex sys-flex-center">{{newspaperTitle}}</div>
      <div class="newspaper-box">
        <iframe :src="url"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newspaper',
  data () {
    return {
      newspaperTitle: '数字报',
      url: 'http://epaper.routeryun.com/Home/Page/index/mdid/95353.html'
    }
  },
  mounted () {
    this.setFontsize('xy-newspaper')
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/index.scss';
.xy-newspaper {
  width: 100%;
  padding: 0.25vh 0.1vw;
  .newspaper-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0 px1em(17px);
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .newspaper-title {
    text-align: left;
    height: 15%;
    font-size: px1em(22px);
    font-weight: bold;
    color: #d6e6ff;
  }
  .newspaper-box {
    width: 80%;
    height: 85%;
    margin: 0 auto;
    iframe {
      display: block;
      width: 100%;
      height: 86%;
      margin-top: 2%;
      outline: none;
      border: none;
      box-shadow: none;
      -webkit-appearance: none;
      transform: scale(1, 1.1);
    }
  }
}
</style>

<template>
  <div class="lishui-websitecontent" id="lishui-websitecontent">
    <div class="websitecontent-wrap">
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'websiteContent',
  data () {
    return {
      url: `http://www.lsrmw.cn/default.php?time=${(new Date()).getTime()}`
    }
  },
  mounted () {
    this.setFontsize('lishui-websitecontent')
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
.lishui-websitecontent {
  width: 100%;
  height: 100%;
  padding: px2em(33px) px2em(26px) px2em(53px) px2em(50px);
  position: relative;
  .websitecontent-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/border.png') no-repeat center;
    background-size: 100% 100%;
    padding: px2em(163px) px2em(274px) px2em(80px) px2em(270px);
    iframe {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      box-shadow: none;
      -webkit-appearance: none;
    }
  }
}
</style>
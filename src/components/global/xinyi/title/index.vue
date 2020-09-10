<template>
<!--  :class="[{'warp-bg' : showDefault}]"  -->
  <div class="xy-title sys-flex sys-flex-center warp-bg" id="xy-title">
    <div class="title-title">{{titleTitle}}</div>
  </div>
</template>

<script>
export default {
  name: 'xinyi',
  data () {
    return {
      titleTitle: '新沂市融媒体指挥调度中心'
    }
  },
  mounted () {
    this.setFontsize('xy-title')
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.xy-title {
  width: 100%;
  height: 100%;
  padding: 0.25vh 0.5vw;
  // background: url("./assets/bg-01.png") no-repeat center;
  // background-size: 100%;
  .title-title {
    width: 100%;
    font-size: 1.4em;
    letter-spacing: 0.10em;
    font-weight: bold;
    color: #ffffff;
    transform: scaleY(1.5)
  }
}
.warp-bg {
  // background: url('./assets/bg.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
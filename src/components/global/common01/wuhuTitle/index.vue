<template>
  <div class="common01-title" id="common01-title">
   <img src="./assets/title.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'title',
  data () {
    return {
      titleTitle: ''
    }
  },
  mounted () {
    this.setFontsize('common01-title')
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
.common01-title {
  width: 100%;
  height: 100%;
  background: url('./assets/titlebg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
      width: 80%;
  }
  .title-title {
    width: 100%;
    font-size: pxrem(120px);
    letter-spacing: 0.10em;
    font-weight: bold;
    color: #ffffff;
    line-height: pxrem(210px);
    font-family:PingFang SC;
    font-weight:600;
  }
}
</style>

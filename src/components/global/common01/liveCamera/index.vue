<template>
  <div class="common01-live">
      <div class="live-wrap sys-flex sys-flex-center flex-justify-center">
        <img src="./assets/camera.png" alt="">
      </div>
  </div>
</template>
<script>
export default {
  name: 'liveCamera',
  data () {
    return {

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
.common01-live {
    padding: pxrem(40px);
    width: 100%;
    height: 100%;
    .live-wrap{
      height: 100%;
      background: url("./assets/border.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      img{
          width: 99%;
          height: 99%;
      }
    }
}
</style>

<template>
  <div class="hg-command-system" id="command-system">
    <!-- 融云视频 -->
    <call
    :info-item.sync="callInfo"
    :call-show.sync="callShow"
    :call-type.sync="callType"
    ></call>
  </div>
</template>

<script>
import call from './call.vue'
export default {
  name: 'commandsystem',
  data () {
    return {
      defaultAvatar: require('@/assets/avatar/touxiang.png'),
      callInfo: {}, // 主叫人信息
      callShow: false, // 是否显示呼叫框
      callType: 'video' // 主叫呼叫类型  audio  video
    }
  },
  computed: {
  },
  mounted () {
    this.setFontsize('command-system')
  },
  components: {
    call
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '~@/styles/index.scss';
.hg-command-system{
  width: 100vw;
  height: 100vh;
  background:url(./assets/bg_home@2x.png) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}
</style>

<template>
  <div class="hg-command-system" id="command-system">
    <div class="userinfo sys-flex sys-flex-center" v-if="userDetail">
      <img class="avatar" :src="userDetail.avatar ? userDetail.avatar.url : defaultAvatar" alt="" />
      <div class="sys-flex-one">
        <div class="user-name">{{userDetail.member_name}}</div>
        <div class="user-role">{{userDetail.orgInfo ? userDetail.orgInfo.title : ''}}</div>
      </div>
      <router-link :to="`/login`" class="exit-icon"></router-link>
    </div>
    <!-- 融云视频 -->
    <call
    :info-item.sync="callInfo"
    :call-show.sync="callShow"
    :call-type.sync="callType"
    ></call>
    <div class="hg-footer">©吉林广播电视台  版权所有</div>
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
    userDetail () {
      return this.$store.state.global.userDetail
    }
  },
  mounted () {
    this.setFontsize('command-system')
  },
  components: {
    call
  },
  created () {
    this.$store.dispatch('global/GET_USER_DETAIL').then(res => {
      if (res.data.code === 300) {
        this.$router.replace('/login')
      }
    })
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
  .userinfo{
    position: absolute;
    right: 0;
    top: 24px;
    width: 163px;
    height: 40px;
    background:url(./assets/img_home_people@2x.png) no-repeat center center;
    border-radius: 25px 0 0 25px;
    .user-name{
      font-size: 12px;
      color: #fff;
    }
    .user-role{
      font-size:7px;
      color: #fff;
    }
    .avatar{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 4px 0 12.5px;
    }
    .exit-icon{
      width: 22px;
      height: 22px;
      margin-right: 10px;
      border-radius: 50%;
      background:url(./assets/btn_home_out@2x.png) no-repeat center center;
      background-size: 100%;
    }
  }
  .hg-footer{
    font-size: 10px;
    position: absolute;
    text-align: center;
    bottom: 12px;
    color: #fff;
    width: 100%;
  }
}
</style>

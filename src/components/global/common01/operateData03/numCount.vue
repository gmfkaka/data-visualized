<template>
  <div class="num-wrap sys-flex sys-flex-center" :class="fontcolor">
    <div
      class="num-list animated"
      v-for="(v,k) in nums"
      :key="k"
      :class="{'flipInX' : v}"
      v-bind:style="{'animation-delay' : k/4+'s'}">
        {{v}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'numCount',
  data () {
    return {
      nums: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  props: {
    numInfo: Array,
    fontcolor: String
  },
  mounted () {
    this.initNumInfo(this.numInfo)
  },
  methods: {
    initNumInfo (res) {
      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          if (parseInt(this.nums[i]) !== parseInt(res[i])) {
            let dom = document.getElementsByClassName('animated')[i]
            dom.classList.remove('flipInX')
            setTimeout(() => {
              dom.classList.add('flipInX')
              this.$set(this.nums, i, res[i])
            }, '1000')
          }
        }
      }
    }
  },
  watch: {
    numInfo (res) {
      this.initNumInfo(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.num-wrap {
  &.green {
    color: #00FFBA;
  }
  &.red {
    color: #FF802C;
  }
  &.yellow {
    color: #F5F33F;
  }
  .num-list {
    width: 1em;
    height: 1.2em;
    line-height: 1em;
    font-size: 0.6em;
    background: url("./assets/numbg.png") no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    font-weight: 600;
    &:not(:last-child) {
      margin-right: 0.2em;
    }
  }
}
</style>

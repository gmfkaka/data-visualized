<template>
    <div class="main-wrap">
       <iframe :src="url"></iframe>
    </div>
</template>

<script>
export default {
  name: 'paperCtr',
  data () {
    return {
      url: 'https://hr.wuhunews.cn/fangyishuju/'
    }
  },
  components: {
  },

  created () {

  },

  mounted () {

  },

  methods: {}
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:100%;
        position: relative;
        overflow: hidden;
        iframe{
            display: block;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            box-shadow: none;
            -webkit-appearance: none;
            overflow: hidden;
        }
    }
</style>



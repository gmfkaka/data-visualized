<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
import { configInfo } from '@/config/common'
export default {
  name: 'App',
  created () {
    this.changeTitle()
  },
  methods: {
    changeTitle () {
      configInfo.forEach(val => {
        if (location.href.indexOf(val.guid) > -1) {
          document.title = val.title
          var link = document.head.querySelector("link[rel*='icon']")
          link.href = `/static/${val.favicon}.png`
          // document.getElementsByTagName('head')[0].appendChild(link)
        }
      })
    }
  }
  // watch: {
  //   $route: function (v) {
  //     // 盐湖大屏更换标题
  //     if (/ZTk3ZjE1Ym/.test(location.href)) {
  //       document.title = '盐湖区新时代文明实践中心'
  //     }
  //     if (/NWQ2NzNmNz/.test(location.href)) {
  //       document.title = '金山区新时代文明实践中心'
  //     }
  //   }
  // }
}
</script>

<style>
</style>

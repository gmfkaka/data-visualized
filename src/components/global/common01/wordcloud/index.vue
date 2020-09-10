<template>
 <div class="common01-web">
      <div class="hot-wrap">
        <div class="hotword-wrap flex" id="word-cloud">
            <div class="word-cloud" ref="wordcloud" v-if="hotWordsList.length"></div>
        </div>
      </div>
  </div>
</template>
<script>
import { getCloudHotword } from '@/servers/interface'
import echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'hotword',
  data () {
    return {
      proportion: 1,
      hotWordsList: []
    }
  },
  created () {
    this.getWordsList()
    setInterval(() => {
      this.getWordsList()
    }, 15000)
  },
  methods: {
    initWordCloud () {
      const _this = this
      _this.myChart = echarts.init(this.$refs.wordcloud)
      _this.options = {
        series: [
          {
            type: 'wordCloud',
            gridSize: this.proportion * 50,
            sizeRange: [80, 180],
            rotationRange: [0, 90],
            rotationStep: 90,
            shape: 'square',
            width: '100%',
            height: '100%',
            top: 0,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.hotWordsList
          }
        ]
      }
      _this.myChart.setOption(_this.options)
    },
    getWordsList () {
      getCloudHotword().then(res => {
        if (res.data.result.data && res.data.result.data[0]) {
          let newList = []
          let list = res.data.result.data
          list.forEach(element => {
            let obj = {
              name: element.key,
              value: element.doc_count
            }
            newList.push(obj)
          })
          this.hotWordsList = newList
          this.$nextTick(() => {
            this.initWordCloud()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/index.scss";
@import '../style/index.scss';
.common01-web {
  width: 100%;
  height: 100%;
  padding: pxrem(40px);
  .hot-wrap{
    width: 100%;
    height: 100%;
    background: url("./assets/border.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .hotword-wrap {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        position: relative;
        padding: pxrem(120px) pxrem(50px) pxrem(50px);
        .word-cloud {
            height: 100%;
            flex: 1;
        }
    }
  }
}
</style>

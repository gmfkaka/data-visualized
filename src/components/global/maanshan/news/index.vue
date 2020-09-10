<template>
  <div class="maanshan-news" id="maanshan-news">
    <div class="news-wrap sys-flex sys-vertical" >
      <div class="news-title sys-flex sys-flex-center">{{componentTitle}}</div>
      <div
        class="news-list animated sys-flex sys-flex-center"
        :class="{'flipInX' : v}"
        :style="{'animation-delay' : k/2 + 's'}"
        v-for="(v,k) in dataList"
        :key="k"
      >
        <!-- <div 
          class="list-icon"
          :class="{'bgzero': k%4 === 0, 'bgfir': k%4 === 1, 'bgsec': k%4 === 2, 'bgfour': k%4 === 3}"
        >{{k+1}}</div> -->
        <div class="list-title overhidden">{{v.title}}</div>
        <!-- <div class="list-number sys-flex sys-flex-center flex-justify-center">
          <span class="list-number-icon read-icon"></span>
          <span class="list-number-text">{{ v.click_num }}</span>
        </div> -->
        <div class="list-time">{{v.create_time}}</div>
        <!-- <div class="list-title overhidden">{{v.title}}</div>
        <div class="list-user overhidden">{{v.project_user_name}}</div>
        <div class="list-time">{{v.update_time | dateFormat}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getMicroOperationArticleList } from '@/servers/interface'
export default {
  name: 'news',
  data () {
    return {
      componentTitle: '稿件排行',
      dataList: [],
      bind_id: '748',
      count: 4,
      page: 1,
      isPaging: true,
      frequency: 10000,
      maxPage: 10
    }
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.setFontsize('maanshan-news')
    setInterval(() => {
      this.getDataList()
    }, this.frequency)
  },
  methods: {
    getDataList () {
      getMicroOperationArticleList(this.bind_id, this.count, this.page).then((res) => {
        if (!res.data.error_code) {
          if (res.data.result.data.length) {
            this.dataList = []
            setTimeout(() => {
              this.dataList = res.data.result.data.map(v => {
                return {
                  title: v.title,
                  create_time: v.create_time.replace('T', ' ').slice(5, 16)
                }
              })
            }, 100)
            if (this.isPaging) {
              this.page += 1
              if (this.page > this.maxPage) {
                this.page = 1
              }
            }
          } else {
            if (this.page !== 1) {
              this.page = 1
              this.getDataList()
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.maanshan-news {
  width: 100%;
  height: 100%;
  padding: 0.4em;
  .news-wrap {
    width: 100%;
    height: 100%;
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
    padding: 0.85em;
  }
  .warp-bg {
    background: url('./assets/bg.png') no-repeat center;
    background-size: 100% 100%;
  }
  .news-title {
    height: 1em;
    text-align: left;
    font-size: 0.8em;
    font-weight: bold;
    color: #D6E6FF;
    margin-bottom: 1.25em;
  }
  .news-list {
    padding-left: 0.5em;
    margin-bottom: 0.97em;
    color: #ffffff;
    background-size: 100%;
    .list-title {
      flex: 1;
      font-size: 0.58em;
      text-align: left;
    }
    .list-user {
      flex-basis: 10%;
      font-size: 0.42em;
    }
    .list-time {
      flex-basis: 20%;
      font-size: 0.42em;
    }
    .list-icon {
      width: 1.25em;
      height: 1.25em;
      line-height: 1.25em;
      font-size: 0.56em;
      margin-right: 0.3em;
      text-align: center;
    }
    .bgzero {
      background-color: #3f8aff;
    }
    .bgfir {
      background-color: #fc8e26;
    }
    .bgsec {
      background-color: #1f56ab;
    }
    .bgfour {
      background-color: #b2c6e2;
    }
    .list-number {
      flex-basis: 20%;
      color: rgba(243, 248, 254, 0.5);
      .list-number-icon {
        font-size: 0.56em;
        width: 1em;
        height: 1em;
        margin-right: 0.35em;
        &.read-icon {
          background: url('./assets/read.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
      .list-number-text {
        font-size: 0.42em;
      }
    }
  }
}
</style>

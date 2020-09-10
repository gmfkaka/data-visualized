import * as modules from '@/components/_modules'
import { configInfo } from '@/config/common'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      currentViewId: '',
      pageAnimated: false,
      maxPage: 10
    }
  },
  computed: {
  },
  // 配置项赋值提前到创建钩子，组件定时器放在挂载钩子，保证顺序问题
  created () {
    this.changeTitle()
    if (this.data && this.data.viewAttr && this.data.viewAttr.isPage === '1') {
      this.isPage = true
    }
    if (this.data && this.data.viewAttr && this.data.viewAttr.frequency) {
      this.frequency = Number(this.data.viewAttr.frequency) * 1000
    }
    if (this.data && this.data.viewAttr && this.data.viewAttr.maxPage) {
      this.maxPage = Number(this.data.viewAttr.maxPage)
    }
    if (this.data) {
      this.currentViewId = this.data.id || '' // 组件id
    }
    this.viewAttr = (this.data && this.data.viewAttr) || {}
  },
  mounted () {
    this.pageAnimated = true
    if (this.reload && !this.no_reload_on_mount) {
      this.reload()
    }
  },
  components: {...modules},
  methods: {
    changeTitle () {
      configInfo.forEach(val => {
        if (location.href.indexOf(val.guid) > -1) {
          document.title = val.title
          var link = document.head.querySelector('link')
          link.href = `/static/${val.favicon}.png`
        }
      })
    },
    setFontsize (id) {
      let dom = document.getElementById(id)
      if (dom) {
        let width = dom.clientWidth
        let height = dom.clientHeight
        let multiple = 1
        let a = width / height
        if (a > (1920 / 1080)) {
          multiple = (1920 / 1080) / a
        }
        if (a > 1.78) {
          dom.style.fontSize = width / 1920 * 100 * multiple + 'px'
        } else {
          dom.style.fontSize = height / 1080 * 100 + 'px'
        }
      }
    },
    getProportion (id) {
      let dom = document.getElementById(id)
      if (dom) {
        return dom.clientWidth / 1920
      } else {
        return 1
      }
    }
  }
}

<template>
  <div class="layout-item flex">
    <component class="flex-one" :is="style + 'component-' + config.component" :data="config" :screenConfig="screenConfig" :viewId="viewId"></component>
  </div>
</template>

<script>
import * as components from '@/components/global'
import { getStyle } from '@/utils/model'
import { getPlatId } from '@/utils/appinfo'
export default {
  name: 'componentsView',
  props: {
    config: Object,
    screenConfig: Object,
    viewId: String
  },
  data () {
    return {
      guid: getPlatId(),
      style: getStyle()
    }
  },
  components: {
    ...components
  }
}
</script>

<style lang="scss">
</style>

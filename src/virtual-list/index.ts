import { App } from 'vue'
import VirtualList from './src/virtual-list'
import { installComponent } from '../install'
import type { BeigeUIOptions } from '../_utils/global-config'

// 具名导出
export { VirtualList }

// 导出插件
export default {
  install(app: App, options?: BeigeUIOptions) {
    installComponent(app, VirtualList, options)
  }
}

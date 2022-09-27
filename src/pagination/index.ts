import { App } from 'vue'
import Pagination from './src/pagination'
import { installComponent } from '../install'
import type { BeigeUIOptions } from '../_utils/global-config'
import Pager from './src/components/pager'

// 具名导出
export { Pagination, Pager }

// 导出插件
export default {
  install(app: App, options?: BeigeUIOptions) {
    installComponent(app, Pagination, options)
    installComponent(app, Pager, options)
  }
}

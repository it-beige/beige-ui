import { App } from 'vue'
import Icon from './src/icon'
import { installComponent } from '../install'
import type { BeigeUIOptions } from '../_utils/global-config'
import installInlayIcons from './inlay-icons'

// 具名导出
export { Icon }

// 导出插件
export default {
  install(app: App, options?: BeigeUIOptions) {
    installComponent(app, Icon, options)
    installComponent(app, installInlayIcons, options)
  }
}

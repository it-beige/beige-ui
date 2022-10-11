import { App } from 'vue'
import Modal from './modal'
import { installComponent } from '../install'
import type { BeigeUIOptions } from '../_utils/global-config'

// 具名导出
export { Modal }

// 导出插件
export default {
  install(app: App, options?: BeigeUIOptions) {
    installComponent(app, Modal, options)
  }
}

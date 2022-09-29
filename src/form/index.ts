import { App } from 'vue'
import Form from './src/form'
import FormItem from './src/form-item'
import { installComponent } from '../install'
import type { BeigeUIOptions } from '../_utils/global-config'

// 具名导出
export { Form, FormItem }

// 导出插件
export default {
  install(app: App, options?: BeigeUIOptions) {
    installComponent(app, Form, options)
    installComponent(app, FormItem, options)
  }
}

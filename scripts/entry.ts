// 入口文件
/* 
   1. 引入实现组件批量导入
   2. 导出一个vue插件
*/
import type { App } from 'Vue'
import ButtonPlugin, { Button } from '../src/button'
import version from '../src/version'

export { Button }

const plugins = [ButtonPlugin]

export default {
  version,
  install(app: App) {
    plugins.forEach(p => app.use(p))
  }
}

'use strict'
exports.__esModule = true
// 创建组件类型核心文件模板
function genTypeTemplate(name) {
  return "\nimport { PropType, ExtractPropTypes } from 'vue';\n\nexport const props = {} as const\nexport type Props = ExtractPropTypes<typeof props>\n"
}
exports['default'] = genTypeTemplate

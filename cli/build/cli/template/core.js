'use strict'
exports.__esModule = true
var utils_1 = require('./utils')
// 创建组件核心文件模板
function genCoreTemplate(name) {
  var compName = 'Bg' + (0, utils_1.upperFirst)(name)
  var className = 's-' + name
  var propsFileName = ''.concat(name, '-type')
  return "\nimport { defineComponent, toRefs } from 'vue';\nimport { props, Props } from './"
    .concat(propsFileName, "';\n\nexport default defineComponent({\n  name: '")
    .concat(
      compName,
      '\',\n  props,\n  setup(props: Props) {\n    return (\n      <div class="'
    )
    .concat(className, '">\n      </div>\n    )\n  }\n})\n')
}
exports['default'] = genCoreTemplate

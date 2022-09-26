import { upperFirst } from './utils'

// 创建组件核心文件模板
export default function genCoreTemplate(name: string) {
  const compName = upperFirst(name)
  const className = 's-' + name
  const propsFileName = `${name}-type`
  return `
import { defineComponent, toRefs } from 'vue';
import { props, Props } from './${propsFileName}';

export default defineComponent({
  name: '${compName}',
  props,
  setup(props: Props) {
    return (
      <div class="${className}">
      </div>
    )
  }
})
`
}

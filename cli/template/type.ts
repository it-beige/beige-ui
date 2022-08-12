// 创建组件类型核心文件模板
export default function genTypeTemplate(name: string) {
  return `
import { PropType, ExtractPropTypes } from 'vue';

export const props = {} as const
export type Props = ExtractPropTypes<typeof props>
`
}

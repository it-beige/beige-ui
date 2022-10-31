import type { PropType, ExtractPropTypes, InjectionKey, Ref } from 'vue'

export const props = {
  modelValue: {
    type: String,
    required: true
  },
  // 是否开启关闭标签的功能
  closable: {
    type: Boolean,
    default: false
  },
  // 是否开启添加标签功能
  addable: {
    type: Boolean,
    default: false
  }
} as const

export type TTAB = {
  id: string
  title?: string
  type?: string
  content?: string
}
export type TProvide = {
  addTab: (tab: TTAB) => void
  closeTab: (tab: TTAB) => void
  activeTab: Ref<string>
}
export const PROVIDE_TAB_OPERATE: InjectionKey<TProvide> = Symbol(
  'PROVIDE_TAB_OPERATE'
)

export type Props = ExtractPropTypes<typeof props>

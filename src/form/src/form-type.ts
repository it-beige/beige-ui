import { PropType, InjectionKey, ExtractPropTypes, ComputedRef } from 'vue'
import { Rules } from 'async-validator'
import { TFormItemContext } from './form-item-type'

export type TLayout = 'vertical' | 'horizontal'
export type TLabelSize = 'sm' | 'md' | 'lg'
export type TLabelAlign = 'center' | 'center' | 'end'
export type TLabelData = {
  layout: TLayout
  labelSize: TLabelSize
  labelAlign: TLabelAlign
}
export const PROVIDE_LABEL_DATA: InjectionKey<ComputedRef<TLabelData>> =
  Symbol('PROVIDE_LABEL_DATA')
export type TFormContext = {
  model: Record<string, object>
  rules?: Rules
  addValidateItem: (item: TFormItemContext) => void
  removeValidateItem: (item: TFormItemContext) => void
}
export const PROVIDE_FORM_CONTEXT: InjectionKey<TFormContext> = Symbol(
  'PROVIDE_FORM_CONTEXT'
)

export const props = {
  model: {
    type: Object as PropType<Record<string, object>>,
    required: true
  },
  layout: {
    type: String as PropType<TLayout>,
    default: 'vertical'
  },
  labelSize: {
    type: String as PropType<TLabelSize>,
    default: 'md'
  },
  labelAlign: {
    type: String as PropType<TLabelAlign>,
    default: 'start'
  },
  rules: {
    type: Object as PropType<Rules>,
    default: () => ({})
  }
} as const

export type Props = ExtractPropTypes<typeof props>

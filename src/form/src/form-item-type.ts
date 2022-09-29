import { PropType, ExtractPropTypes } from 'vue'
import { Value, Rules } from 'async-validator'
export const FORM_ITEM_CONTEXT = 'FORM_ITEM_CONTEXT'
export type TFormItemContext = {
  validate: () => Promise<Value>
}

export const props = {
  label: String,
  field: String,
  rules: {
    type: Object as PropType<Rules>
  }
} as const
export type Props = ExtractPropTypes<typeof props>

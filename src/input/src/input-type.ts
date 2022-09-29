import { PropType, ExtractPropTypes } from 'vue'

export const props = {
  modelValue: [String, Array] as PropType<null | string | [string, string]>,
  type: {
    type: String as PropType<'text' | 'textarea' | 'password'>,
    default: 'text'
  }
} as const
export type Props = ExtractPropTypes<typeof props>

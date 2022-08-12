import { PropType, ExtractPropTypes } from 'vue'

export type Type =
  | 'default'
  | 'text'
  | 'secondary'
  | 'tertiary'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type Size = 'tiny' | 'small' | 'medium' | 'large'

export const props = {
  type: {
    type: String as PropType<Type>,
    default: 'default'
  },
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
} as const

export type Props = ExtractPropTypes<typeof props>

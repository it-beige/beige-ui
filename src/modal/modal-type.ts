import type { PropType, ExtractPropTypes } from 'vue'

export const props = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  showClose: {
    type: Boolean,
    default: true
  },
  width: {
    type: String
  },
  alignCenter: {
    type: Boolean,
    default: false
  }
} as const

export type Props = ExtractPropTypes<typeof props>

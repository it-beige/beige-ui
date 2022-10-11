import { ExtractPropTypes, PropType } from 'vue'

export const props = {
  name: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: 'icon'
  },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 'inherit'
  },
  color: {
    type: String,
    default: 'inherit'
  },
  component: {
    type: String,
    default: null
  }
} as const
export type Props = ExtractPropTypes<typeof props>

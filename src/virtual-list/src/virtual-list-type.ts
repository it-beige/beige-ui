import { ExtractPropTypes } from 'vue'

export const props = {
  data: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 22
  },
  tag: {
    type: String,
    default: 'div'
  }
} as const
export type Props = ExtractPropTypes<typeof props>

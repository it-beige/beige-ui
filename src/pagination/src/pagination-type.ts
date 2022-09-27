import { PropType, ExtractPropTypes } from 'vue'

export const props = {
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pagerCount: {
    type: Number,
    default: 7
  }
} as const
export type Props = ExtractPropTypes<typeof props>

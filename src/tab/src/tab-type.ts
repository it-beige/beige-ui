import { PropType, ExtractPropTypes } from 'vue'

export const props = {
  title: {
    type: String
  },
  id: {
    type: String,
    required: true
  }
} as const
export type Props = ExtractPropTypes<typeof props>

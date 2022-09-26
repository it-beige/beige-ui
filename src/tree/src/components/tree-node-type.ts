import { PropType, ExtractPropTypes } from 'vue'
import { props as treeProps, IInnerTreeNode } from '../tree-type'

export { INJECT_TREE_FACTORY } from '../tree-type'

export const props = {
  ...treeProps,
  treeNode: {
    type: Object as PropType<IInnerTreeNode>,
    required: true
  }
} as const

export type Props = ExtractPropTypes<typeof props>

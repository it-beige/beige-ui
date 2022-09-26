import { PropType, ExtractPropTypes } from 'vue'
import { TDragdrop } from './composables/use-tree-type'

export interface ITreeNode {
  label: string
  id: string
  children?: ITreeNode[]

  selected?: boolean // 勾选
  checked?: boolean // 选中
  expanded?: boolean // 展开
  inChecked?: boolean // 待选中

  disableSelect?: boolean // 禁用勾选
  disableChecked?: boolean // 禁用选中
  disableToggle?: boolean // 禁用   切换
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string // 父节点ID
  level: number // 层级
  isLeaf?: boolean // 是否叶子节点
  loading?: boolean // 节点是否显示加载中
  childNodeCount?: number // 该节点的子节点的数量
}

export const props = {
  data: {
    type: Object as PropType<Array<IInnerTreeNode>>,
    required: true
  },
  // 是否显示复选框
  checkable: {
    type: Boolean,
    default: false
  },
  // 是否显示参考线
  lineable: {
    type: Boolean,
    default: true
  },
  // 是否显示操作按钮
  operable: {
    type: Boolean,
    default: false
  },
  // 是否可拖拽
  dragdrop: {
    type: [Boolean, Object] as PropType<TDragdrop>,
    default: false
  },
  height: {
    type: Number
  },
  itemHeight: {
    type: Number,
    default: 30
  }
} as const

export const INJECT_TREE_FACTORY = 'INJECT_TREE_FACTORY'

export type Props = ExtractPropTypes<typeof props>

import { PropType, ExtractPropTypes } from 'vue'

interface ITreeNode {
  label: string
  id: string
  children: ITreeNode[]

  selected?: boolean // 勾选
  checked?: boolean // 选中
  expanded?: boolean // 展开

  disableSelect?: boolean // 禁用勾选
  disableChecked?: boolean // 禁用选中
  disableToggle?: boolean // 禁用   切换
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string // 父节点ID
  level: number // 层级
  isLeaf?: boolean // 是否叶子节点
}

export const props = {} as const

export type Props = ExtractPropTypes<typeof props>

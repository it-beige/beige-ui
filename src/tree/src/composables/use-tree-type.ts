import { ITreeNode } from './../tree-type'
import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'

export type TUseCore = {
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getChildren: (node: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[]
  getParent: (node: IInnerTreeNode) => IInnerTreeNode
  getNodeIdx: (node: IInnerTreeNode) => number
  getChildrenExpanded: (
    node: IInnerTreeNode,
    result: IInnerTreeNode[]
  ) => IInnerTreeNode[]
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
}

export type TUseToggle = {
  togleExpandNode: (node: IInnerTreeNode) => void
}

export type TUseOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => boolean
  remove: (node: IInnerTreeNode) => boolean
}

export type TUseChecked = {
  toggleCheckNode: (node: IInnerTreeNode) => void
}

export type TResult = {
  node: IInnerTreeNode
  treeItems: ITreeNode[]
}

export type TUseLozyLoad = {
  lazyLoadNodes: (node: IInnerTreeNode) => void
}

export type TDragdrop = boolean | IDropType
export interface IDropType {
  dropPrev?: boolean
  dropNext?: boolean
  dropInner?: boolean
}

export type TUseDraggable = {
  onDragStart: (event: DragEvent, treeNode: IInnerTreeNode) => void
  onDragOver: (event: DragEvent) => void
  onDragLeave: (event: DragEvent) => void
  onDrop: (event: DragEvent, treeNode: IInnerTreeNode) => void
  onDragEnd: (event: DragEvent) => void
  onDragEnter: (event: DragEvent, treeNode: IInnerTreeNode) => void
}

export interface IDragState {
  dropType?: keyof Required<IDropType>
  draggingNode?: HTMLElement | null
  draggingTreeNode?: IInnerTreeNode | null
}

export type TTREE_FACTORY = {
  treeData: Ref<IInnerTreeNode[]>
} & TUseChecked &
  TUseOperate &
  TUseToggle &
  TUseCore &
  TUseDraggable

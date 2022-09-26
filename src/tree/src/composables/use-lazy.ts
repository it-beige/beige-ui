import { TUseCore, TResult } from './use-tree-type'
import { Ref, ref, SetupContext } from 'vue'
import { ITreeNode, IInnerTreeNode } from './../tree-type'
import { generateInnerTree } from '../utils'
export function useLazyLoad(
  data: Ref<IInnerTreeNode[]>,
  { getNode, getNodeIdx, getChildren }: TUseCore,
  context: SetupContext
) {
  const setParent = (
    node: IInnerTreeNode,
    childNodes: Ref<IInnerTreeNode[]>
  ) => {
    childNodes.value.forEach(i => {
      if (i.level - 1 === node.level && !i.parentId) {
        i.parentId = node.id
      }
    })
  }

  const inserChildNodes = (
    node: IInnerTreeNode,
    childNodes: Ref<IInnerTreeNode[]>
  ) => {
    const parentIdx = getNodeIdx(node)
    if (~parentIdx) {
      data.value.splice(parentIdx + 1, 0, ...childNodes.value)
    }
  }

  const dealChildNodes = (result: TResult) => {
    const innerNode = getNode(result.node)
    if (innerNode) {
      innerNode.loading = false
      const childNodes = ref<IInnerTreeNode[]>(
        generateInnerTree(result.treeItems, innerNode.level)
      )

      // 关联新加载子节点的父节点
      setParent(innerNode, childNodes)

      // 插入新加入的节点
      inserChildNodes(innerNode, childNodes)

      // 更新节点数量
      const childNodeCount = getChildren(innerNode).length
      innerNode.childNodeCount = childNodeCount
    }
  }

  const lazyLoadNodes = (node: IInnerTreeNode) => {
    const innerNode = getNode(node)
    if (innerNode && innerNode.isLeaf === false && !innerNode.childNodeCount) {
      innerNode.loading = true
      context.emit('lazy-load', node, dealChildNodes)
    }
  }

  return {
    lazyLoadNodes
  }
}

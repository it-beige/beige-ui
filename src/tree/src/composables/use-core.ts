import { TUseCore } from './use-tree-type'
import { computed, Ref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'

export function useCore(innerData: Ref<IInnerTreeNode[]>): TUseCore {
  const expandedTree = computed(() => {
    const result = []
    let excludedNodes: IInnerTreeNode[] = []
    for (const node of innerData.value) {
      if (excludedNodes.includes(node)) {
        continue
      }
      if (node.expanded !== true) {
        excludedNodes = getChildren(node)
      }
      result.push(node)
    }

    return result
  })

  const getChildren = (node: IInnerTreeNode, recursive = true) => {
    let nodeChildIdx = innerData.value.findIndex(i => i.id === node.id) + 1
    const lenIdx = innerData.value.length
    const result = []
    while (
      nodeChildIdx < lenIdx &&
      innerData.value[nodeChildIdx].level > node.level
    ) {
      if (
        !recursive &&
        node.level !== innerData.value[nodeChildIdx].level - 1
      ) {
        break
      }
      result.push(innerData.value[nodeChildIdx])
      nodeChildIdx++
    }
    return result
  }

  const getParent = (node: IInnerTreeNode): IInnerTreeNode => {
    return <IInnerTreeNode>innerData.value.find(i => i.id === node.parentId)
  }

  const getNodeIdx = (node: IInnerTreeNode) => {
    if (!node) return -1
    return innerData.value.findIndex(i => i.id === node.id)
  }

  // 计算参考线高度
  const getChildrenExpanded = (
    node: IInnerTreeNode,
    result: IInnerTreeNode[] = []
  ) => {
    // 获取当前节点的直接子节点
    const childrenNodes = getChildren(node, false)
    result.push(...childrenNodes)
    childrenNodes.forEach(item => {
      if (item.expanded) {
        getChildrenExpanded(item, result)
      }
    })
    return result
  }

  const getNode = (node: IInnerTreeNode) => {
    return innerData.value.find(i => i.id === node.id)
  }

  return {
    expandedTree,
    getChildren,
    getParent,
    getNodeIdx,
    getChildrenExpanded,
    getNode
  }
}

import { IInnerTreeNode } from './../tree-type'
import { Ref, ref, SetupContext } from 'vue'
import { TUseCore, TUseLozyLoad } from './use-tree-type'
import { randomId } from '../../../../src/shared/utils'

export function useOperate(
  innerData: Ref<IInnerTreeNode[]>,
  { getChildren, getNodeIdx }: TUseCore,
  context: SetupContext,
  lazyLoad: TUseLozyLoad
) {
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode): boolean => {
    parent.expanded = true
    parent.isLeaf = false
    const childen = getChildren(parent, false)
    const lastChild = childen.at(-1)
    let insertNodeIdx = getNodeIdx(parent) + 1
    // 父节点下有节点插入在最后
    if (lastChild) {
      insertNodeIdx = getNodeIdx(lastChild) + 1
    }

    const insertNode = ref({
      ...node,
      level: parent.level + 1,
      isLeaf: true,
      parentId: parent.id
    })

    if (insertNode.value.id === undefined) {
      insertNode.value.id = randomId()
    }

    innerData.value.splice(insertNodeIdx, 0, insertNode.value)
    return true
  }

  const remove = (node: IInnerTreeNode): boolean => {
    const nodeChildren = getChildren(node)
    nodeChildren.push(node)
    const deleteIds = nodeChildren.map(i => i.id)
    innerData.value = innerData.value.filter(i => !deleteIds.includes(i.id))
    const parent = innerData.value.find(i => i.id === node.parentId)
    if (parent) {
      const parentChild = getChildren(parent as IInnerTreeNode, false)
      parent.isLeaf = !parentChild.length
    }
    return true
  }

  return {
    append,
    remove
  }
}

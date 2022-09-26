import { Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { TUseCore, TUseLozyLoad } from './use-tree-type'

export function useCheck(
  innerData: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: TUseCore,
  context: SetupContext,
  lazyLoad: TUseLozyLoad
) {
  const toggleCheckNode = (node: IInnerTreeNode) => {
    // 避免初始化的时候 node 中没有 checked 设置
    node.checked = !node.checked
    // 父-子联动
    // 获取子节点，并同步他们的选中状态和父节点一致
    getChildren(node)?.forEach(i => {
      i.checked = node.checked
    })

    // 获取父节点
    let parentNode = getParent(node)
    while (parentNode) {
      // 子-父联动
      const siblingNodes = getChildren(parentNode, false)
      // 获取兄弟节点：相当于获取 parentNode 的直接子节点
      const checkedSiblingNodes = siblingNodes.filter(node => node.checked)
      // 子有选中的, 让父部分选中
      parentNode.inChecked = checkedSiblingNodes.length > 0
      // 兄弟节点是否全部选中状态
      if (checkedSiblingNodes.length === siblingNodes.length) {
        parentNode.checked = true
        // 全选状态下不显示部分选中状态
        parentNode.inChecked = false
      } else {
        parentNode.checked = false
      }
      parentNode = getParent(parentNode)
    }
  }

  return {
    toggleCheckNode
  }
}

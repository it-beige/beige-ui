import { TUseCore, TUseLozyLoad } from './use-tree-type'
import { Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../tree-type'

export function useToggle(
  innerData: Ref<IInnerTreeNode[]>,
  core: TUseCore,
  context: SetupContext,
  lazyLoad: TUseLozyLoad
) {
  const togleExpandNode = (node: IInnerTreeNode) => {
    const { lazyLoadNodes } = lazyLoad
    const curNode = innerData.value.find(i => i.id === node.id)
    if (curNode) {
      curNode.expanded = !curNode.expanded
      lazyLoadNodes(curNode)
    }
  }

  return {
    togleExpandNode
  }
}

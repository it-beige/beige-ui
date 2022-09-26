import { ref, unref, Ref, SetupContext } from 'vue'
import { ITreeNode, Props as TreeProps } from '../tree-type'
import { generateInnerTree } from '../utils'
import { useCore } from './use-core'
import { useOperate } from './use-operate'
import { useCheck } from './use-check'
import { useToggle } from './use-toggle'
import { TTREE_FACTORY } from './use-tree-type'
import { useLazyLoad } from './use-lazy'
import { useDragdrop } from './use-dragdrop'

export function useTree(
  tree: Ref<ITreeNode[]> | ITreeNode[],
  context: SetupContext,
  treeProps: TreeProps
): TTREE_FACTORY {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const core = useCore(innerData)
  const lazyLoad = useLazyLoad(innerData, core, context)
  const plugins = [useOperate, useCheck, useToggle]
  const dragPlugin = useDragdrop(treeProps.dragdrop, innerData, core)
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin(innerData, core, context, lazyLoad)
    }
  }, {})
  return {
    ...pluginMethods,
    ...core,
    ...dragPlugin,
    treeData: innerData
  } as TTREE_FACTORY
}

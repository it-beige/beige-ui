import { defineComponent, provide, SetupContext, toRefs } from 'vue'
import { props, Props, INJECT_TREE_FACTORY, IInnerTreeNode } from './tree-type'
import { useTree } from './composables/use-tree'
import TreeNode from './components/tree-node'
import TreeNodeToggle from './components/tree-node-toggle'
import TreeNodeContent from './components/tree-node-content'
import { VirtualList } from '../../virtual-list/index'

export default defineComponent({
  name: 'Tree',
  props,
  emits: ['lazy-load'],
  setup(props: Props, context: SetupContext) {
    // 获取data
    const { data, height, itemHeight } = toRefs(props)
    const { slots } = context
    const hooks = useTree(data, context, props)
    const { expandedTree, togleExpandNode } = hooks

    provide(INJECT_TREE_FACTORY, { ...hooks })
    const renderTreeNode = (treeNode: IInnerTreeNode) => {
      return (
        <TreeNode key={treeNode.id} treeNode={treeNode} {...props}>
          {{
            icon: () => {
              return slots.icon ? (
                slots.icon!({
                  nodeData: treeNode,
                  toggleNode: togleExpandNode
                })
              ) : (
                <TreeNodeToggle
                  expanded={!!treeNode.expanded}
                  onClick={() => togleExpandNode(treeNode)}
                />
              )
            },
            content: () => {
              return slots.content ? (
                slots.content!(treeNode)
              ) : (
                <TreeNodeContent label={treeNode.label} />
              )
            },
            loading: () => {
              return slots.loading ? (
                slots.loading!({ nodeData: treeNode })
              ) : (
                <span class="ml-1">loading...</span>
              )
            }
          }}
        </TreeNode>
      )
    }

    return () => {
      return (
        <div class="s-tree">
          {height?.value ? (
            <div style={{ height: `${height.value}px` }}>
              <VirtualList
                data={expandedTree.value}
                itemHeight={itemHeight.value}
              >
                {{
                  default: (treeNode: IInnerTreeNode) => {
                    return renderTreeNode(treeNode)
                  }
                }}
              </VirtualList>
            </div>
          ) : (
            expandedTree.value.map(treeNode => renderTreeNode(treeNode))
          )}
        </div>
      )
    }
  }
})

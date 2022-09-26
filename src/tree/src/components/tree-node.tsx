import { defineComponent, inject, ref, toRefs } from 'vue'
import { TTREE_FACTORY } from '../composables/use-tree-type'
import { IInnerTreeNode } from '../tree-type'
import { props, Props, INJECT_TREE_FACTORY } from './tree-node-type'

export default defineComponent({
  name: 'TreeNode',
  props,
  setup(props: Props, { slots }) {
    // 节点高度
    const NODE_HEIGHT = 28
    // 节点宽度
    const NODE_INDENT = 24

    const { treeNode, checkable, lineable, operable, dragdrop } = toRefs(props)

    const {
      getChildren,
      toggleCheckNode,
      append,
      remove,
      onDragEnd,
      onDragLeave,
      onDragOver,
      onDragStart,
      onDrop,
      onDragEnter
    } = inject(INJECT_TREE_FACTORY) as TTREE_FACTORY

    const showOperate = ref(false)
    const toggleOperate = () => {
      showOperate.value = !showOperate.value
    }

    // 构造drag属性对象
    let dragdropProps = {}
    if (dragdrop.value) {
      dragdropProps = {
        draggable: true,
        onDragend: (event: DragEvent) => onDragEnd(event),
        onDragleave: (event: DragEvent) => onDragLeave(event),
        onDragover: (event: DragEvent) => onDragOver(event),
        onDragstart: (event: DragEvent) => onDragStart(event, treeNode.value),
        onDrop: (event: DragEvent) => onDrop(event, treeNode.value),
        onDragenter: (event: DragEvent) => onDragEnter(event, treeNode.value)
      }
    }

    return () => (
      <div
        onMouseenter={toggleOperate}
        onMouseleave={toggleOperate}
        class={'hover:bg-slate-100 s-tree__node relative leading-8'}
        style={{
          paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`
        }}
      >
        {/** 折叠图标 */}
        {/* 连接线 */}
        {lineable && !treeNode.value.isLeaf && treeNode.value.expanded && (
          <span
            class={`s-tree-node_vline w-px absolute bg-slate-300`}
            style={{
              height: `${NODE_HEIGHT * getChildren(treeNode.value).length}px`,
              left: `${NODE_INDENT * (treeNode.value.level - 1) + 11}px`,
              top: `${NODE_HEIGHT}px`
            }}
          ></span>
        )}

        <div
          class="node-content"
          draggable={!!props.dragdrop}
          {...dragdropProps}
        >
          {/** 判断当前节点是否为叶子节点 */}
          {treeNode.value.isLeaf ? (
            <span style={{ display: 'inline-block', width: '18px' }}></span>
          ) : (
            slots.icon!()
          )}

          {/* 勾选框 */}
          {checkable.value && (
            <span
              class={`relative ${
                treeNode.value.inChecked ? 's-tree__inChecked' : ''
              }`}
            >
              {treeNode.value.inChecked && (
                <span
                  class="s-tree-checkbox__inner cursor-pointer"
                  onClick={() => toggleCheckNode(treeNode.value)}
                >
                  -
                </span>
              )}
              <input
                type="checkbox"
                style={{ marginRight: '8px' }}
                v-model={treeNode.value.checked}
                onClick={() => toggleCheckNode(treeNode.value)}
              />
            </span>
          )}

          {/* 节点内容 */}
          {slots.content!()}

          {/* 增删改操作 */}
          {operable.value && showOperate.value && (
            <span class="inline-flex ml-1">
              <svg
                onClick={() => {
                  append(treeNode.value, {
                    label: '新节点'
                  } as IInnerTreeNode)
                }}
                viewBox="0 0 1024 1024"
                width="14"
                height="14"
              >
                <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
              </svg>
              <svg
                onClick={() => {
                  remove(treeNode.value)
                }}
                style="margin-left: 8px;"
                viewBox="0 0 1024 1024"
                width="12"
                height="12"
              >
                <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
              </svg>
            </span>
          )}

          {/* 懒加载加载状态 */}
          {treeNode.value.loading && slots.loading!()}
        </div>
      </div>
    )
  }
})

import { computed, reactive, Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import {
  TDragdrop,
  TUseCore,
  TUseDraggable,
  IDragState,
  IDropType
} from './use-tree-type'

const dropTypeMap = {
  dropPrev: 's-tree__node--drop-prev',
  dropNext: 's-tree__node--drop-next',
  dropInner: 's-tree__node--drop-inner'
}

export function useDragdrop(
  dragdrop: TDragdrop,
  data: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: TUseCore
): TUseDraggable {
  const dragState = reactive<IDragState>({
    dropType: undefined,
    draggingNode: null,
    draggingTreeNode: null
  })

  const resetDragState = () => {
    dragState.dropType = undefined
    dragState.draggingNode = null
    dragState.draggingTreeNode = null
  }

  const treeIdMapValue = computed<Record<string | number, IInnerTreeNode>>(
    () => {
      return data.value.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id!]: cur
        }),
        {}
      )
    }
  )

  const removeDraggingStyle = (target: HTMLElement | null) => {
    target?.classList.remove(...Object.values(dropTypeMap))
  }

  const checkIsParent = (
    childNodeId: number | string,
    parentNodeId: number | string
  ): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId]?.parentId
    if (realParentId === parentNodeId) {
      return true
    } else if (realParentId !== undefined) {
      return checkIsParent(realParentId, parentNodeId)
    } else {
      return false
    }
  }

  // 拖拽开始
  const onDragStart = (event: DragEvent, treeNode: IInnerTreeNode) => {
    event.stopPropagation()
    dragState.draggingNode = (event.target as HTMLElement) || null
    dragState.draggingTreeNode = treeNode
    event.dataTransfer?.setData('dragNodeId', treeNode.id)
  }
  // 拖拽中
  const onDragOver = (event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (!dragState.draggingTreeNode) {
      return
    }
    if (!dragdrop) {
      return
    }
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    if (!data) {
      return
    }
    let curDragType: IDropType = {}
    if (typeof dragdrop === 'object') {
      curDragType = dragdrop
    } else {
      curDragType = {
        dropInner: true
      }
    }

    const { dropInner, dropPrev, dropNext } = curDragType
    let innerDropType = dragState.dropType
    const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1
    const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1
    const currentTarget = event.currentTarget as HTMLElement | null
    const targetPosition = currentTarget?.getBoundingClientRect()
    const distance = event.clientY - (targetPosition?.top || 0)

    if (distance < (targetPosition?.height || 0) * prevPercent) {
      innerDropType = 'dropPrev'
    } else if (distance > (targetPosition?.height || 0) * nextPercent) {
      innerDropType = 'dropNext'
    } else if (dropInner) {
      innerDropType = 'dropInner'
    } else {
      innerDropType = undefined
    }
    if (innerDropType) {
      const classList = currentTarget?.classList
      if (classList) {
        if (!classList.contains(dropTypeMap[innerDropType])) {
          removeDraggingStyle(currentTarget)
          classList.add(dropTypeMap[innerDropType])
        }
      }
    } else {
      removeDraggingStyle(currentTarget)
    }
    dragState.dropType = innerDropType
  }
  // 拖拽离开节点
  const onDragLeave = (event: DragEvent) => {
    event.stopPropagation()
    if (!dragState.draggingNode) {
      return
    }
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
  }
  // 投放进入
  const onDrop = (event: DragEvent, dropNode: IInnerTreeNode) => {
    event.preventDefault()
    event.stopPropagation()
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
    if (!dragState.draggingNode || !dragdrop) return

    // 获取正在拖拽的树节点id
    const dragNodeId = event.dataTransfer?.getData('dragNodeId')
    if (dragNodeId) {
      // 判断释放节点是否是拖拽的节点的子节点
      const isParent = checkIsParent(dropNode.id!, dragNodeId)
      // 如果拖拽和释放是同一节点或者父子关系则跳出
      if (dragNodeId === dropNode.id || isParent) {
        return
      }
      // 判断当前释放类型：dropPrev、dropNext或dropInner
      if (dragState.dropType) {
        handleDrop(dragNodeId, dropNode)
      }

      resetDragState()
    }
  }

  // 释放之后的节点操作
  function handleDrop(dragNodeId: string, dropNode: IInnerTreeNode) {
    // 获取正在拖拽的节点
    const dragNode = data.value.find(item => item.id === dragNodeId)

    if (dragNode) {
      // 备份一个节点
      let cloneDragNode: IInnerTreeNode
      // 获取拖拽节点子节点
      const childrenOfDragNode = getChildren(dragNode)
      // 获取拖拽节点的父节点
      const parentOfDragNode = getParent(dragNode)

      // 如果是嵌套释放情况
      if (dragState.dropType === 'dropInner') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.id,
          level: dropNode.level + 1
        }
        // 插入克隆节点
        const dropNodeIndex = data.value.indexOf(dropNode)
        data.value.splice(dropNodeIndex + 1, 0, cloneDragNode)
        dropNode.isLeaf = undefined
        // 删除旧拖拽节点
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropNext') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        const dropNodeChildrenLength = getChildren(dropNode, true).length
        data.value.splice(
          dropNodeIndex + dropNodeChildrenLength + 1,
          0,
          cloneDragNode
        )
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropPrev') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        data.value.splice(dropNodeIndex, 0, cloneDragNode)
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      }

      // 如果拖拽的是有子节点的节点，所有子节点也应该以dropInner方式被移动
      dragState.dropType = 'dropInner'
      childrenOfDragNode.forEach(child => handleDrop(child.id!, cloneDragNode))

      // 拖拽结束，处理父节点isLeaf状态
      if (parentOfDragNode) {
        if (getChildren(parentOfDragNode).length === 0) {
          parentOfDragNode.isLeaf = true
        }
      }
    }
  }

  // 拖拽结束
  const onDragEnd = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    resetDragState()
  }

  // 当拖拽元素放在节点上, 节点自动展开

  const onDragEnter = (event: DragEvent, dropNode: IInnerTreeNode) => {
    if (dropNode.isLeaf !== false && !dropNode.expanded) {
      dropNode.expanded = true
    }
  }
  return {
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onDragEnter
  } as TUseDraggable
}

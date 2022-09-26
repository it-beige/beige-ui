import { ITreeNode, IInnerTreeNode } from './tree-type'

export function generateInnerTree(
  tree: ITreeNode[],
  level = 0,
  paths: IInnerTreeNode[] = []
): IInnerTreeNode[] {
  level++
  return tree.reduce((prev, i) => {
    const flattenItem = { ...i } as IInnerTreeNode
    flattenItem.level = level

    while (paths.length && paths[paths.length - 1].level >= level) {
      paths.pop()
    }
    paths.push(flattenItem)

    const parentNode = paths.at(-2)
    if (parentNode) {
      flattenItem.parentId = parentNode.id
    }

    if (Array.isArray(flattenItem.children)) {
      const children = generateInnerTree(
        flattenItem.children,
        flattenItem.level,
        paths
      )
      delete flattenItem.children
      return prev.concat(flattenItem, children)
    } else {
      !Reflect.has(flattenItem, 'isLeaf') ? (flattenItem.isLeaf = true) : null
      return prev.concat(flattenItem)
    }
  }, [] as IInnerTreeNode[])
}

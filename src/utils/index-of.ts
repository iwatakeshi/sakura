// import { Key, Maybe, TreeNode } from '../types'
// import { find } from './find'
//
// export function indexOf<T extends object>(
//   tree: TreeNode<T>[],
//   node: TreeNode<T>
// ): number {
//   if (!node.parentKey) {
//     return tree.indexOf(node)
//   }
//
//   const parent = find(tree, node.parentKey)!
//   return parent.children.indexOf(node)
// }

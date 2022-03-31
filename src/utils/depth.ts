// import { TreeNode } from '../types'
// export function depth<T extends object>(node: TreeNode<T>, height = 0) {
//   if (!node) return 0
//
//   if (node.children.length > 0) {
//     node.children.forEach((child) => {
//       height = Math.max(height, depth(child))
//     })
//   }
//   return height + 1
// }

// import { Key, TreeNode } from '../types'
// import { isKey } from "./is-key";
// import { identity } from "../fn/identity";
//
// export interface NodeBase<T> {
//   /**
//    * A unique key for the node.
//    */
//   key: Key,
//   /**
//    * The value of the node.
//    */
//   value?: T,
//   /**
//    * The children of the node.
//    */
//   children: NodeBase<T>[]
// }
//
// export interface NodeFromOptions<T extends object, U extends NodeBase<T>> {
//   /**
//    * A function that returns the key of the node.
//    */
//   getKey: (data: T) => Key
//   /**
//    * A function that returns the children of the node.
//    */
//   getChildren: (data: T) => T[]
//   /**
//    * A function that is called when a node is added to the tree.
//    */
//   onCreate: (node: U, index: number, depth: number) => U
// }
//
// export const nodeOptions: NodeFromOptions<any, NodeBase<any>> = {
//   getKey: (data) => data.id || data.key,
//   getChildren: (data) => {
//     if (data.children && Array.isArray(data.children)) {
//       return data.children
//     }
//     if (data.items && Array.isArray(data.items)) {
//       return data.items
//     }
//     if (data.value && Array.isArray(data.value)) {
//       return data.value
//     }
//     return []
//   },
//   onCreate: identity
// }
//
// export class Node {
//   static fromNode<T extends object, U extends NodeBase<T> = NodeBase<T>>(node: U, options?: Omit<Partial<NodeFromOptions<T, U>>, 'getKey' | 'getChildren'>): U {
//     if (isKey(node) && 'value' in node && 'children' in node) {
//       return node
//     }
//    
//     const _node = {
//       ...node,
//       children: node.children.map(child => Node.fromNode(child))
//     } as U
//    
//     return options?.onCreate?.(_node, 0, 0) ?? _node
//   }
//  
//   static fromValue<T extends object, U extends NodeBase<T> = NodeBase<T>>(value: T, options?: Partial<NodeFromOptions<T, U>>): NodeBase<T> {
//     const { getKey, getChildren, onCreate } = { ...nodeOptions, ...options }
//    
//     function fromValue(value: T, index: number, depth: number): NodeBase<T> {
//       const key = getKey(value)
//       const children = getChildren(value)
//       const node = {
//         key,
//         value,
//         children: children.map((child, index) => fromValue(child, index, depth + 1))
//       } as U
//       return onCreate(node, index, depth)
//     }
//     return fromValue(value, 0, 0)
//   }
//  
//   static clone<T extends object, U extends NodeBase<T> = NodeBase<T>>(
//     node: TreeNode<T>,
//     deep = false
//   ): TreeNode<T> {
//     return {
//       ...node,
//       children: deep
//         ? node.children.map((n) => Node.clone(n, deep))
//         : [],
//     }
//   }
// }
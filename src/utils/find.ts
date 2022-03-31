// import { Key, TreeNode, Nullable } from '../types'
// import { INode } from "~/shared/types/node";
// import { level, post, pre } from "~/structures/n-ary/utils/traverse";
// import { isMap } from "util/types";
//
// /**
//  * Defines the available traversal orders.
//  */
// type TraversalOrder = 'level' | 'pre' | 'post'
// /**
//  * Defines a function that can be used to traverse a tree.
//  */
// type TraversalFunction<T extends object> = (tree: TreeNode<T> | TreeNode<T>[]) => Generator<TreeNode<T>, void>
//
// /**
//  * Finds a node in a tree by its key.
//  * @param order
//  */
// const isOrder = (order: any): order is TraversalOrder => {
//   return order === 'level' || order === 'pre' || order === 'post'
// }
//
// function engine<T extends object>(order: TraversalOrder): TraversalFunction<T> {
//   switch (order) {
//     case 'level':
//       return level as unknown as TraversalFunction<T>
//     case 'pre':
//       return pre as unknown as TraversalFunction<T>
//     case 'post':
//       return post as unknown as TraversalFunction<T>
//     default:
//       return pre as unknown as TraversalFunction<T>
//   }
// }
//
// /**
//  * Finds a node in a tree by its key.
//  * @param root - The root of the tree to search.
//  * @param key - The key of the node to find.
//  * @param order - The order to traverse the tree.
//  */
// export function find<T extends object, U extends INode<T> = INode<T>>(
//   root: U,
//   key: Key,
//   order?: TraversalOrder
// ): Nullable<U>
//
// /**
//  * Finds a node in a tree by its key.
//  * @param tree - The tree to search.
//  * @param key - The key of the node to find.
//  * @param cache - A cache of previously found nodes.
//  */
// export function find<T extends object, U extends INode<T> = INode<T>>(
//   tree: U[],
//   key: Key,
//   cache?: Map<Key, U>,
//   order?: TraversalOrder
// ): Nullable<U>
//
//
// /**
//  * Finds a node in a tree by its key.
//  * @param root
//  * @param key
//  * @param cache
//  */
// export function find<T extends object, U extends INode<T> = INode<T>>(
//   root: U,
//   key: Key,
//   cache?: Map<Key, U>,
//   order?: TraversalOrder
// ): Nullable<U>
//
// /**
//  * Finds a node in a tree by its key.
//  * @param tree - The tree to search.
//  * @param key - The key of the node to find.
//  * @param order - The order to traverse the tree.
//  */
// export function find<T extends object, U extends INode<T> = INode<T>>(
//   tree: U[],
//   key: Key,
//   order?: TraversalOrder
// ): Nullable<U>
//
// /**
//  * Finds a node by its key.
//  * @param tree - The key of the node.
//  * @param key - The key of the node to find.
//  * @returns - The node if found, otherwise `null`.
//  */
// export function find<T extends object, U extends INode<T> = INode<T>>(
//   tree: U | U[],
//   key: Key,
//   cacheOrOrder?: Map<Key, U> | TraversalOrder,
//   order: TraversalOrder = 'pre'
// ) {
//   if (cacheOrOrder && isMap(cacheOrOrder)) {
//     let node = cacheOrOrder.get(key)
//     if (node) return node
//   }
//  
//   if (cacheOrOrder && isOrder(cacheOrOrder)) {
//     order = cacheOrOrder
//   }
//  
//   for (const node of engine<T>(order)(tree)) {
//     if (node.key === key) {
//       return node
//     }
//   }
//  
//   return null
//   // const _nodes = Array.isArray(tree) ? tree : [tree]
//   // return _nodes.reduce<Node<T> | null>((a, b) => {
//   //   if (a) return a
//   //   if (b.key === key) return b
//   //   if (b.children) return find(b.children, key, cache)
//   //   return null
//   // }, null)
// }

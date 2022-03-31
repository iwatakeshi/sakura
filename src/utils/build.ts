// import { Key, TreeNode, Nullable } from '../types'
// import { createNode, nodeOptions, NodeFromOptions, Node } from './node'
//
// /**
//  * `BuildOptions` is an interface that describes the options that can be passed to the `Tree.build` method.
//  */
// export interface BuildOptions<T extends object> extends Partial<NodeFromOptions<T, TreeNode<T>>> {
// }
//
// /**
//  * Builds a sakura tree from the given data.
//  * @param data - The data to build the tree from.
//  * @param options - The build options.
//  * @returns The built tree.
//  */
// export function build<T extends object>(
//   data: (T | Readonly<T>)[],
//   parentKey?: Nullable<Key>,
//   options?: BuildOptions<T>
// ): TreeNode<T>[] {
//   const { onCreate, getKey, getChildren } = ({  ...nodeOptions, ...options, })
//   return data.map((d) => {
//     return Node.fromValue<T, TreeNode<T>>({
//       ...d,
//       parentKey,
//     }, {
//       onCreate,
//       getKey,
//       getChildren,
//     })
//   })
// }
//
// // The default options for the `Tree.build` method.
//

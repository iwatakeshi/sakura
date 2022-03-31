// import { TreeNode, Tree, Key, Nullable, Maybe } from './types'
// import { build } from './utils/build'
// import { createNode } from './utils/node'
// import { depth } from './utils/depth'
// import { find } from './utils/find'
//
// /**
//  * Sakura is a class that represents a tree.
//  */
// export class Sakura<T extends object> implements Tree<T> {
//   readonly root: TreeNode<T>
//   readonly nodes: TreeNode<T>[]
//   readonly data: T[]
//   private cache: Map<Key, TreeNode<T>>
//   /**
//    * Constructs an instance of Tree.
//    * @param data The data to build the tree from.
//    */
//   constructor(data: T[] = []) {
//     let root: Nullable<TreeNode<T>> | undefined
//     this.root = createNode({
//       key: 'root',
//
//       children: build<T>(data, undefined, {
//         onCreate(node) {
//           if (node.key === 'root') {
//             root = node
//           }
//         },
//       }),
//     })
//
//     if (root) this.root = root
//
//     this.nodes = this.root.children
//     this.data = data
//     this.cache = new Map()
//   }
//   push(key: Key, index: number, ...data: T[]): void {
//     if (index === 0) return this.prepend(key, ...data)
//     if (index > 0) return this.addBefore(key, index, ...data)
//     return this.append(key, ...data)
//   }
//   addBefore(key: Key, index: number, ...data: T[]): void {
//     const node = this.find(key)
//     if (!node) return
//     const children = build<T>(data, null, {
//       onCreate: (n) => this.cache.set(n.key, n),
//     })
//     node.children.splice(index, 0, ...children)
//   }
//   addAfter(key: Key, index: number, ...data: T[]): void {
//     const node = this.find(key)
//     if (!node) return
//     const children = build<T>(data, null, {
//       onCreate: (n) => this.cache.set(n.key, n),
//     })
//     node.children.splice(index + 1, 0, ...children)
//   }
//   remove(key: Key): void {
//     const node = this.find(key)
//     if (!node || !node.parentKey) return
//     let parent = this.find(node.parentKey)
//     if (!parent) return
//
//     const index = parent?.children.indexOf(node)
//     if (index === -1) return
//     parent.children.splice(index, 1)
//   }
//   move(from: Key, to: Key, index: number): void {
//     const node = this.find(from)
//     if (!node) return
//     if (!this.has(to)) return
//
//     // Remove the node from the tree
//     this.remove(from)
//     // Add the node to the new tree
//     this.push(to, index, node.value!)
//   }
//   prepend(key: Key, ...data: T[]): void {
//     const node = this.find(key)
//     if (!node) return
//     const children = build<T>(data, null, {
//       onCreate: (n) => this.cache.set(n.key, n),
//     })
//     node.children.unshift(...children)
//   }
//   append(key: Key, ...data: T[]): void {
//     const node = this.find(key)
//     if (!node) return
//     const children = build<T>(data, null, {
//       onCreate: (n) => this.cache.set(n.key, n),
//     })
//     node.children.push(...children)
//   }
//   update(key: Key, value: T): TreeNode<T>[] {
//     const node = this.find(key)
//     if (!node) return []
//     node.value = value
//     return node.children
//   }
//   find(key: Key): Maybe<TreeNode<T>> {
//     if (key === 'root') return this.root
//     if (this.cache.has(key)) return this.cache.get(key)
//     return find(this.root, key)
//   }
//
//   has(key: Key): boolean {
//     if (this.cache.has(key)) return true
//     return Boolean(find(this.root, key))
//   }
//
//   indexOf(key: Key): number {
//     throw new Error('Not implemented')
//   }
//
//   /**
//    * Returns the depth of the node.
//    */
//   get depth(): number {
//     return depth(this.root)
//   }
// }

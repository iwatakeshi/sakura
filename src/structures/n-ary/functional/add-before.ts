import { find } from '../utils/find'
import { insert } from "~/shared/utils/array";
import { fromData, toArray } from "~/structures/n-ary/utils/node";
import { pipe, tap } from "rambdax";
import { set } from "~/structures/n-ary/cache";
import { ITreeNode } from "~/structures/n-ary/node";
import { NodeCache } from "~/shared/types/cache";
import { Nullable } from "~/shared/types/ts";
import { Key } from "~/shared/types/key";
import { updateTree } from "~/structures/n-ary/functional/update-tree";
/**
 * Adds a node before the specified node in the tree.
 * @param tree - The tree nodes.
 * @param cache - The cache of nodes.
 * @param options - The build options.
 * @returns A function that adds a node before the specified index in the tree.
 */
export function addBefore<T>(
  tree: ITreeNode<T>[],
  cache?: NodeCache<ITreeNode<T>>,
) {
  /**
   * Adds a node before the specified index in the tree.
   * @param key - The key of the node to push before.
   * @param index - The index of the node to push before.
   * @param data - The data to push.
   */
  return function addBefore(key: Nullable<Key>, ...data: T[]) {
   if(!key) {
     return insert(tree, 0, ...toArray(fromData<T>(data, null, {
       onCreate: pipe(tap(n => set(cache, n)))
     })))
   }
   
   const node = find(tree, key, cache)
    if (!node) return tree
    
    if (!node.parent) {
      const index = tree.indexOf(node)
      return insert(tree, index, ...toArray(
        fromData<T>(data, node.parent, {
          onCreate: pipe(
            tap(n => set(cache, n)),
            (n: ITreeNode) => ({ ...n, parent: node.parent })
          )
        }, index)
      ))
    }
    
    const parent = find(tree, node.parent, cache)!
    const index = parent.children.indexOf(node)
    return updateTree(tree, cache,)(node.parent, (parent) => ({
      key: parent.key,
      value: parent.value,
      parent: parent.parent,
      children: insert(
        parent.children,
        index,
        // TODO: Update the depth of the node
        ...toArray(fromData<T>(data, null, {
          onCreate: pipe(
            tap(n => set(cache, n)),
            (n: ITreeNode) => ({...n, parent: parent.key }))
        }, index))
      )
    }))
  }
}

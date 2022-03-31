import { find } from '../utils/find'
import { updateTree } from './update-tree'
import { set } from "~/structures/n-ary/cache";
import { fromData, toArray } from "~/structures/n-ary/utils/node";
import { ITreeNode } from "~/structures/n-ary/node";
import { Key } from "~/shared/types/key";
import { Nullable } from "~/shared/types/ts";
import { insert } from "~/shared/utils/array";
import { pipe, tap } from "rambdax";

/**
 * Adds a node after the specified node in the tree.
 * @param tree - The tree nodes.
 * @param cache - The cache of nodes.
 * @param options - The build options.
 * @returns A function that adds a node after the specified index in the tree.
 */
export function addAfter<T extends object>(
  tree: ITreeNode<T>[],
  cache?: Map<Key, ITreeNode<T>>,
) {
  /**
   * Adds a node after the specified index in the tree.
   * @param key - The key of the node to push after.
   * @param index - The index of the node to push after.
   * @param data - The data to push.
   */
  function addAfter(Key: Nullable<Key>, ...data:T[]): ITreeNode<T>[];
  function addAfter(key: Nullable<Key>, index: number, ...data:T[]): ITreeNode<T>[];
  function addAfter(key: Nullable<Key>, index: number, ...data: T[]): ITreeNode<T>[] {
    // Add the node to the root if no key is specified.
    if (!key) {
      return insert(tree, 
        1, 
        ...toArray(fromData<T>(data, null,{
          onCreate: pipe(
            tap(n => set(cache, n)),
          )
        })))
    }

    const node = find(tree, key, cache)
    if (!node) return tree
    // Add the node to the root if the node exists but has no parent
    if (!node.parent) {
      const index = tree.indexOf(node)
      return insert(tree, index + 1, ...toArray(
        fromData<T>(data, node.parent, {
          onCreate: pipe(
            tap(n => set(cache, n)), 
            (n: ITreeNode) => ({...n, parent: node.parent }))
        },index + 1))
      )
    }
    const parent = find(tree, node.parent, cache)!
    const index = parent.children.indexOf(node)
    
    return updateTree(tree, cache)(node.parent, (parent) => ({
      key: parent.key,
      value: parent.value,
      parent: parent.parent,
      children: insert(
        parent.children,
        index + 1,
        // TODO: Update the depth of the node
        ...toArray(fromData<T>(data, null, {
          onCreate: pipe(
            tap(n => set(cache, n)), 
            (n: ITreeNode) => ({...n, parent: parent.key }))
        },index + 1))
      ),
    }))
  }
  return addAfter
}

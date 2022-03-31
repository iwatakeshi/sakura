import { Key, TreeNode, Nullable } from '../../../types'
import { BuildOptions } from '../utils/build'
import { addBefore } from './add-before'

/**
 * Prepend a node before the specified node in the tree.
 * @param tree - The tree nodes.
 * @param cache - The cache of nodes.
 * @param options - The build options.
 * @returns A function that adds a node after the specified node.
 */
export function prepend<T extends object>(
  tree: TreeNode<T>[],
  cache?: Map<Key, TreeNode<T>>,
  options?: BuildOptions<T>
) {
  /**
   * Prepends a node before the specified node in the tree.
   * @param key - The key of the node to prepend before.
   * @param data - The data to prepend.
   * @returns The updated tree.
   */
  return function prepend(key: Nullable<Key>, ...data: T[]) {
    return addBefore(tree, cache, options)(key, 0, ...data)
  }
}

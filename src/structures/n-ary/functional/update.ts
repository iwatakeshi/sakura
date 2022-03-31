import { Key, TreeNode } from '../../../types'
import { build, BuildOptions } from '../utils/build'
import { updateTree } from './update-tree'
import { tap } from "../utils/tap";



/**
 *
 * @param tree - The tree nodes.
 * @param cache - The cache of nodes.
 * @param options - The build options.
 * @returns A function that updates a node in the tree.
 */
export function update<T extends object>(
  tree: TreeNode<T>[],
  cache?: Map<Key, TreeNode<T>>,
  options?: BuildOptions<T>
) {
  /**
   * Updates a node in the tree.
   *
   * __Note__: This function does not mutate the tree.
   * @param key - The key of the node to update.
   * @param data - The data to update.
   * @returns The updated tree.
   */
  return function update(key: Key, value: T) {
    return updateTree(tree, cache)(key, (old) => {
      let node: TreeNode<T> = {
        key: old.key,
        parentKey: old.parentKey,
        value,
        children: null as any,
      }
      node.children = build(
        options?.getChildren?.(value) ?? getChildren!(value),
        node.key,
        {
          onCreate: tap((node) => cache?.set(node.key, node)),
        }
      )
      return node
    })
  }
}

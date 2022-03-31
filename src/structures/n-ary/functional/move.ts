import { Key, TreeNode } from '../../../types'
import { BuildOptions } from '../utils/build'
import { find } from '../utils/find'
import { exists } from '../utils/exists'
import { remove } from './remove'
import { updateTree } from './update-tree'
import { concatAt } from '../../../utils/array'

/**
 * Moves a node to a new location in the tree.
 * @param tree
 * @param cache
 * @returns A function that moves a node to a new location in the tree.
 */
export function move<T extends object>(
  tree: TreeNode<T>[],
  cache?: Map<Key, TreeNode<T>>,
  options?: BuildOptions<T>
) {
  /**
   * Moves a node to a new location in the tree.
   *
   * __Note:__ This function does not mutate the tree.
   * @param from - The key of the node to move.
   * @param to - The key of the target parent.
   */
  return function move(from: Key, to: Key, index: number) {
    let node = find(tree, from, cache)!
    if (!node || !exists(tree, to, cache)) return tree
    
    // We don't need to move the node if it's already in the right place.
    if (node.parentKey === to) return tree
    
    
    const removed = remove(tree, cache)(from)

    return updateTree(removed, cache)(to, ({ children, ...parent }) => ({
      ...parent,
      children: concatAt(children, index, ({
        ...node,
        parentKey: parent.key
      })),
    }))
  }
}

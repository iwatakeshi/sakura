import { updateTree } from './update-tree'
import { ITreeNode } from "~/structures/n-ary/node";
import { NodeCache } from "~/shared/types/cache";
import { Key } from "~/shared/types/key";

/**
 * Remove a node from the tree.
 * @param nodes - The tree nodes.
 * @param cache - The cache of nodes.
 * @returns - A function that adds a node after the specified node.
 */
export function remove<T>(
  nodes: ITreeNode<T>[],
  cache?: NodeCache<T>
) {
  /**
   * Remove a node from the tree.
   * @param keys - The keys of the nodes to remove.
   */
  return function remove(...keys: Key[]) {
    const reducer = (acc: ITreeNode<T>[], key: Key) => updateTree(acc, cache)(key, () => null)
    return keys.reduce(reducer, nodes)
  }
}

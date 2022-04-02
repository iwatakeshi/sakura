import { Maybe } from "~/shared/types/ts";
import { NodeCache } from "~/shared/types/cache";
import { Key } from "~/shared/types/key";
import { isNode } from "~/shared/utils/node";
import { ITreeNode } from "~/structures/n-ary/node";

/**
 * Sets the cache for a node.
 * @param node - The node to set the cache for.
 * @param cache - The cache to set.
 */
export function set<T>(
  cache: Maybe<NodeCache<ITreeNode<T>>>
) {
  return (node: ITreeNode<T>): ITreeNode<T> => {
    if (!cache) return node;
    cache.set(node.key, node as any)
    node.children.forEach(set(cache));
    return node
  }
}

/**
 * Updates the cache for a node.
 * @param cache - The cache to update.
 * @param key - The key of the node to update.
 * @param node - The node to update.
 */
export function update<T>(
  cache: Maybe<NodeCache<ITreeNode<T>>>,
  key: Key,
  node: ITreeNode<T>,
): void {
  if (!cache) return
  cache.set(key, node)
}
/**
 * Removes a node from the cache.
 * @param key - The key of the node to remove.
 * @param cache - The cache to remove the node from.
 * @param deep - Whether to remove the node and all of its children.
 */
export function remove<T>(
  cache: Maybe<NodeCache<ITreeNode<T>>>,
  key: Key,
  deep = true
): void {
  if (!cache) return
  const node = cache?.get(key)
  if (!node || !isNode(node)) return
  cache.delete(node.key)

  if (deep) {
    for (const child of node.children) {
      remove(cache, child.key, deep)
    }
  }
}

/**
 * A cache that stores nodes.
 * @param cache
 */
export function clear<T>(cache: Maybe<NodeCache<ITreeNode<T>>>) {
  cache?.clear();
}
import { traverseFn, TraversalOrder } from "~/structures/n-ary/utils/traverse";
import { ITreeNode } from "~/structures/n-ary/node";
import { Key } from "~/shared/types/key";
import { Nullable } from "~/shared/types/ts";
import { NodeCache } from "~/shared/types/cache";
import { isKey } from "~/shared/utils/key";

/**
 * Finds the node in the tree
 * @param tree - The tree to traverse.
 * @param predicate - The predicate to use to find the node
 * @param options - The options to use when searching
 */
export function find<T>(
  tree: ITreeNode<T>[], 
  predicate: (node: ITreeNode<T>) => boolean, 
  options?: {
  cache?: Nullable<NodeCache<ITreeNode>>,
  order?: TraversalOrder
}): Nullable<ITreeNode<T>>;
/**
 * Finds the node in the tree
 * @param tree - The tree to traverse.
 * @param key - The key to use to find the node
 * @param options - The options to use when searching
 */
export function find<T>(
  tree: ITreeNode<T>[], 
  key: Nullable<Key>, 
  { order, cache }: { 
    cache?: Nullable<NodeCache<ITreeNode>>,
    order?: TraversalOrder
}): Nullable<ITreeNode<T>>;
/**
 * Finds the node in the tree
 * @param tree - The tree to traverse.
 * @param input - The key or predicate to use to find the node
 * @param options - The options to use when searching
 */
export function find<T>(
  tree: ITreeNode<T>[], 
  input: ((node: ITreeNode<T>) => boolean) | Nullable<Key>,
  { order, cache }: { 
    cache?: Nullable<NodeCache<ITreeNode>>, 
    order?: TraversalOrder 
  }){
  if (!input) return null;
  if (isKey(input) && cache?.has(input)) return cache.get(input)!
  const traverse = traverseFn<any>(order ?? 'pre');

  for (const node of traverse(tree)) {
    if ((isKey(input) && node.key === input) || (typeof input === 'function' && input(node))) {
      return node;
    }
  }
  return null
}

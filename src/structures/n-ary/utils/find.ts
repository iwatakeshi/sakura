import { traverseFn, TraversalOrder } from "~/structures/n-ary/utils/traverse";
import { ITreeNode } from "~/structures/n-ary/node";
import { Key } from "~/shared/types/key";
import { Nullable } from "~/shared/types/ts";
import { isCache } from "~/structures/n-ary/utils/cache";
import { INode } from "~/shared/types/node";
import { NodeCache } from "~/shared/types/cache";
import { TreeFn2 } from "~/structures/n-ary/functional/types/functions";
import { isKey } from "~/shared/utils/key";
import { cond } from "rambdax";

/**
 * Finds node by key.
 * @param key - Key to find.
 * @param order - Traversal order.
 */
export function find<T = unknown>(
  key: Key,
  order: TraversalOrder = 'pre'
): TreeFn2<T, Nullable<ITreeNode<T>>> {
  return (tree, cache) => {
    if (cache?.has(key)) return cache.get(key) ?? null;
    const traverse = traverseFn<T>(order);
    
    for (const node of traverse(tree)) {
      if (node.key === key) {
        return node;
      }
    }
    
    return null
  }
}

import { Nullable } from "~/shared/types/ts";
import { Key } from "~/shared/types/key";
import { NodeCache } from "~/shared/types/cache";
import { ITreeNode } from "~/structures/n-ary/node";
import { DataIndexerOptions } from "~/shared/types/data";

let __id = 0;
/**
 * Creates a new node.
 * @param item - The item to create a node for.
 * @param key - The parent key
 * @param options - The options to create the node.
 */
export function createNode<T, V = T>(item: T, key?: Nullable<Key>, options?: DataIndexerOptions<T, V> & {
  cache?: Nullable<NodeCache<ITreeNode>>
}): ITreeNode<V> {
  const { getKey, getValue, getChildren, cache } = options || {
    getKey: (item: any) => item.id || item.key || null,
    getValue: (item: any) => item,
    getChildren: (item: any) => item.children || item.items || []
  };
  const node: ITreeNode = { key: null, parent: !key ? null : key, children: []}
  switch (typeof item) {
    case "object": {
      if (Array.isArray(item)) {
        node.key = __id++;
        node.value = item;
        // Since the value is an array, there is no need to index it.
        node.children = [];
        cache && cache.set(node.key, node);
        return node;
      }
      node.key = getKey(item);
      node.value = getValue(item);
      node.children = getChildren(item).map(child => createNode(child, node.key, options));
      cache && cache.set(node.key, node);
      return node;
    }
    default:
      node.key = __id++;
      node.value = item;
      node.children = [];
      cache && cache.set(node.key, node);
      return node;
  }
}

/**
 * Create a tree from an array of items.
 * @param list - The array of items to create the tree from.
 * @param parent - The parent key of the tree.
 * @param options - The options to build the tree.
 */
export function fromList<T, V = T>(list: T[], parent?: Nullable<Key>, options?: DataIndexerOptions<T, V> & {
  cache?: Nullable<NodeCache<ITreeNode>>
}): ITreeNode<V>[] {
  return list?.map(item => createNode(item, parent, options)) || [];
}
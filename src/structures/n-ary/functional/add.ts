import { ITreeNode } from "~/structures/n-ary/node";
import { Nullable } from "~/shared/types/ts";
import { Key } from "~/shared/types/key";
import { insert } from "~/shared/utils/array";
import { fromData, toArray } from "~/structures/n-ary/utils/node";
import { TreeFn2 } from "~/structures/n-ary/functional/types/functions";
import { set } from "~/structures/n-ary/cache";
import { updateTree } from "~/structures/n-ary/functional/update-tree";

/**
 * Pushes a node to the end of the tree or to the end of the children of a node.
 * @param key - The key of the parent node.
 * @param index - The index of the target node.
 * @param data - The data of the node to push.
 */
export function add<T, V = T>
(key: Nullable<Key>, index: number, ...data: T[]): TreeFn2<T, ITreeNode<V>[]>;
/**
 * Adds a node at the specified index.
 * @param key - The key of the parent node.
 * @param index - The index of the target node.
 * @param data - The data of the node to push.
 */
export function add<T, V = T>
(key: Nullable<Key>, index: number, ...data: T[]): TreeFn2<T, ITreeNode<V>[]> {
  return (tree, cache, options) => {

    // If the input is null, then append the data to the root or append it to the node's children
    if(!key) {
      // @ts-ignore
      return insert<ITreeNode<V>>(tree,
        index,
        ...toArray(fromData<T, V>(data, null, {
          onCreate: set<any>(cache)
        }))) as ITreeNode<V>[]
    }

    return updateTree(key, (parent) => ({
      ...parent,
      children: insert<ITreeNode>(parent.children, index, ...toArray(fromData<T, V>(data, key,{
        onCreate: set<any>(cache)
      }))) as ITreeNode<V>[]
    }))(tree, cache) as ITreeNode<V>[];
  }
}
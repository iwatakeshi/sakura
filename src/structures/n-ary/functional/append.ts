import { ITreeNode } from "~/structures/n-ary/node";
import { Nullable } from "~/shared/types/ts";
import { Key } from "~/shared/types/key";
import { insert } from "~/shared/utils/array";
import { fromData, toArray } from "~/structures/n-ary/utils/node";
import { isKey } from "~/shared/utils/key";
import { find } from "~/structures/n-ary/utils/find";
import { TreeFn2 } from "~/structures/n-ary/functional/types/functions";
import { set } from "~/structures/n-ary/cache";
import { updateTree } from "~/structures/n-ary/functional/update-tree";
import { add } from "~/structures/n-ary/functional/add";

/**
 * Adds a node at the end of the parent's children.
 * @param key - The key of the parent node.
 * @param data - The data of the new node.
 */
export function append<T, V = T>
  (key: Key, ...data: T[]): TreeFn2<T, ITreeNode<V>[]> {
  return (tree, cache, options) => {
    if (!key) return add<T, V>(key , tree.length, ...data)(tree as any, cache, options) as ITreeNode<V>[];
    const parent = find(key)(tree, cache);
  // @ts-ignore
    if (!parent) return tree;
    return add<T, V>(parent.key, tree.length, ...data)(tree, cache, options) as ITreeNode<V>[];
    
    // // If the input is null, then append the data to the root or append it to the node's children
    // if(!input) {
    //   // @ts-ignore
    //   return insert<ITreeNode<V>>(tree,
    //     tree.length,
    //     ...toArray(fromData<T, V>(data, null,{
    //       onCreate: set<any>(cache)
    //     }))) as ITreeNode<V>[]
    // }
    //
    // const node = isKey(input) ? find(input)(tree) : input;
    // if (!node) return tree as unknown as ITreeNode<V>[]
    //
    // if (!node.parent) {
    //   const index = tree.indexOf(node as ITreeNode<T>);
    //   return insert<ITreeNode<T>, ITreeNode<V>>(
    //     tree, 
    //     index, 
    //     ...toArray(fromData<T, V>(data, node.parent,{
    //     ...options,
    //     onCreate: set<any>(cache)
    //   }))) as ITreeNode<V>[]
    // }
    //
    // const parent = find(node.parent)(tree, cache)!;
    // const index = parent?.children.indexOf(node as ITreeNode<T>);
    //
    // return updateTree(parent.key, (parent) => ({
    //   ...parent,
    //   children: insert<ITreeNode>(parent.children, index, ...toArray(fromData<T, V>(data, node.parent,{
    //     onCreate: set<any>(cache)
    //   }))) as ITreeNode<V>[]
    // }))(tree, cache) as ITreeNode<V>[];
  }
}
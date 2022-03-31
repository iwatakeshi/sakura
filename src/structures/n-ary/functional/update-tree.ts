import { find } from '../utils/find'
import { walk } from '../utils/traverse'
import { ITreeNode } from "~/structures/n-ary/node";
import { NodeCache } from "~/shared/types/cache";
import { Nullable } from "~/shared/types/ts";
import { Key } from "~/shared/types/key";
import { isNode } from "~/shared/utils/node";
import { identity } from "rambdax";
import * as Cache from "~/structures/n-ary/cache";
import { TreeFn } from "~/structures/n-ary/functional/types/functions";

/**
 * Replaces a node in the tree with a new node.
 * @param node
 */
function map<T>(node: ITreeNode<T>) {
  return (child: ITreeNode<T>) => {
    if (child.key === node.key) return node
    return child
  }
}

/**
 * Removes a node from the tree.
 * @param node
 */
function filter<T>(node: ITreeNode<T>) {
  return (child: ITreeNode<T>) => {
    return (child.key !== node.key)
  }
}

/**
 * Reduces the tree to a single node.
 * @param init
 * @param cache
 */
function reduce<T>(init: (node: ITreeNode<T>) => ITreeNode<T> = identity, cache?: Nullable<NodeCache<ITreeNode<T>>>) {
  return (acc: Nullable<ITreeNode<T>>, node: ITreeNode<T>) => {
    if (!acc) {
      return Cache.set(cache)(init?.(node) || node)
    }

    return Cache.set(cache)({
      ...node,
      children: node.children.map(map(acc))
    })
  }
}

type UpdateFn<T> = (node: ITreeNode<T>) => ITreeNode<T>
export function updateTree<T>(key: Key, update: UpdateFn<T>): TreeFn<T> {

  return (tree, cache) => {
    if (!key) return tree
    const node = find(key)(tree, cache)
    if (!node || !isNode(node)) return tree
    const array = Array.from(walk(node)(tree, cache)) as ITreeNode<T>[]
    let updated = update(node as ITreeNode<T>)
    // Update the node in the tree
    if (updated) {
      // Update the cache
      Cache.update(cache, node.key, updated)

      if (!node.parent) {
        tree.map(map(updated))
      }
      
      // Update the tree
      const copy = array
        .map(map(updated))
        .reduce(reduce(identity, cache), null as Nullable<ITreeNode<T>>)
      return copy ? [copy] : tree
    }

    // Remove the node from the cache
    Cache.remove(cache, node.key)

    // Remove the node from the tree
    if (!node.parent) {
      return tree.filter(filter(node))
    }


    // Delete the node from the tree
    const copy = array
      .filter(filter(node))
      .reduce(reduce(n => ({
        ...n,
        children: n.children.filter(filter(node!)),
      }), cache), null as Nullable<ITreeNode<T>>)

    return copy ? [copy] : tree;
  }
}


// /**
//  * Updates the specified node in the tree.
//  * @param tree - The tree nodes.
//  * @param cache - The cache of nodes.
//  * @returns - A function that updates a node in the tree
//  */
// export function updateTree<T>(
//   tree: ITreeNode<T>[],
//   cache?: NodeCache<ITreeNode<T>>
// ) {
//   /**
//    * Updates the specified node in the tree.
//    * 
//    * __Note:__ This function does not mutate the tree.
//    * @param key - The key of the node to update.
//    * @param update - The callback to update the node.
//    * @returns The updated tree nodes.
//    */
//   return function updateTree(
//     key: Key,
//     update: (node: ITreeNode<T>) => Nullable<ITreeNode<T>>
//   ): ITreeNode<T>[] {
//     let node = find(tree, key, cache) as ITreeNode<T>
//     if (!node || !isNode(node)) return tree
//     let updated = update(node)
//     // Store the tree that we walked up to
//     const array = Array.from(walk(tree, node, cache))
//    
//    
//    
//     // Update the node in the tree
//     if (updated) {
//       // Update the cache
//       Cache.update(cache, node.key, updated)
//      
//       if (!node.parent) return tree.map(map(updated))
//       const copy = array
//         .map(map(updated))
//         .reduce(reduce(identity, cache), null as Nullable<ITreeNode<T>>)
//       return copy ? [copy] : tree
//     }
//    
//     // Remove the node from the cache
//     Cache.remove(cache, node.key)
//    
//     // Remove the node from the tree
//     if (!node.parent) return tree.filter(filter(node))
//    
//    
//     // Delete the node from the tree
//     const copy = array
//       .filter(filter(node))
//       .reduce(reduce(n => ({
//         ...n,
//         children: n.children.filter(filter(node!)),
//       }), cache), null as Nullable<ITreeNode<T>>)
//     return copy ? [copy] : tree
//   }
// }

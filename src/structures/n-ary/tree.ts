import { ITreeNode } from "~/structures/n-ary/node";
import { Key } from "~/shared/types/key";
import { Nullable } from "~/shared/types/ts";
import { isNode } from "~/shared/utils/node";
import { walk } from "~/structures/n-ary/utils/traverse";
import * as Cache from "~/structures/n-ary/cache";
import { NodeCache } from "~/shared/types/cache";
import { insert } from "~/shared/utils/array";
import { DataIndexerOptions } from "~/shared/types/data";
import { createNode, fromList } from "~/structures/n-ary/utils/node";
import { find } from "./utils/find";
import { identity } from "rambdax";

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


interface NAryTreeOptions<T, V = T> extends DataIndexerOptions<T, V> {
  cache?: Nullable<NodeCache<ITreeNode>>
}

/**
 * A class with methods for manipulating a tree.
 * 
 * `T` - The type of the tree's nodes.
 * 
 * `V` - The type of the tree's values.
 */
export class NAryTree<T, V = T> {
  private readonly options: NAryTreeOptions<T, V>
  
  /**
   * Constructs an instance of `NAryTree`.
   * @param options - Options for the tree.
   */
  constructor(options?: NAryTreeOptions<T, V>) {
    this.options = {
      getKey: (value: any) => value.key || value.id || value.uid,
      getValue: identity as (n: any) => any,
      getChildren: (value: any) => value.children || value.items || value.nodes || [],
      ...options
    }
  }

  /**
   * Adds items to the tree.
   * @param tree - The tree to traverse.
   * @param key - The parent key
   * @param index - The index to add the node at
   * @param items - The items to add
   * @returns - The new tree
   */
  public add<U = V>(tree: ITreeNode<T>[], key: Nullable<Key>, index: number, ...items: U[]): ITreeNode<T>[] {
    if (!key) return insert(tree, index, ...fromList<any, any>(items, key, this.options))
    
    return this.updateTree(tree, key, (node) => {
      return {
        ...node,
        children: insert(node.children, index, ...fromList<any, any>(items, key, this.options))
      }
    })
  }

  /**
   * Adds a node before another node.
   * @param tree - The tree to traverse.
   * @param key - The target node
   * @param items - The items to add
   * @returns - The new tree
   */
  public addBefore<U = V>(tree: ITreeNode[], key: Nullable<Key>, ...items: U[]): ITreeNode<T>[] {
   
    if (!key) return this.add(tree, key, 0, ...items) as ITreeNode[];
    
    const node = find(tree, key, { cache: this.options?.cache })
    if (!node) return tree;
    if (!node.parent) {
      const index = tree.indexOf(node);
      return this.add(tree, null, index, ...items)
    }
    
    const parent = find(tree, node.parent, { cache: this.options?.cache })!
    const index = parent.children.indexOf(node)
    return this.add(tree, node.parent, index, ...items)
  }

  /**
   * Adds a node after another node of a parent node.
   * @param tree - The tree to traverse.
   * @param key - The target node.
   * @param items - The items to add.
   * @returns - The new tree
   */
  public addAfter<U = V>(tree: ITreeNode[], key: Nullable<Key>, ...items: U[]): ITreeNode<T>[] {
   
    if (!key) return this.add(tree, key, 0, ...items) as ITreeNode[];

    const node = find(tree, key, { cache: this.options?.cache })
    if (!node) return tree;
    if (!node.parent) {
      const index = tree.indexOf(node);
      return this.add(tree, null, index + 1, ...items)
    }

    const parent = find(tree, node.parent, { cache: this.options?.cache })!
    const index = parent.children.indexOf(node)
    return this.add(tree, node.parent, index + 1, ...items)
  }

  /**
   * Adds a node at the beginning of a parent's child nodes.
   * @param tree - The tree to traverse.
   * @param key - The parent key.
   * @param items - The items to add.
   * @returns - The new tree
   */
  public prepend<U = V>(tree: ITreeNode[], key: Nullable<Key>, ...items: U[]): ITreeNode<T>[] {
    return this.add(tree, key, 0, ...fromList<any, any>(items, key, this.options))
  }

  /**
   * Adds a node at the end of the parent's child nodes.
   * @param tree - The tree to traverse.
   * @param key - The parent key.
   * @param items - The items to add.
   * @returns - The new tree
   */
  public append<U = V>(tree: ITreeNode[], key: Nullable<Key>, ...items: T[]): ITreeNode<T>[] {
    if (!key) return this.add(tree, key, tree.length, ...items)
    const parent = find(tree, key, { cache: this.options?.cache })
    if (!parent) return tree;
    const index = parent.children.length
    return this.add(tree, key, index, ...items)
  }
  
  /**
   * Moves a node to a new index in the parent's child nodes.
   * @param tree - The tree to traverse.
   * @param from - The key of the node to move.
   * @param to - The index to move the node to.
   * @param index - The index of the node to move.
   * @returns - The new tree.
   */
  public move<U = V>(tree: ITreeNode[], from: Key, to: Key, index: number) {
   
    const node = find(tree, from, { cache: this.options?.cache })
    if (!node) return tree;
    
    this.remove(tree, from);
    
    return this.updateTree(tree, to, (parent) => ({
      ...parent,
      children: insert(parent.children, index, {
        ...node,
        parent: to
      })
    }))
  }

  /**
   * Updates a node's value.
   * @param tree - The tree to traverse.
   * @param key - The node to update
   * @param value - The new value
   * @returns - The new tree
   */
  public update<U = V>(tree: ITreeNode[], key: Nullable<Key>, value: U): ITreeNode<T>[] {
   
    if (!find(tree, key, { cache: this.options?.cache })) return tree;
    return this.updateTree(tree, key, (previous) => {
      const node = createNode(value, null, this.options as any)
      node.key = key
      node.parent = previous.parent
      if (typeof value === 'object' && Array.isArray(this.options?.getChildren(value as any))){
        return node
      }
      return {
        ...node,
        children: previous.children
      }
    })
  }
  /**
   * Removes a node from the tree.
   * @param tree - The tree to traverse.
   * @param keys - The keys of the node to remove
   * @returns - The new tree
   */
  public remove(tree: ITreeNode[], ...keys: Key[]): ITreeNode<T>[] {
    let current = tree
    for (const key of keys) {
      current = this.updateTree(current, key, () => null)
    }
    return tree
  }
  /**
   * Updates the tree by performing updates on the node with the given key.
   * @param tree - The tree to traverse.
   * @param key - The key of the node to update
   * @param update - The update function
   * @returns - The new tree
   */
  protected updateTree<U = V>(tree: ITreeNode<U>[], key: Nullable<Key>, update: (node: ITreeNode) => Nullable<ITreeNode>): ITreeNode<U>[] {
   
    const node = find(tree, key, { cache: this.options?.cache })
    if (!node || !isNode(node)) return tree
    const array = Array.from(walk(tree, node.key, this.options.cache)) as ITreeNode<T>[]
    let updated = update(node)
    // Update the node in the tree
    if (updated) {
      // Update the cache
      Cache.update(this.options?.cache, node.key, updated)

      if (!node.parent) {
        return tree.map(map(updated))
      }

      // Update the tree
      const copy = array
        .map(map(updated))
        .reduce(reduce(identity, this.options?.cache), null as Nullable<ITreeNode<T>>)
      return copy ? [copy] : tree
    }

    // Remove the node from the cache
    Cache.remove(this.options?.cache, node.key);

    // Remove the node from the tree
    if (!node.parent) {
      return tree.filter(filter(node))
    }


    // Delete the node from the tree
    const copy = array
      .filter(filter(node as ITreeNode))
      .reduce(reduce(n => ({
        ...n,
        children: n.children.filter(filter(node!)),
      }), this.options?.cache), null as Nullable<ITreeNode<T>>)

    return copy ? [copy] : tree;
  }
  
  /* Static methods */
  
  public static find = find
  public static walk = walk
  public static fromList = fromList
}
import { INode } from "~/shared/types/node";
import { isKey } from "~/shared/utils/key";
import { cond, identity } from "rambdax";
import { Key } from "~/shared/types/key";
import { ITreeNode } from "~/structures/n-ary/node";
import { Maybe, Nullable } from "~/shared/types/ts";
import { DataIndexerOptions } from "~/shared/types/data";
import { isNode } from "~/shared/utils/node";

export interface FromOptions<T, U = T> extends DataIndexerOptions<T, U> {
  /**
   * A function that is called when a node is added to the tree.
   */
  onCreate: (node: ITreeNode<U>, parent: Maybe<Key>, index: number, depth: number) => ITreeNode<U>
}

/** 
 * The default options for node.
 * @internal 
 */
export const nodeFromOptions: FromOptions<any> = {
  getKey: (data) => data.id || data.key,
  getChildren: (data) => {
    if (data.children && Array.isArray(data.children)) {
      return data.children
    }
    if (data.items && Array.isArray(data.items)) {
      return data.items
    }
    return []
  },
  onCreate: identity
}

/**
 * Creates a node from the given data.
 * @param node - The node to create.
 * @param parent - The parent of the node.
 * @param options - The options for the node.
 */
export function fromNode<T, V = T>(
  node: ITreeNode<T>,
  parent?: Nullable<Key>,
  options?: Omit<Partial<FromOptions<T, V>>, keyof DataIndexerOptions<any>>
): ITreeNode<V> {
  const _node = {
    ...node,
    parent: parent === undefined ? null : parent,
    children: node.children.map(child => fromNode(child, parent, options))
  } as ITreeNode<V>;

  return options?.onCreate?.(_node, node.parent as Nullable<Key>, 0, 0) ?? _node
}

/**
 * Creates a tree from the given data.
 * @param data - The data to create the tree from.
 * @param parent - The parent of the data.
 * @param options - The options for `fromData`.
 * @param index - The index of the data.
 * @param depth - The depth of the data.
 */
export function fromData<T, V = T>(
  data: T,
  parent?: Nullable<Key>,
  options?: Omit<Partial<FromOptions<T, V>>, keyof DataIndexerOptions<any>>,
  index?: number,
  depth?: number
): ITreeNode<V>;

/**
 * Creates a tree from the given data.
 * @param data - The data to create the tree from.
 * @param parent - The parent of the data.
 * @param options - The options for `fromData`.
 * @param index - The index of the data.
 * @param depth - The depth of the data.
 */
export function fromData<T, V = T>(
  data: T[],
  parent?: Nullable<Key>,
  options?: Omit<Partial<FromOptions<T, V>>, keyof DataIndexerOptions<any>>,
  index?: number,
  depth?: number
): ITreeNode<V>[];

export function fromData<T, V = T>(
  data: T | T[],
  parent?: Nullable<Key>,
  options?: Omit<Partial<FromOptions<T, V>>, keyof DataIndexerOptions<any>>,
  index?: number,
  depth?: number
) {
    const { getKey, getValue, getChildren, onCreate } = { 
    ...nodeFromOptions, 
    ...(typeof index === 'object' ? index : options) 
  }

  function _fromData(_data: T, _parent: Maybe<Key>, _index: number, _depth: number): ITreeNode<V> {
    const key = getKey(_data)
    const value = getValue?.(_data) ?? _data
    const children = getChildren(_data)
    const node = {
      key,
      parent: _parent === undefined ? null : _parent,
      value,
      children: []
    } as ITreeNode<V>

    node.children = children
      .map((child, i) => 
        _fromData(child, node.key, i, _depth + 1))

    return onCreate?.(node, _parent, _index, _depth) ?? node
  }

  return Array.isArray(data) 
    ? data.map((child, i) => _fromData(child, parent, i, depth || 0)) 
    : _fromData(data, parent, 0, 0)
}

/**
 * Convert a single node to an array.
 * @param node - The node to convert.
 */
export const toArray = cond([
  [isNode, n => [n]],
  [Array.isArray, identity as any],
  [() => true, () => []]
]) as <T>(node: ITreeNode<T> | ITreeNode<T>[]) => ITreeNode<T>[]
import { Node } from '../../shared/node'

export interface BinaryTreeNode<T = any> extends Node<T> {
  /**
   * The parent of the node.
   * @remarks
   * This is `undefined` if the node is the root.
   */
  parent?: BinaryTreeNode<T>
  /**
   * The left and right children of the node.
   * @remarks
   * This is `undefined` if the node is a leaf.
   */
  children?: [BinaryTreeNode<T>?, BinaryTreeNode<T>?]
}

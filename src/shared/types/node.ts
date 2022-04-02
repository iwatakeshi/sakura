import { Key } from "./key";
import { Nullable } from "./ts";

/**
 * An interface representing a node in the tree.
 */
export interface INode<T = any> {
  /**
   * A unique key for the node.
   */
  key: Key,
  /**
   * The value of the node.
   */
  value?: T,
  /**
   * The parent of the node.
   */
  parent?: Nullable<INode<T> | Key>
}
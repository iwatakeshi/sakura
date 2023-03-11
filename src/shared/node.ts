/**
 * A atomic representation of a node that can be used in a tree or graph.
 * @template T The type of the value stored in the node.
 */
export interface Node<T = any> {
  /**
   * The value stored in the node.
   */
  value: T
}

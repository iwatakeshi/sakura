import { GraphNode } from './node'

/**
 * A representation of an edge in a graph.
 */
export interface GraphEdge<
  T = any,
  U = any,
  N extends GraphNode<U> = GraphNode<any>
> {
  /**
   * The source node of the edge.
   */
  source: N
  /**
   * The target node of the edge.
   */
  target: N
  /**
   * The value stored in the edge.
   */
  value: T
}

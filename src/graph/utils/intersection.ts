import { GraphEdge } from '../edge'
import { Graph } from '../graph'
import { GraphNode } from '../node'

/**
 * Returns a new graph that is the intersection of two graphs.
 * @param graphA - The first graph.
 * @param graphB - The second graph.
 * @param compareNode - A function that determines if two nodes are equal.
 * @param compareEdge - A function that determines if two edges are equal.
 * @returns
 */
export function intersection<
  A extends GraphNode,
  B extends GraphNode,
  E extends GraphEdge
>(
  graphA: Graph<A, E>,
  graphB: Graph<B, E>,
  compareNode: (a: A | B, b: B) => boolean,
  compareEdge: (a: E, b: E) => boolean
): Graph<A | B, E> {
  const intersectionGraph = new Graph<A | B, E>()

  // Add nodes from graphA that are also in graphB
  for (const nodeA of graphA.nodes) {
    const matchingNode = Array.from(graphB.nodes).find((node) =>
      compareNode(nodeA, node)
    )
    if (matchingNode) {
      intersectionGraph.addNode(nodeA as A | B)
    }
  }

  // Add edges from graphA that are also in graphB
  for (const edgeA of graphA.edges) {
    const matchingEdge = Array.from(graphB.edges).find((edge) =>
      compareEdge(edgeA, edge)
    )
    if (matchingEdge) {
      intersectionGraph.addEdge(edgeA)
    }
  }

  return intersectionGraph
}

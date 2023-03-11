import { GraphEdge } from '../edge'
import { Graph } from '../graph'
import { GraphNode } from '../node'

/**
 * Returns a new graph that is the union of the two given graphs.
 * @param graphA - The first graph.
 * @param graphB - The second graph.
 * @param compareNode - A function that determines if two nodes are equal.
 * @param compareEdge - A function that determines if two edges are equal.
 * @returns
 */
export function union<
  A extends GraphNode,
  B extends GraphNode,
  E extends GraphEdge
>(
  graphA: Graph<A, E>,
  graphB: Graph<B, E>,
  compareNode: (a: A | B, b: B) => boolean,
  compareEdge: (a: E, b: E) => boolean
): Graph<A | B, E> {
  const unionGraph = new Graph<A | B, E>()

  // Add nodes from graphA
  for (const nodeA of graphA.nodes) {
    unionGraph.addNode(nodeA as A | B)
  }

  // Add nodes from graphB that are not in graphA
  for (const nodeB of graphB.nodes) {
    const matchingNode = Array.from(unionGraph.nodes).find((node) =>
      compareNode(node, nodeB)
    )
    if (!matchingNode) {
      unionGraph.addNode(nodeB as A | B)
    }
  }

  // Add edges from graphA
  for (const edgeA of graphA.edges) {
    unionGraph.addEdge(edgeA)
  }

  // Add edges from graphB that are not in graphA
  for (const edgeB of graphB.edges) {
    const matchingEdge = Array.from(unionGraph.edges).find((edge) =>
      compareEdge(edge, edgeB)
    )
    if (!matchingEdge) {
      unionGraph.addEdge(edgeB)
    }
  }

  return unionGraph
}

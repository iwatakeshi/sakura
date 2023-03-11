import { GraphEdge } from "../edge"
import { Graph } from "../graph"
import { GraphNode } from "../node"
/**
 * Returns a new graph that is the difference between graphA and graphB.
 * @param graphA - The graph to subtract from.
 * @param graphB - The graph to subtract.
 * @param compareNode - A function that compares two nodes and returns true if they are equal.
 * @param compareEdge - A function that compares two edges and returns true if they are equal.
 * @returns 
 */
export function difference<
  A extends GraphNode,
  B extends GraphNode,
  E extends GraphEdge
>(
  graphA: Graph<A, E>,
  graphB: Graph<B, E>,
  compareNode: (a: A | B, b: B) => boolean,
  compareEdge: (a: E, b: E) => boolean
): Graph<A | B, E> {
  const differenceGraph = new Graph<A | B, E>()

  // Add nodes from graphA that are not in graphB
  for (const nodeA of graphA.nodes) {
    const matchingNode = Array.from(graphB.nodes).find((node) =>
      compareNode(nodeA, node)
    )
    if (!matchingNode) {
      differenceGraph.addNode(nodeA as A | B)
    }
  }

  // Add edges from graphA that are not in graphB
  for (const edgeA of graphA.edges) {
    const matchingEdge = Array.from(graphB.edges).find((edge) =>
      compareEdge(edgeA, edge)
    )
    if (!matchingEdge) {
      differenceGraph.addEdge(edgeA)
    }
  }

  return differenceGraph
}
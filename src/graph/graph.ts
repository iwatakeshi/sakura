import { GraphEdge } from './edge'
import { GraphNode } from './node'

export class Graph<
  N extends GraphNode,
  E extends GraphEdge = GraphEdge<any, N>
> {
  private _nodes: Set<N> = new Set()
  private _edges: Set<E> = new Set()
  private _neighbors: Map<N, Set<N>> = new Map()

  /**
   * Creates a new graph.
   * @param nodes The nodes of the graph.
   */
  public addNode(node: N): void {
    this._nodes.add(node)
  }

  public addEdge(edge: E): void {
    this._edges.add(edge)
    const source = edge.source as N
    const target = edge.target as N

    // Add nodes if they don't exist
    this.addNode(source)
    this.addNode(target)

    // Add target to source neighbors
    this.addNeighbor(source, target)
    // Add source to target neighbors
    this.addNeighbor(target, source)

    // Remove self-loops
    if (source === target) {
      this.removeNeighbor(source, target)
    }
  }

  /**
   * Removes a node from the graph.
   * @param node The node to remove.
   */
  public removeNode(node: N): void {
    this._nodes.delete(node)
    this._edges.forEach((edge) => {
      if (edge.source === node || edge.target === node) {
        this._edges.delete(edge)
        const otherNode = edge.source === node ? edge.target : edge.source
        this.removeNeighbor(otherNode as N, node)
      }
    })
    this._neighbors.delete(node)
  }

  /**
   * Removes an edge from the graph.
   * @param edge The edge to remove.
   * @remarks
   * This method does not remove the nodes of the edge.
   * @see {@link Graph.removeNode}
   */
  public removeEdge(edge: E): void {
    this._edges.delete(edge)
    const source = edge.source as N
    const target = edge.target as N
    this.removeNeighbor(source, target)
    this.removeNeighbor(target, source)
  }

  public clear(): void {
    this._nodes.clear()
    this._edges.clear()
    this._neighbors.clear()
  }

  public neighborsOf(node: N): Set<N> {
    return this._neighbors.get(node) || new Set()
  }

  public get nodes(): Set<N> {
    return this._nodes
  }

  public get edges(): Set<E> {
    return this._edges
  }

  public get size(): number {
    return this._nodes.size
  }

  public get order(): number {
    return this._edges.size
  }

  public get isEmpty(): boolean {
    return this._nodes.size === 0
  }

  public get isDirected(): boolean {
    return Array.from(this._edges).some((edge) => edge.source !== edge.target)
  }

  private addNeighbor(node: N, neighbor: N): void {
    let neighbors = this._neighbors.get(node)
    if (!neighbors) {
      neighbors = new Set()
      this._neighbors.set(node, neighbors)
    }
    neighbors.add(neighbor)
  }

  private removeNeighbor(node: N, neighbor: N): void {
    const neighbors = this._neighbors.get(node)
    if (neighbors) {
      neighbors.delete(neighbor)
    }
  }

  static sizeOf<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>
  ): number {
    return graph.size
  }

  static orderOf<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>
  ): number {
    return graph.order
  }

  static bfs = <N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    start: N,
    visit: (node: N) => void
  ): N[] => {
    const visited: N[] = []
    const queue = [start]
    while (queue.length) {
      const node = queue.shift() as N
      if (!visited.includes(node)) {
        visit(node)
        visited.push(node)
        graph.neighborsOf(node).forEach((neighbor) => {
          queue.push(neighbor)
        })
      }
    }
    return visited
  }

  static dfs = <N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    start: N,
    visit: (node: N) => void
  ): N[] => {
    const visited: N[] = []
    const stack = [start]
    while (stack.length) {
      const node = stack.pop() as N
      if (!visited.includes(node)) {
        visit(node)
        visited.push(node)
        graph.neighborsOf(node).forEach((neighbor) => {
          stack.push(neighbor)
        })
      }
    }
    return visited
  }

  /**
   * Finds a path between two nodes.
   * @param graph - The graph to search.
   * @param start - The start node.
   * @param end 
   * @returns 
   */
  static findPath<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    start: N,
    end: N
  ): N[] | null {
    const visited = new Set<N>()
    const queue = [[start]]
    while (queue.length) {
      const path = queue.shift() as N[]
      const node = path[path.length - 1]
      if (!visited.has(node)) {
        if (node === end) {
          return path
        }
        visited.add(node)
        graph.neighborsOf(node).forEach((neighbor) => {
          queue.push([...path, neighbor])
        })
      }
    }
    return null
  }

  static find<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    predicate: (
      node: N,
      neighbors: Set<N>
    ) => boolean
  ): N | null {
    for (const node of graph.nodes) {
      if (predicate(node, graph.neighborsOf(node))) {
        return node
      }
    }
    return null
  }

  static findEdge<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    predicate: (edge: E) => boolean
  ): E | null {
    for (const edge of graph.edges) {
      if (predicate(edge)) {
        return edge
      }
    }
    return null
  }

  static exists<N extends GraphNode, E extends GraphEdge>(
    graph: Graph<N, E>,
    predicate: (
      node: N,
      neighbors: Set<N>
    ) => boolean
  ): boolean {
    return Graph.find(graph, predicate) !== null
  }
}

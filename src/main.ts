import { Graph, GraphEdge, GraphNode } from './graph'
import { union, intersection } from './graph/utils'
import { difference } from './graph/utils/difference'

interface Person {
  name: string
}

const graph = new Graph<GraphNode<Person>>()

const alice = { value: { name: 'Alice' } }
const bob = { value: { name: 'Bob' } }
const carol = { value: { name: 'Carol' } }
const dave = { value: { name: 'Dave' } }

graph.addNode(alice)
graph.addNode(bob)
graph.addNode(carol)
graph.addNode(dave)

graph.addEdge({ source: alice, target: bob, value: {} })
graph.addEdge({ source: alice, target: carol, value: {} })
graph.addEdge({ source: bob, target: carol, value: {} })
graph.addEdge({ source: bob, target: dave, value: {} })
graph.addEdge({ source: carol, target: dave, value: {} })

const graph2 = new Graph<GraphNode<Person>>()

const eve = { value: { name: 'Eve' } }
const frank = { value: { name: 'Frank' } }
const grace = { value: { name: 'Grace' } }
const helen = { value: { name: 'Helen' } }

graph2.addNode(eve)
graph2.addNode(frank)
graph2.addNode(grace)
graph2.addNode(helen)

graph2.addEdge({ source: eve, target: frank, value: {} })
graph2.addEdge({ source: eve, target: grace, value: {} })
graph2.addEdge({ source: frank, target: grace, value: {} })
graph2.addEdge({ source: frank, target: helen, value: {} })
graph2.addEdge({ source: grace, target: helen, value: {} })
graph2.addEdge({ source: eve, target: bob, value: {} })
graph2.addEdge({ source: bob, target: carol, value: {} })
graph2.addEdge({ source: bob, target: dave, value: {} })

// A print functiont that prints the graph out on the console
// and shows the relationships between the nodes.
function printGraph(graph: Graph<GraphNode<Person>>) {
  graph.nodes.forEach((node) => {
    const neighbors = graph.neighborsOf(node)
    console.log(
      `${node.value.name} -> ${Array.from(neighbors)
        .map((n) => n.value.name)
        .join(', ')}`
    )
  })
}

const equalNode = (a: GraphNode<Person>, b: GraphNode<Person>) =>
  a.value.name === b.value.name
const equalEdge = (a: GraphEdge<Person>, b: GraphEdge<Person>) =>
  a.source.value.name === b.source.value.name &&
  a.target.value.name === b.target.value.name

console.log('Union')
printGraph(union(graph, graph2, equalNode, equalEdge))
console.log()
console.log('Intersection:')
printGraph(intersection(graph, graph2, equalNode, equalEdge))

console.log()
console.log('Difference:')
printGraph(difference(graph, graph2, equalNode, equalEdge))

console.log()
console.log('Find path:')
console.log(Graph.findPath(intersection(graph, graph2, equalNode, equalEdge), bob, dave))
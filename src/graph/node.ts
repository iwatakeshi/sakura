import { Node } from '../shared/node'

/**
 * A representation of a node that in a graph.
 * @template T The type of the value stored in the node.
 */

export interface GraphNode<T = any> extends Node<T> {}

# sakura
A unit of a data structure to build elegant trees or cherry blossoms 🌸

[![Node CI](https://github.com/iwatakeshi/sakura/workflows/Node%20CI/badge.svg)](https://github.com/iwatakeshi/sakura/actions?query=workflow%3A%22Node+CI%22)
![Codecov](https://img.shields.io/codecov/c/github/iwatakeshi/sakura)
[![Version](https://img.shields.io/npm/v/@iwatakeshi/sakura.svg)](https://www.npmjs.com/package/@iwatakeshi/sakura)
[![Downloads/week](https://img.shields.io/npm/dw/@iwatakeshi/sakura.svg)](https://www.npmjs.com/package/@iwatakeshi/sakura)
[![License](https://img.shields.io/github/license/iwatakeshi/sakura)](https://github.com/iwatakeshi/sakura/blob/master/LICENSE.md)
## About

Sakura has an elegant `Node` class that wraps some of the familiar APIs we use for arrays. However, instead of arrays, we're dealing with nodes.

Here's an example:

```typescript
import { Node } from '@iwatakeshi/sakura'
// Note: If you use require(), then it's:
// const { Node } = require('@iwatakeshi/sakura')

// Let's make a root node and give it a name
// of 'a' and an id of '1'
const a = new Node('1', 'a', true)

// Let's create two other leaf nodes
const b = new Node('2', 'b')
const c = new Node('3', 'c')

// Add 'b' as a child of 'a'
a.push(b)
// Add 'c' as a child of 'b'
b.push(c)

// Let's search for 'c'!
console.log(a.search('3'))
// => 
// Node {
//   isRoot: false,
//   name: 'c',
//   id: '567',
//   children: [],
//   _parent: Node {
//     ...
//   }
// }

```

But wait, there's more!

What if we wanted to get the index or the depth of a child node?

```typescript
// continued...

const d = new Node('4', 'd')
const e = new Node('5', 'e')

b.push(d)
b.push(e)
const result = a.search('5')
console.log(result.index)
// => 2
console.log(result.depth)
// => 2
```

Of course, we can have some fun by manipulating some children:

```typescript
// continued...

const f = new Node('6', 'f')
const g = new Node('7', 'g')

e.push(f)
e.push(g)

console.log(
  a.search('2')
   .find(node => node!.id === '5')
   .map(node => node!.data)
 )
// => ['f', 'g']
```

By now, I think you get the idea...

## API

### Node

```typescript
class Node<T = any> {

  /**
   * The Node constructor
   * @param name A label for the node.
   * @param isRoot Sets the node as the root.
   * @param id A unique identifier for the node.
   */
  constructor(id: string, data?: T, isRoot = false)

  /**
   * Appends a child to the node, and returns the new length of the node's children.
   * @param child The child node to append.
   */
  push(child: Node): number;
  
  /**
   * Removes the last child of the node and returns it.
   */
  pop(): Maybe<Node>;

  /**
   * Inserts a new child at the start the node's children.
   * @param child The child to insert.
   */
  unshift(child: Node): number;

  /**
   * Removes the first child from the node and returns it.
   */
  shift(): Maybe<Node>;

  /**
   * Removes a child from the node.
   * @param child The child node to remove.
   */
  remove(child: Node): Maybe<Node>[];

  /**
   * Removes a child from the node.
   * @param index The index of the child to remove.
   */
  removeAt(index: number): Maybe<Node>[];

  /**
   * Returns the children of the node that meet the condition specified in a callback function.
   * @param cb A function that accepts up to three arguments.
   * The filter method calls the callback function one time for each * child of the node.
   */
  filter(cb: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): Maybe<Node>[];

  /**
   * Calls a defined callback function on each child of the node,
   * and returns an array that contains the results.
   * @param cb A function that accepts up to three arguments.
   * The map method calls the cb function one time for each child of the node.
   */
  map<T>(cb: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => T): T[];

  /**
   * Returns the value of the first child of the node where predicate is true, and undefined otherwise.
   * @param predicate  find calls predicate once for each child of the node, in ascending order,
   * until it finds one where predicate returns true. If such a child is found,
   * find immediately returns that child. Otherwise, find returns undefined.
   */
  find(predicate: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): Maybe<Node>;

  /**
   * Returns the index of the first child of the node where predicate is true, and -1 otherwise.
   * @param predicate find calls predicate once for each child of the node, in ascending order,
   * until it finds one where predicate returns true. If such a child is found,
   * findIndex immediately returns that child index. Otherwise, findIndex returns -1.
   */
  findIndex(predicate: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): number;

  /**
   * Returns the index of the first occurrence of a value in the node's children.
   * @param child The child node to locate.
   */
  indexOf(child: Node): number;

  /**
   * Determines whether the node includes a certain child, returning true or false as appropriate.
   * @param child The child to search for.
   * @param fromIndex The position in this node's children at which to begin searching for the child.
   */
  includes(child: Node, fromIndex?: number): boolean;

  /**
   * Serializes the node into a JSON friendly format.
   */
  serialize(): NodeSchema;

  /**
   * Deserializes a JSON friendly format into a Node.
   * @param schema The serialized node schema.
   */

  deserialize(schema: NodeSchema);
  /**
   * Deeply searches for a child node.
   *
   * Note: Search starts from the current node.
   * @param id The id of the node to search for.
   */
  search(id: string): Maybe<Node>;


  /**
   * Returns the index of the node's position relative to the node's parent.
   *
   * Note: Be sure to check if the node has a parent.
   */
  get index(): number;

  /**
   * The parent of the node.
   */
  get parent(): Maybe<Node>;

  /**
   * Determines whether the node has children.
   */
  get isParent(): boolean;

  /**
   * Deeply searches for a child node.
   *
   * Note: Search performs a breadth-first search.
   * @param node The root node to search from.
   * @param id The id of the node to search for.
   */
  static search(node: Node, id: string): Maybe<Node>

  /**
   * Deserializes a JSON friendly format into a Node.
   * @param schema The serialized node schema.
   */
  static deserialize(schema: NodeSchema): Node
}
```

### NodeSchema

```typescript
interface NodeSchema<T = any> {
  id: string
  data?: T
  children: NodeSchema[]
  isRoot: boolean
  isParent: boolean
  index: number
  depth: number
}
```

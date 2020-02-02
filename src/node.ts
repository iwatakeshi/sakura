// tslint:disable: jsdoc-format
type Maybe<T> = T | null | undefined

/**
 * NodeSchema is an interface that describes the schema of a serialized node.
 */
export interface NodeSchema<T = any> {
  id: string
  data?: T
  children: NodeSchema[]
  isRoot: boolean
  isParent: boolean
  index: number
  depth: number
}

/**
 * Node is a class to define a tree or a cherry blossom.
 */
export class Node<T = any> {
  /**
   * Returns the id of the node.
   */
  get id(): string {
    return this._id
  }

  /**
   * Returns the depth of the node.
   */
  get depth(): number {
    let depth = 0
    let current = this.parent
    while (current) {
      depth += 1
      current = current.parent
    }

    return depth
  }

  /**
   * Returns the index of the node's position relative to the node's parent.
   *
   * __Note__: Be sure to check if the node has a parent.
   */
  get index(): number {
    if (!this.parent) {
      return 0
    }
    return this.parent.indexOf(this)
  }

  /**
   * The parent of the node.
   */
  get parent(): Maybe<Node> {
    return this._parent
  }

  /**
   * Determines whether the node has children.
   */
  get isParent(): boolean {
    return this.children.length > 0
  }

  /**
   * Determines whether the node is a root node.
   */
  get isRoot(): boolean {
    return this._isRoot
  }
  /**
   * Deeply searches for a child node.
   *
   * __Note__: Search performs a breadth-first search.
   * @param node The root node to search from.
   * @param id The id of the node to search for.
   */
  static search(node: Node, id: string): Maybe<Node> {
    if (node.id === id) {
      return node
    }

    const queue = [node]

    while (queue.length !== 0) {
      const current = queue.shift()

      // tslint:disable-next-line: whitespace
      const children = current!.children

      for (const child of children) {
        if (child && child.id === id) {
          return child
        }

        if (child && child.children.length > 0) {
          queue.push(child)
        }
      }
    }

    return null
  }

  /**
   * Deserializes a JSON friendly format into a Node.
   * @param schema The serialized node schema.
   */
  static deserialize(schema: NodeSchema): Node {
    return [schema].map(s => {
      const parent = new Node(s.id, s.data, s.isRoot)
      parent.children = s.children.map(Node.deserialize)
      parent.children = parent.children.map(child => {
        child!.setParent(parent)
        return child
      })
      return parent
    })[0]
  }
  /**
   * The data of the node.
   */
  data?: T
  /**
   * Children of the node.
   */
  children: Array<Maybe<Node>>
  // tslint:disable-next-line: variable-name
  private _parent: Maybe<Node>
  private readonly _id: string
  private readonly _isRoot: boolean
  /**
   * The Node constructor.
   * @param id The id of the node.
   * @param data The payload for the node.
   * @param options The options for the node
   */
  constructor(id: string, data?: T, isRoot = false) {
    this._id = id
    this.data = data
    this._isRoot = isRoot
    this.children = []
  }

  /**
   * Appends a child to the node, and returns the new length of the node's children.
   * @param child The child node to append.
   */
  push(child: Node) {
    child.setParent(this)
    return this.children.push(child)
  }

  /**
   * Removes the last child from an array and returns it.
   */
  pop() {
    return this.children.pop()
  }

  /**
   * Inserts a new child at the start the node's children.
   * @param child The child to insert.
   */
  unshift(child: Node) {
    child.setParent(this)
    return this.children.unshift(child)
  }

  /**
   * Removes the first child from the node and returns it.
   */
  shift() {
    return this.children.shift()
  }

  /**
   * Removes a child from the node.
   * @param child The child node to remove.
   */
  remove(child: Node): Maybe<Node>[] {
    return this.removeAt(this.indexOf(child))
  }

  /**
   * Removes a child from the node.
   * @param index The index of the child to remove.
   */
  removeAt(index: number): Maybe<Node>[] {
    const child = this.children[index]
    if (child) {
      this.children.splice(index, 1)
    }
    return this.children
  }

  /**
   * Returns the children of the node that meet the condition specified in a callback function.
   * @param cb A function that accepts up to three arguments.
               The filter method calls the callback function one time for each child of the node.
   */
  filter(cb: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): Maybe<Node>[] {
    return this.children.filter(cb)
  }

  /**
   * Calls a defined callback function on each child of the node,
   * and returns an array that contains the results.
   * @param cb A function that accepts up to three arguments.
              The map method calls the cb function one time for each child of the node.
   */
  map<T>(cb: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => T): T[] {
    return this.children.map(cb)
  }

  /**
   * Returns the value of the first child of the node where predicate is true, and undefined otherwise.
   * @param predicate  find calls predicate once for each child of the node, in ascending order,
                until it finds one where predicate returns true. If such a child is found,
                find immediately returns that child. Otherwise, find returns undefined.
   */
  find(predicate: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): Maybe<Node> {
    return this.children.find(predicate)
  }

  /**
   * Returns the index of the first child of the node where predicate is true, and -1 otherwise.
   * @param predicate find calls predicate once for each child of the node, in ascending order,
               until it finds one where predicate returns true. If such a child is found,
               findIndex immediately returns that child index. Otherwise, findIndex returns -1.
   */
  findIndex(predicate: (node: Maybe<Node>, index?: number, nodes?: Maybe<Node>[]) => boolean): number {
    return this.children.findIndex(predicate)
  }

  /**
   * Returns the index of the first occurrence of a value in the node's children.
   * @param child The child node to locate.
   */
  indexOf(child: Node) {
    return this.children.indexOf(child)
  }

  /**
   * Determines whether the node includes a certain child, returning true or false as appropriate.
   * @param child The child to search for.
   * @param fromIndex The position in this node's children at which to begin searching for the child.
   */
  includes(child: Node, fromIndex?: number): boolean {
    return this.children.includes(child, fromIndex)
  }

  /**
   * Serializes the node into a JSON friendly format.
   */
  serialize(): NodeSchema {
    const makeSchema = (node: Maybe<Node>) => ({
      id: node!.id,
      data: node!.data,
      index: node!.index,
      depth: node!.depth,
      isRoot: node!.isRoot,
      isParent: node!.isParent,
      children: node!.map(makeSchema as any),
    }) as NodeSchema

    return [this].map(makeSchema)[0]
  }

  /**
   * Deserializes a JSON friendly format into a Node.
   * @param schema The serialized node schema.
   */
  deserialize(schema: NodeSchema): Node {
    return Node.deserialize(schema)
  }

  /**
   * Deeply searches for a child node.
   *
   * __Note__: Search starts from the current node.
   * @param id The id of the node to search for.
   */
  search(id: string): Maybe<Node> {
    return Node.search(this, id)
  }

  /**
   * Sets the current parent.
   * @param parent The parent node.
   */
  protected setParent(parent: Node) {
    this._parent = parent
  }
}

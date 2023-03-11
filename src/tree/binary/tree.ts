import { BinaryTreeNode } from './node'

export class BinaryTree<T = any> {
  /**
   * The root node of the tree.
   * @remarks
   * This is `undefined` if the tree is empty.
   */
  private _root?: BinaryTreeNode<T>

  private _size: number = 0

  /**
   * The number of nodes in the tree.
   * @remarks
   * This is `0` if the tree is empty.
   * @readonly
   * @type {number}
   */
  public get size(): number {
    return this._size
  }

  /**
   * Whether the tree is empty.
   * @remarks
   * This is `true` if the tree is empty.
   * @readonly
   */
  public get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * The root node of the tree.
   * @remarks
   * This is `undefined` if the tree is empty.
   * @readonly
   */
  public get root(): BinaryTreeNode<T> | undefined {
    return this._root
  }

  /**
   * Creates an instance of BinaryTree.
   * @param {BinaryTreeNode<T>} [root] The root node of the tree.
   * @memberof BinaryTree
   */
  constructor(root?: BinaryTreeNode<T>) {
    this._root = root
    this._size = root ? 1 : 0
  }

  /**
   * Inserts a node into the tree.
   * @param {BinaryTreeNode<T>} node The node to insert.
   * @param {BinaryTreeNode<T>} [parent] The parent of the node.
   * @returns {BinaryTreeNode<T>} The inserted node.
   */
  public insert(
    node: BinaryTreeNode<T>,
    parent?: BinaryTreeNode<T>
  ): BinaryTreeNode<T> {
    if (!parent) {
      if (this._root) {
        throw new Error('The tree already has a root.')
      }
      this._root = node
    } else {
      if (!parent.children) {
        parent.children = [node, undefined]
      } else {
        parent.children.push(node)
      }
      node.parent = parent
    }
    this._size++
    return node
  }

  /**
   * Removes a node from the tree.
   * @param {BinaryTreeNode<T>} node The node to remove.
   * @returns {BinaryTreeNode<T>} The removed node.
   */
  public remove(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    if (node.parent) {
      const index = node.parent?.children?.indexOf(node)
      if (index) node.parent?.children?.splice(index, 1)
    } else {
      this._root = undefined
    }
    this._size--
    return node
  }

  /**
   * Finds a node in the tree using breadth-first search.
   * @param node - The node to search for.
   * @param callback - The callback to call on each node.
   * @returns
   * @static
   */
  static bfs<T>(node: BinaryTreeNode<T>, callback: (node: T) => void): BinaryTreeNode<T>[] {
    const queue = [node]
    const result: BinaryTreeNode<T>[] = []
    while (queue.length) {
      const current = queue.shift()
      if (!current) continue
      callback(current.value)
      const [left, right] = current.children || []
      if (left) queue.push(left)
      if (right) queue.push(right)
    }
    return result
  }

  /**
   * Finds a node in the tree using depth-first search.
   * @param node - The node to search for.
   * @param callback - The callback to call on each node.
   * @returns
   * @static
   */
  static dfs<T>(node: BinaryTreeNode<T>, callback: (node: T) => void): BinaryTreeNode<T>[] {
    const stack = [node]
    const result: BinaryTreeNode<T>[] = []
    while (stack.length) {
      const current = stack.pop()
      if (!current) continue
      callback(current.value)
      const [left, right] = current.children || []
      if (right) stack.push(right)
      if (left) stack.push(left)
    }
    return result
  }

  /**
   * Returns the size of a node.
   * @param node - The node to get the size of.
   * @returns 
   */
  static sizeOf<T>(node: BinaryTreeNode<T>): number {
    let size = 0
    this.dfs(node, () => size++)
    return size
  }
}

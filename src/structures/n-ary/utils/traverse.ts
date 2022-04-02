/**
 * A helper function to traverse a tree of nodes.
 * @param node - The node to traverse.
 */
import { ITreeNode } from "~/structures/n-ary/node";
import { Key } from "~/shared/types/key";
import { find } from "~/structures/n-ary/utils/find";
import { Maybe } from "~/shared/types/ts";
import { NodeCache } from "~/shared/types/cache";

function* recurse<T>(node: ITreeNode<T>, order: 'pre' | 'post' = 'pre') {
  if (order === 'pre') {
    yield node
  }

  for (const n of node.children) {
    yield* recurse(n, order)
  }

  if (order === 'post') {
    yield node
  }
}

type TraverseFn<T, U = T, V extends ITreeNode<U> = ITreeNode<U>> =
  ((input: Maybe<V> | Maybe<V[]>) => Generator<V, void>)

/**
 * Traverse a tree of nodes.
 * @param tree - The tree to traverse.
 * @param key - The key to traverse.
 * @param cache - A cache of visited nodes.
 */
export function* walk<T>(
  tree: ITreeNode<T>[],
  key?: Key,
  cache?: NodeCache<ITreeNode<T>>
): Generator<ITreeNode<T>, void> {
  const node = find(tree, key, {cache})
  if (!node) return

  // Walk the tree.
  function *_walk(_node: ITreeNode<T>) {
    while (_node) {
      yield _node as ITreeNode<T>
      _node = find(tree, _node.parent!, {cache})!
    }
  }

  if (Array.isArray(tree)) {
    for (const n of tree) {
      yield* _walk(n)
    }
    return
  }

  yield* _walk(node)
}

/**
 * A function that performs level-order traversal.
 * @param tree - The tree nodes.
 */
export function level<T>(
  tree: Maybe<ITreeNode<T>[]>,
): Generator<ITreeNode<T>, void>

/**
 * A function that performs level-order traversal.
 * @param root - The root node.
 */
export function level<T>(
  root: Maybe<ITreeNode<T>>
): Generator<ITreeNode<T>, void>
/**
 * A function that performs level-order traversal.
 * @param tree - The entry node(s).
 */
export function* level<T>(
  tree: Maybe<ITreeNode<T> | ITreeNode<T>[]>
) {
  if (!tree) return

  function* inner(node: ITreeNode<T>): Generator<ITreeNode<T>, void> {
    const queue: ITreeNode<T>[] = [node]
    while (queue.length > 0) {
      const node = queue.shift()
      if (node) {
        yield node
        queue.push(...node.children as ITreeNode<T>[])
      }
    }
  }

  if (!Array.isArray(tree)) return yield* inner(tree)

  for (const node of tree) {
    yield* inner(node)
  }
}

/**
 * A function that performs pre-order traversal.
 * @param tree - The root node.
 */
export function pre<T>(
  tree: Maybe<ITreeNode<T>[]>
): Generator<ITreeNode<T>, void>

/**
 * A function that performs pre-order traversal.
 * @param root - The root node.
 */
export function pre<T>(
  root: Maybe<ITreeNode<T>>
): Generator<ITreeNode<T>, void>

/**
 * A function that performs pre-order traversal.
 * @param tree - The tree node(s).
 */
export function* pre<T>(
  tree: Maybe<ITreeNode<T>> | ITreeNode<T>[]
) {
  if (!tree) return

  if (!Array.isArray(tree)) return yield* recurse(tree)
  for (const node of tree) {
    yield* recurse(node)
  }
}

/**
 * A function that performs post-order traversal.
 * @param tree - The tree nodes.
 */
export function post<T>(
  tree: Maybe<ITreeNode<T>[]>
): Generator<ITreeNode<T>, void>
/**
 * A function that performs post-order traversal.
 * @param root - The root node.
 */
export function post<T>(
  root: Maybe<ITreeNode<T>>
): Generator<ITreeNode<T>, void>

/**
 * A function that performs post-order traversal.
 * @param tree - The entry node(s).
 */
export function* post<T>(
  tree: Maybe<ITreeNode<T> | ITreeNode<T>[]>
) {
  if (!tree) return

  if (!Array.isArray(tree)) return yield* recurse(tree, 'post')
  for (const node of tree) {
    yield* recurse(node, 'post')
  }
}


export type TraversalOrder = 'level' | 'pre' | 'post'

/**
 * A function that performs a traversal.
 * @param order - The traversal order.
 */
export function traverseFn<T, U = T>(order: TraversalOrder): TraverseFn<T, U> {
  switch (order) {
    case 'level':
      return level as any
    case 'pre':
      return pre as any
    case 'post':
      return post as any
    default:
      return pre as any
  }
}

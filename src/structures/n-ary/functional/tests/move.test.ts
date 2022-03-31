import { Key, TreeNode } from '../../../../types'
import { Data } from '../../types/fixture'
import { build } from '../../utils/build'
import { find } from '../../utils/find'
import { move } from '../move'

describe('move', () => {
  it('should return the original tree if the specified node was not found', () => {
    const data: Data[] = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ]
    const nodes = build<Data>(data)
    const tree = move(nodes)(4, 0, 0)
    expect(nodes).toEqual(tree)
  })

  it("should return the original tree if the specified node's parent was not found", () => {
    const data: Data[] = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ]
    const nodes = build<Data>(data)
    const tree = move(nodes)(2, 4, 0)
    expect(nodes).toBe(tree)
  })

  it('should move a node to a new location in the tree.', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      {
        id: '2',
        children: [
          {
            id: '3',
            children: [],
          },
        ],
      },
      {
        id: '4',
        children: [],
      },
    ]

    const nodes = build(data)
    const tree = move(nodes)('4', '2', 0)
    const tree2 = move(nodes)('3', '2', 0)
    const tree3 = move(nodes)('3', '1', 0)
    expect(find(tree, '4')?.parentKey).toBe('2')
    expect(find(tree2, '3')?.parentKey).toBe('2')
    expect(find(tree3, '3')?.parentKey).toBe('1')
  })

  it('should update the cache when it is provided', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      {
        id: '2',
        children: [
          {
            id: '3',
            children: [],
          },
        ],
      },
      {
        id: '4',
        children: [],
      },
    ]
    const cache = new Map<Key, TreeNode<Data>>()

    const nodes = build(data, null, {
      onCreate: (node) => cache.set(node.key, node),
    })

    move(nodes, cache)('3', '2', 0)
    expect(cache.get('3')?.parentKey).toEqual('2')
  })
})

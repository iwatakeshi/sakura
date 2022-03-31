import { Key, TreeNode } from '../../../../types'
import { Data } from '../../types/fixture'
import { build } from '../../utils/build'
import { remove } from '../remove'
import { find } from "../../utils/find";
import { pre } from "../../utils/traverse";

describe('remove', () => {
  it('should remove a node from the tree.', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]

    const nodes = build(data)
    expect(remove(nodes)('1')).toEqual([
      {
        children: [],
        key: "2",
        value: {
          children: [],
          id: "2"
        }
      },
      {
        children: [],
        key: "3",
        value: {
          children: [],
          id: "3"
        }
      }
    ])
  })

  it('should return the original tree when a node does not exist', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]

    const nodes = build(data)
    expect(remove(nodes)('4')).toEqual([{
      key: '1',
      children: [],
      value: {
        children: [],
        id: '1'
      }
    }, {
      key: '2',
      children: [],
      value: {
        children: [],
        id: '2'
      }
    }, {
      key: '3',
      children: [],
      value: {
        children: [],
        id: '3'
      }
    }])
  })

  it('should remove a node that is deeply nested', () => {
    const data: Data[] = [
      {
        id: '1',
        children: [{ id: '2', children: [{ id: '3', children: [] }] }],
      },
    ]

    const nodes = build(data)
    const tree = remove(nodes)('3')
    const tree2 = remove(nodes)('2')
    expect(find(tree, '3')).toBeFalsy()
    expect(Array.from(pre(tree2)).map(n => n.key)).toEqual(['1'])
  })
  
  it('should remove a node in a tree with multiple roots', () => {
    const data: Data[] = [
      {
        id: '1',
        children: [{ id: '2', children: [{ id: '3', children: [] }] }],
      },
      {
        id: '4',
        children: [{ id: '5', children: [] }],
      },
    ]

    const nodes = build(data)
    const tree = remove(nodes)('3')
    const tree2 = remove(nodes)('2')
    expect(find(tree, '3')).toBeFalsy()
    expect(Array.from(pre(tree2)).map(n => n.key)).toEqual(['1', '4'])
  })

  it('should return the original tree if key does not exist', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]

    const nodes = build(data)
    expect(remove(nodes)('4')).toEqual(nodes)
  })
  
  it('should remove all the nodes provided from the tree', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]

    const nodes = build(data)
    expect(remove(nodes)(...['1', '2', '3'])).toEqual([])
  })

  it('should remove all nodes from the cache when it is provided', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]
    const cache = new Map<Key, TreeNode<Data>>()

    const nodes = build(data, null, {
      onCreate: (node) => cache.set(node.key, node),
    })

    remove(nodes, cache)('1', '2', '3')
    expect(cache.size).toBe(0)
  })
})

import { build } from '../../utils/build'
import { find } from '../../utils/find'
import { createNode } from '../../utils/node'
import { prepend } from '../prepend'
import { Data } from '../../types/fixture'

describe('preprend', () => {
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

  it('should preprend to the root of the tree', () => {
    let nodes = build<Data>(data)
    let tree = prepend(nodes)(null, { id: 4, children: [] })

    expect(nodes).not.toEqual(tree)
    expect(tree).toHaveLength(2)
    expect(tree[0]).toEqual(
      createNode({
        key: 4,
        value: { id: 4, children: [] },
        children: [],
        // index: 0,
        // depth: 0,
        parentKey: null,
      })
    )
  })

  it('should return the identity of the tree when no node is found', () => {
    let nodes = build<Data>(data)
    let tree = prepend(nodes)(4, { id: 4, children: [] })
    expect(nodes).toEqual(tree)
  })

  it('should prepend a node in the tree', () => {
    let nodes = build<Data>(data)
    let tree = prepend(nodes)(2, { id: 4, children: [] })

    expect(nodes).not.toEqual(tree)
    expect(find(tree, 1)?.children).toHaveLength(2)
    expect(find(tree, 1)?.children[0]).toEqual(
      createNode({
        key: 4,
        value: { id: 4, children: [] },
        children: [],
        // index: 0,
        // depth: 2,
        parentKey: 1,
      })
    )
  })
})

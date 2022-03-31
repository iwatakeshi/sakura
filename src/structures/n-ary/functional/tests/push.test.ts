import { Data } from "~/structures/n-ary/fixtures/types";

describe('add', () => {
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
  it('should prepend to the root if the index is zero', () => {
    let nodes = build<Data>(data)
    let tree = add(nodes)(null, 0, { id: 4, children: [] })

    expect(nodes).not.toEqual(tree)
    expect(tree).toHaveLength(2)
    expect(tree[0]).toEqual(
      createNode({
        key: 4,
        value: { id: 4, children: [] },
        children: [],
        parentKey: null,
      })
    )
  })

  it('should push a node before node.id of 2 if the index is greater than zero', () => {
    let nodes = build<Data>(data)
    let tree = add(nodes)(2, 1, { id: 4, children: [] })

    expect(nodes).not.toEqual(tree)
    expect(find(tree, 1)?.children).toHaveLength(2)
    expect(find(tree, 4)).toEqual(
      createNode({
        key: 4,
        value: { id: 4, children: [] },
        children: [],
        // index: 1,
        // depth: 1,
        parentKey: 1,
      })
    )
  })
})

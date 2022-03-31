import { Data } from '../../types/fixture'
import { build } from '../../utils/build'
import { find } from '../../utils/find'
import { update } from '../update'

describe('update', () => {
  it('should update the value of a node', () => {
    const data: Data[] = [
      { id: '1', children: [] },
      { id: '2', children: [] },
      { id: '3', children: [] },
    ]
    const tree = build(data)
    const updatedTree = update(tree)('1', { id: '10', children: [] })
    expect(updatedTree).not.toEqual(tree)
    expect(find(updatedTree, '1')?.value).toEqual({ id: '10', children: [] })
  })

  it('should update a node in a deeply nested tree', () => {
    const data: Data[] = [
      {
        id: '1',
        children: [
          {
            id: '2',
            children: [{ id: '3', children: [] }],
          },
        ],
      },
    ]
    const tree = build(data)
    const updatedTree = update(tree)('2', { id: '10', children: [] })
    console.log(JSON.stringify(updatedTree, null, 2))

    expect(updatedTree).not.toEqual(tree)
    expect(find(updatedTree, '2')?.value).toEqual({ id: '10', children: [] })
  })
})

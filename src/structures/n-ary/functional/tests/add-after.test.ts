import { find } from '../../utils/find'
import { addAfter } from '../add-after'
import { Data } from "~/structures/n-ary/fixtures/types";
import { fromNode } from "~/structures/n-ary/utils/node";
import { ITreeNode } from "~/structures/n-ary/node";
import { deep, semideep, shallow } from "~/structures/n-ary/fixtures/data";
import { clone } from "rambdax";

describe('addAfter', () => {
  
  it('should push a node at the root of an empty tree', () => {
    const nodes: ITreeNode<Data>[] = []
    const tree = addAfter(nodes)(null,  { id: '1', children: [] })

    expect(tree).not.toEqual(nodes)
    expect(tree).toHaveLength(1)
    expect(find(tree, '1')).toEqual(
      fromNode<Data>({
        key: '1',
        value: { id: '1', children: [] },
        children: [],
        parent: null,
      })
    )
  })

  it('should return an identity of the tree when no node is found', () => {
    const copy = clone(shallow)
    const tree = addAfter(shallow)('4', { id: '4', children: [] })
    
    expect(tree).toEqual(shallow)
    expect(copy).toEqual(shallow)
  })

  describe('shallow', () => {
    it('should push a node after the node with a given key', () => {
      const copy = clone(shallow)
      const tree = addAfter(shallow)('2',{ id: '4', children: [] })
      
      expect(copy).not.toEqual(tree)
      expect(tree).toHaveLength(4)
      expect(find(tree, '4')).toEqual(
        fromNode<Data>({
          key: '4',
          children: [],
          value: { id: '4', children: [] },
        }, null)
      )
    })
    
    
  })
  
  describe('semi-deep', () => {
    it('should push a node after the node with a given key', () => {
      const copy = clone(semideep)
      const tree = addAfter(semideep)('3',{ id: '4', children: [] })
      const parent = find(tree, '2')
      
      expect(copy).not.toEqual(tree)
      expect(parent?.children).toHaveLength(2)
      expect(find(tree, '4')).toEqual(
        fromNode<Data>({
          key: '4',
          children: [],
          value: { id: '4', children: [] },
        }, '2')
      )
      
      expect(parent?.children
        ?.findIndex(n => n.key === '4'))
        .toBeGreaterThan(
          parent?.children
            ?.findIndex(n => n.key === '3')!
        )
      
      
    })
  })
  
  describe('deep', () => {
    it('should push a node after the node with a given key', () => {
      const copy = clone(deep)
      const tree = addAfter(deep)('2',{ id: '8', children: [] })
      const parent = find(tree, '1')
      
      expect(copy).not.toEqual(tree)
      expect(parent?.children).toHaveLength(4)
      expect(find(tree, '8')).toEqual(
        fromNode<Data>({
          key: '8',
          children: [],
          value: { id: '8', children: [] },
        }, '1'))
      expect(parent?.children
        ?.findIndex(n => n.key === '8'))
        .toBeGreaterThan(
          parent?.children
            ?.findIndex(n => n.key === '2')!
        )
    })
  })
  
})

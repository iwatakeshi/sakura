import { addBefore } from "~/structures/n-ary/functional/add-before";
import { ITreeNode } from "~/structures/n-ary/node";
import { find } from "~/structures/n-ary/utils/find";
import { fromNode } from "~/structures/n-ary/utils/node";
import { Data } from "~/structures/n-ary/fixtures/types";
import { clone } from "rambdax";
import { deep, semideep, shallow } from "~/structures/n-ary/fixtures/data";

describe('addBefore', () => {
  it('should push a node at the root of an empty tree', () => {
    const nodes: ITreeNode[] = [];
    const tree = addBefore(nodes)(null, { id: '1', children: []})
    
    expect(tree).not.toEqual(nodes)
    expect(tree).toHaveLength(1)
    expect(find(tree, '1')).toEqual(fromNode<Data>({
      key: '1',
      value: { id: '1', children: [] },
      children: [],
      parent: null,
    }))
  })
  
  it('should return an identity of the tree when no node is found', () => {
    const copy = clone(shallow);
    const tree = addBefore(shallow)('4', { id: '4', children: []})
    
    expect(tree).toEqual(shallow)
    expect(tree).toEqual(copy)
  })
  
  describe('shallow', () => {
    it('should push a node before the node with a given key', () => {
      const copy = clone(shallow);
      const tree = addBefore(shallow)('2', { id: '4', children: []})
      
      expect(copy).not.toEqual(tree)
      expect(tree).toHaveLength(4)
      expect(find(tree, '4')).toEqual(fromNode<Data>({
        key: '4',
        value: { id: '4', children: [] },
        children: [],
        parent: null,
      }))
      expect(tree.findIndex(node => node.key === '4'))
        .toBeLessThan(tree.findIndex(node => node.key === '2'))
    })
  })
  
  describe('semi-deep', () => {
    it('should push a node before the node with a given key', () => {
      const copy = clone(semideep)
      const tree = addBefore(semideep)('3',{ id: '4', children: [] })
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
        .toBeLessThan(
          parent?.children
            ?.findIndex(n => n.key === '3')!
        )
    })
  })
  
  describe('deep', () => {
    it('should push a node before the node with a given key', () => {
      const copy = clone(deep);
      const tree = addBefore(deep)('2', { id: '8', children: []})
      const parent = find(tree, '1');
      
      expect(copy).not.toEqual(tree)
      expect(parent?.children).toHaveLength(4)
      expect(find(tree, '8')).toEqual(
        fromNode<Data>({
        key: '8',
        value: { id: '8', children: [] },
        children: [],
      }, '1'))
      
      expect(parent
        ?.children
        ?.findIndex(node => node.key === '8'))
        .toBeLessThan(parent
          ?.children
          ?.findIndex(node => node.key === '2')!
        )
    })
  })
  
})

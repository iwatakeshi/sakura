import { build } from '../../utils/build'
import { find } from '../../utils/find'
import { updateTree } from '../update-tree'
import { Data } from '../../types/fixture'
import { Key, TreeNode } from '../../../../types'
import { shallow, semideep, deep } from "../../fixtures/data";
import { pre } from "../../utils/traverse";
import { createNodeFromValue } from "../../utils/node";
import { tap } from "../../utils/tap";

describe('updateTree', () => {
  
  // Check for immutability
  it('should return the original tree if the node is not found', () => {
    const nodes = build(shallow)
    let tree = updateTree(nodes)('d', (n) => n)
    expect(nodes).toEqual(tree)

    tree = updateTree(nodes)('d', () => null)
    expect(nodes).toEqual(tree)
  })
  
  describe('input', () => {
    describe('shallow', () => {
      it('should update the node using a list as an input', () => {
        const nodes = build(shallow)
        const key = '1'
        const tree = updateTree(nodes)(key, (n) => ({ ...n, value:  {
           key: key,
           value: {
             id: 'a',
             value: '100',
             children: [],
           },
            children: [],
          } }))
        expect(find(tree, key)).toContain(
          createNodeFromValue<Data>({
          id: 'a',
          value: '100',
          children: [],
        }))
      })
    })
  })
  
  describe('cache', () => {
    const data: Data[] = [{
      id: 'a',
      children: []
    }]
    const cache = new Map<Key, TreeNode<Data>>()
    const tree = build(data, null, {
      onCreate: tap(node => cache?.set(node.key, node))
    })
    it('should update a node in the cache', () => {
      const updated = updateTree(tree, cache)('a', (n) => ({
        ...n,
        value: {
          id: 'a',
          value: 'x',
          children: []
        }
      }))
      
      expect(cache.get('a')).toEqual(find(updated, 'a'))
    })
    
    it('should remove a node from the cache', () => {
     updateTree(tree, cache)('a', () => null)
      expect(cache.has('a')).toBe(false)
    })
  })
  
  describe('shallow', () => {

    it('should perform an update', () => {
      const tree = updateTree<Data>(shallow)('1', n => ({
        ...n,
        value: {
          id: '1',
          value: 'hello',
          children: []
        }
      }))
      
      const tree2 = updateTree<Data>(shallow)('2', n => ({
        ...n,
        value: {
          id: '2',
          value: 'hello',
          children: []
        }
      }))
      
      
      expect(find(tree, '1')?.value).toEqual({
        id: '1',
        value: 'hello',
        children: []
      })
      
      expect(find(tree2, '2')?.value).toEqual({
        id: '2',
        value: 'hello',
        children: []
      })
    })
    
    it('should perform a removal', () => {
      const tree = updateTree<Data>(shallow)('1', () => null)
      const tree2 = updateTree<Data>(shallow)('2', () => null)
      expect(find(tree, '1')).toBe(null)
      expect(find(tree2, '2')).toBe(null)
      expect(Array.from(pre(tree)).map(n => n.key.toString())).toEqual(['2', '3'])
      expect(Array.from(pre(tree2)).map(n => n.key.toString())).toEqual(['1', '3'])
    })
  })
  
  describe('semi-deep', () => {

    it('should perform an update', () => {
      const tree = updateTree<Data>(semideep)('1', n => ({
        ...n,
        value: {
          id: '1',
          value: 'hello',
          children: []
        }
      }))
      
      const tree2 = updateTree<Data>(semideep)('2', n => ({
        ...n,
        value: {
          id: '2',
          value: 'hello',
          children: []
        }
      }))
      
      const tree3 = updateTree<Data>(semideep)('3', n => ({
        ...n,
        value: {
          id: '3',
          value: 'hello',
          children: []
        }
      }))
      
      expect(find(tree, '1')?.value).toEqual({
        id: '1',
        value: 'hello',
        children: []
      })
      
      expect(find(tree2, '2')?.value).toEqual({
        id: '2',
        value: 'hello',
        children: []
      })
      
      expect(find(tree3, '3')?.value).toEqual({
        id: '3',
        value: 'hello',
        children: []
      })
    })
    
    it('should perform a removal', () => {
      const tree = updateTree<Data>(semideep)('1', () => null)
      const tree2 = updateTree<Data>(semideep)('2', () => null)
      const tree3 = updateTree<Data>(semideep)('3', () => null)
      expect(find(tree, '1')).toBe(null)
      expect(find(tree2, '2')).toBe(null)
      expect(find(tree3, '3')).toBe(null)
      expect(Array.from(pre(tree)).map(n => n.key.toString())).toEqual([])
      expect(Array.from(pre(tree2)).map(n => n.key.toString())).toEqual(['1'])
      expect(Array.from(pre(tree3)).map(n => n.key.toString())).toEqual(['1', '2'])
    })
  })
  
  describe('deep', () => {
    it('should perform a update', () => {
      const tree = updateTree<Data>(deep)('a', n => ({
        ...n,
        value: {
          id: 'a',
          value: 'hello',
          children: []
        }
      }))
      
      const tree2 = updateTree<Data>(deep)('b', n => ({
        ...n,
        value: {
          id: 'd',
          value: 'hello',
          children: []
        }
      }))
      
      const tree3 = updateTree<Data>(deep)('d', n => ({
        ...n,
        value: {
          id: 'd',
          value: 'hello',
          children: []
        }
      }))
      
      const tree4 = updateTree<Data>(deep)('f', n => ({
        ...n,
        value: {
          id: 'f',
          value: 'hello',
          children: []
        }
      }))
      
      expect(find(tree, 'a')?.value).toEqual({
        id: 'a',
        value: 'hello',
        children: []
      })
      
      expect(find(tree2, 'b')?.value).toEqual({
        id: 'd',
        value: 'hello',
        children: []
      })
      
      expect(find(tree3, 'd')?.value).toEqual({
        id: 'd',
        value: 'hello',
        children: []
      })
      
      expect(find(tree4, 'f')?.value).toEqual({
        id: 'f',
        value: 'hello',
        children: []
      })
    })
    // Test for deep removal

    it('should perform a removal', function () {
      const tree = updateTree<Data>(deep)('a', () => null)
      const tree2 = updateTree<Data>(deep)('b', () => null)
      const tree3 = updateTree<Data>(deep)('d', () => null)
      const tree4 = updateTree<Data>(deep)('f', () => null)
      expect(find(tree, 'a')).toBe(null)
      expect(find(tree2, 'b')).toBe(null)
      expect(find(tree3, 'd')).toBe(null)
      expect(find(tree4, 'f')).toBe(null)
      expect(Array.from(pre(tree)).map(n => n.key.toString())).toEqual([])
      expect(Array.from(pre(tree2)).map(n => n.key.toString())).toEqual(['a', 'f', 'g'])
      expect(Array.from(pre(tree3)).map(n => n.key.toString())).toEqual(['a', 'b', 'c', 'f', 'g'])
      expect(Array.from(pre(tree4)).map(n => n.key.toString())).toEqual(['a', 'b', 'c', 'd', 'e', 'g'])
    });
  })
})

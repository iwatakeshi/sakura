import { Key } from "~/shared/types/key";
import { deep, semideep, shallow } from "~/structures/n-ary/fixtures/data";
import { level, post, pre, walk } from "~/structures/n-ary/utils/traverse";
import { ITreeNode } from "~/structures/n-ary/node";
import { clone } from "rambdax/immutable";

describe('traverse', () => {

  describe('walk', () => {
    it('should not mutate the tree', () => {
      const copy = clone(shallow)
      walk(shallow, 3)
      expect(shallow).toEqual(copy)
    })
    
    it('should walk up a shallow tree', () => {
      const tree = Array
        .from(walk(shallow, '3'))
        .map(({ key }) => Number(key))
      
      expect(tree).toEqual([3])
    })
    
    it('should walk up a semi-deep tree', () => {
      const tree = Array
        .from(walk(semideep, '3'))
        .map(({ key }) => Number(key))
      
      expect(tree).toEqual([3, 2, 1])
    })
    
    it('should walk up a deep tree', () => {
      const tree = Array
        .from(walk(deep, '5'))
        .map(({ key }) => Number(key))
      
      
      expect(tree).toEqual([5, 4, 2, 1])
    })
  })

  describe('level', () => {
    
    it('should not mutate the original tree', () => {
      const copy = clone(shallow)
      level(shallow)
      expect(shallow).toEqual(copy)
    })
    
    it('should not traverse when the root node is falsy', () => {
      const tree = Array.from(level(null))
        .map(n => Number(n.key))
      expect(tree).toEqual([])
    })

    it('should traverse a shallow tree in level order', () => {
      const tree = Array.from(level(shallow))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3])
    })
    
    it('should traverse a semi-deep tree in level order', () => {
      const tree = Array.from(level(semideep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3,])
    })
    
    it('should traverse a deep tree in level order', () => {
      const tree = Array.from(level(deep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 6, 7, 3, 4, 5])
    })
  })

  describe('pre', () => {
    it('should not mutate the original tree', () => {
      const copy = clone(shallow)
      pre(shallow)
      expect(shallow).toEqual(copy)
    })
    
    it('should not traverse when the root node is falsy', () => {
      const tree = Array.from(pre(null))
        .map(n => Number(n.key))
      expect(tree).toEqual([])
    })

    it('should traverse a shallow tree in pre order', () => {
      const tree = Array.from(pre(shallow))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3])
    })
    
    it('should traverse a semi-deep tree in pre order', () => {
      const tree = Array.from(pre(semideep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3])
    })
    
    it('should traverse a deep tree in pre order', () => {
      const tree = Array.from(pre(deep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('post', () => {
    it('should not mutate the original tree', () => {
      const copy = clone(shallow)
      post(shallow)
      expect(shallow).toEqual(copy)
    })
    
    it('should not traverse when the root node is falsy', () => {
      const tree = Array.from(post(null))
        .map(n => Number(n.key))
      expect(tree).toEqual([])
    })

    it('should traverse a shallow tree in post order', () => {
      const tree = Array.from(post(shallow))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([1, 2, 3])
    })
    
    it('should traverse a semi-deep tree in post order', () => {
      const tree = Array.from(post(semideep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([3, 2, 1])
    })
    
    it('should traverse a deep tree in post order', () => {
      const tree = Array.from(post(deep))
             .map(({ key }) => Number(key))
      expect(tree).toEqual([3, 5, 4, 2, 6, 7, 1])
    })
  })
})

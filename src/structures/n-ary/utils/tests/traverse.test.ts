import { walk } from "~/structures/n-ary/utils/traverse";
import { deep, semideep, shallow } from "~/structures/n-ary/fixtures/data";

describe('traverse', () => {
  describe('walk', () => {
    describe('shallow', () => {
      it('should traverse a tree', () => {
        const result = Array
          .from(walk(shallow, '3'))
          .map(node => node.key);
        expect(result).toStrictEqual(['1', '2', '3']);
      })
    })
    
    describe('semi-deep', () => {
      it('should traverse a tree', () => {
        const result = Array
          .from(walk(semideep, '3'))
          .map(node => node.key);
        expect(result).toStrictEqual(['1', '2', '3']);
      })
    })
    
    describe('deep', () => {
      it('should traverse a tree', () => {
        const result = Array
          .from(walk(deep, '3'))
          .map(node => node.key);
        expect(result).toStrictEqual(['1', '2', '3']);
      })
    })
    
  })
})
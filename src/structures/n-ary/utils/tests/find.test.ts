import { semideep, shallow } from "~/structures/n-ary/fixtures/data";
import { find } from "~/structures/n-ary/utils/find";
describe('find', () => {
  it('should find a node by its key in the root of the tree.', () => {
    expect(find(shallow, '1')).toBeTruthy()
  })

  it('should find a node that is deeply nested', () => {
    expect(find(semideep, '3', 'pre')).toBeTruthy()
    expect(find(semideep, '3', 'level')).toBeTruthy()
    expect(find(semideep, '3', 'post')).toBeTruthy()
  })

  it('should return `null` if the node is not found', () => {
    expect(find(shallow, '4')).toBeFalsy()
  })
})

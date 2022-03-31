// import { build } from '../build'
//
// type Data = {
//   id: string
//   children: Data[]
// }
//
// describe('build', () => {
//   it('should build a tree', () => {
//     const data: Data[] = [
//       { id: '1', children: [] },
//       { id: '2', children: [] },
//       { id: '3', children: [] },
//     ]
//
//     const nodes = build(data)
//     expect(nodes).toBeTruthy()
//     expect(nodes.length).toBe(3)
//     expect(nodes[0].key).toBe('1')
//     expect(nodes[0].children).toBeTruthy()
//     expect(nodes[0].children.length).toBe(0)
//     expect(nodes[1].key).toBe('2')
//     expect(nodes[1].children).toBeTruthy()
//     expect(nodes[1].children.length).toBe(0)
//     expect(nodes[2].key).toBe('3')
//     expect(nodes[2].children).toBeTruthy()
//     expect(nodes[2].children.length).toBe(0)
//   })
// })

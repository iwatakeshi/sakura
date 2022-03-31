// import { Sakura } from '../sakura'
// import { Data } from '../types/fixture'
//
// describe('Sakura', () => {
//   describe('#constructor()', () => {
//     it('should create a tree', () => {
//       const data: Data[] = [
//         {
//           id: 'child1',
//           children: [],
//         },
//         {
//           id: 'child2',
//           children: [],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree).toBeTruthy()
//       expect(tree.nodes.length).toBe(2)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child2')
//     })
//
//     it('should create a tree with a data that provides a root', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree).toBeTruthy()
//       expect(tree.nodes.length).toBe(2)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child2')
//     })
//   })
//
//   describe('#find', () => {
//     it('should find a node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree.find('root')).toBeTruthy()
//       expect(tree.find('root')?.key).toBe('root')
//       expect(tree.find('child1')).toBeTruthy()
//       expect(tree.find('child1')?.key).toBe('child1')
//       expect(tree.find('child2')).toBeTruthy()
//       expect(tree.find('child2')?.key).toBe('child2')
//     })
//
//     it('should return undefined if the node is not found', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree.find('child3')).toBeFalsy()
//     })
//   })
//
//   describe('#push', () => {
//     it('should prepend a node to the root when index equals zero', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.push('root', 0, node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child3')
//       expect(tree.nodes[1].key).toBe('child1')
//       expect(tree.nodes[2].key).toBe('child2')
//     })
//
//     it('should append a node to the root when index is less than zero', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.push('root', -1, node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child2')
//       expect(tree.nodes[2].key).toBe('child3')
//     })
//
//     it('should push a node before the specified index', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.push('root', 1, node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child3')
//       expect(tree.nodes[2].key).toBe('child2')
//     })
//   })
//
//   describe('#remove', () => {
//     it('should remove a node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       tree.remove('child1')
//       expect(tree.nodes.length).toBe(1)
//       expect(tree.nodes[0].key).toBe('child2')
//     })
//   })
//
//   describe('#move', () => {
//     it('should move a node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       tree.move('child1', 'root', 1)
//       expect(tree.nodes.length).toBe(2)
//       expect(tree.nodes[0].key).toBe('child2')
//       expect(tree.nodes[1].key).toBe('child1')
//     })
//   })
//
//   describe('#addBefore', () => {
//     it('should push a node before the specified node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.addBefore('root', 1, node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child3')
//       expect(tree.nodes[2].key).toBe('child2')
//     })
//   })
//
//   describe('#addAfter', () => {
//     it('should push a node after the specified node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.addAfter('root', 0, node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child3')
//       expect(tree.nodes[2].key).toBe('child2')
//     })
//   })
//
//   describe('#append', () => {
//     it('should append a node to the root', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.append('root', node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child2')
//       expect(tree.nodes[2].key).toBe('child3')
//     })
//   })
//
//   describe('#prepend', () => {
//     it('should prepend a node to the root', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.prepend('root', node)
//       expect(tree.nodes.length).toBe(3)
//       expect(tree.nodes[0].key).toBe('child3')
//       expect(tree.nodes[1].key).toBe('child1')
//       expect(tree.nodes[2].key).toBe('child2')
//     })
//   })
//
//   describe('#update', () => {
//     it('should update a node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       const node = {
//         id: 'child3',
//         children: [],
//       }
//       tree.update('child1', node)
//       expect(tree.nodes.length).toBe(2)
//       expect(tree.nodes[0].key).toBe('child1')
//       expect(tree.nodes[1].key).toBe('child2')
//       expect(tree.nodes[0].value!.id).toBe('child3')
//     })
//   })
//
//   describe('#has', () => {
//     it('should return true if the tree has the specified node', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree.has('child1')).toBe(true)
//       expect(tree.has('child2')).toBe(true)
//       expect(tree.has('child3')).toBe(false)
//     })
//   })
//
//   describe('.depth', () => {
//     it('should return the depth of the tree', () => {
//       const data: Data[] = [
//         {
//           id: 'root',
//           children: [
//             {
//               id: 'child1',
//               children: [],
//             },
//             {
//               id: 'child2',
//               children: [],
//             },
//           ],
//         },
//       ]
//       const tree = new Sakura(data)
//       expect(tree.depth).toBe(2)
//     })
//   })
// })

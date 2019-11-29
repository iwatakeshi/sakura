import { Node, NodeSchema } from '../main'

describe('node', () => {
  describe('init', () => {
    const a = new Node('a', '1', true)
    const b = new Node('b', '2', false)
    const x = new Node('x', '10')
    test('create a root node', () => {
      expect.assertions(3)
      expect(a.id).toBe('1')
      expect(a.name).toBe('a')
      expect(a.isRoot).toBe(true)
    })

    test('create a leaf node', () => {
      expect.assertions(6)
      expect(b.id).toBe('2')
      expect(b.name).toBe('b')
      expect(b.isRoot).toBe(false)

      expect(x.id).toBe('10')
      expect(x.name).toBe('x')
      expect(x.isRoot).toBe(false)
    })
  })

  describe('methods', () => {
    let a = new Node('a', '1', true)
    let b = new Node('b', '2', false)
    let c = new Node('c', '3', false)
    let d = new Node('d', '4', false)
    beforeEach(() => {
      a = new Node('a', '1', true)
      b = new Node('b', '2', false)
      c = new Node('c', '3', false)
      d = new Node('d', '4', false)
    })

    test('push', () => {
      expect.assertions(2)
      a.push(b)
      expect(a.children).toHaveLength(1)
      expect(a.children).toContain(b)
    })

    test('pop', () => {
      expect.assertions(3)
      a.push(b)
      expect(a.pop()).toEqual(b)
      expect(a.children).toHaveLength(0)
      expect(a.children).not.toContain(b)
    })

    test('unshift', () => {
      expect.assertions(4)
      a.push(b)
      expect(a.unshift(c)).toBe(2)
      expect(a.children).toHaveLength(2)
      expect(a.children).toContain(c)
      expect(a.children[0]).toEqual(c)
    })

    test('shift', () => {
      expect.assertions(3)
      a.push(b)
      expect(a.shift()).toEqual(b)
      expect(a.children).toHaveLength(0)
      expect(a.children).not.toContain(b)
    })

    test('remove', () => {
      expect.assertions(3)
      a.push(b)
      expect(a.remove(b)).toHaveLength(0)
      expect(a.children).not.toContain(b)
      expect(a.remove(b)).toHaveLength(0)
    })

    test('removeAt', () => {
      expect.assertions(3)
      a.push(b)
      expect(a.removeAt(0)).toHaveLength(0)
      expect(a.children).not.toContain(b)
      expect(a.removeAt(0)).toHaveLength(0)
    })

    test('map', () => {
      expect.assertions(3)
      a.push(b)
      b.push(c)

      const makeSchema = (node: Node) => ({
        id: node.id,
        name: node.name,
        index: node.index,
        depth: node.depth,
        isRoot: node.isRoot,
        isParent: node.isParent,
        children: node.map(makeSchema as any),
      }) as NodeSchema

      expect(a.map<NodeSchema>((node, index, nodes) => {
        expect(nodes).toHaveLength(1)
        expect(typeof index).toBe('number')
        return makeSchema(node!)
      })).toEqual([{
        id: '2',
        name: 'b',
        index: 0,
        depth: 1,
        isRoot: false,
        isParent: true,
        children: [{
          id: '3',
          name: 'c',
          index: 0,
          depth: 2,
          isRoot: false,
          isParent: false,
          children: []
        }]
      }])
    })

    test('filter', () => {
      expect.assertions(6)
      a.push(b)
      a.push(c)
      const result = a.filter((node, index, nodes) => {
        expect(nodes).toHaveLength(2)
        expect(typeof index).toBe('number')
        return node!.id === '2'
      })
      expect(result).toHaveLength(1)
      expect(result).toContain(b)
    })

    test('find', () => {
      expect.assertions(4)
      a.push(b)
      a.push(c)
      const result = a.find((node, index, nodes) => {
        expect(nodes).toHaveLength(2)
        expect(typeof index).toBe('number')
        return node!.id === '2'
      })
      expect(result).toEqual(b)
      expect(a.find(node => node!.id === '4')).toBeUndefined()
    })

    test('findIndex', () => {
      expect.assertions(6)
      a.push(b)
      a.push(c)
      expect(a.findIndex((node, index, nodes) => {
        expect(nodes).toHaveLength(2)
        expect(typeof index).toBe('number')
        return node!.id === '3'
      })).toBe(1)
      expect(a.findIndex(node => node!.id === '4')).toBe(-1)
    })

    test('indexOf', () => {
      expect.assertions(3)
      a.push(b)
      a.push(c)
      expect(a.indexOf(b)).toBe(0)
      expect(a.indexOf(c)).toBe(1)
      expect(a.indexOf(d)).toBe(-1)
    })

    test('includes', () => {
      expect.assertions(3)
      a.push(b)
      a.push(c)
      expect(a.includes(b)).toBe(true)
      expect(a.includes(c)).toBe(true)
      expect(a.includes(d)).toBe(false)
    })

    test('serialize', () => {
      expect.assertions(1)
      a.push(b)
      expect(a.serialize()).toEqual({
        id: '1',
        name: 'a',
        isRoot: true,
        isParent: true,
        index: 0,
        depth: 0,
        children: [{
          index: 0,
          depth: 1,
          id: '2',
          name: 'b',
          isRoot: false,
          isParent: false,
          children: [] as any
        }]
      } as NodeSchema)
    })

    test('deserialize', () => {
      expect.assertions(1)
      a.push(b)
      const schema = {
        id: '1',
        name: 'a',
        isRoot: true,
        isParent: true,
        index: 0,
        depth: 0,
        children: [{
          index: 0,
          depth: 1,
          id: '2',
          name: 'b',
          isRoot: false,
          isParent: false,
          children: [] as any
        }]
      } as NodeSchema
      expect(a.deserialize(schema)).toEqual(a)
    })

    test('search', () => {
      const e = new Node('e', '5', false)
      expect.assertions(5)
      a.push(b)
      b.push(c)
      c.push(d)
      expect(a.search('2')).toEqual(b)
      expect(b.search('3')).toEqual(c)
      expect(c.search('4')).toEqual(d)

      b.push(e)
      expect(a.search('5')).toEqual(e)

      expect(a.search('6')).toBeNull()
    })
  })
})

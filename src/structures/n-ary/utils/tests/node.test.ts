import { createNode, fromList } from "../node";


describe('node', () => {
  describe('createNode', () => {
    it('should create a node using simple data types as values', () => {
      const node = createNode(1);
      const node2 = createNode('1')
      const node3 = createNode([1])
      const node4 = createNode({})

      expect(node.value).toBe(1);
      expect(node.children).toHaveLength(0);
      
      expect(node2.value).toBe('1');
      expect(node2.children).toHaveLength(0);
      
      expect(node3.value).toStrictEqual([1]);
      expect(node3.children).toHaveLength(0);
      
      expect(node4.value).toStrictEqual({});
      expect(node4.children).toHaveLength(0);
    })
    
    it('should specify the key and value getters', () => {
      const node = createNode({ myKey: 1, myValue: 2, myChildren: [{
        myKey: 3,
        myValue: 4,
          myChildren: [],
        }]}, null, {
        getKey: (n: any) => n.myKey,
        getValue: (n: any) => n.myValue,
        getChildren: (n: any) => n.myChildren
      })
      
      expect(node.key).toBe(1);
      expect(node.value).toBe(2);
      expect(node.children).toHaveLength(1);
      expect(node.children[0].key).toBe(3);
    })
    
    it('should create a node with children', () => {
      const node = createNode({ id: 1, name: 'test', children: [{ id: 2, name: 'test2', children: [] }] })
      const node2 = createNode({ id: 1, name: 'test', children: [1, 2, 3] })
      expect(node.value).toEqual({ id: 1, name: 'test', children: [{ id: 2, name: 'test2', children: [] }] });
      expect(node.children).toHaveLength(1);

      expect(node2.value).toEqual({ id: 1, name: 'test', children: [1, 2, 3] });
      expect(node2.children).toHaveLength(3);
      expect(node2.children[0].value).toBe(1);
    })
  });
  
  describe('fromList', ()=> {
    it('should create a tree from a list', () => {
      const list = [
        { id: 1, name: 'test', children: [{ id: 2, name: 'test2', children: [] }] },
        { id: 3, name: 'test3', children: [] },
        { id: 4, name: 'test4', children: [] },
      ]
      const node = fromList(list, null, {
        getKey: (n: any) => n.id,
        getValue: (n: any) => n,
        getChildren: (n: any) => n.children
      })
      
      expect(node[0].value).toEqual({ id: 1, name: 'test', children: [{ id: 2, name: 'test2', children: [] }] });
      expect(node[0].children).toHaveLength(1);
      expect(node[1].value).toEqual({ id: 3, name: 'test3', children: [] });
      expect(node[2].value).toEqual({ id: 4, name: 'test4', children: [] });
    })
  })
})
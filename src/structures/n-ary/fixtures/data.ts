import { Data } from "~/structures/n-ary/fixtures/types";

import { fromList } from "~/structures/n-ary/utils/node";


export const shallow = fromList<Data>([
  { id: '1', children: [] },
  { id: '2', children: [] },
  { id: '3', children: [] },
])

export const semideep = fromList<Data>([
  {
    id: '1',
    children: [
      {
        id: '2',
        children: [
          {
            id: '3',
            children: [],
          },
        ],
      },
    ],
  },
])

export const deep = fromList<Data>([
  {
    id: '1',
    value: '1',
    children: [
      {
        id: '2',
        value: '2',
        children: [
          {
            id: '3',
            value: '3',
            children: [],
          },
          {
            id: '4',
            value: '4',
            children: [
              {
                id: '5',
                value: '5',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '6',
        value: '6',
        children: [],
      },
      {
        id: '7',
        value: '7',
        children: [],
      },
    ],
  },
])

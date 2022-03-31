import { INode } from "~/shared/types/node";
import { ITreeNode } from "~/structures/n-ary/node";
import { NodeCache } from "~/shared/types/cache";
import { Nullable } from "~/shared/types/ts";
import { DataIndexerOptions } from "~/shared/types/data";

export type TreeFn<Type = unknown> =
  (root: ITreeNode<Type>[], cache?: Nullable<NodeCache<ITreeNode<Type>>>) => typeof root;

export type TreeFn2<Type = unknown, Return = unknown> =
  (root: ITreeNode<Type>[], cache?: Nullable<NodeCache<ITreeNode<Type>>>, options?: DataIndexerOptions<Type>) => Return;

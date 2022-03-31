import { INode } from "~/shared/types/node";
import { Key } from "~/shared/types/key";
import { Nullable } from "~/shared/types/ts";

/**
 * A node in a N-ary tree.
 */
export interface ITreeNode<T = any> extends INode<T> {
  parent?:  Nullable<Key>
  children: ITreeNode<T>[]
}
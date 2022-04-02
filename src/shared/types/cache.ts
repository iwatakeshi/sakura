import { Key } from './key';
import { INode } from "./node";

/**
 * A type representing a cache.
 */
export type NodeCache<T extends INode> = Map<Key, T>
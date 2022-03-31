import { Key } from './key';
import { INode } from "~/shared/types/node";

/**
 * A type representing a cache.
 */
export type NodeCache<T extends INode> = Map<Key, T>
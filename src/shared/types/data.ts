import { Key } from "~/shared/types/key";

/**
 * A type that describes a function that returns the key of a given value.
 */
export type KeyIndexerFunction<T> = (item: T) => Key;

/**
 * A type that describes a function that return the value of a given value.
 */
export type ValueIndexerFunction<T, U> = (item: T) => U;

/**
 * A type that describes a function that returns a list of values.
 */
export type ChildIndexerFunction<T, U> = (item: T) => U[];

/**
 * The data indexer interface.
 */
export type DataIndexerOptions<T, U = T> = {
  /**
   * A function that returns the key of the item.
   */
  getKey: KeyIndexerFunction<T>;
  /**
   * A function that returns the value of the item.
   */
  getValue?: ValueIndexerFunction<T, U>;
  /**
   * A function that returns the children of the item.
   *
   * The default function will look for a property named `children` or `items`.
   * Otherwise, it will return an empty array.
   */
  getChildren: ChildIndexerFunction<T, U>;
}

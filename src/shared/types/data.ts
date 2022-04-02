import { Key } from "./key";

export interface DataIndexerOptions<T, V> {
  getKey?: (value: T) => Key;
  getValue?: (value: T) => V;
  getChildren?: (value: T) => T[];
}


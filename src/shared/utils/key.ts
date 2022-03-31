import { Key } from "~/shared/types/key";

export function isKey(key: any): key is Key {
  return typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol';
}
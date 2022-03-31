import { Key } from "~/shared/types/key";

export const isCache = <T>(map: any): map is Map<Key, T> =>{
  return map instanceof Map
}
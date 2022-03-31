import { Key } from "~/shared/types/key";

export type Data<T = any> = {
  id: Key
  value?: T
  children: Data[]
}

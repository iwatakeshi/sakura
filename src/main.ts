import { deep, shallow } from "~/structures/n-ary/fixtures/data";

export {}

const print: typeof console.log = (...args: any[]) => console.log(...args)
const println: typeof console.log = (...args: any[]) => print(...args, '\n')
const printJSON = (...args: any[]) =>
  args?.forEach((arg) => print(JSON.stringify(arg, null, 2), '\n'))


printJSON(deep)
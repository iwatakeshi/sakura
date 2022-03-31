// /**
//  * Benchmarks a function.
//  * @param cb - The callback function.
//  * @returns - A tuple of the time it took to execute the function and the result.
//  */
// export function bench<T = void>(cb: () => T): [number, T, [number, number]] {
//   let result: T
//   const start = performance.now()
//   result = cb()
//   const end = performance.now()
//   return [Number((end - start).toFixed(5)), result, [start, end]]
// }

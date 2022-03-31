/**
 * Inserts the supplied element into the array at the specified `index`.
 * @param array The array to access.
 * @param index The index at which to insert the element.
 * @param element The element to insert.
 */
export function insert<T, V = T>(array: T[], index: number, ...element: T[] | V[]): V[] {
  index = Math.max(0, Math.min(index, array.length));
  return [...array.slice(0, index), ...element, ...array.slice(index)] as unknown as V[];
}
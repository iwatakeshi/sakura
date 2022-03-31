import { INode } from "~/shared/types/node";

/**
 * Determines if the given value is a node.
 * @param value - The value to check.
 */
export function isNode<T extends INode = INode>(value: any): value is T {
 if ('key' in value && 'value' in value && 'children' in value) {
  return true;
 }
 
 return 'key' in value && 'children' in value;
}
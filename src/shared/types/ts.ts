/**
 * A type that can be the of type `T` or `null` or `undefined`.
 */
export type Maybe<T> = T | Nullable<T> | Undefinable<T>
/**
 * A type that can be the of type `T` or `null`.
 */
export type Nullable<T> = T | null;

/**
 * A type that can be the of type `T` or `undefined`.
 */
export type Undefinable<T> = T | undefined;
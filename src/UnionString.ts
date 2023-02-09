/**
 * UnionString type.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type UnionString<T extends string> = T | (string & {})

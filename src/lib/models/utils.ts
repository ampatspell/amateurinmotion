export type AsyncReturnType<T> = T extends (...args: never) => Promise<infer R> ? R : never;

export const maybe = <T>(value: T | undefined): T | undefined => value;

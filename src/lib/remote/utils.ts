import { getRequestEvent } from '$app/server';
import { getDirectus as _getDirectus } from '$lib/directus/directus';
import type { RemoteQueryFunction } from '@sveltejs/kit';

export const getDirectus = () => {
  const { fetch } = getRequestEvent();
  return _getDirectus(fetch);
};

export const maybe = <T>(value: T | undefined): T | undefined => value;

export type QueryReturnType<T> = T extends RemoteQueryFunction<never, infer R> ? R : never;

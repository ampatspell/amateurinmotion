import { getRequestEvent } from '$app/server';
import { getDirectus as _getDirectus } from '$lib/directus/directus';

export const getDirectus = () => {
  const { fetch } = getRequestEvent();
  return _getDirectus(fetch);
};

import { PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN } from '$env/static/public';
import { getDirectusInternal } from './base';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getDirectus = (fetch: Function) => {
  return getDirectusInternal(fetch, PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN);
};

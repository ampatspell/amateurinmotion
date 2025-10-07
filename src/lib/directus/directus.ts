import { PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN } from '$env/static/private';
import { getDirectusInternal, type Directus } from './base';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getDirectus = (fetch: Function) => {
  return getDirectusInternal(fetch, PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN);
};

export { type Directus };

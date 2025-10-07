import { browser } from '$app/environment';
import { getRequestEvent } from '$app/server';
import { PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN } from '$env/static/private';
import { getDirectusInternal, type Directus } from './base';

const getFetch = () => {
  if (!browser) {
    const { fetch } = getRequestEvent();
    return fetch;
  } else {
    return fetch;
  }
};

export const getDirectus = () => {
  return getDirectusInternal(getFetch(), PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN);
};

export { type Directus };

import { getDirectus } from '$lib/directus/directus';
import { CollectionNames } from '$lib/directus/schema';
import { readSingleton } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectus(fetch);
  return {
    index: await directus.request(readSingleton(CollectionNames.index, {})),
  };
};

import { getDirectus } from '$lib/directus/directus';
import { readSingleton } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';
import { CollectionNames } from '$lib/directus/schema';

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  const directus = getDirectus(fetch);
  return {
    visualEditingEnabled,
    index: await directus.request(readSingleton(CollectionNames.index, {})),
  };
};

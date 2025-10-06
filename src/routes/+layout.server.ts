import { getDirectus, type Directus } from '$lib/directus/directus';
import { readSingleton } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';
import { CollectionNames } from '$lib/directus/schema';

const query = {
  fields: [
    '*',
    {
      links: [
        '*',
        {
          item: {
            gallery: ['*'],
          },
        },
      ],
    },
  ],
} as const;

const loadIndex = (directus: Directus) => {
  return directus.request(readSingleton(CollectionNames.index, query));
};

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  const directus = getDirectus(fetch);
  const index = await loadIndex(directus);
  return {
    visualEditingEnabled,
    index,
  };
};

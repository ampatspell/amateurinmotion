import { query } from '$app/server';
import { readSingleton } from '@directus/sdk';
import { getDirectus, type QueryReturnType } from './utils';
import { CollectionNames } from '$lib/directus/schema';

export const getIndex = query(async () => {
  return await getDirectus().request(
    readSingleton(CollectionNames.index, {
      fields: [
        'id',
        'title',
        'backgroundImage',
        'backgroundInset',
        'defaultBackgroundColor',
        'defaultTitleColor',
        'indexBackgroundColor',
        'indexTitleColor',
        {
          links: [
            'id',
            'collection',
            {
              item: {
                gallery: ['title', 'permalink'],
              },
            },
          ],
        },
        'seo',
      ],
    }),
  );
});

export type IndexData = QueryReturnType<typeof getIndex>;
export type LinkData = IndexData['links'][number];
export type SeoData = IndexData['seo'];

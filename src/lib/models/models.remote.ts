import * as v from 'valibot';
import { getRequestEvent, query } from '$app/server';
import { getDirectus as _getDirectus } from '$lib/directus/directus';
import { CollectionNames, type Gallery, type Index } from '$lib/directus/schema';
import { readItems, readSingleton } from '@directus/sdk';
import { error } from '@sveltejs/kit';

const getDirectus = () => {
  const { fetch } = getRequestEvent();
  return _getDirectus(fetch);
};

export const getIndex = query(async () => {
  const directus = getDirectus();
  const data = await directus.request(
    readSingleton(CollectionNames.index, {
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
    } as const),
  );
  if (!data) {
    return error(404, 'Index not found');
  }
  return data as Index;
});

export const getGalleryByPermalink = query(v.object({ permalink: v.string() }), async ({ permalink }) => {
  permalink = permalink.trim();
  const query = {
    filter: {
      permalink: {
        _eq: permalink,
      },
    },
    fields: [
      '*',
      {
        images: [
          '*',
          {
            directus_files_id: ['*'],
          },
        ],
      },
    ],
    limit: 1,
  } as const;
  const [data] = await getDirectus().request(readItems(CollectionNames.gallery, query));
  if (!data) {
    error(404, 'Gallery not found');
  }
  return data as Gallery;
});

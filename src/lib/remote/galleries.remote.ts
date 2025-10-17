import * as v from 'valibot';
import { query } from '$app/server';
import { getDirectus, maybe, type QueryReturnType } from './utils';
import { readItems } from '@directus/sdk';
import { CollectionNames } from '$lib/directus/schema';

export const getGalleryByPermalink = query(v.string(), async (permalink) => {
  const [data] = await getDirectus().request(
    readItems(CollectionNames.gallery, {
      filter: {
        permalink: {
          _eq: permalink.trim(),
        },
      },
      fields: [
        'permalink',
        'title',
        'download',
        {
          files: [
            'id',
            'sort',
            {
              directus_files_id: ['filename_disk', 'filename_download', 'id'],
            },
          ],
          download: ['filename_download', 'filesize', 'id'],
        },
        'seo',
      ],
      limit: 1,
    }),
  );
  return maybe(data);
});

export type GalleryData = NonNullable<QueryReturnType<typeof getGalleryByPermalink>>;
export type GalleryFileData = NonNullable<NonNullable<GalleryData['files']>[number]>;
export type SeoData = NonNullable<GalleryData['seo']>;

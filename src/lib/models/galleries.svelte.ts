import type { Directus } from '$lib/directus/base';
import { CollectionNames, type Gallery } from '$lib/directus/schema';
import { readItems } from '@directus/sdk';

export const readGalleryByPermalink = async (
  directus: Directus,
  permalink: string | undefined,
): Promise<Gallery | undefined> => {
  permalink = (permalink ?? '').trim();
  if (permalink) {
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
    const [gallery] = await directus.request(readItems(CollectionNames.gallery, query));
    return gallery as Gallery;
  }
};

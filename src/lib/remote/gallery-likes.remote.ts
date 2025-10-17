import { command, query } from '$app/server';
import * as v from 'valibot';
import { getDirectus, type QueryReturnType } from './utils';
import { createItem, deleteItem, readItems } from '@directus/sdk';
import { CollectionNames } from '$lib/directus/schema';

export const getGalleryLikesByIdentifier = query(v.string(), async (identifier) => {
  return await getDirectus().request(
    readItems(CollectionNames.gallery_file_like, {
      filter: {
        identifier: { _eq: identifier },
      },
      fields: ['*'],
    }),
  );
});

export type GalleryLikesData = QueryReturnType<typeof getGalleryLikesByIdentifier>;
export type GalleryLikeData = GalleryLikesData[number];

export const addGalleryLike = command(
  v.strictObject({ fileId: v.number(), identifier: v.string() }),
  async ({ fileId, identifier }) => {
    return await getDirectus().request(
      createItem(
        CollectionNames.gallery_file_like,
        { gallery_file: String(fileId), identifier: identifier },
        { fields: ['*'] },
      ),
    );
  },
);

export const removeGalleryLike = command(
  v.strictObject({ id: v.number(), identifier: v.string() }),
  async ({ id, identifier }) => {
    const directus = getDirectus();

    const existing = await directus.request(
      readItems(CollectionNames.gallery_file_like, {
        filter: {
          _and: [{ id: { _eq: id } }, { identifier: { _eq: identifier } }],
        },
        limit: 1,
      }),
    );

    if (!existing) {
      return;
    }

    await getDirectus().request(deleteItem(CollectionNames.gallery_file_like, id));
  },
);

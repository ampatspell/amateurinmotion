import * as v from 'valibot';
import { query } from '$app/server';
import { readSingleton } from '@directus/sdk';
import { getDirectus } from './utils';
import { CollectionNames } from '$lib/directus/schema';

const SeoSchema = v.strictObject({
  og_image: v.optional(v.string()),
  title: v.optional(v.string()),
  meta_description: v.optional(v.string()),
});

export type SeoData = v.InferInput<typeof SeoSchema>;

const IndexSchema = v.strictObject({
  title: v.string(),
  backgroundImage: v.optional(v.string()),
  backgroundInset: v.number(),
  defaultBackgroundColor: v.string(),
  defaultTitleColor: v.string(),
  indexBackgroundColor: v.string(),
  indexTitleColor: v.string(),
  links: v.array(
    v.strictObject({
      collection: v.literal('gallery'),
      item: v.union([v.strictObject({
        permalink: v.string(),
      })]),
    }),
  ),
  seo: SeoSchema,
});

export type IndexData = v.InferInput<typeof IndexSchema>;

export const getIndex = query(async () => {
  const data = await getDirectus().request(
    readSingleton(CollectionNames.index, {
      fields: [
        'title',
        'backgroundImage',
        'backgroundInset',
        'defaultBackgroundColor',
        'defaultTitleColor',
        'indexBackgroundColor',
        'indexTitleColor',
        {
          links: [
            'collection',
            {
              item: {
                gallery: ['permalink'],
              },
            },
          ],
        },
        'seo',
      ],
    }),
  );
  return v.parse(IndexSchema, data);
});

import { getDirectus } from '$lib/directus/directus';
import { CollectionNames } from '$lib/directus/schema';
import { readItems, readSingleton } from '@directus/sdk';
import { maybe, type AsyncReturnType } from './utils';
import { withErrorLogging } from '@ampatspell/directus/utils';

export const loadGalleryByPermalink = async (permalink: string) => {
  const [data] = await withErrorLogging(() =>
    getDirectus(fetch).request(
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
    ),
  );
  return maybe(data);
};

export type GalleryData = NonNullable<AsyncReturnType<typeof loadGalleryByPermalink>>;
export type GalleryFileData = NonNullable<NonNullable<GalleryData['files']>[number]>;
export type SeoData = NonNullable<GalleryData['seo']>;

export const loadIndex = async () => {
  return await withErrorLogging(() =>
    getDirectus(fetch).request(
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
    ),
  );
};

export type IndexData = AsyncReturnType<typeof loadIndex>;
export type IndexLinkData = IndexData['links'][number];

export const loadGalleryLikesByIdentifier = async (identifier: string) => {
  return await withErrorLogging(() =>
    getDirectus(fetch).request(
      readItems(CollectionNames.gallery_file_like, {
        filter: {
          identifier: { _eq: identifier },
        },
        fields: ['*'],
      }),
    ),
  );
};

export type GalleryLikesData = AsyncReturnType<typeof loadGalleryLikesByIdentifier>;
export type GalleryLikeData = GalleryLikesData[number];

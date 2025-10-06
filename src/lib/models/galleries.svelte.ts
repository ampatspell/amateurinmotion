import type { Directus } from '$lib/directus/base';
import { CollectionNames, type Gallery, type GalleryFile } from '$lib/directus/schema';
import { resolveImageThumbnailURL } from '$lib/utils/api.svelte';
import { Model } from '$lib/utils/model.svelte';
import { asObject, asObjectArray, asString } from '$lib/utils/validate';
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
    if (gallery) {
      return gallery as Gallery;
    }
  }
};

export class GalleryFileModel extends Model<{ data: GalleryFile }> {
  readonly data = $derived(this.options.data);
  readonly file = $derived(asObject(this.data.directus_files_id));

  readonly thumbnails = $derived.by(() => {
    const id = this.file.id;
    const resolve = (key: string) => {
      return resolveImageThumbnailURL(id, key);
    };
    return {
      grid: resolve('400x400'),
    };
  });

  readonly identifier = $derived(this.file.filename_download);
}

export class GalleryModel extends Model<{ data: Gallery }> {
  readonly data = $derived(this.options.data);

  readonly title = $derived(this.data.title);
  readonly permalink = $derived(asString(this.data.permalink));

  readonly images = $derived(asObjectArray(this.data.images).map((data) => new GalleryFileModel({ data })));

  static build(data: Gallery) {
    return new this({ data });
  }
}

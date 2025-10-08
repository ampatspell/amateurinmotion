import { type Directus } from '$lib/directus/base';
import { CollectionNames, type Gallery, type GalleryFile } from '$lib/directus/schema';
import { resolveImagePreset } from '$lib/directus/utils';
import { Model } from '$lib/utils/model.svelte';
import { asObject, asObjectArray, asString } from '$lib/utils/validate';
import { readItems } from '@directus/sdk';

export const loadGalleryByPermalink = async (directus: Directus, permalink: string) => {
  const [data] = await directus.request(
    readItems(CollectionNames.gallery, {
      filter: {
        permalink: {
          _eq: permalink.trim(),
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
    }),
  );
  if (data) {
    return data as Gallery;
  }
};

export class GalleryFileModel extends Model<{ data: GalleryFile }> {
  readonly data = $derived(this.options.data);
  readonly file = $derived(asObject(this.data.directus_files_id));

  readonly thumbnails = $derived.by(() => {
    const id = this.file.id;
    const resolve = (key: string) => {
      return resolveImagePreset(id, key);
    };
    return {
      grid: resolve('400x400'),
      carousel: resolve('2048x2048'),
    };
  });

  readonly identifier = $derived(asString(this.file.filename_download));
}

export class GalleryModel extends Model<{ data: Gallery }> {
  readonly data = $derived(this.options.data);

  readonly title = $derived(this.data.title);
  readonly permalink = $derived(asString(this.data.permalink));

  readonly images = $derived(asObjectArray(this.data.images).map((data) => new GalleryFileModel({ data })));

  imageByIdentifier(identifier: string | undefined) {
    if (identifier) {
      return this.images.find((image) => image.identifier === identifier);
    }
  }

  imageByIndex(index: number) {
    return this.images[index];
  }

  static build(data: Gallery) {
    return new this({ data });
  }
}

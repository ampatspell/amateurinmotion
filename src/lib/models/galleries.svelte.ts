import { CollectionNames, type DirectusFile, type Gallery, type GalleryFile } from '$lib/directus/schema';
import { readItems } from '@directus/sdk';
import { SeoModel } from './seo.svelte';
import { isTruthy, nextObject, prevObject } from '@ampatspell/directus-common/utils/array';
import { Model } from '@ampatspell/directus-common/utils/model';
import {
  asNumber,
  asObject,
  asObjectArray,
  asOptionalObject,
  asString,
} from '@ampatspell/directus-common/utils/validate';
import { resolveAsset, resolveImagePreset, withErrorHandling } from '@ampatspell/directus-common/directus/utils';
import type { Directus } from '$lib/directus/directus';
import { type CarouselImage } from '@ampatspell/directus-common/components/gallery/carousel/carousel';
import { type GridImage } from '@ampatspell/directus-common/components/gallery/grid/grid';

export const loadGalleryByPermalink = async (directus: Directus, permalink: string) => {
  return withErrorHandling(async () => {
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
            files: [
              '*',
              {
                directus_files_id: ['*'],
              },
            ],
            download: ['*'],
          },
        ],
        limit: 1,
      }),
    );
    if (data) {
      return data as Gallery;
    }
  });
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

  readonly carousel = $derived.by<CarouselImage & { file: GalleryFileModel }>(() => {
    return {
      identifier: this.identifier,
      url: this.thumbnails.carousel,
      file: this,
    };
  });

  readonly grid = $derived.by<GridImage & { file: GalleryFileModel }>(() => {
    return {
      file: this,
      url: this.thumbnails.grid,
    };
  });
}

export class GalleryDownloadModel extends Model<{ data: DirectusFile }> {
  readonly data = $derived(this.options.data);

  readonly id = $derived(this.data.id);
  readonly filename = $derived(asString(this.data.filename_download));
  readonly size = $derived(asNumber(this.data.filesize));
  readonly url = $derived(resolveAsset(this.id, { download: true }));
}

export class GalleryModel extends Model<{ data: Gallery }> {
  readonly data = $derived(this.options.data);

  readonly title = $derived(this.data.title);
  readonly permalink = $derived(asString(this.data.permalink));

  readonly images = $derived(asObjectArray(this.data.files).map((data) => new GalleryFileModel({ data })));
  readonly download = $derived.by(() => {
    const data = asOptionalObject(this.data.download);
    if (data) {
      return new GalleryDownloadModel({ data });
    }
  });

  readonly seo = $derived(new SeoModel({ data: this.data }));

  seoFor(selected: GalleryFileModel): SeoModel {
    const { seo } = this;
    return new SeoModel({
      data: {
        seo: {
          title: selected.identifier,
          meta_description: [seo.title, seo.metaDescription].filter(isTruthy).join(', '),
          og_image: selected.file.id,
        },
      },
    });
  }

  imageByIdentifier(identifier: string | undefined) {
    if (identifier) {
      return this.images.find((image) => image.identifier === identifier);
    }
  }

  imageByIndex(index: number) {
    return this.images[index];
  }

  previousImage(selected: GalleryFileModel) {
    return prevObject(this.images, selected);
  }

  nextImage(selected: GalleryFileModel) {
    return nextObject(this.images, selected);
  }

  readonly carousel = $derived(this.images.map((image) => image.carousel));
  readonly grid = $derived(this.images.map((image) => image.grid));

  static build(data: Gallery) {
    return new this({ data });
  }
}

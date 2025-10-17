import { type DirectusFile } from '$lib/directus/schema';
import { SeoModel } from './seo.svelte';
import { Model } from '@ampatspell/base/utils/model';
import type { CarouselImage } from '@ampatspell/carousel/components/gallery/carousel/carousel';
import type { GridImage } from '@ampatspell/grid/grid';
import { isTruthy } from '@ampatspell/base/utils/array';
import { asNumber, asObject, asObjectArray, asString } from '@ampatspell/directus/validate';
import type { GalleryData, GalleryFileData } from './loaders';
import { resolveAsset, resolveImagePreset } from '@ampatspell/directus/utils';

export class GalleryFileModel extends Model<{ data: GalleryFileData }> {
  readonly data = $derived(this.options.data);
  readonly id = $derived(this.data.id);
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
  readonly filename = $derived(this.data.filename_download);
  readonly size = $derived(asNumber(this.data.filesize));
  readonly url = $derived(resolveAsset(this.id, { download: true }));
}

export class GalleryModel extends Model<{ data: GalleryData }> {
  readonly data = $derived(this.options.data);

  readonly title = $derived(this.data.title);
  readonly permalink = $derived(asString(this.data.permalink));

  readonly images = $derived(asObjectArray(this.data.files).map((data) => new GalleryFileModel({ data })));
  readonly download = $derived.by(() => {
    const data = this.data.download;
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
          og_image: selected.file!.id,
        },
      },
    });
  }

  imageByIdentifier(identifier: string | undefined) {
    if (identifier) {
      return this.images.find((image) => image.identifier === identifier);
    }
  }

  readonly carousel = $derived(this.images.map((image) => image.carousel));
  readonly grid = $derived(this.images.map((image) => image.grid));

  static build(data: GalleryData) {
    return new this({ data });
  }
}

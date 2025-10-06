import { resolve } from '$app/paths';
import type { Directus } from '$lib/directus/base';
import { CollectionNames, type Gallery, type Index, type IndexLink } from '$lib/directus/schema';
import { resolveImageThumbnailURL } from '$lib/utils/api.svelte';
import { Model } from '$lib/utils/model.svelte';
import { asObject, asObjectArray, asOptionalString, asString } from '$lib/utils/validate';
import { readSingleton } from '@directus/sdk';

const query = {
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
} as const;

export const loadIndex = async (directus: Directus) => {
  return await directus.request(readSingleton(CollectionNames.index, query));
};

export class BackgroundModel extends Model<{ data: Index }> {
  readonly data = $derived(this.options.data);
  private readonly id = $derived(asOptionalString(this.data.backgroundImage));

  readonly url = $derived.by(() => {
    const { id } = this;
    if (typeof id === 'string') {
      return resolveImageThumbnailURL(id, '2048x2048');
    }
  });

  readonly inset = $derived(this.data.backgroundInset ?? 0);
}

export class LinkModel extends Model<{ data: IndexLink }> {
  readonly data = $derived(this.options.data);
  readonly item = $derived(asObject(this.data.item));

  readonly id = $derived(this.data.id);
  readonly collection = $derived(this.data.collection);

  readonly props = $derived.by(() => {
    if (this.collection === 'gallery') {
      const gallery = this.item as Gallery;
      const permalink = asString(gallery.permalink);
      const title = gallery.title;
      if (permalink && title) {
        return {
          href: resolve('/galleries/[permalink]', { permalink }),
          label: title,
        };
      }
    }
  });
}

export class LinksModel extends Model<{ data: Index }> {
  readonly data = $derived(this.options.data);

  readonly all = $derived(asObjectArray(this.data.links).map((data) => new LinkModel({ data })));
}

export class IndexModel extends Model<{ data: Index }> {
  readonly data = $derived(this.options.data);

  readonly background = $derived(new BackgroundModel({ data: this.data }));
  readonly links = $derived(new LinksModel({ data: this.data }));

  static build(data: Index) {
    return new this({ data });
  }
}

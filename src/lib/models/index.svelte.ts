import { resolve } from '$app/paths';
import { SeoModel } from './seo.svelte';
import { resolveImagePreset } from '@ampatspell/directus/utils';
import { Model } from '@ampatspell/base/utils/model';
import type { IndexData, LinkData } from '$lib/remote/index.remote';

export class BackgroundModel extends Model<{ data: IndexData }> {
  readonly data = $derived(this.options.data);
  private readonly id = $derived(this.data.backgroundImage);

  readonly url = $derived.by(() => {
    const { id } = this;
    if (typeof id === 'string') {
      return resolveImagePreset(id, '2048x2048');
    }
  });

  readonly inset = $derived(this.data.backgroundInset ?? 0);
}

export class LinkModel extends Model<{ data: LinkData }> {
  readonly data = $derived(this.options.data);
  readonly item = $derived(this.data.item);

  readonly id = $derived(this.data.id);
  readonly collection = $derived(this.data.collection);

  readonly props = $derived.by(() => {
    const data = this.data;
    if (data.collection === 'gallery') {
      const gallery = data.item;
      const permalink = gallery.permalink;
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

export class LinksModel extends Model<{ data: IndexData }> {
  readonly data = $derived(this.options.data);

  readonly all = $derived(this.data.links.map((data) => new LinkModel({ data })));
}

export class IndexModel extends Model<{ data: IndexData }> {
  readonly data = $derived(this.options.data);

  readonly title = $derived(this.data.title);
  readonly background = $derived(new BackgroundModel({ data: this.data }));
  readonly links = $derived(new LinksModel({ data: this.data }));
  readonly seo = $derived(new SeoModel({ data: this.data }));

  readonly colors = $derived.by(() => {
    return {
      index: {
        background: this.data.indexBackgroundColor,
        color: this.data.indexTitleColor,
      },
      default: {
        background: this.data.defaultBackgroundColor,
        color: this.data.defaultTitleColor,
      },
    };
  });

  static build(data: IndexData) {
    return new this({ data });
  }
}

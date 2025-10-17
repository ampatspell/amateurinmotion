import { createContext } from 'svelte';
import { Model } from '@ampatspell/base/utils/model';
import { getIdentifier } from './identifier.svelte';
import { browser } from '$app/environment';
import { addObject, removeObjectAt } from '@ampatspell/base/utils/array';
import type { Fetch } from '@ampatspell/directus/base';
import { getDirectus } from '$lib/directus/directus';
import { createItem, deleteItem } from '@directus/sdk';
import { CollectionNames } from '$lib/directus/schema';
import { loadGalleryLikesByIdentifier, type GalleryData, type GalleryLikeData } from './loaders';

export class GalleryLikes extends Model<{ gallery: GalleryData }> {
  private identifier = $derived(getIdentifier().current);
  private data = $state<GalleryLikeData[]>();

  async load() {
    if (browser) {
      const identifier = this.identifier;
      if (identifier) {
        this.data = await loadGalleryLikesByIdentifier(identifier);
        return this;
      }
    }
  }

  private witLoaded<T>(cb: (opts: { data: GalleryLikeData[]; identifier: string }) => T | undefined) {
    const { data, identifier } = this;
    if (data && identifier) {
      return cb({ data, identifier });
    }
  }

  isLiked(fileId: number) {
    return this.witLoaded(({ data }) => {
      return !!data.find((row) => (row.gallery_file as unknown as number) === fileId);
    });
  }

  setLiked(fetch: Fetch, fileId: number, liked: boolean) {
    return this.witLoaded(async ({ data, identifier }) => {
      const directus = getDirectus(fetch);
      if (liked) {
        const added = await directus.request(
          createItem(
            CollectionNames.gallery_file_like,
            { gallery_file: String(fileId), identifier: identifier },
            { fields: ['*'] },
          ),
        );
        addObject(data, added);
      } else {
        const entry = data.find((row) => (row.gallery_file as unknown as number) === fileId);
        if (entry) {
          await directus.request(deleteItem(CollectionNames.gallery_file_like, entry.id));
          removeObjectAt(data, data.indexOf(entry));
        }
      }
    });
  }
}

export type GalleryLikesContext = {
  current: GalleryLikes | undefined;
};

export const [getGalleryLikesContext, setGalleryLikesContext] = createContext<GalleryLikesContext>();

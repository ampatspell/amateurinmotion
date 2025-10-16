import { createContext } from 'svelte';
import { Model } from '@ampatspell/base/utils/model';
import { getIdentifier } from './identifier.svelte';
import { CollectionNames, type Gallery, type GalleryFileLike } from '$lib/directus/schema';
import type { Fetch } from '@ampatspell/directus/base';
import { browser } from '$app/environment';
import { getDirectus } from '$lib/directus/directus';
import { createItem, deleteItem, readItems } from '@directus/sdk';
import { addObject, removeObjectAt } from '@ampatspell/base/utils/array';

export class GalleryLikes extends Model<{ gallery: Gallery }> {
  private identifier = $derived(getIdentifier().current);
  private data = $state<GalleryFileLike[]>();

  async load(fetch: Fetch) {
    if (browser) {
      const identifier = this.identifier;
      if (identifier) {
        this.data = await getDirectus(fetch).request(
          readItems(CollectionNames.gallery_file_like, {
            filter: {
              identifier: { _eq: identifier },
            },
            fields: ['*'],
          }),
        );
        return this;
      }
    }
  }

  private witLoaded<T>(cb: (opts: { data: GalleryFileLike[]; identifier: string }) => T | undefined) {
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

  setLiked(fileId: number, liked: boolean) {
    return this.witLoaded(async ({ data, identifier }) => {
      const directus = getDirectus(fetch);
      if (liked) {
        const added = await directus.request(
          createItem(CollectionNames.gallery_file_like, { gallery_file: String(fileId), identifier: identifier }),
        );
        addObject(data, added as GalleryFileLike);
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

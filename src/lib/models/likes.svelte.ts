import { createContext } from 'svelte';
import { Model } from '@ampatspell/base/utils/model';
import { getIdentifier } from './identifier.svelte';
import { browser } from '$app/environment';
import { addObject, removeObjectAt } from '@ampatspell/base/utils/array';
import type { GalleryData } from '$lib/remote/galleries.remote';
import {
  addGalleryLike,
  getGalleryLikesByIdentifier,
  removeGalleryLike,
  type GalleryLikeData,
} from '$lib/remote/gallery-likes.remote';

export class GalleryLikes extends Model<{ gallery: GalleryData }> {
  private identifier = $derived(getIdentifier().current);
  private data = $state<GalleryLikeData[]>();

  async load() {
    if (browser) {
      const identifier = this.identifier;
      if (identifier) {
        this.data = await getGalleryLikesByIdentifier(identifier);
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

  setLiked(fileId: number, liked: boolean) {
    return this.witLoaded(async ({ data, identifier }) => {
      if (liked) {
        const added = await addGalleryLike({ fileId, identifier });
        addObject(data, added);
      } else {
        const entry = data.find((row) => (row.gallery_file as unknown as number) === fileId);
        if (entry) {
          await removeGalleryLike({ id: entry.id, identifier });
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

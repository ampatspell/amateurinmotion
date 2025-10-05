import { untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { Deferred } from '../directus/promise';

export class Images {
  private cache = new SvelteMap<string, HTMLImageElement>();

  has(url: string) {
    return this.cache.has(url);
  }

  preload(url: string) {
    const deferred = new Deferred<HTMLImageElement, Error>();
    untrack(() => {
      if (this.cache.has(url)) {
        deferred.resolve(this.cache.get(url)!);
      }
    });
    const image = new Image();
    image.onload = () => {
      this.cache.set(url, image);
      deferred.resolve(image);
    };
    image.onerror = () => deferred.reject(new Error(`Failed to preload image`));
    image.src = url;
    return deferred.promise;
  }
}

export const images = new Images();

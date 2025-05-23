import { Subscribable } from '$d2/lib/base/model/model.svelte';
import { untrack } from 'svelte';

const urls = new Set<string>();

export type PreloadOptions = {
  url: string | undefined;
};

export class Preload extends Subscribable<PreloadOptions> {
  readonly url = $derived(this.options.url);

  isLoaded = $state(false);

  private _preload(url: string | undefined) {
    if (url) {
      if (urls.has(url)) {
        untrack(() => {
          this.isLoaded = true;
        });
      } else {
        const image = new Image();
        const done = () => {
          image.removeEventListener('load', load);
        };
        const load = () => {
          urls.add(url);
          if (this.url === url) {
            this.isLoaded = true;
          }
          done();
        };
        image.addEventListener('load', load);
        image.src = url;
      }
    }
  }

  subscribe(): void {
    $effect.root(() => {
      $effect(() => {
        this._preload(this.url);
      });
    });
  }

  dependencies = [];
}

import { node } from '$d2/lib/nodes/loader.svelte';
import { GalleryNodeModel } from '$lib/definition/gallery/node.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
  const identifier = event.params.identifier;
  return {
    gallery: await node
      .forPath({
        path: `/galleries/${identifier}`,
        factory: GalleryNodeModel,
      })
      .preload(),
  };
};

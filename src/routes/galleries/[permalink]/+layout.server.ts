import { getDirectus } from '$lib/directus/directus';
import { error, type ServerLoad } from '@sveltejs/kit';
import { readGalleryByPermalink } from '$lib/models/galleries.svelte';

export const load: ServerLoad = async ({ fetch, params: { permalink } }) => {
  const directus = getDirectus(fetch);
  const gallery = await readGalleryByPermalink(directus, permalink);
  if (!gallery) {
    error(404, `Gallery not found`);
  }
  return {
    gallery,
  };
};

import { loadGalleryByPermalink } from '$lib/models/galleries.svelte';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getDirectus } from '$lib/directus/directus';

export const load: LayoutServerLoad = async ({ fetch, params: { permalink } }) => {
  const gallery = await loadGalleryByPermalink(getDirectus(fetch), permalink);
  if (!gallery) {
    return error(404, 'Gallery not found');
  }
  return {
    gallery,
  };
};

import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getGalleryByPermalink } from '$lib/remote/galleries.remote';

export const load: LayoutServerLoad = async ({ params: { permalink } }) => {
  const gallery = await getGalleryByPermalink(permalink);
  if (!gallery) {
    return error(404, 'Gallery not found');
  }
  return {
    gallery,
  };
};

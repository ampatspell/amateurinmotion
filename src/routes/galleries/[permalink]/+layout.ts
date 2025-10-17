import { GalleryLikes as GalleryLikesModel } from '$lib/models/likes.svelte';
import { loadGalleryByPermalink } from '$lib/models/loaders';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params: { permalink } }) => {
  const gallery = await loadGalleryByPermalink(permalink);
  if (!gallery) {
    return error(404, 'Gallery not found');
  }
  const likes = new GalleryLikesModel({ gallery });
  return {
    gallery,
    likes: await likes.load(),
  };
};

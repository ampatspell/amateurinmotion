import { GalleryLikes as GalleryLikesModel } from '$lib/models/likes.svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data }) => {
  const likes = new GalleryLikesModel({ gallery: data.gallery });
  return {
    likes: await likes.load(fetch),
    ...data,
  };
};

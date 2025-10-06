import { getDirectus } from '$lib/directus/directus';
import { loadIndex } from '$lib/models/index.svelte';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  const directus = getDirectus(fetch);
  const index = await loadIndex(directus);
  if (!index) {
    error(404, 'Index not found');
  }
  return {
    visualEditingEnabled,
    index,
  };
};

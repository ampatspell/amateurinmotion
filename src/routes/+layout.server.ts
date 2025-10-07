import { loadIndex } from '$lib/models/index.svelte';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getDirectus } from '$lib/directus/directus';

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  const index = await loadIndex(getDirectus(event.fetch));
  if (!index) {
    return error(404, 'Index not found');
  }
  return {
    visualEditingEnabled,
    index,
  };
};

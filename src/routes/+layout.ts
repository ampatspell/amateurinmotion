import type { LayoutLoad } from './$types';
import { loadIndex } from '$lib/models/loaders';

export const load: LayoutLoad = async ({ url }) => {
  const visualEditingEnabled = url.searchParams.get('visual-editing') === 'true';
  const index = await loadIndex();
  return {
    visualEditingEnabled,
    index,
  };
};

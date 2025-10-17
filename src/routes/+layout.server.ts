import type { LayoutServerLoad } from './$types';
import { getIndex } from '$lib/remote/index.remote';

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  const index = await getIndex();
  return {
    visualEditingEnabled,
    index,
  };
};

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const visualEditingEnabled = event.url.searchParams.get('visual-editing') === 'true';
  return {
    visualEditingEnabled,
  };
};

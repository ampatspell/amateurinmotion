import { buildSiteDefinition } from '$dummy/lib/definition/site.svelte';
import { personal } from './layouts/personal/definition.svelte';
import { index } from './pages/index/definition.svelte';
import { gallery } from './pages/gallery/definition.svelte';

export const definition = buildSiteDefinition(({ layout, page }) => {
  layout(
    personal({
      id: 'personal-1',
      name: 'Personal #1',
    }),
  );

  page(
    index({
      id: 'index',
      name: 'Index',
    }),
  );

  page(
    gallery({
      id: 'gallery',
      name: 'Gallery',
    }),
  );
});

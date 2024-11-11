import IndexFrontend from '$lib/pages/index/frontend/frontend.svelte';
import IndexBackend from '$lib/pages/index/backend/backend.svelte';
import type { SiteDefinitionModelOptions } from '$dummy/lib/definition/site.svelte';
import { IndexPageSettingsModel } from './pages/index/settings.svelte';
import { GalleryPageSettingsModel } from './pages/gallery/settings.svelte';
import GalleryFrontend from '$lib/pages/gallery/frontend/frontend.svelte';
import GalleryBackend from '$lib/pages/gallery/backend/backend.svelte';
import DefaultLayoutFrontend from '$lib/layouts/default/frontend/frontend.svelte';
import DefaultLayoutBackend from '$lib/layouts/default/backend.svelte';
import { DefaultLayoutSettingsModel } from './layouts/default/settings.svelte';

export const definition: SiteDefinitionModelOptions = {
  layouts: {
    definitions: [
      {
        id: 'amateurinmotion-1',
        name: 'Version 1',
        frontend: DefaultLayoutFrontend,
        backend: DefaultLayoutBackend,
        settings: (layout) => new DefaultLayoutSettingsModel({ layout }),
        defaults: {},
      },
    ],
  },
  pages: {
    definitions: [
      {
        id: 'index',
        name: 'Index',
        page: {
          frontend: IndexFrontend,
          backend: IndexBackend,
          defaults: {},
          settings: (page) => new IndexPageSettingsModel({ page }),
        },
      },
      {
        id: 'gallery',
        name: 'Gallery',
        page: {
          frontend: GalleryFrontend,
          backend: GalleryBackend,
          defaults: {
            title: 'Untitled gallery',
          },
          settings: (page) => new GalleryPageSettingsModel({ page }),
        },
      },
    ],
  },
};

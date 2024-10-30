import { type PageDefinitionModelOptions } from '$dummy/lib/pages/definition/definition.svelte';
import HeaderBackend from './header/backend/backend.svelte';
import HeaderFrontend from './header/frontend/frontend.svelte';
import { HeaderPageSettingsModel, type HeaderPageSettings } from './header/settings.svelte';
import HelloBackend from './gallery/backend/backend.svelte';
import HelloFrontend from './gallery/frontend/frontend.svelte';
import {
  GalleryPageSettingsModel as GalleryPageSettingsModel,
  type GalleryPageSettings as GalleryPageSettings,
} from './gallery/settings.svelte';
import IndexBackend from './index/backend/backend.svelte';
import IndexFrontend from './index/frontend/frontend.svelte';
import { IndexPageSettingsModel, type IndexPageSettings } from './index/settings.svelte';

export const themePageDefinitions = () => {
  return {
    pages: [
      {
        id: 'index',
        name: 'Index',
        frontend: IndexFrontend,
        backend: IndexBackend,
        defaults: {},
        settings: (page) => new IndexPageSettingsModel({ page }),
      } satisfies PageDefinitionModelOptions<IndexPageSettings>,
      {
        id: 'header',
        name: 'Header',
        frontend: HeaderFrontend,
        backend: HeaderBackend,
        defaults: {
          title: 'amateurinmotion.com',
        },
        settings: (page) => new HeaderPageSettingsModel({ page }),
      } satisfies PageDefinitionModelOptions<HeaderPageSettings>,
      {
        id: 'gallery',
        name: 'Gallery',
        frontend: HelloFrontend,
        backend: HelloBackend,
        defaults: {
          title: 'Untitled gallery',
        },
        settings: (page) => new GalleryPageSettingsModel({ page }),
      } satisfies PageDefinitionModelOptions<GalleryPageSettings>,
    ],
  };
};

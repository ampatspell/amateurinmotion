import { type PageDefinitionModelOptions } from '$dummy/lib/pages/definition/definition.svelte';
import HeaderBackend from './header/backend/backend.svelte';
import HeaderFrontend from './header/frontend/frontend.svelte';
import { HeaderPageSettingsModel, type HeaderPageSettings } from './header/settings.svelte';
import HelloBackend from './hello/backend/backend.svelte';
import HelloFrontend from './hello/frontend/frontend.svelte';
import { HelloPageSettingsModel, type HelloPageSettings } from './hello/settings.svelte';
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
        defaults: {},
        settings: (page) => new HeaderPageSettingsModel({ page }),
      } satisfies PageDefinitionModelOptions<HeaderPageSettings>,
      {
        id: 'hello',
        name: 'Hello',
        frontend: HelloFrontend,
        backend: HelloBackend,
        defaults: {
          title: 'Untitled hello page',
        },
        settings: (page) => new HelloPageSettingsModel({ page }),
      } satisfies PageDefinitionModelOptions<HelloPageSettings>,
    ],
  };
};

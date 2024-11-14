import type { LayoutDefinitionModelOptions } from '$dummy/lib/definition/layouts.svelte';
import Backend from './backend.svelte';
import Frontend from './frontend/frontend.svelte';
import { DefaultLayoutSettingsModel, type DefaultLayoutSettings } from './settings.svelte';

type Definition = LayoutDefinitionModelOptions<DefaultLayoutSettings>;

export const personal = (opts: Pick<Definition, 'id' | 'name'>): Definition => {
  return {
    ...opts,
    frontend: Frontend,
    backend: Backend,
    settings: (layout) => new DefaultLayoutSettingsModel({ layout }),
    defaults: {
      title: 'amateurinmotion.com',
    },
  };
};

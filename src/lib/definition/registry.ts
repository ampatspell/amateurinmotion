import { file } from '$d2/lib/definition/file/definition.svelte';
import { app } from '$d2/lib/definition/utils.svelte';
import type { FunctionsNodePropertiesRegistry } from '$d2-shared/nodes/registry';
import { index, type IndexNodeProperties } from './index/definition.svelte';
import { galleries, type GalleriesNodeProperties } from './galleries/definition.svelte';
import { gallery, type GalleryNodeProperties } from './gallery/definition.svelte';

export type NodePropertiesRegistry = FunctionsNodePropertiesRegistry & {
  index: IndexNodeProperties;
  galleries: GalleriesNodeProperties;
  gallery: GalleryNodeProperties;
};

export const definition = app({
  nodes: [file(), index(), galleries(), gallery()],
});

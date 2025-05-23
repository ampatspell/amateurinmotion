import { node } from '$d2/lib/definition/utils.svelte';
import Backend from './backend.svelte';
import { GalleriesNodeModel } from './node.svelte';

export type GalleriesNodeProperties = {
  title?: string;
};

export const galleries = () => {
  return node('galleries', {
    name: 'Galleries',
    node: GalleriesNodeModel,
    defaults: () => ({}),
    backend: Backend,
  });
};

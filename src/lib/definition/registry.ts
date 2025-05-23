import { file } from '$d2/lib/definition/file/definition.svelte';
import { app } from '$d2/lib/definition/utils.svelte';
import type { FunctionsNodePropertiesRegistry } from '$d2-shared/nodes/registry';
import { index, type IndexNodeProperties } from './index/definition.svelte';

export type NodePropertiesRegistry = FunctionsNodePropertiesRegistry & {
  index: IndexNodeProperties;
};

export const definition = app({
  nodes: [index(), file()],
});

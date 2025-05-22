import { file } from '$d2/lib/definition/file/definition.svelte';
import { app } from '$d2/lib/definition/utils.svelte';
import type { FunctionsNodePropertiesRegistry } from '$d2-shared/nodes/registry';

export type NodePropertiesRegistry = FunctionsNodePropertiesRegistry;

export const definition = app({
  nodes: [file()],
});

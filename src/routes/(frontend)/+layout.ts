import { node } from '$d2/lib/nodes/loader.svelte.js';
import { IndexNodeModel } from '$lib/definition/index/node.svelte.js';

export const load = async () => {
  return {
    index: await node.forPath({ path: '/index', factory: IndexNodeModel }).preload(),
  };
};

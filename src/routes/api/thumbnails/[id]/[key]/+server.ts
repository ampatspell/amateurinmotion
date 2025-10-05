import { getDirectus } from '$lib/directus/directus';
import { readAssetRaw } from '@directus/sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, params: { id, key } }) => {
  const directus = getDirectus(fetch);
  const stream = await directus.request(readAssetRaw(id, { key: key }));
  return new Response(stream);
};

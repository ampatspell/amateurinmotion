import { proxy } from '@ampatspell/directus/proxy';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, request, params: { id } }) => {
  return await proxy(fetch, request, `/assets/${id}`, { download: 'true' });
};

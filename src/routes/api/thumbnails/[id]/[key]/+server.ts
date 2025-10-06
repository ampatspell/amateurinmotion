import { getDirectus } from '$lib/directus/directus';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, request, params: { id, key } }) => {
  const directus = getDirectus(fetch);
  const token = await directus.getToken();
  const href = directus.url.href;
  const url = `${href}assets/${id}/?access_token=${token}&key=${key}`;
  return fetch(url.toString(), {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });
};

import { getDirectus } from '$lib/directus/directus';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, request, params: { id, key } }) => {
  const directus = getDirectus(fetch);
  const token = await directus.getToken();
  const href = directus.url.href;
  const url = `${href}assets/${id}/?access_token=${token}&key=${key}`;

  // remove `zstd` which is not supported by fetch decoder
  request.headers.set('accept-encoding', 'gzip, deflate, br');

  const response = await fetch(url, {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });

  return new Response(response.body, {
    headers: replaceHeaders(response.headers, {
      'content-encoding': undefined,
    }),
    status: response.status,
    statusText: response.statusText,
  });
};

const replaceHeaders = (headers: Headers, replace: Record<string, string | undefined>) => {
  const ret = new Headers(headers);
  for (const key in replace) {
    const value = replace[key];
    if (value !== undefined) {
      ret.set(key, value);
    } else {
      ret.delete(key);
    }
  }
  return ret;
};

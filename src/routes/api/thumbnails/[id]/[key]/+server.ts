import { getDirectus } from '$lib/directus/directus';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, request, params: { id, key } }) => {
  const directus = getDirectus(fetch);
  const token = await directus.getToken();
  const href = directus.url.href;
  const url = `${href}assets/${id}/?access_token=${token}&key=${key}`;

  const { body, headers, status, statusText } = await fetch(url, {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });

  // TODO: gzip body again
  return new Response(body, {
    headers: omitHeaders(headers, ['content-encoding']),
    status,
    statusText,
  });
};

const omitHeaders = (headers: Headers, omit: string[]) => {
  const ret = new Headers();
  for(const key of headers.keys()) {
    if(!omit.includes(key.toLowerCase())) {
      const value = headers.get(key);
      if(value) {
        ret.append(key, value);
      }
    }
  }
  return ret;
}

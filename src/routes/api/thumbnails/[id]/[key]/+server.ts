import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const href = PUBLIC_DIRECTUS_URL;
const token = PUBLIC_DIRECTUS_TOKEN;

export const GET: RequestHandler = async ({ fetch, request: req, params: { id, key } }) => {
  const url = `${href}/assets/${id}?access_token=${token}&key=${key}`;

  req.headers.set('Accept-Encoding', 'gzip');

  const res = await fetch(url, {
    body: req.body,
    method: req.method,
    headers: req.headers,
  });

  if (!res.body) {
    error(500, 'No body');
  }

  const headers = new Headers(res.headers);
  headers.delete('Content-Length');
  headers.delete('Accept-Ranges');
  headers.delete('Access-Control-Allow-Credentials');
  headers.delete('Access-Control-Allow-Origin');
  headers.delete('Access-Control-Expose-Headers');
  headers.set('Content-Encoding', 'gzip');

  const gzip = res.body.pipeThrough(new CompressionStream('gzip'));

  return new Response(gzip, {
    headers,
    status: res.status,
    statusText: res.statusText,
  });
};

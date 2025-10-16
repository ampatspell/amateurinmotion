import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const href = PUBLIC_DIRECTUS_URL;
const token = PUBLIC_DIRECTUS_TOKEN;

export const GET: RequestHandler = async ({ fetch, request: req, params: { id, key } }) => {
  const url = `${href}/assets/${id}?access_token=${token}&key=${key}`;

  const res = await fetch(url, {
    body: req.body,
    method: req.method,
    headers: req.headers,
  });

  if(!res.body) {
    error(500, 'No body');
  }

  const headers = new Headers(res.headers);
  headers.set('Content-Encoding', 'gzip')

  const gzip = res.body.pipeThrough(new CompressionStream('gzip'));

  return new Response(gzip, {
    headers,
    status: res.status,
    statusText: res.statusText,
  });
};

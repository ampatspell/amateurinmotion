import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';

export const resolveImageThumbnailURL = (id: string, key: string) => {
  const url = PUBLIC_DIRECTUS_URL;
  const token = PUBLIC_DIRECTUS_TOKEN;
  return `${url}/assets/${id}?access_token=${token}&key=${key}`;
};

import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = () => {
  return redirect(307, resolve('/(tiny)/_admin/(nav)/dailies'));
};

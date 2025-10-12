import { type Schema } from './schema';
import { getDirectus as getBaseDirectus, type Fetch } from '@ampatspell/directus/directus/directus';

export const getDirectus = (fetch: Fetch) => getBaseDirectus<Schema>(fetch);

export type Directus = ReturnType<typeof getDirectus>;

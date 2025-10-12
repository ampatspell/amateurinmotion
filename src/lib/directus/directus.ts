import { type Schema } from './schema';
import { getBaseDirectus, type Fetch } from '@ampatspell/directus/directus';

export const getDirectus = (fetch: Fetch) => getBaseDirectus<Schema>(fetch);

export type Directus = ReturnType<typeof getDirectus>;

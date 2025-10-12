import { getDirectus as getBaseDirectus, type Fetch } from '@ampatspell/directus-common/directus/directus';
import { type Schema } from './schema';

export const getDirectus = (fetch: Fetch) => getBaseDirectus<Schema>(fetch);

export type Directus = ReturnType<typeof getDirectus>;

import {
  getDirectus as getBaseDirectus,
  type Fetch,
  type Directus as BaseDirectus,
} from '@ampatspell/directus-common/directus/directus.ts';
import { type Schema } from './schema';

export type Directus = BaseDirectus<Schema>;

export const getDirectus = (fetch: Fetch) => getBaseDirectus<Schema>(fetch);

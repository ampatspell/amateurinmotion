import { createServiceGetters } from '@ampatspell/tiny/server/services/handle';
import type { DB } from './schema';

export const { getDatabase, getFiles, getStorage, getUsers } = createServiceGetters<DB>();

import { STORAGE_ROOT, USERS_SECRET } from '$app/env/private';
import { jpeg } from '@ampatspell/tiny/server/files/thumbnails';
import { createHandle } from '@ampatspell/tiny/server/services/handle';
import { createBasicLogger } from '@ampatspell/tiny/server/utils';
import type { HandleServerError } from '@sveltejs/kit/hooks';
import { NoResultError } from 'kysely';

export const handle = createHandle({
  dir: STORAGE_ROOT,
  users: {
    secret: USERS_SECRET,
    roles: {
      admin: 'admin',
      default: 'subscriber',
    },
  },
  files: {
    thumbnails: {
      '100x100': jpeg({ size: 100 }),
      '1024x1024': jpeg({ size: 1024 }),
      '2048x2048': jpeg({ size: 2048 }),
    },
  },
  logger: createBasicLogger(),
});

export const handleError: HandleServerError = async ({ error }) => {
  if (error instanceof NoResultError) {
    return {
      status: 404,
      message: 'Not found',
    };
  }
  return error;
};

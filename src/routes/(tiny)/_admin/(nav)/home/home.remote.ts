import * as v from 'valibot';
import { getDatabase, getFiles } from '#lib/services.js';
import { command, query } from '$app/server';
import { uid } from '@ampatspell/tiny/server/utils';
import type { QueryResponse } from '@ampatspell/tiny/utils/utils';
import { NotBlankSchema } from '@ampatspell/tiny/utils/schema';
import { hasValues, omit } from '@ampatspell/tiny/utils/object';
import { assertRole } from '@ampatspell/tiny/server/users/request-event';

export const getHome = query(async () => {
  const db = getDatabase();
  let record = await db.selectFrom('home').selectAll().executeTakeFirst();
  if (!record) {
    record = await db
      .insertInto('home')
      .values({
        id: uid(),
        title: 'maybe',
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  let background;
  if (record.backgroundId) {
    background = await getFiles().file(record.backgroundId).load();
  }

  return { ...record, background };
});

export type HomeData = QueryResponse<typeof getHome>;

export const updateHome = command(
  v.strictObject({
    title: v.optional(NotBlankSchema),
    background: v.optional(
      v.strictObject({
        file: v.optional(v.file()),
      }),
    ),
  }),
  async (params) => {
    await assertRole('admin');

    const db = getDatabase();

    const props = omit(params, ['background']);
    if (hasValues(props)) {
      await db.updateTable('home').set(props).execute();
    }

    if (params.background) {
      const record = await db.selectFrom('home').select(['backgroundId']).executeTakeFirstOrThrow();
      await getFiles().replace({
        prev: record.backgroundId,
        file: params.background.file,
        update: (backgroundId) => db.updateTable('home').set({ backgroundId }).execute(),
      });
    }

    getHome().refresh();
  },
);

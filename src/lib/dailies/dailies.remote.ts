import * as v from 'valibot';
import { getDatabase, getFiles } from '#lib/services.js';
import { command, query } from '$app/server';
import type { QueryResponse } from '@ampatspell/tiny/utils/utils';
import { uid } from '@ampatspell/tiny/server/utils';
import { hasValues, omit } from '@ampatspell/tiny/utils/object';
import { assertRole } from '@ampatspell/tiny/server/users/request-event';
import { isTruthy } from '@ampatspell/tiny/utils/array';

export const getDailies = query(v.strictObject({ files: v.boolean() }), async (props) => {
  const db = getDatabase();
  const records = await db.selectFrom('dailies').selectAll().orderBy('date', 'desc').execute();
  let files = undefined;
  if (props.files) {
    files = await getFiles()
      .files(records.map((record) => record.fileId).filter(isTruthy))
      .load();
  }
  return records.map((record) => {
    const file = files?.find((file) => file.id === record.fileId);
    return { ...record, file };
  });
});

export type DailySummaryData = QueryResponse<typeof getDailies>[number];

export const getDaily = query(v.strictObject({ id: v.string() }), async ({ id }) => {
  const db = getDatabase();
  const record = await db.selectFrom('dailies').where('id', '==', id).selectAll().executeTakeFirstOrThrow();
  let file;
  if (record.fileId) {
    file = await getFiles().file(record.fileId).load();
  }
  return { ...record, file };
});

export type DailyData = QueryResponse<typeof getDaily>;

export const addDaily = command(v.strictObject({ date: v.string() }), async ({ date }) => {
  await assertRole('admin');

  const db = getDatabase();
  const { count } = await db
    .selectFrom('dailies')
    .select(db.fn.countAll<number>().as('count'))
    .executeTakeFirstOrThrow();
  const number = count + 1;
  await db.insertInto('dailies').values({ id: uid(), number, caption: '', date }).execute();

  getDailies({ files: true }).refresh();
  getDailies({ files: false }).refresh();
});

export const updateDaily = command(
  v.strictObject({
    id: v.string(),
    caption: v.optional(v.string()),
    number: v.optional(v.number()),
    date: v.optional(v.string()),
    file: v.optional(v.strictObject({ file: v.optional(v.file()) })),
  }),
  async (params) => {
    await assertRole('admin');

    const db = getDatabase();
    const props = omit(params, ['id', 'file']);
    const { id, file } = params;
    if (hasValues(props)) {
      await db.updateTable('dailies').set(props).where('id', '==', id).execute();
    }
    if (file) {
      const { fileId } = await db
        .selectFrom('dailies')
        .select(['fileId'])
        .where('id', '==', id)
        .executeTakeFirstOrThrow();
      await getFiles().replace({
        prev: fileId,
        file: file.file,
        update: (fileId) => db.updateTable('dailies').set({ fileId }).where('id', '==', id).execute(),
      });
    }

    getDailies({ files: true }).refresh();
    getDailies({ files: false }).refresh();
    getDaily({ id }).refresh();
  },
);

export const destroyDaily = command(v.strictObject({ id: v.string() }), async ({ id }) => {
  await assertRole('admin');

  await getDatabase().deleteFrom('dailies').where('id', '==', id).executeTakeFirstOrThrow();
  getDailies({ files: true }).refresh();
  getDailies({ files: false }).refresh();
});

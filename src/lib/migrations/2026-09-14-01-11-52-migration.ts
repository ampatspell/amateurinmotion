/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable('dailies')
    .addColumn('id', 'text', (col) => col.notNull().primaryKey())
    .addColumn('number', 'integer', (col) => col.notNull())
    .addColumn('caption', 'text', (col) => col.notNull())
    .addColumn('date', 'text', (col) => col.notNull())
    .addColumn('file_id', 'text', (col) => col.references('files.id'))
    .execute();
};

import { getDatabase, getUsers } from '#lib/services.js';
import { command, query } from '$app/server';
import { assertRole } from '@ampatspell/tiny/server/users/request-event';
import { NotBlankSchema, RequiredEmailSchema } from '@ampatspell/tiny/utils/schema';
import type { QueryResponse } from '@ampatspell/tiny/utils/utils';
import * as v from 'valibot';

const selectFromUsers = () => {
  return getDatabase().selectFrom('users').select(['id', 'email', 'role']);
};

export const getAllUsers = query(async () => {
  await assertRole('admin');

  return await selectFromUsers().execute();
});

export type UserData = QueryResponse<typeof getAllUsers>[number];

export const getUserById = query(v.strictObject({ id: v.string() }), async ({ id }) => {
  await assertRole('admin');

  return await selectFromUsers().where('id', '==', id).executeTakeFirstOrThrow();
});

export const updateUser = command(
  v.strictObject({
    id: v.string(),
    email: v.optional(RequiredEmailSchema),
    password: v.optional(NotBlankSchema),
    role: v.optional(NotBlankSchema),
  }),
  async (props) => {
    await assertRole('admin');

    await getUsers().update(props);
    getAllUsers().refresh();
    getUserById({ id: props.id }).refresh();
  },
);

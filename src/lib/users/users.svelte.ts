import { useBroadcastChannel } from '@ampatspell/tiny/broadcast';
import { withDataFields } from '@ampatspell/tiny/fields/index';
import { optionalPassword, requiredEmail } from '@ampatspell/tiny/fields/models/validator';
import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { sentenceCase } from '@ampatspell/tiny/utils/string';
import { updateUser, type UserData } from './users.remote.ts';
import { roles } from '../../hooks.ts';

export type UseUserModelOptions = {
  data: UserData;
};

export const useUserModel = (_opts: OptionsInput<UseUserModelOptions>) => {
  const opts = options(_opts);
  const data = $derived(opts.data);
  const id = $derived(data.id);

  const broadcast = useBroadcastChannel();

  const fields = withDataFields({
    data: getter(() => ({ ...data, password: '' })),
  }).define(({ string, dropdown }) => {
    const items = roles.map((role) => {
      return { role, label: sentenceCase(role) };
    });
    return {
      email: string('email', { validator: requiredEmail }),
      role: dropdown('role', { items, identifier: 'role' }),
      password: string('password', {
        label: 'New password',
        description: 'Leave blank to keep the current one',
        validator: optionalPassword,
        type: 'password',
      }),
    };
  });

  const save = async () => {
    if (fields.touch()) {
      const dirty = fields.serialized.dirty;
      if (dirty) {
        await updateUser({ id, ...dirty });
        fields.rollback();
        broadcast.notifyDidSave();
      }
    }
  };

  return fields.asEditable({
    save,
    title: getter(() => data.email),
  });
};

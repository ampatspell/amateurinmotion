import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateHome, type HomeData } from './home.remote';
import { withDataFields } from '@ampatspell/tiny/fields/index';
import { resolve } from '$app/paths';
import { notBlank } from '@ampatspell/tiny/fields/models/validator';
import { useFiles } from '@ampatspell/tiny/files';
import { images } from '@ampatspell/tiny/utils/utils';
import { useBroadcastChannel } from '@ampatspell/tiny/broadcast';

export const useHome = (_opts: OptionsInput<{ data: HomeData }>) => {
  const opts = options(_opts);
  const files = useFiles();
  const broadcast = useBroadcastChannel();

  const data = $derived.by(() => {
    return {
      ...opts.data,
      background: files.asRemote(opts.data.background),
    };
  });

  const fields = withDataFields({ data: getter(() => data) }).define(({ file, string }) => {
    return {
      title: string('title', { validator: notBlank }),
      background: file('background', { variant: '1024x1024', accept: images }),
    };
  });

  const save = async () => {
    if (fields.touch()) {
      const dirty = fields.serialized.dirty;
      if (dirty) {
        await updateHome(dirty);
        broadcast.notifyDidSave();
      }
    }
  };

  const title = $derived(data.title);
  const route = resolve('/(tiny)');

  return fields.asEditable({
    save,
    title: getter(() => title),
    route,
  });
};

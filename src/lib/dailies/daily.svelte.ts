import { Temporal } from 'temporal-polyfill';
import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { addDaily, destroyDaily, updateDaily, type DailyData, type DailySummaryData } from './dailies.remote';
import { withDataFields } from '@ampatspell/tiny/fields/index';
import { useFiles } from '@ampatspell/tiny/files';
import { images } from '@ampatspell/tiny/utils/utils';
import { lastObject } from '@ampatspell/tiny/utils/array';
import { START } from '$app/env/public';
import { useBroadcastChannel } from '@ampatspell/tiny/broadcast';

export const useDaily = (_opts: OptionsInput<{ data: DailyData }>) => {
  const opts = options(_opts);
  const files = useFiles();
  const broadcast = useBroadcastChannel();
  const data = $derived(opts.data);
  const id = $derived(data.id);

  const fields = withDataFields({
    data: getter(() => {
      return {
        ...data,
        file: files.asRemote(opts.data.file),
      };
    }),
  }).define(({ string, date, file, number }) => {
    return {
      number: number('number'),
      caption: string('caption'),
      date: date('date'),
      file: file('file', { accept: images, variant: '1024x1024' }),
    };
  });

  const save = async () => {
    if (fields.touch()) {
      const dirty = fields.serialized.dirty;
      if (dirty) {
        await updateDaily({ id, ...dirty });
        broadcast.notifyDidSave();
      }
    }
  };

  const destroy = async () => {
    await destroyDaily({ id });
    broadcast.notifyDidSave();
  };

  const title = $derived(`#${data.number}`);

  return fields.asEditable({
    title: getter(() => title),
    save,
    destroy,
  });
};

export const useAddDaily = (_opts: OptionsInput<{ data: DailySummaryData[] }>) => {
  const opts = options(_opts);
  const broadcast = useBroadcastChannel();
  const limit = 7;
  let missing = $state<string[]>([]);

  const update = () => {
    const now = Temporal.Now.instant().toZonedDateTimeISO('Europe/Riga');
    const next: string[] = [];
    for (let days = 0; days < limit; days++) {
      const date = now.subtract({ days }).toPlainDate();
      const string = date.toJSON();
      if (!opts.data.find((entry) => entry.date === string)) {
        next.push(string);
      }
      if (string === START) {
        break;
      }
    }
    missing = next;
  };

  $effect(() => {
    update();
  });

  $effect(() => {
    const interval = setInterval(() => update(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const isDisabled = $derived(missing.length === 0);

  const onAdd = async () => {
    const date = lastObject(missing);
    if (date) {
      await addDaily({ date });
      broadcast.notifyDidSave();
    }
  };

  return {
    isDisabled: getter(() => isDisabled),
    onAdd,
  };
};

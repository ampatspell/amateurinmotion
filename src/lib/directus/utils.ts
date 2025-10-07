import { page } from '$app/state';
import { setAttr as baseSetAttr } from '@directus/visual-editing';

interface SetAttrOptions {
  collection: string;
  item: string | number;
  fields?: string | string[];
  mode?: 'modal' | 'popover' | 'drawer';
}

export const setAttr = (opts: SetAttrOptions) => {
  if (page.data.visualEditingEnabled) {
    return baseSetAttr({
      ...opts,
    });
  }
  return undefined;
};

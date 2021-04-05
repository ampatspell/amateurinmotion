import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export const page = async (route, name, opts) => {
  let owner = getOwner(route);
  let file = owner.lookup('service:content').file(name);
  assert(`file '${name}' doesn't exist`, !!file);
  let model = owner.lookup('service:models').create(`content/pages/page`, { file, opts });
  await model.load();
  return model;
}

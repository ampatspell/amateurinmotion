import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export const file = async (route, name) => {
  let owner = getOwner(route);
  let file = owner.lookup('service:files').file(name);
  assert(`file '${name}' doesn't exist`, !!file);
  let model = owner.lookup('service:models').create('content/basic', { file });
  await model.load();
  return model;
}

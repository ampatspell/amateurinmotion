import Model from '../-model';
import { reads } from "macro-decorators";
import { remark } from 'remark/decorators';

const file = key => reads(`file.${key}`);
const attr = key => file(`attributes.${key}`);

export {
  remark,
  file,
  attr
};

export default class Base extends Model {

  constructor(owner, { file, opts }) {
    super(owner);
    this.file = file;
    this.opts = opts ?? {};
  }

  @file('body') body;

  async load() {
    await this.file.load();
    await this.tree?.load();
    return this;
  }

}

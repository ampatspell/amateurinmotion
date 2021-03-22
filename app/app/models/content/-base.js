import Model from '../-model';
import { reads } from "macro-decorators";
import { remark } from '../../util/remark';

const file = key => reads(`file.${key}`);
const attr = key => file(`attributes.${key}`);

export {
  remark,
  file,
  attr
};

export default class Base extends Model {

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  @file('body') body;

  async load() {
    await this.file.load();
    return this;
  }

}

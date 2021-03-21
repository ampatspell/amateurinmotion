import Model from './model';
import { reads } from "macro-decorators";

const file = key => reads(`file.${key}`);
const attr = key => file(`attributes.${key}`);

export default class Page extends Model {

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  @attr('slug') slug;
  @attr('title') title;
  @attr('date') date;
  @file('body') body;

  async load() {
    await this.file.load();
    return this;
  }

}

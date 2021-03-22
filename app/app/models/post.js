import Model from './model';
import { reads } from "macro-decorators";

const file = key => reads(`file.${key}`);
const attr = key => file(`attributes.${key}`);

export default class Post extends Model {

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') date;
  @file('body') body;

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

  async load() {
    await this.file.load();
    return this;
  }

}

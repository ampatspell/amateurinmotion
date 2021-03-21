import Model from './model';
import { reads } from "macro-decorators";

const file = key => reads(`file.${key}`);
const attr = key => file(`attributes.${key}`);

export default class Project extends Model {

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  @file('body') body;
  @attr('slug') slug;
  @attr('title') title;
  @attr('website') website;

  async load() {
    await this.file.load();
    return this;
  }

}

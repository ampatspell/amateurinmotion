import Base, { attr, remark } from '../-base';

export default class Post extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') date;

  @remark('body') tree;

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

}

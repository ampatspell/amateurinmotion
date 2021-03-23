import Base, { attr, remark } from '../-base';
import { date, datetime } from '../../../util/datetime';

export default class Post extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') _date;

  @datetime('_date', 'dd.MM.yyyy') datetime;
  @date('datetime') date;

  @remark('body') tree;

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

}

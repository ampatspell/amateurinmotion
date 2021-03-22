import Base, { attr, remark } from '../-base';

export default class Page extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('date') date;

  @remark('body') tree;

}

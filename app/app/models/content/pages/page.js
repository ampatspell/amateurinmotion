import Base, { attr } from '../-base';

export default class Page extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('date') date;

}

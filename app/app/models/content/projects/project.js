import Base, { attr, remark } from '../-base';

export default class Project extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('website') website;

  @remark('body') tree;

}

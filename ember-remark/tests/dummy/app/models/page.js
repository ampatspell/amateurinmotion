import Model from 'ember-remark/models/model';
import { remark } from 'ember-remark/util/remark';

export default class Page extends Model {

  constructor(owner, { file }) {
    super(owner);
    this.file = file;
  }

  get body() {
    return this.file.body;
  }

  @remark('body')
  tree(node) {
    return node;
  }

}

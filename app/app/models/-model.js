import { setOwner } from '@ember/application';

export default class Model {

  constructor(owner) {
    setOwner(this, owner);
  }

}

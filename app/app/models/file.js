import { setOwner } from '@ember/application';

export default class File {

  constructor(owner) {
    setOwner(this, owner);
  }

}

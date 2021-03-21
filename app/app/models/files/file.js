import { setOwner } from '@ember/application';

export default class File {

  constructor(owner, { files, name, type }) {
    setOwner(this, owner);
    this.files = files;
    this.name = name;
    this.type = type;
  }

  _load() {}
  _metadata() {}

  async _loadFile() {
    await this.files._loadModel(this);
    return this;
  }

  load() {
    let promise = this._loadFilePromise;
    if(!promise) {
      promise = this._loadFile();
      this._loadFilePromise = promise;
    }
    return promise;
  }

}

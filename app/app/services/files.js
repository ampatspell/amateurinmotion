import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default class FilesService extends Service {

  @service assetMap;

  prefix = 'content';
  all = null;

  async _loadModels() {
    let { json } = await this._createModel('metadata', 'metadata.json').load();
    let all = [];
    for(let name in json) {
      let metadata = json[name];
      let model = this._createModel(metadata.type, name);
      model._metadata(metadata);
      all.push(model);
    }
    this.all = all;
  }

  async load() {
    await this.assetMap.load();
    await this._loadModels();
  }

  _createModel(type, name) {
    let owner = getOwner(this);
    let factory = owner.factoryFor(`model:files/${type}`)?.class;
    assert(`Model for type '${type}' not registered`, !!factory);
    return new factory(owner, { files: this, name, type });
  }

  async _fetch(name) {
    let filename = `${this.prefix}/${name}`;
    filename = this.assetMap.resolve(filename);
    let res = await fetch(filename);
    if(res.status === 404) {
      throw new Error(`${filename} was not found`);
    }
    return res;
  }

  async _loadModel(model) {
    let { name } = model;
    let res = await this._fetch(name);
    await model._load(res);
  }

  // let file = await this.files.file('hello.md').load();
  file(name) {
    return this.all.find(file => file.name === name);
  }

}

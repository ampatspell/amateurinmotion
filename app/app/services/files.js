import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { tracked } from "@glimmer/tracking";
import { cached } from "tracked-toolbox";
import { sortedBy } from '../util/array';

export default class FilesService extends Service {

  @service assetMap;
  @service models;

  prefix = 'content';
  @tracked all = null;

  @cached
  get sorted() {
    return sortedBy(this.all, file => file.metadata?.position);
  }

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
    return this.models.create(`files/${type}`, { files: this, name, type });
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

  filter(cb) {
    return this.sorted.filter(cb);
  }

}

import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { getOwner } from '@ember/application';
import { cached } from "tracked-toolbox";

class Type {

  constructor(service, type, prefix) {
    this.service = service;
    this.type = type;
    this.prefix = prefix;
  }

  load(filename) {
    return this.service.load(this.type, `${this.prefix}/${filename}`);
  }

}

const type = (target, key) => cached(target, key, {
  get() {
    return new Type(this, key, 'content');
  }
});

export default class FilesService extends Service {

  @service assetMap;

  async load(type, filename) {
    filename = this.assetMap.resolve(filename);
    let res = await fetch(filename);
    if(res.status === 404) {
      throw new Error(`${filename} was not found`);
    }
    let text = await res.text();
    let owner = getOwner(this);
    let factory = owner.factoryFor(`model:file/${type}`).class;
    return new factory(owner, { text });
  }

  @type metadata;
  @type markdown;

}

import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { getOwner } from '@ember/application';

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

}

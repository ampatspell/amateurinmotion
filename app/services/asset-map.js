import fetch from 'fetch';
import Service from '@ember/service';
import config from '../config/environment';

export default class AssetMapService extends Service {

  didLoad(json) {
    this.json = json;
  }

  async load() {
    if(config.environment !== 'production') {
      this.didLoad(null);
      return;
    }

    let res = await fetch('/assets/assetMap.json');
    if(res.status === 404) {
      throw new Error('assetMap.json was not found');
    }

    let json = await res.json();
    this.didLoad(json);
  }

  resolve(name) {
    let { json } = this;
    if(!json) {
      return name;
    }
    let resolved = json.assets[name];
    if(!resolved) {
      throw new Error(`'${name}' was not found in assetMap.json`);
    }
    return resolved;
  }

}

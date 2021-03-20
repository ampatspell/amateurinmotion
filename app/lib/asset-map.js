import fetch from 'fetch';

let promise;

const _fetch = async () => {
  let res = await fetch('/assets/assetMap.json');
  if(res.status === 404) {
    return null;
  }
  return await res.json();
}

export const fetchAssetMap = () => {
  if(!promise) {
    promise = _fetch();
  }
  return promise;
}

export const resolveName = async name => {
  let assetMap = await fetchAssetMap();
  if(!assetMap) {
    return name;
  }
  let mapped = assetMap.assets[name];
  if(!mapped) {
    throw new Error(`'${name}' was not found in asset map`);
  }
  return mapped;
}

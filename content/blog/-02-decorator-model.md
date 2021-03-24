---
slug: 02-decorator-model
title: Decorator model
intro: WIP
date: 24.03.2021
notes:
  - Ember.js v3.25.1
---

``` javascript
let INSTANCES = new WeakMap();

export const getInstance = (target, key, cb) => {
  let instances = INSTANCES.get(target);
  if(!instances) {
    instances = {};
    INSTANCES.set(target, instances);
  }
  let instance = instances[key];
  if(!instance) {
    instance = cb();
    instances[key] = instance;
  }
  return instance;
}
```

``` javascript
class Hamster {

  constructor(target) {
    this.target = target;
  }

}

const getHamster = (target, key) => getInstance(target, key, () => new Hamster(target));

export const hamster = (_, key) => {
  return {
    get() {
      return getHamster(this, key);
    }
  }
}
```

``` javascript
export default class Thing {

  @hamster hamster;

}
```

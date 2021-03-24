---
slug: 02-decorator-model
title: Decorator model
intro: WIP
date: 24.03.2021
notes:
  - Ember.js v3.25.1
---

* Lazy initialized
* Constructor can start async work
* alternative to classes instantiated in constructor

``` js
constructor() {
  super(...arguments);
  this.hamster = new Hamster(this);
}
```

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
};
```

``` javascript
class Hamster {

  @tracked isLoading = true;
  @tracked isLoaded = false;
  @tracked isError = false;
  @tracked error = null;
  @tracked data = null;

  constructor(target, opts) {
    this.target = target;
    this.opts = opts;
    this.promise = this._load();
  }

  get url() {
    let { opts: { path }, target } = this;
    let components = path.split('/');
    // …
    return components.join('/');
  }

  async _load() {
    try {
      let res = await fetch(this.url);
      let data = await res.json();
      assign(this, { isLoaded: true, isLoading: false, data });
    } catch(error) {
      assign(this, { isLoaded: false, isLoading: false, isError: true, error });
      throw error;
    }
  }

  // set(value) {
  // }

}

export const hamster = path => (_, key) => {
  let getHamster => target => getInstance(target, key, () => new Hamster(target, { path }));
  return {
    get() {
      return getHamster(this);
    },
    // set(value) {
    //   getHamster(this).set(value);
    // }
  }
};
```

``` javascript
export default class Article {

  @fetch('/articles/:id') resource;

  @reads('resource.data.title') title;

}
```

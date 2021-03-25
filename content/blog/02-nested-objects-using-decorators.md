---
slug: 02-nested-objects-using-decorators
title: Nested objects using decorators
intro: Tip on how to use decorators to initialize nested objects
date: 25.03.2021
notes:
  - Ember.js v3.25.1
---

For the most part I've been initializing nested objects like this:

``` javascript
class Room {

  constructor() {
    super(...arguments);
    hamster(this);
  }

}
```

where `hamster` is setup is:

``` js
class Hamster {

  constructor(parent) {
    this.parent = parent;
  }

  squeek() {
  }

}

export const hamster = parent => {
  parent.hamster = new Hamster(parent);
}
```

While this works just fine, it has some drawbacks:

* `Hamster` is initialized when parent instance is
* parent instance always needs constructor
* there is no something like a lifecycle hook for 1st access which can trigger async work

One of the alternatives is lazy initialized getter:

``` js
class Room {

  get hamster() {
    if(!this._hamster) {
      this._hamster = new Hamster(this);
    }
    return this._hamster;
  }

}
```

But the drawback are verbosity and additional `_hamster` property.

We can do better.

We have decorators.

So, let's figure out the API first:

``` js
class Room {

  @hamster hamster;

}
```

Looks good, isn't it?

Now let's make it happen.

# Decorator

Let's start with a basic getter which uses `_hamster` property for cache:

``` js
// util/hamster.js
export const hamster = (target, key, descriptor) => {
  let _key = `_${key}`;
  return {
    get() {
      if(!this[_key]) {
        this._key = new Hamster(this);
      }
      return this._key;
    }
  };
};
```

With that we're still setting `_hamster` property which we'll get rid of in a bit, but one of the benefits are already there – when `Hamster` is instantiated, it's has been accessed for the first time, so that can be a perfect place to start any necessary async work.

But we can do even better.

# getInstance helper

Let's add a helper which keeps `Hamster` instances outside of the parent class:

``` js
// util/get-instance.js
// import { associateDestroyableChild } from '@ember/destroyable';

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
    // if(instance) {
    //   associateDestroyableChild(targert, instance);
    // }
    instances[key] = instance;
  }
  return instance;
};
```

Now let's refactor previous decorator to use it:

``` js
// util/hamster.js
import { getInstance } from './get-instance';

export const hamster = (_target, key, _descriptor) => {
  let getHamster = target => getInstance(target, key, () => new Hamster(target));
  return {
    get() {
      return getHamster(this);
    }
  };
};
```

Clean, isn't it? And we're basically done.

``` js
class Room {
  @hamster hamster;
}

let room = new Room();
room.hamster === room.hamster // → true
room.parent === room // → true
room.hamster.squeek();
```

`Hamster` instance will go out of scope when `Room` goes. If necessary, use [`associateDestroyableChild`](https://api.emberjs.com/ember/3.25/functions/@ember%2Fdestroyable/associateDestroyableChild) in `get-instance` to call `hamster.destroy()` when `Room` is destroyed.

# Async fetch decorator example

And here is more elaborate example where this can be useful:

``` javascript
class Fetch {

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

  // replaces '/articles/:id` with `/articles/${target.id}`
  get url() {
    let { opts: { path }, target } = this;
    return path.split('/').map(component => {
      if(component.startsWith(':')) {
        let key = component.substr(1);
        return target[key];
      }
      return component;
    }).join('/');
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

export const fetch = path => (_, key) => {
  let getFetch => target => getInstance(target, key, () => new Fetch(target, { path }));
  return {
    get() {
      return getFetch(this);
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

  constructor(id) {
    this.id = id;
  }

}
```

``` js
let article = new Article('zeeba');

article.resource.isLoading // → true

await article.resource.promise;

article.resource.isLoading // → false
article.resource.isLoaded // → true
article.title // → "Huluu, zeeba neighba"
```

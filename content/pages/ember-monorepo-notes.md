---
title: Ember.js monorepo with engines
---

* [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
* [ember-engines](https://ember-engines.com/)

# Workspace

``` json
// mono/package.json
{
  "name": "@mono/monorepo",
  "private": true,
  "workspaces": [
    "./thing",
    "./design",
    "./editor"
  ]
}
```

* `thing` → host app
* `design` → addon
* `editor` → engine addon

# Host app

``` bash
$ ember new @mono/thing --skip-npm
```

``` json
"devDependencies": {
  "@mono/design": "0.0.0",
  "@mono/editor": "0.0.0",
  "ember-engines": "0.8.12",
}
```

``` hbs
{{!-- app/templates/index.hbs --}}
{{mount "@mono/editor"}}
```

# Design addon

``` bash
$ ember addon @mono/design --skip-npm
```

# Engine

``` bash
$ ember addon @mono/editor --skip-npm
```

``` json
"dependencies": {
  "@mono/design": "0.0.0"
},
"devDependencies": {
  "ember-engines": "0.8.12",
}
```

``` js
// index.js
const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: require('./package').name,
  // lazyLoading: {
  //   enabled: false
  // }
});
```

``` js
// config/environment.js
module.exports = function (environment) {
  const ENV = {
    modulePrefix: '@mono/editor',
    environment: environment,
  };
  return ENV;
};
```

``` js
// addon/engine.js
import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from './config/environment';

const { modulePrefix } = config;

export default class EditorEngine extends Engine {
  modulePrefix = modulePrefix;
  Resolver = Resolver;
}

loadInitializers(EditorEngine, modulePrefix);
```

``` js
// addon/routes.js
import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
});
```

``` hbs
{{!-- addon/templates/application.hbs --}}
<div class="row">Hey there. This is editor</div>
<div class="row"><Design::Button @value="Click me"/></div>
```

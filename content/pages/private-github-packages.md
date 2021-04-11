---
title: Private GitHub package usage in Firebase Functions
---

# Environment

``` text
# ~/.zshrc
export GITHUB_TOKEN="<token>"
```

Personal access token with `write:packages` permission.

``` text
# ~/.npmrc
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

# Thingie

``` json
// package.json
{
  "name": "@ampatspell/thingie",
  "version": "1.0.3",
  "publishConfig": {
    "registry":"https://npm.pkg.github.com"
  },
  "repository":"https://github.com/ampatspell/test"
}
```

``` bash
npm publish
```

# Firebase app

``` json
{
  "private": true,
  "dependencies": {
    "@ampatspell/thingie": "^1.0.3",
  }
}
```

``` json
// firebase.json
{
  "functions": {
    "predeploy": [
      "node ./generate"
    ]
  }
}
```

``` js
// generate.js
let token = process.env.GITHUB_TOKEN;
let prefix = 'ampatspell';

let content = [
  `//npm.pkg.github.com/:_authToken=${token}`,
  `@${prefix}:registry=https://npm.pkg.github.com`,
  'always-auth=true'
].join('\n');

let fs = require('fs');
let path = require('path');

fs.writeFileSync(path.join(__dirname, 'functions/.npmrc'), content);
```

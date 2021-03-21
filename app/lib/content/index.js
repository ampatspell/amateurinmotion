'use strict';

const funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const glob = require('glob');
const matter = require('front-matter');
const fs = require('fs');

let buildIndex = async dir => {
  let files = glob.sync('**/*.+(md|png|jpg)', { cwd: dir, nodir: true });
  let hash = {};
  files.forEach(file => {
    let meta = {};
    if(file.endsWith('.md')) {
      let content = fs.readFileSync(path.join(dir, file), 'utf-8');
      let { attributes } = matter(content);
      meta.attributes = attributes;
    }
    hash[file] = meta;
  });
  return `${JSON.stringify(hash, null, 2)}\n`;
}

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
  treeForPublic() {
    let dir = path.join(__dirname, '..', '..', '..', 'content');
    let content = funnel(dir, {
      destDir: 'content',
      include: [ '**/*.{md,png}' ]
    });
    let index = writeFile('content/index.json', buildIndex(dir));
    return mergeTrees([ content, index ]);
  }
};

'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const metadata = require('./lib/metadata');

const extensions = [ 'md', 'png', 'jpg' ];

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
  treeForPublic() {
    let dir = path.join(__dirname, '..', 'content');
    console.log({ dir });
    let content = funnel(dir, {
      destDir: 'content',
      include: [ `**/*.{${extensions.join(',')}}` ]
    });
    let index = writeFile('content/metadata.json', metadata(dir, extensions));
    return mergeTrees([ content, index ]);
  }
};

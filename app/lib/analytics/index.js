'use strict';

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
  contentFor(name, config) {
    if(name !== 'analytics') {
      return;
    }
    let key = config.analytics?.ga;
    if(!key) {
      return '<!-- no analytics.ga -->';
    }
    let template = require('fs').readFileSync(require('path').join(__dirname, 'ga.txt'), 'utf-8');
    return template.replace(/\{\{key\}\}/g, key);
  }
};

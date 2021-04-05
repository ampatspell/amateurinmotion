'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const defaultFingerprintExtensions = require('broccoli-asset-rev/lib/default-options').extensions;

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'app/components'
      ]
    },
    'ember-remark': {
      collections: {
        content: '../content'
      }
    },
    fingerprint: {
      extensions: [ ...defaultFingerprintExtensions, 'md', 'json' ],
      generateAssetMap: true
    }
  });

  return app.toTree();
};

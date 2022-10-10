/* eslint-disable no-console */

const https = require('https');
const fs = require('fs');

const CDN_HOST = 'https://cdn.rudderlabs.com';
const SDK_VERSION = 'v1.1';

const download = (filename, url) => {
  console.log('Downloading SDK...');
  const file = fs.createWriteStream(filename);
  const request = https.get(url, (response) => response.pipe(file));

  if (request) {
    console.log('Done');
  }
};

download('__mocks__/rudder-analytics.min.js', `${CDN_HOST}/${SDK_VERSION}/rudder-analytics.min.js`);

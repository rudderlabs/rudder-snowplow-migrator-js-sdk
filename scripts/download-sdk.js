/* eslint-disable no-console */

const https = require('https');
const fs = require('fs');

const CDN_URL = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js';

const download = (filename, url) => {
  console.log('Downloading SDK...');
  const file = fs.createWriteStream(filename);
  const request = https.get(url, (response) => response.pipe(file));

  if (request) {
    console.log('Done');
  }
};

download('__mocks__/rudder-analytics.min.js', `${CDN_URL}/rudder-analytics.min.js`);

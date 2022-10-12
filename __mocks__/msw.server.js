import { setupServer } from 'msw/node';
import { rest } from 'msw';
import fs from 'fs';
import path from 'path';
import { dummyDataplaneHost, sourceConfigResponse } from './fixtures';

const sdkFileBody = fs.readFileSync(path.resolve(__dirname, 'rudder-analytics.min.js'), 'utf8');

const server = setupServer(
  rest.post(`${dummyDataplaneHost}/v1/identify`, (req, res, ctx) => {
    return res(ctx.json(null));
  }),
  rest.post(`${dummyDataplaneHost}/v1/page`, (req, res, ctx) => {
    return res(ctx.json(null));
  }),
  rest.post(`${dummyDataplaneHost}/v1/track`, (req, res, ctx) => {
    return res(ctx.json(null));
  }),
  rest.get(`https://api.rudderlabs.com/sourceConfig`, (req, res, ctx) => {
    return res(ctx.json(sourceConfigResponse));
  }),
  // {
  //   url: `https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js`,
  //   response: () => sdkFileBody,
  //   status: 200,
  //   method: 'get',
  //   responseHeaders: {
  //       'Content-Type': 'application/javascript'
  //   },
  // }
);

export { server };

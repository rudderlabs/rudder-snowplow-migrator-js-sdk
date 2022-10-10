/* eslint-disable no-promise-executor-return */

import { advanceTo } from 'jest-date-mock';
import { server } from '../__mocks__/msw.server';
import {
  dummyDataplaneHost,
  dummyInitOptions,
  dummyWriteKey,
  identifyRequestPayload,
  pageRequestPayload,
  trackRequestPayload,
} from '../__mocks__/fixtures';
import { snowplowAdapter } from '../src/index';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('JS SDK Snowplow Adapter', () => {
  let snowplowAdapterClient = null;
  let requestBody;

  beforeAll(async () => {
    advanceTo(new Date(2022, 1, 21, 0, 0, 0));
    server.listen({
      onUnhandledRequest: 'error',
    });

    snowplowAdapterClient = snowplowAdapter;
  });

  beforeEach(() => {
    server.events.on('request:start', (req) => {
      requestBody = req.body;
    });
  });

  afterEach(() => {
    server.resetHandlers();
    server.events.removeAllListeners();
    requestBody = null;
  });

  afterAll(() => {
    server.close();
  });

  it('Should append & initialise RudderStack SDK', async () => {
    expect(document.getElementsByTagName('script').length).toBe(2);
    expect(document.getElementsByTagName('script')[0].src).toContain('rudder-analytics.min.js');

    expect(window.rudderanalytics.methods.length).toBe(14);
    expect(typeof snowplowAdapterClient).toBe('function');
  });

  it('Should initialise with correct values by newTracker', () => {
    snowplowAdapterClient('newTracker', dummyWriteKey, dummyDataplaneHost, dummyInitOptions);
    const rudderAnalyticsInstance = window.rudderanalytics;

    expect(rudderAnalyticsInstance[0][0]).toBe('load');
    expect(rudderAnalyticsInstance[0][1]).toBe(dummyWriteKey);
    expect(rudderAnalyticsInstance[0][2]).toBe(dummyDataplaneHost);
    // TODO: possibly a bug, should it not contain all dummyInitOptions?
    expect(rudderAnalyticsInstance[0][3]).toStrictEqual({
      setCookieDomain: dummyInitOptions.cookieDomain,
      sameSiteCookie: dummyInitOptions.cookieSameSite,
      secureCookie: dummyInitOptions.cookieSecure,
    });
  });

  it('Should record setUserId', async () => {
    snowplowAdapterClient(
      'setUserId',
      identifyRequestPayload.userId,
      identifyRequestPayload.traits,
    );

    await new Promise((r) => setTimeout(r, 500));

    expect(requestBody.context.traits).toStrictEqual(identifyRequestPayload.traits);
    expect(requestBody.userId).toStrictEqual(identifyRequestPayload.userId);
  });

  it('Should record trackPageView', async () => {
    // TODO: seems like we mutate the nested objects these can cause bugs
    snowplowAdapterClient(
      'trackPageView',
      { title: pageRequestPayload.name },
      { ...pageRequestPayload.properties },
    );

    await new Promise((r) => setTimeout(r, 500));

    expect(requestBody.name).toStrictEqual(pageRequestPayload.name);
    expect(requestBody.properties).toEqual(expect.objectContaining(pageRequestPayload.properties));
  });

  it('Should record trackStructEvent', async () => {
    snowplowAdapterClient('trackStructEvent', {
      action: trackRequestPayload.event,
      properties: trackRequestPayload.properties,
    });

    await new Promise((r) => setTimeout(r, 500));

    expect(requestBody.event).toStrictEqual(trackRequestPayload.event);
    // TODO: this seems like a bug. should it only have the properties of properties value inside?
    expect(requestBody.properties).toEqual(expect.objectContaining(trackRequestPayload.properties));
  });

  it('Should record trackSelfDescribingEvent', async () => {
    snowplowAdapterClient('trackSelfDescribingEvent', {
      event: {
        data: { action: trackRequestPayload.event, properties: trackRequestPayload.properties },
      },
    });

    await new Promise((r) => setTimeout(r, 500));

    expect(requestBody.event).toStrictEqual(trackRequestPayload.event);
    // TODO: this seems like a bug. should it only have the properties of properties value inside?
    expect(requestBody.properties).toEqual(expect.objectContaining(trackRequestPayload.properties));
  });
});

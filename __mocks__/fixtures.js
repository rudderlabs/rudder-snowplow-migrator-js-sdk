const identifyRequestPayload = {
  userId: '123456',
  traits: {
    name: 'Name Username',
    email: 'name@website.com',
    plan: 'Free',
    friends: 21,
  },
};

const trackRequestPayload = {
  userId: '123456',
  event: 'Item Viewed',
  properties: {
    revenue: 19.95,
    shippingMethod: 'Premium',
  },
};

const pageRequestPayload = {
  userId: '12345',
  category: 'Food',
  name: 'Pizza',
  properties: {
    url: 'https://dummy-domain.com',
    title: 'Pizza',
    referrer: 'https://google.com',
  },
};

const dummyWriteKey = 'dummyWriteKey';

const dummyDataplaneHost = 'https://dummy.dataplane.host.com';

const dummyInitOptions = {
  timeout: false,
  flushAt: 1,
  flushInterval: 200000,
  maxInternalQueueSize: 1,
  logLevel: 'off',
  enable: true,
  cookieDomain: dummyDataplaneHost,
  cookieSameSite: 'true',
  cookieSecure: true,
};

const sourceConfigResponse = {
  isHosted: false,
  source: {
    config: { statsCollection: { errorReports: { enabled: false }, metrics: { enabled: false } } },
    liveEventsConfig: { eventUpload: false, eventUploadTS: 1665054624826 },
    id: 'bmvmcvzmvczvbmzvz',
    name: 'Dummy Test',
    writeKey: 'nmzcvbzmbkdhgfkfgeuerywi',
    enabled: true,
    sourceDefinitionId: '112345678901234567890',
    createdBy: '1hglhVZLCtJSKd6xBwPvjaexs9d',
    workspaceId: 'hfyjftdktdtdrykdsrysrtstj',
    deleted: false,
    transient: false,
    secretVersion: null,
    createdAt: '2021-03-19T20:33:26.858Z',
    updatedAt: '2022-10-06T11:10:24.836Z',
    connections: [],
    destinations: [],
    sourceDefinition: {
      options: null,
      config: null,
      configSchema: null,
      uiConfig: null,
      id: '112345678901234567890',
      name: 'Javascript',
      displayName: 'Javascript',
      category: null,
      createdAt: '2019-11-12T12:39:19.885Z',
      updatedAt: '2020-06-18T11:54:06.114Z',
    },
  },
};

export {
  identifyRequestPayload,
  trackRequestPayload,
  pageRequestPayload,
  dummyWriteKey,
  dummyInitOptions,
  dummyDataplaneHost,
  sourceConfigResponse,
};

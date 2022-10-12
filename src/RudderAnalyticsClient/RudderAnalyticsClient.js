/* eslint-disable class-methods-use-this */

import { mountRudderAnalytics } from './mountRudderAnalytics';

class RudderAnalyticsClient {
  constructor() {
    mountRudderAnalytics();
  }

  init(writeKey, dataplaneUrl, config) {
    window.rudderanalytics.load(writeKey, dataplaneUrl, config);
  }

  isLoaded() {
    return !!window.rudderanalytics;
  }

  page(...args) {
    window.rudderanalytics.page(...args);
  }

  identify(...args) {
    window.rudderanalytics.identify(...args);
  }

  track(...args) {
    window.rudderanalytics.track(...args);
  }
}

export { RudderAnalyticsClient };

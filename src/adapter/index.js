import get from 'get-value';
import Rudderanalytics from '../rs-js-sdk';
import Logger from '../utils/logger';

const logger = new Logger('RS-Snowplow-Adapter');
class RudderSnowplowAdapter {
  constructor() {
    logger.setLogLevel('WARN');
    this.rs = new Rudderanalytics();
  }

  processEvents(method, ...args) {
    switch (method) {
      case 'newTracker': {
        const [writeKey, dataplaneUrl, optionalConfig] = [...args];
        const { cookieDomain, cookieSameSite, cookieSecure } = { ...optionalConfig };
        const loadOptions = {};
        if (typeof cookieDomain === 'string') loadOptions.setCookieDomain = cookieDomain;
        if (typeof cookieSameSite === 'string') loadOptions.sameSiteCookie = cookieSameSite;
        if (typeof cookieSecure === 'boolean') loadOptions.secureCookie = cookieSecure;
        this.rs.init(writeKey, dataplaneUrl, loadOptions);
        const self = this;
        const interval = setInterval(() => {
          if (self.rs.isLoaded()) {
            clearInterval(interval);
          }
        });
        setTimeout(() => {
          clearInterval(interval);
        }, 10000);
        break;
      }
      case 'trackPageView': {
        let name;
        const [obj, properties] = [...args];
        if (obj && Object.prototype.hasOwnProperty.call(obj, 'title')) {
          name = obj.title;
        }
        this.rs.page(undefined, name, properties);
        break;
      }
      case 'setUserId': {
        const [userId, traits] = [...args];
        console.log('userId', userId);
        console.log('traits', traits);
        this.rs.identify(userId, traits);
        break;
      }
      case 'trackStructEvent': {
        const [properties] = [...args];
        const { action } = properties;
        if (!action) {
          logger.error('[RS Adapter]:: "action" is required');
          return;
        }
        this.rs.track(action, properties);
        break;
      }
      case 'trackSelfDescribingEvent': {
        const [eventObj] = [...args];
        const data = get(eventObj, 'event.data');
        const action = get(eventObj, 'event.data.action');
        if (!action) {
          logger.error('[RS Adapter]:: "action" is required');
          return;
        }
        this.rs.track(action, data);
        break;
      }
      default:
        logger.error('Invalid event');
    }
  }
}

const rudderSnowplowAdapter = new RudderSnowplowAdapter();
export { rudderSnowplowAdapter as Adapter };

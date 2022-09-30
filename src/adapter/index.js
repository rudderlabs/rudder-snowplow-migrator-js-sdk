import get from 'get-value';
import Rudderanalytics from '../rs-js-sdk';
import Logger from '../utils/logger';
import { isObject } from '../utils/utility';

const logger = new Logger();
class RudderSnowplowAdapter {
  constructor() {
    logger.setLogLevel('WARN');
    this.rs = new Rudderanalytics();
  }

  processEvents(method, ...args) {
    switch (method) {
      case 'newTracker': {
        try {
          const [writeKey, dataplaneUrl, optionalConfig] = [...args];
          const { cookieDomain, cookieSameSite, cookieSecure } = { ...optionalConfig };
          const loadOptions = {};
          if (typeof cookieDomain === 'string') loadOptions.setCookieDomain = cookieDomain;
          if (typeof cookieSameSite === 'string') loadOptions.sameSiteCookie = cookieSameSite;
          if (typeof cookieSecure === 'boolean') loadOptions.secureCookie = cookieSecure;
          this.rs.init(writeKey, dataplaneUrl, loadOptions);
        } catch (e) {
          logger.error(`[Adapter]:[newTracker]:: ${e.message}`);
        }
        break;
      }
      case 'trackPageView': {
        let name;
        try {
          const [obj, properties] = [...args];
          if (obj && Object.prototype.hasOwnProperty.call(obj, 'title')) {
            name = obj.title;
          }
          if (properties && !isObject(properties)) {
            logger.error('[Adapter]:: "properties" should be an Object');
            return;
          }
          this.rs.page(undefined, name, properties);
        } catch (e) {
          logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
        }
        break;
      }
      case 'setUserId': {
        try {
          const [userId, traits] = [...args];
          if (traits && !isObject(traits)) {
            logger.error('[Adapter]:: "traits" should be an Object');
            return;
          }
          this.rs.identify(userId, traits);
        } catch (e) {
          logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
        }
        break;
      }
      case 'trackStructEvent': {
        try {
          const [properties] = [...args];
          const { action } = properties;
          if (!action) {
            logger.error('[Adapter]:: "action" is required');
            return;
          }
          this.rs.track(action, properties);
        } catch (e) {
          logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
        }
        break;
      }
      case 'trackSelfDescribingEvent': {
        try {
          const [eventObj] = [...args];
          const data = get(eventObj, 'event.data');
          const action = get(eventObj, 'event.data.action');
          if (!action) {
            logger.error('[Adapter]:: "action" is required');
            return;
          }
          this.rs.track(action, data);
        } catch (e) {
          logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
        }
        break;
      }
      default:
        logger.error('Invalid event');
    }
  }
}

const rudderSnowplowAdapter = new RudderSnowplowAdapter();
export { rudderSnowplowAdapter as Adapter };

import get from 'get-value';
import Rudderanalytics from './rs-js-sdk';
import Logger from './utils/logger';
import { isObject } from './utils/utility';

const logger = new Logger();
class RudderSnowplowAdapter {
  constructor() {
    logger.setLogLevel('WARN');
    this.rs = new Rudderanalytics();
  }

  /**
   * A function to process all events
   * @param {string}    method    The type of the event
   * @param {...any}    args      Parameters passed tothat event
   */
  processEvents(method, ...args) {
    switch (method) {
      /**
       * Alias of load call
       */
      case 'newTracker': {
        try {
          const [writeKey, dataplaneUrl, optionalConfig] = [...args];
          if (!writeKey || !dataplaneUrl) {
            logger.error(`[Adapter]:[newTracker]:: Write key or Dataplane URL is missing.`);
            return;
          }
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
      /**
       * Alias of page call
       */
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
      /**
       * Alias of identify call
       */
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
      /**
       * Alias of track call
       */
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
      /**
       * Alias of track call
       */
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

const adapter = new RudderSnowplowAdapter();

const argumentsArray = window.rs;
const isValidArgsArray = Array.isArray(argumentsArray);
if (isValidArgsArray) {
  /**
   * Iterate the buffered API calls and start processing the events
   */
  let i = 0;
  const len = argumentsArray.length;
  while (i < len) {
    const event = argumentsArray.shift();
    adapter.processEvents(...event);
    i += 1;
  }
}

const processEvents = adapter.processEvents.bind(adapter);

export { processEvents as snowplowAdapter };

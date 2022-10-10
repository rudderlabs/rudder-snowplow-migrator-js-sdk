import get from 'get-value';
import { RudderAnalytics } from './rs-js-sdk';
import { Logger } from './utils/logger';
import { isObject } from './utils/utility';

// TODO: split the class to separate file
class RudderSnowplowAdapter {
  constructor() {
    this.logger = new Logger(undefined, 'WARN');
    this.rs = new RudderAnalytics();
    this.processEvents = this.processEvents.bind(this);
  }

  /**
   * Alias of RudderStack SDK load method
   *
   * @param {...any}    args      Parameters passed to that event
   */
  newTracker(...args) {
    try {
      const [writeKey, dataplaneUrl, optionalConfig] = [...args];

      if (!writeKey || !dataplaneUrl) {
        this.logger.error(`[Adapter]:[newTracker]:: Write key or Dataplane URL is missing.`);
        return;
      }

      // TODO: what about the rest of optionalConfig values RS supports?
      const { cookieDomain, cookieSameSite, cookieSecure } = { ...optionalConfig };
      const loadOptions = {};

      if (typeof cookieDomain === 'string') loadOptions.setCookieDomain = cookieDomain;
      if (typeof cookieSameSite === 'string') loadOptions.sameSiteCookie = cookieSameSite;
      if (typeof cookieSecure === 'boolean') loadOptions.secureCookie = cookieSecure;

      this.rs.init(writeKey, dataplaneUrl, loadOptions);
    } catch (e) {
      this.logger.error(`[Adapter]:[newTracker]:: ${e.message}`);
    }
  }

  /**
   * Alias of RudderStack SDK page method
   *
   * @param {...any}    args      Parameters passed to that event
   */
  trackPageView(...args) {
    let name;

    try {
      const [obj, properties] = [...args];

      if (obj && Object.prototype.hasOwnProperty.call(obj, 'title')) {
        name = obj.title;
      }

      if (properties && !isObject(properties)) {
        this.logger.error('[Adapter]:: "properties" should be an Object');
        return;
      }

      this.rs.page(undefined, name, properties);
    } catch (e) {
      this.logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
    }
  }

  /**
   * Alias of RudderStack SDK identify method
   *
   * @param {...any}    args      Parameters passed to that event
   */
  setUserId(...args) {
    try {
      const [userId, traits] = [...args];

      if (traits && !isObject(traits)) {
        this.logger.error('[Adapter]:: "traits" should be an Object');
        return;
      }

      this.rs.identify(userId, traits);
    } catch (e) {
      this.logger.error(`[Adapter]:[setUserId]:: ${e.message}`);
    }
  }

  /**
   * Alias of RudderStack SDK track method
   *
   * @param {...any}    args      Parameters passed to that event
   */
  trackStructEvent(...args) {
    try {
      const [properties] = [...args];
      const { action } = properties;

      if (!action) {
        this.logger.error('[Adapter]:: "action" is required');
        return;
      }

      this.rs.track(action, properties);
    } catch (e) {
      this.logger.error(`[Adapter]:[trackStructEvent]:: ${e.message}`);
    }
  }

  /**
   * Alias of RudderStack SDK track method
   *
   * @param {...any}    args      Parameters passed to that event
   */
  trackSelfDescribingEvent(...args) {
    try {
      const [eventObj] = [...args];
      const data = get(eventObj, 'event.data');
      const action = get(eventObj, 'event.data.action');

      if (!action) {
        this.logger.error('[Adapter]:: "action" is required');
        return;
      }

      this.rs.track(action, data);
    } catch (e) {
      this.logger.error(`[Adapter]:[trackPageView]:: ${e.message}`);
    }
  }

  /**
   * A function to process all events
   *
   * @param {string}    method    The type of the event
   * @param {...any}    args      Parameters passed to that event
   */
  processEvents(method, ...args) {
    switch (method) {
      case 'newTracker': {
        this.newTracker(...args);
        break;
      }

      case 'trackPageView': {
        this.trackPageView(...args);
        break;
      }

      case 'setUserId': {
        this.setUserId(...args);
        break;
      }

      case 'trackStructEvent': {
        this.trackStructEvent(...args);
        break;
      }

      case 'trackSelfDescribingEvent': {
        this.trackSelfDescribingEvent(...args);
        break;
      }

      default:
        this.logger.error('Invalid event');
    }
  }
}

let processEvents;

const mountRudderSnowplowAdapter = () => {
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

  processEvents = adapter.processEvents;
  return adapter.processEvents;
};

mountRudderSnowplowAdapter();
const snowplowAdapter = processEvents;

export { mountRudderSnowplowAdapter, snowplowAdapter };

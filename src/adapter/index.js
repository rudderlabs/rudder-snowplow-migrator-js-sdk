// import * as rudderanalytics from 'rudder-sdk-js';
import Rudderanalytics from '../rs-js-sdk';

class RudderSnowplowAdapter {
  constructor() {
    this.rs = new Rudderanalytics();
  }

  processEvents(method, ...args) {
    switch (method) {
      case 'newTracker': {
        const [writeKey, dataplaneUrl, optionalConfig] = [...args];
        this.rs.init(writeKey, dataplaneUrl, optionalConfig);
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
        const [obj, properties, context, callback] = [...args];
        if (obj && Object.prototype.hasOwnProperty.call(obj, 'title')) {
          name = obj.title;
        }
        this.rs.page(undefined, name, properties, context, callback);
        break;
      }
      case 'setUserId': {
        const [userId, traits, context, callback] = [...args];
        this.rs.identify(userId, traits, context, callback);
        break;
      }
      case 'trackStructEvent': {
        const [properties, context, callback] = [...args];
        const { action } = properties;
        this.rs.track(action, properties, context, callback);
        break;
      }
      default:
        console.log('Invalid event');
    }
  }
}

const rudderSnowplowAdapter = new RudderSnowplowAdapter();
export { rudderSnowplowAdapter as Adapter };

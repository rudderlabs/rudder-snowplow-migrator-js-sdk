/* eslint-disable no-sequences */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
class Rudderanalytics {
  constructor() {
    (function () {
      const e = (window.rudderanalytics = window.rudderanalytics || []);
      (e.methods = [
        'load',
        'page',
        'track',
        'identify',
        'alias',
        'group',
        'ready',
        'reset',
        'getAnonymousId',
        'setAnonymousId',
        'getUserId',
        'getUserTraits',
        'getGroupId',
        'getGroupTraits',
      ]),
        (e.factory = function (t) {
          return function () {
            // eslint-disable-next-line prefer-rest-params
            const r = Array.prototype.slice.call(arguments);
            return r.unshift(t), e.push(r), e;
          };
        });
      // eslint-disable-next-line no-plusplus
      for (let t = 0; t < e.methods.length; t++) {
        const r = e.methods[t];
        e[r] = e.factory(r);
      }
      (e.loadJS = function () {
        const r = document.createElement('script');
        (r.type = 'text/javascript'),
          (r.async = !0),
          (r.src = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js');
        const a = document.getElementsByTagName('script')[0];
        a.parentNode.insertBefore(r, a);
      }),
        e.loadJS();
    })();
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

export default Rudderanalytics;

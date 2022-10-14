/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */

const CDN_URL = 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js';
const AVAILABLE_METHODS = [
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
];

const mountRudderAnalytics = () => {
  (function () {
    window.rudderanalytics = window.rudderanalytics || [];
    AVAILABLE_METHODS.forEach((method) => {
      window.rudderanalytics[method] = (function (methodName) {
        return function () {
          window.rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
        };
      })(method);
    });

    const e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = CDN_URL;
    const a = document.getElementsByTagName('script')[0];
    a.parentNode.insertBefore(e, a);
  })();
};

export { mountRudderAnalytics };

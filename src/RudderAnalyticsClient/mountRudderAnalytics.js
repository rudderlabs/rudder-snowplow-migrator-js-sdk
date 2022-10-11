/* eslint-disable func-names */
/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */

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
    const e = (window.rudderanalytics = window.rudderanalytics || []);
    (e.methods = AVAILABLE_METHODS),
      (e.factory = function (t) {
        return function () {
          const r = Array.prototype.slice.call(arguments);
          return r.unshift(t), e.push(r), e;
        };
      });

    for (let t = 0; t < e.methods.length; t++) {
      const r = e.methods[t];
      e[r] = e.factory(r);
    }
    (e.loadJS = function () {
      const r = document.createElement('script');
      (r.type = 'text/javascript'), (r.async = !0), (r.src = CDN_URL);
      const a = document.getElementsByTagName('script')[0];
      a.parentNode.insertBefore(r, a);
    }),
      e.loadJS();
  })();
};

export { mountRudderAnalytics, CDN_URL };

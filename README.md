<p align="center">
  <a href="https://rudderstack.com/">
    <img src="https://user-images.githubusercontent.com/59817155/121357083-1c571300-c94f-11eb-8cc7-ce6df13855c9.png">
  </a>
</p>

<p align="center"><b>The Customer Data Platform for Developers</b></p>

<p align="center">
  <b>
    <a href="https://rudderstack.com">Website</a>
    ·
    <a href="https://rudderstack.com/docs/stream-sources/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk/">Documentation</a>
    ·
    <a href="https://rudderstack.com/join-rudderstack-slack-community">Community Slack</a>
  </b>
</p>

## [![Releases](https://img.shields.io/github/release/rudderlabs/rudder-snowplow-migrator-js-sdk.svg)](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/releases) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rudderlabs_rudder-snowplow-migrator-js-sdk&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rudderlabs_rudder-snowplow-migrator-js-sdk) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rudderlabs_rudder-snowplow-migrator-js-sdk&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rudderlabs_rudder-snowplow-migrator-js-sdk) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rudderlabs_rudder-snowplow-migrator-js-sdk&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rudderlabs_rudder-snowplow-migrator-js-sdk) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rudderlabs_rudder-snowplow-migrator-js-sdk&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rudderlabs_rudder-snowplow-migrator-js-sdk) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rudderlabs_rudder-snowplow-migrator-js-sdk&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rudderlabs_rudder-snowplow-migrator-js-sdk)

# [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/main/README.md)Rudderstack Snowplow Migrator SDK(JavaScript)

This JavaScript SDK helps you migrate from Snowplow to Rudderstack and it only requires minimal change in your existing Snowplow JS tracker implementation to get started and send events to Rudderstack.

## [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/main/README.md#installing-the-javascript-sdk)Installing the JavaScript SDK

To integrate the JavaScript SDK with your website, place the following code snippet in the `<head>` section of your website.

```html
<script>
  rs=window.rs=[],rs.snowplowAdapter=function(){rs.push(Array.prototype.slice.call(arguments))},rs.snowplowAdapter("newTracker",<WRITE_KEY>,<DATA_PLANE_URL>);
</script>

<script src="https://cdn.rudderlabs.com/adapters/sp/beta/v1/rs-sp-analytics.min.js"></script>
```

Current version: 0.0.6
<br>

> The above snippet lets you integrate the SDK with your website.

### Write key and data plane URL

To integrate and initialize the JavaScript SDK, you will need the source write key and the data plane URL.

- To get the source write key, follow [**this guide**](https://www.rudderstack.com/docs/get-started/glossary/#write-key).
- To get the data plane URL, follow [**this guide**](https://www.rudderstack.com/docs/rudderstack-cloud/dashboard-overview/#data-plane-url).

## [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/master/README.md#setUserId)setUserId

The `setUserId` call lets you identify a visiting user and associate them to their actions. It also lets you record the traits about them like their name, email address, etc.

A sample `setUserId` call is shown below:

```javascript
rs.snowplowAdapter('setUserId', 'john.doe@email.com', {
  firstName: 'John',
  lastName: 'Doe',
  city: 'Barcelona',
});
```

In the above example, second parameter is treated as the `userId` and third parameter contains other user-related information like `firstName`, `lastName`, etc.

## [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/master/README.md#trackPageView)trackPageView event

The `trackPageView` call lets you record your website's page views with any additional relevant information about the viewed page.

A sample `trackPageView` call is shown below:

```javascript
rs.snowplowAdapter(
  'trackPageView',
  {
    title: 'Cart Viewed',
  },
  {
    path: '/best-seller/1',
    referrer: 'https://www.google.com/search?q=estore+bestseller',
    search: 'estore bestseller',
    title: 'The best sellers offered by EStore',
    url: 'https://www.estore.com/best-seller/1',
  },
);
```

In the above example, the SDK captures the page title and the [**contextual information**](https://www.rudderstack.com/docs/event-spec/standard-events/common-fields/#contextual-fields).

## [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/master/README.md#trackSelfDescribingEvent)Custom self described event

The `trackSelfDescribingEvent` call lets you capture user events along with the associated properties.

A sample `trackSelfDescribingEvent` call is shown below:

```javascript
rs.snowplowAdapter('trackSelfDescribingEvent', {
  event: {
    data: {
      action: 'order completed',
      category: 'FCW',
      product_id: 'P1100DFG9766',
      revenue: 30,
      currency: 'USD',
      user_actual_id: 12345,
    },
  },
});
```

In the above example, the `trackSelfDescribingEvent` method tracks the Order Completed event along with other information like revenue, currency, and the user_actual_id, etc. Only action field is mandatory.

## [](https://github.com/rudderlabs/rudder-snowplow-migrator-js-sdk/blob/master/README.md#trackSelfDescribingEvent)Custom structured event

The `trackStructEvent` call lets you capture user events along with the associated properties.

A sample `trackStructEvent` call is shown below:

```javascript
rs.snowplowAdapter('trackStructEvent', {
  action: 'order completed',
  category: 'FCW',
  label: 'Sample label',
  property: 'Some property',
  value: 40.0,
});
```

In the above example, the `trackStructEvent` method tracks the Order Completed event along with other information like label, property, value. Only action field is mandatory.

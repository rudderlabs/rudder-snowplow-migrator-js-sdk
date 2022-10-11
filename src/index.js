import { mountRudderSnowplowAdapter } from './RudderSnowplowAdapter';

const processEventsSingletonInstance = mountRudderSnowplowAdapter();

export { processEventsSingletonInstance as snowplowAdapter };

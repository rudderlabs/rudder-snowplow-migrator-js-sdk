import { RudderSnowplowAdapter } from './RudderSnowplowAdapter';

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

  return adapter.processEvents;
};

export { mountRudderSnowplowAdapter };

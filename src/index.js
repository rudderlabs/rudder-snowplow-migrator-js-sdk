import { Adapter } from './adapter';

const argumentsArray = window.rsSpAdapter.q;
const isValidArgsArray = Array.isArray(argumentsArray);
if (isValidArgsArray) {
  /**
   * Iterate the buffered API calls until we find load call and
   * queue it first for processing
   */
  let i = 0;
  while (i < argumentsArray.length) {
    const event = argumentsArray.shift();
    Adapter.processEvents(...event);
    i += 1;
  }
  setInterval(() => {
    if (window.rsSpAdapter.q.length) {
      let j = 0;
      while (j < window.rsSpAdapter.q.length) {
        const event = window.rsSpAdapter.q.shift();
        Adapter.processEvents(...event);
        j += 1;
      }
    }
  }, 50);
}

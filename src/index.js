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
    Adapter.processEvents(...argumentsArray[i]);
    i += 1;
  }
}

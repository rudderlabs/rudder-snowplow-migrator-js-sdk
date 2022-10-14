import {
  getOutputConfiguration,
  getOutputFilePath,
  getDefaultConfig,
} from './rollup-configs/utilities';

const outDir = 'dist';
const distName = 'rs-sp-analytics';

const outFilePath = getOutputFilePath(outDir, distName);

const outputFiles = getOutputConfiguration(`${outDir}/rudder-snowplow-adapter`, 'rs', outFilePath);

export default {
  ...getDefaultConfig(distName, `${outDir}/rudder-snowplow-adapter`),
  input: 'src/index.js',
  output: outputFiles,
};

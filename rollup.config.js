import { getOutputConfiguration, getOutputFilePath, getDefaultConfig } from './rollupUtils';

const outDir = 'dist';
const distName = 'rudder-sp-adapter';

const outFilePath = getOutputFilePath(outDir, distName);

const outputFiles = getOutputConfiguration(`${outDir}/rudder-snowplow-adapter`, 'rs', outFilePath);

export default {
  ...getDefaultConfig(distName),
  input: 'src/index.js',
  output: outputFiles,
};

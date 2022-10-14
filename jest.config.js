// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  prettierPath: 'prettier',
  cacheDirectory: '<rootDir>/node_modules/.cache/unit-tests',
  clearMocks: true,
  coverageDirectory: 'reports/coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/scripts/', '__tests__', '__mocks__'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'reports/sonar',
        outputName: 'results-report.xml',
        reportedFilePath: 'absolute',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  globalSetup: './jest/jest.global-setup',
  setupFiles: ['jest-date-mock', '<rootDir>/jest/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup-dom.js'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'https://www.test-host.com',
    runScripts: 'dangerously',
    resources: 'usable',
  },
  testMatch: ['**/__tests__/**/*test.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.js?$': 'esbuild-jest',
  },
  transformIgnorePatterns: ['<rootDir>/.github/', '<rootDir>/.husky/', '<rootDir>/dist/'],
  verbose: true,
};

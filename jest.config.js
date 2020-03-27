module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/coverage',
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>jest.setup.ts'
  ],
  testPathIgnorePatterns: [
    'node_modules'
  ],
  testRegex: 'tests/.*(.|/)(test|spec).(ts|js)x?$',
  verbose: true,
};

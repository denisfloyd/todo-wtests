module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  resetMocks: true,
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{tsx}",
    "!src/App.tsx",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ['lcov', 'json'],
}

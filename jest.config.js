module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  resetMocks: false,
  moduleNameMapper: {
    "^.+\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  collectCoverage: false,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{tsx,ts}",
    "!<rootDir>/**/*styles.ts",
    "!<rootDir>/src/style/**",
    "!<rootDir>/src/App.tsx",
    "!<rootDir>/src/main.tsx",
    "!<rootDir>/src/tests/*.tsx",
  ],
  coveragePathIgnorePatterns: ["node_modules"],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["lcov", "json", "text"],
};

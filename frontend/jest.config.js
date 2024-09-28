export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Other Jest configuration
  collectCoverage: true, // Enable coverage collection
  coverageThreshold: {
    global: {
      statements: 80, // 80% of statements must be covered
      branches: 70, // 70% of branches must be covered
      functions: 85, // 85% of functions must be covered
      lines: 80, // 80% of lines must be covered
    },
  },
};

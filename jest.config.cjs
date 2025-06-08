const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: tsjPreset.transform,
  // collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/__tests__/**",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Add this line
  },
};

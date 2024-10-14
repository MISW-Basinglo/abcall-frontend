module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.(ts|mjs|js|html)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!.*\\.mjs$)",
  ],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@environments/(.*)$": "<rootDir>/src/environments/$1",
  },
};

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  moduleNameMapper: {
    "~/(.*)": ["<rootDir>/src/$1"],
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/utils/session.ts",
    "<rootDir>/src/server/api/trpc.ts",
    "<rootDir>/src/server/api/trpc.ts",

    // ".mock.ts",
  ],
};

export default {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  "testEnvironment": "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest",
    "^.+\\.svg?$": "<rootDir>/transform.js",
    "^.+\\.scss?$": "<rootDir>/transform.js"
  },
};
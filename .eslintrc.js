module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-unsafe-return": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-empty-function": 0,
      quotes: [2, "single"]
    },
  };
  
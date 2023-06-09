module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['.eslintrs.js'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};

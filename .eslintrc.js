module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'max-len': ['error', { code: 120, ignoreUrls: true }],
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    },
  },
};

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
    '@typescript-eslint/semi': 'error',
    semi: 0,
    'import/extensions': 0,
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'class-methods-use-this': 1,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 1,
    'import/no-dynamic-require': 1,
    'global-require': 1,
    'no-undef': 1,
    'no-new': 1,
    'no-unused-vars': 1,
    'no-new-func': 1,
    'no-param-reassign': 1,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.spec.ts',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

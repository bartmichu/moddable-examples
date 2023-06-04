module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-bitwise': 'off',
    // 'no-unused-vars': 'warn',
    // 'no-debugger': 'off',
    // semi: ['warn', 'always'],
    // 'semi-style': ['warn', 'last']
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    System: 'readonly',
    trace: 'readonly',
    debugger: 'readonly',
  },
};

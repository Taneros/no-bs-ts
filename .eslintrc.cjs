module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/semi': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': [
      2,
      {
        html: 'ignore',
        custom: 'ignore',
        explicitSpread: 'ignore',
        exceptions: [''],
      },
    ],
    'react/prop-types': [
      2,
      {
        skipUndeclared: 'true',
      },
    ],
  },
}

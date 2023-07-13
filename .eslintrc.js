module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    eqeqeq: 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    // complexity: ['error', 5], //if文６回目以降でエラー、循環的複雑度をできる限り下げる(ifで+1など)
    // 'max-depth': ['error', 1], //ifやforの中でさらに分岐を増やせない、最悪増やしていい
    // 'max-nested-callbacks': ['error', 3], //arrow関数の中にaroow関数を用いていい回数
    // 'max-lines': ['error', 200],
  },
};
//今週やること
//作成したオセロとマインスイーパーを可能な限り上記4つの条件に沿うようにリファクタリングする。
//全てのファイルを200行以内に

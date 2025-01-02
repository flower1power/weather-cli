import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': ['warn', { args: 'none' }],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always', { omitLastInOneLineBlock: false }],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
];
